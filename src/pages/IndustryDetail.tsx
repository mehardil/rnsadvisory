import { Link, useParams } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ServiceCard from '@/components/ServiceCard'
import Reveal from '@/components/Reveal'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import NotFound from './NotFound'
import { allServices } from '@/data/services'
import { getIndustry, industries } from '@/data/industries'
import { caseStudies } from '@/data/caseStudies'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

export default function IndustryDetail() {
  const { slug = '' } = useParams()
  const industry = getIndustry(slug)

  if (!industry) return <NotFound />

  const services = industry.services
    .map((serviceSlug) => allServices.find((s) => s.slug === serviceSlug))
    .filter(Boolean) as typeof allServices

  const study = caseStudies.find((c) => c.sector === industry.title) || caseStudies[0]
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 4)

  return (
    <>
      <Seo
        title={`${industry.title} advisory`}
        description={industry.description}
        path={`/industries/${industry.slug}`}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
            { name: industry.title, path: `/industries/${industry.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Industry"
        title={industry.title}
        description={industry.description}
        crumbs={[{ name: 'Industries', path: '/industries' }, { name: industry.title }]}
        seed={`industry-${industry.slug}`}
        style="contours"
        media={
          <div className="relative hidden lg:block">
            <div className="glass-dark rounded-2xl p-6">
              <IsoBadge icon={industry.icon} tone={toneFor(industry.slug)} size="lg" float />
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-softgold">{industry.tagline}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ivory/10 pt-4">
                {industry.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-lg text-ivory">{stat.value}</p>
                    <p className="mt-1 text-[0.6rem] leading-tight text-ivory/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <section className="bg-page py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">The context</span>
              <h2 className="mt-3 font-display text-3xl text-ink">How we work in {industry.title.toLowerCase()}</h2>
              <p className="mt-4 text-[0.96rem] leading-[1.85] text-muted">{industry.longDescription}</p>
            </Reveal>

            <Reveal className="mt-8">
              <p className="mono-label">What is moving in the sector</p>
              <ul className="mt-3 space-y-2.5">
                {industry.trends.map((trend) => (
                  <li key={trend} className="flex items-start gap-2.5 rounded-lg border border-[color:var(--hair)] bg-[color:var(--surface)] px-4 py-3 text-[0.82rem] text-muted">
                    <TrendingUp size={14} className="mt-0.5 shrink-0 text-gold" /> {trend}
                  </li>
                ))}
              </ul>
            </Reveal>

            {study && (
              <Reveal className="mt-8">
                <div className="rounded-2xl border border-gold/25 bg-[color:var(--surface)] p-6">
                  <p className="eyebrow">Case study</p>
                  <h3 className="mt-2 font-display text-xl text-ink">{study.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{study.challenge}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[color:var(--hair)] pt-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="font-mono text-sm text-gold-ink">{metric.after}</p>
                        <p className="mt-1 text-[0.62rem] text-muted">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/case-studies" className="link-underline mt-4 inline-flex text-xs">
                    All case studies <ArrowRight size={12} />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-3">Services we deploy</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {services.map((service) => (
                  <ServiceCard key={`${service.categorySlug}-${service.slug}`} service={service} categorySlug={service.categorySlug} compact />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container-x mt-14 border-t border-[color:var(--hair)] pt-8">
          <p className="mono-label mb-4">Other industries</p>
          <div className="flex flex-wrap gap-2">
            {others.map((other) => (
              <Link key={other.slug} to={`/industries/${other.slug}`} className="chip">
                {other.title}
              </Link>
            ))}
            <Link to="/industries" className="chip">
              All 14
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
