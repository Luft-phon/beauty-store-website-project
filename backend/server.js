import 'dotenv/config';

// Startup checks
if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️  WARNING: STRIPE_SECRET_KEY is not set. Payment features will fail.');
}

import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    const clientDomain = process.env.CLIENT_DOMAIN || 'http://localhost:3000';
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   Client domain: ${clientDomain}`);
});
