import { useMemo, useState } from 'react'
import { Calendar, Check, Clock } from 'lucide-react'
import { cn } from '@/utils/cn'
import { nextBookableDays, TIME_SLOTS } from '@/utils/time'

interface BookingCalendarProps {
  value?: { date?: string; slot?: string }
  onChange?: (value: { date?: string; slot?: string }) => void
}

export default function BookingCalendar({ value, onChange }: BookingCalendarProps) {
  const days = useMemo(() => nextBookableDays(10), [])
  const [internal, setInternal] = useState<{ date?: string; slot?: string }>({ date: days[0]?.iso })
  const selected = value ?? internal

  const update = (next: { date?: string; slot?: string }) => {
    if (!value) setInternal(next)
    onChange?.(next)
  }

  return (
    <div className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5 md:p-6">
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-gold" />
        <h3 className="text-sm font-semibold text-ink">Choose a date</h3>
        <span className="ms-auto mono-label !text-[9px]">Next 10 business days</span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {days.map((day) => {
          const active = selected.date === day.iso
          return (
            <button
              key={day.iso}
              type="button"
              onClick={() => update({ date: day.iso, slot: selected.slot })}
              aria-pressed={active}
              className={cn(
                'flex flex-col items-center rounded-xl border px-1 py-2.5 transition-all',
                active
                  ? 'border-gold bg-gold/10 text-ink shadow-[0_0_0_1px_rgba(201,162,75,0.25)]'
                  : 'border-[color:var(--hair)] text-muted hover:border-gold/50 hover:text-ink',
              )}
            >
              <span className="font-mono text-[9px] uppercase tracking-wider">{day.weekday}</span>
              <span className="mt-0.5 font-display text-lg leading-none">{day.day}</span>
              <span className="mt-0.5 font-mono text-[8px] uppercase">{day.month}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Clock size={16} className="text-gold" />
        <h3 className="text-sm font-semibold text-ink">Choose a time</h3>
        <span className="ms-auto mono-label !text-[9px]">GST (UTC+4)</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {TIME_SLOTS.map((slot) => {
          const active = selected.slot === slot
          return (
            <button
              key={slot}
              type="button"
              onClick={() => update({ date: selected.date, slot })}
              aria-pressed={active}
              className={cn(
                'rounded-lg border py-2 font-mono text-[11px] transition-all',
                active
                  ? 'border-gold bg-gold text-navy'
                  : 'border-[color:var(--hair)] text-muted hover:border-gold/50 hover:text-ink',
              )}
            >
              {slot}
            </button>
          )
        })}
      </div>

      <div
        className={cn(
          'mt-5 flex items-start gap-2 rounded-lg border p-3 text-[0.72rem] leading-relaxed',
          selected.slot
            ? 'border-success/30 bg-success/8 text-ink'
            : 'border-[color:var(--hair)] bg-[color:var(--surface-2)] text-muted',
        )}
        role="status"
      >
        {selected.slot ? <Check size={14} className="mt-0.5 shrink-0 text-success" /> : <Clock size={14} className="mt-0.5 shrink-0" />}
        <span>
          {selected.slot
            ? `Selected: ${days.find((d) => d.iso === selected.date)?.label || selected.date} at ${selected.slot} GST. We will confirm by email or WhatsApp.`
            : 'Pick a time slot to complete your request. Consultations are held on Zoom, Google Meet or in person in Dubai.'}
        </span>
      </div>
    </div>
  )
}
