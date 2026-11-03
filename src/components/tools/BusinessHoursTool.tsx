import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { locations } from '@/data/locations'
import { getOfficeStatus } from '@/utils/time'
import { useOfficeStatus } from '@/hooks/useOfficeStatus'
import { cn } from '@/utils/cn'

type Office = (typeof locations)[number]

function OfficeRow({ office }: { office: Office }) {
  const status = useOfficeStatus(office.hours, office.timezone)
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[color:var(--hair)] px-4 py-3.5 last:border-0">
      <div className="flex min-w-0 items-center gap-3">
        <span aria-hidden="true" className="text-base">{office.flag}</span>
        <div className="min-w-0">
          <p className="truncate text-[0.84rem] font-medium text-ink">
            {office.city}
            {office.isHQ && <span className="ms-1.5 rounded bg-gold/15 px-1 py-0.5 font-mono text-[7px] uppercase text-gold-ink">HQ</span>}
          </p>
          <p className="text-[0.66rem] text-faint">{office.role} · {office.timezone.replace('_', ' ')}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-[0.82rem] text-ink">{status.localTime}</p>
        <p className={cn('font-mono text-[8px] uppercase tracking-wider', status.isOpen ? 'text-success' : 'text-faint')}>
          {status.isOpen ? 'Open' : 'Closed'}
        </p>
      </div>
    </div>
  )
}

export default function BusinessHoursTool() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const openOffices = locations.filter((office) => getOfficeStatus(office.hours, office.timezone, now).isOpen)
  const utc = now.toISOString().slice(11, 16)

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
          <div className="flex items-center justify-between border-b border-[color:var(--hair)] bg-[color:var(--surface-2)] px-4 py-3">
            <p className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              <Clock size={12} className="text-gold-ink" /> Live local times
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">UTC {utc}</p>
          </div>
          {locations.map((office) => (
            <OfficeRow key={office.id} office={office} />
          ))}
        </div>
      </div>

      <div className="space-y-4 lg:col-span-5">
        <div className="rounded-2xl border border-gold/25 bg-navy p-6 text-ivory">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">Right now</p>
          <p className="mt-2 font-mono text-4xl text-ivory">
            {openOffices.length}
            <span className="text-lg text-ivory/35"> / {locations.length}</span>
          </p>
          <p className="mt-1 text-[0.74rem] text-ivory/45">offices are within business hours</p>
          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ivory/10 pt-4">
            {openOffices.length > 0 ? (
              openOffices.map((office) => (
                <span key={office.id} className="rounded-full border border-ivory/15 px-2 py-0.5 text-[0.66rem] text-ivory/65">
                  {office.city}
                </span>
              ))
            ) : (
              <span className="text-[0.72rem] text-ivory/45">All offices are currently closed. Send a note and we will reply at the start of the next business day.</span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
          <p className="mono-label">Calling from another zone</p>
          <ul className="mt-3 space-y-2 text-[0.75rem] leading-relaxed text-muted">
            <li>Dubai is UTC+4 all year — no daylight saving.</li>
            <li>London shifts between GMT and BST; check before a morning call.</li>
            <li>New York is 8–9 hours behind the Gulf.</li>
            <li>For urgent visa or customs matters, WhatsApp is usually fastest.</li>
          </ul>
        </div>

        <p className="text-[0.68rem] leading-relaxed text-faint">
          Hours shown are standard business hours and exclude public holidays. Local times update every 30 seconds.
        </p>
      </div>
    </div>
  )
}
