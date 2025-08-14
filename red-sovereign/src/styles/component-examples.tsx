// component-examples.tsx
// Strategic red usage examples for Red Sovereign components

import React from 'react';

// Primary CTA Button (Hero section only)
export const PrimaryCTAButton = ({ children }: { children: React.ReactNode }) => (
  <button className="
    bg-gradient-to-r from-red-600 to-red-500
    hover:from-red-700 hover:to-red-600
    text-white font-semibold
    px-8 py-4 rounded-lg
    shadow-[0_0_30px_rgba(239,68,68,0.2)]
    hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]
    transition-all duration-300
    transform hover:scale-[1.02]
  ">
    {children}
  </button>
);

// Secondary CTA (subtle red accent)
export const SecondaryCTAButton = ({ children }: { children: React.ReactNode }) => (
  <button className="
    bg-transparent 
    border border-white/20
    hover:border-red-500/30 
    hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
    text-white hover:text-red-400
    px-6 py-3 rounded-lg
    transition-all duration-300
  ">
    {children}
  </button>
);

// Metric Card (red used for key number only)
export const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div className="
    backdrop-blur-xl 
    bg-white/[0.02]
    border border-white/[0.08]
    rounded-2xl p-6
    hover:border-red-500/20
    transition-all duration-300
  ">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className="block text-4xl font-bold text-red-500 mt-2">{value}</span>
  </div>
);

// Navigation with Active State
export const NavigationItem = ({ href, active, children }: { 
  href: string; 
  active?: boolean; 
  children: React.ReactNode 
}) => (
  <a 
    href={href}
    className={`
      transition-all duration-200
      ${active 
        ? 'text-red-500 font-medium' 
        : 'text-gray-400 hover:text-white hover:text-shadow-sm'
      }
    `}
  >
    {children}
  </a>
);

// Glass Card with subtle red glow on hover
export const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="
    backdrop-blur-xl 
    bg-gradient-to-br from-white/[0.03] to-white/[0.01]
    border border-white/[0.08]
    hover:border-red-500/20
    rounded-2xl p-8
    hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]
    transition-all duration-500
  ">
    {children}
  </div>
);

// Background Mesh (very subtle red hints)
export const BackgroundMesh = () => (
  <div 
    className="absolute inset-0 -z-10 opacity-50"
    style={{
      background: `
        radial-gradient(at 20% 80%, rgba(239, 68, 68, 0.08) 0px, transparent 50%),
        radial-gradient(at 80% 20%, rgba(239, 68, 68, 0.05) 0px, transparent 50%),
        radial-gradient(at 40% 40%, rgba(31, 31, 35, 0.8) 0px, transparent 50%)
      `
    }}
  />
);

// Gradient Text (for emphasis)
export const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="
    bg-gradient-to-r from-white to-red-500 
    bg-clip-text text-transparent
    font-bold
  ">
    {children}
  </span>
);

// Feature Badge with red accent
export const FeatureBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="
    inline-flex items-center
    px-3 py-1 rounded-full
    text-xs font-medium
    bg-red-500/10 
    text-red-400
    border border-red-500/20
  ">
    {children}
  </span>
);

// Input with red focus state
export const PremiumInput = ({ placeholder }: { placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="
      w-full px-4 py-3
      bg-white/[0.02]
      border border-white/[0.08]
      rounded-lg
      text-white placeholder-gray-500
      focus:outline-none
      focus:border-red-500/50
      focus:shadow-[0_0_20px_rgba(239,68,68,0.15)]
      transition-all duration-300
    "
  />
);

// Testimonial Card with subtle red accent
export const TestimonialCard = ({ 
  quote, 
  author, 
  role 
}: { 
  quote: string; 
  author: string; 
  role: string;
}) => (
  <div className="
    backdrop-blur-xl 
    bg-gradient-to-br from-white/[0.03] to-transparent
    border border-white/[0.08]
    rounded-2xl p-8
    relative overflow-hidden
    hover:border-red-500/10
    transition-all duration-500
    group
  ">
    {/* Subtle red glow on hover */}
    <div className="
      absolute top-0 right-0 
      w-32 h-32 
      bg-red-500/10 
      blur-3xl 
      opacity-0 group-hover:opacity-100
      transition-opacity duration-700
    " />
    
    <p className="text-gray-300 text-lg mb-6 relative z-10">"{quote}"</p>
    <div className="relative z-10">
      <p className="text-white font-semibold">{author}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  </div>
);

// Loading State with red accent
export const LoadingSpinner = () => (
  <div className="
    w-8 h-8 
    border-2 border-gray-700 
    border-t-red-500 
    rounded-full 
    animate-spin
  " />
);

// Progress Bar with red fill
export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
    <div 
      className="
        h-full 
        bg-gradient-to-r from-red-600 to-red-500
        transition-all duration-500 ease-out
        shadow-[0_0_10px_rgba(239,68,68,0.5)]
      "
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Alert Banner with red accent
export const AlertBanner = ({ children }: { children: React.ReactNode }) => (
  <div className="
    bg-red-500/10 
    border border-red-500/30
    rounded-lg p-4
    backdrop-blur-sm
  ">
    <p className="text-red-400 text-sm font-medium">{children}</p>
  </div>
);

/* 
  USAGE PRINCIPLES:
  
  1. Red is the crown jewel - use sparingly for maximum impact
  2. Primary CTAs get full red treatment (gradient + glow)
  3. Secondary interactions use subtle red hints (borders, text)
  4. Metrics and key numbers can use solid red-500
  5. Backgrounds should only have very subtle red hints
  6. Never use bright red without glow/shadow effects
  7. Always pair red with plenty of dark negative space
  8. Red should guide the eye to conversion points
*/