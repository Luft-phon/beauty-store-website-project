import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Sun, Sunset, Flame, Sparkles } from 'lucide-react';
import {
  STUDIO_LIGHT_PRESETS,
  StudioLightPreset,
} from './ScrollCraftPrimitives';

interface LookbookItem {
  id: string;
  image: string;
  title: string;
  category: string;
  finish: string;
  wearTime: string;
  link: string;
}

const CURATED_LOOKBOOK: LookbookItem[] = [
  {
    id: 'look-01',
    image: '/images/galley/bridal/bridal-makeup-2hair/1.jpg',
    title: 'Luminous Silk Bridal',
    category: 'Bridal Editorial',
    finish: 'Soft-focus satin skin, sculpted brow, rosewood lip',
    wearTime: '14-hr tear & humidity lock',
    link: '/services/bridal',
  },
  {
    id: 'look-02',
    image: '/images/galley/photoshoot/stage/1.jpg',
    title: 'Atelier Editorial Glow',
    category: 'Photoshoot & Stage',
    finish: 'High-definition micro-contour, flash-calibrated highlight',
    wearTime: 'Studio & 4K lens proof',
    link: '/services/photoshoot',
  },
  {
    id: 'look-03',
    image: '/images/galley/bridal/bridal-makeup-hair/11.jpg',
    title: 'Velvet Hour Soirée',
    category: 'Evening & Red Carpet',
    finish: 'Smoked espresso liner, glass-skin cheek, dimensional wave',
    wearTime: 'All-night reception hold',
    link: '/services/party',
  },
  {
    id: 'look-04',
    image: '/images/galley/bridal/bridal-all-day/1.jpg',
    title: 'Modern Heirloom Bride',
    category: 'All-Day Bridal Couture',
    finish: 'Weightless airbrush veil, romantic chignon transformation',
    wearTime: 'Ceremony to last dance',
    link: '/services/bridal',
  },
  {
    id: 'look-05',
    image: '/images/galley/bridal/bridal-makeup-hair/12.jpg',
    title: 'Coastal Golden Grace',
    category: 'Destination Bridal',
    finish: 'Sun-kissed champagne lid, natural flutter lash',
    wearTime: 'Ocean breeze resistant',
    link: '/services/bridal',
  }
];

const NAVBAR_HEIGHT = 80; // Matches fixed h-20 (5rem) navbar in Layout.tsx

export const LookbookPeakSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [lightPreset, setLightPreset] = useState<StudioLightPreset>('daylight');
  const [overflowPx, setOverflowPx] = useState(0);
  const [sectionHeightPx, setSectionHeightPx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktopPin, setIsDesktopPin] = useState(true);

  const currentLight = STUDIO_LIGHT_PRESETS[lightPreset];

  // Measure exact horizontal overflow and compute matching vertical scroll track height
  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobileOrReduced = vw < 900 || Boolean(prefersReducedMotion);
      setIsDesktopPin(!mobileOrReduced);

      const over = Math.max(rail.scrollWidth - vw + 48, 0);
      setOverflowPx(over);

      if (!mobileOrReduced) {
        // Exact 1:1 scroll distance: stage height + horizontal overflow travel
        const stageHeight = Math.max(vh - NAVBAR_HEIGHT, 600);
        setSectionHeightPx(stageHeight + over);
      } else {
        setSectionHeightPx(null);
      }
    };

    measure();
    // Re-measure after images/fonts settle so scrollWidth is 100% accurate
    const timer = setTimeout(measure, 250);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [prefersReducedMotion]);

  // Drive lateral pan from vertical scroll while sticky stage stays locked below navbar
  useEffect(() => {
    if (!isDesktopPin) return;

    let rafId = 0;
    const updateScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const stageHeight = Math.max(window.innerHeight - NAVBAR_HEIGHT, 1);
      const travel = Math.max(rect.height - stageHeight, 1);
      // Pin starts when section top reaches NAVBAR_HEIGHT (80px)
      const scrolledIntoPin = NAVBAR_HEIGHT - rect.top;
      const raw = Math.min(Math.max(scrolledIntoPin / travel, 0), 1);
      setProgress(raw);
      sec.style.setProperty('--sc-p', raw.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateScroll();
          rafId = 0;
        });
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktopPin, sectionHeightPx]);

  const presetButtons: { id: StudioLightPreset; icon: React.ReactNode }[] = [
    { id: 'daylight', icon: <Sun size={14} /> },
    { id: 'golden', icon: <Sunset size={14} /> },
    { id: 'candlelight', icon: <Flame size={14} /> },
  ];

  const translateX = isDesktopPin ? -(overflowPx * progress) : 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Curated Lookbook & Studio Light Loupe"
      style={{
        height:
          isDesktopPin && sectionHeightPx ? `${sectionHeightPx}px` : 'auto',
        backgroundColor: currentLight.stageBg,
        color: currentLight.stageInk,
      }}
      className="relative transition-colors duration-500"
    >
      <div
        className={
          isDesktopPin
            ? 'sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-between py-6 lg:py-10'
            : 'py-16 px-5 sm:px-8 overflow-hidden'
        }
      >
        {/* Top Exhibition Bar + Signature Move: Studio Light Loupe */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 z-20 flex-shrink-0">
          <div>
            <div
              className="flex items-center gap-3 font-sen text-[11px] uppercase tracking-[0.2em] mb-1.5"
              style={{ color: currentLight.accentColor }}
            >
              <Sparkles size={13} />
              <span>Interactive Lookbook · Studio Light Test</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[0.94] tracking-[-0.035em]">
              Artistry tested in{' '}
              <em
                className="font-light italic"
                style={{ color: currentLight.accentColor }}
              >
                every light.
              </em>
            </h2>
          </div>

          {/* Bespoke Signature Move: Kelvin Light Temperature Switcher */}
          <div className="flex flex-col sm:items-end gap-1.5">
            <div
              role="group"
              aria-label="Lighting temperature grader"
              className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-full border backdrop-blur-md"
              style={{
                backgroundColor: currentLight.stageSurface,
                borderColor:
                  lightPreset === 'candlelight'
                    ? 'rgba(226, 172, 145, 0.25)'
                    : 'rgba(52, 41, 35, 0.12)',
              }}
            >
              {presetButtons.map(({ id, icon }) => {
                const cfg = STUDIO_LIGHT_PRESETS[id];
                const active = lightPreset === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setLightPreset(id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-sen text-xs transition-all duration-200 active:scale-95 ${
                      active ? 'font-bold shadow-sm' : 'opacity-75 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: active ? currentLight.accentColor : 'transparent',
                      color: active ? '#FFFDFA' : currentLight.stageInk,
                    }}
                  >
                    {icon}
                    <span>{cfg.label}</span>
                    <span className="hidden sm:inline text-[10px] opacity-80 font-mono">
                      {cfg.kelvin}
                    </span>
                  </button>
                );
              })}
            </div>
            <p
              className="font-sen text-[11px] tracking-wide"
              style={{ color: currentLight.stageSubtle }}
            >
              {currentLight.venueNote}
            </p>
          </div>
        </div>

        {/* Horizontal Exhibition Rail */}
        <div
          className={
            isDesktopPin
              ? 'relative flex items-center flex-1 min-h-0 overflow-visible my-2'
              : 'mt-10 overflow-x-auto pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 snap-x snap-mandatory no-scrollbar'
          }
        >
          <div
            ref={railRef}
            style={{
              transform: isDesktopPin
                ? `translate3d(${translateX.toFixed(1)}px, 0, 0)`
                : undefined,
            }}
            className="flex items-stretch gap-6 sm:gap-7 lg:gap-8 pl-5 sm:pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2))] pr-12 will-change-transform"
          >
            {/* Opening Editorial Statement Card on the Rail */}
            <div
              className="flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[310px] flex flex-col justify-between p-6 sm:p-7 border snap-start"
              style={{
                backgroundColor: currentLight.stageSurface,
                borderColor:
                  lightPreset === 'candlelight'
                    ? 'rgba(226, 172, 145, 0.2)'
                    : 'rgba(52, 41, 35, 0.12)',
              }}
            >
              <div>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] block mb-3"
                  style={{ color: currentLight.accentColor }}
                >
                  Light Calibration · {currentLight.kelvin}
                </span>
                <h3 className="font-serif text-2xl sm:text-[1.7rem] leading-tight mb-3">
                  Why lighting dictates skin preparation.
                </h3>
                <p
                  className="font-sen text-xs sm:text-sm leading-relaxed"
                  style={{ color: currentLight.stageSubtle }}
                >
                  Bridal and editorial makeup fails when it is only mixed for studio vanity bulbs. We formulate your undertone, micro-powder placement, and highlight reflectivity for the exact rooms you will inhabit.
                </p>
              </div>
              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-[11px] font-sen uppercase tracking-widest">
                <span>5 Curated Plates</span>
                <span style={{ color: currentLight.accentColor }}>Scroll →</span>
              </div>
            </div>

            {/* Lookbook Cards — Sized to fit comfortably inside the sticky viewport on laptops */}
            {CURATED_LOOKBOOK.map((item, idx) => {
              // Progressive reveal & subtle scale as each card enters the horizontal stage
              const cardWindowStart = Math.max(0, (idx - 1) * 0.16);
              const itemArrival = isDesktopPin
                ? idx <= 1
                  ? 1
                  : Math.min(Math.max(0.55 + (progress - cardWindowStart) * 1.8, 0.55), 1)
                : 1;

              return (
                <article
                  key={item.id}
                  style={{ opacity: itemArrival }}
                  className="group relative flex-shrink-0 w-[270px] sm:w-[310px] lg:w-[330px] snap-center flex flex-col transition-opacity duration-150"
                >
                  <Link
                    to={item.link}
                    className="block relative h-[46vh] min-h-[290px] max-h-[410px] w-full overflow-hidden border"
                    style={{
                      borderColor:
                        lightPreset === 'candlelight'
                          ? 'rgba(226, 172, 145, 0.24)'
                          : 'rgba(52, 41, 35, 0.12)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ filter: currentLight.filter }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Ambient Kelvin Lighting Veil */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-colors duration-500"
                      style={{ backgroundColor: currentLight.overlayTint }}
                    />
                    {/* Subtle directional corner scrim for museum label */}
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#1e1511]/80 via-[#1e1511]/30 to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-white/90">
                      <span className="px-2 py-0.5 bg-[#1e1511]/60 backdrop-blur-sm">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 bg-[#1e1511]/60 backdrop-blur-sm">
                        {currentLight.kelvin}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <h3 className="font-serif text-2xl leading-none tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-sen text-[11px] text-white/85 line-clamp-1">
                        {item.finish}
                      </p>
                    </div>
                  </Link>

                  {/* Museum Label Footer */}
                  <div
                    className="mt-2.5 flex items-center justify-between text-[11px] font-sen pt-2 border-t"
                    style={{
                      borderColor:
                        lightPreset === 'candlelight'
                          ? 'rgba(226, 172, 145, 0.16)'
                          : 'rgba(52, 41, 35, 0.12)',
                      color: currentLight.stageSubtle,
                    }}
                  >
                    <span>{item.wearTime}</span>
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1 font-bold uppercase tracking-widest hover:underline"
                      style={{ color: currentLight.stageInk }}
                    >
                      Explore <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              );
            })}

            {/* Closing Rail Resolution Plate */}
            <div
              className="flex-shrink-0 w-[270px] sm:w-[310px] flex flex-col justify-between p-6 sm:p-7 border snap-end"
              style={{
                backgroundColor: currentLight.stageSurface,
                borderColor:
                  lightPreset === 'candlelight'
                    ? 'rgba(226, 172, 145, 0.25)'
                    : 'rgba(52, 41, 35, 0.15)',
              }}
            >
              <div>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-2.5"
                  style={{ color: currentLight.accentColor }}
                >
                  Full Archive · 55 Plates
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight mb-3">
                  Every face is a bespoke study.
                </h3>
                <p
                  className="font-sen text-xs sm:text-sm leading-relaxed"
                  style={{ color: currentLight.stageSubtle }}
                >
                  Browse our complete client archive of Huntington Beach brides, red-carpet guests, and editorial campaigns.
                </p>
              </div>
              <div className="space-y-2.5 pt-4">
                <Link
                  to="/gallery"
                  className="w-full py-3 px-4 flex items-center justify-between text-[11px] font-sen font-bold uppercase tracking-[0.16em] text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ backgroundColor: '#342923' }}
                >
                  <span>Open Full Gallery</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/booking"
                  className="w-full py-2.5 px-4 flex items-center justify-between text-[11px] font-sen font-bold uppercase tracking-[0.16em] border transition-colors"
                  style={{
                    borderColor: currentLight.accentColor,
                    color: currentLight.stageInk,
                  }}
                >
                  <span>Reserve Your Date</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress & Chapter Bar */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6 z-20 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: currentLight.stageSubtle }}
            >
              Lookbook
            </span>
            <div
              className="h-[2px] flex-1 overflow-hidden"
              style={{
                backgroundColor:
                  lightPreset === 'candlelight'
                    ? 'rgba(255,255,255,0.14)'
                    : 'rgba(52,41,35,0.12)',
              }}
            >
              <div
                className="h-full origin-left transition-transform duration-150"
                style={{
                  backgroundColor: currentLight.accentColor,
                  transform: `scaleX(${isDesktopPin ? Math.max(progress, 0.06) : 1})`,
                }}
              />
            </div>
          </div>

          <Link
            to="/gallery"
            className="font-sen text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center gap-2 hover:underline"
            style={{ color: currentLight.stageInk }}
          >
            <span>View All 55 Client Moments</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
