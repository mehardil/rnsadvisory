import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Clock, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ServiceCard from '@/components/ServiceCard'
import NotFound from './NotFound'
import DocumentChecklistTool from '@/components/tools/DocumentChecklistTool'
import CompanyCostTool from '@/components/tools/CompanyCostTool'
import StudyBudgetTool from '@/components/tools/StudyBudgetTool'
import CurrencyConverterTool from '@/components/tools/CurrencyConverterTool'
import BusinessHoursTool from '@/components/tools/BusinessHoursTool'
import EligibilityTool from '@/components/tools/EligibilityTool'
import { getTool } from '@/data/tools'
import { allServices } from '@/data/services'
import { whatsappLink, phoneLink } from '@/utils/links'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'
import { getIcon } from '@/utils/icons'

const relatedMap: Record<string, string[]> = {
  'document-checklist': ['golden-visa', 'student-visa', 'document-attestation'],
  'company-cost': ['uae-free-zone-company', 'uae-mainland-company', 'bank-account-opening'],
  'study-budget': ['study-abroad-counselling', 'student-visa', 'scholarship-guidance'],
  'currency-converter': ['tax-vat-compliance', 'wealth-investment-advisory', 'trade-finance'],
  'business-hours': ['work-visa', 'relocation-settling-in', 'executive-search'],
  'eligibility-check': ['golden-visa', 'work-visa', 'investor-entrepreneur-visa'],
}

export default function ToolDetail() {
  const { slug = '' } = useParams()
  const tool = getTool(slug)

  if (!tool) return <NotFound />

  const Icon = getIcon(tool.icon)
  const related = (relatedMap[tool.slug] || [])
    .map((serviceSlug) => allServices.find((s) => s.slug === serviceSlug))
    .filter(Boolean) as typeof allServices

  const ToolBody =
    tool.slug === 'document-checklist'
      ? DocumentChecklistTool
      : tool.slug === 'company-cost'
        ? CompanyCostTool
        : tool.slug === 'study-budget'
          ? StudyBudgetTool
          : tool.slug === 'currency-converter'
            ? CurrencyConverterTool
            : tool.slug === 'business-hours'
              ? BusinessHoursTool
              : EligibilityTool

  return (
    <>
      <Seo
        title={`${tool.title} — Free tool`}
        description={tool.description}
        path={`/tools/${tool.slug}`}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: tool.title, path: `/tools/${tool.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`Free tool · ${tool.time}`}
        title={tool.title}
        description={tool.description}
        crumbs={[{ name: 'Tools', path: '/tools' }, { name: tool.title }]}
        seed={`tool-${tool.slug}`}
        style="orbits"
        compact
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3 py-1.5 text-[0.72rem] text-ivory/60">
          <Icon size={14} className="text-softgold" /> {tool.tag}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3 py-1.5 text-[0.72rem] text-ivory/60">
          <ShieldCheck size={14} className="text-success" /> No email required
        </span>
      </PageHero>

      <section className="bg-page py-12 md:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="card rounded-2xl p-5 md:p-7">
              <ToolBody />
            </div>
            <p className="mt-4 text-[0.68rem] leading-relaxed text-faint">
              Estimates and checklists are indicative. Government fees, eligibility criteria and processing times change.
              Confirm your position with a qualified advisor before submitting an application or paying a fee.
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="card rounded-2xl p-5">
                <p className="eyebrow">Need a human?</p>
                <p className="mt-2 font-display text-xl leading-snug text-ink">We will check the result with you.</p>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-muted">
                  A 30-minute call is enough to confirm whether the estimate reflects your actual case.
                </p>
                <Link to="/contact#book" className="btn btn-gold btn-sm mt-4 w-full">
                  Book a consultation <ArrowRight size={13} />
                </Link>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <a href={phoneLink()} className="btn btn-outline btn-sm">
                    <Phone size={12} /> Call
                  </a>
                  <a
                    href={whatsappLink(`Hello RNS Global, I used the ${tool.title} tool and have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[0.66rem] text-faint">
                  <Clock size={11} /> Reply within 4 business hours
                </p>
              </div>

              {related.length > 0 && (
                <div>
                  <p className="mono-label mb-2">Relevant services</p>
                  <div className="space-y-2">
                    {related.map((service) => (
                      <ServiceCard key={`${service.categorySlug}-${service.slug}`} service={service} categorySlug={service.categorySlug} compact />
                    ))}
                  </div>
                </div>
              )}

              <Link to="/tools" className="link-underline inline-flex text-xs">
                All free tools <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
