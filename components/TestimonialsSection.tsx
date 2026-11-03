import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Testimonial } from '../data/content.data';
import { ScrollReveal } from './ScrollCraftPrimitives';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    title?: string;
    subtitle?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
    testimonials,
    title = "What Clients Are Saying",
    subtitle = "Verified Bridal & Studio Experiences"
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        setStartX(pageX);
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        const currentPosition = pageX - startX;
        setCurrentTranslate(currentPosition);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        const threshold = 80;

        if (currentTranslate < -threshold) {
            nextTestimonial();
        } else if (currentTranslate > threshold) {
            prevTestimonial();
        }

        setCurrentTranslate(0);
    };

    return (
        <section className="bg-[#FAF6F1] border-y border-[#E3D7CB] w-full overflow-hidden py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <h2 className="font-serif text-4xl sm:text-5xl leading-[0.94] tracking-[-0.035em] text-[#342923]">
                        {title}
                    </h2>
                    <p className="mt-2 font-sen text-xs uppercase tracking-[0.18em] text-[#856F63]">
                        {subtitle}
                    </p>
                </div>

                {/* Stationary Editorial Controls */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={prevTestimonial}
                        className="group p-3 border border-[#D5C6B8] bg-[#FFFDFA] hover:border-[#B98267] hover:bg-[#B98267] hover:text-white transition-all duration-150 active:scale-95"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="font-mono text-xs tracking-widest text-[#6D5A50] sc-nums tabular-nums px-2">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </div>
                    <button
                        type="button"
                        onClick={nextTestimonial}
                        className="group p-3 border border-[#D5C6B8] bg-[#FFFDFA] hover:border-[#B98267] hover:bg-[#B98267] hover:text-white transition-all duration-150 active:scale-95"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div
                className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]'} cursor-grab active:cursor-grabbing`}
                style={{
                    width: `${testimonials.length * 100}%`,
                    transform: `translate3d(calc(-${currentIndex * (100 / testimonials.length)}% + ${currentTranslate}px), 0, 0)`
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="relative px-5 sm:px-8 select-none"
                        style={{ width: `${100 / testimonials.length}%` }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
                            {/* Left Editorial Quote Spread (7 cols) */}
                            <div className="lg:col-span-7 flex flex-col justify-between py-4">
                                <div className="flex items-center gap-1.5 mb-6 text-[#B98267]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={15}
                                            className={i < testimonial.rating ? "fill-[#B98267] text-[#B98267]" : "text-[#D8CBC0]"}
                                        />
                                    ))}
                                    {testimonial.service && (
                                        <span className="ml-3 font-sen text-[11px] uppercase tracking-[0.18em] text-[#856F63]">
                                            · {testimonial.service}
                                        </span>
                                    )}
                                </div>

                                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[2.35rem] text-[#342923] leading-[1.22] tracking-[-0.02em] mb-10 sc-balance">
                                    “{testimonial.text}”
                                </blockquote>

                                <div className="pt-6 border-t border-[#E3D7CB] flex items-center justify-between">
                                    <div>
                                        <div className="font-sen font-bold text-[#342923] text-xs uppercase tracking-[0.18em]">
                                            {testimonial.author}
                                        </div>
                                        <div className="font-sen text-xs text-[#856F63] mt-1">
                                            {testimonial.location}
                                        </div>
                                    </div>
                                    <span className="font-serif italic text-sm text-[#B98267]">
                                        Verified Client
                                    </span>
                                </div>
                            </div>

                            {/* Right Editorial Portrait Plate (5 cols) */}
                            <div className="lg:col-span-5">
                                <ScrollReveal direction="up" className="relative mx-auto max-w-md lg:max-w-none">
                                    <div className="relative aspect-[4/5] overflow-hidden border border-[#DFD3C8] bg-[#EFE6DD] shadow-lg pointer-events-none">
                                        <img
                                            src={testimonial.image}
                                            alt={`Portrait of ${testimonial.author}`}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-top"
                                            draggable="false"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#241B16]/45 to-transparent" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
