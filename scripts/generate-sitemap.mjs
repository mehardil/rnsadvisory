#!/usr/bin/env node
/** Generate public/sitemap.xml from the content data. */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { siteConfig } from '../src/config/siteConfig.js'
import { serviceCategories } from '../src/data/services.js'
import { industries } from '../src/data/industries.js'
import { articles } from '../src/data/articles.js'
import { tools } from '../src/data/tools.js'
import { legalPages } from '../src/data/legal.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const base = (process.env.SITE_URL || siteConfig.brand.website).replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'yearly' },
  { path: '/locations', priority: '0.8', changefreq: 'monthly' },
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/case-studies', priority: '0.7', changefreq: 'monthly' },
  { path: '/tools', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/sitemap', priority: '0.3', changefreq: 'monthly' },
]

serviceCategories.forEach((category) => {
  routes.push({ path: `/services/${category.slug}`, priority: '0.8', changefreq: 'monthly' })
  category.services.forEach((service) => {
    routes.push({ path: `/services/${category.slug}/${service.slug}`, priority: '0.7', changefreq: 'monthly' })
  })
})

industries.forEach((industry) => {
  routes.push({ path: `/industries/${industry.slug}`, priority: '0.7', changefreq: 'monthly' })
})

tools.forEach((tool) => {
  routes.push({ path: `/tools/${tool.slug}`, priority: '0.6', changefreq: 'monthly' })
})

articles.forEach((article) => {
  routes.push({ path: `/insights/${article.slug}`, priority: '0.6', changefreq: 'yearly' })
})

Object.keys(legalPages).forEach((slug) => {
  routes.push({ path: `/legal/${slug}`, priority: '0.2', changefreq: 'yearly' })
})

const urls = routes
  .map(
    (route) => `  <url>
    <loc>${base}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml)
console.log(`Sitemap written: ${routes.length} URLs → public/sitemap.xml`)
