import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Clock, List, MapPin, Phone } from 'lucide-react'
import { locations, hubId } from '@/data/locations'
import Globe from '@/components/Globe'
import ArtFrame from '@/components/ArtFrame'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import { useOfficeStatus } from '@/hooks/useOfficeStatus'
import { cn } from '@/utils/cn'

export default function GlobalPresence() {
  const [selectedId, setSelectedId] = useState(hubId)
  const [listView, setListView] = useState(false)
  const selected = locations.find((l) => l.id === selectedId) || locations[0]
  const status = useOfficeStatus(selected.hours, selected.timezone)
  const hub = locations.find((l) => l.id === hubId) || locations[0]

  const onSelect = useCallback((id: string) => {
    setSelectedId(id)
    setListView(false)
  }, [])

  return (
    <section className="relative overflow-hidden bg-navy py-20 text-ivory md:py-28">
      <div className="container-x">
        <SectionHeading
          tone="dark"
          eyebrow="Global presence"
          title={
            <>
              Eight regions. <em className="text-softgold">One accountable team.</em>
            </>
          }
          description="Our Dubai headquarters coordinates every engagement. Regional teams in Jebel Ali, Riyadh, Mumbai, Lahore, London, Frankfurt, Tallinn and New York handle the work on the ground."
          action={{ label: 'All offices', to: '/locations' }}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-ivory/10 bg-[#050d1e]">
              <div className="flex items-center justify-between border-b border-ivory/10 px-5 py-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
                  Network map · Dubai hub
                </p>
                <button
                  type="button"
                  onClick={() => setListView((v) => !v)}
                  aria-pressed={listView}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ivory/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ivory/60 transition-colors hover:border-gold hover:text-softgold"
                >
                  {listView ? <MapPin size={11} /> : <List size={11} />}
                  {listView ? 'Globe view' : 'List view'}
                </button>
              </div>

              {listView ? (
                <ul className="grid max-h-[520px] gap-px overflow-y-auto bg-ivory/5 sm:grid-cols-2">
                  {locations.map((office) => (
                    <li key={office.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(office.id)}
                        className={cn(
                          'flex w-full flex-col gap-1 bg-[#050d1e] px-4 py-3.5 text-left transition-colors hover:bg-ivory/5',
                          office.id === selectedId && 'bg-ivory/[0.07]',
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 text-sm font-medium text-ivory">
                            <span aria-hidden="true">{office.flag}</span> {office.city}
                          </span>
                          {office.isHQ && (
                            <span className="font-mono text-[8px] uppercase tracking-wider text-gold">HQ</span>
                          )}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-ivory/35">{office.role}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <Globe offices={locations} hub={hub} selectedId={selectedId} onSelect={onSelect} />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/12 bg-ivory/[0.04] backdrop-blur-sm">
              <div className="relative h-32">
                <ArtFrame
                  seed={`location-${selected.id}`}
                  imageKey={`location-${selected.id}`}
                  style="skyline"
                  alt={`${selected.city} office`}
                  animate={false}
                  rounded="rounded-none"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a] to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-softgold backdrop-blur">
                  {selected.role}
                </span>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-ivory">{selected.city}</h3>
                    <p className="text-[0.7rem] text-ivory/55">{selected.country}</p>
                  </div>
                  <span className="font-mono text-[9px] text-ivory/40">{selected.since}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-ivory/10 bg-ivory/[0.03] px-3 py-2.5">
                  <span className="inline-flex items-center gap-2 text-[0.7rem] text-ivory/60">
                    <Clock size={13} className="text-softgold" /> {status.localTime} local
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider',
                      status.isOpen ? 'bg-success/15 text-[#7BE0B4]' : 'bg-ivory/10 text-ivory/50',
                    )}
                  >
                    {status.label}
                  </span>
                </div>

                <p className="mt-4 text-[0.8rem] leading-relaxed text-ivory/60">{selected.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.services.slice(0, 4).map((service) => (
                    <span key={service} className="rounded-full border border-ivory/12 px-2 py-0.5 text-[0.64rem] text-ivory/50">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-start gap-2 border-t border-ivory/10 pt-4 text-[0.7rem] leading-relaxed text-ivory/45">
                  <Building2 size={13} className="mt-0.5 shrink-0 text-gold/70" />
                  {selected.address}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                  <Link
                    to={`/contact?office=${selected.id}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gold px-3 py-2.5 text-[0.72rem] font-semibold text-navy transition-transform hover:scale-[1.02]"
                  >
                    Contact office <ArrowRight size={12} />
                  </Link>
                  <a
                    href="tel:+923319051913"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ivory/20 px-3 py-2.5 text-[0.72rem] font-medium text-ivory/70 transition-colors hover:border-gold hover:text-softgold"
                  >
                    <Phone size={12} /> Call
                  </a>
                </div>
                <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/25">
                  {status.detail}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
