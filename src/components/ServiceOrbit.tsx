import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { featuredServices } from '@/data/services'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'
import ArtFrame from './ArtFrame'
import IsoBadge, { toneFor } from './IsoBadge'

/**
 * Lightweight pseudo-3D orbit. Nodes are positioned on an ellipse, scaled by
 * depth and re-ordered in z-space every frame — no WebGL cost.
 */
export default function ServiceOrbit({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const pausedRef = useRef(false)
  const angleRef = useRef(0)
  const reduced = usePrefersReducedMotion()
  const services = useMemo(() => featuredServices.slice(0, 8), [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let raf = 0
    let last = 0
    let rx = 240
    let ry = 150

    const measure = () => {
      const rect = wrap.getBoundingClientRect()
      rx = Math.min(rect.width * 0.37, 300)
      ry = Math.min(rect.height * 0.3, 170)
    }

    const layout = () => {
      services.forEach((_, index) => {
        const el = nodeRefs.current[index]
        if (!el) return
        const theta = angleRef.current + (index / services.length) * Math.PI * 2
        const x = Math.cos(theta) * rx
        const y = Math.sin(theta) * ry
        const depth = Math.sin(theta)
        const scale = 0.74 + ((depth + 1) / 2) * 0.3
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`
        el.style.opacity = String(0.55 + ((depth + 1) / 2) * 0.45)
        el.style.zIndex = String(Math.round(50 + depth * 30))
      })
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const delta = last ? now - last : 16
      last = now
      if (!pausedRef.current && !reduced) angleRef.current += delta * 0.00011
      layout()
    }

    measure()
    layout()
    const ro = new ResizeObserver(() => {
      measure()
      layout()
    })
    ro.observe(wrap)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced, services])

  return (
    <div
      ref={wrapRef}
      className={cn('relative mx-auto h-[460px] w-full max-w-[760px] md:h-[560px]', className)}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Orbit rings */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 760 560"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <ellipse cx="380" cy="280" rx="300" ry="170" fill="none" stroke="rgba(201,162,75,0.22)" strokeWidth="1" />
        <ellipse cx="380" cy="280" rx="240" ry="130" fill="none" stroke="rgba(201,162,75,0.12)" strokeWidth="1" strokeDasharray="3 7" />
        <ellipse cx="380" cy="280" rx="345" ry="205" fill="none" stroke="rgba(31,79,216,0.25)" strokeWidth="1" />
      </svg>

      {/* Central core */}
      <div className="absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-gold/30 bg-navy/80 shadow-[0_0_80px_-10px_rgba(201,162,75,0.45)] backdrop-blur-xl md:h-44 md:w-44">
          <ArtFrame
            seed="service-orbit-core"
            imageKey="service-orbit"
            alt=""
            animate
            rounded="rounded-full"
            className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] opacity-60"
            cycleMs={20_000}
          />
          <div className="relative z-10 text-center">
            <p className="font-display text-3xl text-ivory md:text-4xl">71</p>
            <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.2em] text-softgold">Services</p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ivory/45">12 practices</p>
          </div>
        </div>
      </div>

      {services.map((service, index) => {
        return (
          <Link
            key={service.slug}
            ref={(el) => {
              nodeRefs.current[index] = el
            }}
            to={service.path || '#'}
            onFocus={() => (pausedRef.current = true)}
            onBlur={() => (pausedRef.current = false)}
            className="group absolute left-1/2 top-1/2 flex w-[132px] flex-col items-center gap-2 will-change-transform md:w-[148px]"
            aria-label={`${service.title} — ${service.categoryTitle}`}
          >
            <IsoBadge
              icon={service.icon}
              tone={toneFor(service.categorySlug)}
              size="md"
              orbit={false}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="rounded-full border border-ivory/10 bg-navy/70 px-2.5 py-1 text-center text-[9.5px] font-medium leading-tight text-ivory/80 backdrop-blur-sm transition-colors group-hover:border-gold/40 group-hover:text-softgold">
              {service.title}
            </span>
            <ArrowUpRight
              size={12}
              className="absolute -right-1 top-0 text-gold opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        )
      })}
    </div>
  )
}
