// design-tokens.ts - Editorial White-led Design System
export const designTokens = {
  colors: {
    // White-led backgrounds (editorial, clean)
    background: {
      primary: '#FAFAF8',        // Paper white base
      secondary: '#FFFFFF',       // Pure white cards
      tertiary: '#F8F8F6',       // Subtle off-white
      elevated: '#FFFFFF',        // Elevated surfaces
      overlay: 'rgba(0,0,0,0.4)', // Modal overlays
      tint: '#FFF4F4',           // Red tint for subtle callouts
    },
    
    // Red accent system (5-10% of canvas max)
    red: {
      50: '#FFF4F4',   // Tint backgrounds (emphasis only)
      100: '#FEE2E2',  // Very light
      200: '#FECACA',  // Light
      300: '#FCA5A5',  // Soft
      400: '#F87171',  // Medium
      500: '#D61F26',  // Primary red (main brand)
      600: '#B91C1C',  // Hover state
      700: '#9F1C1C',  // Dark red
      800: '#7F1D1D',  // Deeper
      900: '#450A0A',  // Darkest
      950: '#2A0A0A',  // Near black
    },
    
    // Minimal gradients (used very sparingly)
    gradients: {
      // Subtle red accent for highlights only
      primary: 'linear-gradient(135deg, #D61F26 0%, #F87171 100%)',
      
      // Very subtle background gradient
      subtle: 'linear-gradient(180deg, #FAFAF8 0%, #F8F8F6 100%)',
      
      // Hover glow (minimal)
      redGlow: 'radial-gradient(circle at center, rgba(214, 31, 38, 0.08) 0%, transparent 70%)',
      
      // Text gradient (rarely used)
      textGradient: 'linear-gradient(135deg, #0F172A 0%, #D61F26 100%)',
      
      // Clean white mesh
      mesh: `
        radial-gradient(at 20% 80%, rgba(214, 31, 38, 0.03) 0px, transparent 50%),
        radial-gradient(at 80% 20%, rgba(214, 31, 38, 0.02) 0px, transparent 50%),
        radial-gradient(at 40% 40%, rgba(248, 248, 246, 0.5) 0px, transparent 50%)
      `,
      
      // Utility colors
      success: '#16A34A',
      warning: '#F59E0B',
      info: '#0EA5E9',
    },
    
    // Text colors (high contrast on white)
    gray: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E5E7EB',   // Borders
      300: '#D4D4D8',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#475569',   // Body text
      700: '#374151',
      800: '#1F2937',
      900: '#0F172A',   // Headlines (Ink)
    },
    
    // Text hierarchy
    text: {
      primary: '#0F172A',           // Headlines (Ink)
      secondary: '#475569',         // Body text (Slate)
      muted: '#6B7280',            // Captions
      inverse: '#FFFFFF',          // On dark backgrounds
      accent: '#D61F26',           // Red accent (sparingly)
      link: '#0EA5E9',            // Links (optional blue)
    },
    
    // Semantic colors
    semantic: {
      success: '#16A34A',
      warning: '#F59E0B',
      error: '#D61F26',    // Uses primary red
      info: '#0EA5E9',
    },
    
    // Interactive states
    interactive: {
      borderDefault: '#E5E7EB',
      borderHover: 'rgba(214, 31, 38, 0.2)',
      borderFocus: 'rgba(214, 31, 38, 0.3)',
      glowRed: '0 0 12px rgba(214, 31, 38, 0.15)',
      glowSubtle: '0 0 6px rgba(214, 31, 38, 0.08)',
    }
  },
  
  typography: {
    fonts: {
      display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", "SF Mono", Monaco, monospace',
    },
    
    // Professional typography scale
    scale: {
      hero: 'clamp(2.5rem, 6vw, 4rem)',      // Scaled down for elegance
      h1: 'clamp(2rem, 5vw, 3.75rem)',       // text-5xl to text-6xl
      h2: 'clamp(1.875rem, 4vw, 2.25rem)',   // text-3xl to text-4xl
      h3: '1.5rem',                          // text-2xl
      h4: '1.25rem',                          // text-xl
      body: '1.125rem',                       // text-lg
      bodySmall: '1rem',                      // text-base
      caption: '0.875rem',                    // text-sm
      micro: '0.75rem',                       // text-xs
    },
    
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeight: {
      tight: 1.05,     // Headlines
      snug: 1.2,       // Subheadings
      normal: 1.75,    // Body text (base/7)
      relaxed: 2,      // Loose body (base/8)
    },
    
    tracking: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
    }
  },
  
  spacing: {
    base: 8,
    scale: {
      px: '1px',
      0: '0',
      0.5: '4px',
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      8: '64px',
      10: '80px',
      12: '96px',
      16: '128px',
      20: '160px',
      24: '192px',
      28: '224px',
    },
    section: {
      mobile: '80px',    // py-20
      tablet: '96px',
      desktop: '112px',  // py-28
    },
    container: {
      max: '1280px',    // max-w-7xl
      padding: '24px',  // px-6
      paddingMd: '32px', // md:px-8
    }
  },
  
  animation: {
    timing: {
      instant: '120ms',    // Press states
      fast: '180ms',       // Hover elevation
      normal: '200ms',     // Standard interactions
      slow: '220ms',       // Modals/accordions
      slower: '300ms',     // Page transitions
      dramatic: '500ms',   // Dramatic reveals
    },
    
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeOut: 'ease-out',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
      smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
    
    keyframes: {
      // Subtle red glow pulse for CTAs
      glowPulse: {
        '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' },
        '50%': { boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' },
      },
      
      // Gradient shift for backgrounds
      gradientShift: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
      
      // Float animation for cards
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      }
    }
  },
  
  effects: {
    glass: {
      light: 'backdrop-filter: blur(8px); background: rgba(255, 255, 255, 0.8);',
      minimal: 'backdrop-filter: blur(4px); background: rgba(255, 255, 255, 0.95);',
      card: 'backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.9);',
    },
    
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      card: '0 6px 20px rgba(0,0,0,.06)',
      redGlow: '0 0 12px rgba(214, 31, 38, 0.15)',
      focus: '0 0 0 3px rgba(214, 31, 38, 0.1)',
    },
    
    borders: {
      subtle: '1px solid #F4F4F5',
      default: '1px solid #E5E7EB',
      strong: '1px solid #D4D4D8',
      red: '1px solid rgba(214, 31, 38, 0.2)',
      focus: '2px solid rgba(214, 31, 38, 0.3)',
    },
    
    radius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    }
  }
};

// Type exports for TypeScript
export type Colors = typeof designTokens.colors;
export type Typography = typeof designTokens.typography;
export type Spacing = typeof designTokens.spacing;
export type Animation = typeof designTokens.animation;
export type Effects = typeof designTokens.effects;