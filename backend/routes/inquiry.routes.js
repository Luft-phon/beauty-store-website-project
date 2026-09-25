import { Router } from 'express';
import { sendInquiry } from '../controllers/inquiry.controller.js';

const router = Router();

/**
 * POST /api/send-inquiry
 * Receives bridal/custom inquiry form data and sends an internal
 * notification email to the boutique via Gmail SMTP.
 */
router.post('/', sendInquiry);

export default router;
