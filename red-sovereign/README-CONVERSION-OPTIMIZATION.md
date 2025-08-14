# Conversion Optimization Implementation - Red Sovereign

## 🎯 Goal: 5% Visitor → Lead Conversion

This implementation upgrades the Red Sovereign landing page to achieve ≥5% visitor-to-lead conversion through strategic UX improvements, A/B testing capabilities, and conversion-focused components.

## ✅ Completed Components

### 1. Feature Flags System (`/src/lib/flags.ts`)
All features can be toggled for A/B testing:
- `single_path_hero` - Single primary CTA (default: true)
- `proof_strip_hero` - Proof metrics under headline (default: true)
- `modal_wizard_email_first` - Email-first wizard (default: true)
- `price_gate_post_preview` - Gate pricing after preview (default: true)
- `risk_reversal_badge` - Risk reversal messaging (default: true)
- `sticky_cta` - Sticky CTA bar (default: true)
- `exit_intent_offer` - Exit intent modal (default: true)

### 2. Analytics System (`/src/lib/analytics.ts`)
Complete event tracking with privacy-compliant implementation:
- All conversion events tracked
- UTM parameter capture
- Device detection
- Session storage for debugging

### 3. Core Components

#### HeroSectionOptimized (`/src/components/HeroSectionOptimized.tsx`)
- ✅ Single primary CTA with A/B variants
- ✅ Proof strip with 3 key metrics
- ✅ Risk reversal badge
- ✅ Secondary CTA de-emphasized
- ✅ UTM-based personalization

#### PlaybookModal (`/src/components/PlaybookModal.tsx`)
- ✅ 6-step wizard with progress indicator
- ✅ Email-first (lead created at Step 1)
- ✅ Session storage for progress
- ✅ Full accessibility (ARIA, focus trap, keyboard nav)
- ✅ Calendar integration ready

#### StickyCTA (`/src/components/StickyCTA.tsx`)
- ✅ Appears after 15% scroll or 6s on mobile
- ✅ 24-hour dismissal persistence
- ✅ Hides when modal open
- ✅ Analytics tracking

#### ExitIntentModal (`/src/components/ExitIntentModal.tsx`)
- ✅ Desktop: Rapid mouse leave detection
- ✅ Mobile: 60s dwell + 2 scrolls trigger
- ✅ Dual CTAs (Playbook or PDF)
- ✅ Session-based display limiting

#### CaseStudyStrip (`/src/components/CaseStudyStrip.tsx`)
- ✅ 3 case study cards with metrics
- ✅ Replaces founder self-testimonial
- ✅ Trust indicators (50+ companies, etc.)

#### FAQOptimized (`/src/components/FAQOptimized.tsx`)
- ✅ Reordered questions (speed, commitment, requirements first)
- ✅ 120-word answer limit
- ✅ Icons for key questions
- ✅ Accessible accordion implementation

#### ResultsPreview (`/src/components/ResultsPreview.tsx`)
- ✅ Personalized metrics based on company size/industry
- ✅ Visual timeline representation
- ✅ Goals alignment messaging

#### PricingBlock (`/src/components/PricingBlock.tsx`)
- ✅ Gated until after preview (Step 5)
- ✅ Savings table showing tool consolidation
- ✅ Net cost calculation
- ✅ Dual CTAs (engagement or email)

## 🚀 Implementation Guide

### 1. Environment Setup

Add to `.env.local`:
```env
# Calendly Integration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link

# Feature Flags (optional - defaults to true)
NEXT_PUBLIC_FLAG_SINGLE_PATH_HERO=true
NEXT_PUBLIC_FLAG_PROOF_STRIP_HERO=true
NEXT_PUBLIC_FLAG_MODAL_WIZARD_EMAIL_FIRST=true
NEXT_PUBLIC_FLAG_PRICE_GATE_POST_PREVIEW=true
NEXT_PUBLIC_FLAG_RISK_REVERSAL_BADGE=true
NEXT_PUBLIC_FLAG_STICKY_CTA=true
NEXT_PUBLIC_FLAG_EXIT_INTENT_OFFER=true
```

### 2. Replace Existing Page

To use the optimized version:
```tsx
// In src/app/page.tsx
import OptimizedHomePage from './page-optimized'

export default function Page() {
  return <OptimizedHomePage />
}
```

### 3. Testing Feature Flags

In browser console:
```javascript
// Override flags for testing
localStorage.setItem('featureFlags', JSON.stringify({
  single_path_hero: false,
  sticky_cta: false
  // etc...
}))

// Clear overrides
localStorage.removeItem('featureFlags')
```

### 4. Analytics Verification

Check events in console (development mode):
```javascript
// View tracked events
JSON.parse(sessionStorage.getItem('analyticsEvents'))
```

## 📊 Event Tracking

All events include common properties: `{utm, device, referrer, variant}`

### Tracked Events:
- `hero_cta_click` - Primary CTA clicks with variant
- `sticky_cta_view/click/close` - Sticky bar interactions
- `wizard_open/close` - Modal open/close
- `wizard_step_started/completed` - Each step progression
- `lead_created` - After email submission (Step 1)
- `preview_viewed` - Results preview shown
- `pricing_viewed` - Pricing block viewed
- `calendar_viewed` - Calendar step reached
- `call_booked` - Calendar appointment scheduled
- `exit_intent_shown/click` - Exit intent interactions
- `case_study_view` - Case study detail clicks

## 🧪 A/B Testing Variants

### CTA Button Text (3 variants):
- A: "Generate My Free Playbook"
- B: "See My 90-Day Plan"
- C: "Show Me the Opportunities"

### Headline Text (2 variants):
- A: "We'll put 8–12 qualified opportunities on your calendar in 90 days."
- B: "Install a predictable B2B growth engine—for less than ⅓ the cost of a Marketing Director."

## ✅ QA Checklist

- [ ] Hero shows single primary CTA
- [ ] Proof strip visible under headline
- [ ] Risk reversal badge appears
- [ ] Sticky CTA appears at 15% scroll
- [ ] Sticky CTA dismissal persists 24h
- [ ] Playbook modal opens and saves progress
- [ ] Email submission creates lead immediately
- [ ] Pricing only shows after Step 5 preview
- [ ] Exit intent triggers on mouse leave (desktop)
- [ ] Exit intent triggers after 60s + scrolls (mobile)
- [ ] Case studies replace founder quote
- [ ] FAQ questions in correct order
- [ ] All analytics events fire correctly
- [ ] No layout shift on modal open/close
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces all states

## 🎨 Accessibility Features

- ✅ ARIA labels and descriptions
- ✅ Focus trap in modals
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Minimum AA color contrast
- ✅ Reduced motion support
- ✅ Screen reader announcements
- ✅ Semantic HTML structure

## 🚦 Performance Optimizations

- Lazy loading for non-critical components
- Session/localStorage for state persistence
- Debounced scroll handlers
- Optimized animation frames (60fps)
- Prefetch wizard chunk on hero view
- Fixed body scroll lock (no layout shift)

## 📈 Success Metrics

### Primary KPIs:
- Homepage → Playbook Start: 40%
- Playbook Start → Completion: 75%
- Playbook → Email Capture: 80%
- Email → Strategy Call: 15%
- **Overall Homepage → Lead: ≥5%**

### Secondary KPIs:
- Page Load Time: <3 seconds
- Lighthouse Score: >95
- Mobile Conversion Rate: >5%
- Playbook Time-to-Complete: <60 seconds

## 🐛 Troubleshooting

### Feature not working?
1. Check feature flag is enabled
2. Verify environment variables
3. Clear localStorage/sessionStorage
4. Check browser console for errors

### Analytics not tracking?
1. Check console for event logs (dev mode)
2. Verify analytics integration (GA4/Segment)
3. Check sessionStorage for stored events

### Modal/Sticky CTA issues?
1. Check z-index conflicts
2. Verify scroll percentage calculation
3. Check localStorage for dismissal state

## 📝 Notes

- All components use Tailwind CSS with existing design tokens
- Framer Motion for animations (already in project)
- Full TypeScript with strict mode
- Mobile-first responsive design
- Dark luxury aesthetic maintained throughout

---

**Ready to ship!** All components are feature-flagged for safe deployment and A/B testing.