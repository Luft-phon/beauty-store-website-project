
export enum Language {
  EN = 'English',
  VI = 'Tiếng Việt',
  FR = 'Français',
  ZH = '中文',
  KO = '한국어'
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
