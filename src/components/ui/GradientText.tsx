'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement>, MotionProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'accent' | 'rainbow' | 'gold' | 'silver';
  animate?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  loading?: boolean;
  className?: string;
}

const gradients = {
  primary: 'from-blue-400 via-blue-500 to-blue-600',
  accent: 'from-purple-400 via-pink-500 to-red-500',
  rainbow: 'from-red-500 via-yellow-500 to-blue-500',
  gold: 'from-yellow-300 via-yellow-400 to-yellow-500',
  silver: 'from-gray-300 via-gray-400 to-gray-500',
};

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ 
    children, 
    gradient = 'primary',
    animate = true,
    size = 'base',
    weight = 'bold',
    loading = false,
    className,
    ...props 
  }, ref) => {
    if (loading) {
      return (
        <span 
          className={cn(
            'inline-block rounded animate-pulse',
            'bg-gradient-to-r from-gray-700 to-gray-600',
            sizes[size],
            weights[weight],
            className
          )}
        >
          <span className="opacity-0">{children}</span>
        </span>
      );
    }

    return (
      <motion.span
        ref={ref}
        className={cn(
          'inline-block bg-gradient-to-r bg-clip-text text-transparent',
          gradients[gradient],
          sizes[size],
          weights[weight],
          animate && 'bg-[length:200%_auto] animate-gradient',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        {...props}
      >
        {animate ? (
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{
              backgroundImage: `linear-gradient(90deg, var(--tw-gradient-stops))`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className={cn(
              'inline-block',
              gradients[gradient]
            )}
          >
            {children}
          </motion.span>
        ) : (
          children
        )}
      </motion.span>
    );
  }
);

GradientText.displayName = 'GradientText';