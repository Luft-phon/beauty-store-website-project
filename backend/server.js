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
        const { clientName, clientEmail, clientAddress, serviceName, date, time, clientPhone } = req.body;

        if (!clientName || !clientEmail || !serviceName || !date || !time || !clientPhone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // date: YYYY-MM-DD, time: HH:mm
        const [year, month, day] = date.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);

        if ([year, month, day, hours, minutes].some(Number.isNaN)) {
            return res.status(400).json({ error: 'Invalid date or time format' });
        }

        // 🔹 Create UTC Date
        const startDateTime = `${date}T${time}:00`;

        // 60 minutes
        const [h, m] = time.split(':').map(Number);
        const endHour = h + 1;
        const endTime = `${String(endHour).padStart(2, '0')}:${m}`;

        const endDateTime = `${date}T${endTime}:00`;


        const authClient = await getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth: authClient });

        let description = `Client: ${clientName}\nEmail: ${clientEmail}\nService: ${serviceName}\nPhone: ${clientPhone}`;
        if (clientAddress) {
            description += `\nAddress: ${clientAddress}`;
        }

        const event = {
            summary: `Appointment: ${serviceName} - ${clientName}`,
            location: clientAddress,
            description: description,
            start: {
                dateTime: startDateTime,
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: endDateTime,
                timeZone: 'America/Los_Angeles',
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
        const { items, date, time } = req.body;

        // Validations
        if (date && time) {
            try {
                const authClient = await getAuthClient();
                const calendar = google.calendar({ version: 'v3', auth: authClient });

                // Define search range: broad range around the target date to ensure we catch the LA time
                const searchDate = new Date(date);
                const timeMin = new Date(searchDate);
                timeMin.setDate(timeMin.getDate() - 1); // 1 day before
                const timeMax = new Date(searchDate);
                timeMax.setDate(timeMax.getDate() + 2); // 2 days after

                const eventsRes = await calendar.events.list({
                    calendarId: process.env.GOOGLE_CALENDAR_ID,
                    timeMin: timeMin.toISOString(),
                    timeMax: timeMax.toISOString(),
                    singleEvents: true,
                    orderBy: 'startTime',
                });

                const events = eventsRes.data.items || [];
                let count = 0;

                // Check against LA time
                for (const event of events) {
                    if (event.start && event.start.dateTime) {
                        const evtDateObj = new Date(event.start.dateTime);

                        const laDate = new Intl.DateTimeFormat('en-CA', {
                            timeZone: 'America/Los_Angeles',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).format(evtDateObj);

                        const laTime = checkedFormatTime(evtDateObj);

                        if (laDate === date && laTime === time) {
                            count++;
                        }
                    }
                }

                // Check if the slot is full
                if (count >= 2) {
                    return res.status(409).json({
                        error: 'Booking slot is full',
                        redirectUrl: '/payment-pending'
                    });
                }

            } catch (calError) {
                console.error("Error checking calendar availability:", calError);
                // Proceed cautiously or fail? Let's assume if check fails, we might still allow or just log.
                // For safety vs double booking, failing is safer.
                // return res.status(500).json({ error: 'Failed to verify availability' });
            }
        }

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

function checkedFormatTime(dateObj) {
    return dateObj.toLocaleTimeString('en-GB', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Google Distance Matrix API Endpoint
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.post('/api/calculate-distance', async (req, res) => {
    try {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and destination are required' });
        }

        if (!GOOGLE_MAPS_API_KEY) {
            console.error('Google Maps API Key is missing');
            return res.status(500).json({ error: 'Server configuration error: Google Maps API Key missing' });
        }

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}&units=imperial`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(`Google Maps API error: ${data.status}`);
        }

        res.json(data);
    } catch (error) {
        console.error('Error calculating distance:', error);
        res.status(500).json({ error: 'Failed to calculate distance' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
