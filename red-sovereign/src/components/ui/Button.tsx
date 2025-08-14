'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

type ButtonBaseProps = Omit<HTMLMotionProps<"button">, 'ref'>
interface ButtonProps extends ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-gray-900 text-white shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[1px]',
      secondary: 'bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-300 hover:shadow-md',
      ghost: 'bg-transparent text-gray-600 hover:text-red-500',
      pill: 'bg-white border border-gray-200 text-gray-700 rounded-full hover:shadow-md hover:border-gray-300'
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-xl',
      md: 'h-11 px-5 text-base rounded-2xl',
      lg: 'h-12 px-6 text-lg rounded-2xl'
    }
    
    const MotionButton = motion.button
    
    return (
      <MotionButton
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </MotionButton>
    )
  }
)

Button.displayName = 'Button'

export { Button }