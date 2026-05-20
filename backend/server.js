import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);
// --- Configuration & Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const YOUR_DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:3000';

// --- Global Stripe Initialization ---
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
    console.warn('WARNING: STRIPE_SECRET_KEY is not set. Payment features will fail.');
}
const stripe = new Stripe(STRIPE_SECRET_KEY);

// --- Helper Functions ---

const isValidUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (err) {
        return false;
    }
}; 

const getAbsoluteImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (isValidUrl(imagePath)) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${YOUR_DOMAIN}/${cleanPath}`;
};

const getAuthClient = async () => {
    const jsonStr = process.env.GOOGLE_CREDENTIALS_JSON;
    const filePtr = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    try {
        if (jsonStr) {
            const credentials = JSON.parse(jsonStr);
            const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
            return await auth.getClient();
        }
        if (filePtr) {
            const auth = new google.auth.GoogleAuth({ keyFile: path.resolve(filePtr), scopes: SCOPES });
            return await auth.getClient();
        }
        throw new Error("No Google Credentials available.");
    } catch (error) {
        console.error("Auth error:", error.message);
        throw error;
    }
};

const checkedFormatTime = (dateObj) => {
    return dateObj.toLocaleTimeString('en-GB', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit', minute: '2-digit',
    });
};

const sendConfirmationEmail = async ({ clientName, clientEmail, serviceName, date, time, clientAddress, clientPhone }) => {
    try {
        const templatePath = path.join(__dirname, 'templates', 'confirmation_email.html');
        let htmlContent = await fs.readFile(templatePath, 'utf8');

        htmlContent = htmlContent
            .replace(/{{clientName}}/g, clientName)
            .replace(/{{serviceName}}/g, serviceName)
            .replace(/{{date}}/g, date)
            .replace(/{{time}}/g, time)
            .replace(/{{location}}/g, clientAddress || 'In-Studio')
            .replace(/{{clientPhone}}/g, clientPhone);

        // Sử dụng Resend API qua giao thức HTTP an toàn, không lo bị Render chặn
        const data = await resend.emails.send({
            from: 'Le Charme Beauty <booking@lecharmeboutique.com>',
            to: [clientEmail, 'Lecharme.beauteboutique@gmail.com'],
            subject: `Booking Confirmed: ${serviceName} - ${date}`,
            html: htmlContent
        });

        console.log(`✅ Confirmation emails sent to ${clientEmail}`, data);
    } catch (error) {
        console.error('❌ Email error:', error.message);
        throw error;
    }
};
// --- Middleware ---
app.use(cors());

// Special handling for Stripe Webhook (needs raw body for signature verification)
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    // 1. Xác thực Webhook (Bước này phải nhanh)
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`❌ Webhook Signature Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ 2. PHẢN HỒI STRIPE NGAY LẬP TỨC
    // Stripe nhận được mã 200 này sẽ coi như thành công và không gửi lại (retry) nữa.
    res.json({ received: true });

    // 3. Xử lý logic nặng ở phía sau (Background Processing)
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const bookingData = session.metadata;

        // Lưu ý: Không dùng 'await' ở đây đối với toàn bộ khối xử lý 
        // để Node.js tiếp tục chạy các dòng sau (nếu có) và đóng request.
        handleBackgroundTasks(bookingData).catch(err =>
            console.error('❌ Error in background tasks:', err.message)
        );
    }
});

// Hàm xử lý riêng biệt để code sạch sẽ hơn
async function handleBackgroundTasks(bookingData) {
    console.log('⏳ Processing background tasks for:', bookingData.clientName);

    try {
        const authClient = await getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth: authClient });

        const startDateTime = `${bookingData.date}T${bookingData.time}:00`;
        const [h, m] = bookingData.time.split(':').map(Number);
        const endDateTime = `${bookingData.date}T${String(h + 1).padStart(2, '0')}:${m}:00`;

        // Tác vụ 1: Google Calendar
        await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            requestBody: {
                summary: `Appointment: ${bookingData.serviceName} - ${bookingData.clientName}`,
                location: bookingData.clientAddress,
                description: `Service: ${bookingData.serviceName}\nClient: ${bookingData.clientName}\nPhone: ${bookingData.clientPhone}\nEmail: ${bookingData.clientEmail}`,
                start: { dateTime: startDateTime, timeZone: 'America/Los_Angeles' },
                end: { dateTime: endDateTime, timeZone: 'America/Los_Angeles' },
            },
        });
        console.log('✅ Google Calendar event created.');

        // Tác vụ 2: Gửi Email (Đảm bảo đã fix lỗi IPv4/family: 4 trong hàm này)
        await sendConfirmationEmail(bookingData);
        console.log('✅ Confirmation email sent.');

    } catch (error) {
        // Lỗi ở đây sẽ hiện trong log của Render nhưng không làm Stripe báo Fail
        console.error('❌ Background processing failed:', error.message);
    }
}

app.use(bodyParser.json());

// --- Routes ---

// 1. Google Calendar: Manual Event Creation (Used by Success Page & Postman)
app.post('/api/calendar/create-event', async (req, res) => {
    try {
        const { clientName, clientEmail, clientAddress, serviceName, date, time, clientPhone } = req.body;

        if (!clientName || !clientEmail || !serviceName || !date || !time || !clientPhone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const startDateTime = `${date}T${time}:00`;
        const [h, m] = time.split(':').map(Number);
        const endDateTime = `${date}T${String(h + 1).padStart(2, '0')}:${m}:00`;

        const authClient = await getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth: authClient });

        await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            requestBody: {
                summary: `Appointment: ${serviceName} - ${clientName}`,
                location: clientAddress,
                description: `Service: ${serviceName}\nClient: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}`,
                start: { dateTime: startDateTime, timeZone: 'America/Los_Angeles' },
                end: { dateTime: endDateTime, timeZone: 'America/Los_Angeles' },
            },
        });

        // ✅ SEND CONFIRMATION EMAIL
        // await sendConfirmationEmail({ clientName, clientEmail, serviceName, date, time, clientAddress, clientPhone });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error creating event:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items, date, time, clientName, clientEmail, clientPhone, clientAddress, serviceName, paymentMethodType } = req.body;

        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name, images: getAbsoluteImageUrl(item.image) ? [getAbsoluteImageUrl(item.image)] : [] },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: paymentMethodType === 'bank' ? ['us_bank_account'] : ['card'],
            line_items,
            mode: 'payment',
            metadata: { clientName, clientEmail, clientPhone, clientAddress: clientAddress || '', serviceName: serviceName || '', date, time },
            success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment-canceled`,
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error.message);
        res.status(500).json({ error: 'Payment failed' });
    }
});

// 3. Free Route Calculation: Nominatim + OpenRouteService
app.post('/api/calculate-distance', async (req, res) => {
    try {
        const { origin, destination } = req.body;
        const ORS_API_KEY = process.env.ORS_API_KEY;

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and destination required' });
        }

        if (!ORS_API_KEY) {
            console.warn('ORS_API_KEY missing in .env. Distance calculation might fail.');
        }

        // --- Step 1: Geocode Addresses ---
        // Store Coordinates are fixed (7862 Warner Ave, Huntington Beach, CA 92646)
        const STORE_COORDS = { lon: -117.9904179, lat: 33.7157647 };

        const geocode = async (address) => {
            // Internal helper to fetch from Nominatim
            const fetchCoords = async (query) => {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
                const response = await fetch(url, { headers: { 'User-Agent': 'LeCharmeBeautyStore/1.0' } });
                const data = await response.json();
                return data && data.length > 0 ? { lon: parseFloat(data[0].lon), lat: parseFloat(data[0].lat) } : null;
            };

            // Try full address first
            let coords = await fetchCoords(address);

            // Fallback: If it fails, try stripping "Ste", "Unit", "Apt" etc.
            if (!coords) {
                const simplerAddress = address.replace(/(Ste|Unit|Apt|Suite)\s+\w+,?\s?/i, '');
                console.log(`Geocode failed for full address. Trying simpler version: ${simplerAddress}`);
                coords = await fetchCoords(simplerAddress);
            }

            if (!coords) throw new Error(`Could not find coordinates for: ${address}`);
            return coords;
        };

        // Determine which addresses to geocode
        // Note: The frontend sends the store address as "STORE_ADDRESS" in some contexts,
        // but it's more reliable to check if the address matches the store string.
        const STORE_ADDRESS_STR = "7862 Warner Ave Ste A, Huntington Beach, CA 92646";

        const originCoords = (origin === STORE_ADDRESS_STR) ? STORE_COORDS : await geocode(origin);
        const destCoords = (destination === STORE_ADDRESS_STR) ? STORE_COORDS : await geocode(destination);

        // --- Step 2: Calculate Distance via OpenRouteService Matrix API ---
        const orsUrl = `https://api.openrouteservice.org/v2/matrix/driving-car`;
        const orsResponse = await fetch(orsUrl, {
            method: 'POST',
            headers: {
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                locations: [
                    [originCoords.lon, originCoords.lat],
                    [destCoords.lon, destCoords.lat]
                ],
                metrics: ['distance', 'duration'],
                sources: [0],
                destinations: [1],
                units: 'mi'
            })
        });

        const orsData = await orsResponse.json();

        if (orsData.error) {
            throw new Error(orsData.error.message || 'OpenRouteService Error');
        }

        // Format to match the frontend expectations (mimicking Google response structure)
        const distanceValue = orsData.distances[0][0]; // in miles
        const durationValue = orsData.durations[0][0] / 60; // convert seconds to minutes

        res.json({
            status: 'OK',
            rows: [{
                elements: [{
                    status: 'OK',
                    distance: { text: `${distanceValue.toFixed(1)} miles`, value: distanceValue },
                    duration: { text: `${Math.round(durationValue)} mins`, value: durationValue }
                }]
            }]
        });

    } catch (error) {
        console.error('Free Route error:', error.message);
        res.status(500).json({ error: 'Failed to calculate distance using free API' });
    }
});

// 4. Nodemailer: Handle Inquiry
app.post('/api/send-inquiry', async (req, res) => {
    try {
        const { name, email, phone, travelfee, date, time, message, serviceName } = req.body;

        if (!name || !email || !phone) return res.status(400).json({ error: 'Contact info missing' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });

        const templatePath = path.join(__dirname, 'templates', 'inquiry_email.html');
        let htmlContent = await fs.readFile(templatePath, 'utf8');

        // Replace placeholders
        htmlContent = htmlContent
            .replace(/{{name}}/g, name)
            .replace(/{{email}}/g, email)
            .replace(/{{phone}}/g, phone)
            .replace(/{{travelfee}}/g, travelfee)
            .replace(/{{date}}/g, date)
            .replace(/{{time}}/g, time)
            .replace(/{{serviceName}}/g, serviceName || 'General Inquiry')
            .replace(/{{message}}/g, message ? message.replace(/\n/g, '<br>') : 'No extra message provided.');

        const mailOptions = {
            from: process.env.SMTP_USER || '"Website Inquiry" <noreply@example.com>',
            to: 'Lecharme.beauteboutique@gmail.com',
            subject: `New Inquiry from ${name}`,
            html: htmlContent
        };

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.warn('SMTP credentials missing');
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Inquiry error:', error.message);
        res.status(500).json({ error: 'Inquiry failed' });
    }
});

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Trusting client domain: ${YOUR_DOMAIN}`);
});
