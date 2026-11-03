import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/utils/cn'

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000)
    return () => window.clearInterval(id)
  }, [paused, reduced])

  const current = testimonials[index]

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="card relative overflow-hidden p-7 md:p-12">
        <Quote className="absolute right-6 top-6 h-16 w-16 text-gold/10 md:right-10 md:top-10 md:h-24 md:w-24" aria-hidden="true" />
        <div aria-live="polite" className="relative min-h-[250px] md:min-h-[210px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <blockquote className="max-w-3xl font-display text-[1.35rem] leading-[1.5] text-ink md:text-[1.72rem]">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-sm text-gold-ink">
                  {current.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{current.name}</span>
                  <span className="block text-xs text-muted">
                    {current.role} · {current.location}
                  </span>
                </span>
                <span className="ms-auto inline-flex items-center gap-2 rounded-full border border-[color:var(--hair)] px-3 py-1.5 text-[0.7rem] text-muted">
                  <span aria-hidden="true">{current.flag}</span> {current.country}
                </span>
                <span className="rounded-full bg-[color:var(--surface-2)] px-3 py-1.5 mono-label !text-[9px]">{current.service}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[color:var(--hair)] pt-5">
          <div className="flex gap-1.5" role="tablist" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}: ${t.name}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-gold' : 'w-1.5 bg-[color:var(--hair-strong)] hover:bg-gold/60',
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--hair-strong)] text-ink transition-colors hover:border-gold hover:text-gold-ink"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--hair-strong)] text-ink transition-colors hover:border-gold hover:text-gold-ink"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
