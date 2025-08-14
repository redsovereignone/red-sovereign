'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface CTASectionProps {
  onOpenPlaybook?: () => void
}

export default function CTASection({ onOpenPlaybook }: CTASectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden bg-gray-50" ref={ref}>
      
      <div className="container mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-12">
            <span className="text-gray-900">
              Two Ways to Start
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Option 1: See Your Growth Plan Instantly
              </h3>
              <p className="text-gray-600 mb-6">
                Get your personalized 90-Day ROI Playbook, no call required. Delivered instantly.
              </p>
              <button
                onClick={onOpenPlaybook}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 w-full justify-center shadow-sm hover:shadow-md"
              >
                Generate My Free Playbook
              </button>
            </motion.div>

            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Option 2: Book a Strategy Call
              </h3>
              <p className="text-gray-600 mb-6">
                A strategic, one-on-one call with a Red Sovereign founder to uncover your quickest wins.
              </p>
              <a
                href="https://app.reclaim.ai/m/redsovereign"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {}}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 w-full justify-center shadow-sm hover:shadow-md"
              >
                Book a Strategy Call
              </a>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl max-w-3xl mx-auto shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-3xl">📈</div>
              <p className="text-2xl font-semibold text-gray-900">
                Average client sees 3.2x pipeline growth in 90 days
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}