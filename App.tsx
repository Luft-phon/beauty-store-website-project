
import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Language, Service, Theme } from './types';
import { INITIAL_SERVICES, TRANSLATIONS, GALLERIES } from './constants';
import { MOCK_STATISTICS, MOCK_TESTIMONIALS, MOCK_COMPANY_INFO, MOCK_TEAM_MEMBERS } from './data';
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
import { ShoppingBag, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
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
    return (
      <div className="homepage overflow-hidden">
        <section className="home-hero relative min-h-[calc(100vh-5rem)] grid lg:grid-cols-[1.04fr_.96fr] bg-[#f4ece5]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-20 sm:px-10 lg:pl-[max(4rem,calc((100vw-80rem)/2))] lg:pr-16">
            {/* <div className="home-hero-orb" aria-hidden="true" /> */}
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative max-w-xl"
            >
              <p className="home-kicker mb-7">Le’Charme Beauté Boutique · Huntington Beach</p>
              <h1 className="font-serif text-[3.8rem] leading-[.82] tracking-[-.055em] text-[#382d27] sm:text-7xl lg:text-[6.4rem]">
                Beauty, <em className="font-serif font-light text-[#bd876b]">made</em><br />
                personal.
              </h1>
              <p className="mt-8 max-w-md font-sen text-base leading-7 text-[#6e5b50] sm:text-lg">
                Artful makeup and hair for the moments you will never forget—created around your features, your style, and your story.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/booking" className="home-button home-button--dark">
                  {t.hero.cta} <ArrowRight size={17} />
                </Link>
                <Link to="/gallery" className="home-text-link">View our work <span>↗</span></Link>
              </div>
            </motion.div>
            <div className="home-scroll-cue hidden lg:flex"><span>Scroll to explore</span><i /></div>
          </div>
          <div className="relative min-h-[480px] overflow-hidden lg:min-h-full">
            <div className="relative h-screen w-full overflow-hidden">
  <video
    src="/images/logo/1.MP4"
    className="home-hero-video h-full w-full object-cover object-center"
    autoPlay
    muted
    loop
    playsInline
  />
</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e211c]/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between border-t border-white/50 pt-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
              <span className="font-sen text-[10px] font-bold uppercase tracking-[.24em]">Bridal beauty</span>
              <span className="font-serif text-2xl italic">01</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 hidden h-16 w-[44%] bg-[#f4ece5] lg:block" />
        </section>

        <section className="border-y border-[#dccfc4] bg-[#fffdfa] px-5 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="font-serif text-xl italic text-[#5d4840]">Refined artistry. Relaxed luxury. Entirely you.</p>
            <div className="flex items-center gap-3 font-sen text-[10px] font-bold uppercase tracking-[.18em] text-[#7a665c]">
              <span className="h-px w-8 bg-[#c38c70]" /> Serving Orange County & beyond
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <FadeInSection className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="home-kicker mb-5">The Le’Charme experience</p>
              <h2 className="font-serif text-5xl leading-[.94] tracking-[-.04em] text-[#382d27] sm:text-6xl">A look that feels<br /><em className="font-light text-[#bd876b]">like you, elevated.</em></h2>
            </div>
            <p className="max-w-sm font-sen text-sm leading-6 text-[#756158]">Every appointment begins with listening. Then we bring the detail, the artistry, and the calm confidence.</p>
          </FadeInSection>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: 'Event Makeup', detail: 'Soft glam to full glam, tailored for your moment.', image: '/images/galley/party/premium-makeup-only/1.jpg', link: '/services/party', number: '01' },
              { title: 'Bridal Beauty', detail: 'Timeless, camera-ready beauty for every chapter.', image: '/images/galley/bridal/bridal-makeup-2hair/1.jpg', link: '/services/bridal', number: '02' },
              { title: 'Photoshoot & Stage', detail: 'High-impact artistry built for the lens.', image: '/images/galley/photoshoot/stage/1.jpg', link: '/services/photoshoot', number: '03' },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.65, delay: index * 0.13, ease: 'easeOut' }}
              >
              <Link to={service.link} className="home-service-card group">
                <div className="relative h-[390px] overflow-hidden sm:h-[450px]">
                  <img src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute right-5 top-5 font-serif text-xl italic text-white">{service.number}</span>
                </div>
                <div className="flex items-end justify-between gap-4 px-1 pb-1 pt-5">
                  <div>
                    <h3 className="font-serif text-3xl text-[#3b302a]">{service.title}</h3>
                    <p className="mt-2 font-sen text-sm leading-6 text-[#806c62]">{service.detail}</p>
                  </div>
                  <span className="home-round-arrow"><ArrowRight size={17} /></span>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-[#40332d] px-5 py-20 text-[#f7eee8] sm:px-8 lg:py-28">
          <FadeInSection className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="absolute -left-3 -top-3 h-full w-full border border-[#d4a68d] sm:-left-5 sm:-top-5" />
              <img src="/images/galley/photoshoot/stage/1.jpg" alt="Editorial makeup for a photoshoot" loading="lazy" className="home-editorial-image relative h-[430px] w-full object-cover sm:h-[570px]" />
            </motion.div>
            <div>
              <p className="home-kicker home-kicker--light mb-6">A beauty studio with heart</p>
              <h2 className="font-serif text-5xl leading-[.94] tracking-[-.04em] sm:text-6xl">The art is in the <em className="font-light text-[#dba78d]">details.</em></h2>
              <p className="mt-8 max-w-xl font-sen text-base leading-7 text-[#decfc7]">From a quiet in-studio appointment to a full wedding morning, we make beauty feel effortless. Our artists pair thoughtful technique with a personal approach, so you can arrive relaxed and leave unmistakably radiant.</p>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#786056] pt-8 sm:grid-cols-4">
                {MOCK_STATISTICS.map((stat) => (
                  <div key={stat.id}>
                    <div className="font-serif text-3xl text-[#e7b59c]">{stat.value}</div>
                    <div className="mt-2 font-sen text-[10px] font-bold uppercase leading-4 tracking-[.14em] text-[#cdbbb1]">{stat.id === 'clients' ? t.homepage.statistics.clients : stat.id === 'rating' ? t.homepage.statistics.rating : stat.id === 'years' ? t.homepage.statistics.years : t.homepage.statistics.awards}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="home-button home-button--light mt-10">Meet the artists <ArrowRight size={17} /></Link>
            </div>
          </FadeInSection>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <FadeInSection className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div>
              <p className="home-kicker mb-5">Your appointment, simplified</p>
              <h2 className="font-serif text-5xl leading-[.94] tracking-[-.04em] text-[#382d27]">The glow-up<br /><em className="font-light text-[#bd876b]">starts here.</em></h2>
              <p className="mt-7 max-w-sm font-sen text-sm leading-7 text-[#756158]">Thoughtful service at every turn—from the first message to the last finishing touch.</p>
              <Link to="/booking" className="home-text-link mt-8 inline-flex">Reserve your date <span>↗</span></Link>
            </div>
            <div className="divide-y divide-[#ddcfc4] border-y border-[#ddcfc4]">
              {[
                ['01', 'Share your vision', 'Tell us about your event, your style, and how you want to feel.'],
                ['02', 'Choose your service', 'Select the experience that fits your day and your look.'],
                ['03', 'Settle into the chair', 'We take care of the artistry, so you can enjoy the moment.'],
              ].map(([number, title, copy], index) => (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, x: 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className="home-process-row group grid grid-cols-[3.5rem_1fr_auto] gap-4 py-7 sm:grid-cols-[5rem_1fr_auto] sm:py-9"
                >
                  <span className="font-serif text-2xl italic text-[#bd876b]">{number}</span>
                  <div><h3 className="font-serif text-2xl text-[#3b302a] sm:text-3xl">{title}</h3><p className="mt-2 max-w-md font-sen text-sm leading-6 text-[#7a665c]">{copy}</p></div>
                  <CheckCircle size={20} className="mt-1 text-[#b98267]" />
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </section>

        <FadeInSection>
          <TestimonialsSection testimonials={MOCK_TESTIMONIALS.map(item => {
            const trans = t.testimonials?.[item.id];
            return trans ? { ...item, ...trans } : item;
          })} title={t.homepage.sections.clientReviews} subtitle={t.homepage.sections.clientReviewsDesc} />
        </FadeInSection>

        <section className="home-final-cta relative overflow-hidden px-5 py-24 text-center sm:px-8 lg:py-32">
          <img src="/images/galley/gallery/1.jpg" alt="Le'Charme bridal couple" loading="lazy" className="home-cta-image absolute inset-0 h-full w-full object-cover object-[center_28%]" />
          <div className="absolute inset-0 bg-[#2e211c]/[.72]" />
          <FadeInSection className="relative mx-auto max-w-3xl">
            <p className="home-kicker home-kicker--light mb-6">For your next beautiful moment</p>
            <h2 className="font-serif text-5xl leading-[.92] tracking-[-.04em] text-white sm:text-6xl lg:text-7xl">Come sit in<br /><em className="font-light text-[#e9b89e]">our chair.</em></h2>
            <p className="mx-auto mt-7 max-w-xl font-sen text-base leading-7 text-[#eaded8]">Bring us the occasion. We’ll bring the glow.</p>
            <Link to="/booking" className="home-button home-button--peach mt-10">Book your appointment <ArrowRight size={17} /></Link>
          </FadeInSection>
        </section>
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
    </div>
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
