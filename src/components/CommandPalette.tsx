import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Building2, Clock, Compass, FileText, MapPin, Search, X, type LucideIcon } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { searchItems } from '@/utils/search'
import { useScrollLock } from '@/hooks/useInteractions'
import { cn } from '@/utils/cn'

const typeIcon: Record<string, LucideIcon> = {
  Service: Briefcase,
  Industry: Building2,
  Article: FileText,
  Location: MapPin,
  Tool: Compass,
  Page: ArrowUpRight,
}

const suggestions = ['Golden Visa', 'Dubai company', 'Study in Estonia', 'Corporate tax', 'Jebel Ali warehousing', 'IELTS']

export default function CommandPalette() {
  const open = useUIStore((s) => s.paletteOpen)
  const setOpen = useUIStore((s) => s.setPaletteOpen)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const results = useMemo(() => searchItems(query, 12), [query])

  useScrollLock(open)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(!useUIStore.getState().paletteOpen)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      window.setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const go = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => Math.min(results.length - 1, i + 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    }
    if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active].path)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-start justify-center bg-navy/70 p-4 pt-[10vh] backdrop-blur-sm md:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search RNS Global"
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-ivory/15 bg-[color:var(--surface)] shadow-lift"
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[color:var(--hair)] px-4 py-3.5">
              <Search size={18} className="text-gold" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search services, articles, offices…"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
                aria-label="Search"
                autoComplete="off"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-muted hover:text-ink" aria-label="Close search">
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {!query && (
                <div className="p-3">
                  <p className="mono-label mb-3">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button key={s} type="button" onClick={() => setQuery(s)} className="chip">
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-[0.7rem] text-faint">
                    <Clock size={12} /> Search 71 services, 14 industries and 9 briefings.
                  </p>
                </div>
              )}

              {query && results.length === 0 && (
                <p className="p-6 text-center text-sm text-muted">
                  Nothing matched. Try “visa”, “Dubai company” or “study in Estonia”.
                </p>
              )}

              {results.map((item, index) => {
                const Icon = typeIcon[item.type] || Search
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(item.path)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      index === active ? 'bg-[color:var(--surface-2)]' : 'hover:bg-[color:var(--surface-2)]',
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[color:var(--hair)] text-gold-ink">
                      <Icon size={14} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{item.title}</span>
                      <span className="block truncate text-[0.7rem] text-muted">{item.subtitle}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-faint">{item.type}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between border-t border-[color:var(--hair)] px-4 py-2.5 text-[0.65rem] text-faint">
              <span>Type to search · ↑↓ navigate · Enter open</span>
              <span className="hidden items-center gap-1 sm:flex">
                <kbd className="rounded border border-[color:var(--hair-strong)] px-1.5 py-0.5 font-mono text-[9px]">Esc</kbd>
                to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
