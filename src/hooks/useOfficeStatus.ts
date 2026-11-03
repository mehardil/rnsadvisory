import { useEffect, useState } from 'react'
import { getOfficeStatus } from '@/utils/time'

/** Ticks every 30 seconds so local office times stay fresh without heavy re-renders. */
export function useOfficeStatus(hours: string, timeZone: string) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return getOfficeStatus(hours, timeZone, now)
}
