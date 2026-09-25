const YOUR_DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:3000';

/**
 * Returns true if the given string is a valid http/https URL.
 */
export const isValidUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

/**
 * Converts a relative image path (e.g. "/images/foo.jpg") to an absolute URL
 * using CLIENT_DOMAIN. Returns null if imagePath is falsy.
 * Passes through URLs that are already absolute.
 */
export const getAbsoluteImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (isValidUrl(imagePath)) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${YOUR_DOMAIN}/${cleanPath}`;
};
