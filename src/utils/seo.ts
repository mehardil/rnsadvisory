import siteConfig from '@/config/siteConfig'

const base = siteConfig.brand.website

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.brand.name,
  legalName: siteConfig.brand.legalName,
  url: base,
  logo: `${base}/favicon.svg`,
  description: siteConfig.brand.description,
  foundingDate: String(siteConfig.brand.founded),
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  sameAs: siteConfig.socials.map((s) => s.href),
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.brand.streetAddress,
    addressLocality: siteConfig.brand.city,
    addressCountry: 'AE',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      availableLanguage: ['English', 'Arabic', 'Urdu', 'Hindi'],
    },
  ],
})

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.brand.name,
  url: base,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${base}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${base}${item.path}`,
  })),
})

export const serviceJsonLd = (svc: {
  title: string
  overview: string
  path: string
  priceFrom: number
  categoryTitle: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: svc.title,
  description: svc.overview,
  serviceType: svc.categoryTitle,
  url: `${base}${svc.path}`,
  provider: {
    '@type': 'Organization',
    name: siteConfig.brand.name,
    url: base,
  },
  areaServed: ['AE', 'SA', 'IN', 'PK', 'GB', 'EE', 'US', 'DE'],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: svc.priceFrom,
    availability: 'https://schema.org/InStock',
  },
})

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
})

export const articleJsonLd = (article: {
  title: string
  excerpt: string
  date: string
  readingTime: string
  author: { name: string; role: string }
  slug: string
  category: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  datePublished: article.date,
  dateModified: article.date,
  articleSection: article.category,
  timeRequired: article.readingTime,
  author: { '@type': 'Person', name: article.author.name, jobTitle: article.author.role },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.brand.name,
    logo: { '@type': 'ImageObject', url: `${base}/favicon.svg` },
  },
  mainEntityOfPage: `${base}/insights/${article.slug}`,
})

export const localBusinessJsonLd = (office: {
  city: string
  country: string
  address: string
  phone: string
  email: string
  lat: number
  lng: number
  hours: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${siteConfig.brand.name} — ${office.city}`,
  url: `${base}/locations`,
  telephone: office.phone,
  email: office.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: office.address,
    addressLocality: office.city,
    addressCountry: office.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: office.lat, longitude: office.lng },
  openingHours: office.hours,
})
