import { useEffect, useRef } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/** A restrained custom cursor: gold dot plus a trailing ring. Desktop only. */
export default function CustomCursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = usePrefersReducedMotion()
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!fine || reduced) return
    document.documentElement.classList.add('cursor-none-desktop')
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...target }
    let raf = 0
    let visible = false

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      const interactive = (event.target as HTMLElement).closest('a,button,[role="button"],input,textarea,select,label')
      ring.style.width = interactive ? '46px' : '28px'
      ring.style.height = interactive ? '46px' : '28px'
      ring.style.borderColor = interactive ? 'rgba(201,162,75,0.9)' : 'rgba(201,162,75,0.45)'
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      ringPos.x += (target.x - ringPos.x) * 0.16
      ringPos.y += (target.y - ringPos.y) * 0.16
      dot.style.transform = `translate3d(${target.x - 2}px, ${target.y - 2}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x - 14}px, ${ringPos.y - 14}px, 0)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('cursor-none-desktop')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] hidden lg:block">
      <div
        ref={dotRef}
        className="absolute h-1 w-1 rounded-full bg-gold opacity-0 transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="absolute h-7 w-7 rounded-full border border-gold/40 opacity-0 transition-[width,height,border-color,opacity] duration-200"
      />
    </div>
  )
}
