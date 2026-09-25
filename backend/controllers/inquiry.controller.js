import { sendInquiryEmail } from '../services/email.service.js';

/**
 * POST /api/send-inquiry
 * Handles bridal / custom service inquiries.
 * Sends an internal notification email to the boutique via Gmail SMTP.
 */
export const sendInquiry = async (req, res) => {
    try {
        const { name, email, phone, travelfee, date, time, message, serviceName } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Contact info missing' });
        }

        await sendInquiryEmail({ name, email, phone, travelfee, date, time, message, serviceName });

        res.json({ success: true });
    } catch (error) {
        console.error('❌ Inquiry error:', error.message);
        res.status(500).json({ error: 'Inquiry failed' });
    }
};
