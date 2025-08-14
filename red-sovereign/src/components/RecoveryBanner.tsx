'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useSessionRecovery } from '@/hooks/useSessionRecovery';

interface RecoveryBannerProps {
  onResume: () => void;
}

export default function RecoveryBanner({ onResume }: RecoveryBannerProps) {
  const { hasIncompleteSession, clearRecovery, resumeSession } = useSessionRecovery();

  const handleResume = () => {
    resumeSession();
    onResume();
  };

  const handleDismiss = () => {
    clearRecovery();
  };

  return (
    <AnimatePresence>
      {hasIncompleteSession && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 to-red-500 shadow-lg"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                <p className="text-white text-sm font-medium">
                  Welcome back! You have an incomplete growth playbook.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResume}
                  className="px-4 py-1.5 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Continue Where You Left Off
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-1 hover:bg-red-700/50 rounded transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}