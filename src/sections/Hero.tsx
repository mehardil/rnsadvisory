import { lazy, Suspense } from 'react'
import { ArrowDown, ArrowRight, CalendarCheck, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import siteConfig from '@/config/siteConfig'
import ArtFrame from '@/components/ArtFrame'
import { ButtonLink } from '@/components/Button'
import Reveal from '@/components/Reveal'
import { useIsLowEnd } from '@/hooks/useMediaQuery'

const HeroScene = lazy(() => import('@/three/HeroScene'))

export default function Hero() {
  const { t } = useTranslation()
  const lowEnd = useIsLowEnd()

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-ivory">
      <ArtFrame
        seed="home-hero-aurora"
        imageKey="home-hero-aurora"
        style="aurora"
        alt=""
        animate={false}
        priority
        rounded="rounded-none"
        className="absolute inset-0 h-full w-full opacity-35"
      />

      {!lowEnd && (
        <div className="absolute inset-0 md:left-[32%]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      {lowEnd && (
        <ArtFrame
          seed="home-hero-mobile"
          imageKey="home-hero-mobile"
          style="crystals"
          alt=""
          animate={false}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full opacity-45 md:left-[40%]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/20" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />

      <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32 md:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-softgold/25 bg-ivory/[0.04] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-softgold backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {t('hero.eyebrow')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-ivory/45">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={10} className="fill-gold text-gold" />
                  ))}
                  <span className="ms-1">4.9 · 600+ reviews</span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[clamp(3.1rem,7.4vw,6.2rem)] font-medium leading-[0.95] tracking-[-0.04em] text-ivory">
                {t('hero.title1')} <br className="hidden sm:block" />
                {t('hero.title2')}{' '}
                <em className="relative inline-block italic text-softgold">
                  {t('hero.title3')}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="10"
                    viewBox="0 0 300 10"
                    fill="none"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 7C70 2 160 2 298 6" stroke="#C9A24B" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
                  </svg>
                </em>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-[0.98rem] leading-relaxed text-ivory/65 md:text-[1.08rem]">
                {t('hero.subline')}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink to="/services" variant="gold" size="lg">
                  {t('cta.explore')} <ArrowRight size={16} />
                </ButtonLink>
                <ButtonLink to={siteConfig.links.book} variant="light" size="lg">
                  <CalendarCheck size={16} /> {t('cta.bookShort')}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ivory/10 pt-6 text-[0.7rem] text-ivory/45">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold" /> {t('hero.trusted')}
                </span>
                <a href={siteConfig.contact.phoneHref} className="font-mono text-[0.72rem] text-ivory/65 hover:text-softgold">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="relative ml-auto mt-40 w-full max-w-[300px]">
              <div className="glass-dark rounded-2xl p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-softgold">One firm · Eight regions</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Visa & residency', value: '96% approval' },
                    { label: 'Students placed', value: '2,400+' },
                    { label: 'Companies formed', value: '1,150+' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 border-b border-ivory/10 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-[0.72rem] text-ivory/55">{row.label}</span>
                      <span className="font-mono text-[0.72rem] text-softgold">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-ivory/10 bg-ivory/[0.03] px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                  <span className="text-[0.66rem] text-ivory/55">Advisors online · Dubai 09:00–19:00</span>
                </div>
              </div>
              <div className="mt-3 text-right font-mono text-[9px] tracking-[0.16em] text-ivory/25">
                25.2048° N / 55.2708° E — DUBAI
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-5 hidden items-center justify-between border-t border-ivory/10 pt-5 md:flex">
          <a
            href="#what-we-do"
            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40 transition-colors hover:text-softgold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold">
              <ArrowDown size={12} />
            </span>
            {t('hero.scroll')}
          </a>
          <div className="hidden items-center gap-5 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/25 sm:flex">
            <span>Education</span>
            <span className="h-2.5 w-px bg-ivory/20" />
            <span>Business</span>
            <span className="h-2.5 w-px bg-ivory/20" />
            <span>Finance</span>
            <span className="h-2.5 w-px bg-ivory/20" />
            <span>Legal</span>
          </div>
        </div>
      </div>
    </section>
  )
}
