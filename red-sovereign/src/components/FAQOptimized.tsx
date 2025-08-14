'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Clock, Calendar, Users, Database, Zap, UsersRound, Building2, Wrench, Target, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "How fast are results?",
    answer: "Most clients see first meetings booked within 2-3 weeks. By day 30, you'll have a fully operational growth engine. By day 90, expect 8-12 qualified opportunities on your calendar. We focus on quick wins while building long-term sustainable growth.",
    icon: <Clock className="w-5 h-5 text-gray-400" />
  },
  {
    question: "What's the commitment?",
    answer: "Month-to-month with no long-term contracts. We earn your business every 30 days. Most clients stay 12+ months because the results speak for themselves. Cancel anytime with 30 days notice.",
    icon: <Calendar className="w-5 h-5 text-gray-400" />
  },
  {
    question: "What we need from you weekly",
    answer: "Just 2-3 hours per week: One 30-minute strategy call with our team, 1-2 hours reviewing and approving campaigns, and occasional feedback on lead quality. We handle everything else - from content creation to campaign execution.",
    icon: <Users className="w-5 h-5 text-gray-400" />
  },
  {
    question: "Who owns the data?",
    answer: "You own everything. All leads go directly into your CRM, all accounts are in your name, and all data belongs to you. We're building YOUR growth engine, not ours. Full transparency and access from day one.",
    icon: <Database className="w-5 h-5 text-gray-400" />
  },
  {
    question: "How it works",
    answer: "We install a complete growth system: Week 1-2: Audit and strategy. Week 3-4: Launch outbound engine. Month 2: Optimize and scale. Month 3: Full velocity with predictable pipeline. Everything is done-for-you with weekly reporting.",
    icon: <Zap className="w-5 h-5 text-gray-400" />
  },
  {
    question: "What if we already have a marketing team?",
    answer: "Perfect! We complement internal teams by handling execution while they focus on strategy. Many clients use us to accelerate specific channels (like outbound) or fill skill gaps without hiring full-time.",
    icon: <UsersRound className="w-5 h-5 text-gray-400" />
  },
  {
    question: "How are you different from agencies?",
    answer: "We're not an agency. We're a fractional growth team led by founders who've exited multiple B2B companies. No account managers, no junior staff - just senior operators who've been in your shoes.",
    icon: <Building2 className="w-5 h-5 text-gray-400" />
  },
  {
    question: "What tools do you use?",
    answer: "We bring our entire tech stack (worth $2,263/mo) at no extra cost. This includes outbound automation, CRM, email tools, data enrichment, and analytics. Everything integrates with your existing systems.",
    icon: <Wrench className="w-5 h-5 text-gray-400" />
  },
  {
    question: "What industries do you work with?",
    answer: "B2B SaaS, DevTools, FinTech, HealthTech, and technical B2B services. If you sell to businesses and have a $5k+ ACV, we can help. We don't work with B2C or physical products.",
    icon: <Target className="w-5 h-5 text-gray-400" />
  },
  {
    question: "What size companies do you work with?",
    answer: "Typically $1M-$20M ARR companies ready to scale. Too early and you need product-market fit first. Too late and you need a full in-house team. We're perfect for the scaling phase.",
    icon: <BarChart3 className="w-5 h-5 text-gray-400" />
  }
];

export default function FAQOptimized() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Everything you need to know about working with Red Sovereign
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-3">
                  {faq.icon && faq.icon}
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                      {/* Special case for "How it works" - add link */}
                      {faq.question === "How it works" && (
                        <Link
                          href="#system"
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 mt-3 text-sm font-medium transition-colors duration-200"
                        >
                          See detailed process →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional help */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mt-12 text-center p-8 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <p className="text-lg text-gray-900 mb-2">
            Still have questions?
          </p>
          <p className="text-gray-600 mb-4">
            Get answers directly from our founder
          </p>
          <Link
            href="https://app.reclaim.ai/m/redsovereign"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Book a Strategy Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}