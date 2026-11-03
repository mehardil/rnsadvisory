import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface Crumb {
  name: string
  path?: string
}

export default function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={cn(
          'flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]',
          tone === 'dark' ? 'text-ivory/55' : 'text-muted',
        )}
      >
        <li>
          <Link
            to="/"
            className={cn('inline-flex items-center gap-1.5 transition-colors', tone === 'dark' ? 'hover:text-softgold' : 'hover:text-ink')}
          >
            <Home size={11} /> Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="inline-flex items-center gap-2">
            <ChevronRight size={11} className="opacity-50" aria-hidden="true" />
            {item.path ? (
              <Link
                to={item.path}
                className={cn('transition-colors', tone === 'dark' ? 'hover:text-softgold' : 'hover:text-ink')}
              >
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className={tone === 'dark' ? 'text-softgold' : 'text-ink'}>
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
