'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSectionOptimized from '@/components/HeroSectionOptimized'
import ProblemSection from '@/components/ProblemSection'
import CaseStudyStrip from '@/components/CaseStudyStrip'
import SolutionSection from '@/components/SolutionSection'
import SystemSection from '@/components/SystemSection'
import FAQOptimized from '@/components/FAQOptimized'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import PlaybookModal from '@/components/PlaybookModal'
import StickyCTA from '@/components/StickyCTA'
import ExitIntentModal from '@/components/ExitIntentModal'
import { isFeatureEnabled } from '@/lib/flags'

export default function OptimizedHomePage() {
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false)
  const [hasLeadBeenCreated, setHasLeadBeenCreated] = useState(false)

  // Check if user is already a lead
  useEffect(() => {
    const isLead = sessionStorage.getItem('isLead') === 'true'
    setHasLeadBeenCreated(isLead)
  }, [])

  const handleOpenPlaybook = () => {
    setIsPlaybookOpen(true)
  }

  const handleClosePlaybook = () => {
    setIsPlaybookOpen(false)
  }

  const handleLeadCreated = () => {
    setHasLeadBeenCreated(true)
    sessionStorage.setItem('isLead', 'true')
  }

  return (
    <main className="relative min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0B]" />
        <svg 
          className="absolute inset-0 h-full w-full" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mesh-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#166534" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="mesh-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#14532d" stopOpacity="0.05" />
            </linearGradient>
            <filter id="mesh-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="100" />
            </filter>
          </defs>
          <ellipse 
            cx="20%" 
            cy="30%" 
            rx="40%" 
            ry="30%" 
            fill="url(#mesh-gradient-1)" 
            filter="url(#mesh-blur)"
            className="animate-float-slow"
          />
          <ellipse 
            cx="70%" 
            cy="60%" 
            rx="35%" 
            ry="40%" 
            fill="url(#mesh-gradient-2)" 
            filter="url(#mesh-blur)"
            className="animate-float-medium"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/50" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section with single CTA */}
      <HeroSectionOptimized onOpenPlaybook={handleOpenPlaybook} />

      {/* Problem Section */}
      <ProblemSection />

      {/* Case Studies (replaces founder quote) */}
      <CaseStudyStrip />

      {/* Solution Section */}
      <SolutionSection />

      {/* System Section */}
      <SystemSection />

      {/* FAQ with reordered questions */}
      <FAQOptimized />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />

      {/* Playbook Modal */}
      <PlaybookModal 
        isOpen={isPlaybookOpen}
        onClose={handleClosePlaybook}
        onLeadCreated={handleLeadCreated}
      />

      {/* Sticky CTA (appears after scroll) */}
      {isFeatureEnabled('sticky_cta') && (
        <StickyCTA 
          onCTAClick={handleOpenPlaybook}
          isModalOpen={isPlaybookOpen}
        />
      )}

      {/* Exit Intent Modal */}
      {isFeatureEnabled('exit_intent_offer') && !hasLeadBeenCreated && (
        <ExitIntentModal onOpenPlaybook={handleOpenPlaybook} />
      )}
    </main>
  )
}