'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function FounderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 px-6 bg-gray-50" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Approach Was Forged in the Trenches of Bootstrapped Growth
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
            <div className="relative">
              <svg className="absolute top-0 left-0 w-8 h-8 text-gray-300 -mt-2 -ml-2" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <blockquote className="relative">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 pl-8">
                  Every founder knows the weight of payroll. I&apos;ve carried it while bootstrapping and I&apos;ve felt the frustration of marketing options that drain cash without delivering growth. That&apos;s why we built Red Sovereign: a growth system proven under pressure, where marketing must produce more cash than it consumes. Period.
                </p>
                
                <footer className="pl-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">NV</span>
                    </div>
                    <div>
                      <cite className="font-semibold text-gray-900 not-italic text-lg">
                        Nick Vossburg
                      </cite>
                      <p className="text-gray-600">Founder of Red Sovereign</p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Previously:</span> Founded, bootstrapped, and scaled multiple B2B companies past $5M in annual revenue before successful exits.
            </p>
          </motion.div>
        </motion.div>

        {/* Proven Track Record Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            A Proven Track Record in Bootstrapped Growth
          </h3>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our methodology isn&apos;t theoretical. It was forged in the trenches building and scaling these B2B companies:
            </p>
            
            {/* Company Logos */}
            <div className="flex justify-center items-center gap-6 md:gap-10 mt-12 overflow-x-auto">
              {/* CloudBearing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 bg-white border border-gray-200 rounded-lg p-4"
              >
                <Image
                  src="/logos/cloudbearing.png"
                  alt="CloudBearing"
                  width={140}
                  height={50}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ maxWidth: '140px' }}
                />
              </motion.div>

              {/* FrozenCPU */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 bg-white border border-gray-200 rounded-lg p-4"
              >
                <Image
                  src="/logos/frozencpu.png"
                  alt="FrozenCPU"
                  width={140}
                  height={50}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ maxWidth: '140px' }}
                />
              </motion.div>

              {/* Sovereign AI */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 bg-white border border-gray-200 rounded-lg p-4"
              >
                <Image
                  src="/logos/sovereignai.jpg"
                  alt="Sovereign AI"
                  width={140}
                  height={50}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ maxWidth: '140px' }}
                />
              </motion.div>

              {/* TechAssist */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.0 }}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 bg-white border border-gray-200 rounded-lg p-4"
              >
                <Image
                  src="/logos/techAssist.gif"
                  alt="TechAssist"
                  width={140}
                  height={50}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ maxWidth: '140px' }}
                />
              </motion.div>

              {/* WellForce */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.1 }}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 bg-white border border-gray-200 rounded-lg p-4"
              >
                <Image
                  src="/logos/wellforce.png"
                  alt="WellForce"
                  width={140}
                  height={50}
                  className="h-10 md:h-12 w-auto object-contain"
                  style={{ maxWidth: '140px' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}