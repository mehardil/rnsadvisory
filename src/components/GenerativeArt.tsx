import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { createRandom, getSessionSalt, hashSeed } from '@/utils/random'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

export type ArtStyle =
  | 'mesh'
  | 'particles'
  | 'contours'
  | 'crystals'
  | 'waves'
  | 'aurora'
  | 'skyline'
  | 'orbits'

const STYLES: ArtStyle[] = ['mesh', 'particles', 'contours', 'crystals', 'waves', 'aurora', 'skyline', 'orbits']

export function pickArtStyle(seed: string): ArtStyle {
  return STYLES[hashSeed(seed) % STYLES.length]
}

interface Palette {
  navy: string
  deep: string
  royal: string
  gold: string
  softGold: string
  ivory: string
  glowA: string
  glowB: string
}

function buildPalette(rand: ReturnType<typeof createRandom>): Palette {
  const hueShift = rand.range(-10, 10)
  const goldHue = 42 + rand.range(-6, 6)
  return {
    navy: `hsl(${222 + hueShift} 62% 8%)`,
    deep: `hsl(${221 + hueShift} 60% 14%)`,
    royal: `hsl(${222 + hueShift} 68% 34%)`,
    gold: `hsl(${goldHue} 55% 55%)`,
    softGold: `hsl(${goldHue} 62% 78%)`,
    ivory: '#f7f5ef',
    glowA: `hsla(${goldHue} 70% 60% / 0.55)`,
    glowB: `hsla(${220 + hueShift} 80% 55% / 0.5)`,
  }
}

function paintBackground(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette) {
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, p.navy)
  bg.addColorStop(0.55, p.deep)
  bg.addColorStop(1, p.navy)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)
}

function blob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, color)
  g.addColorStop(1, 'transparent')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

function paintMesh(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  ctx.globalCompositeOperation = 'lighter'
  const count = 7
  for (let i = 0; i < count; i++) {
    const baseX = rand.range(0.1, 0.9) * w
    const baseY = rand.range(0.15, 0.9) * h
    const x = baseX + Math.sin(t * 0.00025 + i * 1.7) * w * 0.08
    const y = baseY + Math.cos(t * 0.0002 + i * 1.1) * h * 0.1
    const r = Math.max(w, h) * rand.range(0.22, 0.46)
    blob(ctx, x, y, r, i % 3 === 0 ? p.glowA : i % 3 === 1 ? p.glowB : 'hsla(190 70% 55% / 0.22)')
  }
  ctx.globalCompositeOperation = 'source-over'
  const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.78)
  vignette.addColorStop(0, 'transparent')
  vignette.addColorStop(1, 'rgba(4,10,24,0.72)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, w, h)
}

function paintParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  ctx.globalCompositeOperation = 'lighter'
  blob(ctx, w * 0.72, h * 0.32, Math.max(w, h) * 0.45, 'hsla(222 80% 40% / 0.35)')
  blob(ctx, w * 0.2, h * 0.8, Math.max(w, h) * 0.3, 'hsla(42 70% 55% / 0.16)')

  const count = 74
  const nodes = Array.from({ length: count }, () => ({
    x: rand.next() * w,
    y: rand.next() * h,
    vx: rand.range(-0.06, 0.06),
    vy: rand.range(-0.06, 0.06),
    r: rand.range(0.6, 2.1),
    gold: rand.chance(0.35),
  }))

  for (const n of nodes) {
    const x = (n.x + n.vx * t + Math.sin(t * 0.0008 + n.y) * 6 + w) % w
    const y = (n.y + n.vy * t + Math.cos(t * 0.0006 + n.x) * 6 + h) % h
    n.x = x
    n.y = y
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.hypot(dx, dy)
      const threshold = Math.min(w, h) * 0.16
      if (dist < threshold) {
        ctx.strokeStyle = `hsla(42 60% 70% / ${0.16 * (1 - dist / threshold)})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }
  }

  for (const n of nodes) {
    ctx.fillStyle = n.gold ? 'rgba(232,214,160,0.95)' : 'rgba(160,185,235,0.75)'
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
}

function paintContours(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  const levels = 24
  const steps = 64
  const phase = rand.range(0, Math.PI * 2)
  ctx.lineWidth = 0.8
  for (let k = 0; k < levels; k++) {
    const baseY = (h / levels) * k
    const progress = k / levels
    ctx.strokeStyle = `hsla(${42 + progress * 6} 58% ${62 - progress * 18}% / ${0.14 + progress * 0.3})`
    ctx.beginPath()
    for (let s = 0; s <= steps; s++) {
      const x = (w / steps) * s
      const nx = x / w
      const y =
        baseY +
        Math.sin(nx * 8 + phase + k * 0.35 + t * 0.00012) * (h * 0.045) +
        Math.sin(nx * 17 + k * 0.2 - t * 0.00008) * (h * 0.018)
      if (s === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  const glow = ctx.createRadialGradient(w * 0.7, h * 0.25, 0, w * 0.7, h * 0.25, w * 0.5)
  glow.addColorStop(0, 'hsla(42 80% 65% / 0.18)')
  glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)
}

function paintCrystals(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  blob(ctx, w * 0.5, h * 0.5, Math.max(w, h) * 0.5, 'hsla(222 80% 40% / 0.35)')
  blob(ctx, w * 0.78, h * 0.2, w * 0.3, 'hsla(42 70% 55% / 0.22)')

  ctx.strokeStyle = 'rgba(232,214,160,0.18)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.ellipse(w / 2, h / 2, w * 0.36, h * 0.16, -0.2, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(w / 2, h / 2, w * 0.24, h * 0.34, 0.7, 0, Math.PI * 2)
  ctx.stroke()

  const count = 6
  for (let i = 0; i < count; i++) {
    const cx = w * (0.18 + 0.64 * rand.next())
    const cy = h * (0.2 + 0.6 * rand.next())
    const radius = Math.min(w, h) * rand.range(0.08, 0.2)
    const sides = rand.int(4, 7)
    const rot = rand.range(0, Math.PI) + t * 0.00006 * (i % 2 === 0 ? 1 : -1)
    const gold = rand.chance(0.5)

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rot)
    ctx.beginPath()
    for (let s = 0; s < sides; s++) {
      const angle = (s / sides) * Math.PI * 2
      const r = radius * (0.85 + rand.next() * 0.3)
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r * 0.9
      if (s === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    const fill = ctx.createLinearGradient(-radius, -radius, radius, radius)
    fill.addColorStop(0, gold ? 'rgba(232,214,160,0.42)' : 'rgba(80,120,220,0.4)')
    fill.addColorStop(0.5, gold ? 'rgba(201,162,75,0.16)' : 'rgba(31,79,216,0.18)')
    fill.addColorStop(1, 'rgba(247,245,239,0.05)')
    ctx.fillStyle = fill
    ctx.shadowColor = gold ? 'rgba(232,214,160,0.55)' : 'rgba(80,130,255,0.5)'
    ctx.shadowBlur = 28
    ctx.fill()
    ctx.strokeStyle = gold ? 'rgba(232,214,160,0.8)' : 'rgba(160,190,255,0.65)'
    ctx.lineWidth = 0.9
    ctx.stroke()
    ctx.restore()
  }
  ctx.shadowBlur = 0
}

function paintWaves(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  const lines = 22
  const steps = 72
  for (let i = 0; i < lines; i++) {
    const progress = i / lines
    const baseY = h * (0.18 + progress * 0.72)
    const amp = h * (0.02 + 0.06 * (1 - progress))
    const gradient = ctx.createLinearGradient(0, 0, w, 0)
    gradient.addColorStop(0, 'rgba(70,110,210,0.05)')
    gradient.addColorStop(0.5, `hsla(42 62% 65% / ${0.14 + progress * 0.22})`)
    gradient.addColorStop(1, 'rgba(40,80,180,0.06)')
    ctx.strokeStyle = gradient
    ctx.lineWidth = 1.1
    ctx.beginPath()
    for (let s = 0; s <= steps; s++) {
      const x = (w / steps) * s
      const y =
        baseY +
        Math.sin((x / w) * Math.PI * 3 + i * 0.6 + t * 0.0006) * amp +
        Math.sin((x / w) * Math.PI * 7 + i * 0.3 - t * 0.0004) * amp * 0.4
      if (s === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function paintAurora(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 5; i++) {
    const x = w * (0.2 + 0.6 * rand.next()) + Math.sin(t * 0.0002 + i) * w * 0.04
    const y = h * (0.2 + 0.5 * rand.next())
    blob(ctx, x, y, Math.max(w, h) * rand.range(0.25, 0.55), i % 2 === 0 ? p.glowA : p.glowB)
  }
  // Ribbons
  for (let r = 0; r < 3; r++) {
    const gradient = ctx.createLinearGradient(0, 0, w, h)
    gradient.addColorStop(0, 'rgba(31,79,216,0)')
    gradient.addColorStop(0.45, r === 1 ? 'rgba(232,214,160,0.5)' : 'rgba(90,140,255,0.4)')
    gradient.addColorStop(1, 'rgba(31,79,216,0)')
    ctx.strokeStyle = gradient
    ctx.lineWidth = h * (0.06 + r * 0.035)
    ctx.beginPath()
    for (let s = 0; s <= 40; s++) {
      const nx = s / 40
      const x = nx * w
      const y = h * (0.35 + r * 0.12) + Math.sin(nx * Math.PI * 2 + t * 0.0003 + r * 1.4) * h * 0.12
      if (s === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  // Stars
  for (let i = 0; i < 90; i++) {
    const x = rand.next() * w
    const y = rand.next() * h * 0.7
    const alpha = 0.2 + rand.next() * 0.6 * (0.6 + 0.4 * Math.sin(t * 0.001 + i))
    ctx.fillStyle = `rgba(247,245,239,${alpha})`
    ctx.fillRect(x, y, 1, 1)
  }
  ctx.globalCompositeOperation = 'source-over'
  const vignette = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75)
  vignette.addColorStop(0, 'transparent')
  vignette.addColorStop(1, 'rgba(4,10,24,0.6)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, w, h)
}

function paintSkyline(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  const sky = ctx.createLinearGradient(0, 0, 0, h)
  sky.addColorStop(0, p.navy)
  sky.addColorStop(0.55, '#132a56')
  sky.addColorStop(1, '#08152d')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)

  // Sun / moon glow
  const sunX = w * 0.72
  const sunY = h * 0.34
  const sun = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.4)
  sun.addColorStop(0, 'rgba(232,214,160,0.55)')
  sun.addColorStop(0.25, 'rgba(201,162,75,0.18)')
  sun.addColorStop(1, 'transparent')
  ctx.fillStyle = sun
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(232,214,160,0.85)'
  ctx.beginPath()
  ctx.arc(sunX, sunY, h * 0.035, 0, Math.PI * 2)
  ctx.fill()

  // Distant haze
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = `rgba(120,150,210,${0.02 + rand.next() * 0.03})`
    ctx.fillRect(0, h * (0.35 + rand.next() * 0.2), w, 1 + rand.next() * 2)
  }

  // Two depth layers of buildings
  const drawLayer = (baseY: number, maxH: number, color: string, windows: boolean) => {
    let x = -20
    while (x < w + 20) {
      const bw = rand.range(w * 0.018, w * 0.07)
      const bh = rand.range(h * 0.08, maxH)
      const top = baseY - bh
      ctx.fillStyle = color
      ctx.fillRect(x, top, bw, bh)
      if (rand.chance(0.25)) {
        ctx.fillRect(x + bw * 0.35, top - h * 0.02, bw * 0.3, h * 0.02)
      }
      if (windows) {
        const cols = Math.max(1, Math.floor(bw / 9))
        const rows = Math.max(1, Math.floor(bh / 12))
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            if (rand.chance(0.22)) {
              ctx.fillStyle = rand.chance(0.6) ? 'rgba(232,214,160,0.55)' : 'rgba(140,180,255,0.35)'
              ctx.fillRect(x + 3 + c * 9, top + 5 + r * 12, 2, 3)
            }
          }
        }
        ctx.fillStyle = color
      }
      x += bw + rand.range(2, 10)
    }
  }

  ctx.globalAlpha = 0.7
  drawLayer(h * 0.78, h * 0.32, '#16294a', false)
  ctx.globalAlpha = 1
  drawLayer(h * 0.9, h * 0.46, '#0a1730', true)

  // Water reflection
  const water = ctx.createLinearGradient(0, h * 0.9, 0, h)
  water.addColorStop(0, 'rgba(10,23,48,0.9)')
  water.addColorStop(1, 'rgba(4,10,24,1)')
  ctx.fillStyle = water
  ctx.fillRect(0, h * 0.9, w, h * 0.1)
  ctx.strokeStyle = 'rgba(232,214,160,0.12)'
  for (let i = 0; i < 8; i++) {
    const y = h * (0.915 + i * 0.01)
    ctx.beginPath()
    ctx.moveTo(w * 0.15 + Math.sin(t * 0.001 + i) * 12, y)
    ctx.lineTo(w * 0.72 + Math.cos(t * 0.0008 + i) * 20, y)
    ctx.stroke()
  }
}

function paintOrbits(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: ReturnType<typeof createRandom>,
  t: number,
  p: Palette,
) {
  paintBackground(ctx, w, h, p)
  blob(ctx, w * 0.5, h * 0.5, Math.min(w, h) * 0.42, 'hsla(42 70% 55% / 0.18)')
  const cx = w / 2
  const cy = h / 2

  for (let i = 0; i < 7; i++) {
    const rx = w * (0.1 + i * 0.065)
    const ry = h * (0.16 + i * 0.05)
    const rotation = rand.range(-0.6, 0.6) + t * 0.00003 * (i % 2 === 0 ? 1 : -1)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.strokeStyle = `hsla(42 62% 68% / ${0.24 - i * 0.02})`
    ctx.lineWidth = 0.9
    ctx.beginPath()
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
    ctx.stroke()
    const angle = t * 0.0003 + i * 0.9
    const px = Math.cos(angle) * rx
    const py = Math.sin(angle) * ry
    ctx.fillStyle = 'rgba(232,214,160,0.95)'
    ctx.beginPath()
    ctx.arc(px, py, 2.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  ctx.fillStyle = 'rgba(232,214,160,0.9)'
  ctx.beginPath()
  ctx.arc(cx, cy, Math.min(w, h) * 0.035, 0, Math.PI * 2)
  ctx.fill()
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35)
  core.addColorStop(0, 'rgba(31,79,216,0.35)')
  core.addColorStop(1, 'transparent')
  ctx.fillStyle = core
  ctx.fillRect(0, 0, w, h)
}

interface GenerativeArtProps {
  seed?: string
  style?: ArtStyle | 'auto'
  className?: string
  animate?: boolean
  cycleMs?: number
  interactive?: boolean
  label?: string
}

/**
 * Procedural, zero-network artwork. Seeded by page/service name plus a per-session
 * salt, so each surface is visually consistent within a visit but new on reload.
 */
export default function GenerativeArt({
  seed = 'rns-global',
  style = 'auto',
  className,
  animate = true,
  cycleMs = 16_000,
  interactive = true,
  label = 'Generative brand artwork',
}: GenerativeArtProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [generation, setGeneration] = useState(0)
  const [fading, setFading] = useState(false)
  const reduced = usePrefersReducedMotion()

  const salt = useMemo(() => getSessionSalt(), [])
  const resolvedStyle: ArtStyle = style === 'auto' ? pickArtStyle(`${seed}:${salt}`) : style
  const fullSeed = `${seed}:${salt}:${generation}`

  useEffect(() => {
    if (!animate || reduced) return
    const id = window.setInterval(() => {
      setFading(true)
      window.setTimeout(() => {
        setGeneration((g) => g + 1)
        setFading(false)
      }, 800)
    }, Math.max(12_000, cycleMs))
    return () => window.clearInterval(id)
  }, [animate, reduced, cycleMs])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let last = 0
    const pointer = { x: 0, y: 0 }
    const pointerTarget = { x: 0, y: 0 }

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    const draw = (now: number) => {
      const localRand = createRandom(fullSeed)
      const localPalette = buildPalette(localRand)
      ctx.clearRect(0, 0, width, height)
      switch (resolvedStyle) {
        case 'mesh':
          paintMesh(ctx, width, height, localRand, now, localPalette)
          break
        case 'particles':
          paintParticles(ctx, width, height, localRand, now, localPalette)
          break
        case 'contours':
          paintContours(ctx, width, height, localRand, now, localPalette)
          break
        case 'crystals':
          paintCrystals(ctx, width, height, localRand, now, localPalette)
          break
        case 'waves':
          paintWaves(ctx, width, height, localRand, now, localPalette)
          break
        case 'aurora':
          paintAurora(ctx, width, height, localRand, now, localPalette)
          break
        case 'skyline':
          paintSkyline(ctx, width, height, localRand, now, localPalette)
          break
        case 'orbits':
          paintOrbits(ctx, width, height, localRand, now, localPalette)
          break
      }
      if (resolvedStyle !== 'skyline' && resolvedStyle !== 'aurora' && resolvedStyle !== 'mesh') {
        const vignette = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.25,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.8,
        )
        vignette.addColorStop(0, 'transparent')
        vignette.addColorStop(1, 'rgba(4,10,24,0.55)')
        ctx.fillStyle = vignette
        ctx.fillRect(0, 0, width, height)
      }
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (now - last < 33) return // cap at ~30fps to stay light
      last = now
      pointer.x += (pointerTarget.x - pointer.x) * 0.06
      pointer.y += (pointerTarget.y - pointer.y) * 0.06
      ctx.save()
      ctx.translate(pointer.x * 6, pointer.y * 4)
      draw(now)
      ctx.restore()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return
      const rect = wrapper.getBoundingClientRect()
      pointerTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointerTarget.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
      },
      { rootMargin: '120px' },
    )
    observer.observe(wrapper)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrapper)
    resize()

    if (animate && !reduced) {
      frame = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    } else {
      draw(0)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [fullSeed, resolvedStyle, animate, reduced, interactive])

  return (
    <div ref={wrapperRef} className={cn('relative overflow-hidden', className)} aria-hidden={!label}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          fading ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  )
}
