import { Infinity as InfinityIcon, UserCheck, Zap } from 'lucide-react'
import Reveal from '@/components/Reveal'

const promises = [
  {
    icon: Zap,
    title: 'Fastest response',
    text: 'A named consultant replies within four business hours — not a queue, not a ticket.',
  },
  {
    icon: UserCheck,
    title: 'One consultant',
    text: 'One accountable person owns your file from first question to final handover.',
  },
  {
    icon: InfinityIcon,
    title: 'Trusted for life',
    text: 'We stay for renewals, expansions and the next generation of your plans.',
  },
]

export default function PromiseStrip() {
  return (
    <section className="relative border-b border-[color:var(--hair)] bg-[color:var(--surface)]">
      <div className="container-x grid gap-8 py-10 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">Our promise</span>
          <h2 className="mt-3 max-w-md font-display text-2xl leading-[1.15] text-ink md:text-3xl">
            Fastest advisory. One consultant. <em className="italic text-gold-ink">Trusted for life.</em>
          </h2>
          <p className="mt-2 max-w-md text-[0.82rem] leading-relaxed text-muted">
            Clear answers in hours, one accountable partner, and a relationship that lasts beyond the first result.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-3">
            {promises.map((promise) => {
              const Icon = promise.icon
              return (
                <div
                  key={promise.title}
                  className="group rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface-2)] p-4 transition-colors hover:border-gold/45"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-[color:var(--surface)] text-gold-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon size={16} />
                  </span>
                  <p className="mt-3 font-display text-[1.02rem] leading-snug text-ink">{promise.title}</p>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted">{promise.text}</p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
