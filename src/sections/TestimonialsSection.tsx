import SectionHeading from '@/components/SectionHeading'
import TestimonialSlider from '@/components/TestimonialSlider'
import Reveal from '@/components/Reveal'
import ArtFrame from '@/components/ArtFrame'

export default function TestimonialsSection() {
  return (
    <section className="bg-page py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Client voices"
            title={
              <>
                Trusted in <em>eight regions.</em>
              </>
            }
            description="Students, founders, families and boards. The details stay confidential; the experience does not."
          />
          <Reveal delay={0.06} className="relative mt-7 overflow-hidden rounded-2xl">
            <ArtFrame
              seed="testimonials"
              imageKey="testimonials"
              alt=""
              animate={false}
              rounded="rounded-2xl"
              className="aspect-[16/10] w-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent px-4 pb-3 pt-12">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">Clients in eight regions</p>
            </div>
          </Reveal>
          <div className="mt-6 flex items-center gap-4 border-t border-[color:var(--hair)] pt-6">
            <div className="flex -space-x-2">
              {['🇵🇰', '🇦🇪', '🇬🇧', '🇮🇳'].map((flag) => (
                <span
                  key={flag}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[color:var(--bg)] bg-[color:var(--surface-2)] text-sm"
                  aria-hidden="true"
                >
                  {flag}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className="text-[0.7rem]">{star}</span>
                ))}
              </div>
              <p className="mt-0.5 text-[0.7rem] text-muted">4.9 average from 600+ reviews</p>
            </div>
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <TestimonialSlider />
        </Reveal>
      </div>
    </section>
  )
}
