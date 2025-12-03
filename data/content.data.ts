/**
 * Static Content Data
 * 
 * This file contains all static content like galleries, team members, testimonials.
 * When integrating with a CMS or backend, replace with API calls.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category?: string;
  alt?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
}

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah L.',
    role: 'Lead Makeup Artist',
    image: 'https://picsum.photos/id/64/400/400',
    bio: 'Over 10 years of experience in bridal and editorial makeup'
  },
  {
    id: '2',
    name: 'David C.',
    role: 'Senior Photographer',
    image: 'https://picsum.photos/id/91/400/400',
    bio: 'Award-winning wedding photographer with a passion for storytelling'
  },
  {
    id: '3',
    name: 'Elena R.',
    role: 'Brow Specialist',
    image: 'https://picsum.photos/id/338/400/400',
    bio: 'Certified in microblading and ombre powder techniques'
  }
];

export const MOCK_GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', url: 'https://picsum.photos/id/1011/600/600', category: 'Wedding', alt: 'Wedding makeup' },
  { id: '2', url: 'https://picsum.photos/id/1012/600/800', category: 'Bridal', alt: 'Bridal portrait' },
  { id: '3', url: 'https://picsum.photos/id/331/600/600', category: 'Makeup', alt: 'Event makeup' },
  { id: '4', url: 'https://picsum.photos/id/325/600/600', category: 'Photography', alt: 'Couple photography' },
  { id: '5', url: 'https://picsum.photos/id/129/600/800', category: 'Portrait', alt: 'Portrait session' },
  { id: '6', url: 'https://picsum.photos/id/65/600/600', category: 'Nails', alt: 'Nail art' },
  { id: '7', url: 'https://picsum.photos/id/823/600/600', category: 'Tattooing', alt: 'Eyebrow tattoo' },
  { id: '8', url: 'https://picsum.photos/id/646/600/800', category: 'Wedding', alt: 'Wedding moment' }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Jessica M.',
    rating: 5,
    text: 'Absolutely amazing experience! Sarah did my bridal makeup and I felt like a princess. Highly recommend!',
    service: 'Bridal Makeup',
    date: '2024-11-15'
  },
  {
    id: '2',
    author: 'Michael T.',
    rating: 5,
    text: 'David captured our wedding perfectly. Every photo tells a story. Thank you!',
    service: 'Wedding Day Coverage',
    date: '2024-10-22'
  },
  {
    id: '3',
    author: 'Amanda K.',
    rating: 5,
    text: 'Elena is a true artist. My eyebrows look natural and perfect. Best decision ever!',
    service: 'Ombre Powder Brows',
    date: '2024-11-01'
  }
];

/**
 * Company Information
 * Basic business details and contact information
 */
export interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
  };
}

export const MOCK_COMPANY_INFO: CompanyInfo = {
  name: 'Lumière Beauty & Wedding',
  tagline: 'Elegance in Every Detail',
  email: 'hello@lumierebeauty.com',
  phone: '+1 (555) 123-4567',
  address: '123 Beauty Lane, Suite 100, Los Angeles, CA 90001',
  hours: {
    weekday: 'Mon-Fri: 9:00 AM - 7:00 PM',
    weekend: 'Sat-Sun: 10:00 AM - 6:00 PM'
  },
  social: {
    instagram: 'https://instagram.com/lumierebeauty',
    facebook: 'https://facebook.com/lumierebeauty',
    pinterest: 'https://pinterest.com/lumierebeauty'
  }
};
