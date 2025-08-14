# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Red Sovereign Marketing Site

High-converting B2B SaaS marketing site with personalized 90-Day Growth Plan generator. Service: $7,500/month fractional growth team for $1M-$20M ARR B2B SaaS companies.

## Development Commands

```bash
# Development
npm run dev                 # Start Next.js dev server (default port 3000, may use 3001 if occupied)
npm run build              # Production build
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier
npm run format:check       # Check formatting
npm run typecheck          # TypeScript type checking

# Database (Supabase)
npm run supabase:test      # Test Supabase connection
npm run supabase:migrate   # Run database migrations
npm run supabase:tables    # List database tables
```

## Core Architecture

### Application Flow
```
Homepage → PlaybookModal → Data Collection → API Submission → Human Analysis (24hr)
    ↓           ↓              ↓                ↓                    ↓
HeroSection  5 Questions   Business Info   /api/playbook-submit  Custom Growth Plan
```

### Playbook Generator (Lead Capture)
- **Entry**: `/src/components/PlaybookModal.tsx` - Main wizard component
- **Questions Collected**:
  1. Company Name & Website URL (text inputs)
  2. TTM Revenue (dropdown: <$1M to $20M+)
  3. Current Growth Rate (dropdown: Declining to 100%+)
  4. Target Growth Rate (dropdown: 20-30% to 100%+)
  5. Biggest Challenge (dropdown: leads/conversion/cycles/strategy/resources)
- **Results**: `/src/components/ResultsPreview.tsx` - Shows deliverables promise
- **Submission**: `/src/app/api/playbook-submit/route.ts` - Logs data (Supabase integration pending)

### Key Components Structure
```
/src/components/
├── Navigation.tsx          # Main nav with sticky behavior
├── HeroSection.tsx         # "Growth That Pays for Itself" headline
├── ProblemSection.tsx      # "Is Your Marketing Budget a Coin Flip?"
├── FounderSection.tsx      # Nick Vossburg credibility quote
├── SolutionSection.tsx     # "One Move. Two Wins" value prop
├── SystemSection.tsx       # "Your Complete Growth Foundation"
├── ProposalSection.tsx     # "Your 90-Day ROI Plan—Free"
├── PlaybookSection.tsx     # Interactive playbook CTA
├── CTASection.tsx          # "Two Ways to Start" dual options
└── PlaybookModal.tsx       # Main lead capture wizard
```

### Analytics & Tracking
- **System**: `/src/lib/analytics.ts` - Event tracking wrapper
- **A/B Testing**: `/src/lib/ab-tests.ts` - Test variations management
- **Events**: Wizard open/close, step completion, lead creation
- **Session Recovery**: Stores incomplete playbook data in sessionStorage

### Supabase Integration
```
Tables:
- playbook_submissions  # Main lead data with business metrics
- waitlist             # Email list for marketing
- analytics_events     # User interaction tracking

Environment Variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Performance Requirements

- Lighthouse Score: > 95
- All animations: 60fps (GPU-accelerated via transform)
- Initial JS bundle: < 200KB
- Page load: < 3 seconds
- Use `useOptimizedAnimation` hook for device-aware animations

## Conversion KPIs

- Homepage → Playbook Start: 40%
- Playbook → Completion: 75%
- Playbook → Email Capture: 80%
- Email → Strategy Call: 15%
- Overall Homepage → Lead: 8%

## Important Implementation Notes

### Current Status
- Playbook form collects real business data (not auto-generated metrics)
- Promises human analysis within 24 hours
- API endpoint currently logs to console (Supabase connection needs fixing)
- All booking links use: `https://app.reclaim.ai/m/redsovereign`

### Copy Guidelines
- No em dashes in copy (use commas, colons, or periods)
- CTAs: "Book a Strategy Call" (not "Growth Audit" or "Quick Call")
- Primary CTA: "Show Me My 90-Day ROI Plan"
- Company positioning: "Growth That Pays for Itself"

### Design System
- Primary color: Gray-900 (#111827)
- Accent color: Red (use sparingly for key CTAs only)
- Background: White (#FFFFFF) and Gray-50 (#F9FAFB)
- All components use Framer Motion for animations
- Glassmorphism effects via custom CSS modules

### API Endpoints
- `/api/playbook-submit` - Receives playbook form submissions
- `/api/test-connection` - Tests Supabase connection
- `/api/analytics/*` - Analytics event tracking

## Known Issues & Next Steps

1. **Supabase Integration**: Connection to remote database needs configuration
2. **Email Notifications**: Resend integration pending for lead alerts
3. **PDF Generation**: Playbook PDF export not yet implemented
4. **Dashboard**: Admin view for managing submissions not built
5. **CRM Integration**: Webhook to external CRM systems needed

## Testing Approach

When testing the Playbook Generator:
1. Open modal from Hero or CTA sections
2. Complete all 5 questions with test data
3. Enter email to trigger submission
4. Check browser console for submission log
5. Verify success screen shows deliverables

## Production Deployment

```bash
# Build and verify
npm run build
npm run typecheck
npm run lint

# Deploy to Vercel
vercel --prod

# Required env vars in Vercel:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```