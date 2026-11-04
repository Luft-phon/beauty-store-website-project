/**
 * backend/tests/stripe.test.js
 *
 * Comprehensive automated test suite for:
 * 1. POST /create-checkout-session (Order creation, server-side price validation, PENDING_PAYMENT state)
 * 2. POST /api/stripe/webhook (Signature verification, card vs ACH lifecycle, idempotency,
 *    out-of-order protection, concurrency, amount mismatch, DB failure, email retry resilience)
 * 3. GET  /api/stripe/session-status (Read-only status verification)
 * 4. POST /api/stripe/retry-email (Safe retry of failed confirmation email for PAID orders)
 * 5. POST /api/calendar/create-event (Authorization & verified payment enforcement)
 *
 * Safety guarantees (no live Stripe, Google Calendar, or Resend calls):
 * - 'stripe', '../services/calendar.service.js', and '../services/email.service.js'
 *   are mocked via vi.mock() + vi.hoisted() before app.js is imported.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// ---------------------------------------------------------------------------
// vi.hoisted() — runs at hoist-time so mocks are available inside vi.mock()
// ---------------------------------------------------------------------------
const {
    mockSessionsCreate,
    mockConstructEvent,
    mockStripeInstance,
    mockCreateCalendarEvent,
    mockSendConfirmationEmail,
} = vi.hoisted(() => {
    const mockSessionsCreate        = vi.fn();
    const mockConstructEvent        = vi.fn();
    const mockCreateCalendarEvent   = vi.fn();
    const mockSendConfirmationEmail = vi.fn();

    const mockStripeInstance = {
        checkout: {
            sessions: {
                create: mockSessionsCreate,
            },
        },
        webhooks: {
            constructEvent: mockConstructEvent,
        },
    };

    return {
        mockSessionsCreate,
        mockConstructEvent,
        mockStripeInstance,
        mockCreateCalendarEvent,
        mockSendConfirmationEmail,
    };
});

vi.mock('stripe', () => {
    const MockStripe = vi.fn(() => mockStripeInstance);
    return { default: MockStripe };
});

vi.mock('../services/calendar.service.js', () => ({
    createCalendarEvent: mockCreateCalendarEvent,
}));

vi.mock('../services/email.service.js', () => ({
    sendConfirmationEmail: mockSendConfirmationEmail,
    sendInquiryEmail:      vi.fn(),
}));

import app from '../app.js';
import {
    OrderStatus,
    EmailStatus,
    CalendarStatus,
    getOrderBySessionId,
    getOrderById,
    resetOrderStoreForTests,
    setSimulatedDbFailureForTests,
} from '../services/order.service.js';
import { resetStripeIdempotencyForTests } from '../services/stripeWebhookIdempotency.service.js';

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------
const VALID_REQUEST_BODY = {
    items: [
        {
            name:  'Bridal Makeup — Full Package',
            price: 300,
            image: '/images/services/bridal.jpg',
        },
    ],
    date:              '2026-12-15',
    time:              '10:00',
    clientName:        'Jane Doe',
    clientEmail:       'jane@example.com',
    clientPhone:       '714-555-0123',
    clientAddress:     '123 Ocean View Dr, Huntington Beach, CA',
    serviceName:       'Bridal Makeup — Full Package',
    paymentMethodType: 'card',
};

const MOCK_CHECKOUT_URL = 'https://checkout.stripe.com/test-session';
const MOCK_SESSION_ID   = 'cs_test_a1b2c3d4e5f6';

/**
 * Helper to send a raw JSON webhook payload with a Stripe-Signature header.
 */
const sendWebhookRequest = (payloadObj, signature = 't=1700000000,v1=valid_test_sig') => {
    const rawBuffer = Buffer.from(JSON.stringify(payloadObj), 'utf8');
    return request(app)
        .post('/api/stripe/webhook')
        .set('Stripe-Signature', signature)
        .set('Content-Type', 'application/json')
        .send(rawBuffer);
};

// ---------------------------------------------------------------------------
// Test Suite
// ---------------------------------------------------------------------------

describe('Stripe Payment Workflow, Webhooks & Order State Machine', () => {

    beforeEach(() => {
        mockSessionsCreate.mockReset();
        mockConstructEvent.mockReset();
        mockCreateCalendarEvent.mockReset();
        mockSendConfirmationEmail.mockReset();

        mockCreateCalendarEvent.mockResolvedValue(undefined);
        mockSendConfirmationEmail.mockResolvedValue({ id: 'email_test_123' });

        resetOrderStoreForTests();
        resetStripeIdempotencyForTests();
    });

    // =========================================================================
    // PART 1: POST /create-checkout-session (Existing + Hardened Validation)
    // =========================================================================

    describe('POST /create-checkout-session', () => {

        describe('success case', () => {
            it('returns HTTP 200 with the Stripe checkout URL', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                const res = await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                expect(res.status).toBe(200);
                expect(res.body).toEqual({ url: MOCK_CHECKOUT_URL });
            });

            it('calls stripe.checkout.sessions.create exactly once', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                expect(mockSessionsCreate).toHaveBeenCalledTimes(1);
            });

            it('calls Stripe with mode: "payment"', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                const [calledWith] = mockSessionsCreate.mock.calls[0];
                expect(calledWith.mode).toBe('payment');
            });

            it('maps items to Stripe line_items format correctly', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                const [calledWith] = mockSessionsCreate.mock.calls[0];
                expect(calledWith.line_items).toHaveLength(1);
                expect(calledWith.line_items[0]).toMatchObject({
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Bridal Makeup — Full Package' },
                        unit_amount: 30000, // $300 * 100 cents
                    },
                    quantity: 1,
                });
            });

            it('includes all booking fields and orderId in Stripe metadata', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                const [calledWith] = mockSessionsCreate.mock.calls[0];
                expect(calledWith.metadata).toMatchObject({
                    clientName:    'Jane Doe',
                    clientEmail:   'jane@example.com',
                    clientPhone:   '714-555-0123',
                    clientAddress: '123 Ocean View Dr, Huntington Beach, CA',
                    serviceName:   'Bridal Makeup — Full Package',
                    date:          '2026-12-15',
                    time:          '10:00',
                });
                expect(calledWith.metadata.orderId).toMatch(/^ord_/);
            });

            it('includes success_url and cancel_url', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                const [calledWith] = mockSessionsCreate.mock.calls[0];
                expect(calledWith.success_url).toContain('/payment-success');
                expect(calledWith.cancel_url).toContain('/payment-canceled');
            });

            it('uses payment_method_types: ["card"] for card payment', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send({ ...VALID_REQUEST_BODY, paymentMethodType: 'card' });

                const [calledWith] = mockSessionsCreate.mock.calls[0];
                expect(calledWith.payment_method_types).toEqual(['card']);
            });

            it('uses payment_method_types: ["us_bank_account"] for bank payment', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                await request(app)
                    .post('/create-checkout-session')
                    .send({ ...VALID_REQUEST_BODY, paymentMethodType: 'bank' });

                const [calledWith] = mockSessionsCreate.mock.calls[0];
                expect(calledWith.payment_method_types).toEqual(['us_bank_account']);
            });
        });

        describe('input & server-side price validation', () => {
            it('rejects empty items array with HTTP 400', async () => {
                const res = await request(app)
                    .post('/create-checkout-session')
                    .send({ ...VALID_REQUEST_BODY, items: [] });

                expect(res.status).toBe(400);
                expect(mockSessionsCreate).not.toHaveBeenCalled();
            });

            it('rejects negative or zero item prices with HTTP 400', async () => {
                const res = await request(app)
                    .post('/create-checkout-session')
                    .send({
                        ...VALID_REQUEST_BODY,
                        items: [{ name: 'Bridal Makeup', price: -50, image: '' }],
                    });

                expect(res.status).toBe(400);
                expect(mockSessionsCreate).not.toHaveBeenCalled();
            });

            it('rejects client-side price manipulation for known catalog services with HTTP 400', async () => {
                // "Bridal All-Day Service" is $1350 in catalog (50% deposit = $675).
                // Attempting to pay $1.00 must be rejected.
                const res = await request(app)
                    .post('/create-checkout-session')
                    .send({
                        ...VALID_REQUEST_BODY,
                        items: [{ name: 'Deposit: Bridal All-Day Service', price: 1.00, image: '' }],
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toMatch(/Price mismatch/i);
                expect(mockSessionsCreate).not.toHaveBeenCalled();
            });

            it('accepts valid 50% deposit + card processing fee for known catalog services', async () => {
                mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

                // "Bridal All-Day Service" = $1350 -> 50% deposit = $675.00
                // Card fee = ((675 + 0.30) / (1 - 0.029)) - 675 = 20.47
                const res = await request(app)
                    .post('/create-checkout-session')
                    .send({
                        ...VALID_REQUEST_BODY,
                        items: [
                            { name: 'Deposit: Bridal All-Day Service', price: 675, image: '' },
                            { name: 'Card Processing Fee (2.9% + $0.30)', price: 20.47, image: '' },
                        ],
                    });

                expect(res.status).toBe(200);
                expect(mockSessionsCreate).toHaveBeenCalledTimes(1);
            });
        });

        describe('Stripe SDK failure', () => {
            it('returns HTTP 500 with { error: "Payment failed" } when Stripe throws', async () => {
                mockSessionsCreate.mockRejectedValueOnce(
                    new Error('Your card was declined.')
                );

                const res = await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                expect(res.status).toBe(500);
                expect(res.body).toEqual({ error: 'Payment failed' });
            });

            it('returns HTTP 500 for network-level Stripe errors', async () => {
                mockSessionsCreate.mockRejectedValueOnce(
                    new Error('connect ECONNREFUSED 127.0.0.1:443')
                );

                const res = await request(app)
                    .post('/create-checkout-session')
                    .send(VALID_REQUEST_BODY);

                expect(res.status).toBe(500);
                expect(res.body).toEqual({ error: 'Payment failed' });
            });
        });
    });

    // =========================================================================
    // PART 2: Critical Scenarios Matrix (Scenarios 1 – 14)
    // =========================================================================

    describe('Critical Payment & Webhook Scenarios', () => {

        // Scenario 1 & 2: Order created & Checkout Session created
        it('Scenario 1 & 2: Creating an order and Checkout Session stores PENDING_PAYMENT and sends NO confirmation email', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });

            const res = await request(app)
                .post('/create-checkout-session')
                .send(VALID_REQUEST_BODY);

            expect(res.status).toBe(200);

            const order = getOrderBySessionId(MOCK_SESSION_ID);
            expect(order).not.toBeNull();
            expect(order.status).toBe(OrderStatus.PENDING_PAYMENT);
            expect(order.expectedAmountCents).toBe(30000);
            expect(order.emailJob.status).toBe(EmailStatus.NONE);

            // Critical rule: NO email or calendar event on order/checkout creation
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();
        });

        // Scenario 3: Customer reaches success page
        it('Scenario 3: Customer reaching success page (GET /api/stripe/session-status) does NOT mark order PAID or send confirmation email', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);

            const statusRes = await request(app)
                .get(`/api/stripe/session-status?session_id=${MOCK_SESSION_ID}`);

            expect(statusRes.status).toBe(200);
            expect(statusRes.body.status).toBe(OrderStatus.PENDING_PAYMENT);
            expect(statusRes.body.emailStatus).toBe(EmailStatus.NONE);
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();
        });

        // Scenario 4: Payment succeeds
        it('Scenario 4: Verified payment success marks order PAID and sends confirmation email once', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            const eventPayload = {
                id: 'evt_paid_1',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: {
                            orderId:       createdOrder.orderId,
                            clientName:    VALID_REQUEST_BODY.clientName,
                            clientEmail:   VALID_REQUEST_BODY.clientEmail,
                            clientPhone:   VALID_REQUEST_BODY.clientPhone,
                            clientAddress: VALID_REQUEST_BODY.clientAddress,
                            serviceName:   VALID_REQUEST_BODY.serviceName,
                            date:          VALID_REQUEST_BODY.date,
                            time:          VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(eventPayload);

            const webhookRes = await sendWebhookRequest(eventPayload);
            expect(webhookRes.status).toBe(200);

            const updatedOrder = getOrderById(createdOrder.orderId);
            expect(updatedOrder.status).toBe(OrderStatus.PAID);
            expect(updatedOrder.emailJob.status).toBe(EmailStatus.SENT);
            expect(updatedOrder.calendarStatus).toBe(CalendarStatus.CREATED);

            expect(mockCreateCalendarEvent).toHaveBeenCalledTimes(1);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
        });

        // Scenario 5: Payment fails
        it('Scenario 5: Payment failure marks order PAYMENT_FAILED and sends NO confirmation email', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send({
                ...VALID_REQUEST_BODY,
                paymentMethodType: 'bank',
            });
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            const failedEvent = {
                id: 'evt_failed_1',
                type: 'checkout.session.async_payment_failed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'unpaid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: { orderId: createdOrder.orderId, clientEmail: VALID_REQUEST_BODY.clientEmail },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(failedEvent);

            const res = await sendWebhookRequest(failedEvent);
            expect(res.status).toBe(200);

            const updatedOrder = getOrderById(createdOrder.orderId);
            expect(updatedOrder.status).toBe(OrderStatus.PAYMENT_FAILED);
            expect(updatedOrder.emailJob.status).toBe(EmailStatus.NONE);
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();
        });

        // Scenario 6: Payment pending (ACH delayed notification)
        it('Scenario 6: Checkout completed with payment_status="unpaid" (ACH pending) keeps order PENDING_PAYMENT and sends NO confirmation email until async_payment_succeeded', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send({
                ...VALID_REQUEST_BODY,
                paymentMethodType: 'bank',
            });
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            // Step A: checkout.session.completed arrives with payment_status = 'unpaid'
            const unpaidCompletedEvent = {
                id: 'evt_ach_completed_unpaid',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'unpaid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: {
                            orderId:     createdOrder.orderId,
                            clientName:  VALID_REQUEST_BODY.clientName,
                            clientEmail: VALID_REQUEST_BODY.clientEmail,
                            clientPhone: VALID_REQUEST_BODY.clientPhone,
                            serviceName: VALID_REQUEST_BODY.serviceName,
                            date:        VALID_REQUEST_BODY.date,
                            time:        VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(unpaidCompletedEvent);
            const res1 = await sendWebhookRequest(unpaidCompletedEvent);
            expect(res1.status).toBe(200);

            const pendingOrder = getOrderById(createdOrder.orderId);
            expect(pendingOrder.status).toBe(OrderStatus.PENDING_PAYMENT);
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();

            // Step B: 4 business days later, checkout.session.async_payment_succeeded arrives with payment_status = 'paid'
            const asyncSucceededEvent = {
                id: 'evt_ach_async_succeeded',
                type: 'checkout.session.async_payment_succeeded',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: unpaidCompletedEvent.data.object.metadata,
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(asyncSucceededEvent);
            const res2 = await sendWebhookRequest(asyncSucceededEvent);
            expect(res2.status).toBe(200);

            const paidOrder = getOrderById(createdOrder.orderId);
            expect(paidOrder.status).toBe(OrderStatus.PAID);
            expect(paidOrder.emailJob.status).toBe(EmailStatus.SENT);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
            expect(mockCreateCalendarEvent).toHaveBeenCalledTimes(1);
        });

        // Scenario 7: Valid webhook received twice
        it('Scenario 7: Duplicate webhook delivery updates order once and sends only ONE confirmation email', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            const sessionPayload = {
                id: MOCK_SESSION_ID,
                payment_status: 'paid',
                amount_total: 30000,
                currency: 'usd',
                metadata: {
                    orderId:     createdOrder.orderId,
                    clientName:  VALID_REQUEST_BODY.clientName,
                    clientEmail: VALID_REQUEST_BODY.clientEmail,
                    clientPhone: VALID_REQUEST_BODY.clientPhone,
                    serviceName: VALID_REQUEST_BODY.serviceName,
                    date:        VALID_REQUEST_BODY.date,
                    time:        VALID_REQUEST_BODY.time,
                },
            };

            // Delivery 1 (evt_dup_1)
            const event1 = { id: 'evt_dup_1', type: 'checkout.session.completed', livemode: false, data: { object: sessionPayload } };
            mockConstructEvent.mockReturnValueOnce(event1);
            await sendWebhookRequest(event1);

            // Delivery 2 (exact same event ID re-delivered by Stripe)
            mockConstructEvent.mockReturnValueOnce(event1);
            const dupRes1 = await sendWebhookRequest(event1);
            expect(dupRes1.status).toBe(200);
            expect(dupRes1.body.duplicate).toBe(true);

            // Delivery 3 (different event ID e.g. async_payment_succeeded for same session)
            const event2 = { id: 'evt_dup_2', type: 'checkout.session.async_payment_succeeded', livemode: false, data: { object: sessionPayload } };
            mockConstructEvent.mockReturnValueOnce(event2);
            const dupRes2 = await sendWebhookRequest(event2);
            expect(dupRes2.status).toBe(200);
            expect(dupRes2.body.duplicate).toBe(true);

            expect(mockCreateCalendarEvent).toHaveBeenCalledTimes(1);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
        });

        // Scenario 8: Invalid webhook signature
        it('Scenario 8: Invalid webhook signature is rejected with HTTP 400 and causes zero state changes or emails', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);

            mockConstructEvent.mockImplementationOnce(() => {
                throw new Error('No signatures found matching the expected signature for payload');
            });

            const res = await sendWebhookRequest({ id: 'evt_forged' }, 't=123,v1=bad_signature');
            expect(res.status).toBe(400);
            expect(res.text).toContain('Webhook Error:');

            const order = getOrderBySessionId(MOCK_SESSION_ID);
            expect(order.status).toBe(OrderStatus.PENDING_PAYMENT);
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();
        });

        // Scenario 9: Webhook received out of order
        it('Scenario 9: Out-of-order failure, expiration, or unpaid webhooks CANNOT downgrade an already PAID order', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            const paidEvent = {
                id: 'evt_paid_first',
                type: 'checkout.session.async_payment_succeeded',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: {
                            orderId:     createdOrder.orderId,
                            clientName:  VALID_REQUEST_BODY.clientName,
                            clientEmail: VALID_REQUEST_BODY.clientEmail,
                            clientPhone: VALID_REQUEST_BODY.clientPhone,
                            serviceName: VALID_REQUEST_BODY.serviceName,
                            date:        VALID_REQUEST_BODY.date,
                            time:        VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(paidEvent);
            await sendWebhookRequest(paidEvent);
            expect(getOrderById(createdOrder.orderId).status).toBe(OrderStatus.PAID);

            // Out-of-order delayed checkout.session.completed (unpaid) arrives late
            const lateUnpaidEvent = {
                id: 'evt_late_unpaid',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'unpaid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: { orderId: createdOrder.orderId },
                    },
                },
            };
            mockConstructEvent.mockReturnValueOnce(lateUnpaidEvent);
            await sendWebhookRequest(lateUnpaidEvent);
            expect(getOrderById(createdOrder.orderId).status).toBe(OrderStatus.PAID);

            // Out-of-order async_payment_failed arrives late
            const lateFailedEvent = {
                id: 'evt_late_failed',
                type: 'checkout.session.async_payment_failed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'unpaid',
                        metadata: { orderId: createdOrder.orderId },
                    },
                },
            };
            mockConstructEvent.mockReturnValueOnce(lateFailedEvent);
            await sendWebhookRequest(lateFailedEvent);
            expect(getOrderById(createdOrder.orderId).status).toBe(OrderStatus.PAID);

            // Out-of-order expired event arrives late
            const lateExpiredEvent = {
                id: 'evt_late_expired',
                type: 'checkout.session.expired',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'unpaid',
                        metadata: { orderId: createdOrder.orderId },
                    },
                },
            };
            mockConstructEvent.mockReturnValueOnce(lateExpiredEvent);
            await sendWebhookRequest(lateExpiredEvent);
            expect(getOrderById(createdOrder.orderId).status).toBe(OrderStatus.PAID);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
        });

        // Scenario 10: Webhook arrives after customer closes browser
        it('Scenario 10: Webhook arriving after customer closes browser updates order to PAID and sends email without any frontend callback', async () => {
            // Simulate a webhook arriving even if the server restarted or browser closed immediately
            const standaloneSessionId = 'cs_test_closed_browser_999';
            const standaloneEvent = {
                id: 'evt_closed_browser',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: standaloneSessionId,
                        payment_status: 'paid',
                        amount_total: 15000,
                        currency: 'usd',
                        metadata: {
                            clientName:    'Alice Smith',
                            clientEmail:   'alice@example.com',
                            clientPhone:   '714-555-9999',
                            clientAddress: 'In-Studio',
                            serviceName:   'Deluxe Makeup Only',
                            date:          '2026-11-20',
                            time:          '14:00',
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(standaloneEvent);
            const res = await sendWebhookRequest(standaloneEvent);
            expect(res.status).toBe(200);

            const order = getOrderBySessionId(standaloneSessionId);
            expect(order).not.toBeNull();
            expect(order.status).toBe(OrderStatus.PAID);
            expect(order.emailJob.status).toBe(EmailStatus.SENT);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
        });

        // Scenario 11: Database transaction fails
        it('Scenario 11: Database transaction failure returns HTTP 500, leaves no partial PAID state, and sends NO email', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            setSimulatedDbFailureForTests(true);

            const paidEvent = {
                id: 'evt_db_fail_1',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: {
                            orderId:     createdOrder.orderId,
                            clientName:  VALID_REQUEST_BODY.clientName,
                            clientEmail: VALID_REQUEST_BODY.clientEmail,
                            clientPhone: VALID_REQUEST_BODY.clientPhone,
                            serviceName: VALID_REQUEST_BODY.serviceName,
                            date:        VALID_REQUEST_BODY.date,
                            time:        VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(paidEvent);
            const res = await sendWebhookRequest(paidEvent);

            expect(res.status).toBe(500);
            const orderAfterFail = getOrderById(createdOrder.orderId);
            expect(orderAfterFail.status).toBe(OrderStatus.PENDING_PAYMENT);
            expect(orderAfterFail.emailJob.status).toBe(EmailStatus.NONE);
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();

            // When DB recovers and Stripe retries the same webhook, it succeeds cleanly
            setSimulatedDbFailureForTests(false);
            mockConstructEvent.mockReturnValueOnce(paidEvent);
            const retryRes = await sendWebhookRequest(paidEvent);
            expect(retryRes.status).toBe(200);
            expect(getOrderById(createdOrder.orderId).status).toBe(OrderStatus.PAID);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
        });

        // Scenario 12: Email provider fails
        it('Scenario 12: Email provider failure keeps order PAID, records email FAILED, and allows safe retry without duplicating Calendar events', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            // Simulate Resend outage on initial webhook processing
            mockSendConfirmationEmail.mockRejectedValueOnce(new Error('Resend API 503 Service Unavailable'));

            const paidEvent = {
                id: 'evt_email_fail_1',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: {
                            orderId:     createdOrder.orderId,
                            clientName:  VALID_REQUEST_BODY.clientName,
                            clientEmail: VALID_REQUEST_BODY.clientEmail,
                            clientPhone: VALID_REQUEST_BODY.clientPhone,
                            serviceName: VALID_REQUEST_BODY.serviceName,
                            date:        VALID_REQUEST_BODY.date,
                            time:        VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(paidEvent);
            const res = await sendWebhookRequest(paidEvent);
            expect(res.status).toBe(200);

            // Payment MUST remain PAID even though email failed
            const orderAfterEmailFail = getOrderById(createdOrder.orderId);
            expect(orderAfterEmailFail.status).toBe(OrderStatus.PAID);
            expect(orderAfterEmailFail.calendarStatus).toBe(CalendarStatus.CREATED);
            expect(orderAfterEmailFail.emailJob.status).toBe(EmailStatus.FAILED);
            expect(orderAfterEmailFail.emailJob.attempts).toBe(1);
            expect(mockCreateCalendarEvent).toHaveBeenCalledTimes(1);

            // Now retry the failed email via POST /api/stripe/retry-email
            mockSendConfirmationEmail.mockResolvedValueOnce({ id: 'email_recovered_1' });
            const retryRes = await request(app)
                .post('/api/stripe/retry-email')
                .send({ orderId: createdOrder.orderId });

            expect(retryRes.status).toBe(200);
            expect(retryRes.body.emailStatus).toBe(EmailStatus.SENT);

            const orderAfterRetry = getOrderById(createdOrder.orderId);
            expect(orderAfterRetry.status).toBe(OrderStatus.PAID);
            expect(orderAfterRetry.emailJob.status).toBe(EmailStatus.SENT);
            expect(orderAfterRetry.emailJob.attempts).toBe(2);

            // Calendar event was NOT duplicated during the email retry!
            expect(mockCreateCalendarEvent).toHaveBeenCalledTimes(1);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(2);
        });

        // Scenario 13: Concurrent identical webhook events
        it('Scenario 13: Concurrent identical webhook deliveries produce no duplicate side effects', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            // Add a small async delay to calendar creation so both requests overlap in-flight
            mockCreateCalendarEvent.mockImplementationOnce(
                () => new Promise(resolve => setTimeout(resolve, 40))
            );

            const concurrentEvent = {
                id: 'evt_concurrent_1',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 30000,
                        currency: 'usd',
                        metadata: {
                            orderId:     createdOrder.orderId,
                            clientName:  VALID_REQUEST_BODY.clientName,
                            clientEmail: VALID_REQUEST_BODY.clientEmail,
                            clientPhone: VALID_REQUEST_BODY.clientPhone,
                            serviceName: VALID_REQUEST_BODY.serviceName,
                            date:        VALID_REQUEST_BODY.date,
                            time:        VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValue(concurrentEvent);

            const [resA, resB] = await Promise.all([
                sendWebhookRequest(concurrentEvent),
                sendWebhookRequest(concurrentEvent),
            ]);

            expect(resA.status).toBe(200);
            expect(resB.status).toBe(200);
            expect(mockCreateCalendarEvent).toHaveBeenCalledTimes(1);
            expect(mockSendConfirmationEmail).toHaveBeenCalledTimes(1);
        });

        // Scenario 14: Payment amount mismatch
        it('Scenario 14: Payment amount mismatch is rejected (HTTP 400), order is NOT marked PAID, and NO confirmation email is sent', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ id: MOCK_SESSION_ID, url: MOCK_CHECKOUT_URL });
            await request(app).post('/create-checkout-session').send(VALID_REQUEST_BODY);
            const createdOrder = getOrderBySessionId(MOCK_SESSION_ID);

            // Expected amount is 30000 cents ($300), but webhook reports 500 cents ($5)
            const mismatchedEvent = {
                id: 'evt_mismatch_1',
                type: 'checkout.session.completed',
                livemode: false,
                data: {
                    object: {
                        id: MOCK_SESSION_ID,
                        payment_status: 'paid',
                        amount_total: 500,
                        currency: 'usd',
                        metadata: {
                            orderId:     createdOrder.orderId,
                            clientName:  VALID_REQUEST_BODY.clientName,
                            clientEmail: VALID_REQUEST_BODY.clientEmail,
                            clientPhone: VALID_REQUEST_BODY.clientPhone,
                            serviceName: VALID_REQUEST_BODY.serviceName,
                            date:        VALID_REQUEST_BODY.date,
                            time:        VALID_REQUEST_BODY.time,
                        },
                    },
                },
            };

            mockConstructEvent.mockReturnValueOnce(mismatchedEvent);
            const res = await sendWebhookRequest(mismatchedEvent);

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/Amount mismatch/i);

            const orderAfterMismatch = getOrderById(createdOrder.orderId);
            expect(orderAfterMismatch.status).toBe(OrderStatus.PENDING_PAYMENT);
            expect(orderAfterMismatch.mismatchAlert).toMatch(/Amount mismatch/i);
            expect(mockSendConfirmationEmail).not.toHaveBeenCalled();
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();
        });

        // Bonus Security Scenario: Unauthenticated POST /api/calendar/create-event
        it('Rejects unverified public calls to POST /api/calendar/create-event with HTTP 403', async () => {
            const res = await request(app)
                .post('/api/calendar/create-event')
                .send({
                    clientName:  'Jane Doe',
                    clientEmail: 'jane@example.com',
                    clientPhone: '714-555-0123',
                    serviceName: 'Bridal Makeup',
                    date:        '2026-12-15',
                    time:        '10:00',
                });

            expect(res.status).toBe(403);
            expect(mockCreateCalendarEvent).not.toHaveBeenCalled();
        });
    });
});
