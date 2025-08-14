'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  PlayCircle,
  Shield,
  UserCheck,
  Users,
  Clock,
  Calendar,
  Wrench,
  Building2
} from 'lucide-react'

const faqs = [
  {
    question: "How does the 90-Day Growth Playbook work?",
    answer: "Answer 5 quick questions about your business (takes 60 seconds), and our system generates your personalized growth roadmap for the next 3 months. It shows exactly what to do each week, what results to expect, and how long each step takes. It's the same framework we use with our clients, completely free.",
    icon: PlayCircle
  },
  {
    question: "Who owns the marketing system and data?",
    answer: "You do. 100%. If we ever part ways, we transfer ownership of all accounts, data, and assets directly to you. You're building your own asset, not renting ours.",
    icon: Shield
  },
  {
    question: "How is this different from hiring a CMO or Marketing Director?",
    answer: "A Marketing Director costs $150K-$250K plus benefits, and they still need a team and tools. We provide the strategist, the team, the tools, and the proven playbooks for less than 1/3 of that investment. Plus, we've already made the mistakes and learned the lessons building our own companies.",
    icon: UserCheck
  },
  {
    question: "What if I already have marketing people?",
    answer: "Perfect. We systematize and amplify what they're doing. Your team focuses on strategy and relationships while our system handles execution and scale. Your playbook will show exactly how we'd integrate.",
    icon: Users
  },
  {
    question: "How long until I see results?",
    answer: "Your custom playbook shows week-by-week expectations. Typically: Onboarding takes 14-21 days, first outreach campaigns launch within 30 days, and qualified conversations begin flowing within 45-60 days. We focus on sustainable growth, not quick wins that flame out.",
    icon: Clock
  },
  {
    question: "What's the commitment?",
    answer: "We start with a 3-month initial term to ensure the system has time to build momentum (your playbook shows why 90 days matters). After that, continue month-to-month as long as you're seeing value.",
    icon: Calendar
  },
  {
    question: "Can I implement the playbook myself?",
    answer: "Absolutely. Your playbook includes everything you'd need to DIY. It also shows the time, tools, and expertise required. Most founders realize it's more cost-effective to have us handle it, but the choice is yours.",
    icon: Wrench
  },
  {
    question: "What types of B2B companies do you work best with?",
    answer: "We excel with B2B SaaS, professional services, and technical products selling to mid-market and enterprise. Typical clients have $1M-$20M ARR and are ready to scale systematically. The playbook generator will tell you if we're a good fit.",
    icon: Building2
  }
]

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <faq.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-blue-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}