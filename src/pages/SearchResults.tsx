import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import { searchItems } from '@/utils/search'
import { cn } from '@/utils/cn'

const typeColors: Record<string, string> = {
  Service: 'bg-royal/10 text-royal',
  Industry: 'bg-gold/12 text-gold-ink',
  Article: 'bg-success/10 text-success',
  Location: 'bg-[color:var(--surface-2)] text-muted',
  Tool: 'bg-gold/12 text-gold-ink',
  Page: 'bg-[color:var(--surface-2)] text-muted',
}

const suggestions = ['Golden Visa', 'Study in Estonia', 'Dubai free zone', 'Corporate tax', 'Jebel Ali', 'IELTS']

export default function SearchResults() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initial = params.get('q') || ''
  const [query, setQuery] = useState(initial)
  const activeQuery = params.get('q') || ''
  const results = useMemo(() => searchItems(activeQuery, 40), [activeQuery])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <Seo
        title={activeQuery ? `Search: ${activeQuery}` : 'Search'}
        description="Search RNS Global services, industries, insights, offices and tools."
        path="/search"
        noIndex
      />
      <PageHero
        eyebrow="Search"
        title="What are you looking for?"
        description="Search across 71 services, 14 industries, nine offices, nine briefings and six free tools."
        crumbs={[{ name: 'Search' }]}
        seed="search-hero"
        style="particles"
        compact
      />

      <section className="bg-page py-12 md:py-16">
        <div className="container-x max-w-4xl">
          <form onSubmit={submit} className="flex gap-2" role="search">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services, articles, offices…"
                aria-label="Search"
                className="input !py-3 !pl-10"
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-gold">Search</button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setQuery(suggestion)
                  navigate(`/search?q=${encodeURIComponent(suggestion)}`)
                }}
                className={cn('chip', activeQuery === suggestion && 'chip-active')}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {activeQuery && (
            <p className="mt-8 text-[0.78rem] text-muted">
              {results.length} result{results.length === 1 ? '' : 's'} for <strong className="text-ink">“{activeQuery}”</strong>
            </p>
          )}

          {activeQuery && results.length === 0 && (
            <div className="mt-8 rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-8 text-center">
              <p className="font-display text-xl text-ink">Nothing matched that search.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Try a broader term, or browse the full catalogue. If you cannot find what you need, an advisor will point
                you in the right direction.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Link to="/services" className="btn btn-gold btn-sm">All services</Link>
                <Link to="/contact" className="btn btn-outline btn-sm">Ask an advisor</Link>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul className="mt-6 divide-y divide-[color:var(--hair)] overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
              {results.map((item) => (
                <li key={item.id}>
                  <Link to={item.path} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[color:var(--surface-2)]">
                    <span className={cn('shrink-0 rounded-full px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider', typeColors[item.type] || typeColors.Page)}>
                      {item.type}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.86rem] font-semibold text-ink group-hover:text-gold-ink">{item.title}</span>
                      <span className="mt-0.5 block truncate text-[0.72rem] text-muted">{item.subtitle}</span>
                    </span>
                    <ArrowRight size={14} className="shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-gold-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!activeQuery && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link to="/services" className="card card-hover p-5">
                <p className="mono-label">Browse</p>
                <p className="mt-1 font-display text-lg text-ink">All 71 services</p>
                <p className="mt-1 text-[0.74rem] text-muted">Twelve practices, one catalogue.</p>
              </Link>
              <Link to="/insights" className="card card-hover p-5">
                <p className="mono-label">Read</p>
                <p className="mt-1 font-display text-lg text-ink">Latest insights</p>
                <p className="mt-1 text-[0.74rem] text-muted">Practical briefings on visas, study and markets.</p>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
