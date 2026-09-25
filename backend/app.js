import express from 'express';
import cors from 'cors';

import { handleWebhook, createCheckoutSession } from './controllers/stripe.controller.js';
import stripeRoutes    from './routes/stripe.routes.js';
import calendarRoutes  from './routes/calendar.routes.js';
import distanceRoutes  from './routes/distance.routes.js';
import inquiryRoutes   from './routes/inquiry.routes.js';
import healthRoutes    from './routes/health.routes.js';

// ---------------------------------------------------------------------------
// CORS — allow CLIENT_DOMAIN + local dev origins
// ---------------------------------------------------------------------------
const allowedOrigins = [
    process.env.CLIENT_DOMAIN,
    'http://localhost:3000',
    'http://localhost:5173',
].filter(Boolean);

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, server-to-server, Supertest)
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin "${origin}" not allowed`));
    },
}));

// ---------------------------------------------------------------------------
// Stripe Webhook — MUST be mounted BEFORE express.json()
// Stripe requires the raw (un-parsed) request body to verify the signature.
// ---------------------------------------------------------------------------
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// ---------------------------------------------------------------------------
// Global JSON middleware (applied AFTER the raw webhook route)
// ---------------------------------------------------------------------------
app.use(express.json());

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/health',                 healthRoutes);
app.use('/api/stripe',             stripeRoutes);
app.use('/api/calendar',           calendarRoutes);
app.use('/api/calculate-distance', distanceRoutes);
app.use('/api/send-inquiry',       inquiryRoutes);

// Backward-compatible root-level endpoint (frontend hardcodes this URL)
app.post('/create-checkout-session', createCheckoutSession);

export default app;
