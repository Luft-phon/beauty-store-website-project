/**
 * Constants - Legacy Export File
 * 
 * This file re-exports data from the new organized structure.
 * Keeping this for backward compatibility with existing components.
 * 
 * MIGRATION NOTE:
 * Components should gradually migrate to importing from:
 * - './data' for mock data
 * - './services/api' for API functions
 */

import { MOCK_SERVICES } from './data/services.data';
import { TRANSLATIONS } from './data/translations.data';
import { MOCK_GALLERY_IMAGES } from './data/content.data';

// Re-export for backward compatibility
export const INITIAL_SERVICES = MOCK_SERVICES;
export { TRANSLATIONS };

// Gallery images export (legacy format)
export const GALLERIES = MOCK_GALLERY_IMAGES.map(img => img.url);
