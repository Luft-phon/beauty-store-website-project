/**
 * Services API Layer
 * 
 * This file provides an abstraction layer for service data operations.
 * Currently using mock data, but designed to easily swap with real API calls.
 * 
 * BACKEND MIGRATION GUIDE:
 * 1. Replace mock data imports with actual API endpoints
 * 2. Add error handling and loading states
 * 3. Implement caching if needed
 * 4. Add authentication headers if required
 * 
 * Example migration:
 * 
 * // Before (Mock):
 * export const getAllServices = async (): Promise<Service[]> => {
 *   return Promise.resolve(MOCK_SERVICES);
 * };
 * 
 * // After (Real API):
 * export const getAllServices = async (): Promise<Service[]> => {
 *   const response = await fetch('/api/services');
 *   if (!response.ok) throw new Error('Failed to fetch services');
 *   return response.json();
 * };
 */

import { Service } from '../../types';
import { MOCK_SERVICES, MOCK_SERVICE_DETAILS, ServiceDetailData } from '../../data/services.data';

/**
 * Fetch all services
 * @returns Promise<Service[]>
 */
export const getAllServices = async (): Promise<Service[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services`);
  // return response.json();
  
  return Promise.resolve([...MOCK_SERVICES]);
};

/**
 * Fetch a single service by ID
 * @param id - Service ID
 * @returns Promise<Service | null>
 */
export const getServiceById = async (id: string): Promise<Service | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services/${id}`);
  // return response.json();
  
  const service = MOCK_SERVICES.find(s => s.id === id);
  return Promise.resolve(service || null);
};

/**
 * Fetch service details (extended information)
 * @param id - Service ID
 * @returns Promise<ServiceDetailData | null>
 */
export const getServiceDetails = async (id: string): Promise<ServiceDetailData | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services/${id}/details`);
  // return response.json();
  
  const details = MOCK_SERVICE_DETAILS.find(d => d.serviceId === id);
  return Promise.resolve(details || null);
};

/**
 * Fetch services by category
 * @param category - Service category
 * @returns Promise<Service[]>
 */
export const getServicesByCategory = async (
  category: 'Makeup' | 'Nails' | 'Tattooing' | 'Photography'
): Promise<Service[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services?category=${category}`);
  // return response.json();
  
  const filtered = MOCK_SERVICES.filter(s => s.category === category);
  return Promise.resolve(filtered);
};

/**
 * Create a new service (Admin only)
 * @param service - Service data
 * @returns Promise<Service>
 */
export const createService = async (service: Omit<Service, 'id'>): Promise<Service> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(service)
  // });
  // return response.json();
  
  const newService: Service = {
    ...service,
    id: Math.random().toString(36).substr(2, 9)
  };
  
  return Promise.resolve(newService);
};

/**
 * Update an existing service (Admin only)
 * @param id - Service ID
 * @param updates - Partial service data to update
 * @returns Promise<Service>
 */
export const updateService = async (
  id: string, 
  updates: Partial<Service>
): Promise<Service> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updates)
  // });
  // return response.json();
  
  const service = MOCK_SERVICES.find(s => s.id === id);
  if (!service) throw new Error('Service not found');
  
  return Promise.resolve({ ...service, ...updates });
};

/**
 * Delete a service (Admin only)
 * @param id - Service ID
 * @returns Promise<void>
 */
export const deleteService = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // TODO: Replace with actual API call
  // await fetch(`${API_BASE_URL}/services/${id}`, {
  //   method: 'DELETE'
  // });
  
  return Promise.resolve();
};
