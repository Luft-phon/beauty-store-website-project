import { createCalendarEvent } from '../services/calendar.service.js';

/**
 * POST /api/calendar/create-event
 * Manually creates a Google Calendar appointment.
 * Used as a fallback (Postman, success page) when the Stripe webhook is unavailable.
 *
 * Note: Confirmation email sending is intentionally commented out here —
 * in production the webhook handles it. Uncomment if needed for manual flow.
 */
export const createEvent = async (req, res) => {
    try {
        const { clientName, clientEmail, clientAddress, serviceName, date, time, clientPhone } = req.body;

        if (!clientName || !clientEmail || !serviceName || !date || !time || !clientPhone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await createCalendarEvent({ clientName, clientEmail, clientAddress, serviceName, date, time, clientPhone });

        // await sendConfirmationEmail({ clientName, clientEmail, serviceName, date, time, clientAddress, clientPhone });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('❌ Calendar event creation error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
