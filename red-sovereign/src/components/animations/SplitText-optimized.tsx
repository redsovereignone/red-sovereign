'use client'

import { motion, Variants } from 'framer-motion'
import React, { useMemo } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  gradient?: boolean
  gradientColors?: string
  reduceMotion?: boolean
}

// Use GPU-accelerated properties only
const charVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translateY(50px) rotateX(-90deg)',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0) rotateX(0)',
  },
}

// Memoized character component to prevent re-renders
const AnimatedChar = React.memo(({ 
  char, 
  index, 
  delay, 
  duration, 
  stagger 
}: {
  char: string
  index: number
  delay: number
  duration: number
  stagger: number
}) => (
  <motion.span
    className="inline-block will-change-transform"
    style={{ 
      transformOrigin: 'bottom',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden', // Prevent flickering
    }}
    variants={charVariants}
    transition={{
      duration,
      delay: delay + index * stagger,
      ease: [0.215, 0.61, 0.355, 1],
      // Use spring physics for smoother animation
      type: 'spring',
      damping: 20,
      stiffness: 100,
    }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
))

AnimatedChar.displayName = 'AnimatedChar'

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  gradient = false,
  gradientColors = 'from-white to-gray-300',
  reduceMotion = false,
}: SplitTextProps) {
  // Memoize character array to prevent recalculation
  const characters = useMemo(() => children.split(''), [children])
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false
    
  const shouldReduceMotion = reduceMotion || prefersReducedMotion

  // If reduced motion is preferred, render without animation
  if (shouldReduceMotion) {
    return (
      <span 
        className={`inline-block ${gradient ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` : ''} ${className}`}
      >
        {children}
      </span>
    )
  }

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={`inline-block ${gradient ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` : ''} ${className}`}
      style={{ 
        perspective: '1000px',
        // Add will-change for the container
        willChange: 'transform',
      }}
    >
      {characters.map((char, index) => (
        <AnimatedChar
          key={`${char}-${index}`}
          char={char}
          index={index}
          delay={delay}
          duration={duration}
          stagger={stagger}
        />
      ))}
    </motion.span>
  )
}