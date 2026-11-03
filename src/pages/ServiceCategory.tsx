import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ServiceCard from '@/components/ServiceCard'
import Reveal from '@/components/Reveal'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import { ButtonLink } from '@/components/Button'
import NotFound from './NotFound'
import { getCategory, serviceCategories } from '@/data/services'
import { industries } from '@/data/industries'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

export default function ServiceCategory() {
  const { categorySlug = '' } = useParams()
  const category = getCategory(categorySlug)

  if (!category) return <NotFound />

  const relatedIndustries = industries.filter((industry) =>
    industry.services.some((slug) => category.services.some((svc) => svc.slug === slug)),
  )
  const otherCategories = serviceCategories.filter((c) => c.slug !== category.slug).slice(0, 4)

  return (
    <>
      <Seo
        title={`${category.title} — Services`}
        description={category.description}
        path={`/services/${category.slug}`}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: category.title, path: `/services/${category.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`Practice ${category.letter} · ${category.services.length} services`}
        title={category.title}
        description={category.description}
        crumbs={[{ name: 'Services', path: '/services' }, { name: category.title }]}
        seed={`category-${category.slug}`}
        style="contours"
        media={
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="glass-dark flex w-full max-w-xs flex-col items-center rounded-2xl px-7 py-8 text-center">
              <IsoBadge icon={category.icon} tone={toneFor(category.slug)} size="lg" float />
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-softgold">
                Practice {category.letter} · {category.services.length} services
              </p>
              <p className="mt-2 font-display text-xl leading-tight text-ivory">{category.short}</p>
            </div>
          </div>
        }
        meta={
          <div className="flex flex-wrap gap-2">
            {category.destinations.slice(0, 8).map((destination) => (
              <span key={destination} className="inline-flex items-center gap-1.5 rounded-full border border-ivory/15 px-2.5 py-1 text-[0.68rem] text-ivory/55">
                <MapPin size={10} /> {destination}
              </span>
            ))}
          </div>
        }
      >
        <ButtonLink to="/contact#book" variant="gold">
          Talk to a specialist
        </ButtonLink>
        <ButtonLink to="/services" variant="light">
          All services
        </ButtonLink>
      </PageHero>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Choose a service</p>
              <h2 className="h2">What we deliver</h2>
            </div>
            <p className="max-w-md text-[0.8rem] leading-relaxed text-muted">
              Each service has a defined scope, document checklist, timeline and package pricing. If your need crosses
              two services, we quote them as one engagement.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={{ ...service, categoryTitle: category.title }}
                categorySlug={category.slug}
              />
            ))}
          </div>

          {relatedIndustries.length > 0 && (
            <Reveal className="mt-14 rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-4">
                  <p className="eyebrow mb-2">Sector context</p>
                  <h3 className="font-display text-xl text-ink">Where this practice is used most</h3>
                </div>
                <div className="md:col-span-8">
                  <div className="flex flex-wrap gap-2">
                    {relatedIndustries.map((industry) => (
                      <Link key={industry.slug} to={`/industries/${industry.slug}`} className="chip">
                        {industry.title}
                      </Link>
                    ))}
                  </div>
                  <ul className="mt-4 grid gap-2 text-[0.78rem] text-muted sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="mt-0.5 shrink-0 text-success" /> One named lead across every service
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="mt-0.5 shrink-0 text-success" /> Fixed written quote before work starts
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-12">
            <p className="mono-label mb-4">Other practices</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {otherCategories.map((other) => (
                <Link
                  key={other.id}
                  to={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] px-4 py-3 transition-colors hover:border-gold/60"
                >
                  <span>
                    <span className="block text-[0.8rem] font-semibold text-ink group-hover:text-gold-ink">{other.title}</span>
                    <span className="block font-mono text-[8px] uppercase tracking-wider text-faint">{other.services.length} services</span>
                  </span>
                  <ArrowRight size={14} className="shrink-0 text-gold-ink" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
