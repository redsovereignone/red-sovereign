'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/redsovereign',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: 'Twitter',
    href: 'https://x.com/redsovereign',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61569296463191',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'Email',
    href: 'mailto:hello@redsovereign.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
]

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Growth Foundation', href: '#system' },
      { label: 'PPC Accelerator', href: '#system' },
      { label: 'Signal Tracking', href: '#system' },
      { label: 'Outreach Expansion', href: '#system' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Growth Playbook', href: '#playbook' },
      { label: 'ROI Calculator', href: '#system' },
      { label: 'Free Consultation', href: 'https://app.reclaim.ai/m/redsovereign' },
      { label: 'FAQ', href: '#faq' },
    ]
  },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Red Sovereign"
                width={250}
                height={78}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Installing predictable revenue engines in B2B companies. 
              Your complete growth team, amplified by AI.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-900 font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Red Sovereign. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-xs">
            Built by founders who&apos;ve scaled and exited B2B companies. 
            We practice what we preach.
          </p>
        </div>
      </div>
    </footer>
  )
}