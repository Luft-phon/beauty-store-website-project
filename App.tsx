
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Language, Service, Theme } from './types';
import { INITIAL_SERVICES, TRANSLATIONS, GALLERIES } from './constants';
import { MOCK_CATEGORIES, MOCK_STATISTICS, MOCK_WHY_CHOOSE_US, MOCK_FEATURED_SERVICE_IDS, MOCK_TESTIMONIALS, MOCK_PROCESS_STEPS } from './data';
import { applyThemeVariables } from './config/theme.config';
import Layout from './components/Layout';

import AdminDashboard from './components/AdminDashboard';
import ServiceDetail from './components/ServiceDetail';
import { ServiceCard } from './components/ServiceCard';
import PaymentForm from './components/PaymentForm';
import TestimonialsSection from './components/TestimonialsSection';
import BookingPage from './components/BookingPage';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCanceled from './components/PaymentCanceled';
import PaymentError from './components/PaymentError';
import { Camera, Star, Calendar, MapPin, ShoppingBag, Trash2, ArrowRight, Users, Award, Shield, Heart, Sparkles, Trophy, CheckCircle } from 'lucide-react';
import { FadeInSection } from './components/FadeInSection';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(Language.EN);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [cart, setCart] = useState<Service[]>([]);
  const t = TRANSLATIONS[currentLang];

  // Apply Light Sand theme on mount (permanent theme)
  useEffect(() => {
    applyThemeVariables(Theme.LIGHT_SAND);
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
        case 'star': return <Star size={32} />;
        case 'circle': return <div className="w-8 h-8 rounded-full border-2 border-gold-500" />;
        case 'brush': return <div className="w-8 h-1 bg-gold-500 rotate-45" />;
        case 'camera': return <Camera size={32} />;
        default: return <Star size={32} />;
      }
    };

    const getIconForStat = (iconType: string) => {
      switch (iconType) {
        case 'users': return <Users size={32} />;
        case 'star': return <Star size={32} />;
        case 'calendar': return <Calendar size={32} />;
        case 'award': return <Award size={32} />;
        default: return <Star size={32} />;
      }
    };

    const getIconForFeature = (iconType: string) => {
      switch (iconType) {
        case 'trophy': return <Trophy size={40} />;
        case 'shield': return <Shield size={40} />;
        case 'heart': return <Heart size={40} />;
        case 'sparkles': return <Sparkles size={40} />;
        default: return <Trophy size={40} />;
      }
    };

    return (
      <div>
        {/* Hero */}
        <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://picsum.photos/id/325/1920/1080"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
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
              to="/services"
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
          <div className="text-center mb-12 md:mb-16">
            {/* <h2 className="font-serif uppercase text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-4">{t.homepage.sections.ourServices}</h2> */}
            <span className="block font-serif text-5xl uppercase font-bold text-stone-900 tracking-tighter pb-4 ">
              {t.homepage.sections.ourServices}
            </span>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <p className="font-sen text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
              {t.homepage.sections.ourServicesDesc}
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {MOCK_CATEGORIES.map((category) => {
              const categoryTranslation = category.id === 'makeup' ? t.homepage.categories.makeup :
                category.id === 'Photoshoot' ? t.homepage.categories.photoshoot :
                  category.id === 'PartyEvent' ? t.homepage.categories.partyEvent :
                    t.homepage.categories.photography;
              return (
                <Link
                  to="/services"
                  className="group flex flex-col items-center text-center p-6 md:p-8 border border-stone-100 hover:shadow-xl hover:border-gold-200 transition-all duration-300 rounded-sm bg-white"
                >
                  <div className="mb-4 md:mb-6 text-gold-500 group-hover:scale-110 group-hover:text-gold-600 transition-all duration-300">
                    {getIconForCategory(category.icon)}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl mb-3 text-stone-900 group-hover:text-gold-600 transition-colors">
                    {categoryTranslation.name}
                  </h3>
                  <p className="font-sen text-stone-500 text-sm leading-relaxed mb-4">
                    {categoryTranslation.description}
                  </p>
                  <span className="text-gold-600 text-sm font-medium uppercase tracking-wider group-hover:gap-2 flex items-center gap-1 transition-all">
                    {t.homepage.buttons.explore} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </FadeInSection>

        {/* Featured Services */}
        {/* <FadeInSection className="bg-stone-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="block font-serif text-5xl uppercase font-bold text-stone-900 tracking-tighter pb-4 ">
                {t.homepage.sections.featuredServices}
              </span>
              <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
              <p className="font-sen text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
                {t.homepage.sections.featuredServicesDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      ${service.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-gold-600 mb-2">{service.category}</div>
                    <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3">{service.name}</h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex gap-3">
                      <Link
                        to={`/services/${service.id}`}
                        className="flex-1 text-center py-2 px-4 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors text-sm font-medium"
                      >
                        {t.homepage.buttons.learnMore}
                      </Link>
                      <button
                        onClick={() => addToCart(service)}
                        className="flex-1 py-2 px-4 bg-gold-500 text-white hover:bg-gold-600 transition-colors text-sm font-medium"
                      >
                        {t.homepage.buttons.addToCart}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-12">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 text-sm font-medium uppercase tracking-wider group"
              >
                {t.homepage.buttons.viewAll}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </FadeInSection> */}

        {/* Why Choose Us */}
        <FadeInSection className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-4">{t.homepage.sections.whyChooseUs}</h2> */}
            <span className="block font-serif text-5xl uppercase font-bold text-stone-900 tracking-tighter pb-4 ">
              {t.homepage.sections.whyChooseUs}
            </span>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <p className="font-sen text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
              {t.homepage.sections.whyChooseUsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {MOCK_WHY_CHOOSE_US.map((item) => {
              const featureTranslation = item.id === 'quality' ? t.homepage.features.quality :
                item.id === 'experts' ? t.homepage.features.experts :
                  item.id === 'hygiene' ? t.homepage.features.hygiene :
                    t.homepage.features.personalized;
              return (
                <div key={item.id} className="text-center p-6 group hover:bg-stone-50 transition-colors duration-300 rounded-sm">
                  <div className="text-gold-500 flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getIconForFeature(item.icon)}
                  </div>
                  <h3 className="font-sen font-serif text-xl md:text-2xl text-stone-900 mb-3">{featureTranslation.title}</h3>
                  <p className="font-sen text-stone-600 text-sm leading-relaxed">{featureTranslation.description}</p>
                </div>
              );
            })}
          </div>
        </FadeInSection>

        {/* How It Works */}
        <FadeInSection className="bg-gradient-to-br from-stone-900 to-stone-800 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">{t.homepage.sections.howItWorks}</h2> */}
              <span className="block font-serif text-5xl uppercase font-bold tracking-tighter pb-4 ">
                {t.homepage.sections.howItWorks}
              </span>
              <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
              <p className="font-sen text-stone-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                {t.homepage.sections.howItWorksDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {MOCK_PROCESS_STEPS.map((step, index) => {
                const stepTranslation = step.id === 'booking' ? t.homepage.process.step1 :
                  step.id === 'consultation' ? t.homepage.process.step2 :
                    step.id === 'service' ? t.homepage.process.step3 :
                      t.homepage.process.step4;
                return (
                  <div key={step.id} className="relative">
                    <div className="text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-full border-2 border-gold-500 flex items-center justify-center bg-stone-800">
                        <span className="font-serif text-2xl md:text-3xl text-gold-500">{step.step}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mb-3">{stepTranslation.title}</h3>
                      <p className="font-sen text-stone-300 text-sm leading-relaxed">{stepTranslation.description}</p>
                    </div>
                    {index < MOCK_PROCESS_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gold-500/30 -translate-x-1/2"></div>
                    )}
                  </div>
                );
              })}
            </div>
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
    <FadeInSection className="animate-in fade-in duration-500">
      {/* About Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/id/64/1920/800"
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
              src="/images/logo/owner.jpg"
              alt="Our Story"
              className="relative z-10 shadow-xl w-full"
            />
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-stone-50 p-12 text-center rounded-lg border border-stone-100 mb-20">
          <span className="block font-serif text-5xl uppercase font-bold text-stone-900 tracking-tighter pb-4">
            {t.aboutPage.philosophyTitle}
          </span>
          <p className="font-sen max-w-3xl mx-auto text-stone-600 text-lg leading-relaxed italic">
            "{t.aboutPage.philosophyText}"
          </p>
        </div>

        {/* Team */}

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
      <FadeInSection className="max-w-7xl mx-auto px-4 py-16">
        {/* <h2 className="font-serif uppercase text-5xl text-center mb-12">{pageTitle}</h2> */}
        <h2 className="font-serif uppercase text-5xl text-center mb-12">
          {category === 'PartyEvent' ? 'Party / Event' :
            category === 'Photoshoot' ? 'Photoshoot / Stage' :
              category === 'Guest' ? 'Guest' :
                category === 'Bridal' ? 'Bridal' :
                  category === 'Education' ? 'Private Classes' :
                    'Services'}
        </h2>
        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/services" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${!category ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>All</Link>
          <Link to="/services/party" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'PartyEvent' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Party Makeup</Link>
          <Link to="/services/photoshoot" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'Photoshoot' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Photoshoot/Stage</Link>
          <Link to="/services/bridal" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'Bridal' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Bridal Packages</Link>
          <Link to="/services/guest" className={`font-outfit px-6 py-2 uppercase text-xs tracking-widest font-bold border transition-all ${category === 'Guest' ? 'bg-stone-900 text-white border-stone-900' : 'text-stone-600 border-stone-200 hover:border-gold-500 hover:text-gold-500'}`}>Guest Services</Link>
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
      </FadeInSection>
    );
  };

  const GalleryPage = () => (
    <FadeInSection className="max-w-7xl mx-auto px-4 py-16">
      {/* <h2 className="font-serif text-4xl text-center mb-4">{t.nav.gallery}</h2> */}
      <span className="block font-serif text-5xl uppercase text-center font-bold text-stone-900 tracking-tighter pb-4 ">
        {t.nav.gallery}
      </span>
      <p className="font-sen text-center text-stone-500 mb-12 tracking-widest text-sm">Real Clients, Real Moments</p>
      <div className="columns-1 md:columns-3 gap-4 space-y-4">
        {GALLERIES.map((src, idx) => (
          <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm">
            <img src={src} alt={`Gallery ${idx}`} className="w-full hover:opacity-90 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </FadeInSection>
  );

  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    if (cart.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag size={64} className="text-stone-300 mb-6" />
          <h2 className="font-serif text-3xl mb-4">{t.cart.empty}</h2>
          <p className="font-sen text-stone-500 mb-8">{t.cart.browseHint}</p>
          <Link to="/services" className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors">
            {t.cart.continue}
          </Link>
        </div>
      );
    }

    return (
      <FadeInSection className="max-w-5xl mx-auto px-4 py-16">
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
              <Link to="/services" className="block text-center mt-4 text-stone-500 text-sm hover:text-gold-500 underline">
                {t.cart.continue}
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>
    );
  };



  const ContactPage = () => (
    <FadeInSection className="max-w-7xl mx-auto px-4 py-16">
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
    </FadeInSection>
  );

  return (
    <BrowserRouter>
      <Layout
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        cartCount={cart.length}
      >
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
          <Route path="/payment-error" element={<PaymentError />} />
          <Route path="/booking" element={<BookingPage t={t} cart={cart} clearCart={clearCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboard services={services} onUpdateService={handleUpdateService} />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  );
};

export default App;
