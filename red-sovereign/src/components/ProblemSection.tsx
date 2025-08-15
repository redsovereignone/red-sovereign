'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const traps = [
  {
    title: 'Agency Roulette',
    description: "High retainers, inconsistent results, and vanity metrics you can't take to the bank.",
    icon: '🎰'
  },
  {
    title: 'AI Smoke & Mirrors',
    description: 'Over-hyped tools that spit out generic content but can\'t execute real growth.',
    icon: '🤖'
  },
  {
    title: 'DIY Burnout',
    description: "Burning time and cash trying to run marketing yourself or paying idle in-house roles.",
    icon: '🔥'
  }
]

export default function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problem" className="py-24 px-6 bg-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Stop the Marketing Coin Flip
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You&apos;re investing in growth, but every dollar feels like a gamble. The usual options all carry fatal flaws:
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {traps.map((trap, index) => (
              <motion.div
                key={trap.title}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{trap.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {trap.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {trap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center bg-gray-50 rounded-xl p-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-lg text-gray-700 mb-4 italic">
              You&apos;re stuck between running your business and trying to grow it.
            </p>
            <p className="text-lg text-gray-700 mb-4">Ready for a pragmatic approach?</p>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200"
            >
              See how we deliver it →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
