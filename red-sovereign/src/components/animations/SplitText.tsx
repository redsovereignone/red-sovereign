'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  gradient?: boolean
  gradientColors?: string
}

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
  },
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  gradient = false,
  gradientColors = 'from-white to-gray-300',
}: SplitTextProps) {
  const characters = children.split('')

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={`inline-block ${gradient ? `bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent` : ''} ${className}`}
      style={{ perspective: '1000px' }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          style={{ 
            transformOrigin: 'bottom',
            transformStyle: 'preserve-3d',
          }}
          variants={charVariants}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}