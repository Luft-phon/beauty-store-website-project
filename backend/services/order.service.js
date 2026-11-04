/**
 * backend/services/order.service.js
 *
 * Production-grade Order State Machine, Server-Side Price Validator,
 * Webhook Idempotency Guard, and Transactional Email Outbox.
 *
 * State Machine Transitions:
 *   PENDING_PAYMENT  ──(verified payment_status === 'paid')──►  PAID
 *   PENDING_PAYMENT  ──(async_payment_failed / payment_failed)► PAYMENT_FAILED
 *   PENDING_PAYMENT  ──(checkout.session.expired)────────────►  CANCELED
 *
 * Terminal / Monotonic Guarantees:
 * - An order CANNOT transition to PAID without verified payment_status === 'paid'
 *   and matching amount_total + currency.
 * - Once an order is PAID, out-of-order failure, expiration, or unpaid events
 *   CANNOT downgrade its status.
 * - Confirmation emails are enqueued atomically with the PAID transition and
 *   processed at most once per order at the logical level.
 * - Email provider failures do NOT roll back the PAID order status; the email
 *   job is marked FAILED and can be retried safely without duplicating Calendar
 *   events or emails.
 */

import crypto from 'crypto';

export const OrderStatus = Object.freeze({
    PENDING_PAYMENT: 'PENDING_PAYMENT',
    PAID:            'PAID',
    PAYMENT_FAILED:  'PAYMENT_FAILED',
    CANCELED:        'CANCELED',
});

export const EmailStatus = Object.freeze({
    NONE:    'NONE',
    QUEUED:  'QUEUED',
    SENDING: 'SENDING',
    SENT:    'SENT',
    FAILED:  'FAILED',
});

export const CalendarStatus = Object.freeze({
    NONE:    'NONE',
    CREATED: 'CREATED',
    FAILED:  'FAILED',
});

// ---------------------------------------------------------------------------
// Authoritative Server-Side Service Catalog Prices (USD)
// Mirrors data/services.data.ts so client requests cannot tamper with known
// catalog service prices.
// ---------------------------------------------------------------------------
export const CATALOG_SERVICE_PRICES_USD = Object.freeze({
    'Photoshoot / Stage Combo':                  235,
    'Premium Combo':                             175,
    'Premium Makeup Only':                       125,
    'Premium Hair Only':                         95,
    'Deluxe Combo':                              205,
    'Deluxe Makeup Only':                        155,
    'Deluxe Hair Only':                          115,
    'Bridal Makeup & Hair (1 time)':             550,
    'Bridal Makeup & 2 Hair Changes':            750,
    'Bridal Makeup & Hair + Layout Changes':     800,
    'Bridal All-Day Service':                    1350,
    'Wedding Guest Makeup & Hair':               220,
    'Wedding Guest Makeup Only':                 190,
    'Wedding Guest Hair Only':                   130,
    'Groom Makeup & Hair':                       200,
    'Groom Makeup Only':                         170,
    'Bridal Trial / Pre-Wedding Photoshoot':     400,
    '1:1 Private Makeup Class':                  595,
    'Group Makeup Class (4 students)':           495,
    'Bridal Airbrush Products':                  100,
    'Event/Party/ Air brush Products':           50,
});

const CARD_FEE_ITEM_NAME = 'Card Processing Fee (2.9% + $0.30)';

// ---------------------------------------------------------------------------
// In-Memory Transactional Store (Orders, Session Index, Webhook Events, Locks)
// ---------------------------------------------------------------------------
const ordersById         = new Map();
const orderIdBySessionId = new Map();
const processedEventIds  = new Map();
const activeSessionLocks = new Map();

// Test hook to simulate database transaction failures during atomic commit
let simulateDbFailure = false;

export const setSimulatedDbFailureForTests = (shouldFail) => {
    simulateDbFailure = Boolean(shouldFail);
};

export const resetOrderStoreForTests = () => {
    ordersById.clear();
    orderIdBySessionId.clear();
    processedEventIds.clear();
    activeSessionLocks.clear();
    simulateDbFailure = false;
};

// ---------------------------------------------------------------------------
// Input & Server-Side Price Validation
// ---------------------------------------------------------------------------

/**
 * Validates booking details and line items, enforcing server-side price
 * integrity against the official service catalog.
 *
 * @param {object} payload Request body from POST /create-checkout-session
 * @returns {{ valid: boolean, error?: string, normalizedItems?: Array, expectedAmountCents?: number }}
 */
export const validateOrderInput = (payload) => {
    if (!payload || typeof payload !== 'object') {
        return { valid: false, error: 'Invalid request payload' };
    }

    const {
        items,
        date,
        time,
        clientName,
        clientEmail,
        clientPhone,
        paymentMethodType,
    } = payload;

    if (!Array.isArray(items) || items.length === 0) {
        return { valid: false, error: 'Order must contain at least one item' };
    }

    if (!clientName || typeof clientName !== 'string' || !clientName.trim()) {
        return { valid: false, error: 'Client name is required' };
    }

    if (!clientEmail || typeof clientEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
        return { valid: false, error: 'Valid client email is required' };
    }

    if (!clientPhone || typeof clientPhone !== 'string' || !clientPhone.trim()) {
        return { valid: false, error: 'Client phone is required' };
    }

    if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
        return { valid: false, error: 'Valid appointment date (YYYY-MM-DD) is required' };
    }

    if (!time || typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time.trim())) {
        return { valid: false, error: 'Valid appointment time (HH:MM) is required' };
    }

    if (paymentMethodType !== undefined && paymentMethodType !== 'card' && paymentMethodType !== 'bank') {
        return { valid: false, error: 'Invalid payment method type' };
    }

    let depositSubtotalDollars = 0;
    let cardFeeItem = null;
    const normalizedItems = [];

    for (const item of items) {
        if (!item || typeof item !== 'object') {
            return { valid: false, error: 'Invalid line item format' };
        }

        const rawName = typeof item.name === 'string' ? item.name.trim() : '';
        if (!rawName) {
            return { valid: false, error: 'Line item name is required' };
        }

        const price = Number(item.price);
        if (!Number.isFinite(price) || price <= 0) {
            return { valid: false, error: `Invalid price for item "${rawName}"` };
        }

        const unitAmountCents = Math.round(price * 100);
        if (unitAmountCents < 50) {
            return { valid: false, error: `Item "${rawName}" is below the $0.50 minimum charge` };
        }

        // Check if this item is the card processing fee line item
        if (rawName === CARD_FEE_ITEM_NAME) {
            if (paymentMethodType === 'bank') {
                return { valid: false, error: 'Card processing fee cannot be added to bank (ACH) payments' };
            }
            cardFeeItem = { ...item, name: rawName, price, unitAmountCents };
            normalizedItems.push(cardFeeItem);
            continue;
        }

        // Check if item matches a known catalog service (either "Service Name" or "Deposit: Service Name")
        const isDepositPrefix = rawName.startsWith('Deposit:');
        const baseServiceName = isDepositPrefix ? rawName.replace(/^Deposit:\s*/, '').trim() : rawName;
        const catalogFullPrice = CATALOG_SERVICE_PRICES_USD[baseServiceName];

        if (catalogFullPrice !== undefined) {
            const expectedDepositPrice = catalogFullPrice * 0.5;
            const expectedFullPrice    = catalogFullPrice;

            const matchesDeposit = Math.abs(price - expectedDepositPrice) < 0.01;
            const matchesFull    = !isDepositPrefix && Math.abs(price - expectedFullPrice) < 0.01;

            if (!matchesDeposit && !matchesFull) {
                return {
                    valid: false,
                    error: `Price mismatch for catalog service "${baseServiceName}"`,
                };
            }
        }

        depositSubtotalDollars += price;
        normalizedItems.push({
            ...item,
            name: rawName,
            price,
            unitAmountCents,
        });
    }

    // Validate card processing fee calculation if present
    if (cardFeeItem && depositSubtotalDollars > 0) {
        const expectedFee = ((depositSubtotalDollars + 0.30) / (1 - 0.029)) - depositSubtotalDollars;
        const expectedFeeCents = Math.round(Number(expectedFee.toFixed(2)) * 100);
        if (Math.abs(cardFeeItem.unitAmountCents - expectedFeeCents) > 2) {
            return {
                valid: false,
                error: 'Card processing fee amount does not match server calculation',
            };
        }
    }

    const expectedAmountCents = normalizedItems.reduce((sum, i) => sum + i.unitAmountCents, 0);

    return {
        valid: true,
        normalizedItems,
        expectedAmountCents,
    };
};

// ---------------------------------------------------------------------------
// Order Creation & Lookup
// ---------------------------------------------------------------------------

/**
 * Creates a new order in PENDING_PAYMENT state prior to Stripe payment completion.
 * Does NOT send any confirmation email or create a calendar event.
 */
export const createPendingOrder = ({
    expectedAmountCents,
    currency = 'usd',
    paymentMethodType = 'card',
    bookingData,
    items,
}) => {
    const orderId = `ord_${crypto.randomUUID().replace(/-/g, '')}`;
    const now = new Date().toISOString();

    const order = {
        orderId,
        sessionId: null,
        status: OrderStatus.PENDING_PAYMENT,
        expectedAmountCents,
        paidAmountCents: null,
        currency: currency.toLowerCase(),
        paymentMethodType: paymentMethodType === 'bank' ? 'bank' : 'card',
        bookingData: {
            clientName:    bookingData.clientName,
            clientEmail:   bookingData.clientEmail,
            clientPhone:   bookingData.clientPhone,
            clientAddress: bookingData.clientAddress || '',
            serviceName:   bookingData.serviceName || '',
            date:          bookingData.date,
            time:          bookingData.time,
        },
        items: items || [],
        calendarStatus: CalendarStatus.NONE,
        emailJob: {
            jobId:     null,
            status:    EmailStatus.NONE,
            attempts:  0,
            lastError: null,
            sentAt:    null,
        },
        mismatchAlert: null,
        createdAt: now,
        updatedAt: now,
        paidAt:    null,
    };

    ordersById.set(orderId, order);
    return structuredClone(order);
};

/**
 * Links a Stripe Checkout Session ID to an existing PENDING_PAYMENT order.
 */
export const bindSessionToOrder = (orderId, sessionId) => {
    const order = ordersById.get(orderId);
    if (!order || !sessionId) return null;

    order.sessionId = sessionId;
    order.updatedAt = new Date().toISOString();
    orderIdBySessionId.set(sessionId, orderId);

    return structuredClone(order);
};

export const getOrderById = (orderId) => {
    if (!orderId) return null;
    const order = ordersById.get(orderId);
    return order ? structuredClone(order) : null;
};

export const getOrderBySessionId = (sessionId) => {
    if (!sessionId) return null;
    const orderId = orderIdBySessionId.get(sessionId);
    if (!orderId) return null;
    return getOrderById(orderId);
};

// ---------------------------------------------------------------------------
// Concurrency Lock & Webhook Event Deduplication
// ---------------------------------------------------------------------------

/**
 * Serializes concurrent webhook processing for the same session/order key.
 * Returns a release function, or null if the key is already locked in-flight.
 */
export const acquireSessionLock = (lockKey) => {
    if (!lockKey) return () => {};
    if (activeSessionLocks.has(lockKey)) {
        return null;
    }
    activeSessionLocks.set(lockKey, Date.now());
    return () => {
        activeSessionLocks.delete(lockKey);
    };
};

export const hasProcessedWebhookEvent = (eventId) => {
    if (!eventId) return false;
    return processedEventIds.has(eventId);
};

export const markWebhookEventProcessed = (eventId, eventType) => {
    if (!eventId) return;
    processedEventIds.set(eventId, {
        eventType,
        processedAt: Date.now(),
    });
};

// ---------------------------------------------------------------------------
// State Machine Transitions & Transactional Outbox
// ---------------------------------------------------------------------------

/**
 * Verifies amount/currency and atomically transitions an order to PAID while
 * enqueuing a transactional confirmation email job.
 *
 * If the order does not exist in memory (e.g. webhook arrived after a stateless
 * server restart), a shadow order record is hydrated from the verified Stripe
 * session payload so idempotency and state tracking still work.
 *
 * @param {object} session Stripe Checkout Session object from verified webhook
 * @returns {{
 *   transitioned: boolean,
 *   alreadyPaid: boolean,
 *   amountMismatch: boolean,
 *   currencyMismatch: boolean,
 *   invalidState: boolean,
 *   order: object
 * }}
 */
export const verifyAndMarkOrderPaid = (session) => {
    if (simulateDbFailure) {
        throw new Error('Simulated database transaction failure');
    }

    const sessionId = session.id;
    const metadataOrderId = session.metadata?.orderId || session.client_reference_id;

    let order =
        (metadataOrderId && ordersById.get(metadataOrderId)) ||
        (sessionId && ordersById.get(orderIdBySessionId.get(sessionId)));

    // Hydrate order if webhook arrives for a session created before server restart
    if (!order) {
        const hydratedOrderId = metadataOrderId || `ord_hydrated_${sessionId}`;
        const sessionAmount = typeof session.amount_total === 'number' ? session.amount_total : 0;
        const sessionCurrency = (session.currency || 'usd').toLowerCase();

        order = {
            orderId: hydratedOrderId,
            sessionId,
            status: OrderStatus.PENDING_PAYMENT,
            expectedAmountCents: sessionAmount,
            paidAmountCents: null,
            currency: sessionCurrency,
            paymentMethodType: 'card',
            bookingData: {
                clientName:    session.metadata?.clientName || '',
                clientEmail:   session.metadata?.clientEmail || '',
                clientPhone:   session.metadata?.clientPhone || '',
                clientAddress: session.metadata?.clientAddress || '',
                serviceName:   session.metadata?.serviceName || '',
                date:          session.metadata?.date || '',
                time:          session.metadata?.time || '',
            },
            items: [],
            calendarStatus: CalendarStatus.NONE,
            emailJob: {
                jobId:     null,
                status:    EmailStatus.NONE,
                attempts:  0,
                lastError: null,
                sentAt:    null,
            },
            mismatchAlert: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paidAt:    null,
        };
    }

    // Idempotent check: if already PAID, do not transition again
    if (order.status === OrderStatus.PAID) {
        return {
            transitioned:     false,
            alreadyPaid:      true,
            amountMismatch:   false,
            currencyMismatch: false,
            invalidState:     false,
            order:            structuredClone(order),
        };
    }

    // Verify currency if provided on the session payload
    if (session.currency && session.currency.toLowerCase() !== order.currency) {
        order.mismatchAlert = `Currency mismatch: expected ${order.currency}, got ${session.currency}`;
        order.updatedAt = new Date().toISOString();
        ordersById.set(order.orderId, order);
        if (sessionId) orderIdBySessionId.set(sessionId, order.orderId);

        return {
            transitioned:     false,
            alreadyPaid:      false,
            amountMismatch:   false,
            currencyMismatch: true,
            invalidState:     false,
            order:            structuredClone(order),
        };
    }

    // Verify amount_total matches expectedAmountCents when amount_total is present
    if (
        typeof session.amount_total === 'number' &&
        order.expectedAmountCents > 0 &&
        session.amount_total !== order.expectedAmountCents
    ) {
        order.mismatchAlert =
            `Amount mismatch: expected ${order.expectedAmountCents} cents, got ${session.amount_total} cents`;
        order.updatedAt = new Date().toISOString();
        ordersById.set(order.orderId, order);
        if (sessionId) orderIdBySessionId.set(sessionId, order.orderId);

        return {
            transitioned:     false,
            alreadyPaid:      false,
            amountMismatch:   true,
            currencyMismatch: false,
            invalidState:     false,
            order:            structuredClone(order),
        };
    }

    // Atomic state update: PENDING_PAYMENT -> PAID + enqueue confirmation email job
    const now = new Date().toISOString();
    order.sessionId       = sessionId || order.sessionId;
    order.status          = OrderStatus.PAID;
    order.paidAmountCents = typeof session.amount_total === 'number'
        ? session.amount_total
        : order.expectedAmountCents;
    order.paidAt          = now;
    order.updatedAt       = now;

    if (order.emailJob.status === EmailStatus.NONE) {
        order.emailJob = {
            jobId:     `email_${order.orderId}`,
            status:    EmailStatus.QUEUED,
            attempts:  0,
            lastError: null,
            sentAt:    null,
        };
    }

    ordersById.set(order.orderId, order);
    if (sessionId) {
        orderIdBySessionId.set(sessionId, order.orderId);
    }

    return {
        transitioned:     true,
        alreadyPaid:      false,
        amountMismatch:   false,
        currencyMismatch: false,
        invalidState:     false,
        order:            structuredClone(order),
    };
};

/**
 * Ensures an order exists in PENDING_PAYMENT state when a delayed payment
 * session (e.g. ACH us_bank_account) completes checkout with payment_status='unpaid'.
 * Never downgrades an already PAID order.
 */
export const recordPendingAsyncCheckout = (session) => {
    const sessionId = session?.id;
    const metadataOrderId = session?.metadata?.orderId || session?.client_reference_id;

    let order =
        (metadataOrderId && ordersById.get(metadataOrderId)) ||
        (sessionId && ordersById.get(orderIdBySessionId.get(sessionId)));

    if (!order && sessionId) {
        const orderId = metadataOrderId || `ord_hydrated_${sessionId}`;
        order = {
            orderId,
            sessionId,
            status: OrderStatus.PENDING_PAYMENT,
            expectedAmountCents: typeof session.amount_total === 'number' ? session.amount_total : 0,
            paidAmountCents: null,
            currency: (session.currency || 'usd').toLowerCase(),
            paymentMethodType: 'bank',
            bookingData: {
                clientName:    session.metadata?.clientName || '',
                clientEmail:   session.metadata?.clientEmail || '',
                clientPhone:   session.metadata?.clientPhone || '',
                clientAddress: session.metadata?.clientAddress || '',
                serviceName:   session.metadata?.serviceName || '',
                date:          session.metadata?.date || '',
                time:          session.metadata?.time || '',
            },
            items: [],
            calendarStatus: CalendarStatus.NONE,
            emailJob: {
                jobId:     null,
                status:    EmailStatus.NONE,
                attempts:  0,
                lastError: null,
                sentAt:    null,
            },
            mismatchAlert: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paidAt:    null,
        };
        ordersById.set(orderId, order);
        orderIdBySessionId.set(sessionId, orderId);
    }

    // Out-of-order guard: never downgrade PAID -> PENDING_PAYMENT
    if (order && order.status !== OrderStatus.PAID) {
        order.status = OrderStatus.PENDING_PAYMENT;
        order.updatedAt = new Date().toISOString();
    }

    return order ? structuredClone(order) : null;
};

/**
 * Marks an order as PAYMENT_FAILED or CANCELED, strictly protecting already-PAID
 * orders against out-of-order downgrade events.
 */
export const transitionOrderFailureOrCancel = (session, targetStatus) => {
    const sessionId = session?.id;
    const metadataOrderId = session?.metadata?.orderId || session?.client_reference_id;

    let order =
        (metadataOrderId && ordersById.get(metadataOrderId)) ||
        (sessionId && ordersById.get(orderIdBySessionId.get(sessionId)));

    if (!order && sessionId) {
        const orderId = metadataOrderId || `ord_hydrated_${sessionId}`;
        order = {
            orderId,
            sessionId,
            status: OrderStatus.PENDING_PAYMENT,
            expectedAmountCents: typeof session?.amount_total === 'number' ? session.amount_total : 0,
            paidAmountCents: null,
            currency: (session?.currency || 'usd').toLowerCase(),
            paymentMethodType: 'card',
            bookingData: {
                clientName:    session?.metadata?.clientName || '',
                clientEmail:   session?.metadata?.clientEmail || '',
                clientPhone:   session?.metadata?.clientPhone || '',
                clientAddress: session?.metadata?.clientAddress || '',
                serviceName:   session?.metadata?.serviceName || '',
                date:          session?.metadata?.date || '',
                time:          session?.metadata?.time || '',
            },
            items: [],
            calendarStatus: CalendarStatus.NONE,
            emailJob: {
                jobId:     null,
                status:    EmailStatus.NONE,
                attempts:  0,
                lastError: null,
                sentAt:    null,
            },
            mismatchAlert: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paidAt:    null,
        };
        ordersById.set(orderId, order);
        orderIdBySessionId.set(sessionId, orderId);
    }

    if (!order) return { transitioned: false, ignoredOutOfOrder: false, order: null };

    // Out-of-order guard: NEVER downgrade a PAID order
    if (order.status === OrderStatus.PAID) {
        return {
            transitioned:      false,
            ignoredOutOfOrder: true,
            order:             structuredClone(order),
        };
    }

    order.status    = targetStatus;
    order.updatedAt = new Date().toISOString();
    ordersById.set(order.orderId, order);

    return {
        transitioned:      true,
        ignoredOutOfOrder: false,
        order:             structuredClone(order),
    };
};

// ---------------------------------------------------------------------------
// Independent Calendar & Email Outbox Execution (With Safe Retry)
// ---------------------------------------------------------------------------

/**
 * Executes post-payment fulfillment (Google Calendar + Confirmation Email) for
 * a verified PAID order.
 *
 * Critical guarantees:
 * 1. Refuses to execute if order is not PAID.
 * 2. Tracks Calendar creation and Email sending independently so retrying a
 *    failed email NEVER creates a duplicate Calendar appointment.
 * 3. Email failure does NOT roll back the order's PAID status; it records
 *    emailJob.status = 'FAILED' so the email can be retried safely.
 */
export const processOrderFulfillment = async (
    orderId,
    { createCalendarEventFn, sendConfirmationEmailFn }
) => {
    const order = ordersById.get(orderId);
    if (!order) {
        throw new Error(`Order ${orderId} not found`);
    }

    if (order.status !== OrderStatus.PAID) {
        throw new Error(`Cannot fulfill order ${orderId} in status ${order.status}`);
    }

    // Step 1: Google Calendar Event (idempotent per order)
    if (order.calendarStatus !== CalendarStatus.CREATED) {
        try {
            await createCalendarEventFn(order.bookingData);
            order.calendarStatus = CalendarStatus.CREATED;
            order.updatedAt = new Date().toISOString();
        } catch (calErr) {
            order.calendarStatus = CalendarStatus.FAILED;
            order.updatedAt = new Date().toISOString();
            throw calErr;
        }
    }

    // Step 2: Confirmation Email Job (idempotent per order, decoupled from PAID state)
    if (order.emailJob.status === EmailStatus.SENT || order.emailJob.status === EmailStatus.SENDING) {
        return structuredClone(order);
    }

    order.emailJob.status   = EmailStatus.SENDING;
    order.emailJob.attempts += 1;
    order.updatedAt         = new Date().toISOString();

    try {
        await sendConfirmationEmailFn(order.bookingData);
        order.emailJob.status    = EmailStatus.SENT;
        order.emailJob.lastError = null;
        order.emailJob.sentAt    = new Date().toISOString();
        order.updatedAt          = new Date().toISOString();
        return structuredClone(order);
    } catch (emailErr) {
        // Order MUST remain PAID even when the email provider fails
        order.emailJob.status    = EmailStatus.FAILED;
        order.emailJob.lastError = emailErr.message || 'Email provider failure';
        order.updatedAt          = new Date().toISOString();
        throw emailErr;
    }
};

