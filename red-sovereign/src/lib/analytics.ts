// Analytics tracking system
// Supports Segment, GA4, or custom analytics endpoints

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface CommonEventProps {
  step?: number;
  variant?: string;
  utm?: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
    content?: string | null;
    term?: string | null;
  };
  device?: 'desktop' | 'mobile' | 'tablet';
  referrer?: string;
  company_size?: string;
  industry?: string;
  goals?: string[];
}

// Get UTM parameters from URL
export function getUTMParams(): CommonEventProps['utm'] {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    content: params.get('utm_content'),
    term: params.get('utm_term'),
  };
}

// Get device type
export function getDeviceType(): CommonEventProps['device'] {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Get common event properties
export function getCommonProps(additionalProps?: Partial<CommonEventProps>): CommonEventProps {
  return {
    utm: getUTMParams(),
    device: getDeviceType(),
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    ...additionalProps,
  };
}

// Track event
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  const event: AnalyticsEvent = {
    event: eventName,
    properties: {
      ...getCommonProps(),
      ...properties,
    },
    timestamp: Date.now(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event);
  }

  // Send to GA4 if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, event.properties);
  }

  // Send to Segment if available
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.track(eventName, event.properties);
  }

  // Store in sessionStorage for debugging
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('analyticsEvents') || '[]';
    try {
      const events = JSON.parse(stored);
      events.push(event);
      // Keep only last 50 events
      if (events.length > 50) events.shift();
      sessionStorage.setItem('analyticsEvents', JSON.stringify(events));
    } catch {
      // Ignore errors
    }
  }
}

// Specific event tracking functions
export const analytics = {
  // Generic tracking function
  trackEvent: (eventName: string, properties?: Record<string, any>) => 
    trackEvent(eventName, properties),
  
  // Hero events
  heroCTAClick: (variant: string) => 
    trackEvent('hero_cta_click', { variant }),
  
  // Sticky CTA events
  stickyCTAView: () => 
    trackEvent('sticky_cta_view'),
  stickyCTAClick: () => 
    trackEvent('sticky_cta_click'),
  stickyCTAClose: () => 
    trackEvent('sticky_cta_close'),
  
  // Wizard events
  wizardOpen: () => 
    trackEvent('wizard_open'),
  wizardClose: (step: number) => 
    trackEvent('wizard_close', { step }),
  wizardRestart: () =>
    trackEvent('wizard_restart'),
  wizardStepStarted: (step: number) => 
    trackEvent('wizard_step_started', { step }),
  wizardStepCompleted: (step: number, data?: any) => 
    trackEvent('wizard_step_completed', { step, ...data }),
  
  // Lead events
  leadCreated: (emailHash: string, data?: any) => 
    trackEvent('lead_created', { email_hash: emailHash, ...data }),
  
  // View events
  previewViewed: (data?: any) => 
    trackEvent('preview_viewed', data),
  pricingViewed: () => 
    trackEvent('pricing_viewed'),
  calendarViewed: () => 
    trackEvent('calendar_viewed'),
  callBooked: () => 
    trackEvent('call_booked'),
  
  // PDF events
  pdfGenerated: (data?: any) =>
    trackEvent('pdf_generated', data),
  pdfDownloaded: () =>
    trackEvent('pdf_downloaded'),
  
  // Conversion events
  bookCallClicked: (data?: any) =>
    trackEvent('book_call_clicked', data),
  
  // Exit intent events
  exitIntentShown: () => 
    trackEvent('exit_intent_shown'),
  exitIntentClick: (action: string) => 
    trackEvent('exit_intent_click', { action }),
  
  // Case study events
  caseStudyView: (id: string) => 
    trackEvent('case_study_view', { case_study_id: id }),
};

// Hash email for privacy
export function hashEmail(email: string): string {
  // Simple hash for demo - in production use proper hashing
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Get analytics debug info
export function getAnalyticsDebug(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  
  const stored = sessionStorage.getItem('analyticsEvents') || '[]';
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}