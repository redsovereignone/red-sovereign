import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://redsovereign.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Explicit rules for AI bots
      {
        userAgent: ['ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Claude-Web', 'SearchGPT', 'YouBot'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
