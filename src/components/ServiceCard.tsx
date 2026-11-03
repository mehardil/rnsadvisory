import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { getIcon } from '@/utils/icons'
import { artStyleForCategory } from '@/utils/art'
import ArtFrame from './ArtFrame'
import IsoBadge, { toneFor } from './IsoBadge'
import TiltCard from './TiltCard'

interface ServiceCardProps {
  service: {
    slug: string
    title: string
    summary: string
    path?: string
    priceFrom?: number
    icon?: string
    categoryTitle?: string
    categorySlug?: string
  }
  categorySlug?: string
  className?: string
  compact?: boolean
  animate?: boolean
}

export default function ServiceCard({ service, categorySlug, className, compact = false, animate = false }: ServiceCardProps) {
  const Icon = getIcon(service.icon)
  const serviceCategory = categorySlug || service.categorySlug || 'rns'
  const to = service.path || (categorySlug ? `/services/${categorySlug}/${service.slug}` : '/services')

  return (
    <TiltCard className={cn('h-full', className)}>
      <Link
        to={to}
        className="card card-hover group relative flex h-full flex-col overflow-hidden"
        aria-label={`${service.title} — view service`}
      >
        <div className={cn('relative shrink-0 bg-navy', compact ? 'aspect-[2/1]' : 'aspect-[16/10]')}>
          <div className="absolute inset-0 overflow-hidden">
            <ArtFrame
              seed={`service-${serviceCategory}-${service.slug}`}
              imageKey={`service-${serviceCategory}-${service.slug}`}
              style={artStyleForCategory(serviceCategory)}
              alt={service.title}
              animate={animate}
              rounded="rounded-none"
              scrim="soft"
              fit="contain"
              imageClassName="group-hover:scale-[1.04]"
              className="h-full w-full"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-ivory/25 to-transparent opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-navy/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-softgold ring-1 ring-ivory/10 backdrop-blur">
              <Icon size={12} aria-hidden="true" />
              {service.categoryTitle || 'Advisory'}
            </span>
            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-navy/60 text-ivory ring-1 ring-ivory/20 backdrop-blur transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:ring-gold">
              <ArrowUpRight size={15} />
            </span>
          </div>
          <span className={cn('absolute left-5 z-10', compact ? '-bottom-4' : '-bottom-5')}>
            <IsoBadge icon={service.icon} tone={toneFor(serviceCategory)} size="sm" />
          </span>
        </div>
        <div className={cn('flex flex-1 flex-col p-5 md:p-6', compact ? 'pt-7' : 'pt-8 md:pt-9')}>
          <h3 className="font-display text-[1.18rem] leading-snug text-ink transition-colors group-hover:text-gold-ink">
            {service.title}
          </h3>
          {!compact && <p className="mt-2 line-clamp-3 text-[0.84rem] leading-relaxed text-muted">{service.summary}</p>}
          <div className="mt-auto flex items-center justify-between border-t border-[color:var(--hair)] pt-4 text-[0.72rem]">
            <span className="mono-label">From</span>
            <span className="font-mono text-[0.8rem] font-medium text-ink">
              ${service.priceFrom?.toLocaleString('en-US') || '—'}
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
