/**
 * Data Index
 * 
 * Central export point for all mock data.
 * When migrating to a backend, you can easily replace these imports
 * with API calls throughout the application.
 */

// Service Data
export { 
  MOCK_SERVICES, 
  MOCK_SERVICE_DETAILS 
} from './services.data';

export type { 
  ServiceDetailData 
} from './services.data';

// Content Data
export { 
  MOCK_TEAM_MEMBERS,
  MOCK_GALLERY_IMAGES,
  MOCK_TESTIMONIALS,
  MOCK_COMPANY_INFO 
} from './content.data';

export type {
  TeamMember,
  GalleryImage,
  Testimonial,
  CompanyInfo
} from './content.data';

// Translation Data
export { 
  TRANSLATIONS 
} from './translations.data';
