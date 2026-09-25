/**
 * backend/tests/stripe.test.js
 *
 * Tests for POST /create-checkout-session
 *
 * External dependencies mocked:
 * - 'stripe' npm package  →  vi.mock('stripe') + vi.hoisted()
 *
 *   vi.mock() is hoisted to the top of the file by Vitest BEFORE any variable
 *   declarations run. To share mock state between the factory and test bodies,
 *   we use vi.hoisted() — which is also hoisted, so its return value IS available
 *   inside the vi.mock() factory.
 *
 * Safety guarantees (no live Stripe calls):
 * - The real Stripe SDK is never instantiated (vi.mock intercepts the import)
 * - STRIPE_SECRET_KEY is set to 'sk_test_dummy_key_for_tests_only' in setup.js
 *   (a clearly fake value — never starts with sk_live_)
 * - No real checkout sessions, payments, or customers are created anywhere
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// ---------------------------------------------------------------------------
// vi.hoisted() — runs at hoist-time, return values can be used inside vi.mock()
// ---------------------------------------------------------------------------
const { mockSessionsCreate, mockStripeInstance } = vi.hoisted(() => {
    const mockSessionsCreate = vi.fn();
    const mockStripeInstance = {
        checkout: {
            sessions: {
                create: mockSessionsCreate,
            },
        },
        webhooks: {
            constructEvent: vi.fn(),
        },
    };
    return { mockSessionsCreate, mockStripeInstance };
});

// ---------------------------------------------------------------------------
// Mock the entire 'stripe' module.
// The default export is a constructor — we replace it with a function that
// always returns our stable mockStripeInstance.
// ---------------------------------------------------------------------------
vi.mock('stripe', () => {
    const MockStripe = vi.fn(() => mockStripeInstance);
    return { default: MockStripe };
});

// Import app AFTER vi.mock() declaration so it receives the mocked Stripe.
// (Vitest processes all vi.mock() calls before any imports, regardless of order.)
import app from '../app.js';

// ---------------------------------------------------------------------------
// Shared test data
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

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /create-checkout-session', () => {

    beforeEach(() => {
        // Reset mock call history and implementation between tests.
        // (vitest.config clearMocks:true clears calls, but mockReset also
        //  clears any queued mockResolvedValueOnce implementations.)
        mockSessionsCreate.mockReset();
    });

    // ---- Success case -------------------------------------------------------

    describe('success case', () => {
        it('returns HTTP 200 with the Stripe checkout URL', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            const res = await request(app)
                .post('/create-checkout-session')
                .send(VALID_REQUEST_BODY);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ url: MOCK_CHECKOUT_URL });
        });

        it('calls stripe.checkout.sessions.create exactly once', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            await request(app)
                .post('/create-checkout-session')
                .send(VALID_REQUEST_BODY);

            expect(mockSessionsCreate).toHaveBeenCalledTimes(1);
        });

        it('calls Stripe with mode: "payment"', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            await request(app)
                .post('/create-checkout-session')
                .send(VALID_REQUEST_BODY);

            const [calledWith] = mockSessionsCreate.mock.calls[0];
            expect(calledWith.mode).toBe('payment');
        });

        it('maps items to Stripe line_items format correctly', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            await request(app)
                .post('/create-checkout-session')
                .send(VALID_REQUEST_BODY);

            const [calledWith] = mockSessionsCreate.mock.calls[0];
            expect(calledWith.line_items).toHaveLength(1);
            expect(calledWith.line_items[0]).toMatchObject({
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Bridal Makeup — Full Package' },
                    unit_amount: 30000,   // $300 × 100 cents
                },
                quantity: 1,
            });
        });

        it('includes all booking fields in Stripe metadata', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

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
        });

        it('includes success_url and cancel_url', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            await request(app)
                .post('/create-checkout-session')
                .send(VALID_REQUEST_BODY);

            const [calledWith] = mockSessionsCreate.mock.calls[0];
            expect(calledWith.success_url).toContain('/payment-success');
            expect(calledWith.cancel_url).toContain('/payment-canceled');
        });

        it('uses payment_method_types: ["card"] for card payment', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            await request(app)
                .post('/create-checkout-session')
                .send({ ...VALID_REQUEST_BODY, paymentMethodType: 'card' });

            const [calledWith] = mockSessionsCreate.mock.calls[0];
            expect(calledWith.payment_method_types).toEqual(['card']);
        });

        it('uses payment_method_types: ["us_bank_account"] for bank payment', async () => {
            mockSessionsCreate.mockResolvedValueOnce({ url: MOCK_CHECKOUT_URL });

            await request(app)
                .post('/create-checkout-session')
                .send({ ...VALID_REQUEST_BODY, paymentMethodType: 'bank' });

            const [calledWith] = mockSessionsCreate.mock.calls[0];
            expect(calledWith.payment_method_types).toEqual(['us_bank_account']);
        });
    });

    // ---- Stripe failure case ------------------------------------------------

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
