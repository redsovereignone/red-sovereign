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
  const [activeTab, setActiveTab] = useState(0)

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
            Is Your Marketing Budget a Coin Flip?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You&apos;re investing in growth, but every dollar feels like a gamble. The usual options all carry fatal flaws:
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {traps.map((trap, index) => (
              <motion.button
                key={trap.title}
                onClick={() => setActiveTab(index)}
                className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-white border-gray-300 shadow-sm text-gray-900'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{trap.icon}</span>
                  <span className="font-semibold text-left">{trap.title}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{traps[activeTab].icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {traps[activeTab].title}
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                {traps[activeTab].description}
              </p>
              <p className="text-gray-500 italic">
                You&apos;re stuck between running your business and trying to grow it.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
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