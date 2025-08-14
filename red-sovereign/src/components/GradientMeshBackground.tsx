'use client'

import { motion } from 'framer-motion'

export default function GradientMeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0B]" />
      
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mesh-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="mesh-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="0.05" />
          </linearGradient>
          <filter id="mesh-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="100" />
          </filter>
        </defs>
        
        <motion.ellipse
          cx="20%"
          cy="30%"
          rx="40%"
          ry="30%"
          fill="url(#mesh-gradient-1)"
          filter="url(#mesh-blur)"
          animate={{
            cx: ["20%", "30%", "20%"],
            cy: ["30%", "40%", "30%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.ellipse
          cx="80%"
          cy="70%"
          rx="35%"
          ry="40%"
          fill="url(#mesh-gradient-2)"
          filter="url(#mesh-blur)"
          animate={{
            cx: ["80%", "70%", "80%"],
            cy: ["70%", "60%", "70%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/50" />
    </div>
  )
}