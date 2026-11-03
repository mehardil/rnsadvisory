import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { getIcon } from '@/utils/icons'
import { cn } from '@/utils/cn'

export const isoTones = ['gold', 'royal', 'emerald'] as const
export type IsoTone = (typeof isoTones)[number] | 'ivory'

/** Stable tone selection so a service keeps the same colour everywhere. */
export function toneFor(seed: string): IsoTone {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return isoTones[hash % isoTones.length]
}

const palettes: Record<IsoTone, Record<string, string>> = {
  gold: {
    '--iso-hi': '#f8ecc9',
    '--iso-mid': '#d9b665',
    '--iso-lo': '#8b6a25',
    '--iso-face': '#fdf7e8',
    '--iso-face-lo': '#e2c98c',
    '--iso-ink': '#5a4212',
    '--iso-glow': 'rgba(201, 162, 75, 0.55)',
  },
  royal: {
    '--iso-hi': '#dbe7ff',
    '--iso-mid': '#3f6fe2',
    '--iso-lo': '#12306b',
    '--iso-face': '#f2f7ff',
    '--iso-face-lo': '#bcd2fb',
    '--iso-ink': '#12306b',
    '--iso-glow': 'rgba(31, 79, 216, 0.45)',
  },
  emerald: {
    '--iso-hi': '#d8f5e8',
    '--iso-mid': '#2aa773',
    '--iso-lo': '#12724b',
    '--iso-face': '#f0fbf6',
    '--iso-face-lo': '#b7e6d0',
    '--iso-ink': '#0f5a3b',
    '--iso-glow': 'rgba(30, 158, 106, 0.42)',
  },
  ivory: {
    '--iso-hi': '#ffffff',
    '--iso-mid': '#e8d6a0',
    '--iso-lo': '#b79a5a',
    '--iso-face': '#fffdf6',
    '--iso-face-lo': '#eadfbe',
    '--iso-ink': '#5c4a1e',
    '--iso-glow': 'rgba(232, 214, 160, 0.5)',
  },
}

interface IsoBadgeProps {
  icon?: string | LucideIcon
  label?: string
  tone?: IsoTone
  size?: 'sm' | 'md' | 'lg'
  className?: string
  float?: boolean
  orbit?: boolean
}

/**
 * Decorative 3D isometric badge: a raised metal-and-glass pedestal with a
 * floating medallion. Pure CSS 3D, so it costs no WebGL context and stays
 * crisp at every size. The surrounding card's `group` class animates it.
 */
export default function IsoBadge({
  icon,
  label,
  tone = 'gold',
  size = 'md',
  className,
  float = false,
  orbit = true,
}: IsoBadgeProps) {
  const Icon = typeof icon === 'string' || !icon ? getIcon(icon) : icon

  return (
    <span
      className={cn('iso-scene', float && 'iso-float', className)}
      data-size={size}
      style={palettes[tone] as CSSProperties}
      aria-hidden="true"
    >
      <span className="iso-shadow" />
      <span className="iso-pedestal" />
      {orbit && <span className="iso-orbit" />}
      <span className="iso-coin">
        <span className="iso-coin-rim" />
        <span className="iso-coin-face">
          {label ? (
            <span className="iso-label">{label}</span>
          ) : (
            <Icon className="iso-icon" strokeWidth={1.6} />
          )}
        </span>
        <span className="iso-coin-gloss" />
      </span>
      <span className="iso-spark iso-spark-a" />
      <span className="iso-spark iso-spark-b" />
    </span>
  )
}
