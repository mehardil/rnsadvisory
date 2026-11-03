import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { industries } from '@/data/industries'
import { getIcon } from '@/utils/icons'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries we serve"
        description="Fourteen sectors supported by RNS Global: education, travel, real estate, trade, healthcare, technology, retail, manufacturing, energy, hospitality, finance, construction, government and agriculture."
        path="/industries"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Sector knowledge, <em className="italic text-softgold">not generalities.</em>
          </>
        }
        description="Regulation, margins and pace differ by industry. Our advisory teams are organised around the realities of yours — from student recruitment to cold-chain logistics."
        crumbs={[{ name: 'Industries' }]}
        seed="industries-hero"
        style="skyline"
      />

      <section className="bg-page py-14 md:py-20">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => {
              const Icon = getIcon(industry.icon)
              return (
                <Reveal key={industry.slug} delay={Math.min(index * 0.025, 0.2)}>
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="group card card-hover flex h-full flex-col p-6"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[color:var(--hair)] text-gold-ink transition-colors group-hover:border-gold/60 group-hover:bg-gold/5">
                        <Icon size={20} />
                      </span>
                      <ArrowUpRight size={16} className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" />
                    </div>
                    <h2 className="mt-4 font-display text-xl text-ink group-hover:text-gold-ink">{industry.title}</h2>
                    <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-gold-ink">{industry.tagline}</p>
                    <p className="mt-3 text-[0.8rem] leading-relaxed text-muted">{industry.description}</p>
                    <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[color:var(--hair)] pt-4">
                      {industry.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="font-mono text-sm text-ink">{stat.value}</p>
                          <p className="mt-0.5 text-[0.6rem] leading-tight text-faint">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
