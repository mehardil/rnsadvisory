import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  action?: { label: string; to: string }
  tone?: 'light' | 'dark'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  tone = 'light',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  const Tag = as
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <span className={cn('eyebrow mb-4', tone === 'dark' && '!text-softgold')}>{eyebrow}</span>}
        <Tag className={cn('h2', tone === 'dark' && '!text-ivory')}>{title}</Tag>
        {description && (
          <p className={cn('lede mt-5', tone === 'dark' && '!text-ivory/65')}>{description}</p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={0.12}>
          <Link
            to={action.to}
            className={cn('link-underline shrink-0 text-sm', tone === 'dark' && '!text-softgold')}
          >
            {action.label} <ArrowRight size={15} />
          </Link>
        </Reveal>
      )}
    </div>
  )
}
