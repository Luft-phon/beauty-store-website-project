// Fixed store coordinates — 7201 Garden Grove Blvd Unit A,
// Garden Grove, CA, United States, 92841
const STORE_COORDS = {
    lon: -118.0050,
    lat: 33.7741
};

const NOMINATIM_BASE_URL =
    'https://nominatim.openstreetmap.org/search';

const ORS_MATRIX_URL =
    'https://api.openrouteservice.org/v2/matrix/driving-car';

/**
 * Geocodes a customer address using Nominatim.
 *
 * @param {string} address
 * @returns {{ lon: number, lat: number }}
 */
const geocodeAddress = async (address) => {
    const fetchCoords = async (query) => {
        const url =
            `${NOMINATIM_BASE_URL}?format=json&q=${encodeURIComponent(query)}&limit=1`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'LeCharmeBeautyStore/1.0'
            }
        });

        if (!response.ok) {
            throw new Error(
                `Nominatim request failed: ${response.status}`
            );
        }

        const data = await response.json();

        return data && data.length > 0
            ? {
                lon: parseFloat(data[0].lon),
                lat: parseFloat(data[0].lat)
            }
            : null;
    };

    // First attempt — full customer address
    let coords = await fetchCoords(address);

    // Fallback — strip suite/unit/apartment if needed
    if (!coords) {
        const simplerAddress = address.replace(
            /(Ste|Unit|Apt|Suite)\s+\w+,?\s?/i,
            ''
        );

        console.log(
            `Geocode fallback: trying simplified address → "${simplerAddress}"`
        );

        coords = await fetchCoords(simplerAddress);
    }

    if (!coords) {
        throw new Error(
            `Could not geocode address: "${address}"`
        );
    }

    return coords;
};

/**
 * Calculates driving distance from the store
 * to the customer's address.
 *
 * @param {string} destination - Customer address
 * @returns {{ distanceMiles: number, durationMinutes: number }}
 */
export const calculateDrivingDistance = async (destination) => {
    const ORS_API_KEY = process.env.ORS_API_KEY;

    if (!ORS_API_KEY) {
        throw new Error('ORS_API_KEY is not set');
    }

    // Store origin is always fixed
    const originCoords = STORE_COORDS;

    // Only customer address needs geocoding
    const destinationCoords =
        await geocodeAddress(destination);

    const orsResponse = await fetch(ORS_MATRIX_URL, {
        method: 'POST',
        headers: {
            'Authorization': ORS_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            locations: [
                [
                    originCoords.lon,
                    originCoords.lat
                ],
                [
                    destinationCoords.lon,
                    destinationCoords.lat
                ]
            ],
            metrics: ['distance', 'duration'],
            sources: [0],
            destinations: [1],
            units: 'mi',
        }),
    });

    if (!orsResponse.ok) {
        const errorText = await orsResponse.text();

        throw new Error(
            `OpenRouteService request failed: ${orsResponse.status} ${errorText}`
        );
    }

    const orsData = await orsResponse.json();

    if (orsData.error) {
        throw new Error(
            orsData.error.message ||
            'OpenRouteService API error'
        );
    }

    return {
        distanceMiles:
            orsData.distances[0][0],

        // ORS duration is in seconds
        durationMinutes:
            orsData.durations[0][0] / 60,
    };
};