import { Router } from 'express';
import { createEvent } from '../controllers/calendar.controller.js';

const router = Router();

/**
 * POST /api/calendar/create-event
 * Manual calendar event creation — used as a fallback when the Stripe webhook
 * is unavailable (e.g. Postman testing, /payment-success page direct call).
 */
router.post('/create-event', createEvent);

export default router;
