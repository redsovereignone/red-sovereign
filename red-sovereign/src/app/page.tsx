'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import FounderSection from '@/components/FounderSection'
import SolutionSection from '@/components/SolutionSection'
import SystemSection from '@/components/SystemSection'
import ProposalSection from '@/components/ProposalSection'
import PlaybookSection from '@/components/PlaybookSection'
import FAQOptimized from '@/components/FAQOptimized'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import PlaybookModal from '@/components/PlaybookModal'
import StickyCTA from '@/components/StickyCTA'
import ExitIntentModal from '@/components/ExitIntentModal'
import RecoveryBanner from '@/components/RecoveryBanner'
import ExitIntent from '@/components/ExitIntent'
import { isFeatureEnabled } from '@/lib/flags'

export default function HomePage() {
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false)
  const [hasLeadBeenCreated, setHasLeadBeenCreated] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)

  // Check if user is already a lead
  useEffect(() => {
    const isLead = sessionStorage.getItem('isLead') === 'true'
    setHasLeadBeenCreated(isLead)
  }, [])

  // Smooth scroll handler
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const id = target.getAttribute('href')?.slice(1)
        if (id) {
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }

    document.addEventListener('click', handleSmoothScroll)
    return () => document.removeEventListener('click', handleSmoothScroll)
  }, [])

  // Enhanced exit intent detection for Playbook abandonment
  useEffect(() => {
    let hasBeenOnPageLongEnough = false
    let exitIntentTimeout: NodeJS.Timeout
    
    // Wait 15 seconds before enabling exit intent
    const enableTimer = setTimeout(() => {
      hasBeenOnPageLongEnough = true
    }, 15000) // 15 seconds minimum time on page
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if user has been on page for at least 15 seconds
      if (!hasBeenOnPageLongEnough) return
      
      // Check if there's incomplete playbook data
      const playbookData = sessionStorage.getItem('playbookWizardData')
      const hasIncomplete = playbookData && !hasLeadBeenCreated
      
      // Trigger exit intent if leaving viewport from top and has incomplete session
      // Increased threshold to 50px to reduce sensitivity
      if (e.clientY <= 50 && hasIncomplete && !isPlaybookOpen && !showExitIntent) {
        // Add a 500ms delay to prevent accidental triggers
        exitIntentTimeout = setTimeout(() => {
          setShowExitIntent(true)
        }, 500)
      }
    }
    
    const handleMouseEnter = () => {
      // Cancel exit intent if mouse comes back
      if (exitIntentTimeout) {
        clearTimeout(exitIntentTimeout)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(enableTimer)
      if (exitIntentTimeout) clearTimeout(exitIntentTimeout)
    }
  }, [hasLeadBeenCreated, isPlaybookOpen, showExitIntent])

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
    <main className="relative min-h-screen bg-[#FAFAF8] text-[#0F172A] overflow-x-hidden">
      {/* Remove dark gradient background for clean editorial look */}
      
      {/* Recovery Banner for incomplete sessions */}
      <RecoveryBanner onResume={handleOpenPlaybook} />
      
      <Navigation onOpenPlaybook={handleOpenPlaybook} />
      
      {/* Clean Editorial Hero with single CTA and stat strip */}
      <HeroSection onOpenPlaybook={handleOpenPlaybook} />
      
      <ProblemSection />
      
      {/* Founder credibility and quote */}
      <FounderSection />
      
      <SolutionSection />
      <SystemSection />
      <ProposalSection onOpenPlaybook={handleOpenPlaybook} />
      <PlaybookSection onOpenPlaybook={handleOpenPlaybook} />
      
      {/* Optimized FAQ with reordered questions */}
      <FAQOptimized />
      
      <CTASection onOpenPlaybook={handleOpenPlaybook} />
      <Footer />

      {/* Playbook Modal - 5 questions with progressive disclosure */}
      <PlaybookModal 
        isOpen={isPlaybookOpen}
        onClose={handleClosePlaybook}
        onLeadCreated={handleLeadCreated}
      />

      {/* Sticky CTA - appears after 15% scroll */}
      {isFeatureEnabled('sticky_cta') && (
        <StickyCTA 
          onCTAClick={handleOpenPlaybook}
          isModalOpen={isPlaybookOpen}
        />
      )}

      {/* Exit Intent for incomplete Playbooks */}
      <ExitIntent
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
        onContinue={() => {
          setShowExitIntent(false)
          handleOpenPlaybook()
        }}
      />

      {/* Original Exit Intent Modal for general offers */}
      {isFeatureEnabled('exit_intent_offer') && !hasLeadBeenCreated && !showExitIntent && (
        <ExitIntentModal onOpenPlaybook={handleOpenPlaybook} />
      )}
    </main>
  )
}