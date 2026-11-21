import { useEffect } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from './useMediaQuery'

type LenisLike = {
  raf: (time: number) => void
  on: (event: string, fn: () => void) => void
  destroy: () => void
  scrollTo: (target: number, opts?: object) => void
}

/**
 * Smooth scrolling for fine-pointer desktop devices only. The library is loaded
 * lazily so it never ships in the initial bundle, and native scrolling (which is
 * already smooth on touch) is left untouched on mobile.
 */
export function useLenis(enabled = true) {
  const reduced = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const finePointer = useMediaQuery('(pointer: fine)')

  useEffect(() => {
    if (!enabled || reduced || isMobile || !finePointer) return
    let cancelled = false
    let cleanup: (() => void) | undefined

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return
        const lenis = new Lenis({
          duration: 1.05,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.4,
        }) as unknown as LenisLike

        let frame = 0
        let gsapTicker: { add: (fn: (time: number) => void) => void; remove: (fn: (time: number) => void) => void } | null =
          null
        let tickerFn: ((time: number) => void) | null = null

        const raf = (time: number) => {
          lenis.raf(time)
          frame = requestAnimationFrame(raf)
        }
        frame = requestAnimationFrame(raf)

        // If GSAP is already present elsewhere, drive Lenis from its ticker.
        import('gsap')
          .then(({ gsap }) => {
            if (cancelled) return
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
              if (cancelled) return
              gsap.registerPlugin(ScrollTrigger)
              lenis.on('scroll', ScrollTrigger.update)
              gsapTicker = gsap.ticker as unknown as typeof gsapTicker
              tickerFn = (time: number) => lenis.raf(time * 1000)
              gsapTicker?.add(tickerFn)
            })
          })
          .catch(() => {})

        ;(window as unknown as { __lenis?: LenisLike }).__lenis = lenis

        cleanup = () => {
          cancelled = true
          cancelAnimationFrame(frame)
          if (gsapTicker && tickerFn) gsapTicker.remove(tickerFn)
          lenis.destroy()
          delete (window as unknown as { __lenis?: LenisLike }).__lenis
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [enabled, reduced, isMobile, finePointer])
}
