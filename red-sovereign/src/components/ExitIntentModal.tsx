'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Calendar } from 'lucide-react'
import { analytics, hashEmail } from '@/lib/analytics'
import { isFeatureEnabled } from '@/lib/flags'

interface ExitIntentModalProps {
  onOpenPlaybook: () => void;
}

export default function ExitIntentModal({ onOpenPlaybook }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isFeatureEnabled('exit_intent_offer')) return;
    if (hasShown) return;

    let dwellTimer: NodeJS.Timeout;
    let exitTimer: NodeJS.Timeout;
    let scrollCount = 0;
    let hasBeenOnPageLongEnough = false;
    const isMobile = window.innerWidth < 768;
    
    // Wait 20 seconds before enabling exit intent
    setTimeout(() => {
      hasBeenOnPageLongEnough = true;
    }, 20000); // 20 seconds minimum time on page

    // Desktop: mouse leave at top with delay
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if user has been on page for at least 20 seconds
      if (!hasBeenOnPageLongEnough) return;
      
      // Increased threshold to 30px and added delay
      if (e.clientY <= 30 && !hasShown) {
        // Add 750ms delay to prevent accidental triggers
        exitTimer = setTimeout(() => {
          showModal();
        }, 750);
      }
    };
    
    const handleMouseEnter = () => {
      // Cancel exit intent if mouse comes back
      if (exitTimer) {
        clearTimeout(exitTimer);
      }
    };

    // Mobile: back navigation or 60s dwell + 2 scrolls
    const handleScroll = () => {
      if (isMobile) {
        scrollCount++;
        if (scrollCount >= 2 && !hasShown) {
          clearTimeout(dwellTimer);
          dwellTimer = setTimeout(() => {
            if (!hasShown) {
              showModal();
            }
          }, 60000); // 60 seconds
        }
      }
    };

    const handlePopState = () => {
      if (isMobile && !hasShown) {
        showModal();
      }
    };

    const showModal = () => {
      setIsOpen(true);
      setHasShown(true);
      analytics.exitIntentShown();
      sessionStorage.setItem('exitIntentShown', 'true');
    };

    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem('exitIntentShown');
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    if (!isMobile) {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    } else {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('popstate', handlePopState);
      
      // Start dwell timer on mobile - increased to 90 seconds
      dwellTimer = setTimeout(() => {
        if (scrollCount >= 2 && !hasShown) {
          showModal();
        }
      }, 90000); // 90 seconds for mobile
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      if (dwellTimer) clearTimeout(dwellTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePlaybookClick = () => {
    analytics.exitIntentClick('playbook');
    setIsOpen(false);
    onOpenPlaybook();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);
    analytics.exitIntentClick('email_pdf');
    analytics.leadCreated(hashEmail(email), { source: 'exit_intent_pdf' });

    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsOpen(false);
    alert('Sample playbook PDF sent to ' + email);
  };

  if (!isFeatureEnabled('exit_intent_offer')) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
                    <FileText className="w-8 h-8 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get your free Playbook before you go?
                  </h2>
                  <p className="text-gray-400">
                    See exactly how we&apos;d grow your business in 90 days
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handlePlaybookClick}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5" />
                    Generate My Custom Playbook
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-gray-900 text-gray-500">OR</span>
                    </div>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        disabled={isSubmitting}
                      />
                      {emailError && (
                        <p className="mt-1 text-sm text-red-400">{emailError}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Email me a sample Playbook PDF'}
                    </button>
                  </form>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}