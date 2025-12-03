/**
 * Project Root Exports
 * 
 * Central export point for commonly used items throughout the application.
 * Import from here for cleaner code.
 * 
 * Example usage:
 * import { TRANSLATIONS, INITIAL_SERVICES, config } from './';
 * import { servicesApi, bookingApi } from './services/api';
 */

// Data exports (backward compatibility)
export { INITIAL_SERVICES, TRANSLATIONS, GALLERIES } from './constants';

// Config exports
export { config, isDevelopment, isProduction } from './config/app.config';

// Type exports
export type { 
  Language, 
  Service, 
  Booking, 
  Translation,
  ChatMessage 
} from './types';

// Re-export data for direct access if needed
export * from './data';
