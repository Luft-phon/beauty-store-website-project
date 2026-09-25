import Stripe from 'stripe';
import { getAbsoluteImageUrl } from '../utils/imageUrl.js';
import { createCalendarEvent } from '../services/calendar.service.js';
import { sendConfirmationEmail } from '../services/email.service.js';
import {
    beginStripeSessionProcessing,
    completeStripeSessionProcessing,
    releaseStripeSessionProcessing,
} from '../services/stripeWebhookIdempotency.service.js';

// ---------------------------------------------------------------------------
// Stripe client — initialised once at module load.
// In tests, the 'stripe' npm package is fully mocked via vi.mock('stripe'),
// so this import is replaced before any test code runs.
// ---------------------------------------------------------------------------
const stripe      = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const YOUR_DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:3000';

// ---------------------------------------------------------------------------
// Stripe Webhook
// ---------------------------------------------------------------------------

/**
 * POST /api/stripe/webhook
 *
 * Relevant Checkout events handled here:
 * - checkout.session.completed
 *     Card/instant payment: process only when payment_status === 'paid'.
 *     Delayed bank payment: acknowledge the Checkout completion but wait for
 *     checkout.session.async_payment_succeeded before confirming the booking.
 * - checkout.session.async_payment_succeeded
 *     Payment has completed successfully after an asynchronous payment flow.
 * - checkout.session.async_payment_failed
 *     Payment failed after Checkout; no Calendar event or confirmation email.
 *
 * IMPORTANT: This handler MUST be mounted with express.raw({ type: 'application/json' })
 * BEFORE the global express.json() middleware — see app.js.
 */
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    console.log('WEBHOOK DEBUG', {
        bodyIsBuffer: Buffer.isBuffer(req.body),
        hasSignature: Boolean(sig),
        hasSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
        secretStartsCorrectly:
            process.env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_'),
    });
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET,
        );
    } catch (err) {
        console.error(`❌ Webhook Signature Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Acknowledge a valid Stripe event quickly so Stripe does not retry merely
    // because Calendar/email work takes longer than the webhook request.
    res.json({ received: true });

    const session = event.data?.object;

    switch (event.type) {
        case 'checkout.session.completed': {
            if (session?.payment_status === 'paid') {
                processSuccessfulCheckout(session, event.type).catch(err =>
                    console.error('❌ Background task error:', err.message)
                );
            } else {
                console.log(
                    `⏳ Checkout completed but payment is not settled yet ` +
                    `(session=${session?.id ?? 'unknown'}, payment_status=${session?.payment_status ?? 'unknown'}). ` +
                    `Waiting for checkout.session.async_payment_succeeded.`,
                );
            }
            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            processSuccessfulCheckout(session, event.type).catch(err =>
                console.error('❌ Background task error:', err.message)
            );
            break;
        }

        case 'checkout.session.async_payment_failed': {
            console.warn(
                `⚠️  Async Stripe payment failed ` +
                `(session=${session?.id ?? 'unknown'}, customer=${session?.metadata?.clientEmail ?? 'unknown'}). ` +
                `Booking confirmation was not created.`,
            );
            break;
        }

        default:
            console.log(`ℹ️  Unhandled Stripe event: ${event.type}`);
    }
};

/**
 * Applies the paid-booking side effects exactly once per Checkout Session for
 * the lifetime of this Node process.
 *
 * @param {object} session Stripe Checkout Session
 * @param {string} sourceEventType Event that caused successful processing
 */
const processSuccessfulCheckout = async (session, sourceEventType) => {
    if (!session) {
        console.error(`❌ ${sourceEventType}: missing Checkout Session payload.`);
        return;
    }

    const sessionId = session.id;

    if (!beginStripeSessionProcessing(sessionId)) {
        console.log(`↩️  Duplicate Stripe success ignored for session ${sessionId}.`);
        return;
    }

    try {
        await handleBackgroundTasks(session.metadata || {});
        completeStripeSessionProcessing(sessionId);
        console.log(`✅ Stripe session ${sessionId ?? 'unknown'} processed from ${sourceEventType}.`);
    } catch (error) {
        releaseStripeSessionProcessing(sessionId);
        throw error;
    }
};

/**
 * Runs Google Calendar + confirmation email after a successful payment.
 * Errors here are logged but do NOT change the already-sent webhook response.
 *
 * @param {object} bookingData Stripe session.metadata
 */
const handleBackgroundTasks = async (bookingData) => {
    console.log('⏳ Processing background tasks for:', bookingData.clientName);

    try {
        await createCalendarEvent(bookingData);
        await sendConfirmationEmail(bookingData);
        console.log('✅ Background tasks completed.');
    } catch (error) {
        console.error('❌ Background processing failed:', error.message);
        throw error;
    }
};

// ---------------------------------------------------------------------------
// Create Checkout Session
// ---------------------------------------------------------------------------

/**
 * POST /create-checkout-session
 * Creates a Stripe hosted checkout session for the deposit payment.
 * Deposit is 50% of total; card transactions include 2.9% + $0.30 processing fee
 * (added as a separate line item on the frontend before calling this endpoint).
 */
export const createCheckoutSession = async (req, res) => {
    try {
        const {
            items,
            date, time,
            clientName, clientEmail, clientPhone, clientAddress,
            serviceName,
            paymentMethodType,
        } = req.body;

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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: paymentMethodType === 'bank' ? ['us_bank_account'] : ['card'],
            line_items,
            mode: 'payment',
            metadata: {
                clientName,
                clientEmail,
                clientPhone,
                clientAddress: clientAddress || '',
                serviceName: serviceName || '',
                date,
                time,
            },
            success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment-canceled`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('❌ Stripe checkout error:', error.message);
        res.status(500).json({ error: 'Payment failed' });
    }
};
