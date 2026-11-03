import type { ArtStyle } from '@/components/GenerativeArt'

/** Deterministic art direction per practice, so imagery feels curated rather than random. */
const CATEGORY_STYLES: Record<string, ArtStyle> = {
  education: 'contours',
  travel: 'aurora',
  immigration: 'crystals',
  'business-setup': 'skyline',
  strategy: 'mesh',
  finance: 'waves',
  legal: 'contours',
  trade: 'skyline',
  hr: 'particles',
  technology: 'particles',
  'real-estate': 'skyline',
  specialised: 'orbits',
}

export const artStyleForCategory = (slug?: string): ArtStyle =>
  (slug && CATEGORY_STYLES[slug]) || 'mesh'

const ARTICLE_STYLES: Record<string, ArtStyle> = {
  Immigration: 'crystals',
  Education: 'contours',
  Business: 'skyline',
  Tax: 'waves',
  Trade: 'skyline',
  Relocation: 'orbits',
  Careers: 'mesh',
}

export const artStyleForArticle = (category?: string): ArtStyle =>
  (category && ARTICLE_STYLES[category]) || 'mesh'

const INDUSTRY_STYLES: Record<string, ArtStyle> = {
  education: 'contours',
  'travel-tourism': 'aurora',
  'real-estate': 'skyline',
  'trading-logistics': 'skyline',
  healthcare: 'waves',
  'technology-startups': 'particles',
  'retail-ecommerce': 'mesh',
  manufacturing: 'waves',
  energy: 'aurora',
  hospitality: 'crystals',
  'financial-services': 'orbits',
  construction: 'mesh',
  'government-ngos': 'contours',
  'agriculture-food': 'contours',
}

export const artStyleForIndustry = (slug?: string): ArtStyle =>
  (slug && INDUSTRY_STYLES[slug]) || 'mesh'
