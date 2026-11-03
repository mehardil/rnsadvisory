import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import Globe from '@/components/Globe'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import { locations, hubId, regionSummary } from '@/data/locations'
import { useOfficeStatus } from '@/hooks/useOfficeStatus'
import { breadcrumbJsonLd, localBusinessJsonLd, organizationJsonLd } from '@/utils/seo'
import { cn } from '@/utils/cn'

type Office = (typeof locations)[number]

function OfficeCard({ office, selected, onSelect }: { office: Office; selected: boolean; onSelect: () => void }) {
  const status = useOfficeStatus(office.hours, office.timezone)
  return (
    <div
      id={office.id}
      className={cn(
        'card scroll-mt-28 overflow-hidden transition-colors',
        selected ? 'border-gold/60 shadow-[0_0_0_1px_rgba(201,162,75,0.25)]' : '',
      )}
    >
      <div className="relative h-32">
        <ArtFrame
          seed={`location-${office.id}`}
          imageKey={`location-${office.id}`}
          style="skyline"
          alt={`${office.city}, ${office.country}`}
          animate={false}
          rounded="rounded-none"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a] to-transparent" />
        <div className="absolute left-4 top-4 flex gap-1.5">
          <span className="rounded-full border border-gold/40 bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-softgold backdrop-blur">
            {office.role}
          </span>
          {office.isHQ && (
            <span className="rounded-full bg-gold px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-navy">
              HQ
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="font-display text-xl text-ivory">{office.city}</p>
            <p className="text-[0.68rem] text-ivory/55">{office.country}</p>
          </div>
          <button
            type="button"
            onClick={onSelect}
            className="rounded-full border border-ivory/20 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-ivory/60 hover:border-gold hover:text-softgold"
          >
            Show on map
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--hair)] bg-[color:var(--surface-2)] px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-muted">
            <Clock size={12} className="text-gold-ink" /> {status.localTime} local
          </span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider',
              status.isOpen ? 'bg-success/12 text-success' : 'bg-[color:var(--hair)] text-faint',
            )}
          >
            {status.label}
          </span>
        </div>

        <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">{office.blurb}</p>

        <div className="mt-3 flex items-start gap-2 text-[0.72rem] leading-relaxed text-muted">
          <MapPin size={13} className="mt-0.5 shrink-0 text-gold-ink" />
          {office.address}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[0.72rem] text-muted">
          <Clock size={12} className="shrink-0 text-gold-ink" /> {office.hours}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {office.services.slice(0, 4).map((service) => (
            <span key={service} className="rounded-full border border-[color:var(--hair)] px-2 py-0.5 text-[0.62rem] text-muted">
              {service}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[color:var(--hair)] pt-4">
          <Link to={`/contact?office=${office.id}#book`} className="btn btn-gold btn-sm">
            Contact office <ArrowRight size={12} />
          </Link>
          <a href={`tel:${office.phone}`} className="btn btn-outline btn-sm">
            <Phone size={12} /> Call
          </a>
        </div>
        <div className="mt-2 flex items-center justify-between text-[0.66rem] text-faint">
          <a href={`mailto:${office.email}`} className="inline-flex items-center gap-1 hover:text-gold-ink">
            <Mail size={11} /> Email
          </a>
          <span className="font-mono text-[8px] uppercase tracking-wider">Since {office.since}</span>
        </div>
      </div>
    </div>
  )
}

export default function Locations() {
  const [selectedId, setSelectedId] = useState(hubId)
  const [region, setRegion] = useState('All')
  const hub = locations.find((l) => l.id === hubId) || locations[0]
  const filtered = region === 'All' ? locations : locations.filter((l) => l.region === region)

  const onSelect = useCallback((id: string) => {
    setSelectedId(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <>
      <Seo
        title="Global locations — nine offices, eight regions"
        description="Visit or contact RNS Global in Dubai (HQ), Jebel Ali (operations), Riyadh, Mumbai, Lahore, London, Frankfurt, Tallinn and New York."
        path="/locations"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Locations', path: '/locations' },
          ]),
          ...locations.map((office) => localBusinessJsonLd(office)),
        ]}
      />
      <PageHero
        eyebrow="Global presence"
        title={
          <>
            Local teams. <em className="italic text-softgold">Eight regions.</em>
          </>
        }
        description="Dubai is our headquarters. Jebel Ali runs operations. Regional offices in Riyadh, Mumbai, Lahore, London, Frankfurt, Tallinn and New York keep us close to the work."
        crumbs={[{ name: 'Locations' }]}
        seed="locations-hero"
        style="skyline"
      >
        <Link to="/contact#book" className="btn btn-gold">
          Book a consultation
        </Link>
        <a href="https://wa.me/923319051913" target="_blank" rel="noopener noreferrer" className="btn btn-light-outline">
          WhatsApp us
        </a>
      </PageHero>

      <section className="bg-page py-12 md:py-16">
        <div className="container-x grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[#050d1e]">
              <div className="flex items-center justify-between border-b border-ivory/10 px-5 py-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">Office network · drag to rotate</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">Dubai hub</p>
              </div>
              <Globe offices={locations} hub={hub} selectedId={selectedId} onSelect={onSelect} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="card h-full p-6">
              <p className="eyebrow">Where we operate</p>
              <h2 className="mt-2 font-display text-2xl text-ink">One team, four regional clusters</h2>
              <div className="mt-5 space-y-3">
                {regionSummary.map((cluster) => (
                  <div key={cluster.region} className="rounded-xl border border-[color:var(--hair)] p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.82rem] font-semibold text-ink">
                        <span className="text-[0.82rem]">{cluster.region}</span>
                      </p>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-faint">{cluster.offices.length} offices</span>
                    </div>
                    <p className="mt-1 text-[0.72rem] text-muted">{cluster.offices.join(' · ')}</p>
                    <p className="mt-1 text-[0.66rem] text-faint">{cluster.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-[color:var(--hair)] pt-4 text-[0.7rem] leading-relaxed text-faint">
                All offices share one client charter and one document system. You can start in Lahore and be served in
                Dubai without repeating your file.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[color:var(--hair)] bg-[color:var(--surface)] py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Our offices</span>
              <h2 className="mt-2 font-display text-3xl text-ink">Nine offices, one standard</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Middle East', 'South Asia', 'Europe', 'North America'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRegion(item)}
                  className={cn('chip', region === item && 'chip-active')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((office) => (
              <Reveal key={office.id}>
                <OfficeCard office={office} selected={selectedId === office.id} onSelect={() => onSelect(office.id)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Dubai headquarters</span>
            <h2 className="mt-2 font-display text-3xl text-ink">Visit us in the DIFC</h2>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              Our head office sits in Emirates Financial Towers, a short walk from DIFC Gate Avenue. Meetings are by
              appointment so the right specialist can join.
            </p>
            <div className="mt-5 space-y-2.5 text-[0.8rem]">
              <p className="flex items-start gap-2 text-muted">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold-ink" /> Level 21, Emirates Financial Towers, DIFC, Dubai
              </p>
              <p className="flex items-center gap-2 text-muted">
                <Phone size={14} className="shrink-0 text-gold-ink" />
                <a href="tel:+923319051913" className="hover:text-gold-ink">+92 331 905 1913</a>
              </p>
              <p className="flex items-center gap-2 text-muted">
                <Mail size={14} className="shrink-0 text-gold-ink" />
                <a href="mailto:mehardil13302@gmail.com" className="break-all hover:text-gold-ink">mehardil13302@gmail.com</a>
              </p>
              <p className="flex items-center gap-2 text-muted">
                <Clock size={14} className="shrink-0 text-gold-ink" /> Monday–Saturday, 09:00–19:00 GST
              </p>
            </div>
            <Link to="/contact?office=dubai#book" className="btn btn-gold mt-6">
              Contact this office <ArrowRight size={14} />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface-2)]">
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  title="Map of RNS Global head office in DIFC, Dubai"
                  src="https://www.google.com/maps?q=DIFC%2C%20Dubai%2C%20UAE&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[color:var(--hair)] px-4 py-3">
                <p className="inline-flex items-center gap-2 text-[0.72rem] text-muted">
                  <Building2 size={13} className="text-gold-ink" /> DIFC, Dubai
                </p>
                <a
                  href="https://www.google.com/maps?q=DIFC+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.72rem] font-semibold text-gold-ink underline underline-offset-2"
                >
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
