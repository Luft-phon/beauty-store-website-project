import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a booking confirmation email to the client and the boutique inbox.
 * Uses Resend API (not SMTP) — avoids Render's SMTP port restrictions.
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
    time
}) => {
    if (process.env.DISABLE_EMAIL === 'true') {
        console.log(`📧 Confirmation email skipped for ${clientEmail}`);
        return;
    }

    const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        'confirmation_email.html'
    );

    let htmlContent = await fs.readFile(templatePath, 'utf8');

    htmlContent = htmlContent
        .replace(/{{clientName}}/g, clientName)
        .replace(/{{serviceName}}/g, serviceName)
        .replace(/{{date}}/g, date)
        .replace(/{{time}}/g, time)
        .replace(/{{location}}/g, clientAddress || 'In-Studio')
        .replace(/{{clientPhone}}/g, clientPhone);

    const data = await resend.emails.send({
        from: 'Le Charme Beauty <booking@lecharmeboutique.com>',
        to: [clientEmail, 'Lecharme.beauteboutique@gmail.com'],
        subject: `Booking Confirmed: ${serviceName} - ${date}`,
        html: htmlContent,
    });

    console.log(`✅ Confirmation email sent to ${clientEmail}`, data);
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

    htmlContent = htmlContent
        .replace(/{{name}}/g,        name)
        .replace(/{{email}}/g,       email)
        .replace(/{{phone}}/g,       phone)
        .replace(/{{travelfee}}/g,   travelfee ?? '')
        .replace(/{{date}}/g,        date ?? '')
        .replace(/{{time}}/g,        time ?? '')
        .replace(/{{serviceName}}/g, serviceName || 'General Inquiry')
        .replace(/{{message}}/g,     message ? message.replace(/\n/g, '<br>') : 'No extra message provided.');

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
