import { Helmet } from 'react-helmet-async'
import siteConfig from '@/config/siteConfig'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  jsonLd?: object[]
  noIndex?: boolean
}

const base = siteConfig.brand.website
const defaultImage = `${base}/og-cover.png`

export default function Seo({
  title,
  description,
  path,
  image = defaultImage,
  type = 'website',
  jsonLd = [],
  noIndex = false,
}: SeoProps) {
  const fullTitle = title.includes(siteConfig.brand.name) ? title : `${title} | ${siteConfig.brand.name}`
  const canonical = `${base}${path === '/' ? '' : path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
