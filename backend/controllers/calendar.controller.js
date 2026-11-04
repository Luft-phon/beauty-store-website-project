import { createCalendarEvent } from '../services/calendar.service.js';
import { OrderStatus, getOrderById, getOrderBySessionId } from '../services/order.service.js';

/**
 * POST /api/calendar/create-event
 * Creates a Google Calendar appointment only when backed by a verified PAID
 * order/session OR an authorized internal admin key.
 *
 * Never triggers confirmation emails directly from unverified client requests.
 */
export const createEvent = async (req, res) => {
    try {
        const {
            clientName,
            clientEmail,
            clientAddress,
            serviceName,
            date,
            time,
            clientPhone,
            sessionId,
            orderId,
        } = req.body || {};

        if (!clientName || !clientEmail || !serviceName || !date || !time || !clientPhone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Security check: require either a valid internal admin key or a verified PAID order/session
        const adminKey = req.headers['x-admin-api-key'];
        const hasValidAdminKey =
            Boolean(process.env.INTERNAL_ADMIN_KEY) &&
            adminKey === process.env.INTERNAL_ADMIN_KEY;

        if (!hasValidAdminKey) {
            const order = sessionId
                ? getOrderBySessionId(String(sessionId))
                : orderId
                    ? getOrderById(String(orderId))
                    : null;

            if (!order || order.status !== OrderStatus.PAID) {
                return res.status(403).json({
                    error: 'Verified PAID order session or admin authorization is required',
                });
            }
        }

        await createCalendarEvent({
            clientName,
            clientEmail,
            clientAddress,
            serviceName,
            date,
            time,
            clientPhone,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('❌ Calendar event creation error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
