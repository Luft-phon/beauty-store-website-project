import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Google Calendar Configuration
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// Construct path to key file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google Calendar Credentials
// Determine which method to use: JSON content env var (Cloud) or File path env var (Local)
let KEYFILEPATH;
const GOOGLE_CREDENTIALS_JSON = process.env.GOOGLE_CREDENTIALS_JSON;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!GOOGLE_CREDENTIALS_JSON && !GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn('WARNING: Neither GOOGLE_CREDENTIALS_JSON nor GOOGLE_APPLICATION_CREDENTIALS is set. Calendar features will fail.');
} else if (GOOGLE_APPLICATION_CREDENTIALS) {
    KEYFILEPATH = path.resolve(GOOGLE_APPLICATION_CREDENTIALS);
}


// Helper to get authenticated JWT client
const getAuthClient = async () => {
    try {
        if (GOOGLE_CREDENTIALS_JSON) {
            const credentials = JSON.parse(GOOGLE_CREDENTIALS_JSON);
            const auth = new google.auth.GoogleAuth({
                credentials,
                scopes: SCOPES,
            });
            return await auth.getClient();
        }

        if (KEYFILEPATH) {
            const auth = new google.auth.GoogleAuth({
                keyFile: KEYFILEPATH,
                scopes: SCOPES,
            });
            return await auth.getClient();
        }

        throw new Error("No Google Credentials available.");
    } catch (error) {
        console.error("Error loading credentials:", error);
        throw new Error("Failed to load Google credentials. Check your environment variables.");
    }
};
// API Endpoint to create an event
app.post('/api/calendar/create-event', async (req, res) => {
    try {
        const { clientName, clientEmail, serviceName, date, time } = req.body;

        if (!clientName || !clientEmail || !serviceName || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Expect: date = YYYY-MM-DD, time = HH:mm
        const [year, month, day] = date.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);

        if (
            [year, month, day, hours, minutes].some(n => Number.isNaN(n))
        ) {
            return res.status(400).json({ error: 'Invalid date or time format' });
        }

        const startDateTime = new Date(year, month - 1, day, hours, minutes);
        const endDateTime = new Date(startDateTime.getTime() + 90 * 60000);

        const authClient = await getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth: authClient });

        const event = {
            summary: `Appointment: ${serviceName} - ${clientName}`,
            location: '7862 Warner Ave Ste A, Huntington Beach, CA',
            description: `Client: ${clientName}\nEmail: ${clientEmail}\nService: ${serviceName}`,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            requestBody: event,
        });

        res.status(200).json({ success: true, link: response.data.htmlLink });

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// API Endpoint to do payment
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
    console.warn('WARNING: STRIPE_SECRET_KEY is not set. Payment features will fail.');
}
const stripe = new Stripe(STRIPE_SECRET_KEY);

const YOUR_DOMAIN = process.env.CLIENT_DOMAIN;

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items } = req.body;

        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100), // convert to cents
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment-success`,
            cancel_url: `${YOUR_DOMAIN}/payment-canceled`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        // Return actual error message for debugging purposes
        res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
