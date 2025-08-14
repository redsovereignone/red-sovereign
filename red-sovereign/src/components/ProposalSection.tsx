'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ProposalSectionProps {
  onOpenPlaybook?: () => void
}

export default function ProposalSection({ onOpenPlaybook }: ProposalSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleCTAClick = () => {
    if (onOpenPlaybook) {
      onOpenPlaybook()
    }
  }

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your 90-Day ROI Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Your first step is to see exactly how we&apos;ll drive predictable growth in your business mapped in a free 90-Day ROI Plan. From there, you&apos;ll get a custom proposal with the precise investment required to make it happen.
          </p>
          
          <motion.button
            onClick={handleCTAClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Show Me My 90-Day ROI Plan
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}