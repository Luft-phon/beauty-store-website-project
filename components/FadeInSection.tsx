import React from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
