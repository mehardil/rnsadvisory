import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Search } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import NewsletterForm from '@/components/NewsletterForm'
import { articleCategories, articles, getAuthor } from '@/data/articles'
import { formatDate } from '@/utils/format'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'
import { cn } from '@/utils/cn'
import { artStyleForArticle } from '@/utils/art'

export default function Insights() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const sorted = useMemo(() => [...articles].sort((a, b) => b.date.localeCompare(a.date)), [])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter(
      (article) =>
        (category === 'All' || article.category === category) &&
        (!q || `${article.title} ${article.excerpt} ${article.tags.join(' ')}`.toLowerCase().includes(q)),
    )
  }, [sorted, category, query])

  const featured = sorted[0]
  const showFeatured = category === 'All' && !query
  const list = showFeatured ? filtered.filter((a) => a.slug !== featured.slug) : filtered

  return (
    <>
      <Seo
        title="Insights — visas, study, business and markets"
        description="Practical briefings from the RNS Global team on UAE visas, studying in Estonia, company setup, UK student visas, Jebel Ali exports, corporate tax and more."
        path="/insights"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Insights"
        title={
          <>
            What changed. <em className="italic text-softgold">What to do next.</em>
          </>
        }
        description="Practical briefings written by the people handling the files — not content marketers. No fluff, no listicles, no invented urgency."
        crumbs={[{ name: 'Insights' }]}
        seed="insights-hero"
        style="mesh"
      />

      <section className="bg-page py-12 md:py-16">
        <div className="container-x">
          {showFeatured && featured && (
            <Reveal>
              <Link
                to={`/insights/${featured.slug}`}
                className="group card card-hover grid overflow-hidden lg:grid-cols-12"
              >
                <div className="relative min-h-[240px] lg:col-span-6">
                  <ArtFrame
                    seed={`article-${featured.slug}`}
                    imageKey={`article-${featured.slug}`}
                    style={artStyleForArticle(featured.category)}
                    alt={featured.title}
                    animate={false}
                    rounded="rounded-none"
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-navy/70 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-softgold backdrop-blur">
                    Latest · {featured.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-9 lg:col-span-6">
                  <div className="flex items-center gap-2 text-[0.68rem] text-faint">
                    <span>{formatDate(featured.date)}</span>
                    <span className="h-2.5 w-px bg-[color:var(--hair-strong)]" />
                    <span className="inline-flex items-center gap-1"><Clock size={10} /> {featured.readingTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-ink group-hover:text-gold-ink md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[color:var(--hair)] pt-4">
                    <span className="text-[0.72rem] text-muted">{getAuthor(featured.author).name}</span>
                    <span className="inline-flex items-center gap-1.5 text-[0.74rem] font-semibold text-gold-ink">
                      Read the briefing <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {articleCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn('chip', category === item && 'chip-active')}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search insights…"
                aria-label="Search insights"
                className="input !pl-9 !text-[0.82rem]"
              />
            </div>
          </div>

          {list.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted">No articles matched. Try a different category or search term.</p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((article, index) => {
                const author = getAuthor(article.author)
                return (
                  <Reveal key={article.slug} delay={Math.min(index * 0.03, 0.2)}>
                    <Link to={`/insights/${article.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <ArtFrame
                          seed={`article-${article.slug}`}
                          imageKey={`article-${article.slug}`}
                          style={artStyleForArticle(article.category)}
                          alt={article.title}
                          animate={false}
                          rounded="rounded-none"
                          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-softgold backdrop-blur">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2 text-[0.64rem] text-faint">
                          <span>{formatDate(article.date)}</span>
                          <span className="h-2.5 w-px bg-[color:var(--hair-strong)]" />
                          <span className="inline-flex items-center gap-1"><Clock size={9} /> {article.readingTime}</span>
                        </div>
                        <h3 className="mt-2 font-display text-[1.12rem] leading-snug text-ink group-hover:text-gold-ink">
                          {article.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[0.76rem] leading-relaxed text-muted">{article.excerpt}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="rounded-full border border-[color:var(--hair)] px-2 py-0.5 text-[0.6rem] text-faint">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-[color:var(--hair)] pt-3">
                          <span className="text-[0.66rem] text-muted">{author.name}</span>
                          <ArrowUpRight size={13} className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          )}

          <Reveal className="mt-14 rounded-2xl border border-gold/25 bg-navy p-6 text-ivory md:p-9">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <p className="eyebrow !text-softgold">The monthly briefing</p>
                <h3 className="mt-2 font-display text-2xl text-ivory md:text-3xl">One email a month. Only what matters.</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ivory/55">
                  Visa rule changes, study destinations and market entry — in plain English. Unsubscribe in one click.
                </p>
              </div>
              <div className="md:col-span-5">
                <NewsletterForm tone="dark" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
