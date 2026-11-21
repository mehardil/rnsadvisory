import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface AccordionItem {
  q: string
  a: string
}

export default function Accordion({
  items,
  className,
  defaultOpen = 0,
  tone = 'light',
}: {
  items: AccordionItem[]
  className?: string
  defaultOpen?: number | null
  tone?: 'light' | 'dark'
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className={cn('divide-y', tone === 'dark' ? 'divide-ivory/15' : 'divide-[color:var(--hair)]', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                className={cn(
                  'flex w-full items-start justify-between gap-6 py-6 text-left transition-colors',
                  tone === 'dark' ? 'text-ivory hover:text-softgold' : 'text-ink hover:text-gold-ink',
                )}
              >
                <span className="font-display text-[1.12rem] leading-snug md:text-[1.22rem]">{item.q}</span>
                <span
                  className={cn(
                    'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors',
                    tone === 'dark' ? 'border-ivory/25' : 'border-[color:var(--hair-strong)]',
                    isOpen && 'border-gold text-gold',
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              aria-hidden={!isOpen}
              className={cn('accordion-panel', isOpen && 'is-open')}
            >
              <div className="min-h-0 overflow-hidden">
                <p className={cn('max-w-3xl pb-7 pr-10 text-[0.94rem] leading-relaxed', tone === 'dark' ? 'text-ivory/65' : 'text-muted')}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
