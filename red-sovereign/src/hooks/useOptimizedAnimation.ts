/**
 * Optimized Animation Hook - Red Sovereign Design System
 * Provides device-aware animation settings for 60fps performance
 */

import { useEffect, useState } from 'react';
import { Transition } from 'framer-motion';

interface AnimationSettings {
  enableAnimations: boolean;
  transitionDuration: number;
  animationComplexity: 'full' | 'reduced' | 'minimal' | 'none';
  enableParallax: boolean;
  enableBlur: boolean;
  maxAnimatedElements: number;
}

interface OptimizedVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition: Transition;
}

export function useOptimizedAnimation() {
  const [settings, setSettings] = useState<AnimationSettings>({
    enableAnimations: true,
    transitionDuration: 300,
    animationComplexity: 'full',
    enableParallax: true,
    enableBlur: true,
    maxAnimatedElements: 50
  });

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    // Get device performance tier
    const getPerformanceTier = (): 'high' | 'medium' | 'low' => {
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const cores = navigator.hardwareConcurrency;
      
      // Check connection speed
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
      
      if (slowConnection) return 'low';
      if (memory && memory >= 8 && cores >= 4) return 'high';
      if (memory && memory >= 4 && cores >= 2) return 'medium';
      return 'low';
    };

    // Update settings based on device capabilities
    const updateSettings = () => {
      checkMobile();
      checkReducedMotion();
      
      const tier = getPerformanceTier();
      const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (reducedMotion) {
        setSettings({
          enableAnimations: false,
          transitionDuration: 0,
          animationComplexity: 'none',
          enableParallax: false,
          enableBlur: false,
          maxAnimatedElements: 0
        });
        return;
      }
      
      if (isMobileDevice) {
        setSettings({
          enableAnimations: true,
          transitionDuration: 150,
          animationComplexity: 'minimal',
          enableParallax: false,
          enableBlur: false,
          maxAnimatedElements: 10
        });
        return;
      }
      
      switch (tier) {
        case 'high':
          setSettings({
            enableAnimations: true,
            transitionDuration: 300,
            animationComplexity: 'full',
            enableParallax: true,
            enableBlur: true,
            maxAnimatedElements: 50
          });
          break;
        case 'medium':
          setSettings({
            enableAnimations: true,
            transitionDuration: 200,
            animationComplexity: 'reduced',
            enableParallax: false,
            enableBlur: true,
            maxAnimatedElements: 20
          });
          break;
        case 'low':
          setSettings({
            enableAnimations: true,
            transitionDuration: 150,
            animationComplexity: 'minimal',
            enableParallax: false,
            enableBlur: false,
            maxAnimatedElements: 10
          });
          break;
      }
    };

    updateSettings();
    
    // Listen for changes
    window.addEventListener('resize', updateSettings);
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMediaQuery.addEventListener('change', updateSettings);
    
    return () => {
      window.removeEventListener('resize', updateSettings);
      motionMediaQuery.removeEventListener('change', updateSettings);
    };
  }, []);

  /**
   * Create optimized fade animation
   */
  const fadeAnimation = (delay = 0): OptimizedVariants => {
    if (!settings.enableAnimations) {
      return {
        initial: {},
        animate: {},
        transition: { duration: 0 }
      };
    }

    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: settings.transitionDuration / 1000,
        delay,
        ease: [0.4, 0, 0.2, 1] // Cubic bezier for smooth ease
      }
    };
  };

  /**
   * Create optimized slide animation with GPU acceleration
   */
  const slideAnimation = (
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    distance = 20,
    delay = 0
  ): OptimizedVariants => {
    if (!settings.enableAnimations) {
      return {
        initial: {},
        animate: {},
        transition: { duration: 0 }
      };
    }

    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`
    };

    const finalTransform = isMobile ? transforms[direction].replace(/\d+/, (match) => String(parseInt(match) / 2)) : transforms[direction];

    return {
      initial: { 
        opacity: 0, 
        transform: finalTransform
      },
      animate: { 
        opacity: 1, 
        transform: 'translateY(0px) translateX(0px)'
      },
      exit: { 
        opacity: 0,
        transform: finalTransform
      },
      transition: {
        type: 'spring',
        stiffness: isMobile ? 400 : 260,
        damping: isMobile ? 30 : 20,
        delay,
        mass: isMobile ? 0.5 : 1
      }
    };
  };

  /**
   * Create optimized scale animation
   */
  const scaleAnimation = (
    initialScale = 0.95,
    delay = 0
  ): OptimizedVariants => {
    if (!settings.enableAnimations || settings.animationComplexity === 'minimal') {
      return fadeAnimation(delay);
    }

    return {
      initial: { 
        opacity: 0, 
        scale: initialScale
      },
      animate: { 
        opacity: 1, 
        scale: 1
      },
      exit: { 
        opacity: 0,
        scale: initialScale
      },
      transition: {
        type: 'spring',
        stiffness: isMobile ? 350 : 260,
        damping: isMobile ? 25 : 20,
        delay
      }
    };
  };

  /**
   * Create stagger children animation
   */
  const staggerAnimation = (
    staggerDelay = 0.1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _maxItems?: number
  ): Transition => {
    // const effectiveMaxItems = maxItems || settings.maxAnimatedElements; // TODO: Use for performance limiting
    
    if (!settings.enableAnimations) {
      return { staggerChildren: 0 };
    }

    return {
      staggerChildren: isMobile ? staggerDelay * 0.5 : staggerDelay,
      staggerDirection: 1,
      delayChildren: 0,
      // Limit stagger for performance
      when: 'beforeChildren'
    };
  };

  /**
   * Get optimized transition for hover effects
   */
  const hoverTransition = (): Transition => {
    if (!settings.enableAnimations || isMobile) {
      return { duration: 0 };
    }

    return {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 0.5
    };
  };

  /**
   * Check if complex animations should be enabled
   */
  const shouldEnableComplexAnimation = (): boolean => {
    return settings.animationComplexity === 'full' && !isMobile && !prefersReducedMotion;
  };

  /**
   * Get CSS for GPU-accelerated animations
   */
  const getGPUStyles = () => ({
    willChange: settings.enableAnimations ? 'transform, opacity' : 'auto',
    transform: 'translateZ(0)', // Force GPU layer
    backfaceVisibility: 'hidden' as const,
    perspective: 1000
  });

  return {
    settings,
    isMobile,
    prefersReducedMotion,
    
    // Animation creators
    fadeAnimation,
    slideAnimation,
    scaleAnimation,
    staggerAnimation,
    hoverTransition,
    
    // Utilities
    shouldEnableComplexAnimation,
    getGPUStyles,
    
    // Direct access to common transitions
    springTransition: {
      type: 'spring' as const,
      stiffness: isMobile ? 400 : 260,
      damping: isMobile ? 30 : 20
    },
    
    smoothTransition: {
      duration: settings.transitionDuration / 1000,
      ease: [0.4, 0, 0.2, 1] as const
    }
  };
}

export default useOptimizedAnimation;