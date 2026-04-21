
import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Testimonial } from '../data/content.data';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    title?: string;
    subtitle?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
    testimonials,
    title = "What Clients Are Saying",
    subtitle = "At vero eos et accusamus."
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
        const threshold = 100; // Drag threshold to trigger change

        if (currentTranslate < -threshold) {
            nextTestimonial();
        } else if (currentTranslate > threshold) {
            prevTestimonial();
        }

        setCurrentTranslate(0);
    };

    return (
        <div className="bg-[#FAF8F5] w-full overflow-hidden py-16 md:py-24">
            <div
                className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-out'} cursor-grab active:cursor-grabbing`}
                style={{
                    width: `${testimonials.length * 100}%`,
                    transform: `translateX(calc(-${currentIndex * (100 / testimonials.length)}% + ${currentTranslate}px))`
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
                        className="relative px-4 md:px-8 select-none"
                        style={{ width: `${100 / testimonials.length}%` }}
                    >
                        <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto">
                            {/* Left Content Side */}
                            <div className="w-full md:w-3/5 py-12 pr-0 md:pr-16 flex flex-col justify-center min-h-[400px]">
                                <div className="mb-6">
                                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">{title}</h2>
                                    <p className="text-stone-500 text-xs uppercase tracking-wide">{subtitle}</p>
                                </div>

                                <div className="flex gap-1 mb-6 text-stone-900">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < testimonial.rating ? "fill-stone-900 text-stone-900" : "text-stone-300"}
                                        />
                                    ))}
                                </div>

                                <blockquote className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed mb-8">
                                    “{testimonial.text}”
                                </blockquote>

                                <div className="mt-auto">
                                    <div className="mb-8">
                                        <div className="font-bold text-stone-900 text-sm tracking-wide mb-1 uppercase">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-stone-500 text-xs text-stone-400">
                                            {testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image Side */}
                            <div className="w-full md:w-2/5 relative h-[400px] md:h-[500px] overflow-hidden rounded-sm shadow-xl pointer-events-none">
                                <img
                                    src={testimonial.image}
                                    alt={`Portrait of ${testimonial.author}`}
                                    className="w-full h-full object-cover"
                                    draggable="false"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons (Stationary) */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex justify-center md:justify-start">
                <div className="flex gap-6 items-center">
                    <button
                        onClick={prevTestimonial}
                        className="group p-3 rounded-full border border-stone-200 bg-white shadow-sm hover:border-gold-500 hover:text-gold-500 transition-all duration-300 active:scale-95"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft size={24} className="text-stone-400 group-hover:text-gold-500 transition-colors" />
                    </button>
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <div 
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-gold-500' : 'w-2 bg-stone-200'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextTestimonial}
                        className="group p-3 rounded-full border border-stone-200 bg-white shadow-sm hover:border-gold-500 hover:text-gold-500 transition-all duration-300 active:scale-95"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight size={24} className="text-stone-400 group-hover:text-gold-500 transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
