/**
 * backend/tests/setup.js
 *
 * Runs before every test file (vitest.config.js → setupFiles).
 * Sets safe dummy environment variables so modules that read process.env
 * at import-time (e.g. stripe.controller.js, imageUrl.js) don't crash
 * and never accidentally use real credentials.
 *
 * These values are clearly fake and are never sent anywhere — all external
 * service calls (Stripe, fetch/Nominatim/ORS) are mocked in the test files.
 */

process.env.NODE_ENV            = 'test';
process.env.CLIENT_DOMAIN       = 'http://localhost:5173';
process.env.STRIPE_SECRET_KEY   = 'sk_test_dummy_key_for_tests_only';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy_for_tests_only';
process.env.ORS_API_KEY         = 'dummy_ors_key';
process.env.RESEND_API_KEY      = 'dummy_resend_key';
process.env.SMTP_USER           = 'dummy@example.com';
process.env.SMTP_PASS           = 'dummy_pass';
process.env.GOOGLE_CALENDAR_ID  = 'dummy_calendar_id';
process.env.PORT                = '3099';   // isolated port, never actually bound
