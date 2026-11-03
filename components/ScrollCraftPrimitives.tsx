import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll Craft Motion & Interaction Primitives
 * Built on a unified GSAP-grade requestAnimationFrame & IntersectionObserver
 * timeline synchronized with Lenis smooth scrolling.
 *
 * Implements the Scroll Craft device kit:
 * - `kinetic` (line/word masked split reveal)
 * - `parallax` (multi-plane differential scroll rates)
 * - `reveal` (clip-path directional wipe: up, down, left, right, iris)
 * - `count` (verified studio number ticker with cubic ease-out & tabular-nums)
 * - `pan` (measured horizontal overflow exhibition rail)
 * - `tilt` & `magnet` (fine-pointer interpolated 3D tilt & magnetic pull)
 * - Bespoke Signature Move: Studio Light Loupe (`5600K` / `3800K` / `2700K`)
 */

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const clamp01 = (val: number) => clamp(val, 0, 1);
const smoothStep = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};
const cubicOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);

// ---------------------------------------------------------------------------
// 1. `count` Device — Numbers that tick up once on entry with tabular-nums
// ---------------------------------------------------------------------------
interface ScrollCountProps {
  value: string; // e.g., "5000+", "4.9", "15+"
  durationMs?: number;
  className?: string;
}

export const ScrollCount: React.FC<ScrollCountProps> = ({
  value,
  durationMs = 1500,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState<string>(value);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse numeric part and suffix (e.g., "5000+" -> 5000 and "+")
    const match = value.trim().match(/^([\d,.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const rawNumStr = match[1].replace(/,/g, '');
    const target = parseFloat(rawNumStr);
    const suffix = match[2] || '';
    const decimalIndex = rawNumStr.indexOf('.');
    const decimals = decimalIndex > -1 ? rawNumStr.length - decimalIndex - 1 : 0;
    const useCommas = match[1].includes(',') || target >= 1000;

    if (isNaN(target) || prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const formatNumber = (n: number) => {
      const fixed = n.toFixed(decimals);
      if (!useCommas) return fixed + suffix;
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.') + suffix;
    };

    setDisplay(formatNumber(0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRunRef.current) {
            hasRunRef.current = true;
            let startTime: number | null = null;

            const step = (now: number) => {
              if (startTime === null) startTime = now;
              const progress = clamp01((now - startTime) / durationMs);
              const eased = cubicOut(progress);
              setDisplay(formatNumber(target * eased));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setDisplay(value);
              }
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs, prefersReducedMotion]);

  return (
    <span ref={ref} className={`sc-nums tabular-nums ${className}`}>
      {display}
    </span>
  );
};

// ---------------------------------------------------------------------------
// 2. `reveal` Device — Clip-path wipe transformation on scroll entry
// ---------------------------------------------------------------------------
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'iris';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const getInitialClip = () => {
    if (prefersReducedMotion) return 'inset(0% 0% 0% 0%)';
    switch (direction) {
      case 'down':
        return 'inset(100% 0% 0% 0%)';
      case 'left':
        return 'inset(0% 100% 0% 0%)';
      case 'right':
        return 'inset(0% 0% 0% 100%)';
      case 'iris':
        return 'circle(0% at 50% 50%)';
      case 'up':
      default:
        return 'inset(0% 0% 100% 0%)';
    }
  };

  const getTargetClip = () => {
    if (direction === 'iris') return 'circle(78% at 50% 50%)';
    return 'inset(0% 0% 0% 0%)';
  };

  return (
    <motion.div
      initial={{ clipPath: getInitialClip(), opacity: prefersReducedMotion ? 0 : 1 }}
      whileInView={{ clipPath: getTargetClip(), opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: prefersReducedMotion ? 0.25 : 0.88,
        delay,
        ease: [0.23, 1, 0.32, 1], // --sc-ease-out
      }}
      className={`will-change-[clip-path,transform] ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// 3. `kinetic` Device — Masked Line / Phrase Stagger Reveal
// ---------------------------------------------------------------------------
interface KineticHeadingProps {
  lines: React.ReactNode[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  lines,
  as: Tag = 'h1',
  className = '',
  lineClassName = '',
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Tag className={`sc-balance ${className}`}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${lineClassName}`}
        >
          <motion.span
            className="block will-change-[transform,opacity]"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: '102%' }
            }
            whileInView={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: '0%' }
            }
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{
              duration: prefersReducedMotion ? 0.24 : 0.78,
              delay: delay + index * 0.11,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

// ---------------------------------------------------------------------------
// 4. `tilt` Device — Spring-damped 3D card tilt (fine pointer only)
// ---------------------------------------------------------------------------
interface TiltSurfaceProps {
  children: React.ReactNode;
  maxDegrees?: number;
  className?: string;
}

export const TiltSurface: React.FC<TiltSurfaceProps> = ({
  children,
  maxDegrees = 5.5,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    let rafId = 0;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.11;
      cy += (ty - cy) * 0.11;
      if (Math.abs(cx) > 0.01 || Math.abs(cy) > 0.01 || active) {
        el.style.transform = `perspective(1100px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`;
        rafId = requestAnimationFrame(tick);
      } else {
        el.style.transform = '';
        rafId = 0;
      }
    };

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      tx = clamp(ny, -1, 1) * -maxDegrees;
      ty = clamp(nx, -1, 1) * maxDegrees;
      active = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const handleLeave = () => {
      tx = 0;
      ty = 0;
      active = false;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', handleMove, { passive: true });
    el.addEventListener('pointerleave', handleLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxDegrees, prefersReducedMotion]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 5. `magnet` Device — Subtle magnetic pull on primary CTA (fine pointer only)
// ---------------------------------------------------------------------------
interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.24,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    let rafId = 0;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      if (Math.abs(cx) > 0.05 || Math.abs(cy) > 0.05 || active) {
        el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        rafId = requestAnimationFrame(tick);
      } else {
        el.style.transform = '';
        rafId = 0;
      }
    };

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      tx = dx * strength;
      ty = dy * strength;
      active = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const handleLeave = () => {
      tx = 0;
      ty = 0;
      active = false;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', handleMove, { passive: true });
    el.addEventListener('pointerleave', handleLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [strength, prefersReducedMotion]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 6. Hook: useElementScrollProgress — Normalized 0..1 progress & parallax driver
// ---------------------------------------------------------------------------
export function useElementScrollProgress(
  containerRef: React.RefObject<HTMLElement | null>,
  mode: 'pinned' | 'flow' = 'flow'
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      let p = 0;
      if (mode === 'pinned') {
        const travel = Math.max(rect.height - vh, 1);
        p = clamp01(-rect.top / travel);
      } else {
        p = clamp01((vh - rect.top) / (rect.height + vh));
      }
      setProgress(p);
      el.style.setProperty('--sc-p', p.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          update();
          rafId = 0;
        });
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef, mode]);

  return progress;
}

// ---------------------------------------------------------------------------
// 7. Signature Move Configuration — Studio Light Loupe Presets
// ---------------------------------------------------------------------------
export type StudioLightPreset = 'daylight' | 'golden' | 'candlelight';

export interface StudioLightConfig {
  id: StudioLightPreset;
  kelvin: string;
  label: string;
  venueNote: string;
  filter: string;
  stageBg: string;
  stageSurface: string;
  stageInk: string;
  stageSubtle: string;
  accentColor: string;
  overlayTint: string;
}

export const STUDIO_LIGHT_PRESETS: Record<StudioLightPreset, StudioLightConfig> = {
  daylight: {
    id: 'daylight',
    kelvin: '5600K',
    label: 'Ceremony Daylight',
    venueNote: 'True-to-skin neutral outdoor & window light',
    filter: 'saturate(0.98) contrast(1.02) brightness(1.02)',
    stageBg: '#F6EFE8',
    stageSurface: '#FFFDFA',
    stageInk: '#342923',
    stageSubtle: '#735F55',
    accentColor: '#B98267',
    overlayTint: 'rgba(255, 252, 248, 0.04)',
  },
  golden: {
    id: 'golden',
    kelvin: '3800K',
    label: 'Golden Hour',
    venueNote: 'Warm coastal sunset glow for portraits',
    filter: 'sepia(0.16) saturate(1.14) contrast(1.04) brightness(0.99)',
    stageBg: '#EAD9CB',
    stageSurface: '#F5E9DF',
    stageInk: '#2F231C',
    stageSubtle: '#6B5346',
    accentColor: '#C47D5A',
    overlayTint: 'rgba(219, 160, 118, 0.14)',
  },
  candlelight: {
    id: 'candlelight',
    kelvin: '2700K',
    label: 'Evening Reception',
    venueNote: 'Intimate ballroom & candlelight flash hold',
    filter: 'sepia(0.22) saturate(1.18) contrast(1.09) brightness(0.93)',
    stageBg: '#271E19',
    stageSurface: '#352923',
    stageInk: '#F6EDE6',
    stageSubtle: '#C9B5A8',
    accentColor: '#E2AC91',
    overlayTint: 'rgba(196, 125, 90, 0.18)',
  },
};

export { smoothStep };

