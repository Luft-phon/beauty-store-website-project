/**
 * API Services Index
 * 
 * Central export point for all API services.
 * Import from this file in your components for cleaner imports.
 * 
 * Example usage in components:
 * import { servicesApi, bookingApi, contentApi } from '../services/api';
 */

export * as servicesApi from './servicesApi';
export * as bookingApi from './bookingApi';
export * as contentApi from './contentApi';

// Re-export types for convenience
export type { 
  GalleryImage, 
  TeamMember, 
  Testimonial, 
  CompanyInfo 
} from '../../data/content.data';

export type { 
  ServiceDetailData 
} from '../../data/services.data';
