import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Quote } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import { caseStudies } from '@/data/caseStudies'
import { allServices } from '@/data/services'
import { artStyleForIndustry } from '@/utils/art'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

const sectorImage: Record<string, string> = {
  'Technology & Startups': 'technology-startups',
  Education: 'education',
  'Retail & E-commerce': 'retail-ecommerce',
  'Trading & Logistics': 'trading-logistics',
  'Real Estate': 'real-estate',
  Manufacturing: 'manufacturing',
}

function serviceLink(slug: string) {
  const service = allServices.find((s) => s.slug === slug)
  return service ? { title: service.title, path: service.path } : null
}

export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case studies — measured outcomes"
        description="Before-and-after results from RNS Global engagements: UAE licensing, Estonia student pathways, Jebel Ali fulfilment, family succession, Golden Visas and Saudi market entry."
        path="/case-studies"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Case studies', path: '/case-studies' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Case studies"
        title={
          <>
            The numbers <em className="italic text-softgold">that changed.</em>
          </>
        }
        description="Six engagements across licensing, education, trade, succession and market entry. Names and identifying details are withheld where confidentiality applies."
        crumbs={[{ name: 'Case studies' }]}
        seed="case-studies-hero"
        style="skyline"
      />

      <section className="border-b border-[color:var(--hair)] bg-[color:var(--surface)] py-8">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ['1,150+', 'Companies formed'],
            ['2,400+', 'Students placed'],
            ['9,800+', 'Shipments coordinated'],
            ['96%', 'Visa success'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-mono text-2xl text-ink md:text-3xl">{value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x space-y-10">
          {caseStudies.map((study, index) => {
            const imageKey = `industry-${sectorImage[study.sector] || 'financial-services'}`
            return (
              <Reveal key={study.slug}>
                <article id={study.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
                  <div className="grid lg:grid-cols-12">
                    <div className={`relative min-h-[240px] lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <ArtFrame
                        seed={`case-${study.slug}`}
                        imageKey={imageKey}
                        style={artStyleForIndustry(sectorImage[study.sector] || 'financial-services')}
                        alt={study.title}
                        animate={false}
                        rounded="rounded-none"
                        className="absolute inset-0 h-full w-full"
                      />
                      <span className="absolute left-5 top-5 rounded-full bg-navy/70 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-softgold backdrop-blur">
                        {study.sector}
                      </span>
                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/55">{study.location}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/60 px-2.5 py-1 text-[0.66rem] text-ivory/65 backdrop-blur">
                          <Clock size={11} /> {study.duration}
                        </span>
                      </div>
                    </div>

                    <div className={`p-6 md:p-8 lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <p className="mono-label">{study.client}</p>
                      <h2 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">{study.title}</h2>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mono-label !text-[8px]">The challenge</p>
                          <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{study.challenge}</p>
                        </div>
                        <div>
                          <p className="mono-label !text-[8px]">What we did</p>
                          <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{study.approach}</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-2 border-t border-[color:var(--hair)] pt-4 sm:grid-cols-3">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="rounded-lg bg-[color:var(--surface-2)] px-3 py-2.5">
                            <p className="text-[0.62rem] text-muted">{metric.label}</p>
                            <p className="mt-1 text-[0.66rem] text-faint line-through">{metric.before}</p>
                            <p className="font-mono text-[0.8rem] text-gold-ink">{metric.after}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-start gap-2 rounded-lg border-l-2 border-gold bg-gold/[0.05] px-3 py-2.5">
                        <Quote size={14} className="mt-0.5 shrink-0 text-gold" />
                        <p className="text-[0.78rem] italic leading-relaxed text-ink">{study.quote}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {study.services.map((slug) => {
                          const link = serviceLink(slug)
                          return link ? (
                            <Link key={slug} to={link.path} className="chip !py-1 !text-[0.66rem]">
                              {link.title}
                            </Link>
                          ) : null
                        })}
                        <Link to="/contact#book" className="ms-auto inline-flex items-center gap-1 text-[0.72rem] font-semibold text-gold-ink">
                          Discuss a similar brief <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <div className="container-x mt-10">
          <p className="text-[0.7rem] leading-relaxed text-faint">
            Results depend on individual circumstances and are not a guarantee of future outcomes. Client names and some
            identifying details are illustrative or withheld for confidentiality.
          </p>
        </div>
      </section>
    </>
  )
}
