import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Sunset, Flame, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
    STUDIO_LIGHT_PRESETS,
    StudioLightPreset,
    ScrollReveal,
} from './ScrollCraftPrimitives';

interface GalleryCarouselProps {
    images: string[];
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
    const [lightPreset, setLightPreset] = useState<StudioLightPreset>('daylight');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const currentLight = STUDIO_LIGHT_PRESETS[lightPreset];

    const presetButtons: { id: StudioLightPreset; icon: React.ReactNode }[] = [
        { id: 'daylight', icon: <Sun size={14} /> },
        { id: 'golden', icon: <Sunset size={14} /> },
        { id: 'candlelight', icon: <Flame size={14} /> },
    ];

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeIndex === null) return;
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeIndex === null) return;
        setActiveIndex((activeIndex + 1) % images.length);
    };

    return (
        <div
            className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-10 transition-colors duration-500 rounded-sm"
            style={{
                backgroundColor: currentLight.stageBg,
                color: currentLight.stageInk,
            }}
        >
            {/* Studio Light Loupe Control Bar (Signature Move carried into Gallery) */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 mb-10 border-b border-current/10">
                <div>
                    <div
                        className="flex items-center gap-2 font-sen text-[11px] uppercase tracking-[0.2em] mb-1"
                        style={{ color: currentLight.accentColor }}
                    >
                        <Sparkles size={13} />
                        <span>Studio Light Loupe · {images.length} Plates</span>
                    </div>
                    <p
                        className="font-sen text-xs sm:text-sm"
                        style={{ color: currentLight.stageSubtle }}
                    >
                        {currentLight.venueNote}
                    </p>
                </div>

                <div
                    role="group"
                    aria-label="Gallery lighting temperature"
                    className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full border"
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
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-sen text-xs transition-all duration-200 active:scale-95 ${
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
            </div>

            {/* Vertical Portrait Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {images.map((src, idx) => (
                    <div key={idx} className="aspect-[3/4]">
                        <ScrollReveal
                            direction="up"
                            delay={(idx % 3) * 0.06}
                            className="w-full h-full"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className="group relative w-full h-full overflow-hidden border text-left block focus:outline-none"
                                style={{
                                    borderColor:
                                        lightPreset === 'candlelight'
                                            ? 'rgba(226, 172, 145, 0.22)'
                                            : 'rgba(52, 41, 35, 0.12)',
                                }}
                            >
                                <img
                                    src={src}
                                    alt={`Le'Charme Portfolio Look ${idx + 1}`}
                                    loading="lazy"
                                    style={{ filter: currentLight.filter }}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none transition-colors duration-500"
                                    style={{ backgroundColor: currentLight.overlayTint }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1310]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                                    <span className="font-serif italic text-lg">
                                        Plate {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-black/45 backdrop-blur-sm">
                                        {currentLight.kelvin}
                                    </span>
                                </div>
                            </button>
                        </ScrollReveal>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.24 }}
                        onClick={() => setActiveIndex(null)}
                        className="fixed inset-0 z-[90] bg-[#16110E]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveIndex(null)}
                            aria-label="Close lightbox"
                            className="absolute top-6 right-6 p-3 text-[#F5EBDD] hover:text-[#dba78d] transition-colors"
                        >
                            <X size={28} />
                        </button>

                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous image"
                            className="absolute left-4 sm:left-8 p-3 text-[#F5EBDD] hover:text-[#dba78d] transition-colors"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
                        >
                            <img
                                src={images[activeIndex]}
                                alt={`Le'Charme Look ${activeIndex + 1}`}
                                style={{ filter: currentLight.filter }}
                                className="max-h-[76vh] w-auto object-contain border border-white/15 shadow-2xl"
                            />
                            <div className="mt-4 w-full flex items-center justify-between text-[#F5EBDD]/80 font-mono text-xs uppercase tracking-widest">
                                <span>
                                    Plate {String(activeIndex + 1).padStart(2, '0')} / {images.length}
                                </span>
                                <span>
                                    {currentLight.label} ({currentLight.kelvin})
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next image"
                            className="absolute right-4 sm:right-8 p-3 text-[#F5EBDD] hover:text-[#dba78d] transition-colors"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
