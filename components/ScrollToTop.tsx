import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-7 z-[60] flex items-center justify-center w-11 h-11 bg-white/80 backdrop-blur-md border border-stone-200/50 shadow-lg rounded-full transition-all duration-700 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0 pointer-events-none'
      } hover:border-[#C8997C] hover:bg-white group overflow-hidden active:scale-90`}
      aria-label="Scroll to top"
    >
      {/* Premium hover effect */}
      <div className="absolute inset-0 bg-[#C8997C]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      
      <ChevronUp 
        size={22} 
        className="text-[#4A3F35] group-hover:text-[#C8997C] transition-all duration-300 group-hover:-translate-y-1" 
        strokeWidth={1.5}
      />
      
      {/* Decorative pulse when visible */}
      {isVisible && (
        <div className="absolute inset-0 rounded-full border border-[#C8997C]/30 animate-ping-slow pointer-events-none"></div>
      )}
    </button>
  );
};

export default ScrollToTop;
