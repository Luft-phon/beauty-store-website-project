
import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Language, Service, Theme } from './types';
import { INITIAL_SERVICES, TRANSLATIONS, GALLERIES } from './constants';
import { MOCK_CATEGORIES, MOCK_STATISTICS, MOCK_WHY_CHOOSE_US, MOCK_FEATURED_SERVICE_IDS, MOCK_TESTIMONIALS, MOCK_PROCESS_STEPS, MOCK_COMPANY_INFO, MOCK_TEAM_MEMBERS } from './data';
import { applyThemeVariables } from './config/theme.config';
import Layout from './components/Layout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import AdminDashboard from './components/AdminDashboard';
import ServiceDetail from './components/ServiceDetail';
import { ServiceCard } from './components/ServiceCard';
import PaymentForm from './components/PaymentForm';
import TestimonialsSection from './components/TestimonialsSection';
import BookingPage from './components/BookingPage';
import PaymentSuccess from './components/PaymentSuccess';
import LoadingIntro from './components/LoadingIntro';
import PaymentCanceled from './components/PaymentCanceled';
import PaymentError from './components/PaymentError';
import { Camera, Star, Calendar, MapPin, ShoppingBag, Trash2, ArrowRight, Users, Award, Shield, Heart, Sparkles, Trophy, CheckCircle } from 'lucide-react';
import { FadeInSection } from './components/FadeInSection';
import { GalleryCarousel } from './components/GalleryCarousel';
import PolicyPage from './components/PolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import PaymentPending from './components/PaymentPending';
import InquiryPage from './components/InquiryPage';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>(Language.EN);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [cart, setCart] = useState<Service[]>([]);
  const t = TRANSLATIONS[currentLang];

  // Apply Light Sand theme on mount (permanent theme)
  useEffect(() => {
    applyThemeVariables(Theme.LIGHT_SAND);
  }, []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Skip initialization on touch devices to prevent scrolling/rendering issues
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleUpdateService = (updated: Service) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const addToCart = (service: Service) => {
    setCart(prev => [...prev, service]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Page Components defined locally to access 't' and 'services'

  const Home = () => {
    const featuredServices = services.filter(s => MOCK_FEATURED_SERVICE_IDS.includes(s.id));


    const getIconForCategory = (iconType: string) => {
      switch (iconType) {
        case 'star': return <Star size={32} strokeWidth={1} />;
        case 'circle': return <div className="w-8 h-8 rounded-full border-2 border-gold-500" />;
        case 'brush': return <div className="w-8 h-1 bg-gold-500 rotate-45" />;
        case 'camera': return <Camera size={32} strokeWidth={1} />;
        default: return <Star size={32} strokeWidth={1} />;
      }
    };

    const getIconForStat = (iconType: string) => {
      switch (iconType) {
        case 'users': return <Users size={32} strokeWidth={1} />;
        case 'star': return <Star size={32} strokeWidth={1} />;
        case 'calendar': return <Calendar size={32} strokeWidth={1} />;
        case 'award': return <Award size={32} strokeWidth={1} />;
        default: return <Star size={32} strokeWidth={1} />;
      }
    };

    const getIconForFeature = (iconType: string) => {
      switch (iconType) {
        case 'trophy': return <Trophy size={48} strokeWidth={1} />;
        case 'shield': return <Shield size={48} strokeWidth={1} />;
        case 'heart': return <Heart size={48} strokeWidth={1} />;
        case 'sparkles': return <Sparkles size={48} strokeWidth={1} />;
        case 'award': return <Award size={48} strokeWidth={1} />;
        default: return <Trophy size={48} strokeWidth={1} />;
      }
    };

    return (
      <div>

        {/* Hero */}
        <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            {/* <img
              src="https://picsum.photos/id/325/1920/1080"
              alt="Hero Background"
              className="w-full h-full object-cover"
            /> */}
            <video
              src="/images/logo/1.MP4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          </div>
          <FadeInSection className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-5xl">
              {t.hero.title}
            </h1>
            <p className="font-sen text-stone-200 text-base sm:text-lg md:text-xl tracking-wider mb-8 md:mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 px-4">
              {t.hero.subtitle}
            </p>
            <Link
              to="/services/party"
              className="font-outfit px-6 sm:px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-stone-900 transition-all duration-175 uppercase tracking-widest text-xs sm:text-sm font-bold animate-in fade-in duration-500 delay-50 inline-flex items-center gap-2 group"
            >
              {t.hero.cta}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>

        {/* Statistics Bar */}
        <FadeInSection className="bg-stone-50 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {MOCK_STATISTICS.map((stat) => {
                const translationKey = stat.id === 'clients' ? t.homepage.statistics.clients :
                  stat.id === 'rating' ? t.homepage.statistics.rating :
                    stat.id === 'experience' ? t.homepage.statistics.years :
                      t.homepage.statistics.awards;
                return (
                  <div key={stat.id} className="text-center group">
                    <div className="text-gold-500 flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      {getIconForStat(stat.icon)}
                    </div>
                    <div className="font-outfit text-3xl md:text-4xl text-stone-900 mb-2">{stat.value}</div>
                    <div className="text-stone-600 text-sm uppercase tracking-wider">{translationKey}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInSection>

        {/* Services Categories */}
        <FadeInSection className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16 md:mb-24">
            <span className="block font-serif text-4xl md:text-5xl uppercase tracking-wider text-[#4A3F35] mb-6">
              {t.homepage.sections.ourServices}
            </span>
            <div className="w-12 h-[1px] bg-[#C8997C] mx-auto mb-8"></div>
            <p className="font-sen text-stone-500 uppercase tracking-widest text-sm md:text-base max-w-2xl mx-auto px-4">
              {t.homepage.sections.ourServicesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
            {MOCK_CATEGORIES.map((category) => {
              const categoryTranslation =
                category.id === 'party' ? t.homepage.categories.party :
                  category.id === 'bridal' ? t.homepage.categories.bridal :
                    category.id === 'photoshoot' ? t.homepage.categories.photoshoot :
                      t.homepage.categories.partyEvent; // Fallback

              return (
                <Link
                  key={category.id}
                  to={`/services/${category.id}`}
                  className="group flex flex-col items-center text-center p-10 border-[0.5px] border-[#E5E0D8] bg-white transition-all duration-500 hover:border-[#C8997C] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className="mb-8 text-[#C8997C] group-hover:scale-110 transition-transform duration-500">
                    {getIconForCategory(category.icon)}
                  </div>
                  <h3 className="font-serif text-2xl text-[#4A3F35] mb-4 group-hover:text-[#C8997C] transition-colors tracking-wide">
                    {categoryTranslation.name}
                  </h3>
                  <p className="font-sen text-stone-500 text-sm leading-7 mb-8 min-h-[56px]">
                    {categoryTranslation.description}
                  </p>
                  <span className="text-[#4A3F35] text-xs font-bold uppercase tracking-[0.2em] border-b border-[#E5E0D8] pb-2 group-hover:text-[#C8997C] group-hover:border-[#C8997C] transition-all duration-300">
                    {t.homepage.buttons.explore}
                  </span>
                </Link>
              );
            })}
          </div>
        </FadeInSection>


        {/* How It Works */}
        <FadeInSection className="bg-[#FAF9F6] py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-24">
              <span className="block font-serif text-4xl md:text-5xl uppercase tracking-wider text-[#4A3F35] mb-6">
                {t.homepage.sections.howItWorks}
              </span>
              <div className="w-12 h-[1px] bg-[#C8997C] mx-auto mb-8"></div>
              <p className="font-sen text-stone-500 uppercase tracking-widest text-sm md:text-base max-w-2xl mx-auto px-4">
                {t.homepage.sections.howItWorksDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-[2.5rem] left-[16.5%] right-[16.5%] h-[1px] bg-[#E5E0D8]"></div>

              {MOCK_PROCESS_STEPS.map((step, index) => {
                const stepTranslation = step.id === 'booking' ? t.homepage.process.step1 :
                  step.id === 'consultation' ? t.homepage.process.step2 :
                    step.id === 'service' ? t.homepage.process.step3 :
                      t.homepage.process.step4;

                return (
                  <div key={step.id} className="justify-center relative flex flex-col items-center text-center group">
                    {/* Number Circle Background */}
                    <div className="relative mb-8 bg-[#FAF9F6] px-4 z-10">
                      <span className="font-serif text-6xl text-[#E5E0D8] group-hover:text-[#C8997C] transition-colors duration-500">
                        0{step.step}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#4A3F35] mb-4 tracking-wide">
                      {stepTranslation.title}
                    </h3>
                    <p className="font-sen text-stone-500 text-sm leading-7 max-w-[250px] mx-auto">
                      {stepTranslation.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInSection>
        {/* Why Choose Us */}
        <FadeInSection className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16 md:mb-24">
            <span className="block font-serif text-4xl md:text-5xl uppercase tracking-wider text-[#4A3F35] mb-6">
              {t.homepage.sections.whyChooseUs}
            </span>
            <div className="w-12 h-[1px] bg-[#C8997C] mx-auto mb-8"></div>
            <p className="font-sen text-stone-500 uppercase tracking-widest text-sm md:text-base max-w-2xl mx-auto px-4">
              {t.homepage.sections.whyChooseUsDesc}
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {MOCK_WHY_CHOOSE_US.map((item) => {
              const featureTranslation = item.id === 'quality' ? t.homepage.features.quality :
                item.id === 'experts' ? t.homepage.features.experts :
                  item.id === 'hygiene' ? t.homepage.features.hygiene :
                    t.homepage.features.personalized;
              return (
                <div key={item.id} className="flex flex-col items-center text-center group">
                  <div className="mb-6 text-[#C8997C] transition-transform duration-500 group-hover:scale-110">
                    {getIconForFeature(item.icon)}
                  </div>
                  <h3 className="font-serif text-2xl text-[#4A3F35] mb-4 mt-2">{featureTranslation.title}</h3>
                  <p className="font-sen text-stone-500 text-sm leading-7 max-w-xs mx-auto">{featureTranslation.description}</p>
                </div>
              );
            })}
          </div>
        </FadeInSection>



        {/* Testimonials */}
        <FadeInSection>
          <TestimonialsSection
            testimonials={MOCK_TESTIMONIALS.map(item => {
              const trans = t.testimonials?.[item.id];
              return trans ? { ...item, ...trans } : item;
            })}
            title={t.homepage.sections.clientReviews}
            subtitle={t.homepage.sections.clientReviewsDesc}
          />
        </FadeInSection>

        {/* CTA Banner */}
        <FadeInSection className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://picsum.photos/id/1027/1920/600"
              alt="CTA Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 max-w-4xl">
              {t.homepage.cta.title}
            </h2>
            <p className="font-sen text-stone-200 text-base md:text-lg mb-8 md:mb-10 max-w-2xl">
              {t.homepage.cta.subtitle}
            </p>
            <Link
              to="/booking"
              className="px-6 sm:px-8 py-3 md:py-4 bg-gold-500 text-white hover:bg-gold-600 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-bold inline-flex items-center gap-2 group shadow-lg"
            >
              {t.homepage.cta.button}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInSection>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="animate-in fade-in duration-500">
      {/* About Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/logo/cover.jpg"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40"></div>
        </div>
        {/* <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{t.aboutPage.title}</h1>
          <p className="uppercase tracking-widest text-sm opacity-90">{t.aboutPage.subtitle}</p>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <span className="block font-serif text-5xl uppercase font-bold text-stone-900 tracking-tighter pb-4 ">
              {t.aboutPage.storyTitle}
            </span>
            <div className="w-16 h-0.5 bg-gold-500"></div>
            <p className="font-sen text-stone-600 leading-relaxed text-lg">
              {t.aboutPage.storyText}
            </p>
            <p className="font-sen text-stone-600 leading-relaxed text-lg">
              {t.aboutPage.text}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-200 z-0"></div>
            <img
              src="/images/logo/logo.jpg"
              alt="Our Story"
              className="relative z-10 shadow-xl w-full"
            />
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-stone-50 p-12 text-center rounded-lg border border-stone-100 mb-20">
          <span className="block font-serif text-5xl uppercase font-bold text-center text-stone-900 tracking-tighter pb-4">
            {t.aboutPage.philosophyTitle}
          </span>
          <p className="font-sen max-w-3xl mx-auto text-stone-600 text-lg leading-relaxed italic">
            "{t.aboutPage.philosophyText}"
          </p>
        </div>

        {/* Team */}
        <div className="mb-20">
          <span className="block font-serif text-5xl uppercase font-bold text-center text-stone-900 tracking-tighter pb-12">
            {t.aboutPage.teamTitle}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_TEAM_MEMBERS.map((member, index) => {
              const translatedMember = t.aboutPage.teamMembers?.[index];
              return (
                <div key={member.id} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6 w-48 h-48 overflow-hidden rounded-full border-4 border-stone-100 shadow-lg group-hover:border-gold-500 transition-all duration-500">
                    <img
                      src={member.image}
                      alt={translatedMember?.name || member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 font-bold mb-2">{translatedMember?.name || member.name}</h3>
                  <span className="font-outfit text-xs uppercase tracking-widest text-gold-600 font-bold mb-4 block">{translatedMember?.role || member.role}</span>
                  <p className="font-sen text-stone-500 text-sm leading-relaxed max-w-xs">{translatedMember?.bio}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </FadeInSection>
  );

  const ServicesPage = ({ category }: { category?: string }) => {
    // Filter services based on category prop
    // If category is "Makeup", we also include "Packages" as per common user expectation for beauty sites, or keep it strict?
    // User asked to "separate makeup, education class, photoshoot".
    // I will keep it strict for now but ensure the filtered list is correct.
    const filteredServices = category
      ? services.filter(s => s.category.toLowerCase() === category.toLowerCase())
      : services;

    const pageTitle = category ? `${category} Services` : t.nav.services;

    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* <h2 className="font-serif uppercase text-5xl text-center mb-12">{pageTitle}</h2> */}
        <h2 className="font-serif uppercase text-5xl text-center mb-12">
          {category === 'PartyEvent' ? 'Party / Event' :
            category === 'Photoshoot' ? 'Photoshoot / Stage' :
              category === 'Bridal' ? 'Bridal & Guest Services' :
                category === 'Education' ? 'Private Classes' :
                  'Services'}
        </h2>
        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* <Link to="/services" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${!category ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>All</Link> */}
          <Link to="/services/party" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'PartyEvent' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Party Makeup</Link>
          <Link to="/services/photoshoot" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'Photoshoot' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Photoshoot/Stage</Link>
          <Link to="/services/bridal" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'Bridal' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Bridal Packages</Link>
          <Link to="/services/education" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'Education' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Classes</Link>
        </div>

        <div className="font-sen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              t={t}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    );
  };

  const GalleryPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* <h2 className="font-serif text-4xl text-center mb-4">{t.nav.gallery}</h2> */}
      <span className="block font-serif text-5xl uppercase text-center font-bold text-stone-900 tracking-tighter pb-4 ">
        {t.nav.gallery}
      </span>
      <p className="font-sen text-center text-stone-500 tracking-widest text-sm">Real Clients, Real Moments</p>

      <GalleryCarousel images={GALLERIES} />

    </div>
  );

  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    if (cart.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag size={64} className="text-stone-300 mb-6" />
          <h2 className="font-serif text-3xl mb-4">{t.cart.empty}</h2>
          <p className="font-sen text-stone-500 mb-8">{t.cart.browseHint}</p>
          <Link to="/services/party" className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors">
            {t.cart.continue}
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl text-center mb-12">{t.cart.title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-4 border border-stone-100 shadow-sm rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-900">{item.name}</h4>
                    <span className="text-xs text-stone-500 uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-bold text-stone-800">${item.price}</span>
                  <button onClick={() => removeFromCart(idx)} className="text-stone-400 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-200 sticky top-24">
              <h3 className="font-serif text-2xl mb-6">{t.cart.subtotal}</h3>
              <div className="space-y-4 border-b border-stone-200 pb-6 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>{cart.length} items</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-xl text-stone-900 mb-8">
                <span>{t.cart.total}</span>
                <span>${totalAmount}</span>
              </div>
              <Link to="/booking" className="rounded-[5px] py-4 block w-full bg-stone-900 text-white text-center uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center space-x-2">
                <span>{t.cart.proceed}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/services/party" className="block text-center mt-4 text-stone-500 text-sm hover:text-gold-500 underline">
                {t.cart.continue}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };



  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* <h2 className="font-serif text-4xl mb-4">{t.nav.contact}</h2> */}
          <span className="block font-serif text-5xl uppercase font-bold text-stone-900 tracking-tighter pb-4 ">
            {t.nav.contact}
          </span>
          <p className="font-sen text-stone-600 leading-relaxed">
            {t.contactPage.text}
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gold-100 flex items-center justify-center text-gold-700 rounded-full">✨</div>
              <div>
                <h4 className="font-bold text-stone-900">{t.contactPage.location}</h4>
                <p className="font-sen text-stone-500 text-sm">{t.contactPage.locationText}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gold-100 flex items-center justify-center text-gold-700 rounded-full">📩</div>
              <div>
                <h4 className="font-bold text-stone-900">{t.contactPage.dm}</h4>
                <p className="font-sen text-stone-500 text-sm">{t.contactPage.dmText}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gold-100 flex items-center justify-center text-gold-700 rounded-full">📩</div>
              <div>
                <h4 className="font-bold text-stone-900">Hotline</h4>
                <p className="font-sen text-stone-500 text-sm">{MOCK_COMPANY_INFO.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-80 lg:h-auto bg-stone-200 rounded-lg overflow-hidden relative">
          {/* Mock Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6637.523321302982!2d-117.99309988862174!3d33.71511567317428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd26f40dc08565%3A0x46046ac72361e233!2s7862%20Warner%20Ave%2C%20Huntington%20Beach%2C%20CA%2092647!5e0!3m2!1sen!2sus!4v1766431718271!5m2!1sen!2sus"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Layout
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        cartCount={cart.length}
        services={services}
      >
        {showIntro && <LoadingIntro onComplete={() => setShowIntro(false)} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/party" element={<ServicesPage category="PartyEvent" />} />
          <Route path="/services/photoshoot" element={<ServicesPage category="Photoshoot" />} />
          <Route path="/services/bridal" element={<ServicesPage category="Bridal" />} />
          <Route path="/services/guest" element={<ServicesPage category="Guest" />} />
          <Route path="/services/education" element={<ServicesPage category="Education" />} />
          <Route path="/services/:id" element={<ServiceDetail services={services} onAddToCart={addToCart} currentLang={currentLang} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          <Route path="/payment-pending" element={<PaymentPending />} />
          <Route path="/payment-error" element={<PaymentError />} />
          <Route path="/booking" element={<BookingPage t={t} cart={cart} clearCart={clearCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/inquiry" element={<InquiryPage t={t} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/admin" element={<AdminDashboard services={services} onUpdateService={handleUpdateService} />} />
        </Routes>
        <SpeedInsights />
        <Analytics />
      </Layout>

    </BrowserRouter>
  );
};

export default App;
