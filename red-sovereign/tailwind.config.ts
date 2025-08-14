import type { Config } from 'tailwindcss';
import { designTokens } from './src/styles/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map all design tokens to Tailwind
        background: designTokens.colors.background,
        red: designTokens.colors.red,
        gray: designTokens.colors.gray,
        
        // Semantic colors from tokens
        success: designTokens.colors.semantic.success,
        warning: designTokens.colors.semantic.warning,
        error: designTokens.colors.semantic.error,
        info: designTokens.colors.semantic.info,
        
        // Text colors from tokens
        'text-primary': designTokens.colors.text.primary,
        'text-secondary': designTokens.colors.text.secondary,
        'text-muted': designTokens.colors.text.muted,
        'text-inverse': designTokens.colors.text.inverse,
        'text-accent': designTokens.colors.text.accent,
      },
      
      fontFamily: {
        display: designTokens.typography.fonts.display.split(','),
        body: designTokens.typography.fonts.body.split(','),
        mono: designTokens.typography.fonts.mono.split(','),
      },
      
      fontSize: {
        hero: designTokens.typography.scale.hero,
        h1: designTokens.typography.scale.h1,
        h2: designTokens.typography.scale.h2,
        h3: designTokens.typography.scale.h3,
        h4: designTokens.typography.scale.h4,
        body: designTokens.typography.scale.body,
        'body-small': designTokens.typography.scale.bodySmall,
        caption: designTokens.typography.scale.caption,
        micro: designTokens.typography.scale.micro,
      },
      
      fontWeight: {
        regular: String(designTokens.typography.weight.regular),
        medium: String(designTokens.typography.weight.medium),
        semibold: String(designTokens.typography.weight.semibold),
        bold: String(designTokens.typography.weight.bold),
      },
      
      lineHeight: {
        tight: String(designTokens.typography.lineHeight.tight),
        snug: String(designTokens.typography.lineHeight.snug),
        normal: String(designTokens.typography.lineHeight.normal),
        relaxed: String(designTokens.typography.lineHeight.relaxed),
      },
      
      spacing: designTokens.spacing.scale,
      
      backgroundImage: {
        // All gradients from tokens
        'gradient-primary': designTokens.colors.gradients.primary,
        'gradient-red-glow': designTokens.colors.gradients.redGlow,
        'gradient-text': designTokens.colors.gradients.textGradient,
        'gradient-mesh': designTokens.colors.gradients.mesh,
        'gradient-success': designTokens.colors.gradients.success,
        'gradient-warning': designTokens.colors.gradients.warning,
        'gradient-info': designTokens.colors.gradients.info,
      },
      
      boxShadow: {
        sm: designTokens.effects.shadows.sm,
        md: designTokens.effects.shadows.md,
        lg: designTokens.effects.shadows.lg,
        xl: designTokens.effects.shadows.xl,
        'red-glow': designTokens.effects.shadows.redGlow,
        'glow-red': designTokens.colors.interactive.glowRed,
        'glow-subtle': designTokens.colors.interactive.glowSubtle,
      },
      
      borderColor: {
        DEFAULT: designTokens.colors.interactive.borderDefault,
        hover: designTokens.colors.interactive.borderHover,
        focus: designTokens.colors.interactive.borderFocus,
        subtle: designTokens.effects.borders.subtle,
        strong: designTokens.effects.borders.strong,
        red: designTokens.effects.borders.red,
      },
      
      animation: {
        // Core animations with timing from tokens
        'glow-pulse': `glowPulse ${designTokens.animation.timing.slow} ${designTokens.animation.easing.smooth} infinite`,
        'gradient-shift': `gradientShift 5s ${designTokens.animation.easing.smooth} infinite`,
        'float': `float 6s ${designTokens.animation.easing.smooth} infinite`,
        'magnetic': `magnetic ${designTokens.animation.timing.fast} ${designTokens.animation.easing.smooth}`,
        'spin-slow': `spin 3s linear infinite`,
        'fade-in': `fadeIn ${designTokens.animation.timing.slow} ${designTokens.animation.easing.smoothOut}`,
        'slide-up': `slideUp ${designTokens.animation.timing.slow} ${designTokens.animation.easing.smoothOut}`,
        'scale-in': `scaleIn ${designTokens.animation.timing.normal} ${designTokens.animation.easing.smoothOut}`,
        'shimmer': `shimmer 2s ${designTokens.animation.easing.smooth} infinite`,
        'pulse-red': `pulseRed 2s ${designTokens.animation.easing.smooth} infinite`,
      },
      
      keyframes: {
        // All keyframes from tokens
        glowPulse: designTokens.animation.keyframes.glowPulse,
        gradientShift: designTokens.animation.keyframes.gradientShift,
        float: designTokens.animation.keyframes.float,
        
        // Additional custom animations
        magnetic: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) rotate(1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRed: {
          '0%, 100%': { 
            opacity: '1',
            filter: 'drop-shadow(0 0 0 rgba(239, 68, 68, 0))',
          },
          '50%': { 
            opacity: '0.8',
            filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
          },
        },
      },
      
      transitionDuration: {
        instant: designTokens.animation.timing.instant,
        fast: designTokens.animation.timing.fast,
        normal: designTokens.animation.timing.normal,
        slow: designTokens.animation.timing.slow,
        slower: designTokens.animation.timing.slower,
        dramatic: designTokens.animation.timing.dramatic,
      },
      
      transitionTimingFunction: {
        smooth: designTokens.animation.easing.smooth,
        'smooth-out': designTokens.animation.easing.smoothOut,
        'smooth-in': designTokens.animation.easing.smoothIn,
      },
      
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      
      backgroundOpacity: {
        '2': '0.02',
        '3': '0.03',
        '5': '0.05',
        '8': '0.08',
        '12': '0.12',
        '15': '0.15',
      },
    },
  },
  plugins: [
    // Custom utilities plugin
    function({ addUtilities }: any) {
      const newUtilities = {
        // Glassmorphism effects from tokens
        '.glass-light': {
          backdropFilter: 'blur(8px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: designTokens.effects.borders.subtle,
        },
        '.glass-dark': {
          backdropFilter: 'blur(12px)',
          background: 'rgba(0, 0, 0, 0.3)',
          border: designTokens.effects.borders.subtle,
        },
        '.glass-red': {
          backdropFilter: 'blur(10px)',
          background: 'rgba(239, 68, 68, 0.05)',
          border: designTokens.effects.borders.red,
        },
        '.glass-premium': {
          backdropFilter: 'blur(16px)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: designTokens.effects.borders.subtle,
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        },
        
        // Gradient text utilities
        '.gradient-text-primary': {
          background: designTokens.colors.gradients.textGradient,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
        '.gradient-text-white-red': {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EF4444 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
        '.gradient-text-red': {
          background: designTokens.colors.gradients.primary,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
        
        // Glow effects
        '.glow-red-sm': {
          boxShadow: designTokens.colors.interactive.glowSubtle,
        },
        '.glow-red-md': {
          boxShadow: designTokens.colors.interactive.glowRed,
        },
        '.glow-red-lg': {
          boxShadow: designTokens.effects.shadows.redGlow,
        },
        '.glow-red-xl': {
          boxShadow: designTokens.effects.shadows.redGlow,
        },
        
        // Text shadows
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-red': {
          textShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
        },
        '.text-shadow-red-strong': {
          textShadow: '0 0 30px rgba(239, 68, 68, 0.8)',
        },
        
        // Magnetic button effect
        '.magnetic': {
          position: 'relative',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
        
        // Shimmer effect for loading states
        '.shimmer': {
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        },
        
        // Border gradient
        '.border-gradient-red': {
          position: 'relative',
          background: designTokens.colors.background.primary,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            padding: '1px',
            background: designTokens.colors.gradients.primary,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            '-webkit-mask-composite': 'xor',
          },
        },
        
        // Mesh background
        '.bg-mesh': {
          backgroundImage: designTokens.colors.gradients.mesh,
        },
        
        // Hover lift effect
        '.hover-lift': {
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: designTokens.effects.shadows.xl,
          },
        },
        
        // Focus ring with red accent
        '.focus-ring-red': {
          '&:focus': {
            outline: 'none',
            borderColor: designTokens.colors.interactive.borderFocus,
            boxShadow: `0 0 0 3px rgba(239, 68, 68, 0.1), ${designTokens.colors.interactive.glowSubtle}`,
          },
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
}

export default config;