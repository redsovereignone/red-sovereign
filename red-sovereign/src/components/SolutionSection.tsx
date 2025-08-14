'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="solution" className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            One Move. Two Wins: Expert Growth Execution + Enterprise Tech.
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            One decision solves both your growth and cost challenges. You get a partner committed to predictable, self-funding growth plus the entire enterprise-grade tech stack to power it. That's expert execution and thousands in monthly savings in one package.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                A Partner That Delivers Real Results
              </h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Predictable growth doesn't come from luck, it comes from a system. We install a complete, data-driven growth engine inside your business, run by human experts who use AI as a force multiplier, not a replacement. The result: consistent growth that funds itself.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                A Platform That Replaces Your Stack
              </h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stop juggling a dozen tools. Our Growth Foundation includes a fully integrated, enterprise-grade tech stack. We provide and manage every tool you need, from CRM and outreach to dashboards and data enrichment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}