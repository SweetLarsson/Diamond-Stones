import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full text-white shadow-xl hover:shadow-2xl transition-transform duration-200 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] focus:ring-offset-2 flex items-center justify-center group"
          style={{
            background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 50%, #2563EB 100%)',
          }}
          aria-label="Navigate to top of the page"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
