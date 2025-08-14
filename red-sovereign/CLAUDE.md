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

# Code Quality (REQUIRED before any commit)
npm run lint               # Run ESLint - MUST pass with zero errors
npm run typecheck          # TypeScript type checking - MUST pass with zero errors
npm run format             # Format with Prettier
npm run format:check       # Check formatting

# Database (Supabase)
npm run supabase:test      # Test Supabase connection
npm run supabase:migrate   # Run database migrations
npm run supabase:tables    # List database tables

# Performance Testing
node scripts/lighthouse-test.js    # Run Lighthouse audit
node scripts/test-performance.js   # Test runtime performance
node scripts/analyze-performance.js # Analyze bundle and metrics
```

## Project Structure & Architecture

### Monorepo Structure
This is a monorepo with the main Next.js app in `/red-sovereign`. The root `vercel.json` handles deployment configuration:
```json
{
  "buildCommand": "cd red-sovereign && npm run lint && npm run typecheck && npm run build",
  "installCommand": "cd red-sovereign && npm install",
  "outputDirectory": "red-sovereign/.next"
}
```

**Note**: Build command runs linting and type checking before build to ensure code quality.

### Application Flow
```
Homepage → PlaybookModal → Data Collection → API Submission → Human Analysis (24hr)
    ↓           ↓              ↓                ↓                    ↓
HeroSection  5 Questions   Business Info   /api/playbook-submit  Custom Growth Plan
```

### Core Systems

#### Playbook Generator (Lead Capture)
- **Entry**: `/src/components/PlaybookModal.tsx` - Main wizard component
- **Questions Collected**:
  1. Company Name & Website URL (text inputs)
  2. TTM Revenue (dropdown: <$1M to $20M+)
  3. Current Growth Rate (dropdown: Declining to 100%+)
  4. Target Growth Rate (dropdown: 20-30% to 100%+)
  5. Biggest Challenge (dropdown: leads/conversion/cycles/strategy/resources)
- **Results**: `/src/components/ResultsPreview.tsx` - Shows deliverables promise
- **Submission**: `/src/app/api/playbook-submit/route.ts` - Stores in Supabase

#### Analytics & Tracking
- **System**: `/src/lib/analytics.ts` - Event tracking wrapper with `trackEvent` method
- **A/B Testing**: `/src/lib/ab-tests.ts` - Test variations management
- **Performance**: `/src/lib/performance-monitor.ts` - Core Web Vitals tracking
- **Session Recovery**: Stores incomplete playbook data in sessionStorage via `/src/hooks/useSessionRecovery.ts`

#### Design System
- **Tokens**: `/src/styles/design-tokens.ts` - White-led editorial design with red accents
- **Animation Hook**: `/src/hooks/useOptimizedAnimation.ts` - Device-aware 60fps animations
- **Components**: Framer Motion for all animations, glassmorphism effects
- **Typography**: Inter (body) + JetBrains Mono (data)

#### Database Schema (Supabase)
```sql
Tables:
- playbook_submissions  # Lead data with business metrics
- waitlist             # Email list for marketing
- analytics_events     # User interaction tracking

Key columns in playbook_submissions:
- company_name, website_url, contact_email
- ttm_revenue, current_growth_rate, target_growth_rate
- biggest_challenge, playbook_data (JSONB)
- pdf_url, email_sent (tracking)
```

### API Endpoints
- `/api/playbook-submit` - Receives playbook form submissions
- `/api/test-connection` - Tests Supabase connection
- `/api/test-email` - Tests Resend email integration
- `/api/debug-env` - Debug environment variables (dev only)
- `/api/test-submission` - Manual submission testing

## Environment Configuration

Required environment variables:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL       # Public Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Public anonymous key
SUPABASE_SERVICE_ROLE_KEY      # Service role key for server operations

# Email (Resend)
RESEND_API_KEY                 # Resend API key for transactional emails

# Feature Flags (all optional, default to false)
NEXT_PUBLIC_FLAG_SINGLE_PATH_HERO
NEXT_PUBLIC_FLAG_PROOF_STRIP_HERO
NEXT_PUBLIC_FLAG_MODAL_WIZARD_EMAIL_FIRST
NEXT_PUBLIC_FLAG_PRICE_GATE_POST_PREVIEW
NEXT_PUBLIC_FLAG_RISK_REVERSAL_BADGE
NEXT_PUBLIC_FLAG_STICKY_CTA
NEXT_PUBLIC_FLAG_EXIT_INTENT_OFFER
```

## Performance Requirements & Monitoring

- **Lighthouse Score**: > 95 (test with `node scripts/lighthouse-test.js`)
- **All animations**: 60fps via GPU-accelerated transforms
- **Initial JS bundle**: < 200KB
- **Page load**: < 3 seconds
- **Core Web Vitals**: Monitored via `/src/lib/performance-monitor.ts`

## Conversion KPIs & Tracking

Target metrics:
- Homepage → Playbook Start: 40%
- Playbook → Completion: 75%
- Playbook → Email Capture: 80%
- Email → Strategy Call: 15%
- Overall Homepage → Lead: 8%

Events tracked in `/src/lib/analytics.ts`:
- `wizardOpen`, `wizardClose`, `wizardStepCompleted`
- `leadCreated`, `previewViewed`, `bookCallClicked`
- `heroCTAClick`, `stickyCTAView`, `exitIntentShown`

## Code Quality Standards (MANDATORY)

### Before ANY Code Changes
1. **Always run linting first**: `npm run lint` - Fix all errors before making changes
2. **Always run type checking**: `npm run typecheck` - Ensure no TypeScript errors
3. **Never commit code with linting or TypeScript errors**

### Code Quality Checklist
- [ ] No ESLint errors or warnings (`npm run lint` passes clean)
- [ ] No TypeScript errors (`npm run typecheck` passes clean)
- [ ] No `any` types - use proper TypeScript types or `unknown` with type guards
- [ ] No unescaped entities in React - use HTML entities (`&apos;`, `&quot;`, etc.)
- [ ] No unused variables or imports - remove or prefix with `_` if required
- [ ] All `useEffect` hooks have proper dependency arrays
- [ ] Proper error handling with typed catch blocks

### Common Fixes
- **Unescaped entities**: Replace `'` with `&apos;` and `"` with `&quot;`
- **Unused variables**: Remove or prefix with `_` (e.g., `_unusedVar`)
- **Any types**: Replace with specific types or `Record<string, unknown>`
- **Missing deps**: Add to dependency array or use eslint-disable comment with justification

## Build & Deployment Configuration

### Next.js Config
- ESLint: **ENFORCED during builds** (`ignoreDuringBuilds: false`)
- TypeScript: **Strict checking enabled** (`ignoreBuildErrors: false`)
- Images: Unoptimized for simplicity
- React Strict Mode: Enabled

### Vercel Deployment
- Monorepo structure requires root `vercel.json` to specify subdirectory
- TypeScript validation runs before build
- API functions have 30-second timeout limit

## Copy & Content Guidelines

- **No em dashes** in copy (use commas, colons, or periods)
- **CTAs**: "Book a Strategy Call" (not "Growth Audit" or "Quick Call")
- **Primary CTA**: "Show Me My 90-Day ROI Plan"
- **Company positioning**: "Growth That Pays for Itself"
- **Booking URL**: `https://app.reclaim.ai/m/redsovereign`

## Testing Procedures

### Playbook Generator Testing
1. Open modal from Hero or CTA sections
2. Complete all 5 questions with test data
3. Enter email to trigger submission
4. Check browser console for submission log
5. Verify success screen shows deliverables

### Database Testing
```bash
npm run supabase:test      # Test connection
npm run supabase:tables    # List tables
node scripts/check-submissions.mjs  # Check submissions
```

## Common Issues & Solutions

1. **Supabase Connection**: Ensure all three env vars are set correctly
2. **Build Failures**: Run `npm run lint && npm run typecheck` locally before deploying
3. **Linting Errors**: Fix immediately - builds will fail if linting fails
4. **TypeScript Errors**: Fix immediately - builds will fail if type checking fails
5. **Animation Performance**: Use `useOptimizedAnimation` hook for all animations
6. **Email Delivery**: Check Resend API key and `/api/test-email` endpoint

## Scripts Reference

Database management:
- `scripts/supabase-admin.js` - Main database management tool
- `scripts/init-database.mjs` - Initialize database schema
- `scripts/run-migrations.js` - Run SQL migrations
- `scripts/check-submissions.mjs` - View playbook submissions

Performance testing:
- `scripts/lighthouse-test.js` - Automated Lighthouse audits
- `scripts/test-performance.js` - Runtime performance checks
- `scripts/analyze-performance.js` - Bundle analysis

Testing utilities:
- `scripts/test-ctas.mjs` - Test CTA variations
- `scripts/test-start-over.mjs` - Test restart functionality