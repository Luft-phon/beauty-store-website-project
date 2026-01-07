import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

interface GalleryCarouselProps {
    images: string[];
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(1); // Start with second image to show centering effect immediately

    // Ensure we have enough images for the effect
    const displayImages = images.length < 3 ? [...images, ...images, ...images].slice(0, 5) : images;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const getSlideStyles = (index: number) => {
        // Calculate distance from current index, handling wrap-around for a continuous feel logic if needed,
        // but for simple 0..n implementation:
        const position = (index - currentIndex);

        // Determine visual state based on position relative to center
        // 0 = center, -1 = left, 1 = right, others = hidden/far

        // Check for wrap-around adjacency
        // This simple logic works best if we don't strictly wrap continuously in the DOM but just index.
        // For a true infinite carousel, display logic is complex. 
        // Let's implement a centered viewport approach finding the relative distance.

        let dist = index - currentIndex;
        // Adjust for wrapping if list is long
        if (dist > displayImages.length / 2) dist -= displayImages.length;
        if (dist < -displayImages.length / 2) dist += displayImages.length;

        const isCenter = dist === 0;
        const isPrev = dist === -1;
        const isNext = dist === 1;

        let x = '-50%';
        let scale = 0.8;
        let opacity = 0;
        let zIndex = 0;
        let rotateY = 0;

        if (isCenter) {
            x = '-50%';
            scale = 1;
            opacity = 1;
            zIndex = 10;
            rotateY = 0;
        } else if (isPrev) {
            x = '-130%'; // -50% (center) - 80% (shift left)
            scale = 0.85;
            opacity = 0.4;
            zIndex = 5;
            rotateY = 15;
        } else if (isNext) {
            x = '30%'; // -50% (center) + 80% (shift right)
            scale = 0.85;
            opacity = 0.4;
            zIndex = 5;
            rotateY = -15;
        } else {
            // Hide others or put them far away
            x = dist < 0 ? '-200%' : '100%';
            opacity = 0;
        }

        return { x, scale, opacity, zIndex, rotateY };
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-12 perspective-1000">

            {/* Carousel Track Container */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">

                {displayImages.map((src, idx) => {
                    const styles = getSlideStyles(idx);
                    // Only render visible or near-visible slides to keep DOM light? 
                    // Actually, rendering all with motion is fine for small lists.
                    // Optimization: only animate if opacity > 0

                    return (
                        <motion.div
                            key={idx}
                            className="absolute w-[80%] md:w-[60%] lg:w-[50%] h-full rounded-2xl overflow-hidden shadow-2xl bg-black"
                            initial={false}
                            animate={{
                                x: styles.x,
                                scale: styles.scale,
                                opacity: styles.opacity,
                                zIndex: styles.zIndex,
                                rotateY: styles.rotateY
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                            style={{
                                top: 0,
                                left: '50%', // Anchor to center of container
                                transformOrigin: 'center center',
                                cursor: 'grab'
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -10000 || offset.x < -50) {
                                    nextSlide();
                                } else if (swipe > 10000 || offset.x > 50) {
                                    prevSlide();
                                }
                            }}
                        >
                            <div
                                className="w-full h-full relative"
                            >
                                {/* Image */}
                                <img
                                    src={src}
                                    alt={`Gallery ${idx}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Gradient Overlays for the edges to blend/fade side items */}
                <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-stone-50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-stone-50 to-transparent z-20 pointer-events-none"></div>

            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-8 mt-8">
                <button
                    onClick={prevSlide}
                    className="group w-12 h-12 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors active:scale-95 text-stone-400 hover:text-stone-900"
                    aria-label="Previous"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Pagination Dots (Optional, purely aesthetic based on user image having arrows) */}
                {/* <div className="flex gap-2">
            {displayImages.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-stone-900' : 'w-1.5 bg-stone-300'}`}
                />
            ))}
        </div> */}

                <button
                    onClick={nextSlide}
                    className="group w-12 h-12 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors active:scale-95 text-stone-400 hover:text-stone-900"
                    aria-label="Next"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>

        </div>
    );
};
