'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, Check, Sparkles, Mail, Download, ChevronRight, Shield, Award, Users, Clock, Globe, TrendingUp, Target, RotateCcw } from 'lucide-react'
import { analytics, hashEmail } from '@/lib/analytics'
import ResultsPreview from './ResultsPreview'
import PricingBlock from './PricingBlock'
import { getTestValue, trackConversion } from '@/lib/ab-tests'

interface PlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated?: () => void;
}

interface WizardData {
  companyName?: string;
  websiteUrl?: string;
  contactEmail?: string;
  ttmRevenue?: string;
  currentGrowthRate?: string;
  targetGrowthRate?: string;
  biggestChallenge?: string;
}

// Updated questions to capture essential business metrics
const QUESTIONS = [
  {
    id: 'companyInfo',
    type: 'text',
    title: 'Let\'s start with your company',
    subtitle: 'We\'ll analyze your website and current positioning',
    fields: [
      { id: 'companyName', label: 'Company Name', placeholder: 'Red Sovereign', required: true },
      { id: 'websiteUrl', label: 'Website URL', placeholder: 'https://redsovereign.com', required: true, type: 'url' }
    ],
    icon: '🏢',
    valueAdd: 'Analyzing your current web presence...'
  },
  {
    id: 'revenue',
    type: 'select',
    title: 'What\'s your trailing 12-month revenue?',
    subtitle: 'This helps us benchmark and size opportunities',
    field: 'ttmRevenue',
    options: ['<$1M', '$1-5M', '$5-10M', '$10-20M', '$20M+'],
    icon: '💰',
    valueAdd: 'Calculating your revenue potential...'
  },
  {
    id: 'growth',
    type: 'select',
    title: 'What\'s your current annual growth rate?',
    subtitle: 'We\'ll identify what\'s holding you back',
    field: 'currentGrowthRate',
    options: ['Declining', '0-20%', '20-50%', '50-100%', '100%+'],
    icon: '📊',
    valueAdd: 'Identifying growth blockers...'
  },
  {
    id: 'target',
    type: 'select',
    title: 'What\'s your target growth rate for next year?',
    subtitle: 'We\'ll build a plan to get you there',
    field: 'targetGrowthRate',
    options: ['20-30%', '30-50%', '50-75%', '75-100%', '100%+'],
    icon: '🎯',
    valueAdd: 'Mapping your growth trajectory...'
  },
  {
    id: 'challenge',
    type: 'select',
    title: 'What\'s your biggest growth challenge?',
    subtitle: 'We\'ll prioritize solving this first',
    field: 'biggestChallenge',
    options: ['Not enough leads', 'Poor conversion rates', 'Long sales cycles', 'No clear strategy', 'Limited resources'],
    icon: '🚧',
    valueAdd: 'Crafting your solution strategy...'
  }
];

export default function PlaybookModal({ isOpen, onClose, onLeadCreated }: PlaybookModalProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = questions, 1 = contact, 2 = preview
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [data, setData] = useState<WizardData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Get A/B test variations
  const modalTitle = getTestValue<string>('modal_title_v1');
  const emailCTA = getTestValue<string>('email_cta_v1');

  // Load saved progress from sessionStorage
  useEffect(() => {
    if (isOpen) {
      const saved = sessionStorage.getItem('playbookWizardData');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setData(parsed.data || {});
          if (parsed.currentQuestion !== undefined) {
            setCurrentQuestion(parsed.currentQuestion);
          }
          if (parsed.currentStep !== undefined) {
            setCurrentStep(parsed.currentStep);
          }
        } catch (e) {
          console.error('Failed to parse saved data:', e);
        }
      }
      startTimeRef.current = Date.now();
      analytics.wizardOpen();
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Save progress to sessionStorage
  useEffect(() => {
    if (isOpen && Object.keys(data).length > 0) {
      sessionStorage.setItem('playbookWizardData', JSON.stringify({
        data,
        currentQuestion,
        currentStep,
        timestamp: Date.now()
      }));
    }
  }, [data, currentQuestion, currentStep, isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
    
    return () => {
      if (previousFocusRef.current && !isOpen) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    analytics.wizardClose(currentStep === 0 ? currentQuestion : currentStep + 4);
    onClose();
  };

  const handleQuestionAnswer = (value: string | Record<string, string>) => {
    const question = QUESTIONS[currentQuestion];
    
    if (question.type === 'text' && question.fields) {
      // Handle multi-field text inputs
      setData(prev => ({ ...prev, ...value }));
    } else if (question.field) {
      // Handle single select inputs
      setData(prev => ({ ...prev, [question.field]: value }));
    }

    // Auto-advance to next question
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to contact capture after all questions
      setCurrentStep(1);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setData(prev => ({ ...prev, contactEmail: email }));
    setIsSubmitting(true);

    try {
      // Track conversion
      analytics.leadCreated(hashEmail(email), { ...data, contactEmail: email });
      trackConversion('email_cta_v1', 'email_captured');
      
      // Submit to Supabase
      const response = await fetch('/api/playbook-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          contactEmail: email,
          timestamp: new Date().toISOString()
        })
      });

      const responseData = await response.json();
      
      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || 'Failed to submit');
      }

      setEmailSubmitted(true);
      setCurrentStep(2); // Show preview/confirmation
      onLeadCreated?.();
      
      // Clear session storage on successful submission
      sessionStorage.removeItem('playbookWizardData');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStartOver = () => {
    // Show confirmation if user has made progress
    if (currentQuestion > 0 || currentStep > 0) {
      const confirmed = window.confirm('Are you sure you want to start over? Your current progress will be lost.');
      if (!confirmed) return;
    }
    
    // Reset all state
    setCurrentStep(0);
    setCurrentQuestion(0);
    setData({});
    setErrors({});
    setEmailSubmitted(false);
    
    // Clear session storage
    sessionStorage.removeItem('playbookWizardData');
    
    // Track analytics
    analytics.wizardRestart();
  };

  const progress = currentStep === 0 
    ? ((currentQuestion + 1) / QUESTIONS.length) * 80 // Questions are 80% of progress
    : currentStep === 1 
    ? 90 // Email capture is 90%
    : 100; // Preview is 100%

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl m-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 rounded-t-2xl overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Header buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {/* Start Over button - only show if progress has been made */}
              {(currentQuestion > 0 || currentStep > 0) && (
                <button
                  onClick={handleStartOver}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10 flex items-center gap-1"
                  aria-label="Start Over"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </button>
              )}
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">
                  {modalTitle || 'Get Your Custom 90-Day Growth Plan'}
                </h2>
                <p className="text-gray-400">
                  {currentStep === 0 
                    ? `Question ${currentQuestion + 1} of ${QUESTIONS.length}`
                    : currentStep === 1
                    ? 'Almost there! Just need your contact info.'
                    : 'Your growth plan is being prepared!'
                  }
                </p>
              </div>

              {/* Content */}
              {currentStep === 0 && (
                <QuestionStep
                  question={QUESTIONS[currentQuestion]}
                  value={data}
                  onAnswer={handleQuestionAnswer}
                  onBack={currentQuestion > 0 ? handleBack : undefined}
                />
              )}

              {currentStep === 1 && (
                <EmailCaptureStep
                  onSubmit={handleEmailSubmit}
                  onBack={handleBack}
                  isSubmitting={isSubmitting}
                  error={errors.submit}
                  data={data}
                />
              )}

              {currentStep === 2 && (
                <ResultsPreview data={data} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Question Step Component
function QuestionStep({ 
  question, 
  value, 
  onAnswer, 
  onBack 
}: { 
  question: any; 
  value: WizardData; 
  onAnswer: (value: any) => void; 
  onBack?: () => void;
}) {
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize local values from saved data
    if (question.type === 'text' && question.fields) {
      const initial: Record<string, string> = {};
      question.fields.forEach((field: any) => {
        initial[field.id] = value[field.id as keyof WizardData] || '';
      });
      setLocalValues(initial);
    }
  }, [question, value]);

  const handleTextSubmit = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    if (question.fields) {
      question.fields.forEach((field: any) => {
        if (field.required && !localValues[field.id]) {
          newErrors[field.id] = `${field.label} is required`;
        }
        if (field.type === 'url' && localValues[field.id]) {
          try {
            new URL(localValues[field.id]);
          } catch {
            newErrors[field.id] = 'Please enter a valid URL';
          }
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAnswer(localValues);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Question header */}
      <div className="text-center">
        <div className="text-5xl mb-4">{question.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {question.title}
        </h3>
        <p className="text-gray-400">
          {question.subtitle}
        </p>
      </div>

      {/* Question content */}
      {question.type === 'text' && question.fields ? (
        <div className="space-y-4">
          {question.fields.map((field: any) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={field.type || 'text'}
                value={localValues[field.id] || ''}
                onChange={(e) => {
                  setLocalValues(prev => ({ ...prev, [field.id]: e.target.value }));
                  setErrors(prev => ({ ...prev, [field.id]: '' }));
                }}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              {errors[field.id] && (
                <p className="mt-1 text-sm text-red-400">{errors[field.id]}</p>
              )}
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleTextSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition-all transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option: string) => (
            <motion.button
              key={option}
              onClick={() => onAnswer(option)}
              className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500 rounded-lg text-left transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{option}</span>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
              </div>
            </motion.button>
          ))}
          {onBack && (
            <button
              onClick={onBack}
              className="mt-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
          )}
        </div>
      )}

      {/* Value indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 italic"
      >
        {question.valueAdd}
      </motion.div>
    </motion.div>
  );
}

// Email Capture Step
function EmailCaptureStep({ 
  onSubmit, 
  onBack, 
  isSubmitting, 
  error,
  data 
}: { 
  onSubmit: (email: string) => void; 
  onBack: () => void; 
  isSubmitting: boolean; 
  error?: string;
  data: WizardData;
}) {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setLocalError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Please enter a valid email');
      return;
    }
    
    onSubmit(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* What they'll receive */}
      <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Here's What You'll Receive Within 24 Hours:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium">Website Conversion Audit</p>
              <p className="text-gray-400 text-sm">Detailed analysis of your site's conversion optimization opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium">SEO & AI Visibility Analysis</p>
              <p className="text-gray-400 text-sm">How to rank better in search engines and AI responses</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium">ICP & Messaging Review</p>
              <p className="text-gray-400 text-sm">Refine your ideal customer profile and value proposition</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium">Target Prospect List</p>
              <p className="text-gray-400 text-sm">100 hand-picked prospects matching your ICP</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium">90-Day Implementation Roadmap</p>
              <p className="text-gray-400 text-sm">Week-by-week plan to achieve your {data.targetGrowthRate || 'growth'} target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Where should we send your growth plan?
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLocalError('');
            }}
            placeholder="you@company.com"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            disabled={isSubmitting}
          />
          {(localError || error) && (
            <p className="mt-1 text-sm text-red-400">{localError || error}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Get My Growth Plan'}
          </button>
        </div>
      </form>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span>No spam</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>24hr delivery</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>Human analysis</span>
        </div>
      </div>
    </motion.div>
  );
}