import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

interface GalleryCarouselProps {
    images: string[];
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(1);

    // Ensure we have enough images for the effect
    const displayImages = images.length < 3 ? [...images, ...images, ...images].slice(0, 5) : images;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const getSlideStyles = (index: number) => {
        let dist = index - currentIndex;
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
            x = '-130%';
            scale = 0.85;
            opacity = 0.4;
            zIndex = 5;
            rotateY = 15;
        } else if (isNext) {
            x = '30%';
            scale = 0.85;
            opacity = 0.4;
            zIndex = 5;
            rotateY = -15;
        } else {
            x = dist < 0 ? '-200%' : '100%';
            opacity = 0;
        }

        return { x, scale, opacity, zIndex, rotateY };
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-12">
            {/* Desktop Grid View (Laptop Screens) */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
                {images.map((src, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-lg overflow-hidden aspect-[3/4] shadow-lg group"
                    >
                        <img
                            src={src}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Mobile/Tablet Carousel View */}
            <div className="lg:hidden relative perspective-1000">
                {/* Carousel Track Container */}
                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                    {displayImages.map((src, idx) => {
                        const styles = getSlideStyles(idx);
                        return (
                            <motion.div
                                key={idx}
                                className="absolute w-[80%] md:w-[60%] h-full rounded-2xl overflow-hidden shadow-2xl bg-black"
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
                                    left: '50%',
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
                                <div className="w-full h-full relative">
                                    <img
                                        src={src}
                                        alt={`Gallery ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}

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
                    <button
                        onClick={nextSlide}
                        className="group w-12 h-12 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors active:scale-95 text-stone-400 hover:text-stone-900"
                        aria-label="Next"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};
