
export enum Language {
  EN = 'English',
  VI = 'Tiếng Việt',
  FR = 'Français',
  ZH = '中文',
  KO = '한국어'
}

export enum Theme {
  WARM_BEIGE = 'warm-beige',
  LIGHT_SAND = 'light-sand',
  OFF_WHITE = 'off-white'
}

export interface ThemeColors {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    accentHover: string;
    background: string;
    backgroundAlt: string;
    text: string;
    textLight: string;
    textDark: string;
    border: string;
    borderLight: string;
    shadow: string;
  };
}

export interface Service {
  id: string;
  category: 'Makeup' | 'Nails' | 'Tattooing' | 'Photography';
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Booking {
  id: string;
  customerName: string;
  date: string;
  time: string;
  serviceIds: string[];
  depositPaid: boolean;
  totalAmount: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    contact: string;
    booking: string;
    admin: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  homepage: {
    statistics: {
      clients: string;
      rating: string;
      years: string;
      awards: string;
    };
    sections: {
      ourServices: string;
      ourServicesDesc: string;
      featuredServices: string;
      featuredServicesDesc: string;
      whyChooseUs: string;
      whyChooseUsDesc: string;
      howItWorks: string;
      howItWorksDesc: string;
      clientReviews: string;
      clientReviewsDesc: string;
    };
    categories: {
      makeup: { name: string; description: string; };
      nails: { name: string; description: string; };
      tattooing: { name: string; description: string; };
      photography: { name: string; description: string; };
    };
    features: {
      quality: { title: string; description: string; };
      experts: { title: string; description: string; };
      hygiene: { title: string; description: string; };
      personalized: { title: string; description: string; };
    };
    process: {
      step1: { title: string; description: string; };
      step2: { title: string; description: string; };
      step3: { title: string; description: string; };
      step4: { title: string; description: string; };
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
    buttons: {
      explore: string;
      learnMore: string;
      viewAll: string;
      addToCart: string;
    };
  };
  aboutPage: {
    title: string;
    subtitle: string;
    storyTitle: string;
    storyText: string;
    philosophyTitle: string;
    philosophyText: string;
    teamTitle: string;
  };
  servicePage: {
    addToCart: string;
    added: string;
  };
  serviceDetail: {
    back: string;
    rating: string;
    perSession: string;
    depositRequired: string;
    toSecureBooking: string;
    whatsIncluded: string;
    duration: string;
    bookingLabel: string;
    advanceRequired: string;
    bookNow: string;
    serviceDetails: string;
    importantInfo: string;
    importantInfoItems: {
      arrive: string;
      cancellation: string;
      consultation: string;
      patchTest: string;
    };
    youMayLike: string;
    notFound: string;
    backToServices: string;
    view: string;
    durationMakeup: string;
    durationNails: string;
    durationTattooing: string;
    durationPhotography: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    total: string;
    proceed: string;
    continue: string;
    remove: string;
  };
  booking: {
    title: string;
    summary: string;
    items: string;
    selectDate: string;
    selectTime: string;
    selectService: string;
    name: string;
    email: string;
    deposit: string;
    confirm: string;
    success: string;
    emptyRedirect: string;
  };
  footer: {
    rights: string;
  };
}
