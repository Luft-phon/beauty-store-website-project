import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingIntroProps {
    onComplete: () => void;
}

const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
    const [isPresent, setIsPresent] = useState(true);

    useEffect(() => {
        // Total duration of the intro
        const timer = setTimeout(() => {
            setIsPresent(false);
            // Allow exit animation to finish before calling onComplete
            setTimeout(onComplete, 1000);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FDFCF8]" // Matching light sand theme
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    duration: 1.2,
                                    ease: "easeOut"
                                }
                            }}
                            className="relative z-10"
                        >
                            {/* Using refined shadow and border for premium look */}
                            <div className="p-1">
                                <img
                                    src="/images/logo/logo.jpg"
                                    alt="Le Charme Beauté Boutique"
                                    className="w-48 md:w-64 h-auto object-contain drop-shadow-2xl"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "120px" }}
                            transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                            className="h-[2px] bg-gold-500 mt-8"
                        />

                        <motion.p
                            initial={{ opacity: 0, letterSpacing: "0.1em" }}
                            animate={{ opacity: 1, letterSpacing: "0.3em" }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="mt-4 font-serif text-stone-900 uppercase text-xs font-bold"
                        >
                            Le Charme Beauté
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingIntro;
