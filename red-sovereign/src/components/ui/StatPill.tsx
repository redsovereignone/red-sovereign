'use client'

import { HTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatPillProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  metric: string | number
  label: string
  variant?: 'default' | 'accent'
}

const StatPill = forwardRef<HTMLDivElement, StatPillProps>(
  ({ className, icon, metric, label, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white/80 border-gray-200',
      accent: 'bg-red-50 border-red-200'
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 rounded-full border px-3 py-2',
          variants[variant],
          className
        )}
        {...props}
      >
        {icon && (
          <span className={cn(
            'flex-shrink-0',
            variant === 'accent' ? 'text-red-500' : 'text-gray-600'
          )}>
            {icon}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-gray-900 tabular-nums">{metric}</span>
          <span className="text-sm text-gray-600">{label}</span>
        </div>
      </div>
    )
  }
)

StatPill.displayName = 'StatPill'

export { StatPill }