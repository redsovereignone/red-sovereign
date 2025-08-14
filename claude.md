# Claude.md - Red Sovereign Marketing Site

## Project Overview
High-converting B2B SaaS marketing site with interactive lead generation tool
Target Launch: 30 days
Tech Stack: Next.js 14, TypeScript, Tailwind, Framer Motion, Supabase
Design Standard: Linear.app + Framer.com + Jasper.ai quality

## Business Context
- **Service**: Fractional growth team for B2B SaaS companies
- **Price Point**: $7,500/month 
- **Target Market**: B2B SaaS companies, $1M-$20M ARR
- **Founder**: Nick Vossburg (6 exits, bootstrapped to millions)
- **Key Differentiator**: Founder-led + AI-amplified + complete tech stack included
- **Value Prop**: Predictable revenue engine for 1/3 cost of Marketing Director

## Critical Success Metrics
```yaml
Primary KPIs:
  Homepage → Playbook Start: 40%
  Playbook Start → Completion: 75%
  Playbook → Email Capture: 80%
  Email → Strategy Call: 15%
  Overall Homepage → Qualified Lead: 8%

Secondary KPIs:
  Page Load Time: < 3 seconds
  Lighthouse Score: > 95
  Mobile Conversion Rate: > 5%
  Playbook Time-to-Complete: < 60 seconds
Primary User Journey
mermaidHomepage → Playbook Generator → Email Capture → PDF Delivery → Nurture Sequence → Strategy Call
                    ↓                               ↓
            [Preview First]                 [Recovery Email]
Design System Requirements

Aesthetic: Dark luxury (Linear's elegance + Framer's innovation)
Color Palette: Dark base (#0A0A0B) with gradient accents
Typography: Inter Display (headlines) + Inter (body) + JetBrains Mono (data)
Animations: Every interaction under 300ms, all animations 60fps
Components: Glassmorphic cards, gradient meshes, magnetic CTAs
Mobile: Full responsive, touch-optimized, reduced animations

Agent Architecture
yamlAgents:
  master-architect:
    - Owns: Overall vision, coordination
    - KPI: Project delivery on time
  
  design-system:
    - Owns: Visual design, animations
    - KPI: 95+ Lighthouse, 60fps animations
  
  playbook-engine:
    - Owns: Generator logic, personalization
    - KPI: 75% completion rate
  
  conversion-optimizer:
    - Owns: Copy, CTAs, A/B tests
    - KPI: 8% visitor → lead conversion
  
  performance-engineer:
    - Owns: Speed, optimization
    - KPI: < 3s load, < 200KB initial bundle
  
  analytics-architect:
    - Owns: Tracking, reporting
    - KPI: 100% event coverage
MCP Server Configuration
yamlActive Servers:
  filesystem: Default file operations
  github: Version control, issue tracking
  supabase: Lead storage, analytics
  playwright: Automated testing
  vercel: Deployment, previews
  resend: Email delivery
  google-analytics: Conversion tracking
Playbook Generator Specifications
typescriptinterface PlaybookGenerator {
  // 5 Required Questions (dropdowns only)
  questions: {
    1: "Company Size" // 1-10, 11-50, 51-200, 200+
    2: "Industry" // SaaS, Services, Hardware, Other
    3: "Monthly Marketing Spend" // <$5k, $5-15k, $15-50k, $50k+
    4: "Primary Growth Channel" // Outbound, Inbound, Referrals, None
    5: "Biggest Challenge" // Lead Gen, Conversion, Retention, Attribution
  }
  
  // Progressive disclosure
  flow: "Show preview → Capture email → Full playbook → PDF delivery"
  
  // Personalization based on answers
  output: {
    - 90-day week-by-week plan
    - Custom tool recommendations
    - Expected outcomes timeline
    - Investment ROI calculation
  }
}
Component Hierarchy
<App>
  <GradientMeshBackground />
  <Navigation sticky magnetic-links />
  <HeroSection parallax gradient-text>
    <FloatingMetricCards animated />
    <MagneticCTA primary />
  </HeroSection>
  
  <ProblemSection scroll-reveal>
    <ComparisonTable animated-checks />
  </ProblemSection>
  
  <SolutionSection>
    <PlaybookGenerator glass-morphic>
      <QuestionFlow animated />
      <LivePreview syntax-highlight />
      <EmailCapture inline-validation />
    </PlaybookGenerator>
  </SolutionSection>
  
  <SocialProofSection>
    <LogoCarousel auto-scroll />
    <TestimonialCards hover-expand />
    <ExitBadges glow-effect />
  </SocialProofSection>
  
  <SystemSection>
    <ProcessSteps connected-animation />
    <ROICalculator live-update />
    <ToolComparison animated />
  </SystemSection>
  
  <FAQSection>
    <AccordionItems smooth-collapse />
  </FAQSection>
  
  <CTASection gradient-background>
    <DualCTAs playbook | call />
  </CTASection>
</App>
Implementation Priorities
Week 1: Foundation

 Set up Next.js with all dependencies
 Create design system with tokens
 Build component library
 Implement responsive grid
 Set up MCP servers

Week 2: Core Features

 Build Playbook Generator
 Implement email capture/delivery
 Create ROI calculator
 Add comparison tables
 Set up analytics

Week 3: Polish & Optimize

 Add all animations
 Implement A/B testing
 Performance optimization
 Cross-browser testing
 Mobile optimization

Week 4: Launch Prep

 Content review
 SEO optimization
 Load testing
 Security audit
 Deployment setup

A/B Tests to Run

Headline: Problem vs Solution vs Outcome
CTA Copy: "Get Your Playbook" vs "See Your Plan" vs "Start Growing"
Playbook Questions: 5 vs 7 questions
Social Proof: Logos vs Testimonials above fold
Pricing: Show price vs Request pricing

File Naming Conventions
Components: PascalCase.tsx
Utilities: kebab-case.ts
Styles: component-name.module.css
Tests: component.test.tsx
Types: types/component-name.ts
Git Workflow
bashmain → development → feature/[agent-name]/[feature]
All PRs require:
- Passing tests
- Lighthouse > 95
- Agent approval
- No console.logs
Performance Budget
yamlMetrics:
  First Contentful Paint: < 1.5s
  Largest Contentful Paint: < 2.5s
  Time to Interactive: < 3.5s
  Cumulative Layout Shift: < 0.1
  First Input Delay: < 100ms
  
Bundle:
  Initial JS: < 200KB
  Initial CSS: < 50KB
  Total Page Weight: < 2MB
  Image Budget: < 1MB
Emergency Contacts
yamlErrors: Check Vercel logs
Performance: Run Lighthouse audit  
Conversions: Check GA4 real-time
Email Issues: Check Resend dashboard
Database: Supabase dashboard
Deploy Issues: Vercel dashboard

Quality Standards

No component without loading/error states
No animation without 60fps verification
No copy without conversion consideration
No feature without analytics events
No deployment without testing
No optimization without measurement

Remember
This is a $7,500/month service. Every pixel should reflect that premium positioning. When in doubt, reference Linear.app for elegance, Framer.com for innovation, and Jasper.ai for personality.