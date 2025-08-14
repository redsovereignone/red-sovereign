'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { TrendingUp, Users, DollarSign, Shield, ChevronRight } from 'lucide-react'
import DynamicOrbs from '@/components/backgrounds/DynamicOrbs'
import { analytics } from '@/lib/analytics'
import { 
  isFeatureEnabled, 
  getCTAVariant, 
  getHeadlineVariant 
} from '@/lib/flags'

interface HeroSectionProps {
  onOpenPlaybook: () => void;
}

const exitCompanies = [
  {
    name: 'TechAssist',
    logo: '/logos/techAssist.gif',
    width: 120,
    height: 40
  },
  {
    name: 'CloudBearing',
    logo: '/logos/cloudbearinglogo.png',
    width: 140,
    height: 40
  },
  {
    name: 'FrozenCPU',
    logo: '/logos/1 - Logo horizontal 1 - PNG (transparente background).png',
    width: 120,
    height: 40
  },
  {
    name: 'Wellforce',
    logo: '/logos/wellforcelogo.svg',
    width: 130,
    height: 40
  },
  {
    name: 'Sovereign AI',
    logo: '/logos/sovereign-ai7-final.jpg',
    width: 120,
    height: 40
  }
]

const proofMetrics = [
  {
    icon: <Users className="w-5 h-5 text-red-400" />,
    metric: '1,000',
    label: 'targeted contacts/month'
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-red-400" />,
    metric: '8–12',
    label: 'qualified opportunities in 90 days'
  },
  {
    icon: <DollarSign className="w-5 h-5 text-red-400" />,
    metric: '$2,263/mo',
    label: 'average tool savings'
  }
]

export default function HeroSectionOptimized({ onOpenPlaybook }: HeroSectionProps) {
  const [personalizedText, setPersonalizedText] = useState<string>('')
  const ctaVariant = getCTAVariant()
  const headlineVariant = getHeadlineVariant()

  useEffect(() => {
    // Get UTM parameters for personalization
    const params = new URLSearchParams(window.location.search)
    const industry = params.get('utm_industry')
    
    if (industry) {
      const industryMap: Record<string, string> = {
        devtools: 'for Dev-Tool Startups',
        saas: 'for B2B SaaS Companies',
        fintech: 'for FinTech Companies',
        healthtech: 'for HealthTech Startups',
      }
      setPersonalizedText(industryMap[industry.toLowerCase()] || '')
    }
  }, [])

  const handleCTAClick = () => {
    analytics.heroCTAClick(ctaVariant.variant)
    onOpenPlaybook()
  }

  const handleSecondaryClick = () => {
    analytics.trackEvent('hero_secondary_cta_click', { action: 'talk_to_founder' })
    // Navigate to calendar
    window.location.href = '#calendar'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Animated Background */}
      <DynamicOrbs />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-red-500/10 to-red-400/10 border border-red-500/20 rounded-full text-sm text-red-400 font-medium">
              Founder-Led + AI-Amplified Growth {personalizedText}
            </span>
          </motion.div>

          {/* Dynamic Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {headlineVariant.text}
            </span>
          </h1>

          {/* Proof Strip (if enabled) */}
          {isFeatureEnabled('proof_strip_hero') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8"
            >
              {proofMetrics.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <div className="text-left">
                    <span className="text-lg font-bold text-white">{item.metric}</span>
                    <span className="text-sm text-gray-400 ml-1">{item.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          <motion.p
            className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Red Sovereign installs a predictable revenue engine in your B2B company. 
            Your complete growth team, amplified by AI, for less than 1/3 the cost 
            of a Marketing Director.
          </motion.p>

          {/* Single Primary CTA */}
          <motion.div
            className="flex flex-col items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <button
                onClick={handleCTAClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaVariant.text}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </button>
              
              {/* Risk Reversal Badge */}
              {isFeatureEnabled('risk_reversal_badge') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Shield className="w-3 h-3 text-green-400" />
                    Miss the goal? Next month's on us.
                  </div>
                </motion.div>
              )}
            </div>
            
            <p className="text-sm text-gray-500 mt-2">
              Takes ~60 seconds. No call required.
            </p>

            {/* Secondary CTA (de-emphasized) */}
            <button
              onClick={handleSecondaryClick}
              className="text-gray-400 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Talk to a Founder →
            </button>
          </motion.div>

          {/* Company Logos */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-400 uppercase tracking-wider text-center mb-4">
              Built by Founders Who&apos;ve Scaled and Exited B2B Companies:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
              {exitCompanies.map((company, index) => (
                <motion.div
                  key={company.name}
                  className="relative opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    className="object-contain"
                    loading="eager"
                  />
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <span className="font-semibold text-white">Combined portfolio:</span> Multiple successful exits | Bootstrapped to millions in revenue
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}