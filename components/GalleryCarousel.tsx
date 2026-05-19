import React from 'react';
import { motion } from 'framer-motion';

interface GalleryCarouselProps {
    images: string[];
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-12">
            {/* Grid View (Responsive for Mobile, Tablet, and Desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
