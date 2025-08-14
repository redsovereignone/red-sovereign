'use client'

import { useEffect, useState } from 'react';

interface RecoveryData {
  data: Record<string, unknown>;
  timestamp: number;
}

export function useSessionRecovery() {
  const [hasIncompleteSession, setHasIncompleteSession] = useState(false);
  const [recoveryData, setRecoveryData] = useState<RecoveryData | null>(null);

  useEffect(() => {
    // Check for incomplete session on mount
    const checkRecovery = () => {
      const saved = sessionStorage.getItem('playbookRecovery');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as RecoveryData;
          // Only show recovery if less than 24 hours old
          const hoursSince = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
          if (hoursSince < 24) {
            setHasIncompleteSession(true);
            setRecoveryData(parsed);
          } else {
            // Clear old recovery data
            sessionStorage.removeItem('playbookRecovery');
          }
        } catch {
          sessionStorage.removeItem('playbookRecovery');
        }
      }
    };

    checkRecovery();
    
    // Also check when window regains focus
    const handleFocus = () => checkRecovery();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const clearRecovery = () => {
    sessionStorage.removeItem('playbookRecovery');
    sessionStorage.removeItem('playbookWizardData');
    setHasIncompleteSession(false);
    setRecoveryData(null);
  };

  const resumeSession = () => {
    // This will be handled by the PlaybookModal when it opens
    // as it already checks for saved data
    setHasIncompleteSession(false);
  };

  return {
    hasIncompleteSession,
    recoveryData,
    clearRecovery,
    resumeSession
  };
}