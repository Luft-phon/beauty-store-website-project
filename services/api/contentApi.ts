/**
 * Content API Layer
 * 
 * This file provides an abstraction layer for static content operations.
 * Currently using mock data, designed for easy backend integration.
 */

import { 
  MOCK_GALLERY_IMAGES, 
  MOCK_TEAM_MEMBERS, 
  MOCK_TESTIMONIALS,
  MOCK_COMPANY_INFO,
  GalleryImage,
  TeamMember,
  Testimonial,
  CompanyInfo
} from '../../data/content.data';

/**
 * Fetch all gallery images
 */
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/gallery`);
  // return response.json();
  
  return Promise.resolve([...MOCK_GALLERY_IMAGES]);
};

/**
 * Fetch team members
 */
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/team`);
  // return response.json();
  
  return Promise.resolve([...MOCK_TEAM_MEMBERS]);
};

/**
 * Fetch testimonials
 */
export const getTestimonials = async (): Promise<Testimonial[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/testimonials`);
  // return response.json();
  
  return Promise.resolve([...MOCK_TESTIMONIALS]);
};

/**
 * Fetch company information
 */
export const getCompanyInfo = async (): Promise<CompanyInfo> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/company-info`);
  // return response.json();
  
  return Promise.resolve({ ...MOCK_COMPANY_INFO });
};
