import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ServiceCard from '@/components/ServiceCard'
import Reveal from '@/components/Reveal'
import { ButtonLink } from '@/components/Button'
import { serviceCategories } from '@/data/services'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'
import { cn } from '@/utils/cn'

export default function Services() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('all')

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    return serviceCategories
      .filter((category) => active === 'all' || category.slug === active)
      .map((category) => ({
        ...category,
        filtered: category.services.filter((svc) =>
          q ? `${svc.title} ${svc.summary} ${(svc.tags || []).join(' ')}`.toLowerCase().includes(q) : true,
        ),
      }))
      .filter((category) => category.filtered.length > 0)
  }, [query, active])

  return (
    <>
      <Seo
        title="Services — 71 advisory services across 12 practices"
        description="Education, travel, immigration, business setup, strategy, finance, legal, trade, HR, technology, real estate and specialised advisory across eight regions."
        path="/services"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Every advisory, <em className="italic text-softgold">under one roof.</em>
          </>
        }
        description="Twelve practices and 71 services for individuals, families, students, founders, investors and corporations. Start anywhere — we coordinate the rest."
        crumbs={[{ name: 'Services' }]}
        seed="services-hero"
        style="aurora"
      >
        <ButtonLink to="/contact#book" variant="gold">
          Book a free consultation
        </ButtonLink>
        <ButtonLink to="/tools" variant="light">
          Try the free tools
        </ButtonLink>
      </PageHero>

      <section className="border-b border-[color:var(--hair)] bg-[color:var(--surface)]">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:py-10">
          {[
            { value: '71', label: 'Services' },
            { value: '12', label: 'Practices' },
            { value: '8', label: 'Regions' },
            { value: '4 hrs', label: 'Response promise' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-mono text-2xl text-ink md:text-3xl">{stat.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky top-[70px] z-30 border-b border-[color:var(--hair)] bg-[color:var(--bg)]">
        <div className="container-x flex items-center gap-3 overflow-x-auto py-3">
          <button
            type="button"
            onClick={() => setActive('all')}
            className={cn('chip shrink-0', active === 'all' && 'chip-active')}
          >
            All practices
          </button>
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.slug)}
              className={cn('chip shrink-0', active === category.slug && 'chip-active')}
            >
              {category.letter} · {category.title}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-page py-12 md:py-16">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-2">Catalogue</p>
              <h2 className="h2">
                {active === 'all'
                  ? 'Browse all 71 services'
                  : serviceCategories.find((c) => c.slug === active)?.title}
              </h2>
            </div>
            <div className="relative w-full md:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter services…"
                aria-label="Filter services"
                className="input !pl-9 !text-[0.82rem]"
              />
            </div>
          </div>

          {groups.length === 0 && (
            <p className="mt-12 text-center text-sm text-muted">
              No services matched “{query}”. Try “visa”, “tax” or “study”.
            </p>
          )}

          {groups.map((category) => (
            <div key={category.id} id={category.slug} className="mt-12 scroll-mt-40">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[color:var(--hair)] pt-8">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[11px] text-gold">{category.letter}</span>
                    <div>
                      <h3 className="font-display text-2xl text-ink md:text-3xl">{category.title}</h3>
                      <p className="mt-1 max-w-2xl text-[0.82rem] leading-relaxed text-muted">{category.description}</p>
                    </div>
                  </div>
                  <Link to={`/services/${category.slug}`} className="link-underline text-xs">
                    Practice overview
                  </Link>
                </div>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.filtered.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    service={{ ...service, categoryTitle: category.title }}
                    categorySlug={category.slug}
                  />
                ))}
              </div>
            </div>
          ))}

          <Reveal className="mt-16 rounded-2xl border border-gold/25 bg-[color:var(--surface)] p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="eyebrow mb-2">Not sure where to start?</p>
                <h3 className="font-display text-2xl text-ink md:text-3xl">Let the service finder narrow it down.</h3>
                <p className="mt-2 max-w-xl text-sm text-muted">
                  Three questions, no email wall. We will recommend the three services we would put first for your
                  situation.
                </p>
              </div>
              <div className="md:col-span-4 md:justify-self-end">
                <ButtonLink to="/#what-we-do" variant="navy">
                  <Sparkles size={15} /> Use the finder
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
