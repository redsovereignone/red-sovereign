'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement>, MotionProps {
  children: ReactNode;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
  hover?: boolean;
  loading?: boolean;
  className?: string;
}

const blurValues = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    blur = 'md', 
    gradient = false, 
    hover = true, 
    loading = false,
    className,
    ...props 
  }, ref) => {
    if (loading) {
      return (
        <div 
          className={cn(
            'relative overflow-hidden rounded-2xl',
            'bg-white/5 backdrop-blur-md',
            'border border-white/10',
            'animate-pulse',
            className
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative p-6">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-gradient-to-br from-white/10 to-white/5',
          blurValues[blur],
          'border border-white/10',
          'shadow-2xl shadow-black/20',
          hover && 'transition-all duration-300 hover:shadow-3xl hover:shadow-primary/20',
          hover && 'hover:border-white/20',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={hover ? { scale: 1.02 } : undefined}
        {...props}
      >
        {gradient && (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        
        <div className="relative z-10">
          {children}
        </div>
        
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"
          animate={hover ? { opacity: [0, 0.5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';