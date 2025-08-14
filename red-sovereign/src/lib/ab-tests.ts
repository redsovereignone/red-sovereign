// A/B Test Configuration System for Copy Optimization
// This allows us to test different copy variations across the funnel

export type TestVariant = 'control' | 'variant_a' | 'variant_b' | 'variant_c';

interface ABTest {
  id: string;
  name: string;
  active: boolean;
  variants: Record<TestVariant, any>;
  weights?: Record<TestVariant, number>; // For weighted distribution
}

// CTA Copy Variations - Test different value propositions
export const CTA_TESTS: Record<string, ABTest> = {
  hero_cta: {
    id: 'hero_cta_v1',
    name: 'Hero CTA Button Copy',
    active: true,
    variants: {
      control: {
        main: 'Get Your Free 90-Day Growth Playbook',
        sub: '(Takes 60 seconds)'
      },
      variant_a: {
        main: 'See Your Revenue Roadmap',
        sub: '(5 questions, instant results)'
      },
      variant_b: {
        main: 'Calculate Your Growth Potential',
        sub: '(Personalized in 60 seconds)'
      },
      variant_c: {
        main: 'Start Growing Revenue Today',
        sub: '(Free custom playbook)'
      }
    }
  },
  
  modal_title: {
    id: 'modal_title_v1',
    name: 'Playbook Modal Title',
    active: true,
    variants: {
      control: 'Build Your Growth Playbook',
      variant_a: 'Let\'s 10x Your Pipeline',
      variant_b: 'Your Revenue Roadmap Starts Here',
      variant_c: 'Unlock Your Growth Potential'
    }
  },
  
  email_cta: {
    id: 'email_cta_v1',
    name: 'Email Capture Button',
    active: true,
    variants: {
      control: 'Send My Playbook',
      variant_a: 'Get My Custom Plan Now',
      variant_b: 'Yes, Send My Growth Plan',
      variant_c: 'Unlock My Playbook'
    }
  },
  
  urgency_message: {
    id: 'urgency_v1',
    name: 'Urgency Indicators',
    active: true,
    variants: {
      control: null, // No urgency message
      variant_a: '🔥 3 spots left for Q1 2025',
      variant_b: '⏰ Limited time: Free playbook offer ends soon',
      variant_c: '📈 Join 127 companies growing with our playbooks'
    }
  },
  
  trust_badges: {
    id: 'trust_v1',
    name: 'Trust Indicators',
    active: true,
    variants: {
      control: ['Instant delivery', 'No credit card', 'Personalized plan'],
      variant_a: ['Used by 500+ B2B companies', 'Average 3.2x ROI', '60-second setup'],
      variant_b: ['Founder-reviewed', '90-day guarantee', 'Cancel anytime'],
      variant_c: ['$2M+ revenue generated', 'Fortune 500 trusted', 'SOC2 compliant']
    }
  },
  
  progress_incentive: {
    id: 'progress_v1',
    name: 'Progress Incentives',
    active: true,
    variants: {
      control: 'Question {current} of {total}',
      variant_a: 'Building your plan... {percent}% complete',
      variant_b: 'Almost there! {remaining} questions left',
      variant_c: 'Calculating {value} in potential revenue...'
    }
  },
  
  value_props: {
    id: 'value_props_v1',
    name: 'Value Propositions',
    active: true,
    variants: {
      control: {
        headline: 'Your playbook is ready!',
        subhead: 'Enter your email to receive the full PDF instantly'
      },
      variant_a: {
        headline: 'Your $1.2M revenue roadmap is ready',
        subhead: 'See exactly how to hit your growth targets'
      },
      variant_b: {
        headline: 'We found 3 quick wins for you',
        subhead: 'Get your personalized action plan now'
      },
      variant_c: {
        headline: 'Your competitors don\'t want you to see this',
        subhead: 'Unlock the exact playbook we use for 8-figure exits'
      }
    }
  }
};

// Get variant based on user session or random assignment
export function getVariant(testId: string): TestVariant {
  const test = Object.values(CTA_TESTS).find(t => t.id === testId);
  if (!test || !test.active) return 'control';
  
  // Check if user already has a variant assigned in session
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(`ab_${testId}`);
    if (stored && stored in test.variants) {
      return stored as TestVariant;
    }
    
    // Assign new variant
    const variant = assignVariant(test);
    sessionStorage.setItem(`ab_${testId}`, variant);
    
    // Track assignment
    if (window.analytics) {
      window.analytics.track('AB Test Assigned', {
        test_id: testId,
        test_name: test.name,
        variant: variant
      });
    }
    
    return variant;
  }
  
  return 'control';
}

// Weighted random assignment
function assignVariant(test: ABTest): TestVariant {
  const variants = Object.keys(test.variants) as TestVariant[];
  const weights: Record<string, number> = test.weights || {};
  
  // Default equal weights if not specified
  const totalWeight = variants.reduce((sum, v) => sum + (weights[v] || 1), 0);
  const random = Math.random() * totalWeight;
  
  let cumulative = 0;
  for (const variant of variants) {
    cumulative += weights[variant] || 1;
    if (random < cumulative) {
      return variant;
    }
  }
  
  return 'control';
}

// Helper to get test value
export function getTestValue<T = any>(testId: string, path?: string): T {
  const test = Object.values(CTA_TESTS).find(t => t.id === testId);
  if (!test) return '' as T;
  
  const variant = getVariant(testId);
  const value = test.variants[variant];
  
  if (path && typeof value === 'object') {
    return path.split('.').reduce((obj, key) => obj?.[key], value) as T;
  }
  
  return value as T;
}

// Track conversion events
export function trackConversion(testId: string, event: string, metadata?: any) {
  if (typeof window !== 'undefined' && window.analytics) {
    const variant = sessionStorage.getItem(`ab_${testId}`) || 'control';
    window.analytics.track('AB Test Conversion', {
      test_id: testId,
      variant: variant,
      event: event,
      ...metadata
    });
  }
}