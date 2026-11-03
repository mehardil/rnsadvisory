import { lazy, Suspense } from 'react'
import siteConfig from '@/config/siteConfig'
import Counter from '@/components/Counter'
import Marquee from '@/components/Marquee'
import Reveal from '@/components/Reveal'
import TiltCard from '@/components/TiltCard'
import ArtFrame from '@/components/ArtFrame'

const StatsChart = lazy(() => import('@/components/StatsChart'))

export default function TrustStrip() {
  return (
    <section className="relative border-b border-[color:var(--hair)] bg-[color:var(--surface)]">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow mb-4">Measured by outcomes</span>
            <h2 className="h2 max-w-md">Experience you can <em>verify.</em></h2>
            <p className="lede mt-4 max-w-md !text-[0.95rem]">
              Since 2011 we have built one accountable team across eight regions. The numbers below are the ones we
              track internally — not marketing estimates.
            </p>
            <Reveal delay={0.04} className="relative mt-6 overflow-hidden rounded-xl">
              <ArtFrame
                seed="trust-strip"
                imageKey="trust-strip"
                alt=""
                animate={false}
                rounded="rounded-xl"
                className="aspect-[16/9] w-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pb-3 pt-10">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">Dubai · London · Mumbai · Riyadh</p>
              </div>
            </Reveal>
            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2">
              {siteConfig.stats.slice(0, 4).map((stat) => (
                <Counter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} note={stat.note} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <TiltCard className="card rounded-2xl p-5 md:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="mono-label">Client demand · last 12 months</p>
                  <p className="mt-1 font-display text-2xl text-ink">Where clients need us most</p>
                </div>
                <span className="rounded-full border border-[color:var(--hair)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  Illustrative
                </span>
              </div>
              <div className="mt-5 h-[220px]">
                <Suspense fallback={<div className="skeleton h-full w-full" />}>
                  <StatsChart />
                </Suspense>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[color:var(--hair)] pt-4">
                <div>
                  <p className="font-display text-xl text-ink">96%</p>
                  <p className="mt-0.5 text-[0.68rem] text-muted">Visa success</p>
                </div>
                <div>
                  <p className="font-display text-xl text-ink">4.9/5</p>
                  <p className="mt-0.5 text-[0.68rem] text-muted">Client rating</p>
                </div>
                <div>
                  <p className="font-display text-xl text-ink">&lt;4 hrs</p>
                  <p className="mt-0.5 text-[0.68rem] text-muted">Response time</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-[color:var(--hair)] pt-7 md:mt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
              Working alongside
            </p>
            <Marquee items={siteConfig.trustLogos} className="mask-fade w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
