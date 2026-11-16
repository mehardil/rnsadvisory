import { CalendarDays, Mail, MessagesSquare } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'
import Reveal from '@/components/Reveal'

const perks = [
  {
    icon: Mail,
    title: 'Monthly briefing',
    text: 'Visa rule changes, study destinations and market entry — in plain English.',
  },
  {
    icon: CalendarDays,
    title: 'Live Q&A sessions',
    text: 'Small-group calls with our advisors and invited specialists, a few times a year.',
  },
  {
    icon: MessagesSquare,
    title: 'Reader questions',
    text: 'Send a question before each issue and we answer the ones that help most people.',
  },
]

export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="anchor-offset relative overflow-hidden border-y border-[color:var(--hair)] bg-[color:var(--surface)] py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-royal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-6">
          <span className="eyebrow">The briefing &amp; community</span>
          <h2 className="h2 mt-4">
            One email a month. <em>A standing invitation.</em>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Join readers who want the short version: what changed, who it affects and what to do next. Subscribers also
            get first access to our live Q&amp;A sessions and the questions we answer each month.
          </p>

          <div className="mt-7 max-w-md">
            <NewsletterForm tone="light" />
          </div>
          <p className="mt-3 text-[0.72rem] text-faint">No noise. Unsubscribe in one click.</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <div
                  key={perk.title}
                  className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface-2)] p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 text-gold-ink">
                    <Icon size={16} />
                  </span>
                  <p className="mt-4 font-display text-lg leading-snug text-ink">{perk.title}</p>
                  <p className="mt-1.5 text-[0.76rem] leading-relaxed text-muted">{perk.text}</p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
