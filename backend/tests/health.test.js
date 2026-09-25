/**
 * backend/tests/health.test.js
 *
 * Tests for GET /health
 * No external dependencies — no mocking needed.
 */

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('GET /health', () => {
    it('returns HTTP 200', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
    });

    it('returns correct JSON body', async () => {
        const res = await request(app).get('/health');
        expect(res.body).toEqual({
            status:  'ok',
            service: 'lecharme-backend',
        });
    });
});
