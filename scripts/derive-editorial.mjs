#!/usr/bin/env node
/**
 * Expand the editorial base photographs into every image key the site asks for.
 *
 * Each page/service/industry/article gets its own WebP. Keys that share a base
 * photo receive a deterministic crop and a subtle grade, so a category grid
 * never looks like the same frame repeated. Run after generate-editorial.mjs.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { serviceCategories } from '../src/data/services.js'
import { industries } from '../src/data/industries.js'
import { articles } from '../src/data/articles.js'
import { locations } from '../src/data/locations.js'
import { leadership } from '../src/data/about.js'
import { tools } from '../src/data/tools.js'
import { caseStudies } from '../src/data/caseStudies.js'
import { legalSlugs } from '../src/data/legal.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'generated')

const categoryBase = {
  education: 'base-campus',
  travel: 'base-travel',
  immigration: 'base-immigration',
  'business-setup': 'base-business',
  strategy: 'base-strategy',
  finance: 'base-finance',
  legal: 'base-legal',
  trade: 'base-trade',
  hr: 'base-hr',
  technology: 'base-technology',
  'real-estate': 'base-realestate',
  specialised: 'base-healthcare',
}

const industryBase = {
  education: 'base-education',
  'travel-tourism': 'base-travel',
  'real-estate': 'base-realestate',
  'trading-logistics': 'base-trade',
  healthcare: 'base-healthcare',
  'technology-startups': 'base-technology',
  'retail-ecommerce': 'base-retail',
  manufacturing: 'base-manufacturing',
  energy: 'base-energy',
  hospitality: 'base-hospitality',
  'financial-services': 'base-finance',
  construction: 'base-construction',
  'government-ngos': 'base-government',
  'agriculture-food': 'base-agriculture',
}

const categoryServicePool = {
  education: [
    'base-study-abroad',
    'base-university-admissions',
    'base-scholarship',
    'base-student-visa',
    'base-test-prep',
    'base-k12-school',
    'base-corporate-training',
  ],
  travel: ['base-travel', 'base-city', 'base-immigration', 'base-government', 'base-presentation', 'base-healthcare'],
  immigration: [
    'base-city',
    'base-advisory-meeting',
    'base-immigration',
    'base-business',
    'base-signing',
    'base-hospitality',
    'base-technology',
  ],
  'business-setup': [
    'base-business',
    'base-city',
    'base-company-registration',
    'base-finance',
    'base-presentation',
    'base-technology',
    'base-signing',
    'base-legal-docs',
  ],
  strategy: [
    'base-strategy',
    'base-global-network',
    'base-analytics',
    'base-finance',
    'base-case',
    'base-workshop',
    'base-team-collab',
  ],
  finance: ['base-finance', 'base-presentation', 'base-insights', 'base-analytics', 'base-case', 'base-signing'],
  legal: ['base-legal', 'base-legal-docs', 'base-signing', 'base-government', 'base-technology', 'base-energy'],
  trade: ['base-trade', 'base-government', 'base-warehouse-logistics', 'base-analytics', 'base-retail'],
  hr: ['base-hr', 'base-team-collab', 'base-analytics', 'base-immigration'],
  technology: [
    'base-technology',
    'base-team-collab',
    'base-workshop',
    'base-analytics',
    'base-presentation',
    'base-global-network',
  ],
  'real-estate': ['base-property-viewing', 'base-realestate', 'base-construction', 'base-hospitality'],
  specialised: ['base-healthcare', 'base-energy', 'base-government', 'base-about', 'base-finance'],
}

const serviceMediaBase = {
  education: 'base-university-admissions',
  travel: 'base-travel',
  immigration: 'base-advisory-meeting',
  'business-setup': 'base-advisory-meeting',
  strategy: 'base-workshop',
  finance: 'base-analytics',
  legal: 'base-signing',
  trade: 'base-analytics',
  hr: 'base-team-collab',
  technology: 'base-team-collab',
  'real-estate': 'base-advisory-meeting',
  specialised: 'base-advisory-meeting',
}

const articlePool = {
  Immigration: ['base-immigration', 'base-government', 'base-city'],
  Education: ['base-education', 'base-insights', 'base-city'],
  Business: ['base-business', 'base-finance', 'base-city'],
  Trade: ['base-trade', 'base-construction', 'base-city'],
  Tax: ['base-finance', 'base-insights', 'base-case'],
  Relocation: ['base-immigration', 'base-city', 'base-hospitality'],
  Careers: ['base-hr', 'base-about', 'base-city'],
}

const locationPool = ['base-city', 'base-finance', 'base-construction', 'base-government']
const teamPool = ['base-about', 'base-team-collab', 'base-counselling', 'base-advisory-meeting']

const caseBase = {
  'Technology & Startups': 'base-technology',
  Education: 'base-education',
  'Retail & E-commerce': 'base-retail',
  'Trading & Logistics': 'base-trade',
  'Real Estate': 'base-realestate',
  Manufacturing: 'base-manufacturing',
}

const toolBase = {
  'document-checklist': 'base-insights',
  'company-cost': 'base-finance',
  'study-budget': 'base-education',
  'currency-converter': 'base-finance',
  'business-hours': 'base-city',
  'eligibility-check': 'base-about',
}

const pageBase = {
  'about-story': 'base-advisory-meeting',
  'about-story-image': 'base-workshop',
  'careers-hero': 'base-team-collab',
  'case-studies-hero': 'base-case',
  'contact-hero': 'base-contact',
  'industries-hero': 'base-city',
  'insights-hero': 'base-analytics',
  'locations-hero': 'base-city',
  'not-found': 'base-city',
  'portal-hero': 'base-insights',
  'search-hero': 'base-insights',
  'services-hero': 'base-advisory-meeting',
  sitemap: 'base-city',
  'tools-hero': 'base-analytics',
  'home-final-cta': 'base-city',
  'home-hero-aurora': 'base-city',
  'home-hero-mobile': 'base-city',
  'trust-strip': 'base-advisory-meeting',
  testimonials: 'base-counselling',
  'how-we-work': 'base-team-collab',
  'faq-help': 'base-advisory-meeting',
  'why-accountable': 'base-advisory-meeting',
  'why-aligned': 'base-signing',
  'why-local': 'base-global-network',
  'why-compliance': 'base-legal',
  'why-speed': 'base-presentation',
  'why-documented': 'base-analytics',
  'service-orbit': 'base-strategy',
  'service-finder': 'base-workshop',
  'about-mission': 'base-workshop',
  'about-vision': 'base-global-network',
  'careers-culture': 'base-team-collab',
  'contact-booking': 'base-advisory-meeting',
}

const assignments = new Map()

function add(key, base) {
  if (!base) throw new Error(`Missing base for ${key}`)
  assignments.set(key, base)
}

for (const category of serviceCategories) {
  const base = categoryBase[category.slug]
  add(`category-${category.slug}`, base)
  const pool = categoryServicePool[category.slug] || [base]
  category.services.forEach((service, index) => {
    add(`service-${category.slug}-${service.slug}`, pool[index % pool.length])
  })
  add(`service-media-${category.slug}`, serviceMediaBase[category.slug] || base)
}

for (const industry of industries) add(`industry-${industry.slug}`, industryBase[industry.slug])
const articleCounters = {}
for (const article of articles) {
  const pool = articlePool[article.category] || ['base-insights']
  const index = articleCounters[article.category] || 0
  add(`article-${article.slug}`, pool[index % pool.length])
  articleCounters[article.category] = index + 1
}
locations.forEach((location, index) => add(`location-${location.id}`, locationPool[index % locationPool.length]))
leadership.forEach((person, index) => add(`team-${person.initials.toLowerCase()}`, teamPool[index % teamPool.length]))
for (const tool of tools) add(`tool-${tool.slug}`, toolBase[tool.slug] || 'base-insights')
for (const study of caseStudies) add(`case-${study.slug}`, caseBase[study.sector] || 'base-case')
for (const slug of legalSlugs) add(`legal-${slug}`, 'base-legal')
for (const [key, base] of Object.entries(pageBase)) add(key, base)

function hash(value) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function cropFor(key) {
  const h = hash(key)
  const isCard = /^(service|industry|article|tool|case|team)-/.test(key)
  if (!isCard) return null

  // Cards use the full frame so each photograph reads cleanly instead of being
  // cropped tighter than the 16:10 cover it is displayed in.
  const zooms = [1]
  const zoom = zooms[h % zooms.length]
  const width = Math.round(1600 / zoom)
  const height = Math.round(1000 / zoom)
  const left = Math.round(((h >>> 5) % 1000) / 1000 * (1600 - width))
  const top = Math.round(((h >>> 11) % 1000) / 1000 * (1000 - height))
  return { left, top, width, height }
}

await fs.mkdir(outDir, { recursive: true })

const bases = new Map()
for (const [, base] of assignments) {
  if (bases.has(base)) continue
  try {
    bases.set(base, await fs.readFile(path.join(outDir, `${base}.webp`)))
  } catch {
    console.warn(`  missing base ${base}.webp — using a fallback frame`)
  }
}

const fallbackBase = bases.has('base-city') ? 'base-city' : [...bases.keys()][0]

const images = {}
let written = 0

for (const [key, base] of assignments) {
  const resolvedBase = bases.has(base) ? base : fallbackBase
  const buffer = bases.get(resolvedBase)
  if (!buffer) throw new Error(`missing base buffer for ${base}`)

  const crop = cropFor(key)
  const h = hash(key)
  const brightness = 0.99 + (h % 5) * 0.008
  const saturation = 0.9 + ((h >>> 3) % 4) * 0.02

  let pipeline = sharp(buffer)
  if (crop) pipeline = pipeline.extract(crop)
  pipeline = pipeline
    .resize(1600, 1000, { fit: 'cover', position: 'centre' })
    .modulate({ brightness, saturation })
    .webp({ quality: 82, effort: 5 })

  await pipeline.toFile(path.join(outDir, `${key}.webp`))
  images[key] = { source: resolvedBase }
  written += 1
}

const manifestPath = path.join(outDir, 'manifest.json')
let previous = {}
try {
  previous = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
} catch {
  previous = {}
}

const manifest = {
  provider: 'pexels + pollinations editorial base set',
  generatedAt: new Date().toISOString(),
  style: 'editorial corporate photography',
  images: { ...(previous.images || {}), ...images },
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Wrote ${written} derived images across ${bases.size} base photographs.`)
