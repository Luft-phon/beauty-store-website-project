import { calculateDrivingDistance } from '../services/distance.service.js';

/**
 * POST /api/calculate-distance
 * Geocodes two addresses and returns driving distance + duration.
 * Response shape mirrors Google Distance Matrix API so the frontend
 * doesn't need changes.
 */
export const calculateDistance = async (req, res) => {
    try {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and destination required' });
        }

        const { distanceMiles, durationMinutes } = await calculateDrivingDistance(origin, destination);

        // Mirror the Google Distance Matrix API shape expected by the frontend
        res.json({
            status: 'OK',
            rows: [{
                elements: [{
                    status:   'OK',
                    distance: { text: `${distanceMiles.toFixed(1)} miles`, value: distanceMiles },
                    duration: { text: `${Math.round(durationMinutes)} mins`, value: durationMinutes },
                }],
            }],
        });
    } catch (error) {
        console.error('❌ Distance calculation error:', error.message);
        res.status(500).json({ error: 'Failed to calculate distance using free API' });
    }
};
