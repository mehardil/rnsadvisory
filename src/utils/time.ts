/**
 * Office hours and time-zone helpers. Hours strings look like:
 *   "Mon–Sat · 09:00–19:00 GST"
 */

const DAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function parseDays(spec: string): number[] {
  const cleaned = spec.replace(/[–—]/g, '-').trim()
  const [startKey, endKey] = cleaned.split('-').map((s) => s.trim().slice(0, 3))
  const start = DAY_INDEX[startKey]
  const end = DAY_INDEX[endKey]
  if (start === undefined) return [0, 1, 2, 3, 4, 5, 6]
  if (end === undefined) return [start]
  const days: number[] = []
  let d = start
  for (let i = 0; i < 7; i++) {
    days.push(d)
    if (d === end) break
    d = (d + 1) % 7
  }
  return days
}

export function parseOfficeHours(hours: string) {
  const [dayPart, timePart] = hours.split('·').map((s) => s.trim())
  const [openRaw, closeRaw] = (timePart || '').split(/[–—]/).map((s) => s.trim())
  const toMinutes = (t: string) => {
    const m = t?.match(/(\d{1,2}):(\d{2})/)
    return m ? Number(m[1]) * 60 + Number(m[2]) : 0
  }
  const label = (timePart || '').split(' ').pop() || ''
  return {
    days: parseDays(dayPart || ''),
    open: toMinutes(openRaw || '09:00'),
    close: toMinutes(closeRaw || '18:00'),
    abbr: label,
  }
}

export function getOfficeStatus(hours: string, timeZone: string, now = new Date()) {
  const parsed = parseOfficeHours(hours)
  let weekday = 1
  let minutes = 0
  let localTime = '—'
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now)
    const get = (type: string) => parts.find((p) => p.type === type)?.value || ''
    weekday = DAY_INDEX[get('weekday')] ?? 0
    minutes = Number(get('hour')) * 60 + Number(get('minute'))
    localTime = formatLocalTime(now, timeZone)
  } catch {
    /* invalid timezone — fall through to closed */
  }
  const openToday = parsed.days.includes(weekday)
  const isOpen = openToday && minutes >= parsed.open && minutes < parsed.close
  const beforeOpen = openToday && minutes < parsed.open
  return {
    isOpen,
    localTime,
    label: isOpen ? 'Open now' : beforeOpen ? 'Opens later today' : 'Closed',
    detail: isOpen
      ? `Closes ${minutesToLabel(parsed.close)} local time`
      : openToday
        ? `Hours ${minutesToLabel(parsed.open)}–${minutesToLabel(parsed.close)} local time`
        : 'Weekend at this office',
  }
}

export function minutesToLabel(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatLocalTime(date: Date, timeZone: string) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  } catch {
    return '—'
  }
}

export function getDayLabel(date: Date, timeZone: string) {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'short', day: 'numeric', month: 'short' }).format(date)
  } catch {
    return ''
  }
}

/** Next N bookable weekdays for the consultation picker (client-side UI only). */
export function nextBookableDays(count = 10, from = new Date()) {
  const days: { iso: string; label: string; weekday: string; day: string; month: string }[] = []
  const cursor = new Date(from)
  cursor.setDate(cursor.getDate() + 1)
  while (days.length < count) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) {
      days.push({
        iso: cursor.toISOString().slice(0, 10),
        label: cursor.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
        weekday: cursor.toLocaleDateString('en-GB', { weekday: 'short' }),
        day: String(cursor.getDate()).padStart(2, '0'),
        month: cursor.toLocaleDateString('en-GB', { month: 'short' }),
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

export const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
