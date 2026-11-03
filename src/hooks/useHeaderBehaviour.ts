import { useEffect, useRef, useState } from 'react'

/** Sticky header: hides on scroll down, returns on scroll up, solid after 24px. */
export function useHeaderBehaviour() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        if (y > 220 && y > lastY.current + 6) setHidden(true)
        else if (y < lastY.current - 6 || y < 120) setHidden(false)
        lastY.current = y
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { hidden, scrolled }
}
