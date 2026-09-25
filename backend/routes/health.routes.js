import { Router } from 'express';

const router = Router();

/**
 * GET /health
 * Simple liveness probe — used by Render, uptime monitors, and developers.
 */
router.get('/', (_req, res) => {
    res.json({ status: 'ok', service: 'lecharme-backend' });
});

export default router;
