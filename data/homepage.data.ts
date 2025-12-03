/**
 * Home Page Data
 * 
 * This file contains data specifically for the home page sections.
 * Easy to update without touching component code!
 */

export interface HomeHeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface CategoryFeature {
  id: string;
  name: string;
  description: string;
  icon: 'star' | 'circle' | 'brush' | 'camera';
  link: string;
}

export interface StatisticItem {
  id: string;
  value: string;
  label: string;
  icon: 'users' | 'star' | 'calendar' | 'award';
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: 'shield' | 'heart' | 'sparkles' | 'trophy';
}

// Hero Section Data
export const MOCK_HOME_HERO: HomeHeroData = {
  title: 'Elegance in Every Detail',
  subtitle: 'Premier Makeup, Nails, Tattooing & Photography',
  ctaText: 'Book Appointment',
  ctaLink: '#/booking',
  backgroundImage: 'https://picsum.photos/id/325/1920/1080'
};

// Category Features
export const MOCK_CATEGORIES: CategoryFeature[] = [
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Professional makeup artistry for all occasions, from natural glam to bold bridal looks.',
    icon: 'star',
    link: '#/services?category=Makeup'
  },
  {
    id: 'nails',
    name: 'Nails',
    description: 'Expert nail care and art, featuring the latest trends in manicures and pedicures.',
    icon: 'circle',
    link: '#/services?category=Nails'
  },
  {
    id: 'tattooing',
    name: 'Tattooing',
    description: 'Semi-permanent makeup including microblading and ombre powder brows by certified artists.',
    icon: 'brush',
    link: '#/services?category=Tattooing'
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Capture your special moments with our professional wedding and portrait photography.',
    icon: 'camera',
    link: '#/services?category=Photography'
  }
];

// Statistics
export const MOCK_STATISTICS: StatisticItem[] = [
  {
    id: 'clients',
    value: '5000+',
    label: 'Happy Clients',
    icon: 'users'
  },
  {
    id: 'rating',
    value: '4.9',
    label: 'Average Rating',
    icon: 'star'
  },
  {
    id: 'years',
    value: '5+',
    label: 'Years Experience',
    icon: 'calendar'
  },
  {
    id: 'awards',
    value: '15+',
    label: 'Industry Awards',
    icon: 'award'
  }
];

// Why Choose Us
export const MOCK_WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'We use only the finest products and latest techniques to ensure exceptional results every time.',
    icon: 'trophy'
  },
  {
    id: 'experts',
    title: 'Expert Team',
    description: 'Our certified professionals bring years of experience and passion to every service.',
    icon: 'trophy'
  },
  {
    id: 'hygiene',
    title: 'Hygiene First',
    description: 'Strict sanitization protocols and premium-grade equipment for your safety and comfort.',
    icon: 'shield'
  },
  {
    id: 'personalized',
    title: 'Personalized Care',
    description: 'Every client receives tailored attention and customized solutions for their unique needs.',
    icon: 'heart'
  }
];

// Featured Services (IDs matching services in services.data.ts)
export const MOCK_FEATURED_SERVICE_IDS = ['1', '4', '5'];

// Process Steps
export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export const MOCK_PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step1',
    step: 1,
    title: 'Book Online',
    description: 'Choose your service and preferred date/time through our easy booking system.'
  },
  {
    id: 'step2',
    step: 2,
    title: 'Consultation',
    description: 'Meet with our experts to discuss your vision and customize your service.'
  },
  {
    id: 'step3',
    step: 3,
    title: 'Experience',
    description: 'Relax and enjoy your service in our comfortable, luxurious environment.'
  },
  {
    id: 'step4',
    step: 4,
    title: 'Follow-Up',
    description: 'Receive aftercare instructions and schedule any follow-up appointments.'
  }
];

// CTA Banner
export interface CTABanner {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export const MOCK_CTA_BANNER: CTABanner = {
  title: 'Ready to Transform Your Look?',
  subtitle: 'Book your appointment today and experience the difference',
  buttonText: 'Get Started',
  buttonLink: '#/booking',
  backgroundImage: 'https://picsum.photos/id/1027/1920/600'
};
