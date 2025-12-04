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
import { MOCK_GALLERY_IMAGES } from './data/content.data';
import { THEME_CONFIGS, DEFAULT_THEME, getInitialTheme, saveTheme, applyThemeVariables } from './config/theme.config';

// Re-export for backward compatibility
export const INITIAL_SERVICES = MOCK_SERVICES;
export { TRANSLATIONS };

// Theme configuration exports
export { THEME_CONFIGS, DEFAULT_THEME, getInitialTheme, saveTheme, applyThemeVariables };

// Gallery images export (legacy format)
export const GALLERIES = MOCK_GALLERY_IMAGES.map(img => img.url);
