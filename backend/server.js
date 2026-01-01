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

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS is not set');
}

const KEYFILEPATH = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);


// Helper to get authenticated JWT client
const getAuthClient = async () => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
        return await auth.getClient();
    } catch (error) {
        console.error("Error loading credentials:", error);
        throw new Error("Failed to load Google credentials. Please check your .env file and ensure the JSON key file exists.");
    }
};
// API Endpoint to create an event
app.post('/api/calendar/create-event', async (req, res) => {
    try {
        const { clientName, clientEmail, serviceName, date, time } = req.body;
        if (!clientName || !clientEmail || !serviceName || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const authClient = await getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth: authClient });
        // Parse date and time to create start/end ISO strings
        // Time format expected: "HH:MM AM/PM" (e.g. "09:00 AM")
        const dateParts = date.split('-'); // YYYY-MM-DD
        const timeParts = time.match(/(\d+):(\d+) (AM|PM)/);
        let startDateTime = new Date();
        if (dateParts && timeParts) {
            let hours = parseInt(timeParts[1]);
            const minutes = parseInt(timeParts[2]);
            const isPM = timeParts[3] === 'PM';
            if (isPM && hours !== 12) hours += 12;
            if (!isPM && hours === 12) hours = 0;
            // Note: Month is 0-indexed in JS Date
            startDateTime = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), hours, minutes);
        }
        const endDateTime = new Date(startDateTime.getTime() + 90 * 60000); // Default 90 minutes duration
        // Create the event
        const event = {
            summary: `Appointment: ${serviceName} - ${clientName}`,
            location: '7862 Warner Ave Ste A, Huntington Beach, CA',
            description: `Client: ${clientName}\nEmail: ${clientEmail}\nService: ${serviceName}`,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'America/Los_Angeles', // Adjust to your timezone
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            description: `Client: ${clientName}\nEmail: ${clientEmail}\nService: ${serviceName}`,
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
        };
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        console.log(`Attempting to create event in calendar: ${calendarId}`);
        const response = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: event,
        });
        console.log('Event created:', response.data.htmlLink);
        res.status(200).json({ success: true, link: response.data.htmlLink });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


// API Endpoint to do payment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
            success_url: `/payment-success`,
            cancel_url: `/payment-canceled`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
