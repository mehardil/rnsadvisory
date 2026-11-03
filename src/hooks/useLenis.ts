import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './useMediaQuery'

/**
 * Lenis smooth scrolling, wired into GSAP ScrollTrigger when it is present.
 * Disabled entirely for reduced-motion users.
 */
export function useLenis(enabled = true) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) return
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    let frame = 0
    let gsapTicker: { add: (fn: (time: number) => void) => void; remove: (fn: (time: number) => void) => void } | null =
      null
    let cancel = false
    let tickerFn: ((time: number) => void) | null = null

    const raf = (time: number) => {
      if (cancel) return
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // If gsap is already loaded, drive lenis from its ticker for perfect sync.
    import('gsap')
      .then(({ gsap }) => {
        if (cancel) return
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          if (cancel) return
          gsap.registerPlugin(ScrollTrigger)
          lenis.on('scroll', ScrollTrigger.update)
          gsapTicker = gsap.ticker as unknown as typeof gsapTicker
          tickerFn = (time: number) => lenis.raf(time * 1000)
          gsapTicker?.add(tickerFn)
        })
      })
      .catch(() => {})

    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    return () => {
      cancel = true
      cancelAnimationFrame(frame)
      if (gsapTicker && tickerFn) gsapTicker.remove(tickerFn)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [enabled, reduced])
}
