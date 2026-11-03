import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import ArtFrame from './ArtFrame'
import type { ArtStyle } from './GenerativeArt'
import Breadcrumbs, { type Crumb } from './Breadcrumbs'
import Reveal from './Reveal'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  crumbs?: Crumb[]
  seed: string
  style?: ArtStyle
  media?: ReactNode
  imageKey?: string
  children?: ReactNode
  meta?: ReactNode
  className?: string
  compact?: boolean
}

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  seed,
  style = 'contours',
  media,
  imageKey,
  children,
  meta,
  className,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-navy text-ivory', className)}>
      <ArtFrame
        seed={seed}
        imageKey={imageKey || seed}
        style={style}
        alt=""
        animate={false}
        priority
        rounded="rounded-none"
        className="absolute inset-0 h-full w-full opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/35" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />
      <div
        className={cn(
          'container-x relative grid items-center gap-12 pb-16 pt-32 md:pt-40 lg:grid-cols-12',
          compact ? 'md:pb-12' : 'md:pb-24',
        )}
      >
        <div className={cn(media ? 'lg:col-span-7' : 'lg:col-span-9')}>
          {crumbs && <Breadcrumbs items={crumbs} tone="dark" />}
          <Reveal>
            <span className="eyebrow !text-softgold mb-5">{eyebrow}</span>
            <h1 className="h1 max-w-3xl text-ivory">{title}</h1>
            {description && <p className="lede mt-6 max-w-2xl !text-ivory/70">{description}</p>}
            {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
            {meta && <div className="mt-8">{meta}</div>}
          </Reveal>
        </div>
        {media && <div className="lg:col-span-5">{media}</div>}
      </div>
    </section>
  )
}
