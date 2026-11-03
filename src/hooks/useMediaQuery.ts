import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Conservative low-end detection. Mobile, reduced-motion users and devices with
 * limited memory/cores receive the lightweight canvas experience instead of WebGL.
 */
export function useIsLowEnd() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const reduced = usePrefersReducedMotion()
  const [lowSpec, setLowSpec] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number }
    const memory = nav.deviceMemory ?? 8
    const cores = nav.hardwareConcurrency ?? 8
    setLowSpec(memory <= 4 || cores <= 4)
  }, [])

  return isMobile || reduced || lowSpec
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
