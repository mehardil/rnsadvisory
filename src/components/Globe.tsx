import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import { createRandom } from '@/utils/random'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface Office {
  id: string
  city: string
  lat: number
  lng: number
  isHQ: boolean
}

const toRad = (deg: number) => (deg * Math.PI) / 180

function project(lat: number, lng: number, rot: number, cx: number, cy: number, r: number) {
  const phi = toRad(90 - lat)
  const theta = toRad(lng + rot)
  const x3 = Math.sin(phi) * Math.cos(theta)
  const y3 = Math.cos(phi)
  const z3 = Math.sin(phi) * Math.sin(theta)
  return { x: cx + x3 * r, y: cy - y3 * r, z: z3 }
}

function toVec(lat: number, lng: number) {
  const phi = toRad(90 - lat)
  const theta = toRad(lng)
  return { x: Math.sin(phi) * Math.cos(theta), y: Math.cos(phi), z: Math.sin(phi) * Math.sin(theta) }
}

function slerp(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }, t: number) {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z))
  const omega = Math.acos(dot)
  if (omega < 0.001) return { ...a }
  const sin = Math.sin(omega)
  const k1 = Math.sin((1 - t) * omega) / sin
  const k2 = Math.sin(t * omega) / sin
  return { x: a.x * k1 + b.x * k2, y: a.y * k1 + b.y * k2, z: a.z * k1 + b.z * k2 }
}

interface GlobeProps {
  offices: Office[]
  hub: Office
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export default function Globe({ offices, hub, selectedId, onSelect, className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef({ rot: 20, dragging: false, lastX: 0, moved: false })
  const hitRef = useRef<{ id: string; x: number; y: number }[]>([])
  const hoveredRef = useRef<string | null>(null)
  const selectRef = useRef(onSelect)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    selectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let last = 0
    let idle = 0

    const dots = (() => {
      const rand = createRandom('globe-dots-v2')
      return Array.from({ length: 520 }, () => {
        const u = rand.next()
        const v = rand.next()
        const theta = 2 * Math.PI * u
        const phi = Math.acos(2 * v - 1)
        return {
          lat: 90 - (phi * 180) / Math.PI,
          lng: (theta * 180) / Math.PI - 180,
          size: rand.range(0.5, 1.4),
          gold: rand.chance(0.08),
        }
      })
    })()

    const hubVec = toVec(hub.lat, hub.lng)

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    const draw = (now: number) => {
      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.37
      const rot = stateRef.current.rot
      ctx.clearRect(0, 0, w, h)

      // Atmosphere
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.45)
      halo.addColorStop(0, 'rgba(31,79,216,0.25)')
      halo.addColorStop(0.55, 'rgba(31,79,216,0.08)')
      halo.addColorStop(1, 'transparent')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2)
      ctx.fill()

      // Sphere
      const sphere = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.42,
        radius * 0.1,
        cx,
        cy,
        radius,
      )
      sphere.addColorStop(0, '#1d3f78')
      sphere.addColorStop(0.55, '#10254d')
      sphere.addColorStop(1, '#050d1e')
      ctx.fillStyle = sphere
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      // Surface dots (land-like texture)
      for (const dot of dots) {
        const p = project(dot.lat, dot.lng, rot, cx, cy, radius)
        if (p.z <= 0.02) continue
        ctx.fillStyle = dot.gold
          ? `rgba(232,214,160,${0.25 + p.z * 0.5})`
          : `rgba(150,180,235,${0.06 + p.z * 0.26})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, dot.size * (0.6 + p.z * 0.6), 0, Math.PI * 2)
        ctx.fill()
      }

      // Graticule
      ctx.lineWidth = 0.5
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        let started = false
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = project(lat, lng, rot, cx, cy, radius)
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y)
              started = true
            } else ctx.lineTo(p.x, p.y)
          } else {
            started = false
          }
        }
        ctx.strokeStyle = 'rgba(232,214,160,0.10)'
        ctx.stroke()
      }
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath()
        let started = false
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lng, rot, cx, cy, radius)
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y)
              started = true
            } else ctx.lineTo(p.x, p.y)
          } else {
            started = false
          }
        }
        ctx.strokeStyle = 'rgba(232,214,160,0.07)'
        ctx.stroke()
      }

      // Rim
      ctx.strokeStyle = 'rgba(232,214,160,0.28)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Arcs from the Dubai hub
      offices
        .filter((office) => office.id !== hub.id)
        .forEach((office, index) => {
          const target = toVec(office.lat, office.lng)
          const points: { x: number; y: number; z: number }[] = []
          for (let s = 0; s <= 40; s++) {
            const t = s / 40
            const v = slerp(hubVec, target, t)
            const lift = 1 + Math.sin(Math.PI * t) * 0.22
            const vx = v.x * lift
            const vy = v.y * lift
            const vz = v.z * lift
            const theta = toRad(rot)
            // rotate around the Y axis to match the sphere projection
            const rx = vx * Math.cos(theta) + vz * Math.sin(theta)
            const rz = -vx * Math.sin(theta) + vz * Math.cos(theta)
            const px = cx + rx * radius
            const py = cy - vy * radius
            points.push({ x: px, y: py, z: rz })
          }

          // faint full arc
          ctx.lineWidth = 0.9
          ctx.strokeStyle =
            selectedId === office.id ? 'rgba(232,214,160,0.75)' : 'rgba(201,162,75,0.28)'
          ctx.beginPath()
          let drawing = false
          for (const p of points) {
            if (p.z > 0.05) {
              if (!drawing) {
                ctx.moveTo(p.x, p.y)
                drawing = true
              } else ctx.lineTo(p.x, p.y)
            } else drawing = false
          }
          ctx.stroke()

          // travelling pulse
          const progress = ((now * 0.00012 + index * 0.13) % 1)
          const indexPoint = Math.floor(progress * points.length)
          const pp = points[Math.min(points.length - 1, indexPoint)]
          if (pp && pp.z > 0.05) {
            const g = ctx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, 6)
            g.addColorStop(0, 'rgba(255,240,200,0.95)')
            g.addColorStop(1, 'rgba(232,214,160,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(pp.x, pp.y, 6, 0, Math.PI * 2)
            ctx.fill()
          }
        })

      // Markers
      const hits: { id: string; x: number; y: number }[] = []
      for (const office of offices) {
        const p = project(office.lat, office.lng, rot, cx, cy, radius)
        if (p.z <= 0) continue
        hits.push({ id: office.id, x: p.x, y: p.y })
        const isSelected = selectedId === office.id
        const isHover = hoveredRef.current === office.id
        const isHub = office.isHQ
        const size = isHub ? 5.2 : 3.4
        const alpha = 0.35 + p.z * 0.65

        if (isHub || isSelected || isHover) {
          ctx.strokeStyle = `rgba(232,214,160,${0.18 + p.z * 0.42})`
          ctx.lineWidth = 1
          const pulse = isHub ? 8 + Math.sin(now * 0.002) * 3 : 7
          ctx.beginPath()
          ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.fillStyle = isHub
          ? 'rgba(255,236,190,0.98)'
          : `rgba(201,162,75,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, isSelected || isHover ? size + 1.4 : size, 0, Math.PI * 2)
        ctx.fill()

        if (isHub || isSelected || isHover || p.z > 0.55) {
          ctx.font = '500 9px "JetBrains Mono", monospace'
          ctx.fillStyle = isHub ? 'rgba(255,236,190,0.95)' : `rgba(232,214,160,${0.45 + p.z * 0.5})`
          ctx.textAlign = 'left'
          ctx.fillText(office.city.toUpperCase(), p.x + 8, p.y + 3)
        }
      }
      hitRef.current = hits
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (now - last < 33) return
      const delta = last ? now - last : 16
      last = now
      if (!stateRef.current.dragging) {
        idle += delta
        if (idle > 1200) stateRef.current.rot += delta * (reduced ? 0 : 0.012)
      }
      draw(now)
    }

    const pointerPos = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onDown = (event: PointerEvent) => {
      stateRef.current.dragging = true
      stateRef.current.lastX = event.clientX
      stateRef.current.moved = false
      idle = 0
      canvas.setPointerCapture(event.pointerId)
    }
    const onMove = (event: PointerEvent) => {
      const { x, y } = pointerPos(event)
      if (stateRef.current.dragging) {
        const dx = event.clientX - stateRef.current.lastX
        if (Math.abs(dx) > 1) stateRef.current.moved = true
        stateRef.current.rot += dx * 0.35
        stateRef.current.lastX = event.clientX
        idle = 0
        return
      }
      const hit = hitRef.current.find((marker) => Math.hypot(marker.x - x, marker.y - y) < 14)
      hoveredRef.current = hit ? hit.id : null
      canvas.style.cursor = hit ? 'pointer' : 'grab'
    }
    const onUp = (event: PointerEvent) => {
      stateRef.current.dragging = false
      if (stateRef.current.moved) return
      const { x, y } = pointerPos(event)
      const hit = hitRef.current.find((marker) => Math.hypot(marker.x - x, marker.y - y) < 18)
      if (hit) selectRef.current?.(hit.id)
    }
    const onLeave = () => {
      stateRef.current.dragging = false
      hoveredRef.current = null
    }

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
    })
    observer.observe(wrap)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)
    resize()

    raf = requestAnimationFrame(loop)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [offices, hub, selectedId, reduced])

  return (
    <div ref={wrapRef} className={cn('relative h-[380px] w-full md:h-[520px]', className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        role="img"
        aria-label="Interactive globe showing RNS Global offices. Arcs connect the Dubai headquarters to each regional office. A list view follows below."
      />
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/45">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-softgold" /> Hub — Dubai
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold/60" /> Regional office
        </span>
        <span className="hidden sm:inline">Drag to rotate · Click a marker</span>
      </div>
    </div>
  )
}
