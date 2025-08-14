'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Rocket,
  PenTool, 
  MessageSquare, 
  Database, 
  BarChart3, 
  Users, 
  Phone
} from 'lucide-react'

const features = [
  { 
    title: 'Always-On Growth Leadership',
    desc: 'Your fractional Head of Growth, running the system and hitting your targets.',
    icon: Rocket
  },
  { 
    title: 'Content That Builds Authority',
    desc: 'Weekly blogs and daily social posts, written in your authentic founder voice by expert human writers.',
    icon: PenTool
  },
  { 
    title: 'Outreach That Opens Doors',
    desc: 'Personalized LinkedIn and email sequences that start real conversations, not spam blasts.',
    icon: MessageSquare
  },
  { 
    title: 'CRM That Works for You',
    desc: 'A pre-configured Red Sovereign CRM (or we integrate with yours) to nurture leads to close.',
    icon: Database
  },
  { 
    title: 'Clarity Without the Chaos',
    desc: 'A real-time dashboard tracking only the metrics that actually matter.',
    icon: BarChart3
  },
  { 
    title: 'Fresh Leads, Every Month',
    desc: 'Expert-selected, verified ICP contacts to feed your funnel.',
    icon: Users
  },
  { 
    title: 'Founder-Level Strategy',
    desc: 'Weekly calls with experienced founders who\'ve built and sold B2B companies.',
    icon: Phone
  }
]

const toolReplacements = [
  { tool: 'HubSpot/CRM', cost: '$1,200+', included: true },
  { tool: 'Ahrefs/SEO Tools', cost: '$199+', included: true },
  { tool: 'Clay/Data Enrichment', cost: '$300+', included: true },
  { tool: 'Jasper/AI Writer', cost: '$99+', included: true },
  { tool: 'Instantly/Email Outreach', cost: '$97+', included: true },
]

export default function SystemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const totalSavings = 2263 // Pre-calculated from the copy

  return (
    <section id="system" className="py-20 md:py-28 px-6 bg-gray-50" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Complete Growth Foundation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Think of it like a SaaS subscription for your growth backed by a hands-on expert team.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="bg-white rounded-xl p-6 h-full border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Savings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Fire your expensive, disconnected tech stack.
            </h3>
            
            <div className="space-y-3 mb-8">
              {toolReplacements.map((tool, index) => (
                <motion.div
                  key={tool.tool}
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700">{tool.tool}</span>
                  </div>
                  <span className="text-gray-900 font-medium">{tool.cost}/mo</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700">Total Savings</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    Over ${totalSavings.toLocaleString()}
                  </span>
                  <span className="text-gray-600 text-sm ml-1">per month</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}