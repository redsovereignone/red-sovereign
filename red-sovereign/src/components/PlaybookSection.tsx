'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface PlaybookSectionProps {
  onOpenPlaybook?: () => void
}

export default function PlaybookSection({ onOpenPlaybook }: PlaybookSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="playbook" className="py-20 md:py-28 px-6 bg-gray-50" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            <span className="text-gray-900">
              See Your Next 90 Days Mapped Out
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Before you commit to anything, see exactly what we&apos;d do to transform your growth.
          </p>
          
          <motion.button
            onClick={onOpenPlaybook}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Playbook
          </motion.button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-3">📋</div>
            <h4 className="font-medium text-gray-900 mb-2">90-Day Plan</h4>
            <p className="text-sm text-gray-600">Week-by-week action items</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🛠</div>
            <h4 className="font-medium text-gray-900 mb-2">Custom Tools</h4>
            <p className="text-sm text-gray-600">Industry-specific stack</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-medium text-gray-900 mb-2">KPI Timeline</h4>
            <p className="text-sm text-gray-600">Expected outcomes</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">💰</div>
            <h4 className="font-medium text-gray-900 mb-2">ROI Analysis</h4>
            <p className="text-sm text-gray-600">Investment returns</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}