import { calculateDrivingDistance } from '../services/distance.service.js';

export const calculateDistance = async (req, res) => {
    try {
        const { destination } = req.body;

        if (!destination) {
            return res.status(400).json({
                error: 'Destination is required'
            });
        }

        const {
            distanceMiles,
            durationMinutes
        } = await calculateDrivingDistance(destination);

        res.json({
            status: 'OK',
            rows: [{
                elements: [{
                    status: 'OK',
                    distance: {
                        text: `${distanceMiles.toFixed(1)} miles`,
                        value: distanceMiles
                    },
                    duration: {
                        text: `${Math.round(durationMinutes)} mins`,
                        value: durationMinutes
                    }
                }]
            }]
        });

    } catch (error) {
        console.error(
            '❌ Distance calculation error:',
            error.message
        );

        res.status(500).json({
            error: 'Failed to calculate distance'
        });
    }
};