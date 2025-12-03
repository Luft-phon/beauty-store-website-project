/**
 * Mock Service Data
 * 
 * This file contains all service data for the application.
 * When integrating with a backend, replace this with API calls in services/api/servicesApi.ts
 * 
 * Structure:
 * - Each service has unique ID, category, pricing, and media
 * - Images can be replaced with actual uploaded assets
 */

import { Service } from '../types';

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    category: 'Makeup',
    name: 'Bridal Makeup',
    description: 'Full bridal package including trial, lashes, and touch-up kit.',
    price: 350,
    image: 'https://picsum.photos/id/1027/800/600'
  },
  {
    id: '2',
    category: 'Makeup',
    name: 'Event Glam',
    description: 'Professional makeup for parties, proms, and special occasions.',
    price: 150,
    image: 'https://picsum.photos/id/342/800/600'
  },
  {
    id: '3',
    category: 'Nails',
    name: 'Gel Manicure Deluxe',
    description: 'Premium gel polish with cuticle care and hand massage.',
    price: 65,
    image: 'https://picsum.photos/id/106/800/600'
  },
  {
    id: '4',
    category: 'Tattooing',
    name: 'Ombre Powder Brows',
    description: 'Semi-permanent shading technique for a soft, misty look.',
    price: 450,
    image: 'https://picsum.photos/id/64/800/600'
  },
  {
    id: '5',
    category: 'Photography',
    name: 'Wedding Day Coverage',
    description: '8 hours of coverage, 2 photographers, digital gallery.',
    price: 2500,
    image: 'https://picsum.photos/id/250/800/600'
  },
  {
    id: '6',
    category: 'Photography',
    name: 'Engagement Session',
    description: '2-hour location shoot with 50 edited images.',
    price: 400,
    image: 'https://picsum.photos/id/338/800/600'
  }
];

/**
 * Service Detail Extensions
 * Additional data for service detail pages
 * This can be expanded with more detailed information
 */
export interface ServiceDetailData {
  serviceId: string;
  rating: number;
  reviewCount: number;
  included: string[];
  duration: string;
  depositAmount: number;
  advanceBookingDays: number;
  detailedDescription?: string;
}

export const MOCK_SERVICE_DETAILS: ServiceDetailData[] = [
  {
    serviceId: '1',
    rating: 4.9,
    reviewCount: 127,
    included: [
      'Professional makeup consultation',
      'Premium makeup products',
      'False lashes application',
      'Touch-up kit',
      'Pre-wedding trial session'
    ],
    duration: '90 min',
    depositAmount: 100,
    advanceBookingDays: 14
  },
  {
    serviceId: '2',
    rating: 4.8,
    reviewCount: 89,
    included: [
      'Professional makeup application',
      'Premium products',
      'False lashes',
      'Setting spray'
    ],
    duration: '60 min',
    depositAmount: 50,
    advanceBookingDays: 7
  },
  {
    serviceId: '3',
    rating: 4.7,
    reviewCount: 203,
    included: [
      'Gel polish application',
      'Cuticle care',
      'Hand massage',
      'Nail shaping'
    ],
    duration: '75 min',
    depositAmount: 20,
    advanceBookingDays: 3
  },
  {
    serviceId: '4',
    rating: 5.0,
    reviewCount: 156,
    included: [
      'Consultation & design',
      'Numbing cream',
      'Touch-up session (4-6 weeks)',
      'Aftercare kit'
    ],
    duration: '120 min',
    depositAmount: 150,
    advanceBookingDays: 7
  },
  {
    serviceId: '5',
    rating: 4.9,
    reviewCount: 94,
    included: [
      '8 hours coverage',
      '2 professional photographers',
      'Digital gallery (500+ images)',
      'Online album',
      'Full editing'
    ],
    duration: '8 hours',
    depositAmount: 500,
    advanceBookingDays: 60
  },
  {
    serviceId: '6',
    rating: 4.8,
    reviewCount: 76,
    included: [
      '2 hour session',
      'Location of choice',
      '50 edited images',
      'Online gallery',
      'Print release'
    ],
    duration: '2 hours',
    depositAmount: 100,
    advanceBookingDays: 14
  }
];
