import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import { articles, getAuthor } from '@/data/articles'
import { formatDate } from '@/utils/format'
import { artStyleForArticle } from '@/utils/art'
import SectionHeading from '@/components/SectionHeading'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'

export default function InsightsSection() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  return (
    <section className="border-y border-[color:var(--hair)] bg-[color:var(--bg-2)] py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Insights"
          title={
            <>
              Practical briefings, <em>not think-pieces.</em>
            </>
          }
          description="What changed, who it affects and what to do next — written by the people doing the work."
          action={{ label: 'All insights', to: '/insights' }}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latest.map((article, index) => {
            const author = getAuthor(article.author)
            return (
              <Reveal key={article.slug} delay={index * 0.07}>
                <Link to={`/insights/${article.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
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
                    <div className="flex items-center gap-2 text-[0.66rem] text-faint">
                      <span>{formatDate(article.date)}</span>
                      <span className="h-2.5 w-px bg-[color:var(--hair-strong)]" />
                      <span className="inline-flex items-center gap-1"><Clock size={10} /> {article.readingTime}</span>
                    </div>
                    <h3 className="mt-2 font-display text-[1.15rem] leading-snug text-ink group-hover:text-gold-ink">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.78rem] leading-relaxed text-muted">{article.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-[color:var(--hair)] pt-4">
                      <span className="text-[0.68rem] text-muted">{author.name}</span>
                      <ArrowUpRight size={14} className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
