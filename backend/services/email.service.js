import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Escapes HTML special characters to prevent HTML/script injection in emails.
 *
 * @param {string} value
 * @returns {string}
 */
const escapeHtml = (value) => {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

/**
 * Sends a booking confirmation email to the client and the boutique inbox.
 * Uses Resend API (not SMTP) — avoids Render's SMTP port restrictions.
 *
 * CRITICAL: Must ONLY be called after verified Stripe payment success.
 *
 * @param {object} params
 * @param {string} params.clientName
 * @param {string} params.clientEmail
 * @param {string} params.clientPhone
 * @param {string} params.clientAddress
 * @param {string} params.serviceName
 * @param {string} params.date
 * @param {string} params.time
 */
export const sendConfirmationEmail = async ({
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    serviceName,
    date,
    time,
}) => {
    if (!clientEmail || typeof clientEmail !== 'string' || !clientEmail.trim()) {
        throw new Error('Cannot send confirmation email: clientEmail is missing');
    }

    if (process.env.DISABLE_EMAIL === 'true') {
        console.log(`📧 Confirmation email skipped for ${clientEmail}`);
        return { skipped: true };
    }

    const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        'confirmation_email.html'
    );

    let htmlContent = await fs.readFile(templatePath, 'utf8');

    htmlContent = htmlContent
        .replace(/{{clientName}}/g,  escapeHtml(clientName))
        .replace(/{{serviceName}}/g, escapeHtml(serviceName))
        .replace(/{{date}}/g,        escapeHtml(date))
        .replace(/{{time}}/g,        escapeHtml(time))
        .replace(/{{location}}/g,    escapeHtml(clientAddress || 'In-Studio'))
        .replace(/{{clientPhone}}/g, escapeHtml(clientPhone));

    const result = await resend.emails.send({
        from: 'Le Charme Beauty <booking@lecharmeboutique.com>',
        to: [clientEmail.trim()],
        bcc: [
            'Lecharme.beauteboutique@gmail.com',
            'thanhphongchupanh@gmail.com',
        ],
        subject: `Booking Confirmed: ${serviceName} - ${date}`,
        html: htmlContent,
    });

    if (result && result.error) {
        throw new Error(result.error.message || 'Resend email delivery failed');
    }

    console.log(`✅ Confirmation email sent to ${clientEmail}`, result);
    return result;
};

/**
 * Sends a new bridal/custom inquiry notification to the boutique inbox.
 * Uses Gmail SMTP via Nodemailer (SMTP_USER / SMTP_PASS env vars).
 *
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.phone
 * @param {string} params.travelfee
 * @param {string} params.date
 * @param {string} params.time
 * @param {string} params.serviceName
 * @param {string} params.message
 */
export const sendInquiryEmail = async ({ name, email, phone, travelfee, date, time, serviceName, message }) => {
    if (process.env.DISABLE_EMAIL === 'true') {
        console.log(`📧 Inquiry email skipped for ${email}`);
        return;
    }

    const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        'inquiry_email.html'
    );

    let htmlContent = await fs.readFile(templatePath, 'utf8');

    const safeMessage = message
        ? escapeHtml(message).replace(/\n/g, '<br>')
        : 'No extra message provided.';

    htmlContent = htmlContent
        .replace(/{{name}}/g,        escapeHtml(name))
        .replace(/{{email}}/g,       escapeHtml(email))
        .replace(/{{phone}}/g,       escapeHtml(phone))
        .replace(/{{travelfee}}/g,   escapeHtml(travelfee ?? ''))
        .replace(/{{date}}/g,        escapeHtml(date ?? ''))
        .replace(/{{time}}/g,        escapeHtml(time ?? ''))
        .replace(/{{serviceName}}/g, escapeHtml(serviceName || 'General Inquiry'))
        .replace(/{{message}}/g,     safeMessage);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const mailOptions = {
        from:    process.env.SMTP_USER || '"Website Inquiry" <noreply@example.com>',
        to:      'Lecharme.beauteboutique@gmail.com',
        subject: `New Inquiry from ${name}`,
        html:    htmlContent,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Inquiry email sent from ${email}`);
    } else {
        console.warn('⚠️  SMTP credentials missing — inquiry email NOT sent.');
    }
};
