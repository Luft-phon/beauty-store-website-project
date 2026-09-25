import { Router } from 'express';
import { handleWebhook, createCheckoutSession } from '../controllers/stripe.controller.js';

const router = Router();

/**
 * POST /api/stripe/webhook
 *
 * NOTE: The express.raw({ type: 'application/json' }) middleware is intentionally
 * applied in server.js at the app level for this specific path — NOT here.
 * This is because express.raw() must be registered before express.json() at the
 * app level to guarantee the raw body is available for signature verification.
 *
 * See server.js for the mounting order.
 */
router.post('/webhook', handleWebhook);

/**
 * POST /create-checkout-session
 * Re-exported so server.js can mount it at root level ('/')
 * to stay backward-compatible with the frontend's hardcoded production URL.
 */
export { createCheckoutSession };

export default router;
