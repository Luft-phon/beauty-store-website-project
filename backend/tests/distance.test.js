/**
 * backend/tests/distance.test.js
 *
 * Tests for POST /api/calculate-distance
 *
 * External dependencies mocked:
 * - global fetch  →  vi.stubGlobal('fetch', mockFetch)
 *   - First call  : Nominatim geocoding  (only when destination is NOT the store address)
 *   - Second call : OpenRouteService Matrix API
 *
 * The origin "7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841" matches STORE_ADDRESS_STR
 * in distance.service.js, so it bypasses geocoding entirely — only ORS is called.
 * The destination "Disneyland, Anaheim, CA" must be geocoded → 1 Nominatim fetch call.
 *
 * No real network requests are made during any test in this file.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

// ---------------------------------------------------------------------------
// Shared mock data
// ---------------------------------------------------------------------------
const MOCK_NOMINATIM_RESPONSE = [{ lon: '-117.9189', lat: '33.8121' }]; // Disneyland approx

const MOCK_ORS_RESPONSE = {
    distances: [[24.7]],   // miles
    durations: [[1980]],   // seconds → 33 minutes
};

/**
 * Creates a fetch mock function that routes calls by URL:
 *   - Nominatim URL  →  MOCK_NOMINATIM_RESPONSE (or custom override)
 *   - ORS URL        →  MOCK_ORS_RESPONSE (or custom override)
 */
const makeFetchMock = ({
    nominatimResponse = MOCK_NOMINATIM_RESPONSE,
    nominatimOk       = true,
    orsResponse       = MOCK_ORS_RESPONSE,
    orsOk             = true,
    orsThrows         = false,
} = {}) => {
    return vi.fn(async (url) => {
        if (url.includes('nominatim.openstreetmap.org')) {
            return {
                ok:   nominatimOk,
                json: async () => nominatimResponse,
            };
        }

        if (url.includes('openrouteservice.org')) {
            if (orsThrows) throw new Error('ORS network failure');
            return {
                ok:   orsOk,
                json: async () => orsResponse,
            };
        }

        throw new Error(`Unexpected fetch call to: ${url}`);
    });
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/calculate-distance', () => {

    beforeEach(() => {
        // Ensure no real fetch leaks through
        vi.unstubAllGlobals();
    });

    // ---- Success case -------------------------------------------------------

    describe('success case', () => {
        it('returns HTTP 200 with correct Google-style response shape', async () => {
            vi.stubGlobal('fetch', makeFetchMock());

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    origin:      '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841',
                    destination: 'Disneyland, Anaheim, CA',
                });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('OK');

            const element = res.body.rows[0].elements[0];
            expect(element.status).toBe('OK');

            // distance
            expect(element.distance).toBeDefined();
            expect(typeof element.distance.value).toBe('number');
            expect(element.distance.text).toMatch(/miles/);

            // duration
            expect(element.duration).toBeDefined();
            expect(typeof element.duration.value).toBe('number');
            expect(element.duration.text).toMatch(/mins/);
        });

        it('uses store hardcoded coords and skips Nominatim for the store address', async () => {
            const mockFetch = makeFetchMock();
            vi.stubGlobal('fetch', mockFetch);

            await request(app)
                .post('/api/calculate-distance')
                .send({
                    origin:      '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841', // ← store address shortcut
                    destination: 'Disneyland, Anaheim, CA',
                });

            // Only 1 fetch call: Nominatim for destination (origin is resolved via hardcoded coords)
            // + 1 fetch call: ORS  →  total = 2
            const nominatimCalls = mockFetch.mock.calls.filter(([url]) =>
                url.includes('nominatim.openstreetmap.org')
            );
            const orsCalls = mockFetch.mock.calls.filter(([url]) =>
                url.includes('openrouteservice.org')
            );

            expect(nominatimCalls).toHaveLength(1);   // only destination geocoded
            expect(orsCalls).toHaveLength(1);
        });

        it('returns the correct numeric distance and duration values', async () => {
            vi.stubGlobal('fetch', makeFetchMock());

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    origin:      '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841',
                    destination: 'Disneyland, Anaheim, CA',
                });

            const element = res.body.rows[0].elements[0];
            expect(element.distance.value).toBeCloseTo(24.7, 1);
            expect(element.duration.value).toBeCloseTo(33, 0);   // 1980s / 60 = 33 mins
        });
    });

    // ---- Validation case ----------------------------------------------------

    describe('validation: missing fields', () => {
        it('returns 400 when origin is missing', async () => {
            const res = await request(app)
                .post('/api/calculate-distance')
                .send({ destination: 'Disneyland, Anaheim, CA' });

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: 'Origin and destination required' });
        });

        it('returns 400 when destination is missing', async () => {
            const res = await request(app)
                .post('/api/calculate-distance')
                .send({ origin: '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841' });

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: 'Origin and destination required' });
        });

        it('returns 400 when body is empty', async () => {
            const res = await request(app)
                .post('/api/calculate-distance')
                .send({});

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: 'Origin and destination required' });
        });
    });

    // ---- External API failure case ------------------------------------------

    describe('external API failure', () => {
        it('returns 500 when ORS throws a network error', async () => {
            vi.stubGlobal('fetch', makeFetchMock({ orsThrows: true }));

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    origin:      '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841',
                    destination: 'Disneyland, Anaheim, CA',
                });

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to calculate distance using free API' });
        });

        it('returns 500 when ORS returns an error payload', async () => {
            vi.stubGlobal('fetch', makeFetchMock({
                orsResponse: { error: { message: 'Rate limit exceeded' } },
            }));

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    origin:      '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841',
                    destination: 'Disneyland, Anaheim, CA',
                });

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to calculate distance using free API' });
        });

        it('returns 500 when Nominatim geocoding fails for destination', async () => {
            vi.stubGlobal('fetch', makeFetchMock({
                nominatimResponse: [],   // empty → geocoding returns null → throws
            }));

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    origin:      '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841',
                    destination: 'This address does not exist anywhere',
                });

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ error: 'Failed to calculate distance using free API' });
        });
    });
});
