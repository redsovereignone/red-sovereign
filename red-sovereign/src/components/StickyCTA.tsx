'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { getCTAVariant, isFeatureEnabled } from '@/lib/flags'

interface StickyCTAProps {
  onCTAClick: () => void;
  isModalOpen: boolean;
}

export default function StickyCTA({ onCTAClick, isModalOpen }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    // Check if feature is enabled
    if (!isFeatureEnabled('sticky_cta')) return;

    // Check if dismissed in last 24h
    const dismissedAt = localStorage.getItem('stickyCTADismissed');
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt);
      const hoursSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismiss < 24) {
        setIsDismissed(true);
        return;
      }
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100;
      const shouldShow = scrollPercentage > 15 && !isModalOpen;
      
      if (shouldShow && !isVisible && !isDismissed) {
        setIsVisible(true);
        if (!hasBeenViewed) {
          analytics.stickyCTAView();
          setHasBeenViewed(true);
        }
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
      }
    };

    // Also show after 6s on mobile
    const isMobile = window.innerWidth < 768;
    let timeoutId: NodeJS.Timeout;
    
    if (isMobile && !isDismissed) {
      timeoutId = setTimeout(() => {
        if (!isModalOpen && !isDismissed) {
          setIsVisible(true);
          if (!hasBeenViewed) {
            analytics.stickyCTAView();
            setHasBeenViewed(true);
          }
        }
      }, 6000);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isModalOpen, isDismissed, hasBeenViewed, isVisible]);

  // Hide when modal is open
  useEffect(() => {
    if (isModalOpen && isVisible) {
      setIsVisible(false);
    }
  }, [isModalOpen, isVisible]);

  const handleDismiss = () => {
    analytics.stickyCTAClose();
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('stickyCTADismissed', Date.now().toString());
  };

  const handleClick = () => {
    analytics.stickyCTAClick();
    onCTAClick();
  };

  const { text } = getCTAVariant();

  if (!isFeatureEnabled('sticky_cta')) return null;

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <p className="text-sm text-gray-300 hidden sm:block">
                  Ready to grow? Get your personalized playbook.
                </p>
                <button
                  onClick={handleClick}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 whitespace-nowrap"
                >
                  {text}
                </button>
                <span className="text-xs text-gray-500 hidden md:block">
                  Takes ~60 seconds
                </span>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Dismiss sticky banner"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}