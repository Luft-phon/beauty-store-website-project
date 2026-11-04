import Stripe from 'stripe';
import { getAbsoluteImageUrl } from '../utils/imageUrl.js';
import { createCalendarEvent } from '../services/calendar.service.js';
import { sendConfirmationEmail } from '../services/email.service.js';
import {
    beginStripeSessionProcessing,
    completeStripeSessionProcessing,
    releaseStripeSessionProcessing,
} from '../services/stripeWebhookIdempotency.service.js';
import {
    OrderStatus,
    EmailStatus,
    validateOrderInput,
    createPendingOrder,
    bindSessionToOrder,
    getOrderById,
    getOrderBySessionId,
    acquireSessionLock,
    hasProcessedWebhookEvent,
    markWebhookEventProcessed,
    verifyAndMarkOrderPaid,
    recordPendingAsyncCheckout,
    transitionOrderFailureOrCancel,
    processOrderFulfillment,
} from '../services/order.service.js';

// ---------------------------------------------------------------------------
// Stripe client — initialised once at module load.
// In tests, the 'stripe' npm package is fully mocked via vi.mock('stripe'),
// so this import is replaced before any test code runs.
// ---------------------------------------------------------------------------
const stripe      = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const YOUR_DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:3000';

/**
 * Checks whether the webhook event's livemode matches the configured Stripe secret key.
 * Prevents test-mode events from mutating live orders and vice versa.
 */
const isLivemodeConsistent = (event) => {
    if (typeof event?.livemode !== 'boolean') return true;
    const secretKey = process.env.STRIPE_SECRET_KEY || '';
    if (secretKey.startsWith('sk_live_') && event.livemode !== true) return false;
    if (secretKey.startsWith('sk_test_') && event.livemode !== false) return false;
    return true;
};

// ---------------------------------------------------------------------------
// Stripe Webhook
// ---------------------------------------------------------------------------

/**
 * POST /api/stripe/webhook
 *
 * Relevant Checkout events handled here:
 * - checkout.session.completed
 *     Card/instant payment: process only when payment_status === 'paid'.
 *     Delayed bank payment (us_bank_account / ACH): keep order in PENDING_PAYMENT
 *     and wait for checkout.session.async_payment_succeeded before confirming.
 * - checkout.session.async_payment_succeeded
 *     Payment has completed successfully after an asynchronous payment flow.
 * - checkout.session.async_payment_failed
 *     Payment failed after Checkout; transition to PAYMENT_FAILED (if not PAID),
 *     no Calendar event or confirmation email.
 * - checkout.session.expired
 *     Checkout session expired before payment; transition to CANCELED (if not PAID).
 *
 * IMPORTANT: This handler MUST be mounted with express.raw({ type: 'application/json' })
 * BEFORE the global express.json() middleware — see app.js.
 */
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret || !Buffer.isBuffer(req.body)) {
        console.error('❌ Webhook rejected: missing signature, webhook secret, or raw Buffer body.');
        return res.status(400).send('Webhook Error: Missing signature or raw request body');
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error(`❌ Webhook Signature Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Reject events from the wrong Stripe environment (test vs live)
    if (!isLivemodeConsistent(event)) {
        console.error(`❌ Webhook Livemode Mismatch for event ${event.id} (livemode=${event.livemode})`);
        return res.status(400).json({ error: 'Webhook livemode mismatch' });
    }

    // Event-level idempotency check
    if (event.id && hasProcessedWebhookEvent(event.id)) {
        return res.status(200).json({ received: true, duplicate: true });
    }

    const payloadObject = event.data?.object;
    const lockKey = payloadObject?.id || payloadObject?.metadata?.orderId || event.id;
    const releaseLock = acquireSessionLock(lockKey);

    // Concurrent identical webhook protection: if another request is already
    // processing this session/order in-flight, acknowledge without duplicating work.
    if (!releaseLock) {
        console.log(`↩️  Concurrent webhook ignored for lock key ${lockKey}.`);
        return res.status(200).json({ received: true, duplicate: true });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = payloadObject;
                if (!session) {
                    return res.status(400).json({ error: 'Missing checkout session object' });
                }

                if (session.payment_status === 'paid') {
                    return await handleVerifiedPaidSession(session, event, res);
                }

                // Delayed payment method (e.g. ACH us_bank_account where payment_status === 'unpaid'):
                // Keep order in PENDING_PAYMENT and do NOT send confirmation email yet.
                recordPendingAsyncCheckout(session);
                if (event.id) markWebhookEventProcessed(event.id, event.type);

                console.log(
                    `⏳ Checkout completed but payment is not settled yet ` +
                    `(session=${session.id ?? 'unknown'}, payment_status=${session.payment_status ?? 'unknown'}). ` +
                    `Waiting for checkout.session.async_payment_succeeded.`
                );
                return res.status(200).json({ received: true, status: OrderStatus.PENDING_PAYMENT });
            }

            case 'checkout.session.async_payment_succeeded': {
                const session = payloadObject;
                if (!session || session.payment_status !== 'paid') {
                    console.error(
                        `❌ checkout.session.async_payment_succeeded received without payment_status="paid" ` +
                        `(session=${session?.id ?? 'unknown'}, payment_status=${session?.payment_status ?? 'unknown'}).`
                    );
                    return res.status(400).json({ error: 'Payment status is not paid' });
                }

                return await handleVerifiedPaidSession(session, event, res);
            }

            case 'checkout.session.async_payment_failed':
            case 'payment_intent.payment_failed': {
                const sessionOrIntent = payloadObject;
                const result = transitionOrderFailureOrCancel(sessionOrIntent, OrderStatus.PAYMENT_FAILED);
                if (event.id) markWebhookEventProcessed(event.id, event.type);

                if (result.ignoredOutOfOrder) {
                    console.warn(
                        `⚠️  Ignored out-of-order ${event.type} for already PAID order ${result.order.orderId}.`
                    );
                } else {
                    console.warn(
                        `⚠️  Stripe payment failed (${event.type}, id=${sessionOrIntent?.id ?? 'unknown'}). ` +
                        `Order marked PAYMENT_FAILED; confirmation email was NOT sent.`
                    );
                }
                return res.status(200).json({ received: true });
            }

            case 'checkout.session.expired': {
                const session = payloadObject;
                const result = transitionOrderFailureOrCancel(session, OrderStatus.CANCELED);
                if (event.id) markWebhookEventProcessed(event.id, event.type);

                if (result.ignoredOutOfOrder) {
                    console.warn(
                        `⚠️  Ignored out-of-order checkout.session.expired for already PAID order ${result.order.orderId}.`
                    );
                }
                return res.status(200).json({ received: true });
            }

            case 'payment_intent.succeeded': {
                // Checkout fulfillment is handled exclusively via checkout.session.completed (paid)
                // and checkout.session.async_payment_succeeded to prevent double processing.
                if (event.id) markWebhookEventProcessed(event.id, event.type);
                return res.status(200).json({ received: true });
            }

            default: {
                console.log(`ℹ️  Unhandled Stripe event: ${event.type}`);
                if (event.id) markWebhookEventProcessed(event.id, event.type);
                return res.status(200).json({ received: true });
            }
        }
    } catch (err) {
        console.error(`❌ Webhook processing error (${event.type}):`, err.message);
        return res.status(500).json({ error: 'Webhook processing failed' });
    } finally {
        releaseLock();
    }
};

/**
 * Verifies payment amount & currency, atomically marks the order PAID, and
 * triggers Calendar + Confirmation Email exactly once per logical order.
 */
const handleVerifiedPaidSession = async (session, event, res) => {
    const sessionId = session.id;

    // Step 1: Atomic database/store transition (PENDING_PAYMENT -> PAID + Email Outbox Queued)
    // If the database transaction fails, this throws and returns HTTP 500 before any email is sent.
    const verification = verifyAndMarkOrderPaid(session);

    if (verification.amountMismatch || verification.currencyMismatch) {
        console.error(
            `🚨 CRITICAL SECURITY ALERT: ${verification.order?.mismatchAlert} ` +
            `(session=${sessionId}, order=${verification.order?.orderId}). Refusing to mark order PAID.`
        );
        return res.status(400).json({
            error: verification.order?.mismatchAlert || 'Payment amount or currency mismatch',
        });
    }

    const { order } = verification;

    // Step 2: Check session-level idempotency if already completely fulfilled
    if (
        verification.alreadyPaid &&
        order.emailJob.status === EmailStatus.SENT
    ) {
        if (event.id) markWebhookEventProcessed(event.id, event.type);
        console.log(`↩️  Duplicate Stripe success ignored for already-fulfilled session ${sessionId}.`);
        return res.status(200).json({ received: true, duplicate: true });
    }

    if (!beginStripeSessionProcessing(sessionId)) {
        console.log(`↩️  Duplicate Stripe success ignored for session ${sessionId}.`);
        return res.status(200).json({ received: true, duplicate: true });
    }

    // Step 3: Execute fulfillment (Calendar + Email Outbox Job)
    // Email failures do NOT roll back the PAID order state.
    try {
        await processOrderFulfillment(order.orderId, {
            createCalendarEventFn:   createCalendarEvent,
            sendConfirmationEmailFn: sendConfirmationEmail,
        });

        completeStripeSessionProcessing(sessionId);
        if (event.id) markWebhookEventProcessed(event.id, event.type);

        console.log(`✅ Stripe session ${sessionId ?? 'unknown'} processed from ${event.type}.`);
        return res.status(200).json({ received: true, orderId: order.orderId, status: OrderStatus.PAID });
    } catch (fulfillmentError) {
        // Release session lock so a retry can re-attempt the failed email/calendar step
        // while order.status remains permanently PAID in the order store.
        releaseStripeSessionProcessing(sessionId);
        console.error(
            `⚠️  Order ${order.orderId} is PAID, but post-payment fulfillment encountered an error: ` +
            `${fulfillmentError.message}. Email job status is FAILED and can be retried safely.`
        );
        return res.status(200).json({
            received:    true,
            orderId:     order.orderId,
            status:      OrderStatus.PAID,
            emailStatus: EmailStatus.FAILED,
        });
    }
};

// ---------------------------------------------------------------------------
// Create Checkout Session
// ---------------------------------------------------------------------------

/**
 * POST /create-checkout-session
 * Validates order items and server-side prices, records the order with
 * PENDING_PAYMENT status, and creates a Stripe hosted Checkout Session.
 *
 * CRITICAL: Never sends a confirmation email here.
 */
export const createCheckoutSession = async (req, res) => {
    try {
        const validation = validateOrderInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        const {
            items,
            date,
            time,
            clientName,
            clientEmail,
            clientPhone,
            clientAddress,
            serviceName,
            paymentMethodType,
        } = req.body;

        // 1. Store order in PENDING_PAYMENT status before initiating Stripe session
        const pendingOrder = createPendingOrder({
            expectedAmountCents: validation.expectedAmountCents,
            currency:            'usd',
            paymentMethodType,
            bookingData: {
                clientName,
                clientEmail,
                clientPhone,
                clientAddress: clientAddress || '',
                serviceName:   serviceName || '',
                date,
                time,
            },
            items: validation.normalizedItems,
        });

        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: getAbsoluteImageUrl(item.image) ? [getAbsoluteImageUrl(item.image)] : [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
        }));

        // 2. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: paymentMethodType === 'bank' ? ['us_bank_account'] : ['card'],
            line_items,
            mode: 'payment',
            metadata: {
                orderId:       pendingOrder.orderId,
                clientName,
                clientEmail,
                clientPhone,
                clientAddress: clientAddress || '',
                serviceName:   serviceName || '',
                date,
                time,
            },
            success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:  `${YOUR_DOMAIN}/payment-canceled`,
        });

        if (session?.id) {
            bindSessionToOrder(pendingOrder.orderId, session.id);
        }

        res.json({ url: session.url });
    } catch (error) {
        console.error('❌ Stripe checkout error:', error.message);
        res.status(500).json({ error: 'Payment failed' });
    }
};

// ---------------------------------------------------------------------------
// Retrieve Order / Session Payment Status (Read-Only)
// ---------------------------------------------------------------------------

/**
 * GET /api/stripe/session-status?session_id=...&order_id=...
 * Read-only endpoint that returns the backend-verified order and email status.
 * Never mutates order state or triggers confirmation emails.
 */
export const getSessionStatus = (req, res) => {
    const { session_id: sessionId, order_id: orderId } = req.query;

    if (!sessionId && !orderId) {
        return res.status(400).json({ error: 'session_id or order_id query parameter is required' });
    }

    const order = sessionId
        ? getOrderBySessionId(String(sessionId))
        : getOrderById(String(orderId));

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json({
        orderId:        order.orderId,
        sessionId:      order.sessionId,
        status:         order.status,
        emailStatus:    order.emailJob.status,
        calendarStatus: order.calendarStatus,
        bookingData:    order.bookingData,
    });
};

// ---------------------------------------------------------------------------
// Retry Failed Confirmation Email for a Verified PAID Order
// ---------------------------------------------------------------------------

/**
 * POST /api/stripe/retry-email
 * Safely retries a failed confirmation email for an already PAID order without
 * duplicating Calendar events or sending duplicate emails if already SENT.
 */
export const retryOrderEmail = async (req, res) => {
    try {
        const { orderId, sessionId } = req.body || {};
        const order = orderId
            ? getOrderById(orderId)
            : getOrderBySessionId(sessionId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status !== OrderStatus.PAID) {
            return res.status(409).json({
                error: `Cannot send confirmation email for order in status ${order.status}`,
            });
        }

        if (order.emailJob.status === EmailStatus.SENT) {
            return res.status(200).json({
                orderId:     order.orderId,
                status:      order.status,
                emailStatus: EmailStatus.SENT,
                duplicate:   true,
            });
        }

        const updatedOrder = await processOrderFulfillment(order.orderId, {
            createCalendarEventFn:   createCalendarEvent,
            sendConfirmationEmailFn: sendConfirmationEmail,
        });

        completeStripeSessionProcessing(updatedOrder.sessionId);

        return res.status(200).json({
            orderId:     updatedOrder.orderId,
            status:      updatedOrder.status,
            emailStatus: updatedOrder.emailJob.status,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Email retry failed' });
    }
};
