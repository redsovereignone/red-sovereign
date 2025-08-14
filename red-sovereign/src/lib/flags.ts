// Feature flags for A/B testing
// Can be controlled via environment variables or a feature flag service

export interface FeatureFlags {
  single_path_hero: boolean;
  proof_strip_hero: boolean;
  modal_wizard_email_first: boolean;
  price_gate_post_preview: boolean;
  risk_reversal_badge: boolean;
  sticky_cta: boolean;
  exit_intent_offer: boolean;
}

// Default flags - all true for initial launch
const defaultFlags: FeatureFlags = {
  single_path_hero: true,
  proof_strip_hero: true,
  modal_wizard_email_first: true,
  price_gate_post_preview: true,
  risk_reversal_badge: true,
  sticky_cta: true,
  exit_intent_offer: true,
};

// Get flags from environment or use defaults
export function getFeatureFlags(): FeatureFlags {
  if (typeof window === 'undefined') {
    // Server-side
    return {
      single_path_hero: process.env.NEXT_PUBLIC_FLAG_SINGLE_PATH_HERO ? process.env.NEXT_PUBLIC_FLAG_SINGLE_PATH_HERO === 'true' : defaultFlags.single_path_hero,
      proof_strip_hero: process.env.NEXT_PUBLIC_FLAG_PROOF_STRIP_HERO ? process.env.NEXT_PUBLIC_FLAG_PROOF_STRIP_HERO === 'true' : defaultFlags.proof_strip_hero,
      modal_wizard_email_first: process.env.NEXT_PUBLIC_FLAG_MODAL_WIZARD_EMAIL_FIRST ? process.env.NEXT_PUBLIC_FLAG_MODAL_WIZARD_EMAIL_FIRST === 'true' : defaultFlags.modal_wizard_email_first,
      price_gate_post_preview: process.env.NEXT_PUBLIC_FLAG_PRICE_GATE_POST_PREVIEW ? process.env.NEXT_PUBLIC_FLAG_PRICE_GATE_POST_PREVIEW === 'true' : defaultFlags.price_gate_post_preview,
      risk_reversal_badge: process.env.NEXT_PUBLIC_FLAG_RISK_REVERSAL_BADGE ? process.env.NEXT_PUBLIC_FLAG_RISK_REVERSAL_BADGE === 'true' : defaultFlags.risk_reversal_badge,
      sticky_cta: process.env.NEXT_PUBLIC_FLAG_STICKY_CTA ? process.env.NEXT_PUBLIC_FLAG_STICKY_CTA === 'true' : defaultFlags.sticky_cta,
      exit_intent_offer: process.env.NEXT_PUBLIC_FLAG_EXIT_INTENT_OFFER ? process.env.NEXT_PUBLIC_FLAG_EXIT_INTENT_OFFER === 'true' : defaultFlags.exit_intent_offer,
    };
  }
  
  // Client-side - check localStorage for overrides (useful for testing)
  const stored = localStorage.getItem('featureFlags');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...defaultFlags, ...parsed };
    } catch {
      // Invalid JSON, use defaults
    }
  }
  
  return defaultFlags;
}

// Helper to check a specific flag
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[flag];
}

// Helper to override flags in localStorage (for testing)
export function setFeatureFlag(flag: keyof FeatureFlags, value: boolean): void {
  if (typeof window === 'undefined') return;
  
  const current = getFeatureFlags();
  current[flag] = value;
  localStorage.setItem('featureFlags', JSON.stringify(current));
}

// CTA variant testing
export type CTAVariant = 'A' | 'B' | 'C';

export function getCTAVariant(): { variant: CTAVariant; text: string } {
  // Use a stable variant per session
  if (typeof window !== 'undefined') {
    let variant = sessionStorage.getItem('ctaVariant') as CTAVariant;
    if (!variant) {
      // Randomly assign variant
      const variants: CTAVariant[] = ['A', 'B', 'C'];
      variant = variants[Math.floor(Math.random() * variants.length)];
      sessionStorage.setItem('ctaVariant', variant);
    }
    
    const texts = {
      A: 'Generate My Free Playbook',
      B: 'See My 90-Day Plan',
      C: 'Show Me the Opportunities',
    };
    
    return { variant, text: texts[variant] };
  }
  
  return { variant: 'A', text: 'Generate My Free Playbook' };
}

// Headline variant testing
export type HeadlineVariant = 'A' | 'B';

export function getHeadlineVariant(): { variant: HeadlineVariant; text: string } {
  if (typeof window !== 'undefined') {
    let variant = sessionStorage.getItem('headlineVariant') as HeadlineVariant;
    if (!variant) {
      const variants: HeadlineVariant[] = ['A', 'B'];
      variant = variants[Math.floor(Math.random() * variants.length)];
      sessionStorage.setItem('headlineVariant', variant);
    }
    
    const texts = {
      A: "We'll put 8–12 qualified opportunities on your calendar in 90 days.",
      B: "Install a predictable B2B growth engine—for less than ⅓ the cost of a Marketing Director.",
    };
    
    return { variant, text: texts[variant] };
  }
  
  return { 
    variant: 'A', 
    text: "We'll put 8–12 qualified opportunities on your calendar in 90 days."
  };
}