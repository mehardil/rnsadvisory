import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import SectionHeading from '@/components/SectionHeading'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'

export default function CaseStudiesSection() {
  const featured = caseStudies.filter((c) => c.featured).slice(0, 3)
  return (
    <section className="bg-page py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Case studies"
          title={
            <>
              Outcomes, measured <em>before and after.</em>
            </>
          }
          description="We publish the numbers that changed, not just the services we sold. Names are withheld where confidentiality applies."
          action={{ label: 'All case studies', to: '/case-studies' }}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.07}>
              <Link to={`/case-studies#${study.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <ArtFrame
                    seed={`case-${study.slug}`}
                    imageKey={`industry-${study.sector === 'Education' ? 'education' : study.sector === 'Retail & E-commerce' ? 'retail-ecommerce' : study.sector === 'Technology & Startups' ? 'technology-startups' : study.sector === 'Trading & Logistics' ? 'trading-logistics' : 'financial-services'}`}
                    alt={study.title}
                    animate={false}
                    rounded="rounded-none"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-softgold backdrop-blur">
                    {study.sector}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.12rem] leading-snug text-ink group-hover:text-gold-ink">{study.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[0.76rem] leading-relaxed text-muted">{study.challenge}</p>
                  <div className="mt-4 space-y-2 border-t border-[color:var(--hair)] pt-4">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between gap-2 text-[0.7rem]">
                        <span className="text-muted">{metric.label}</span>
                        <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-ink">
                          <span className="text-faint line-through decoration-[color:var(--hair-strong)]">{metric.before}</span>
                          <ArrowRight size={9} className="text-gold" />
                          <span className="text-gold-ink">{metric.after}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.72rem] font-semibold text-gold-ink">
                    Read the story <TrendingUp size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
