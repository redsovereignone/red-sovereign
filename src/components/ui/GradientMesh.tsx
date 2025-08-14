'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientMeshProps {
  className?: string;
  variant?: 'default' | 'intense' | 'subtle' | 'aurora' | 'ocean';
  animate?: boolean;
  blur?: boolean;
  opacity?: number;
  loading?: boolean;
}

const variants = {
  default: {
    colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'],
    positions: [
      { x: '20%', y: '30%' },
      { x: '80%', y: '20%' },
      { x: '70%', y: '70%' },
      { x: '30%', y: '80%' },
    ],
  },
  intense: {
    colors: ['#DC2626', '#EA580C', '#FBBF24', '#A855F7'],
    positions: [
      { x: '10%', y: '20%' },
      { x: '90%', y: '30%' },
      { x: '80%', y: '80%' },
      { x: '20%', y: '70%' },
    ],
  },
  subtle: {
    colors: ['#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'],
    positions: [
      { x: '25%', y: '25%' },
      { x: '75%', y: '25%' },
      { x: '75%', y: '75%' },
      { x: '25%', y: '75%' },
    ],
  },
  aurora: {
    colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
    positions: [
      { x: '0%', y: '50%' },
      { x: '33%', y: '30%' },
      { x: '66%', y: '70%' },
      { x: '100%', y: '50%' },
    ],
  },
  ocean: {
    colors: ['#0EA5E9', '#06B6D4', '#22D3EE', '#67E8F9'],
    positions: [
      { x: '15%', y: '40%' },
      { x: '85%', y: '60%' },
      { x: '50%', y: '10%' },
      { x: '50%', y: '90%' },
    ],
  },
};

export function GradientMesh({
  className,
  variant = 'default',
  animate: shouldAnimate = true,
  blur = true,
  opacity = 0.3,
  loading = false,
}: GradientMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { colors, positions } = variants[variant];
  
  const blob1X = useMotionValue(positions[0].x);
  const blob1Y = useMotionValue(positions[0].y);
  const blob2X = useMotionValue(positions[1].x);
  const blob2Y = useMotionValue(positions[1].y);
  const blob3X = useMotionValue(positions[2].x);
  const blob3Y = useMotionValue(positions[2].y);
  const blob4X = useMotionValue(positions[3].x);
  const blob4Y = useMotionValue(positions[3].y);
  
  useEffect(() => {
    if (!shouldAnimate || loading) return;
    
    const animations = [
      animate(blob1X, ['20%', '30%', '20%'], {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob1Y, ['30%', '40%', '30%'], {
        duration: 25,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob2X, ['80%', '70%', '80%'], {
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob2Y, ['20%', '30%', '20%'], {
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob3X, ['70%', '60%', '70%'], {
        duration: 24,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob3Y, ['70%', '60%', '70%'], {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob4X, ['30%', '40%', '30%'], {
        duration: 26,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob4Y, ['80%', '70%', '80%'], {
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
    ];
    
    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, [shouldAnimate, loading, blob1X, blob1Y, blob2X, blob2Y, blob3X, blob3Y, blob4X, blob4Y]);
  
  if (loading) {
    return (
      <div 
        className={cn(
          'absolute inset-0 overflow-hidden',
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse" />
      </div>
    );
  }
  
  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden',
        className
      )}
      style={{ opacity }}
    >
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            {blur && (
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>
          
          <motion.circle
            cx={blob1X}
            cy={blob1Y}
            r="30"
            fill={colors[0]}
            fillOpacity="0.5"
            filter={blur ? 'url(#glow)' : undefined}
          />
          
          <motion.circle
            cx={blob2X}
            cy={blob2Y}
            r="25"
            fill={colors[1]}
            fillOpacity="0.5"
            filter={blur ? 'url(#glow)' : undefined}
          />
          
          <motion.circle
            cx={blob3X}
            cy={blob3Y}
            r="35"
            fill={colors[2]}
            fillOpacity="0.5"
            filter={blur ? 'url(#glow)' : undefined}
          />
          
          <motion.circle
            cx={blob4X}
            cy={blob4Y}
            r="28"
            fill={colors[3]}
            fillOpacity="0.5"
            filter={blur ? 'url(#glow)' : undefined}
          />
        </svg>
        
        {blur && (
          <div className="absolute inset-0 backdrop-blur-3xl" />
        )}
      </div>
      
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${positions[0].x} ${positions[0].y}, ${colors[0]}40 0%, transparent 50%),
              radial-gradient(circle at ${positions[1].x} ${positions[1].y}, ${colors[1]}40 0%, transparent 50%),
              radial-gradient(circle at ${positions[2].x} ${positions[2].y}, ${colors[2]}40 0%, transparent 50%),
              radial-gradient(circle at ${positions[3].x} ${positions[3].y}, ${colors[3]}40 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>
    </div>
  );
}