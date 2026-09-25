/**
 * backend/tests/distance.test.js
 *
 * Tests for POST /api/calculate-distance
 *
 * Store coordinates are fixed inside distance.service.js.
 * The client only sends a destination address.
 *
 * External dependencies mocked:
 * - Nominatim: geocodes destination
 * - OpenRouteService: calculates distance/duration
 *
 * No real network requests are made during any test in this file.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

// ---------------------------------------------------------------------------
// Shared mock data
// ---------------------------------------------------------------------------

const MOCK_NOMINATIM_RESPONSE = [
    {
        lon: '-117.9189',
        lat: '33.8121'
    }
];

const MOCK_ORS_RESPONSE = {
    distances: [[24.7]],
    durations: [[1980]], // seconds -> 33 minutes
};

/**
 * Creates a fetch mock function that routes calls by URL:
 *
 * Nominatim -> geocode destination
 * ORS       -> distance/duration
 */
const makeFetchMock = ({
    nominatimResponse = MOCK_NOMINATIM_RESPONSE,
    nominatimOk = true,
    orsResponse = MOCK_ORS_RESPONSE,
    orsOk = true,
    orsThrows = false,
} = {}) => {
    return vi.fn(async (url) => {

        // Nominatim
        if (url.includes('nominatim.openstreetmap.org')) {
            return {
                ok: nominatimOk,
                status: nominatimOk ? 200 : 500,
                json: async () => nominatimResponse,
            };
        }

        // OpenRouteService
        if (url.includes('openrouteservice.org')) {
            if (orsThrows) {
                throw new Error('ORS network failure');
            }

            return {
                ok: orsOk,
                status: orsOk ? 200 : 500,
                json: async () => orsResponse,
                text: async () => JSON.stringify(orsResponse),
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

    // -----------------------------------------------------------------------
    // Success
    // -----------------------------------------------------------------------

    describe('success case', () => {

        it('returns HTTP 200 with correct Google-style response shape', async () => {
            vi.stubGlobal('fetch', makeFetchMock());

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    destination: 'Disneyland, Anaheim, CA'
                });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('OK');

            const element = res.body.rows[0].elements[0];

            expect(element.status).toBe('OK');

            // Distance
            expect(element.distance).toBeDefined();
            expect(typeof element.distance.value).toBe('number');
            expect(element.distance.text).toMatch(/miles/);

            // Duration
            expect(element.duration).toBeDefined();
            expect(typeof element.duration.value).toBe('number');
            expect(element.duration.text).toMatch(/mins/);
        });

        it('only geocodes destination and then calls ORS once', async () => {
            const mockFetch = makeFetchMock();

            vi.stubGlobal('fetch', mockFetch);

            await request(app)
                .post('/api/calculate-distance')
                .send({
                    destination: 'Disneyland, Anaheim, CA'
                });

            const nominatimCalls =
                mockFetch.mock.calls.filter(([url]) =>
                    url.includes('nominatim.openstreetmap.org')
                );

            const orsCalls =
                mockFetch.mock.calls.filter(([url]) =>
                    url.includes('openrouteservice.org')
                );

            // Store coordinates are already hardcoded.
            // Only destination needs geocoding.
            expect(nominatimCalls).toHaveLength(1);

            // ORS should be called once.
            expect(orsCalls).toHaveLength(1);
        });

        it('returns the correct numeric distance and duration values', async () => {
            vi.stubGlobal('fetch', makeFetchMock());

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    destination: 'Disneyland, Anaheim, CA'
                });

            const element = res.body.rows[0].elements[0];

            expect(element.distance.value)
                .toBeCloseTo(24.7, 1);

            // 1980 seconds / 60 = 33 minutes
            expect(element.duration.value)
                .toBeCloseTo(33, 0);
        });
    });

    // -----------------------------------------------------------------------
    // Validation
    // -----------------------------------------------------------------------

    describe('validation: missing fields', () => {

        it('returns 400 when destination is missing', async () => {
            const res = await request(app)
                .post('/api/calculate-distance')
                .send({});

            expect(res.status).toBe(400);

            expect(res.body).toEqual({
                error: 'Destination is required'
            });
        });

        it('returns 400 when destination is not provided even if other fields exist', async () => {
            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    foo: 'bar'
                });

            expect(res.status).toBe(400);

            expect(res.body).toEqual({
                error: 'Destination is required'
            });
        });
    });

    // -----------------------------------------------------------------------
    // External API failures
    // -----------------------------------------------------------------------

    describe('external API failure', () => {

        it('returns 500 when ORS throws a network error', async () => {
            vi.stubGlobal(
                'fetch',
                makeFetchMock({
                    orsThrows: true
                })
            );

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    destination: 'Disneyland, Anaheim, CA'
                });

            expect(res.status).toBe(500);

            expect(res.body).toEqual({
                error: 'Failed to calculate distance'
            });
        });

        it('returns 500 when ORS returns an error payload', async () => {
            vi.stubGlobal(
                'fetch',
                makeFetchMock({
                    orsResponse: {
                        error: {
                            message: 'Rate limit exceeded'
                        }
                    }
                })
            );

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    destination: 'Disneyland, Anaheim, CA'
                });

            expect(res.status).toBe(500);

            expect(res.body).toEqual({
                error: 'Failed to calculate distance'
            });
        });

        it('returns 500 when Nominatim geocoding fails for destination', async () => {
            vi.stubGlobal(
                'fetch',
                makeFetchMock({
                    nominatimResponse: []
                })
            );

            const res = await request(app)
                .post('/api/calculate-distance')
                .send({
                    destination:
                        'This address does not exist anywhere'
                });

            expect(res.status).toBe(500);

            expect(res.body).toEqual({
                error: 'Failed to calculate distance'
            });
        });
    });
});