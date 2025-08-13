# Requirements Document - Red Sovereign Marketing Site

## Executive Summary
Build a high-converting B2B SaaS marketing site with an interactive lead generation tool (90-Day Growth Playbook Generator) that captures and qualifies leads without requiring account creation.

## Core Business Requirements

### Value Proposition
- **Service**: Fractional growth team for B2B SaaS companies
- **Price**: $7,500/month (less than 1/3 cost of Marketing Director)
- **Target Market**: B2B SaaS companies with $1M-$20M ARR
- **Key Differentiator**: Founder-led + AI-amplified + complete tech stack included

### Primary Conversion Flow
1. Homepage visit → Playbook Generator start (40% conversion target)
2. Playbook Generator start → Completion (75% conversion target)
3. Playbook completion → Email capture (80% conversion target)
4. Email capture → Strategy call booking (15% conversion target)
5. Overall: Homepage → Qualified lead (8% conversion target)

## Technical Requirements

### Performance Standards
- **Must complete playbook in under 60 seconds**
- **Must work without account creation**
- **Must show preview before email capture**
- **Must integrate with Supabase for storage**
- **Must track all interactions in GA4**
- Page load time < 3 seconds
- Lighthouse score > 95
- Initial JS bundle < 200KB
- All animations at 60fps
- Time to Interactive < 3.5s

### Playbook Generator Specifications

#### User Flow
1. 5 dropdown questions (no typing required)
2. Show live preview during question flow
3. Display partial results before email capture
4. Full playbook unlocked after email submission
5. PDF delivery via email
6. Follow-up nurture sequence triggered

#### Required Questions
1. **Company Size**: 1-10, 11-50, 51-200, 200+
2. **Industry**: SaaS, Services, Hardware, Other
3. **Monthly Marketing Spend**: <$5k, $5-15k, $15-50k, $50k+
4. **Primary Growth Channel**: Outbound, Inbound, Referrals, None
5. **Biggest Challenge**: Lead Gen, Conversion, Retention, Attribution

#### Output Requirements
- 90-day week-by-week growth plan
- Custom tool recommendations based on answers
- Expected outcomes timeline with milestones
- Investment ROI calculation
- Personalized tactics and strategies
- Implementation complexity scoring
- Resource requirements breakdown

### Data & Analytics Requirements

#### Supabase Integration
- Store all playbook submissions
- Track partial completions
- Save email captures with consent
- Store generated playbook data
- Track user journey stages
- Enable follow-up automation

#### GA4 Event Tracking
- Page views with scroll depth
- Playbook start event
- Each question answered
- Preview viewed event
- Email capture attempted
- Email capture successful
- PDF download triggered
- CTA clicks throughout site
- Time spent on each section
- A/B test variant exposure

### Page Structure Requirements

#### Homepage Sections
1. **Hero Section**
   - Compelling headline with gradient text
   - Floating metric cards with animations
   - Primary CTA to playbook generator
   - Founder credibility indicators

2. **Problem Section**
   - Three-column comparison table
   - Pain point identification
   - Animated check marks on scroll

3. **Solution Section**
   - Embedded playbook generator
   - Live preview component
   - Email capture with validation
   - Trust signals and security badges

4. **Social Proof Section**
   - Logo carousel (auto-scroll)
   - Testimonial cards (hover effects)
   - Exit badges with glow effects
   - Founder credentials

5. **System Section**
   - Process steps visualization
   - ROI calculator (interactive)
   - Tool comparison table
   - Cost savings breakdown

6. **FAQ Section**
   - Accordion with smooth animations
   - Most common objections addressed
   - Links to playbook generator

7. **CTA Section**
   - Dual CTAs (playbook vs call)
   - Urgency messaging
   - Gradient background

### Design System Requirements

#### Visual Standards
- Dark luxury aesthetic (Linear.app + Framer.com quality)
- Dark base color: #0A0A0B
- Gradient accents throughout
- Glassmorphic card effects
- Magnetic hover states on CTAs
- Smooth parallax scrolling

#### Typography
- Headlines: Inter Display
- Body text: Inter
- Data/Code: JetBrains Mono
- Responsive sizing scales

#### Animation Requirements
- All interactions < 300ms response
- 60fps on all animations
- Reduced motion for accessibility
- Mobile-optimized animations
- Progressive enhancement approach

### Mobile Requirements
- Full responsive design
- Touch-optimized interactions
- Reduced animations on mobile
- Optimized images for mobile
- Mobile conversion rate > 5%
- Thumb-friendly tap targets

### Email & Communication

#### Email Capture
- Inline validation
- Clear value proposition
- GDPR compliance checkbox
- Progressive disclosure
- Recovery email for abandonment

#### Email Delivery (via Resend)
- Instant playbook PDF delivery
- Custom branded template
- Follow-up sequence (3 emails)
- Calendar booking links
- Tracking pixels for engagement

### Security & Compliance
- HTTPS only
- GDPR compliant data collection
- Clear privacy policy
- Secure form submissions
- Rate limiting on API endpoints
- Input sanitization
- XSS protection

### A/B Testing Requirements
Tests to implement:
1. Headline variations (problem vs solution vs outcome)
2. CTA copy variations
3. Question count (5 vs 7)
4. Social proof placement
5. Pricing visibility

### Browser Support
- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 9+)

### SEO Requirements
- Server-side rendering for content
- Meta tags optimization
- Structured data markup
- XML sitemap
- Robots.txt configuration
- Core Web Vitals optimization
- OpenGraph tags
- Twitter cards

### Infrastructure Requirements
- Vercel deployment
- Edge functions for API
- Supabase for database
- Resend for emails
- GA4 for analytics
- GitHub for version control
- Automated CI/CD pipeline

## Success Criteria
1. 8% overall conversion rate (visitor to lead)
2. 60-second playbook completion time
3. 95+ Lighthouse score
4. < 3 second load time
5. 75% playbook completion rate
6. 80% email capture rate on completions
7. Zero account creation friction
8. 100% GA4 event coverage
9. Successful Supabase data persistence
10. Mobile conversion rate > 5%

## Launch Checklist
- [ ] All sections implemented and tested
- [ ] Playbook generator fully functional
- [ ] Email delivery tested and verified
- [ ] Analytics tracking confirmed
- [ ] A/B tests configured
- [ ] Mobile experience optimized
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] GDPR compliance verified
- [ ] Load testing completed
- [ ] Error monitoring active
- [ ] Backup systems tested
- [ ] Documentation complete
- [ ] Team training done
- [ ] Launch announcement ready