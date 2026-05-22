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
 * - './config/theme.config' for theme configuration
 */

import { MOCK_SERVICES } from './data/services.data';
import { TRANSLATIONS } from './data/translations.data';
import { LIGHT_SAND_THEME, applyThemeVariables } from './config/theme.config';

// Re-export for backward compatibility
export const INITIAL_SERVICES = MOCK_SERVICES;
export { TRANSLATIONS };

// Theme configuration exports (Light Sand theme only)
export { LIGHT_SAND_THEME, applyThemeVariables };

// Gallery images export (loading all 15 images from public/images/galley/gallery)
export const GALLERIES = Array.from({ length: 55 }, (_, i) => `/images/galley/gallery/${i + 1}.jpg`);
