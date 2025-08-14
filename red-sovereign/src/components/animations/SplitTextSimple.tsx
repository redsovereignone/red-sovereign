'use client'

import React from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  gradient?: boolean
  gradientColors?: string
}

export default function SplitTextSimple({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
  gradient = false,
  gradientColors = 'from-white to-gray-300',
}: SplitTextProps) {
  const characters = children.split('')

  return (
    <span 
      className={`inline-block ${gradient ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` : ''} ${className}`}
    >
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block animate-splitReveal"
          style={{
            animationDelay: `${delay + index * stagger}s`,
            animationFillMode: 'both',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}