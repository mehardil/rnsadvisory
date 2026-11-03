import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Building2, Check, Compass, GraduationCap, HeartHandshake, RotateCcw, Sparkles, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { serviceCategories } from '@/data/services'
import { ButtonLink } from '@/components/Button'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import { cn } from '@/utils/cn'

const personas = [
  { id: 'student', label: 'A student', icon: GraduationCap },
  { id: 'family', label: 'A family', icon: Users },
  { id: 'founder', label: 'A founder', icon: Briefcase },
  { id: 'investor', label: 'An investor', icon: Compass },
  { id: 'company', label: 'A company', icon: Building2 },
]

const goals = [
  { id: 'study', label: 'Study abroad', category: 'education' },
  { id: 'visa', label: 'Visa or relocation', category: 'immigration' },
  { id: 'business', label: 'Start or expand a business', category: 'business-setup' },
  { id: 'strategy', label: 'Strategy and growth', category: 'strategy' },
  { id: 'finance', label: 'Finance, tax and wealth', category: 'finance' },
  { id: 'legal', label: 'Legal and compliance', category: 'legal' },
  { id: 'trade', label: 'Trade and logistics', category: 'trade' },
  { id: 'hr', label: 'Hiring and HR', category: 'hr' },
  { id: 'tech', label: 'Technology and marketing', category: 'technology' },
  { id: 'property', label: 'Property', category: 'real-estate' },
  { id: 'travel', label: 'Travel and pilgrimage', category: 'travel' },
  { id: 'other', label: 'Something else', category: 'specialised' },
]

const timelines = [
  { id: 'urgent', label: 'Urgent — within weeks', note: 'We will triage the same day where capacity allows.' },
  { id: 'quarter', label: 'Next three months', note: 'Enough time to prepare properly and avoid rushed filings.' },
  { id: 'planning', label: 'Planning ahead', note: 'We will map options and sequence them over the next year.' },
]

export default function ServiceFinder() {
  const [step, setStep] = useState(0)
  const [persona, setPersona] = useState('')
  const [goal, setGoal] = useState('')
  const [timeline, setTimeline] = useState('')

  const category = serviceCategories.find((c) => c.slug === goals.find((g) => g.id === goal)?.category)
  const personaLabel = personas.find((p) => p.id === persona)?.label?.toLowerCase() || 'you'
  const timelineNote = timelines.find((t) => t.id === timeline)?.note || ''

  const reset = () => {
    setStep(0)
    setPersona('')
    setGoal('')
    setTimeline('')
  }

  return (
    <section className="relative overflow-hidden border-y border-[color:var(--hair)] bg-[color:var(--bg-2)] py-20 md:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow mb-4">Service finder</span>
          <h2 className="h2 max-w-sm">
            Tell us what you need. <em>We will map the route.</em>
          </h2>
          <p className="lede mt-4 max-w-sm !text-[0.95rem]">
            Three questions, no forms, no email wall. You will get an honest starting point and the three services we
            would put first.
          </p>
          <div className="mt-7 space-y-3 border-t border-[color:var(--hair)] pt-6">
            {[
              'Matched to 71 services across 12 practices',
              'No account or email required',
              'A real advisor reviews every enquiry',
            ].map((item) => (
              <p key={item} className="flex items-start gap-2 text-[0.8rem] text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-success" /> {item}
              </p>
            ))}
          </div>
          <Reveal delay={0.08} className="relative mt-7 overflow-hidden rounded-2xl">
            <ArtFrame
              seed="service-finder"
              imageKey="service-finder"
              alt=""
              animate={false}
              rounded="rounded-2xl"
              className="aspect-[4/3] w-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent px-4 pb-3 pt-12">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">A real advisor reviews every enquiry</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="card overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[color:var(--hair)] px-5 py-4 md:px-7">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-gold" />
                <span className="text-[0.8rem] font-semibold text-ink">
                  {step < 3 ? `Question ${step + 1} of 3` : 'Your recommendation'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={cn('h-1.5 rounded-full transition-all', i <= step ? 'w-6 bg-gold' : 'w-1.5 bg-[color:var(--hair-strong)]')} />
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" onClick={reset} className="text-faint hover:text-ink" aria-label="Start over">
                    <RotateCcw size={13} />
                  </button>
                )}
              </div>
            </div>

            <div className="p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.22 }}
                >
                  {step === 0 && (
                    <>
                      <h3 className="font-display text-2xl text-ink">First, who are we helping?</h3>
                      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                        {personas.map((p) => {
                          const Icon = p.icon
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setPersona(p.id)
                                setStep(1)
                              }}
                              className={cn(
                                'group flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-gold',
                                persona === p.id ? 'border-gold bg-gold/10' : 'border-[color:var(--hair)] bg-surface',
                              )}
                            >
                              <Icon size={20} className="text-gold-ink" />
                              <span className="text-[0.78rem] font-medium text-ink">{p.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h3 className="font-display text-2xl text-ink">What do you need help with?</h3>
                      <p className="mt-1 text-xs text-muted">Pick the closest area. We will refine it in the conversation.</p>
                      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {goals.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => {
                              setGoal(g.id)
                              setStep(2)
                            }}
                            className={cn(
                              'rounded-lg border px-3 py-2.5 text-left text-[0.78rem] transition-all hover:border-gold hover:bg-gold/5',
                              goal === g.id ? 'border-gold bg-gold/10 text-ink' : 'border-[color:var(--hair)] text-muted',
                            )}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h3 className="font-display text-2xl text-ink">When do you need to act?</h3>
                      <div className="mt-5 space-y-2.5">
                        {timelines.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setTimeline(t.id)
                              setStep(3)
                            }}
                            className={cn(
                              'flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-all hover:border-gold',
                              timeline === t.id ? 'border-gold bg-gold/10' : 'border-[color:var(--hair)]',
                            )}
                          >
                            <span>
                              <span className="block text-sm font-medium text-ink">{t.label}</span>
                              <span className="mt-0.5 block text-[0.7rem] text-muted">{t.note}</span>
                            </span>
                            <ArrowRight size={15} className="shrink-0 text-gold-ink" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && category && (
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="eyebrow">Your recommended starting point</p>
                          <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{category.title}</h3>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                            For {personaLabel}, we would start here. {timelineNote}
                          </p>
                        </div>
                        <Link to={`/services/${category.slug}`} className="link-underline text-xs">
                          Explore the practice <ArrowRight size={13} />
                        </Link>
                      </div>

                      <div className="mt-5 grid gap-2.5">
                        {category.services.slice(0, 3).map((svc) => (
                          <Link
                            key={svc.slug}
                            to={`/services/${category.slug}/${svc.slug}`}
                            className="group flex items-center justify-between gap-4 rounded-xl border border-[color:var(--hair)] px-4 py-3 transition-colors hover:border-gold/60 hover:bg-[color:var(--surface-2)]"
                          >
                            <span>
                              <span className="block text-[0.85rem] font-semibold text-ink group-hover:text-gold-ink">{svc.title}</span>
                              <span className="mt-0.5 line-clamp-1 block text-[0.7rem] text-muted">{svc.summary}</span>
                            </span>
                            <ArrowRight size={14} className="shrink-0 text-gold-ink" />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[color:var(--hair)] pt-5">
                        <ButtonLink to={`/contact?service=${encodeURIComponent(category.services[0]?.title || category.title)}`} variant="gold" size="sm">
                          <HeartHandshake size={15} /> Talk to an advisor
                        </ButtonLink>
                        <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink">
                          <RotateCcw size={13} /> Start again
                        </button>
                      </div>
                      <p className="mt-3 text-[0.66rem] text-faint">
                        Recommendation is indicative. A specialist will confirm your actual options before any fee is quoted.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
