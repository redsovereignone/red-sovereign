'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TrendingUp, Users, DollarSign } from 'lucide-react'
import { analytics } from '@/lib/analytics'

interface CaseStudy {
  id: string;
  clientLogo?: string;
  clientName: string;
  personName: string;
  personTitle: string;
  personHeadshot?: string;
  quote: string;
  metric: string;
  icon: React.ReactNode;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'saas-growth',
    clientName: 'TechScale SaaS',
    personName: 'Sarah Chen',
    personTitle: 'CEO & Founder',
    quote: "Red Sovereign delivered exactly what they promised. Our pipeline is now predictable and scalable.",
    metric: 'From 0 → 11 SQLs in 60 days',
    icon: <TrendingUp className="w-5 h-5 text-gray-400" />,
  },
  {
    id: 'cost-reduction',
    clientName: 'DevTools Pro',
    personName: 'Michael Torres',
    personTitle: 'Head of Growth',
    quote: "We eliminated 5 tools and saved 12 hours per week on operations. The efficiency gains are incredible.",
    metric: '$2,000/mo tools consolidated',
    icon: <DollarSign className="w-5 h-5 text-gray-400" />,
  },
  {
    id: 'meetings-booked',
    clientName: 'CloudOps Platform',
    personName: 'Jessica Williams',
    personTitle: 'VP Marketing',
    quote: "The quality of meetings is what impressed me most. These are real opportunities, not just calls.",
    metric: 'Booked 9 meetings in first 45 days',
    icon: <Users className="w-5 h-5 text-gray-400" />,
  },
];

export default function CaseStudyStrip() {
  const handleViewDetails = (studyId: string) => {
    analytics.caseStudyView(studyId);
    // Stub for now - would navigate to case study detail
    console.log('View case study:', studyId);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
            Real Results from Real Founders
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            See what's possible in your first 90 days
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Metric highlight */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {study.icon}
                  <span className="text-sm font-semibold text-gray-900">
                    {study.metric}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mb-6">
                <p className="text-gray-700 italic">
                  "{study.quote}"
                </p>
              </blockquote>

              {/* Person info */}
              <div className="flex items-center gap-3 mb-4">
                {study.personHeadshot ? (
                  <Image
                    src={study.personHeadshot}
                    alt={study.personName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                    {study.personName.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {study.personName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {study.personTitle}, {study.clientName}
                  </p>
                </div>
              </div>

              {/* View details link */}
              <button
                onClick={() => handleViewDetails(study.id)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                View details →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">50+</span>
              <span className="text-sm text-gray-600">B2B SaaS<br />Companies</span>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">450+</span>
              <span className="text-sm text-gray-600">SQLs<br />Generated</span>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">$2M+</span>
              <span className="text-sm text-gray-600">Pipeline<br />Created</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}