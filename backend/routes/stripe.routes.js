import { Router } from 'express';
import {
    handleWebhook,
    createCheckoutSession,
    getSessionStatus,
    retryOrderEmail,
} from '../controllers/stripe.controller.js';

const router = Router();

/**
 * POST /api/stripe/webhook
 *
 * NOTE: The express.raw({ type: 'application/json' }) middleware is intentionally
 * applied in app.js at the app level for this specific path — NOT here.
 * This is because express.raw() must be registered before express.json() at the
 * app level to guarantee the raw body is available for signature verification.
 */
router.post('/webhook', handleWebhook);

/**
 * GET /api/stripe/session-status?session_id=...&order_id=...
 * Read-only verification endpoint for order & payment state.
 */
router.get('/session-status', getSessionStatus);

/**
 * POST /api/stripe/retry-email
 * Safely retries a failed confirmation email for a verified PAID order.
 */
router.post('/retry-email', retryOrderEmail);

/**
 * POST /create-checkout-session
 * Re-exported so app.js can mount it at root level ('/')
 * to stay backward-compatible with the frontend's hardcoded production URL.
 */
export { createCheckoutSession };

export default router;
