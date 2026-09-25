import { Router } from 'express';
import { calculateDistance } from '../controllers/distance.controller.js';

const router = Router();

/**
 * POST /api/calculate-distance
 * Geocodes origin/destination with Nominatim and returns driving
 * distance + duration via OpenRouteService Matrix API.
 */
router.post('/', calculateDistance);

export default router;
