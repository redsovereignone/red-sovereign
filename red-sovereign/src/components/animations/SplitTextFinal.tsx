'use client'

import { motion, useReducedMotion, Variants, useInView } from 'framer-motion'
import React, { useMemo, useRef, useCallback, useEffect } from 'react'

// Design system tokens
const DESIGN_TOKENS = {
  gradients: {
    primary: 'from-white via-gray-100 to-gray-300',
    accent: 'from-red-500 via-red-400 to-red-300',
    premium: 'from-yellow-200 via-yellow-300 to-yellow-400',
  },
  easings: {
    smooth: [0.215, 0.61, 0.355, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
  },
  performance: {
    maxAnimationDuration: 600,
    minFPS: 58,
    maxCharacters: 100,
  },
} as const

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  gradient?: keyof typeof DESIGN_TOKENS.gradients | false
  customGradient?: string
  easing?: keyof typeof DESIGN_TOKENS.easings
  onAnimationComplete?: () => void
  triggerOnView?: boolean
  viewOffset?: number
}

// GPU-accelerated transforms only
const charVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translate3d(0, 40px, 0) rotateX(-90deg) scale(0.9)',
  },
  visible: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) rotateX(0deg) scale(1)',
  },
}

// Memoized character component with performance optimizations
const AnimatedChar = React.memo(({ 
  char, 
  index, 
  delay, 
  duration, 
  stagger,
  easing,
  onAnimationComplete,
  isLastChar
}: {
  char: string
  index: number
  delay: number
  duration: number
  stagger: number
  easing: readonly [number, number, number, number]
  onAnimationComplete?: () => void
  isLastChar: boolean
}) => (
  <motion.span
    className="inline-block"
    style={{ 
      // Performance optimizations
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden',
      transformOrigin: '50% 100%',
      transformStyle: 'preserve-3d',
      // Prevent text selection during animation
      userSelect: 'none',
      WebkitUserSelect: 'none',
    }}
    variants={charVariants}
    transition={{
      duration,
      delay: delay + (index * stagger),
      ease: easing,
    }}
    onAnimationComplete={isLastChar ? onAnimationComplete : undefined}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
), (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return prevProps.char === nextProps.char && 
         prevProps.index === nextProps.index &&
         prevProps.delay === nextProps.delay &&
         prevProps.duration === nextProps.duration &&
         prevProps.stagger === nextProps.stagger
})

AnimatedChar.displayName = 'AnimatedChar'

export default function SplitTextFinal({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.025,
  gradient = false,
  customGradient,
  easing = 'smooth',
  onAnimationComplete,
  triggerOnView = false,
  viewOffset = 0.1,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: viewOffset 
  })
  const shouldReduceMotion = useReducedMotion()
  
  // Performance monitoring in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !shouldReduceMotion) {
      let frameCount = 0
      let lastTime = performance.now()
      let rafId: number
      
      const measureFPS = () => {
        const currentTime = performance.now()
        frameCount++
        
        if (currentTime >= lastTime + 1000) {
          if (frameCount < DESIGN_TOKENS.performance.minFPS) {
            console.warn(`⚠️ SplitText animation running at ${frameCount} FPS (target: 60)`)
          }
          frameCount = 0
          lastTime = currentTime
        }
        
        if (containerRef.current) {
          rafId = requestAnimationFrame(measureFPS)
        }
      }
      
      // Start monitoring when animation begins
      const timeout = setTimeout(() => {
        measureFPS()
        // Stop monitoring after animation completes
        setTimeout(() => {
          cancelAnimationFrame(rafId)
        }, (duration + delay + (children.length * stagger)) * 1000 + 500)
      }, delay * 1000)
      
      return () => {
        clearTimeout(timeout)
        cancelAnimationFrame(rafId)
      }
    }
  }, [delay, duration, stagger, children.length, shouldReduceMotion])
  
  // Memoize character splitting
  const characters = useMemo(() => {
    // Limit characters for performance
    if (children.length > DESIGN_TOKENS.performance.maxCharacters) {
      console.warn(`SplitText: Text exceeds ${DESIGN_TOKENS.performance.maxCharacters} characters. Consider splitting into multiple components.`)
    }
    return children.split('')
  }, [children])
  
  // Get gradient classes
  const gradientClasses = useMemo(() => {
    if (!gradient) return ''
    if (customGradient) return `bg-gradient-to-r ${customGradient}`
    return `bg-gradient-to-r ${DESIGN_TOKENS.gradients[gradient]}`
  }, [gradient, customGradient])
  
  // Get easing function
  const easingFunction = DESIGN_TOKENS.easings[easing]
  
  // Handle animation complete callback
  const handleAnimationComplete = useCallback(() => {
    if (onAnimationComplete) {
      onAnimationComplete()
    }
    // Remove will-change after animation
    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto'
    }
  }, [onAnimationComplete])
  
  // For accessibility: render without animation if reduced motion is preferred
  if (shouldReduceMotion) {
    return (
      <span 
        ref={containerRef}
        className={`inline-block ${gradient ? `${gradientClasses} bg-clip-text text-transparent` : ''} ${className}`}
        aria-label={children}
      >
        {children}
      </span>
    )
  }
  
  // Don't animate if not in view yet (for trigger on view)
  if (triggerOnView && !isInView) {
    return (
      <span 
        ref={containerRef}
        className={`inline-block opacity-0 ${className}`}
        aria-label={children}
      >
        {children}
      </span>
    )
  }

  return (
    <motion.span
      ref={containerRef}
      initial="hidden"
      animate={triggerOnView ? (isInView ? "visible" : "hidden") : "visible"}
      className={`inline-block ${gradient ? `${gradientClasses} bg-clip-text text-transparent` : ''} ${className}`}
      style={{ 
        // Container optimizations
        perspective: '800px',
        willChange: 'transform',
        contain: 'layout style paint',
      }}
      aria-label={children}
      role="text"
    >
      {characters.map((char, index) => (
        <AnimatedChar
          key={`${char}-${index}`}
          char={char}
          index={index}
          delay={delay}
          duration={duration}
          stagger={stagger}
          easing={easingFunction}
          onAnimationComplete={handleAnimationComplete}
          isLastChar={index === characters.length - 1}
        />
      ))}
    </motion.span>
  )
}

// Export design tokens for consistency
export { DESIGN_TOKENS }