import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Scroll Craft `flow` + `in` reveal-on-entry primitive (devices.md §8):
 * - Fires ONCE on entry (`once: true`) so content never re-hides on scroll-up.
 * - Restrained 14px rise over 620ms on `--sc-ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`).
 * - Under `prefers-reduced-motion: reduce`, drops position change and keeps gentle opacity.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
    children,
    className = "",
    delay = 0
}) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{
                duration: prefersReducedMotion ? 0.22 : 0.62,
                ease: [0.23, 1, 0.32, 1],
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
