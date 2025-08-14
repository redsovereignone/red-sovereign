'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, Sparkles, ArrowRight, FileText, Search, Users, Target, Map } from 'lucide-react'
import { analytics } from '@/lib/analytics'

interface ResultsPreviewProps {
  data: {
    companyName?: string;
    websiteUrl?: string;
    contactEmail?: string;
    ttmRevenue?: string;
    currentGrowthRate?: string;
    targetGrowthRate?: string;
    biggestChallenge?: string;
  };
}

export default function ResultsPreview({ data }: ResultsPreviewProps) {
  useEffect(() => {
    analytics.previewViewed(data);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Success message */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Perfect! Your Growth Plan is Being Prepared
        </h3>
        <p className="text-gray-400">
          Our team is analyzing {data.companyName || 'your company'} to create a custom growth strategy
        </p>
      </div>

      {/* What happens next */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-400" />
          What Happens Next:
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-gray-400 font-mono text-sm mt-0.5">1.</div>
            <div>
              <p className="text-white font-medium">Within 2 Hours</p>
              <p className="text-gray-400 text-sm">Our team begins analyzing your website and market position</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-gray-400 font-mono text-sm mt-0.5">2.</div>
            <div>
              <p className="text-white font-medium">Within 12 Hours</p>
              <p className="text-gray-400 text-sm">We research your competitors and identify growth opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-gray-400 font-mono text-sm mt-0.5">3.</div>
            <div>
              <p className="text-white font-medium">Within 24 Hours</p>
              <p className="text-gray-400 text-sm">You receive your complete growth plan and custom proposal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your custom deliverables */}
      <div className="bg-gradient-to-r from-red-600/10 to-red-500/10 border border-red-500/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-red-400" />
          Your Custom Deliverables:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DeliverableCard
            icon={<FileText className="w-5 h-5" />}
            title="Website Audit"
            description="Conversion optimization analysis specific to your site"
          />
          <DeliverableCard
            icon={<Search className="w-5 h-5" />}
            title="SEO & AI Analysis"
            description="Visibility gaps and ranking opportunities"
          />
          <DeliverableCard
            icon={<Users className="w-5 h-5" />}
            title="ICP & Messaging"
            description="Refined targeting and value proposition"
          />
          <DeliverableCard
            icon={<Target className="w-5 h-5" />}
            title="100 Target Prospects"
            description="Hand-picked companies matching your ICP"
          />
          <DeliverableCard
            icon={<Map className="w-5 h-5" />}
            title="90-Day Roadmap"
            description={`Week-by-week plan to hit ${data.targetGrowthRate || 'your growth'} target`}
          />
          <DeliverableCard
            icon={<ArrowRight className="w-5 h-5" />}
            title="Custom Proposal"
            description="Investment options and expected ROI"
          />
        </div>
      </div>

      {/* Personalized insight */}
      {data.biggestChallenge && (
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">Based on your challenge:</span> {' '}
            {getChallengeInsight(data.biggestChallenge)}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center pt-4">
        <p className="text-gray-400 mb-4">
          Check your email for updates, or
        </p>
        <a
          href="https://app.reclaim.ai/m/redsovereign"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition-all transform hover:scale-105"
        >
          Book a Strategy Call Now
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

function DeliverableCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 text-red-400">
        {icon}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{title}</p>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
}

function getChallengeInsight(challenge: string): string {
  const insights = {
    'Not enough leads': "We'll prioritize building multi-channel outreach campaigns to fill your pipeline quickly.",
    'Poor conversion rates': "We'll focus on sales enablement and conversion optimization to maximize your existing traffic.",
    'Long sales cycles': "We'll implement nurture sequences and sales acceleration tactics to shorten your cycle.",
    'No clear strategy': "We'll start with strategic alignment and build a comprehensive growth framework.",
    'Limited resources': "We'll focus on high-leverage activities that deliver maximum ROI with minimal resources."
  };
  
  return insights[challenge as keyof typeof insights] || "We'll create a custom strategy tailored to your specific needs.";
}