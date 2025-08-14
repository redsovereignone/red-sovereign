'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HeroSectionProps {
  onOpenPlaybook?: () => void
}

// Growth line component - represents upward trajectory
const GrowthLine = ({ delay = 0, startX = 0 }: { delay?: number, startX?: number }) => {
  return (
    <motion.div
      className="absolute bottom-0 w-0.5 bg-gradient-to-t from-red-500/20 to-transparent"
      style={{ left: `${startX}%` }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: ['0%', '100%', '100%', '0%'],
        opacity: [0, 0.3, 0.3, 0],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Ascending particle - represents growth metrics
const AscendingMetric = ({ delay = 0 }: { delay?: number }) => {
  const startX = Math.random() * 100
  const endX = startX + (Math.random() - 0.5) * 30
  
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${startX}%` }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [-20, -window.innerHeight - 100],
        x: [0, endX - startX],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1], // Custom easing for acceleration
      }}
    >
      <div className="relative">
        {/* Glowing dot */}
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        {/* Trail effect */}
        <motion.div 
          className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-t from-red-500/30 to-transparent"
          animate={{ opacity: [0.5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}

export default function HeroSection({ onOpenPlaybook }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleCTAClick = () => {
    if (onOpenPlaybook) {
      onOpenPlaybook()
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white py-32 md:py-40 overflow-hidden">
      {/* Growth chart grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef44441a_1px,transparent_1px),linear-gradient(to_bottom,#ef44441a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Ascending growth lines */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Vertical growth lines */}
          {[...Array(8)].map((_, i) => (
            <GrowthLine 
              key={`line-${i}`} 
              delay={i * 1.2} 
              startX={10 + i * 12}
            />
          ))}
          
          {/* Ascending metrics/particles */}
          {[...Array(15)].map((_, i) => (
            <AscendingMetric key={`metric-${i}`} delay={i * 0.8} />
          ))}
        </div>
      )}

      {/* Diagonal growth rays emanating from center */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={`ray-${i}`}
              className="absolute w-[1000px] h-0.5 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
              style={{
                transform: `rotate(${i * 60}deg)`,
                transformOrigin: 'center',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Accelerating growth curve */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.path
          d="M 0,100 Q 20,95 40,85 T 80,50 T 100,0"
          fill="none"
          stroke="url(#growth-gradient)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />
        <defs>
          <linearGradient id="growth-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-gray-900">
            Growth That Pays for Itself
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mt-6 mb-12 max-w-3xl mx-auto">
            Cut the guesswork and the gimmicks. Get a complete growth engine: team, process, and tech built to deliver a measurable return, not marketing theater.
          </p>

          {/* Single Primary CTA */}
          <motion.button
            onClick={handleCTAClick}
            className="relative inline-flex h-12 items-center gap-2 rounded-xl bg-gray-900 px-7 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 group overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Red accent on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Show Me My 90-Day ROI Plan</span>
          </motion.button>

          {/* Secondary link with animated arrow */}
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <a 
              href="https://app.reclaim.ai/m/redsovereign" 
              className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 inline-flex items-center gap-1 group"
            >
              Book a Strategy Call 
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}