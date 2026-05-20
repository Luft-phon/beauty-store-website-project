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
    id: 'avy',
    name: 'Avy Nguyen',
    role: 'Founder & Master Artist',
    image: '/images/logo/owner.jpg'
  },
  {
    id: 'tien',
    name: 'Tien Truong',
    role: 'Senior Makeup Artist',
    image: '/images/member/truong.jpg'
  },
  {
    id: 'hannah',
    name: 'Hannah Nguyen',
    role: 'Hair Stylist',
    image: '/images/member/hannah.jpg'
  },
  {
    id: 'vick',
    name: 'Vick Nguyen',
    role: 'Makeup Artist',
    image: '/images/member/vick.jpg'
  },
  {
    id: 'yani',
    name: 'Yani Truong',
    role: 'Makeup Artist',
    image: '/images/member/yani.jpg'
  },
  {
    id: 'nhi',
    name: 'Nhi Nguyen',
    role: 'Makeup Artist',
    image: '/images/member/nhi.jpg'
  }
];

export const MOCK_GALLERY_IMAGES: GalleryImage[] = [
  // Bridal
  { id: '1', url: '/images/galley/bridal/25.jpg', category: 'Bridal', alt: 'Bridal Makeup 1' },
  { id: '2', url: '/images/galley/bridal/26.jpg', category: 'Bridal', alt: 'Bridal Makeup 2' },
  { id: '3', url: '/images/galley/bridal/27.jpg', category: 'Bridal', alt: 'Bridal Makeup 3' },
  { id: '4', url: '/images/galley/bridal/10.jpg', category: 'Bridal', alt: 'Bridal Makeup 4' },
  { id: '5', url: '/images/galley/bridal/11.jpg', category: 'Bridal', alt: 'Bridal Makeup 5' },
  { id: '6', url: '/images/galley/bridal/12.jpg', category: 'Bridal', alt: 'Bridal Makeup 6' },
  // Party
  { id: '7', url: '/images/galley/photoshoot/20.jpg', category: 'Party', alt: 'Party Makeup 1' },
  { id: '8', url: '/images/galley/photoshoot/21.jpg', category: 'Party', alt: 'Party Makeup 2' },
  { id: '9', url: '/images/galley/photoshoot/22.jpg', category: 'Party', alt: 'Party Makeup 3' },
  { id: '10', url: '/images/galley/groom/5.jpg', category: 'Party', alt: 'Party Makeup 4' },
  { id: '11', url: '/images/galley/groom/6.jpg', category: 'Party', alt: 'Party Makeup 5' },
  // Photoshoot
  { id: '12', url: '/images/galley/photoshoot/1.jpg', category: 'Photoshoot', alt: 'Photoshoot Makeup 1' },
  { id: '13', url: '/images/galley/photoshoot/2.jpg', category: 'Photoshoot', alt: 'Photoshoot Makeup 2' },
  { id: '14', url: '/images/galley/photoshoot/15.jpg', category: 'Photoshoot', alt: 'Photoshoot Makeup 3' },
  { id: '15', url: '/images/galley/photoshoot/4.jpg', category: 'Photoshoot', alt: 'Photoshoot Makeup 4' },
  { id: '16', url: '/images/galley/photoshoot/5.jpg', category: 'Photoshoot', alt: 'Photoshoot Makeup 5' },
  // Groom / Others
  { id: '17', url: '/images/galley/groom/1.jpg', category: 'Groom', alt: 'Groom Styling 1' },
  { id: '18', url: '/images/galley/groom/2.jpg', category: 'Groom', alt: 'Groom Styling 2' },
  { id: '19', url: '/images/galley/bridal/6.jpg', category: 'Bridal', alt: 'Bridal Makeup 6' },
  { id: '20', url: '/images/galley/party/6.jpg', category: 'Party', alt: 'Party Makeup 6' },
  { id: '20', url: '/images/galley/photoshoot/6.jpg', category: 'Photoshoot', alt: 'Photoshoot Makeup 6' }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Thuy Tien',
    location: 'New York, USA',
    rating: 5,
    text: 'I absolutely love the products I purchased from this boutique! The quality is exceptional, and my skin has never looked better. The packaging is also beautiful, making it a luxurious experience every time I use them. Highly recommend!',
    service: 'Bridal Makeup',
    date: '2024-11-15',
    image: '/images/galley/party/9.jpg'
  },
  {
    id: '2',
    author: 'Jessica M.',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'Absolutely amazing experience! Sarah did my bridal makeup and I felt like a princess. The attention to detail was incredible and the look lasted all night long.',
    service: 'Wedding Day Coverage',
    date: '2024-10-22',
    image: '/images/galley/party/10.jpg'
  },
  {
    id: '3',
    author: 'Ngoc T.',
    location: 'Chicago, IL',
    rating: 5,
    text: 'David captured our wedding perfectly. Every photo tells a story. We are so grateful for these memories that we will cherish forever.',
    service: 'Wedding Photography',
    date: '2024-11-01',
    image: '/images/galley/party/11.jpg'
  },
  {
    id: '4',
    author: 'Emily R.',
    location: 'Miami, FL',
    rating: 5,
    text: 'The best skincare advice I have ever received. My complexion is glowing and I feel so much more confident. Thank you Lumière!',
    service: 'Skincare Consultation',
    date: '2024-12-05',
    image: '/images/galley/party/18.jpg'
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
  name: 'Le’Charme Beauté Boutique',
  tagline: 'Beauté in Every Detail',
  email: 'lecharme.beauteboutique@gmail.com',
  phone: '(714)-466-4152',
  address: '7862 Warner Ave STE A, Huntington Beach, CA 92646 (Studio #23, inside Sola Salons)',
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
