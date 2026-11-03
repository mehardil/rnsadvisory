import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import siteConfig from '@/config/siteConfig'

interface LogoProps {
  className?: string
  tone?: 'light' | 'dark'
  compact?: boolean
  linked?: boolean
}

export default function Logo({ className, tone = 'light', compact = false, linked = true }: LogoProps) {
  const ink = tone === 'light' ? '#F7F5EF' : 'var(--ink)'
  const mark = (
    <span className={cn('group inline-flex items-center gap-3', className)} style={{ color: ink }}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-[-6deg]"
        aria-hidden="true"
      >
        <rect x="0.5" y="0.5" width="47" height="47" rx="11" fill="none" stroke="#C9A24B" strokeOpacity="0.55" />
        <path
          d="M13 34V14h9.2c5 0 8 2.4 8 6.5 0 3-1.7 5.2-4.5 6.1L33 34h-5.9l-4.4-8.5h-2.6V34H13zm6.9-13h3.4c2.1 0 3.3-1 3.3-2.7 0-1.8-1.2-2.6-3.3-2.6h-3.4v5.3z"
          fill="currentColor"
        />
        <path
          d="M35 13l1.5 4.1 4.1 1.5-4.1 1.5L35 24.2l-1.5-4.1-4.1-1.5 4.1-1.5L35 13z"
          fill="#C9A24B"
          className="transition-opacity duration-500 group-hover:opacity-60"
        />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.18rem] font-medium tracking-[-0.02em]">
            {siteConfig.brand.name}
          </span>
          <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-gold">
            Global Advisory
          </span>
        </span>
      )}
    </span>
  )

  if (!linked) return mark
  return (
    <Link to="/" aria-label={`${siteConfig.brand.name} — home`} className="inline-flex">
      {mark}
    </Link>
  )
}
