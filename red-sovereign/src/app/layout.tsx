import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Red Sovereign - Predictable Revenue Growth for B2B SaaS',
    template: '%s | Red Sovereign'
  },
  description: 'Get a complete growth engine for 1/3 the cost of a Marketing Director. Founder-led expertise + AI automation to scale your B2B SaaS from $1M to $20M ARR. Join 50+ companies achieving 40%+ growth rates.',
  keywords: [
    'B2B SaaS growth',
    'revenue acceleration',
    'fractional CMO',
    'growth marketing',
    'lead generation',
    'SaaS marketing',
    'revenue optimization',
    'B2B lead generation',
    'growth hacking',
    'marketing automation',
    'conversion optimization',
    'demand generation',
    'sales funnel optimization',
    'customer acquisition',
    'marketing strategy'
  ],
  authors: [{ name: 'Nick Vossburg', url: 'https://redsovereign.com' }],
  creator: 'Nick Vossburg',
  publisher: 'Red Sovereign',
  category: 'Business Services',
  classification: 'B2B Marketing Services',
  metadataBase: new URL('https://redsovereign.com'),
  alternates: {
    canonical: 'https://redsovereign.com',
  },
  openGraph: {
    title: 'Red Sovereign - Predictable Revenue Without the Guesswork',
    description: 'Get a complete growth engine for 1/3 the cost of a Marketing Director. Join 50+ B2B SaaS companies scaling with Red Sovereign. Generate your free 90-day growth plan.',
    url: 'https://redsovereign.com',
    siteName: 'Red Sovereign',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Red Sovereign - B2B SaaS Growth Marketing Experts',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@redsovereign',
    creator: '@nickvossburg',
    title: 'Red Sovereign - Predictable Revenue Growth for B2B SaaS',
    description: 'Get a complete growth engine for 1/3 the cost of a Marketing Director. Generate your free 90-day growth plan.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
};

// Structured Data for Business
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://redsovereign.com/#organization",
      "name": "Red Sovereign",
      "url": "https://redsovereign.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://redsovereign.com/logo.png",
        "width": 1200,
        "height": 630
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": "https://app.reclaim.ai/m/redsovereign"
      },
      "sameAs": [
        "https://linkedin.com/company/red-sovereign"
      ],
      "founder": {
        "@type": "Person",
        "name": "Nick Vossburg"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://redsovereign.com/#website",
      "url": "https://redsovereign.com",
      "name": "Red Sovereign",
      "description": "B2B SaaS Growth Marketing Services",
      "publisher": {
        "@id": "https://redsovereign.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": "https://redsovereign.com/#service",
      "name": "B2B SaaS Growth Marketing",
      "description": "Complete growth engine for B2B SaaS companies scaling from $1M to $20M ARR",
      "provider": {
        "@id": "https://redsovereign.com/#organization"
      },
      "serviceType": "Marketing Services",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "Offer",
        "price": "7500",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "7500",
          "priceCurrency": "USD",
          "unitText": "per month"
        },
        "description": "Fractional growth team for B2B SaaS companies"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://redsovereign.com/#webpage",
      "url": "https://redsovereign.com",
      "name": "Red Sovereign - Predictable Revenue Growth for B2B SaaS",
      "isPartOf": {
        "@id": "https://redsovereign.com/#website"
      },
      "about": {
        "@id": "https://redsovereign.com/#organization"
      },
      "description": "Get a complete growth engine for 1/3 the cost of a Marketing Director. Join 50+ B2B SaaS companies achieving predictable growth.",
      "inLanguage": "en-US"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#FAFAF8] text-[#0F172A]`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
