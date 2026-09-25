// Fixed store coordinates — 7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841
const STORE_COORDS = {
  lon: -118.0050,
  lat: 33.7741
};
const STORE_ADDRESS_STR  = '7201 Garden Grove Blvd Unit A, Garden Grove, CA, United States, 92841';
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const ORS_MATRIX_URL     = 'https://api.openrouteservice.org/v2/matrix/driving-car';

/**
 * Geocodes a single address using Nominatim.
 * Falls back to a simplified address (strips suite/unit) if the full address fails.
 *
 * @param {string} address
 * @returns {{ lon: number, lat: number }}
 */
const geocodeAddress = async (address) => {
    const fetchCoords = async (query) => {
        const url = `${NOMINATIM_BASE_URL}?format=json&q=${encodeURIComponent(query)}&limit=1`;
        const response = await fetch(url, { headers: { 'User-Agent': 'LeCharmeBeautyStore/1.0' } });
        const data = await response.json();
        return data && data.length > 0
            ? { lon: parseFloat(data[0].lon), lat: parseFloat(data[0].lat) }
            : null;
    };

    // First attempt — full address
    let coords = await fetchCoords(address);

    // Fallback — strip "Ste / Unit / Apt / Suite" suffix
    if (!coords) {
        const simplerAddress = address.replace(/(Ste|Unit|Apt|Suite)\s+\w+,?\s?/i, '');
        console.log(`Geocode fallback: trying simplified address → "${simplerAddress}"`);
        coords = await fetchCoords(simplerAddress);
    }

    if (!coords) throw new Error(`Could not geocode address: "${address}"`);
    return coords;
};

/**
 * Calculates driving distance and duration between two addresses.
 * Uses hardcoded store coordinates when either address matches the store string
 * (avoids unnecessary geocoding calls).
 *
 * @param {string} origin       - Human-readable address or STORE_ADDRESS_STR
 * @param {string} destination  - Human-readable address or STORE_ADDRESS_STR
 * @returns {{ distanceMiles: number, durationMinutes: number }}
 */
export const calculateDrivingDistance = async (origin, destination) => {
    const ORS_API_KEY = process.env.ORS_API_KEY;
    if (!ORS_API_KEY) {
        console.warn('⚠️  ORS_API_KEY is not set. Distance calculation will fail.');
    }

    // Resolve coordinates (skip geocoding for the known store address)
    const originCoords = (origin      === STORE_ADDRESS_STR) ? STORE_COORDS : await geocodeAddress(origin);
    const destCoords   = (destination === STORE_ADDRESS_STR) ? STORE_COORDS : await geocodeAddress(destination);

    // Call OpenRouteService Matrix API
    const orsResponse = await fetch(ORS_MATRIX_URL, {
        method: 'POST',
        headers: {
            'Authorization': ORS_API_KEY,
            'Content-Type':  'application/json',
        },
        body: JSON.stringify({
            locations:    [[originCoords.lon, originCoords.lat], [destCoords.lon, destCoords.lat]],
            metrics:      ['distance', 'duration'],
            sources:      [0],
            destinations: [1],
            units:        'mi',
        }),
    });

    const orsData = await orsResponse.json();
    if (orsData.error) {
        throw new Error(orsData.error.message || 'OpenRouteService API error');
    }

    return {
        distanceMiles:   orsData.distances[0][0],
        durationMinutes: orsData.durations[0][0] / 60,   // ORS returns seconds
    };
};
