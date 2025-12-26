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
  location: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  image: string;
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
    author: 'Ali Tufan',
    location: 'New York, USA',
    rating: 5,
    text: 'I absolutely love the products I purchased from this boutique! The quality is exceptional, and my skin has never looked better. The packaging is also beautiful, making it a luxurious experience every time I use them. Highly recommend!',
    service: 'Bridal Makeup',
    date: '2024-11-15',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    author: 'Jessica M.',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'Absolutely amazing experience! Sarah did my bridal makeup and I felt like a princess. The attention to detail was incredible and the look lasted all night long.',
    service: 'Wedding Day Coverage',
    date: '2024-10-22',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    author: 'Michael T.',
    location: 'Chicago, IL',
    rating: 5,
    text: 'David captured our wedding perfectly. Every photo tells a story. We are so grateful for these memories that we will cherish forever.',
    service: 'Wedding Photography',
    date: '2024-11-01',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    author: 'Emily R.',
    location: 'Miami, FL',
    rating: 5,
    text: 'The best skincare advice I have ever received. My complexion is glowing and I feel so much more confident. Thank you Lumière!',
    service: 'Skincare Consultation',
    date: '2024-12-05',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
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
  email: 'thanhphongchupanh@gmail.com',
  phone: '+1 (555) 123-4567',
  address: '123 Beauty Lane, Suite 100, Los Angeles, CA 90001',
  hours: {
    weekday: 'Mon-Fri: 9:00 AM - 7:00 PM',
    weekend: 'Sat-Sun: 10:00 AM - 6:00 PM'
  },
  social: {
    instagram: 'https://instagram.com/lecharmebeauteboutique',
    facebook: 'https://facebook.com/lecharmebeauteboutique',
    pinterest: 'https://pinterest.com/lecharmebeauteboutique'
  }
};
