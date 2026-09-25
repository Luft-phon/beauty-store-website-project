/**
 * Process-level idempotency guard for Stripe Checkout success processing.
 *
 * Prevents duplicate Calendar events / confirmation emails when Stripe retries
 * the same Checkout Session while this Node process is alive.
 *
 * IMPORTANT: This store is in-memory only. It resets when Render restarts or a
 * new instance starts. For durable production idempotency across restarts or
 * multiple instances, replace this implementation with a persistent store
 * (database / Redis) keyed by Checkout Session ID or your own booking ID.
 */

const processedSessions = new Map();
const processingSessions = new Set();

// Keep successful session IDs long enough to cover normal webhook retry windows.
const PROCESSED_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const pruneExpiredSessions = () => {
    const now = Date.now();

    for (const [sessionId, processedAt] of processedSessions.entries()) {
        if (now - processedAt > PROCESSED_TTL_MS) {
            processedSessions.delete(sessionId);
        }
    }
};

/**
 * Atomically claims a Checkout Session for business-side-effect processing.
 *
 * @param {string} sessionId
 * @returns {boolean} true when the caller may process; false when duplicate/in-flight
 */
export const beginStripeSessionProcessing = (sessionId) => {
    if (!sessionId) return true;

    pruneExpiredSessions();

    if (processingSessions.has(sessionId) || processedSessions.has(sessionId)) {
        return false;
    }

    processingSessions.add(sessionId);
    return true;
};

/**
 * Marks a Checkout Session as successfully processed.
 *
 * @param {string} sessionId
 */
export const completeStripeSessionProcessing = (sessionId) => {
    if (!sessionId) return;

    processingSessions.delete(sessionId);
    processedSessions.set(sessionId, Date.now());
};

/**
 * Releases an in-flight claim after a processing failure so a manual replay or
 * later retry can attempt the side effects again.
 *
 * @param {string} sessionId
 */
export const releaseStripeSessionProcessing = (sessionId) => {
    if (!sessionId) return;
    processingSessions.delete(sessionId);
};
