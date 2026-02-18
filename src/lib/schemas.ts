import { site } from "@/data/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description,
    email: site.email,
    sameAs: [site.linkedin, site.twitter],
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.title,
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

export function webPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: organizationSchema(),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function blogPostSchema(opts: {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  image?: string;
  url: string;
  wordCount?: number;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.pubDate.toISOString(),
    ...(opts.updatedDate && {
      dateModified: opts.updatedDate.toISOString(),
    }),
    author: {
      "@type": "Person",
      name: opts.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo.png`,
      },
    },
    ...(opts.image && {
      image: opts.image.startsWith("http")
        ? opts.image
        : `${site.url}${opts.image}`,
    }),
    url: opts.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    ...(opts.wordCount && { wordCount: opts.wordCount }),
    ...(opts.tags?.length && { keywords: opts.tags.join(", ") }),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
