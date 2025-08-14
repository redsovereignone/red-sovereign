'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface ExitIntentProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function ExitIntent({ isOpen, onClose, onContinue }: ExitIntentProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      analytics.exitIntentShown();
    }
  }, [isOpen]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setIsSubmitting(true);
    analytics.exitIntentClick('email_capture');

    try {
      // Save email for recovery
      const recoveryData = sessionStorage.getItem('playbookRecovery');
      if (recoveryData) {
        const parsed = JSON.parse(recoveryData);
        parsed.email = email;
        sessionStorage.setItem('playbookRecovery', JSON.stringify(parsed));
      }

      // In production, send recovery email here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to save email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    analytics.exitIntentClick('continue');
    onContinue();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Content */}
            <div className="p-8">
              {!submitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                      <Mail className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Save Your Progress?
                    </h3>
                    <p className="text-gray-400">
                      You&apos;ve started building your personalized growth playbook. 
                      Would you like to continue now or save it for later?
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    {/* Continue button */}
                    <button
                      onClick={handleContinue}
                      className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Continue Building Playbook
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-900 text-gray-500">or save for later</span>
                      </div>
                    </div>

                    {/* Email form */}
                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Saving...' : 'Email Me My Progress'}
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center">
                      We&apos;ll send you a link to continue where you left off. No spam.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4"
                  >
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Progress Saved!
                  </h3>
                  <p className="text-gray-400">
                    Check your email for a link to continue.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}