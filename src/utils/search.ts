import { allServices, serviceCategories } from '@/data/services'
import { industries } from '@/data/industries'
import { articles } from '@/data/articles'
import { locations } from '@/data/locations'
import { tools } from '@/data/tools'

export interface SearchItem {
  id: string
  title: string
  subtitle: string
  path: string
  type: 'Service' | 'Industry' | 'Article' | 'Location' | 'Tool' | 'Page'
  keywords: string
}

const pages: SearchItem[] = [
  { id: 'page-home', title: 'Home', subtitle: 'Expertise Without Borders', path: '/', type: 'Page', keywords: 'home rns global advisory' },
  { id: 'page-services', title: 'All Services', subtitle: `${allServices.length} services across ${serviceCategories.length} practices`, path: '/services', type: 'Page', keywords: 'services catalogue consulting advisory' },
  { id: 'page-industries', title: 'Industries', subtitle: '14 sectors served', path: '/industries', type: 'Page', keywords: 'industries sectors' },
  { id: 'page-about', title: 'About RNS Global', subtitle: 'Story, values, leadership and certifications', path: '/about', type: 'Page', keywords: 'about team leadership mission vision values' },
  { id: 'page-locations', title: 'Global Locations', subtitle: 'Nine offices across eight regions', path: '/locations', type: 'Page', keywords: 'offices dubai jebel ali riyadh mumbai lahore london frankfurt tallinn new york' },
  { id: 'page-insights', title: 'Insights', subtitle: 'Practical briefings on visas, study and markets', path: '/insights', type: 'Page', keywords: 'blog articles insights news guides' },
  { id: 'page-case-studies', title: 'Case Studies', subtitle: 'Client outcomes with before and after metrics', path: '/case-studies', type: 'Page', keywords: 'case studies results success stories' },
  { id: 'page-tools', title: 'Free Tools', subtitle: 'Cost estimators, checklists and converters', path: '/tools', type: 'Page', keywords: 'tools calculator checklist currency time zone eligibility' },
  { id: 'page-careers', title: 'Careers', subtitle: 'Open roles and benefits', path: '/careers', type: 'Page', keywords: 'jobs careers hiring vacancies' },
  { id: 'page-contact', title: 'Contact', subtitle: 'Book a free consultation', path: '/contact', type: 'Page', keywords: 'contact phone whatsapp email book consultation' },
  { id: 'page-portal', title: 'Client Portal', subtitle: 'Track your application, documents and appointments', path: '/portal', type: 'Page', keywords: 'portal login dashboard application status documents' },
  { id: 'page-consultation', title: 'Book a Consultation', subtitle: 'Pick a date and time that suits you', path: '/contact#book', type: 'Page', keywords: 'book appointment calendar consultation' },
]

export function buildSearchIndex(): SearchItem[] {
  const serviceItems: SearchItem[] = allServices.map((s) => ({
    id: `service-${s.categorySlug}-${s.slug}`,
    title: s.title,
    subtitle: `${s.categoryTitle} · from $${s.priceFrom.toLocaleString('en-US')}`,
    path: s.path,
    type: 'Service',
    keywords: `${s.title} ${s.categoryTitle} ${s.summary} ${(s.tags || []).join(' ')}`,
  }))

  const industryItems: SearchItem[] = industries.map((i) => ({
    id: `industry-${i.slug}`,
    title: i.title,
    subtitle: i.tagline,
    path: `/industries/${i.slug}`,
    type: 'Industry',
    keywords: `${i.title} ${i.tagline} ${i.description}`,
  }))

  const articleItems: SearchItem[] = articles.map((a) => ({
    id: `article-${a.slug}`,
    title: a.title,
    subtitle: `${a.category} · ${a.readingTime}`,
    path: `/insights/${a.slug}`,
    type: 'Article',
    keywords: `${a.title} ${a.category} ${a.tags.join(' ')} ${a.excerpt}`,
  }))

  const locationItems: SearchItem[] = locations.map((l) => ({
    id: `location-${l.id}`,
    title: `${l.city} — ${l.role}`,
    subtitle: `${l.country} · ${l.hours}`,
    path: `/locations#${l.id}`,
    type: 'Location',
    keywords: `${l.city} ${l.country} ${l.role} office ${l.services.join(' ')}`,
  }))

  const toolItems: SearchItem[] = tools.map((t) => ({
    id: `tool-${t.slug}`,
    title: t.title,
    subtitle: t.short,
    path: `/tools/${t.slug}`,
    type: 'Tool',
    keywords: `${t.title} ${t.description} ${t.tag}`,
  }))

  return [...pages, ...serviceItems, ...industryItems, ...articleItems, ...locationItems, ...toolItems]
}

const index = buildSearchIndex()

export function searchItems(query: string, limit = 10): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/).filter(Boolean)

  const scored = index
    .map((item) => {
      const title = item.title.toLowerCase()
      const subtitle = item.subtitle.toLowerCase()
      const keywords = item.keywords.toLowerCase()
      let score = 0
      for (const term of terms) {
        if (title.startsWith(term)) score += 90
        else if (title.includes(term)) score += 65
        if (subtitle.includes(term)) score += 25
        if (keywords.includes(term)) score += 18
        if (item.type.toLowerCase().includes(term)) score += 12
      }
      if (title === q) score += 60
      return { item, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scored.map((s) => s.item)
}

export const searchIndex = index
