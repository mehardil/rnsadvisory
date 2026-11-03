import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  MessageCircle,
  Phone,
  Printer,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import Seo from '@/components/Seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArtFrame from '@/components/ArtFrame'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import Accordion from '@/components/Accordion'
import Reveal from '@/components/Reveal'
import ServiceCard from '@/components/ServiceCard'
import QuoteForm from '@/components/QuoteForm'
import { ButtonAnchor } from '@/components/Button'
import NotFound from './NotFound'
import { allServices, getCategory, getService } from '@/data/services'
import { useUIStore } from '@/store/useUIStore'
import { convertCurrency } from '@/utils/currency'
import { formatCurrency } from '@/utils/format'
import { readStorage, writeStorage } from '@/utils/storage'
import { whatsappLink, phoneLink } from '@/utils/links'
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, serviceJsonLd } from '@/utils/seo'
import { cn } from '@/utils/cn'
import { artStyleForCategory } from '@/utils/art'

export default function ServiceDetail() {
  const { categorySlug = '', serviceSlug = '' } = useParams()
  const service = getService(categorySlug, serviceSlug)
  const category = getCategory(categorySlug)
  const currency = useUIStore((s) => s.currency)
  const pushToast = useUIStore((s) => s.pushToast)
  const storageKey = `rns-docs-${categorySlug}-${serviceSlug}`
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() =>
    readStorage<Record<string, boolean>>(storageKey, {}),
  )

  if (!service || !category) return <NotFound />

  const money = (usd: number) => formatCurrency(convertCurrency(usd, 'USD', currency), currency)

  const toggle = (item: string) => {
    const next = { ...checklist, [item]: !checklist[item] }
    setChecklist(next)
    writeStorage(storageKey, next)
  }

  const resetChecklist = () => {
    setChecklist({})
    writeStorage(storageKey, {})
  }

  const checkedCount = service.documents.filter((doc: string) => checklist[doc]).length
  const docProgress = Math.round((checkedCount / service.documents.length) * 100)

  const related = allServices
    .filter((s) => s.categorySlug === categorySlug && s.slug !== service.slug)
    .slice(0, 3)

  const crossSell = allServices.filter((s) => s.categorySlug !== categorySlug && s.featured).slice(0, 2)

  const inclusions = Array.from(new Set(service.packages.flatMap((p: { inclusions: string[] }) => p.inclusions))) as string[]

  const brochure = () => {
    pushToast({
      title: 'Print dialog opened',
      description: 'Choose “Save as PDF” to keep a copy of this service sheet.',
      type: 'info',
    })
    window.setTimeout(() => window.print(), 350)
  }

  return (
    <>
      <Seo
        title={`${service.title} — ${category.title}`}
        description={service.summary}
        path={service.path}
        jsonLd={[
          organizationJsonLd(),
          serviceJsonLd({ ...service, path: service.path }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: category.title, path: `/services/${category.slug}` },
            { name: service.title, path: service.path },
          ]),
        ]}
      />

      <section className="relative isolate overflow-hidden bg-navy pb-14 pt-32 text-ivory md:pb-20 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(31,79,216,0.35),transparent_55%)]" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: 'Services', path: '/services' },
              { name: category.title, path: `/services/${category.slug}` },
              { name: service.title },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="eyebrow !text-softgold mb-4">
                  {category.title} · From {money(service.priceFrom)}
                </span>
                <h1 className="font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ivory">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-ivory/65 md:text-[1.06rem]">
                  {service.summary}
                </p>

                <div className="mt-7 grid max-w-xl grid-cols-2 gap-4 border-y border-ivory/10 py-5 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ivory/35">Timeline</p>
                    <p className="mt-1 text-[0.8rem] text-ivory/80">{service.timeline}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ivory/35">Engagement from</p>
                    <p className="mt-1 font-mono text-[0.85rem] text-softgold">{money(service.priceFrom)}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ivory/35">Response</p>
                    <p className="mt-1 text-[0.8rem] text-ivory/80">Within 4 business hours</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a href="#quote" className="btn btn-gold">
                    <CalendarCheck size={16} /> Get a free quote
                  </a>
                  <ButtonAnchor
                    href={whatsappLink(`Hello RNS Global, I am interested in ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </ButtonAnchor>
                  <ButtonAnchor href={phoneLink()} variant="light">
                    <Phone size={14} /> Call
                  </ButtonAnchor>
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-[0.7rem] text-ivory/40">
                  <ShieldCheck size={13} className="text-gold/80" /> Fixed written scope · No hidden commissions
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="relative">
                  <ArtFrame
                    seed={`service-${category.slug}-${service.slug}`}
                    imageKey={`service-${category.slug}-${service.slug}`}
                    style={artStyleForCategory(category.slug)}
                    alt={`${service.title} — RNS Global`}
                    animate
                    priority
                    rounded="rounded-2xl"
                    fit="contain"
                    className="aspect-[4/3] w-full"
                  />
                  <span className="absolute -left-3 -top-3 z-10">
                    <IsoBadge icon={category.icon} tone={toneFor(category.slug)} size="md" float />
                  </span>
                  <div className="glass-dark absolute -bottom-4 left-4 right-4 flex items-center justify-between rounded-xl px-4 py-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">Starting from</p>
                      <p className="font-mono text-lg text-softgold">{money(service.priceFrom)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">Delivery</p>
                      <p className="text-[0.76rem] text-ivory/75">{service.timeline}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="min-w-0 space-y-14 lg:col-span-8">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="eyebrow">Overview</span>
              </div>
              <h2 className="mt-3 font-display text-3xl text-ink">What this service is for</h2>
              <p className="mt-4 text-[0.98rem] leading-[1.85] text-muted">{service.overview}</p>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                  <p className="mono-label">Who it is for</p>
                  <ul className="mt-3 space-y-2.5">
                    {service.whoFor.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-muted">
                        <Check size={14} className="mt-0.5 shrink-0 text-gold" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                  <p className="mono-label">At a glance</p>
                  <dl className="mt-3 space-y-3 text-[0.78rem]">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-muted">Practice</dt>
                      <dd className="text-right text-ink">{category.title}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-muted">Timeline</dt>
                      <dd className="text-right text-ink">{service.timeline}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-muted">Packages</dt>
                      <dd className="text-right text-ink">Basic · Standard · Premium</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-muted">Coverage</dt>
                      <dd className="text-right text-ink">8 regions</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal className="relative overflow-hidden rounded-2xl">
              <ArtFrame
                seed={`service-media-${category.slug}`}
                imageKey={`service-media-${category.slug}`}
                alt={`${category.title} advisory`}
                animate={false}
                rounded="rounded-2xl"
                fit="contain"
                className="aspect-[21/9] w-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent px-5 pb-4 pt-14">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">{category.title}</p>
                <p className="mt-1 font-display text-xl text-ivory">A written route, reviewed by a named lead.</p>
              </div>
            </Reveal>

            <Reveal>
              <span className="eyebrow">Benefits</span>
              <h2 className="mt-3 font-display text-3xl text-ink">What you get</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit: string, index: number) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 font-mono text-[9px] text-gold-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[0.82rem] leading-relaxed text-muted">{benefit}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <span className="eyebrow">Process</span>
              <h2 className="mt-3 font-display text-3xl text-ink">How it runs, step by step</h2>
              <ol className="mt-6 space-y-0">
                {service.process.map((step: { title: string; text: string }, index: number) => (
                  <li key={step.title} className="relative flex gap-5 pb-7 last:pb-0">
                    {index < service.process.length - 1 && (
                      <span className="absolute left-[15px] top-9 h-full w-px bg-[color:var(--hair)]" aria-hidden="true" />
                    )}
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-[color:var(--bg)] font-mono text-[10px] text-gold-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[0.95rem] font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="eyebrow">Checklist</span>
                  <h2 className="mt-3 font-display text-3xl text-ink">Documents you will need</h2>
                  <p className="mt-2 text-sm text-muted">Tick items as you collect them. Progress is saved on this device.</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-ink">{checkedCount}/{service.documents.length}</p>
                  <button type="button" onClick={resetChecklist} className="mt-1 inline-flex items-center gap-1 text-[0.68rem] text-muted hover:text-ink">
                    <RotateCcw size={11} /> Reset
                  </button>
                </div>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[color:var(--surface-2)]">
                <div className="h-full rounded-full bg-gradient-to-r from-gold to-softgold transition-all duration-300" style={{ width: `${docProgress}%` }} />
              </div>
              <div className="mt-4 divide-y divide-[color:var(--hair)] rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
                {service.documents.map((doc: string) => (
                  <label key={doc} className="flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-[color:var(--surface-2)]">
                    <input
                      type="checkbox"
                      checked={Boolean(checklist[doc])}
                      onChange={() => toggle(doc)}
                      className="mt-0.5 h-4 w-4 accent-[#C9A24B]"
                    />
                    <span className={cn('text-[0.82rem] leading-relaxed', checklist[doc] ? 'text-faint line-through' : 'text-muted')}>
                      {doc}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={brochure} className="btn btn-outline btn-sm">
                  <Download size={13} /> Download brochure (PDF)
                </button>
                <button type="button" onClick={() => window.print()} className="btn btn-ghost btn-sm">
                  <Printer size={13} /> Print this page
                </button>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="eyebrow">Timeline</span>
                    <h2 className="mt-2 font-display text-2xl text-ink">Typically {service.timeline}</h2>
                  </div>
                  <Clock size={28} className="text-gold/50" />
                </div>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                  Timelines start once we have a complete document set. Government processing, third-party appointments
                  and peak-season queues can extend them; we confirm exact dates in writing after the discovery call and
                  flag any risk as soon as we see it.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Week 1', 'Discovery, eligibility and document review'],
                    ['Weeks 2–4', 'Preparation, submission and tracking'],
                    ['Handover', 'Approval, settlement and renewal calendar'],
                  ].map(([phase, text]) => (
                    <div key={phase} className="rounded-lg bg-[color:var(--surface-2)] p-3">
                      <p className="font-mono text-[9px] uppercase tracking-wider text-gold-ink">{phase}</p>
                      <p className="mt-1 text-[0.72rem] leading-relaxed text-muted">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal id="packages">
              <span className="eyebrow">Packages</span>
              <h2 className="mt-3 font-display text-3xl text-ink">Fixed-fee packages</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Indicative pricing, confirmed after scoping. Government fees and third-party charges are itemised
                separately. All packages include a written scope and one named advisor.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <caption className="sr-only">Package comparison for {service.title}</caption>
                  <thead>
                    <tr className="border-b border-[color:var(--hair)]">
                      <th scope="col" className="p-4 text-[0.7rem] font-medium text-muted">Included</th>
                      {service.packages.map((pkg: { name: string; note: string; price: number }, i: number) => (
                        <th key={pkg.name} scope="col" className={cn('p-4 align-top', i === 1 && 'bg-gold/[0.06]')}>
                          <span className="block font-display text-lg text-ink">{pkg.name}</span>
                          <span className="block font-mono text-[8px] uppercase tracking-wider text-gold-ink">{pkg.note}</span>
                          <span className="mt-1 block font-mono text-sm text-ink">{money(pkg.price)}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inclusions.map((feature) => (
                      <tr key={feature} className="border-b border-[color:var(--hair)] last:border-0">
                        <th scope="row" className="p-4 text-[0.76rem] font-normal text-muted">{feature}</th>
                        {service.packages.map((pkg: { name: string; inclusions: string[] }, i: number) => (
                          <td key={pkg.name} className={cn('p-4', i === 1 && 'bg-gold/[0.06]')}>
                            {pkg.inclusions.includes(feature) ? (
                              <Check size={15} className="text-success" aria-label="Included" />
                            ) : (
                              <span className="text-faint" aria-label="Not included">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row" className="p-4" />
                      {service.packages.map((pkg: { name: string }, i: number) => (
                        <td key={pkg.name} className={cn('p-4', i === 1 && 'bg-gold/[0.06]')}>
                          <a href="#quote" className={cn('btn btn-sm w-full', i === 1 ? 'btn-gold' : 'btn-outline')}>
                            Choose {pkg.name}
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal id="faq">
              <span className="eyebrow">FAQs</span>
              <h2 className="mt-3 font-display text-3xl text-ink">Questions about this service</h2>
              <Accordion items={service.faqs} className="mt-5" />
            </Reveal>

            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">Related</span>
                  <h2 className="mt-3 font-display text-3xl text-ink">Often considered together</h2>
                </div>
                <Link to={`/services/${category.slug}`} className="link-underline hidden text-xs sm:inline-flex">
                  All {category.title} <ArrowRight size={13} />
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[...related, ...crossSell].slice(0, 4).map((item) => (
                  <ServiceCard key={`${item.categorySlug}-${item.slug}`} service={item} categorySlug={item.categorySlug} compact />
                ))}
              </div>
            </Reveal>
          </article>

          <aside className="min-w-0 lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-28">
              <div id="quote" className="scroll-mt-28">
                <QuoteForm serviceName={service.title} />
              </div>

              <div className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                <p className="mono-label">Prefer to talk?</p>
                <div className="mt-3 space-y-2">
                  <a href={phoneLink()} className="flex items-center gap-2.5 rounded-lg border border-[color:var(--hair)] px-3 py-2.5 text-[0.78rem] text-ink transition-colors hover:border-gold">
                    <Phone size={14} className="text-gold-ink" /> +92 331 905 1913
                  </a>
                  <a
                    href={whatsappLink(`Hello RNS Global, I have a question about ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-lg border border-[color:var(--hair)] px-3 py-2.5 text-[0.78rem] text-ink transition-colors hover:border-gold"
                  >
                    <MessageCircle size={14} className="text-success" /> WhatsApp an advisor
                  </a>
                </div>
                <div className="mt-4 space-y-2 border-t border-[color:var(--hair)] pt-4 text-[0.7rem] text-muted">
                  <p className="flex items-center gap-2"><Clock size={12} className="text-gold" /> Mon–Sat · 09:00–19:00 GST</p>
                  <p className="flex items-center gap-2"><ShieldCheck size={12} className="text-success" /> Confidential, no obligation</p>
                  <p className="flex items-center gap-2"><FileText size={12} className="text-gold" /> Fixed written quote</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] p-5">
                <p className="font-display text-lg text-ink">Not sure this is the right service?</p>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">
                  Describe the outcome and we will point you to the right route — even if it is a different practice.
                </p>
                <Link to="/contact" className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-gold-ink">
                  Ask an advisor <ArrowRight size={12} />
                </Link>
              </div>

              <div className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                <p className="mono-label">Service sheet</p>
                <div className="mt-3 grid gap-2">
                  <button type="button" onClick={brochure} className="btn btn-outline btn-sm w-full justify-start">
                    <Download size={13} /> Download brochure
                  </button>
                  <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm w-full justify-start">
                    <Printer size={13} /> Print / save as PDF
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[color:var(--hair)] bg-[color:var(--surface)] py-10">
        <div className="container-x flex flex-wrap items-center gap-3">
          <CheckCircle2 size={18} className="text-success" />
          <p className="text-[0.8rem] text-muted">
            Serving {category.title.toLowerCase()} clients across {category.destinations.join(', ')}.
          </p>
          <Link to="/locations" className="ms-auto link-underline text-xs">
            Find your nearest office <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  )
}
