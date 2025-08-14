'use client';

import { forwardRef, useRef, useState, MouseEvent, ButtonHTMLAttributes } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  magnetic?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  ghost: 'bg-transparent hover:bg-white/10 text-white',
  gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ 
    children, 
    variant = 'primary',
    size = 'md',
    magnetic = true,
    loading = false,
    icon,
    className,
    disabled,
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);
    
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!magnetic || disabled || loading) return;
      
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const maxDistance = 20;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxEffectDistance = 100;
      
      if (distance < maxEffectDistance) {
        const force = Math.min(1, (maxEffectDistance - distance) / maxEffectDistance);
        x.set(distanceX * force * (maxDistance / maxEffectDistance));
        y.set(distanceY * force * (maxDistance / maxEffectDistance));
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
        style={{
          x: xSpring,
          y: ySpring,
        }}
      >
        <motion.button
          ref={ref}
          className={cn(
            'relative inline-flex items-center justify-center',
            'rounded-xl font-semibold transition-all duration-300',
            'shadow-lg hover:shadow-xl',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'overflow-hidden',
            variants[variant],
            sizes[size],
            className
          )}
          disabled={disabled || loading}
          whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
          whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
          {...props}
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {loading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {icon && (
              <motion.span
                animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.span>
            )}
            {children}
          </span>
          
          {variant === 'gradient' && (
            <motion.div
              className="absolute inset-0 opacity-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={isHovered ? { 
                opacity: [0, 0.5, 0],
                x: ['0%', '100%', '200%']
              } : {}}
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.button>
      </motion.div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';