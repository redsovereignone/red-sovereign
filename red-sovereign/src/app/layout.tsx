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
  title: 'Red Sovereign - Predictable Revenue Growth for B2B SaaS',
  description: 'Get a complete growth engine for 1/3 the cost of a Marketing Director. Founder-led expertise + AI automation to scale your B2B SaaS from $1M to $20M ARR.',
  keywords: 'B2B SaaS growth, revenue acceleration, fractional CMO, growth marketing, lead generation',
  authors: [{ name: 'Nick Vossburg' }],
  openGraph: {
    title: 'Red Sovereign - Predictable Revenue Without the Guesswork',
    description: 'Get a complete growth engine for 1/3 the cost of a Marketing Director. Join 50+ B2B SaaS companies scaling with Red Sovereign.',
    url: 'https://redsovereign.com',
    siteName: 'Red Sovereign',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Red Sovereign',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Sovereign - Predictable Revenue Growth for B2B SaaS',
    description: 'Get a complete growth engine for 1/3 the cost of a Marketing Director.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
