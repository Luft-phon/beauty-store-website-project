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
  // PHOTOSHOOT / STAGE MAKEUP & HAIR
  {
    id: 'photoshoot-combo',
    category: 'Photoshoot',
    name: 'Photoshoot / Stage Combo',
    description: 'Designed for camera and stage lighting. Includes long-lasting, HD-ready makeup, advanced contouring & highlighting, eye definition, and professional hair styling tailored to your concept. \n ✔ High-end makeup products \n ✔ All types of false lashes included',
    price: 235,
    image: 'https://picsum.photos/id/1027/800/600'
  },

  // Party / Event Makeup & Hair Services (PREMIUM)
  {
    id: 'premium-combo',
    category: 'PartyEvent',
    name: 'Premium Combo',
    description: 'Includes skin cleansing, priming, foundation, eye makeup, contour & blush, brows & lipstick using mid-range makeup products. \n ✔ Natural false lashes included \n ✔ Hair styling: simple curls or straightening (your choice)',
    price: 175,
    image: 'https://picsum.photos/id/342/800/600'
  },
  {
    id: 'premium-makeup',
    category: 'PartyEvent',
    name: 'Premium Makeup Only',
    description: 'Professional makeup application using mid-range products. \n ✔ Natural false lashes included.',
    price: 125,
    image: 'https://picsum.photos/id/129/800/600'
  },
  {
    id: 'premium-hair',
    category: 'PartyEvent', // Categorized as Makeup/Hair but effectively Hair
    name: 'Premium Hair Only',
    description: 'Simple curls or straightening tailored to your event.',
    price: 95,
    image: 'https://picsum.photos/id/128/800/600'
  },

  // Party / Event Makeup & Hair Services (DELUXE)
  {
    id: 'deluxe-combo',
    category: 'PartyEvent',
    name: 'Deluxe Combo',
    description: 'Includes skin cleansing, toner, serum, moisturizing, priming, foundation, eye makeup, full-face contour, blush, powder, highlight & lipstick using high-end makeup products. \n ✔ All types of false lashes included \n ✔ Hair styling: any style of your choice',
    price: 205,
    image: 'https://picsum.photos/id/338/800/600'
  },
  {
    id: 'deluxe-makeup',
    category: 'PartyEvent',
    name: 'Deluxe Makeup Only',
    description: 'Full pampering makeup session using high-end products. \n ✔ All types of false lashes included.',
    price: 155,
    image: 'https://picsum.photos/id/64/800/600'
  },
  {
    id: 'deluxe-hair',
    category: 'PartyEvent',
    name: 'Deluxe Hair Only',
    description: 'Any hairstyle of your choice for your special occasion.',
    price: 115,
    image: 'https://picsum.photos/id/91/800/600'
  },

  // Bridal Makeup & Hair Packages
  {
    id: 'bridal-1',
    category: 'Bridal',
    name: 'Bridal Makeup & Hair (1 time)',
    description: 'Complete bridal look for your ceremony or reception.',
    price: 550,
    image: 'https://picsum.photos/id/250/800/600'
  },
  {
    id: 'bridal-2',
    category: 'Bridal',
    name: 'Bridal Makeup & 2 Hair Changes',
    description: '1 morning Makeup & Hair + 1 touchup & 1 hair change.',
    price: 750,
    image: 'https://picsum.photos/id/331/800/600'
  },
  {
    id: 'bridal-3',
    category: 'Bridal',
    name: 'Bridal Makeup & Hair + Layout Changes',
    description: 'Morning & evening makeup and hair changes to keep you looking perfect all day.',
    price: 800,
    image: 'https://picsum.photos/id/1012/800/600'
  },
  {
    id: 'bridal-4',
    category: 'Bridal',
    name: 'Bridal All-Day Service',
    description: 'MUA will accompany the bride throughout the day and adjust makeup & hair as needed until the evening ceremony ends. \n🎁 Complimentary manicure included',
    price: 1350,
    image: 'https://picsum.photos/id/1011/800/600'
  },

  // Wedding Party Services
  {
    id: 'wedding-guest-combo',
    category: 'Guest',
    name: 'Wedding Guest Makeup & Hair',
    description: 'For moms, relatives, bridesmaids, etc.',
    price: 220,
    image: 'https://picsum.photos/id/823/800/600'
  },
  {
    id: 'wedding-guest-makeup',
    category: 'Guest',
    name: 'Wedding Guest Makeup Only',
    description: 'Professional makeup for wedding guests.',
    price: 190,
    image: 'https://picsum.photos/id/338/800/600'
  },
  {
    id: 'wedding-guest-hair',
    category: 'Guest',
    name: 'Wedding Guest Hair Only',
    description: 'Professional hair styling for wedding guests.',
    price: 130,
    image: 'https://picsum.photos/id/646/800/600'
  },
  {
    id: 'groom-combo',
    category: 'PartyEvent',
    name: 'Groom Makeup & Hair',
    description: 'Grooming service for the groom.',
    price: 200,
    image: 'https://picsum.photos/id/91/800/600'
  },
  {
    id: 'groom-makeup',
    category: 'PartyEvent',
    name: 'Groom Makeup Only',
    description: 'Makeup grooming for the groom.',
    price: 170,
    image: 'https://picsum.photos/id/1027/800/600'
  },

  // Trial & Pre-Wedding
  {
    id: 'bridal-trial',
    category: 'Bridal',
    name: 'Bridal Trial / Pre-Wedding Photoshoot',
    description: '4–6 hours trying different looks and styles. Perfect for pre-wedding photos or finding your wedding day look.',
    price: 400,
    image: 'https://picsum.photos/id/325/800/600'
  },

  // Education
  {
    id: 'class-private',
    category: 'Education',
    name: '1:1 Private Makeup Class',
    description: '3 days, 3 hours per day. Flexible dates/times. Includes skincare & makeup products, Professional Brush Set, Brush Case, Beauty Blender, and Mini Beauty Portrait Photoshoot.',
    price: 595,
    image: 'https://picsum.photos/id/201/800/600'
  },
  {
    id: 'class-group',
    category: 'Education',
    name: 'Group Makeup Class (4 students)',
    description: '3 days, 3 hours per day. Held on weekends (Fri-Sun). Includes skincare & makeup products, Professional Brush Set, Brush Case, Beauty Blender, and Mini Beauty Portrait Photoshoot.',
    price: 495,
    image: 'https://picsum.photos/id/338/800/600'
  },
  // extra services
  {
    id: 'convenience',
    category: 'Fee',
    name: 'Convenience Fee',
    description: 'A travel and convenience fee applies to all appointments requiring travel, starting at s50+ (determined by distance from our location). Fees apply per makeup artist.',
    price: 595,
    image: 'https://picsum.photos/id/338/800/600'
  },
  // products
  {
    id: 'bridal-airbrush',
    category: 'Products',
    name: 'Bridal Airbrush Products',
    description: 'Bridal Airbrush Products are professional-grade makeup solutions designed for flawless, long-lasting bridal looks.\n ✔ Featuring a lightweight, breathable formula, they provide smooth, natural coverage that photographs beautifully and stays fresh all day.',
    price: 100,
    image: 'https://picsum.photos/id/338/800/600'
  },
  {
    id: 'event-airbrush',
    category: 'Products',
    name: 'Event/Party/ Air brush Products',
    description: 'Professional makeup products designed for flawless, long-lasting looks at special events and parties.\n ✔ Lightweight and smooth, they deliver even coverage with a radiant finish that holds up under lights, heat, and long wear.',
    price: 50,
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
  // Placeholder details for new services...
  // In a real app, these would be populated for every single ID.
  {
    serviceId: 'photoshoot-combo',
    rating: 5.0,
    reviewCount: 32,
    included: ['HD-ready makeup', 'Advanced contouring', 'Eye definition', 'Professional hair styling', 'False lashes'],
    duration: '120 min',
    depositAmount: 50,
    advanceBookingDays: 7
  },
  {
    serviceId: 'bridal-1',
    rating: 4.9,
    reviewCount: 45,
    included: ['Bridal makeup', 'Hair styling', 'Lashes', 'Touch-up kit'],
    duration: '3 hours',
    depositAmount: 200,
    advanceBookingDays: 30
  }
  // Add more as needed
];
