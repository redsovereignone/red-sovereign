'use client'

import { useEffect } from 'react'
import { Check, Calculator } from 'lucide-react'
import { analytics } from '@/lib/analytics'

export default function PricingBlock() {
  useEffect(() => {
    analytics.pricingViewed();
  }, []);

  const savingsItems = [
    { item: 'Outbound automation tools', cost: '$800/mo' },
    { item: 'CRM & data enrichment', cost: '$600/mo' },
    { item: 'Email marketing platform', cost: '$400/mo' },
    { item: 'Sales intelligence tools', cost: '$300/mo' },
    { item: 'Content & social tools', cost: '$163/mo' },
  ];

  const totalSavings = savingsItems.reduce((sum, item) => {
    const cost = parseInt(item.cost.replace(/[^0-9]/g, ''));
    return sum + cost;
  }, 0);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Investment & Savings
          </h3>
          <p className="text-gray-400">
            Typical engagements from <span className="text-white font-semibold">$7,500/month</span>
          </p>
        </div>
        <Calculator className="w-6 h-6 text-red-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* What's included */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">What&apos;s Included:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-sm text-gray-300">Complete growth team (5+ specialists)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-sm text-gray-300">All tools & technology included</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-sm text-gray-300">Weekly founder strategy calls</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-sm text-gray-300">Performance guarantee</span>
            </li>
          </ul>
        </div>

        {/* Savings table */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Tools We Replace:</h4>
          <div className="space-y-1">
            {savingsItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-400">{item.item}</span>
                <span className="text-sm text-gray-300 font-mono">{item.cost}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Total Savings</span>
                <span className="text-sm font-bold text-green-400 font-mono">
                  ${totalSavings.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Net cost */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Effective Net Cost</p>
            <p className="text-xs text-gray-500 mt-1">After tool consolidation</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              ${(7500 - totalSavings).toLocaleString()}/mo
            </p>
            <p className="text-xs text-red-400 mt-1">
              Less than ⅓ of a Marketing Director
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => {
            analytics.trackEvent('pricing_cta_click', { action: 'start_engagement' });
          }}
          className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Start My Engagement
        </button>
        <button
          onClick={() => {
            analytics.trackEvent('pricing_cta_click', { action: 'email_plan' });
          }}
          className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
        >
          Email Me This Plan
        </button>
      </div>
    </div>
  );
}