import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import ArtFrame from '@/components/ArtFrame'

const steps = [
  { n: '01', title: 'Discover', text: 'A structured 30-minute conversation about the goal, the constraints and what success looks like.' },
  { n: '02', title: 'Plan', text: 'A written route with options, costs, timing and risks. No work starts until you approve it.' },
  { n: '03', title: 'Execute', text: 'A named lead coordinates every specialist, filing and third party against the plan.' },
  { n: '04', title: 'Support', text: 'Weekly updates, a shared document trail and a person who answers the phone.' },
  { n: '05', title: 'Succeed', text: 'Handover, renewal calendar and ongoing advice as your circumstances change.' },
]

export default function HowWeWork() {
  const lineRef = useRef<HTMLDivElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    let ctx: { revert: () => void } | null = null
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        ctx = gsap.context(() => {
          if (lineRef.current) {
            gsap.fromTo(
              lineRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: wrapRef.current,
                  start: 'top 75%',
                  end: 'bottom 55%',
                  scrub: 0.6,
                },
              },
            )
          }
          gsap.from('.how-step', {
            y: 28,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: wrapRef.current, start: 'top 72%' },
          })
        }, wrapRef)
      })
      .catch(() => {})

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [reduced])

  return (
    <section className="relative bg-page py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Calm process. <em>No surprises.</em>
            </>
          }
          description="Every engagement follows the same five stages, whether it is a student visa or a regional company launch. The scope changes; the discipline does not."
        />

        <div ref={wrapRef} className="relative mt-14">
          <div className="absolute left-[23px] top-3 bottom-3 w-px bg-[color:var(--hair)] md:left-0 md:right-0 md:top-[23px] md:bottom-auto md:h-px md:w-auto" aria-hidden="true">
            <div
              ref={lineRef}
              className="h-full w-full origin-left bg-gradient-to-r from-gold via-gold to-transparent md:origin-left"
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-5 md:gap-5">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.05} className="how-step relative pl-12 md:pl-0 md:pt-12">
                <span className="absolute left-0 top-0">
                  <IsoBadge label={step.n} tone={toneFor(step.title)} size="sm" />
                </span>
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] md:grid md:grid-cols-12">
          <div className="relative min-h-[220px] md:col-span-5">
            <ArtFrame
              seed="how-we-work"
              imageKey="how-we-work"
              alt=""
              animate={false}
              rounded="rounded-none"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-4 left-5 font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">
              A written route · at every stage
            </p>
          </div>
          <div className="p-6 md:col-span-7 md:p-8">
            <p className="mono-label">Your guarantee</p>
            <p className="mt-1.5 font-display text-xl text-ink">One named lead, start to finish.</p>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">
              You will never be handed between departments or asked to repeat your story. The lead who scopes the work
              owns the outcome, and the specialist teams report into them. If something goes wrong, you have one number
              to call.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
