import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ArtFrame from '@/components/ArtFrame'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import { tools } from '@/data/tools'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

export default function Tools() {
  return (
    <>
      <Seo
        title="Free advisory tools and calculators"
        description="Free, independent tools: visa document checklist, UAE company cost estimator, study abroad budget calculator, currency converter, office hours viewer and eligibility check."
        path="/tools"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Free tools"
        title={
          <>
            Useful before you <em className="italic text-softgold">pay anyone.</em>
          </>
        }
        description="Six independent tools to help you size the decision, build a checklist or check your likely route. No email wall, no obligation."
        crumbs={[{ name: 'Tools' }]}
        seed="tools-hero"
        style="orbits"
      >
        <Link to="/contact#book" className="btn btn-gold">
          Ask an advisor
        </Link>
      </PageHero>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => {
              return (
                <Reveal key={tool.slug} delay={Math.min(index * 0.05, 0.25)}>
                  <Link to={`/tools/${tool.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
                    <div className="relative h-32 shrink-0">
                      <div className="absolute inset-0 overflow-hidden">
                        <ArtFrame
                          seed={`tool-${tool.slug}`}
                          imageKey={`tool-${tool.slug}`}
                          alt={tool.title}
                          animate={false}
                          rounded="rounded-none"
                          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute right-4 top-4 rounded-full bg-navy/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-softgold backdrop-blur">
                          {tool.tag}
                        </span>
                      </div>
                      <span className="absolute -bottom-5 left-5 z-10">
                        <IsoBadge icon={tool.icon} tone={toneFor(tool.slug)} size="md" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 pt-8 md:p-6 md:pt-9">
                      <h2 className="font-display text-xl leading-snug text-ink group-hover:text-gold-ink">{tool.title}</h2>
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">{tool.short}</p>
                      <p className="mt-3 line-clamp-3 text-[0.74rem] leading-relaxed text-faint">{tool.description}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-[color:var(--hair)] pt-4">
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint">{tool.time}</span>
                        <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-gold-ink">
                          Open tool <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-12 grid gap-6 rounded-2xl border border-gold/25 bg-navy p-6 text-ivory md:grid-cols-12 md:p-8">
            <div className="md:col-span-7">
              <p className="eyebrow !text-softgold">Why give this away?</p>
              <h2 className="mt-2 font-display text-2xl text-ivory md:text-3xl">Because clarity should come before a proposal.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory/55">
                Most people arrive with a rough idea and a lot of conflicting information. These tools use the same
                ranges and checklists our advisors use, so you can sanity-check the decision before you commit to
                anything.
              </p>
            </div>
            <div className="md:col-span-5">
              <ul className="space-y-2.5">
                {['No account or email required', 'Runs entirely in your browser', 'Indicative, not a quotation', 'A person reviews every enquiry'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.78rem] text-ivory/65">
                    <Check size={14} className="mt-0.5 shrink-0 text-success" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[0.76rem] font-semibold text-softgold">
                <Sparkles size={13} /> Talk through the result <ArrowRight size={12} />
              </Link>
            </div>
          </Reveal>

          <p className="mt-6 text-center text-[0.68rem] leading-relaxed text-faint">
            Tools provide indicative estimates only and do not constitute legal, tax or immigration advice. Rules and
            rates change; confirm with an advisor before acting.
          </p>
        </div>
      </section>
    </>
  )
}
