import { useRef, type ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/** 3D tilt with a moving glare highlight. Disabled for touch and reduced motion. */
export default function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-3px)`
    el.style.setProperty('--glare-x', `${px * 100}%`)
    el.style.setProperty('--glare-y', `${py * 100}%`)
    el.style.setProperty('--glare-opacity', '1')
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
    ref.current.style.setProperty('--glare-opacity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('relative transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            opacity: 'var(--glare-opacity, 0)',
            background:
              'radial-gradient(420px circle at var(--glare-x,50%) var(--glare-y,50%), rgba(232,214,160,0.18), transparent 55%)',
          }}
        />
      )}
    </div>
  )
}
