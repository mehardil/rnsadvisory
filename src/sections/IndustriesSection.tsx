import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { industries } from '@/data/industries'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import ArtFrame from '@/components/ArtFrame'
import IsoBadge, { toneFor } from '@/components/IsoBadge'

export default function IndustriesSection() {
  return (
    <section className="border-y border-[color:var(--hair)] bg-[color:var(--bg-2)] py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              We understand the <em>context</em>, not just the service.
            </>
          }
          description="Fourteen sectors, each with its own regulation, margin structure and pace. Our teams are organised around the realities of your industry."
          action={{ label: 'All industries', to: '/industries' }}
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => {
            return (
              <Reveal key={industry.slug} delay={Math.min(index * 0.025, 0.2)}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group card card-hover flex h-full flex-col overflow-hidden"
                >
                  <div className="relative h-28 shrink-0">
                    <div className="absolute inset-0 overflow-hidden">
                      <ArtFrame
                        seed={`industry-${industry.slug}`}
                        imageKey={`industry-${industry.slug}`}
                        alt={industry.title}
                        animate={false}
                        rounded="rounded-none"
                        className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy/60 text-ivory backdrop-blur transition-colors group-hover:bg-gold group-hover:text-navy">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <span className="absolute -bottom-4 left-4 z-10">
                      <IsoBadge icon={industry.icon} tone={toneFor(industry.slug)} size="md" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 pt-7">
                    <h3 className="font-display text-[1.08rem] leading-snug text-ink group-hover:text-gold-ink">
                      {industry.title}
                    </h3>
                    <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted">{industry.tagline}</p>
                    <p className="mt-auto pt-3 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                      {industry.stats[0].value} {industry.stats[0].label.toLowerCase()}
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
          <Reveal delay={0.2}>
            <Link
              to="/industries"
              className="group flex h-full min-h-[170px] flex-col justify-between rounded-2xl border border-gold/30 bg-navy p-5 text-ivory transition-colors hover:border-gold"
            >
              <span className="eyebrow !text-softgold">Not listed?</span>
              <div>
                <p className="font-display text-xl leading-tight">Tell us about your sector.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-softgold">
                  Talk to us <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
