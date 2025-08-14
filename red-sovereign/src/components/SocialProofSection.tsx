'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    quote: "Red Sovereign took us from 20 MQLs/month to 180 in just 6 months. The playbook was clear, execution was flawless.",
    author: "Sarah Chen",
    role: "CEO, DataSync",
    metric: "9x MQL Growth"
  },
  {
    quote: "Finally, a growth partner who actually understands B2B SaaS. They delivered more in 3 months than our last agency did in a year.",
    author: "Marcus Johnson",
    role: "Founder, CloudOps",
    metric: "247% Pipeline Growth"
  },
  {
    quote: "The combination of strategy and execution is unmatched. They don't just tell you what to do - they build it with you.",
    author: "Emily Rodriguez",
    role: "VP Marketing, SecureAPI",
    metric: "3.2x ROAS"
  }
]

const logos = [
  { name: 'CloudBearing', src: '/logos/cloudbearing.png' },
  { name: 'FrozenCPU', src: '/logos/frozencpu.png' },
  { name: 'Sovereign AI', src: '/logos/sovereignai.jpg' },
  { name: 'TechAssist', src: '/logos/techAssist.gif' },
  { name: 'WellForce', src: '/logos/wellforce.png' }
]

export default function SocialProofSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trusted by 50+ B2B SaaS Companies
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From seed-stage startups to Series B scale-ups, we've helped teams 
            build predictable revenue engines that actually work.
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              <div>
                <div className="text-2xl font-bold text-white">6 Exits</div>
                <div className="text-sm text-gray-400">Founder Track Record</div>
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-3xl">💰</span>
              <div>
                <div className="text-2xl font-bold text-white">$18M+</div>
                <div className="text-sm text-gray-400">Revenue Generated</div>
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-3xl">📈</span>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Companies Scaled</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            >
              <div className="mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-400 text-sm rounded-full font-medium">
                  {testimonial.metric}
                </span>
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Trusted by teams that went on to join
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}