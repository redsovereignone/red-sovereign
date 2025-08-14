'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  className?: string;
  loading?: boolean;
  format?: 'number' | 'currency' | 'percentage';
  once?: boolean;
}

const formatNumber = (
  num: number, 
  decimals: number, 
  separator: boolean,
  format: 'number' | 'currency' | 'percentage'
): string => {
  const fixedNum = num.toFixed(decimals);
  
  if (format === 'percentage') {
    return `${fixedNum}%`;
  }
  
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  }
  
  if (separator) {
    const parts = fixedNum.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  
  return fixedNum;
};

export function AnimatedNumber({
  value,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = true,
  className,
  loading = false,
  format = 'number',
  once = true,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView || loading || (once && hasAnimated)) return;
    
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(formatNumber(latest, decimals, separator, format));
      },
      onComplete: () => {
        setHasAnimated(true);
      },
    });
    
    return controls.stop;
  }, [value, duration, delay, decimals, separator, format, isInView, loading, motionValue, once, hasAnimated]);
  
  if (loading) {
    return (
      <span 
        className={cn(
          'inline-block animate-pulse bg-gray-700 rounded',
          'h-[1em] w-20',
          className
        )}
      />
    );
  }
  
  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-block tabular-nums',
        'font-bold tracking-tight',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="inline-flex items-baseline">
        {prefix && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className="mr-1"
          >
            {prefix}
          </motion.span>
        )}
        
        <motion.span
          className="inline-block"
          initial={{ scale: 0.5 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ 
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: delay + 0.1
          }}
        >
          {format === 'currency' && displayValue}
          {format !== 'currency' && displayValue}
        </motion.span>
        
        {suffix && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: delay + duration - 0.3 }}
            className="ml-1"
          >
            {suffix}
          </motion.span>
        )}
      </span>
    </motion.span>
  );
}