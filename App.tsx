import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useReducedMotion } from 'framer-motion';
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
import TestimonialsSection from './components/TestimonialsSection';
import BookingPage from './components/BookingPage';
import PaymentSuccess from './components/PaymentSuccess';
import LoadingIntro from './components/LoadingIntro';
import PaymentCanceled from './components/PaymentCanceled';
import PaymentError from './components/PaymentError';
import { ShoppingBag, Trash2, ArrowRight, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FadeInSection } from './components/FadeInSection';
import { GalleryCarousel } from './components/GalleryCarousel';
import PolicyPage from './components/PolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import PaymentPending from './components/PaymentPending';
import InquiryPage from './components/InquiryPage';
import {
  KineticHeading,
  ScrollReveal,
  ScrollCount,
  TiltSurface,
  Magnetic,
  useElementScrollProgress,
} from './components/ScrollCraftPrimitives';
import { LookbookPeakSection } from './components/LookbookPeakSection';

const BACKEND_HEALTH_URL = 'https://beauty-store-website-project.onrender.com/health';
let hasPrewarmedBackend = false;

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

  // Pre-warm Render Free Tier backend once on initial site load (non-blocking, silent)
  useEffect(() => {
    if (hasPrewarmedBackend) return;
    hasPrewarmedBackend = true;

    const pingBackend = () => {
      fetch(BACKEND_HEALTH_URL, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        priority: 'low',
      } as RequestInit).catch(() => {
        // Silently ignore network/cold-start errors so user experience is never affected
      });
    };

    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(pingBackend);
    } else {
      setTimeout(pingBackend, 0);
    }
  }, []);

  // Initialize Lenis smooth scrolling (skipped on touch or reduced-motion devices)
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
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
    const heroRef = useRef<HTMLElement>(null);
    const atelierRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Interactive Hero Photo Cards state (allows user to cycle, swap, or explore looks)
    const [activeRearCard, setActiveRearCard] = useState(0);
    const [isRearCardExpanded, setIsRearCardExpanded] = useState(false);

    const heroPhotoCards = [
      {
        image: '/images/galley/bridal/bridal-makeup-2hair/1.jpg',
        title: 'Bridal Couture',
        subtitle: 'Tear & humidity proof · 14hr hold',
        badge: 'Look 01 / 03',
        link: '/services/bridal',
      },
      {
        image: '/images/galley/photoshoot/stage/1.jpg',
        title: 'Editorial & Stage',
        subtitle: '4K lens & studio flash calibrated',
        badge: 'Look 02 / 03',
        link: '/services/photoshoot',
      },
      {
        image: '/images/galley/party/deluxe-combo/1.jpg',
        title: 'Evening Soirée',
        subtitle: 'Dimensional wave & luminous skin',
        badge: 'Look 03 / 03',
        link: '/services/party',
      },
    ];

    const currentHeroCard = heroPhotoCards[activeRearCard];

    const cycleHeroCard = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveRearCard((prev) => (prev + 1) % heroPhotoCards.length);
    };

    // Normalized scroll progress (0..1) for dimensional hero & atelier parallax planes
    const heroProgress = useElementScrollProgress(heroRef, 'flow');
    const atelierProgress = useElementScrollProgress(atelierRef, 'flow');

    // Differential plane offsets (hero-depth.md: small rate differences, 10% to 30% separation)
    const farPlaneY = prefersReducedMotion ? 0 : (heroProgress - 0.35) * -55;
    const rearCardY = prefersReducedMotion ? 0 : (heroProgress - 0.35) * -42;
    const videoPlaneY = prefersReducedMotion ? 0 : (heroProgress - 0.35) * -22;
    const videoScale = prefersReducedMotion ? 1 : 1 + heroProgress * 0.045;
    const fgCardY = prefersReducedMotion ? 0 : (heroProgress - 0.35) * 36;
    const atelierImageY = prefersReducedMotion ? 0 : (atelierProgress - 0.5) * -42;

    return (
      <div className="homepage relative">
        {/* Subtle atmospheric grain overlay (taste.md Depth §5) */}
        <div className="sc-grain" aria-hidden="true" />

        {/* ===================================================================
            ACT 1: RECOGNITION — 4-Plane Dimensional Hero (hero-depth.md)
            Mobile-first responsive composition + Interactive Rear Photo Card:
            1. Far Studio Architectural Plane (-0.25x)
            2. Interactive Rear Photo Card Plane (-0.19x, replaces dark shadow behind video; user can tap/click to bring forward or cycle looks)
            3. Focal Bridal Film Subject Plane (-0.10x, clean warm border, NO dark shadow)
            4. Foreground Detail Switcher Card (+0.16x, interactive look switcher on mobile & desktop)
           =================================================================== */}
        <section
          ref={heroRef}
          className="home-hero relative min-h-[calc(100svh-5rem)] bg-[#F4ECE5] overflow-hidden border-b border-[#DCCFC4]"
        >
          {/* Plane 1: Far Architectural Studio Light & Linen Plane */}
          <div
            aria-hidden="true"
            style={{
              transform: `translate3d(0, ${farPlaneY.toFixed(1)}px, 0)`,
            }}
            className="pointer-events-none absolute inset-0 will-change-transform"
          >
<div className="absolute -top-20 -right-16 sm:right-[12%] w-72 h-72 sm:w-[34rem] sm:h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,247,235,0.7)_45%,transparent_75%)] blur-3xl pointer-events-none" />            <div className="hidden lg:block absolute top-0 bottom-0 left-[48%] w-px bg-[#DFD1C5]/70" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 pt-6 pb-12 sm:py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center min-h-[calc(100svh-5rem)]">
            {/* Left Column: Typography & Controls Plane */}
            <div className="lg:col-span-6 lg:pr-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-6">
                <span className="h-px w-6 bg-[#B98267]" aria-hidden="true" />
                <p className="home-kicker">
                  Le’Charme Beauté · Huntington Beach
                </p>
              </div>

              <KineticHeading
                as="h1"
                className="font-serif text-[clamp(2.5rem,9vw,3.6rem)] sm:text-6xl lg:text-[5.4rem] leading-[0.92] tracking-[-0.04em] text-[#342923]"
                lines={[
                  <>
                    Beauty,{' '}
                    <em className="font-serif font-light italic text-[#B98267]">
                      made
                    </em>
                  </>,
                  <>personal.</>,
                ]}
              />

              <motion.p
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="mt-4 sm:mt-7 max-w-[44ch] font-sen text-[15px] sm:text-lg leading-[1.6] text-[#68554B]"
              >
                {t.homepage.hero.subtitle}
              </motion.p>

              {/* Responsive CTA Stack: full-width on compact phones, inline on tablet/desktop */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="mt-6 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-5"
              >
                <Magnetic strength={0.22} className="w-full sm:w-auto">
                  <Link
                    to="/booking"
                    className="home-button home-button--dark w-full sm:w-auto justify-center"
                  >
                    {t.hero.cta} <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Link
                  to="/gallery"
                  className="home-text-link justify-center sm:justify-start py-2 sm:py-0"
                >
                  {t.homepage.hero.cta} <span>↗</span>
                </Link>
              </motion.div>

              {/* Desktop Editorial Metadata Ledger */}
              <div className="hidden sm:grid mt-12 lg:mt-14 pt-6 border-t border-[#DCCFC4] grid-cols-3 gap-4 text-xs font-sen text-[#756158]">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#A46F55]">
                    Studio & On-Location
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#342923]">
                    Orange County
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#A46F55]">
                    Specialization
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#342923]">
                    Bridal · Editorial · Red Carpet
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#A46F55]">
                    Atelier Address
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#342923]">
                    7201 Garden Grove Blvd Unit A
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Layered Stage (Video + Interactive Rear & Foreground Photo Cards) */}
            <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end pt-4 pb-8 sm:py-6">
              <div className="relative w-full max-w-[390px] sm:max-w-[460px] lg:max-w-[490px] pr-5 sm:pr-8 pt-6 sm:pt-8">

                {/* Plane 2B: Interactive Rear Photo Card (Replaces the dark shadow behind the video)
                    Users can click/tap this card to bring it to the front or cycle through looks */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Interactive look card: ${currentHeroCard.title}. Click to bring forward or cycle look.`}
                  onClick={() => setIsRearCardExpanded((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsRearCardExpanded((prev) => !prev);
                    }
                  }}
                  style={{
                    transform: `translate3d(0, ${(rearCardY * 0.65).toFixed(1)}px, 0) rotate(${
                      isRearCardExpanded ? '0deg' : '3.5deg'
                    }) scale(${isRearCardExpanded ? 1.02 : 0.96})`,
                  }}
                  className={`group/rear cursor-pointer select-none absolute -top-1 right-0 sm:-top-2 sm:right-0 w-[82%] sm:w-[84%] aspect-[4/5] bg-[#FFFDFA] p-2 sm:p-3 border border-[#D5C3B5] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${
                    isRearCardExpanded ? 'z-30' : 'z-0 hover:-translate-y-1.5 hover:rotate-[5deg]'
                  }`}
                >
                  <div className="relative w-full h-[84%] overflow-hidden bg-[#EFE6DD]">
                    <img
                      src={currentHeroCard.image}
                      alt={currentHeroCard.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/rear:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-[#FFFDFA]/92 backdrop-blur-sm font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#342923] font-bold">
                        {currentHeroCard.badge}
                      </span>
                      <button
                        type="button"
                        onClick={cycleHeroCard}
                        className="px-2.5 py-1 bg-[#342923] text-[#FFFDFA] hover:bg-[#B98267] font-sen text-[9px] sm:text-[10px] uppercase tracking-[0.14em] font-bold transition-colors active:scale-95"
                      >
                        Next Look ↻
                      </button>
                    </div>
                  </div>

                  <div className="h-[16%] pt-2 px-1 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-serif text-sm sm:text-base font-bold text-[#342923] truncate">
                        {currentHeroCard.title}
                      </p>
                      <p className="font-sen text-[10px] sm:text-xs text-[#756158] truncate">
                        {currentHeroCard.subtitle}
                      </p>
                    </div>
                    <Link
                      to={currentHeroCard.link}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 px-2.5 py-1.5 border border-[#342923] text-[#342923] hover:bg-[#342923] hover:!text-white font-sen text-[9px] sm:text-[10px] uppercase tracking-[0.14em] font-bold transition-colors"
                    >
                      Explore ↗
                    </Link>
                  </div>
                </div>

                {/* Plane 3: Focal Bridal Video Plate (NO dark shadow; clean warm paper frame) */}
                <div
                  onClick={() => isRearCardExpanded && setIsRearCardExpanded(false)}
                  style={{
                    transform: `translate3d(0, ${(videoPlaneY * 0.65).toFixed(1)}px, 0)`,
                  }}
                  className={`relative z-10 w-[92%] sm:w-[90%] aspect-[4/5] max-h-[52svh] sm:max-h-none overflow-hidden border-2 border-[#FFFDFA] outline outline-1 outline-[#DFD1C5] bg-[#F4ECE5] transition-opacity duration-300 will-change-transform ${
                    isRearCardExpanded ? 'opacity-40 cursor-pointer' : 'opacity-100'
                  }`}
                >
                  <video
                    src="/images/logo/1.MP4"
                    poster="/images/galley/bridal/bridal-makeup-2hair/1.jpg"
                    style={{
                      transform: `scale(${videoScale.toFixed(3)})`,
                    }}
                    className="h-full w-full object-cover object-center will-change-transform"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  {/* Subtle light-toned bottom caption pill instead of a dark shadow overlay */}
                  <div className="absolute bottom-3 left-3 right-28 sm:bottom-4 sm:left-4 sm:right-36 bg-[#FFFDFA]/90 backdrop-blur-md border border-[#DFD1C5] px-3 py-2 text-[#342923]">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#A46F55] block">
                      Bridal Couture Film
                    </span>
                    <span className="font-serif italic text-sm sm:text-base leading-tight block">
                      Luminous skin, camera-ready
                    </span>
                  </div>
                </div>

                {/* Plane 4: Interactive Foreground Photo Card Switcher (+0.16x travel)
                    Tapping/clicking cycles the rear photo card or brings it forward */}
                <div
                  style={{
                    transform: `translate3d(0, ${(fgCardY * 0.65).toFixed(1)}px, 0)`,
                  }}
                  className="absolute -bottom-5 right-1 sm:-bottom-6 sm:right-2 w-36 sm:w-48 bg-[#FFFDFA] p-2 sm:p-2.5 border border-[#D5C3B5] z-30 will-change-transform"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRearCard((prev) => (prev + 1) % heroPhotoCards.length);
                      setIsRearCardExpanded(true);
                    }}
                    className="w-full text-left group/fg focus:outline-none"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE6DD]">
                      <img
                        src={currentHeroCard.image}
                        alt={currentHeroCard.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/fg:scale-105"
                      />
                      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-[#FFFDFA]/90 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-[#342923] font-bold">
                        Tap to Swap ↻
                      </span>
                    </div>
                    <div className="pt-2 pb-0.5 px-0.5 flex items-center justify-between text-[9px] sm:text-[10px] font-sen uppercase tracking-[0.12em] text-[#342923]">
                      <span className="font-bold truncate">{currentHeroCard.title}</span>
                      <span className="text-[#B98267] font-bold flex-shrink-0">
                        {activeRearCard + 1}/3
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Interactive Hint Pill (Mobile & Desktop) */}
              <div className="mt-8 sm:mt-9 w-full max-w-[390px] sm:max-w-[460px] lg:max-w-[490px] flex items-center justify-between gap-2 px-1 text-[11px] font-sen text-[#68554B]">
                <button
                  type="button"
                  onClick={() => setIsRearCardExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.14em] text-[#342923] hover:text-[#B98267] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#B98267] inline-block" />
                  <span>
                    {isRearCardExpanded ? 'Show Bridal Video' : 'Peek Photo Card Behind'}
                  </span>
                </button>
                <div className="flex items-center gap-1.5">
                  {heroPhotoCards.map((card, idx) => (
                    <button
                      key={card.title}
                      type="button"
                      onClick={() => {
                        setActiveRearCard(idx);
                        setIsRearCardExpanded(true);
                      }}
                      aria-label={`Select ${card.title}`}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        activeRearCard === idx
                          ? 'w-6 bg-[#B98267]'
                          : 'w-2 bg-[#D5C3B5] hover:bg-[#B98267]/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Compact Mobile Editorial Metadata Strip */}
              <div className="sm:hidden w-full max-w-[390px] mt-5 pt-4 border-t border-[#DCCFC4] grid grid-cols-2 gap-3 text-[11px] font-sen text-[#756158]">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#A46F55]">
                    Studio & On-Location
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#342923]">
                    Orange County, CA
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#A46F55]">
                    Atelier Suite
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#342923]">
                    7201 Garden Grove Blvd Unit A
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT 2: RANGE — Asymmetric 7/5 Editorial Services Spread
            (Replaces the 3-equal-column template card grid per taste.md)
           =================================================================== */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-32">
          <FadeInSection className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl sm:text-6xl leading-[0.94] tracking-[-0.04em] text-[#342923] sc-balance">
                {t.homepage.items.title1}
                <br />
                <em className="font-light italic text-[#B98267]">
                  {t.homepage.items.title2}
                </em>
              </h2>
            </div>
            <p className="max-w-[44ch] font-sen text-sm sm:text-base leading-relaxed text-[#6E5B50]">
              {t.homepage.items.subtitle}
            </p>
          </FadeInSection>

          {/* Asymmetric 12-column editorial spread: 7 cols dominant Bridal + 5 cols stacked Event & Editorial */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Dominant Left Spread: Bridal (7 columns) */}
            <div className="lg:col-span-7">
              <TiltSurface maxDegrees={4}>
                <Link to="/services/bridal" className="home-service-card group">
                  <ScrollReveal
                    direction="up"
                    className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden border border-[#DFD1C5] bg-[#EFE6DD]"
                  >
                    <img
                      src="/images/galley/bridal/bridal-makeup-2hair/1.jpg"
                      alt={t.homepage.items.item2Title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#211813]/65 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute left-5 top-5 px-3 py-1 bg-[#211813]/65 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7EFE8]">
                      Signature Bridal Couture
                    </span>
                  </ScrollReveal>
                  <div className="flex items-end justify-between gap-4 pt-6 pb-2">
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#342923]">
                        {t.homepage.items.item2Title}
                      </h3>
                      <p className="mt-2 max-w-lg font-sen text-sm sm:text-base leading-relaxed text-[#756158]">
                        {t.homepage.items.item2SubTitle}
                      </p>
                    </div>
                    <span className="home-round-arrow">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </Link>
              </TiltSurface>
            </div>

            {/* Right Staggered Column: Party/Event & Photoshoot/Stage (5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-12 lg:mt-14">
              {[
                {
                  title: t.homepage.items.item1Title,
                  detail: t.homepage.items.item1SubTitle,
                  image: '/images/galley/party/premium-makeup-only/1.jpg',
                  link: '/services/party',
                  tag: 'Evening & Red Carpet',
                },
                {
                  title: t.homepage.items.item3Title,
                  detail: t.homepage.items.item3SubTitle,
                  image: '/images/galley/photoshoot/stage/1.jpg',
                  link: '/services/photoshoot',
                  tag: 'Editorial & Studio Lens',
                },
              ].map((service, idx) => (
                <TiltSurface key={service.title} maxDegrees={4.5}>
                  <Link to={service.link} className="home-service-card group">
                    <ScrollReveal
                      direction="up"
                      delay={idx * 0.12}
                      className="relative aspect-[4/3] overflow-hidden border border-[#DFD1C5] bg-[#EFE6DD]"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-4 top-4 px-2.5 py-1 bg-[#211813]/65 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.18em] text-[#F7EFE8]">
                        {service.tag}
                      </span>
                    </ScrollReveal>
                    <div className="flex items-end justify-between gap-4 pt-5">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#342923]">
                          {service.title}
                        </h3>
                        <p className="mt-1.5 font-sen text-sm leading-relaxed text-[#756158]">
                          {service.detail}
                        </p>
                      </div>
                      <span className="home-round-arrow">
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </Link>
                </TiltSurface>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT 3: SUBSTANCE — Hard-Cut Espresso Chapter (Quiet Before Peak)
            Uses `count` device on real studio figures + parallax portrait
           =================================================================== */}
        <section
          ref={atelierRef}
          className="sc-dark-chapter px-5 py-20 sm:px-8 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <ScrollReveal
              direction="up"
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-full w-full border border-[#D4A68D]/60 sm:-left-5 sm:-top-5"
              />
              <div className="relative h-[430px] sm:h-[560px] w-full overflow-hidden bg-[#1D1612]">
                <img
                  src="/images/galley/photoshoot/stage/1.jpg"
                  alt="Editorial makeup artistry at Le'Charme"
                  loading="lazy"
                  style={{
                    transform: `translate3d(0, ${atelierImageY.toFixed(1)}px, 0) scale(1.08)`,
                  }}
                  className="h-full w-full object-cover will-change-transform"
                />
              </div>
            </ScrollReveal>

            <FadeInSection>
              <p className="home-kicker home-kicker--light mb-5">
                A beauty studio with heart
              </p>
              <h2 className="font-serif text-4xl sm:text-6xl leading-[0.94] tracking-[-0.035em] text-[#F7EEE8] sc-balance">
                {t.homepage.artist.title1}{' '}
                <em className="font-light italic text-[#DBA78D]">
                  {t.homepage.artist.title2}.
                </em>
              </h2>
              <p className="mt-7 max-w-[54ch] font-sen text-base text-[#DECFC7]">
                {t.homepage.artist.subTitle}
              </p>

              {/* `count` Device — Real verified studio numbers ticking up once on entry */}
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#6E564C] pt-8 sm:grid-cols-4">
                {MOCK_STATISTICS.map((stat) => (
                  <div key={stat.id}>
                    <div className="font-serif text-3xl sm:text-4xl text-[#E7B59C]">
                      <ScrollCount value={stat.value} durationMs={1500} />
                    </div>
                    <div className="mt-2 font-sen text-[10px] font-bold uppercase leading-4 tracking-[0.16em] text-[#CDBBB1]">
                      {stat.id === 'clients'
                        ? t.homepage.statistics.clients
                        : stat.id === 'rating'
                        ? t.homepage.statistics.rating
                        : stat.id === 'years'
                        ? t.homepage.statistics.years
                        : t.homepage.statistics.awards}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/about" className="home-button home-button--light">
                  {t.homepage.artist.cta} <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ===================================================================
            ACT 4: THE PEAK — Pinned Horizontal Lookbook Rail + Studio Light Loupe
            (Largest scroll span on the page + bespoke Kelvin light grader)
           =================================================================== */}
        <LookbookPeakSection />

        {/* ===================================================================
            ACT 5: CONFIDENCE — The Appointment Ritual & Client Voices
            (Em-dash removed, section counters replaced with editorial cadence)
           =================================================================== */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <FadeInSection className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 items-start">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl leading-[0.94] tracking-[-0.04em] text-[#342923] sc-balance">
                The glow-up
                <br />
                <em className="font-light italic text-[#B98267]">
                  starts here.
                </em>
              </h2>
              <p className="mt-6 max-w-[40ch] font-sen text-sm sm:text-base leading-relaxed text-[#6E5B50]">
                Thoughtful service at every turn: from the first consultation to the final finishing touch before you step into the light.
              </p>
              <Link to="/booking" className="home-text-link mt-8 inline-flex">
                Reserve your date <span>↗</span>
              </Link>
            </div>

            <div className="divide-y divide-[#DDCFC4] border-y border-[#DDCFC4]">
              {[
                [
                  'Consultation',
                  'Share your vision',
                  'Tell us about your event, your lighting environment, and how you want to feel.',
                ],
                [
                  'Curation',
                  'Choose your service',
                  'Select the bridal, editorial, or event package tailored to your schedule.',
                ],
                [
                  'Artistry',
                  'Settle into the chair',
                  'We take care of the skin prep, sculpting, and hair styling so you can enjoy the moment.',
                ],
              ].map(([stageLabel, title, copy], index) => (
                <motion.div
                  key={title}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="home-process-row group grid grid-cols-[5.5rem_1fr_auto] gap-4 py-7 sm:grid-cols-[7rem_1fr_auto] sm:py-9 px-2"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A46F55] pt-2">
                    {stageLabel}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-[#342923] sm:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-md font-sen text-sm leading-relaxed text-[#756158]">
                      {copy}
                    </p>
                  </div>
                  <CheckCircle size={19} className="mt-1.5 text-[#B98267]" />
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </section>

        <FadeInSection>
          <TestimonialsSection
            testimonials={MOCK_TESTIMONIALS.map((item) => {
              const trans = t.testimonials?.[item.id];
              return trans ? { ...item, ...trans } : item;
            })}
            title={t.homepage.sections.clientReviews}
            subtitle={t.homepage.sections.clientReviewsDesc}
          />
        </FadeInSection>

        {/* ===================================================================
            ACT 6: COMMITMENT — The Resolved Close
            (Replaces full-frame dark overlay with architectural split colophon
             so the bridal photograph retains full luminosity per taste.md)
           =================================================================== */}
        <section className="bg-[#241B16] text-[#F7EEE8] overflow-hidden border-t border-[#42322A]">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-12 items-stretch">
            {/* Left Architectural Image Plate — Full contrast, directional edge scrim only */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] overflow-hidden">
              <img
                src="/images/galley/gallery/1.jpg"
                alt="Le'Charme bridal couple portrait"
                loading="lazy"
                className="h-full w-full object-cover object-[center_28%]"
              />
              {/* Directional edge scrim only where columns meet */}
              <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#241B16] to-transparent pointer-events-none" />
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#241B16] to-transparent pointer-events-none" />
            </div>

            {/* Right Colophon Resolution Plate */}
            <div className="lg:col-span-5 px-6 py-16 sm:px-12 lg:py-24 flex flex-col justify-center">
              <p className="home-kicker home-kicker--light mb-5">
                For your next beautiful moment
              </p>
              <h2 className="font-serif text-4xl sm:text-6xl leading-[0.92] tracking-[-0.04em] text-white sc-balance">
                Come sit in
                <br />
                <em className="font-light italic text-[#E9B89E]">our chair.</em>
              </h2>
              <p className="mt-6 max-w-md font-sen text-base leading-relaxed text-[#DECFC7]">
                Bring us the occasion. We will bring the calm preparation, the skin finish, and the lasting glow.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.25}>
                  <Link to="/booking" className="home-button home-button--peach">
                    {t.hero.cta} <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Link
                  to="/inquiry"
                  className="font-sen text-xs uppercase tracking-[0.16em] text-[#E9B89E] hover:text-white underline underline-offset-4 px-2 py-2"
                >
                  Bridal Inquiry ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="bg-[#FFFDFA] text-[#342923]">
      {/* About Editorial Hero with Directional Corner Scrim */}
      <div className="relative h-[48vh] min-h-[360px] w-full overflow-hidden border-b border-[#DFD1C5]">
        <img
          src="/images/logo/cover.jpg"
          alt="Le'Charme Atelier"
          className="w-full h-full object-cover object-center"
        />
        {/* Corner Scrim only where text sits (taste.md Text over media) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1F1713]/85 via-[#1F1713]/35 to-transparent pointer-events-none" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 pb-12 flex flex-col justify-end text-[#F7EFE8]">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E6B89C] mb-3">
            Huntington Beach · Atelier Story
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl leading-[0.94] tracking-[-0.035em] max-w-2xl">
            {t.aboutPage.title}
          </h1>
          <p className="mt-3 font-sen text-sm sm:text-base text-[#E5D7CE] max-w-xl">
            {t.aboutPage.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
        {/* Our Story Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <FadeInSection className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl leading-[0.96] tracking-[-0.035em] text-[#342923]">
              {t.aboutPage.storyTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#B98267]" />
            <p className="font-sen text-[#5E4D44] leading-[1.7] text-base sm:text-lg max-w-[60ch]">
              {t.aboutPage.storyText}
            </p>
            <p className="font-sen text-[#5E4D44] leading-[1.7] text-base sm:text-lg max-w-[60ch]">
              {t.aboutPage.text}
            </p>
          </FadeInSection>

          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="up" className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#B98267]/60 z-0" />
              <img
                src="/images/logo/logo.jpg"
                alt="Our Story"
                className="relative z-10 shadow-xl w-full border border-[#DFD1C5]"
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Philosophy Editorial Pull-Quote Spread */}
        <FadeInSection className="bg-[#F6EFE8] p-10 sm:p-16 lg:p-20 border-y border-[#DCCFC4] mb-24 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#A46F55] block mb-4">
            {t.aboutPage.philosophyTitle}
          </span>
          <blockquote className="font-serif max-w-3xl mx-auto text-[#342923] text-2xl sm:text-4xl leading-[1.25] italic sc-balance">
            “{t.aboutPage.philosophyText}”
          </blockquote>
        </FadeInSection>

        {/* Team Editorial Portrait Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#DFD1C5]">
            <h2 className="font-serif text-4xl sm:text-5xl tracking-[-0.035em] text-[#342923]">
              {t.aboutPage.teamTitle}
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#856F63] mt-2 sm:mt-0">
              Master Artists & Stylists
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_TEAM_MEMBERS.map((member, index) => {
              const translatedMember = t.aboutPage.teamMembers?.[index];
              return (
                <FadeInSection
                  key={member.id}
                  delay={(index % 3) * 0.08}
                  className="group flex flex-col"
                >
                  <ScrollReveal
                    direction="up"
                    className="relative mb-5 aspect-[3/4] w-full overflow-hidden border border-[#DFD1C5] bg-[#EFE6DD]"
                  >
                    <img
                      src={member.image}
                      alt={translatedMember?.name || member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    />
                  </ScrollReveal>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A46F55] font-bold mb-1">
                    {translatedMember?.role || member.role}
                  </span>
                  <h3 className="font-serif text-2xl text-[#342923] font-semibold">
                    {translatedMember?.name || member.name}
                  </h3>
                  {translatedMember?.bio && (
                    <p className="mt-2 font-sen text-[#6E5B50] text-sm leading-relaxed">
                      {translatedMember.bio}
                    </p>
                  )}
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesPage = ({ category }: { category?: string }) => {
    const filteredServices = category
      ? services.filter(s => s.category.toLowerCase() === category.toLowerCase())
      : services;

    const headingTitle =
      category === 'PartyEvent'
        ? 'Party & Event Artistry'
        : category === 'Photoshoot'
        ? 'Photoshoot & Stage'
        : category === 'Bridal'
        ? 'Bridal & Wedding Party'
        : category === 'Education'
        ? 'Private Makeup Academy'
        : t.nav.services;

    return (
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
        <div className="border-b border-[#DFD1C5] pb-10 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A46F55] block mb-3">
              Curated Service Menu
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl leading-[0.94] tracking-[-0.04em] text-[#342923]">
              {headingTitle}
            </h1>
          </div>

          {/* Category Navigation Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { path: '/services/party', cat: 'PartyEvent', label: 'Party Makeup' },
              { path: '/services/photoshoot', cat: 'Photoshoot', label: 'Photoshoot / Stage' },
              { path: '/services/bridal', cat: 'Bridal', label: 'Bridal Packages' },
              { path: '/services/education', cat: 'Education', label: 'Classes' },
            ].map((tab) => {
              const active = category === tab.cat;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`font-sen px-5 py-2.5 uppercase text-[11px] tracking-[0.16em] font-bold border transition-all duration-150 active:scale-95 ${
                    active
                      ? 'bg-[#342923] text-white border-[#342923]'
                      : 'bg-[#FFFDFA] text-[#5E4D44] border-[#D8C9BC] hover:border-[#B98267] hover:text-[#342923]'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#A46F55] block mb-3">
          Client Lookbook & Light Archive
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl uppercase tracking-[-0.035em] text-[#342923] mb-3">
          {t.nav.gallery}
        </h1>
        <p className="font-sen text-[#6E5B50] tracking-widest text-xs uppercase">
          Real Clients · Real Moments · Calibrated Across Every Venue Light
        </p>
      </div>

      <GalleryCarousel images={GALLERIES} />
    </div>
  );

  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    if (cart.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag size={56} className="text-[#C7B6A8] mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#342923] mb-3">{t.cart.empty}</h2>
          <p className="font-sen text-[#756158] mb-8 max-w-md">{t.cart.browseHint}</p>
          <Link
            to="/services/party"
            className="home-button home-button--dark"
          >
            {t.cart.continue} <ArrowRight size={16} />
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#342923] mb-12 border-b border-[#DFD1C5] pb-6">
          {t.cart.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-[#FFFDFA] p-4 border border-[#DFD1C5] sc-surface-card"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover border border-[#E6DCD2]"
                  />
                  <div>
                    <span className="font-mono text-[10px] text-[#A46F55] uppercase tracking-[0.18em] block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#342923]">
                      {item.name}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-serif text-xl font-bold text-[#342923] sc-nums tabular-nums">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-[#8C7A70] hover:text-red-600 transition-colors p-2"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F6EFE8] p-8 border border-[#DCCFC4] sticky top-24">
              <h3 className="font-serif text-2xl text-[#342923] mb-6">{t.cart.subtotal}</h3>
              <div className="space-y-4 border-b border-[#DCCFC4] pb-6 mb-6 font-sen text-sm">
                <div className="flex justify-between text-[#6E5B50] sc-nums tabular-nums">
                  <span>{cart.length} items</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              <div className="flex justify-between font-serif font-bold text-2xl text-[#342923] mb-8 sc-nums tabular-nums">
                <span>{t.cart.total}</span>
                <span>${totalAmount}</span>
              </div>
              <Link
                to="/booking"
                className="w-full home-button home-button--dark justify-center"
              >
                <span>{t.cart.proceed}</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services/party"
                className="block text-center mt-4 font-sen text-[#6E5B50] text-xs uppercase tracking-widest hover:text-[#B98267] underline"
              >
                {t.cart.continue}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A46F55] block mb-2">
              Huntington Beach Atelier
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl uppercase font-bold text-[#342923] tracking-tight">
              {t.nav.contact}
            </h1>
          </div>
          <p className="font-sen text-[#6E5B50] leading-relaxed">
            {t.contactPage.text}
          </p>
          {/* Replace emoji icons with clean Lucide vector icons per taste.md Refuse List */}
          <div className="space-y-6 pt-4 border-t border-[#DFD1C5]">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#F4ECE5] border border-[#DCCFC4] flex items-center justify-center text-[#B98267] flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-sen text-xs uppercase tracking-[0.16em] font-bold text-[#342923]">
                  {t.contactPage.location}
                </h4>
                <p className="font-sen text-[#6E5B50] text-sm mt-1">
                  {t.contactPage.locationText}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#F4ECE5] border border-[#DCCFC4] flex items-center justify-center text-[#B98267] flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="font-sen text-xs uppercase tracking-[0.16em] font-bold text-[#342923]">
                  {t.contactPage.dm}
                </h4>
                <p className="font-sen text-[#6E5B50] text-sm mt-1">
                  {t.contactPage.dmText}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#F4ECE5] border border-[#DCCFC4] flex items-center justify-center text-[#B98267] flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-sen text-xs uppercase tracking-[0.16em] font-bold text-[#342923]">
                  Direct Studio Line
                </h4>
                <p className="font-sen text-[#6E5B50] text-sm mt-1 sc-nums tabular-nums">
                  {MOCK_COMPANY_INFO.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#F4ECE5] border border-[#DCCFC4] flex items-center justify-center text-[#B98267] flex-shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="font-sen text-xs uppercase tracking-[0.16em] font-bold text-[#342923]">
                  Atelier Hours
                </h4>
                <p className="font-sen text-[#6E5B50] text-sm mt-1">
                  {MOCK_COMPANY_INFO.hours.weekday}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 h-[420px] lg:h-[520px] bg-[#EFE6DD] border border-[#DFD1C5] overflow-hidden relative shadow-lg">
          <iframe
            title="Le'Charme Beauté Boutique Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.1218269395968!2d-118.00762598861907!3d33.77405507315169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd28b996b9443b%3A0xa54d23a5e169d537!2s7201%20Garden%20Grove%20Blvd%20a%2C%20Garden%20Grove%2C%20CA%2092841!5e1!3m2!1sen!2sus!4v1794351966306!5m2!1sen!2sus"
            className="w-full h-full"
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
