import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import { ButtonLink } from '@/components/Button'
import { certifications, csr, culture, leadership, partners, story, values } from '@/data/about'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

export default function About() {
  return (
    <>
      <Seo
        title="About RNS Global"
        description="Founded in 2011 in Lahore, RNS Global is now one advisory firm across eight regions — education, travel, business, finance, legal and technology under one accountable team."
        path="/about"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="About us"
        title={
          <>
            Built on one promise: <em className="italic text-softgold">tell the truth.</em>
          </>
        }
        description="RNS Global began as a two-person student counselling desk in Lahore. Fifteen years later we are one advisory firm across eight regions — still measured by whether clients would send their family."
        crumbs={[{ name: 'About' }]}
        seed="about-story"
        style="contours"
        media={
          <div className="relative hidden lg:block">
            <ArtFrame
              seed="about-story-image"
              imageKey="about-story"
              alt="RNS Global story"
              animate
              className="aspect-[4/3] w-full"
            />
            <div className="glass-dark absolute -bottom-4 left-4 right-4 rounded-xl p-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">Since 2011</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div>
                  <p className="font-mono text-base text-ivory">8</p>
                  <p className="text-[0.58rem] text-ivory/45">Regions</p>
                </div>
                <div>
                  <p className="font-mono text-base text-ivory">19</p>
                  <p className="text-[0.58rem] text-ivory/45">Nationalities</p>
                </div>
                <div>
                  <p className="font-mono text-base text-ivory">4.9/5</p>
                  <p className="text-[0.58rem] text-ivory/45">Client rating</p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ButtonLink to="/careers" variant="gold">
          Work with us
        </ButtonLink>
        <ButtonLink to="/contact" variant="light">
          Talk to an advisor
        </ButtonLink>
      </PageHero>

      <section className="bg-page py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                From a single desk to <em>eight regions.</em>
              </>
            }
            description="Growth was never the goal. The goal was to keep saying yes to clients whose problems crossed borders — and to build the teams needed to solve them properly."
          />

          <div className="relative mt-12">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[color:var(--hair)] md:left-1/2" aria-hidden="true" />
            <div className="space-y-8">
              {story.map((milestone, index) => (
                <Reveal key={milestone.year} delay={Math.min(index * 0.03, 0.2)}>
                  <div className={`relative grid gap-4 pl-8 md:grid-cols-2 md:gap-10 md:pl-0 ${index % 2 === 0 ? '' : 'md:[direction:rtl]'}`}>
                    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-gold bg-[color:var(--bg)] md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
                    <div className={`${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'} [direction:ltr]`}>
                      <p className="font-mono text-xs text-gold-ink">{milestone.year}</p>
                      <h3 className="mt-1 font-display text-xl text-ink">{milestone.title}</h3>
                      <p className="mt-1.5 max-w-md text-[0.82rem] leading-relaxed text-muted md:inline-block">{milestone.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--hair)] bg-[color:var(--bg-2)] py-16 md:py-24">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <Reveal className="overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
            <div className="relative h-44">
              <ArtFrame
                seed="about-mission"
                imageKey="about-mission"
                alt=""
                animate={false}
                rounded="rounded-none"
                className="h-full w-full"
              />
            </div>
            <div className="p-7 md:p-9">
              <p className="eyebrow">Mission</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
                Make cross-border decisions <em>clearer, faster and safer.</em>
              </h2>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">
                Families should not lose money to bad study advice. Founders should not discover a licensing problem after
                signing a lease. Investors should not rely on a spreadsheet with no assumptions. Our job is to remove that
                uncertainty with honest, accountable advice.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-gold/25 bg-navy text-ivory">
            <div className="relative h-44">
              <ArtFrame
                seed="about-vision"
                imageKey="about-vision"
                alt=""
                animate={false}
                rounded="rounded-none"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" aria-hidden="true" />
            </div>
            <div className="p-7 md:p-9">
              <p className="eyebrow !text-softgold">Vision</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ivory">
                One trusted partner for a life or business that <em className="italic text-softgold">spans borders.</em>
              </h2>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-ivory/60">
                We are building the firm we wished existed when we started: deep local knowledge, a single accountable
                team, and no incentive to recommend anything other than what is right for the client.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-page py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Core values"
            title={
              <>
                The rules we <em>actually follow.</em>
              </>
            }
            description="Values are only real if they cost you something. These have cost us mandates — and kept the clients who matter."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              return (
                <Reveal key={value.title} delay={index * 0.04}>
                  <div className="card h-full p-6">
                    <IsoBadge icon={value.icon} tone={toneFor(value.title)} size="md" />
                    <h3 className="mt-4 font-display text-xl text-ink">{value.title}</h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{value.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-12 grid grid-cols-2 gap-5 rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-6 md:grid-cols-4 md:p-8">
            {culture.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-mono text-3xl text-ink">{item.value}</p>
                <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="leadership" className="scroll-mt-24 border-y border-[color:var(--hair)] bg-[color:var(--bg-2)] py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                Senior people, <em>on the work.</em>
              </>
            }
            description="Our partners stay close to client files. These are the people accountable for the standard."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, index) => (
              <Reveal key={person.name} delay={index * 0.04}>
                <div className="card group h-full overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <ArtFrame
                      seed={`team-${person.initials}`}
                      imageKey={`team-${person.initials.toLowerCase()}`}
                      alt={`${person.name}, ${person.role}`}
                      animate={false}
                      rounded="rounded-none"
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-softgold backdrop-blur">
                      {person.location}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ink">{person.name}</h3>
                    <p className="mt-0.5 text-[0.72rem] font-medium text-gold-ink">{person.role}</p>
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{person.bio}</p>
                    <p className="mt-3 border-t border-[color:var(--hair)] pt-3 font-mono text-[8.5px] uppercase tracking-[0.1em] text-faint">
                      {person.focus}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 bg-page py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Certifications & partners"
              title={
                <>
                  Credentials you can <em>check.</em>
                </>
              }
              description="We hold the licences our work requires and partner with institutions whose standards we have verified."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-start gap-3 rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-4">
                  <BadgeCheck size={17} className="mt-0.5 shrink-0 text-success" />
                  <div>
                    <p className="text-[0.82rem] font-semibold text-ink">{cert.label}</p>
                    <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">{cert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="mono-label mb-3">Selected partners</p>
              <div className="flex flex-wrap gap-2">
                {partners.map((partner) => (
                  <span key={partner} className="rounded-full border border-[color:var(--hair)] px-3 py-1.5 text-[0.7rem] text-muted">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--hair)] bg-[color:var(--surface)] py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Responsibility"
            title={
              <>
                What we give <em>back.</em>
              </>
            }
            description="Our CSR work focuses on access to honest advice and ethical recruitment — the two places where bad actors do the most harm."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {csr.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-[color:var(--hair)] bg-[color:var(--bg)] p-5">
                  <p className="font-mono text-lg text-gold-ink">{item.metric}</p>
                  <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
            <p className="max-w-xl text-sm leading-relaxed text-ink">
              Want to work somewhere that measures advice by client outcomes? We hire experienced operators and train
              them properly.
            </p>
            <Link to="/careers" className="link-underline text-sm">
              See open roles <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
