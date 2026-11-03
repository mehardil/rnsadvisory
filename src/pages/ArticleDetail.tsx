import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Clock, Copy, Facebook, Linkedin, Mail, MessageCircle, Printer } from 'lucide-react'
import Seo from '@/components/Seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import NewsletterForm from '@/components/NewsletterForm'
import NotFound from './NotFound'
import { getArticle, getAuthor, relatedArticles } from '@/data/articles'
import { formatDate } from '@/utils/format'
import { useUIStore } from '@/store/useUIStore'
import { breadcrumbJsonLd, articleJsonLd, organizationJsonLd } from '@/utils/seo'
import siteConfig from '@/config/siteConfig'
import { artStyleForArticle } from '@/utils/art'

export default function ArticleDetail() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  const pushToast = useUIStore((s) => s.pushToast)

  if (!article) return <NotFound />

  const author = getAuthor(article.author)
  const related = relatedArticles(article.slug)
  const shareUrl = `${siteConfig.brand.website}/insights/${article.slug}`
  const shareTitle = encodeURIComponent(article.title)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      pushToast({ title: 'Link copied', description: 'Ready to paste wherever you need it.', type: 'success' })
    } catch {
      pushToast({ title: 'Could not copy', description: 'Your browser blocked clipboard access.', type: 'error' })
    }
  }

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        type="article"
        jsonLd={[
          organizationJsonLd(),
          articleJsonLd({ ...article, author, slug: article.slug, category: article.category }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
        ]}
      />

      <section className="relative isolate overflow-hidden bg-navy pb-12 pt-32 text-ivory md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(201,162,75,0.18),transparent_55%)]" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs tone="dark" items={[{ name: 'Insights', path: '/insights' }, { name: article.category }]} />
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">
                {article.category}
              </span>
              <span className="text-[0.7rem] text-ivory/40">{formatDate(article.date)}</span>
              <span className="h-3 w-px bg-ivory/20" />
              <span className="inline-flex items-center gap-1 text-[0.7rem] text-ivory/40">
                <Clock size={11} /> {article.readingTime}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.1rem,4.4vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-ivory/60 md:text-[1.05rem]">{article.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-[11px] text-softgold">
                {author.initials}
              </span>
              <div>
                <p className="text-[0.82rem] font-semibold text-ivory">{author.name}</p>
                <p className="text-[0.68rem] text-ivory/40">{author.role}</p>
              </div>
              <div className="ms-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy link"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/15 text-ivory/55 hover:border-gold hover:text-softgold"
                >
                  <Copy size={13} />
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/15 text-ivory/55 hover:border-gold hover:text-softgold"
                >
                  <Linkedin size={13} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/15 text-ivory/55 hover:border-gold hover:text-softgold"
                >
                  <Facebook size={13} />
                </a>
                <a
                  href={`https://wa.me/?text=${shareTitle}%20${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/15 text-ivory/55 hover:border-gold hover:text-softgold"
                >
                  <MessageCircle size={13} />
                </a>
                <a
                  href={`mailto:?subject=${shareTitle}&body=${encodeURIComponent(shareUrl)}`}
                  aria-label="Share by email"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/15 text-ivory/55 hover:border-gold hover:text-softgold"
                >
                  <Mail size={13} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-x -mt-2 md:-mt-6">
        <Reveal>
          <ArtFrame
            seed={`article-${article.slug}`}
            imageKey={`article-${article.slug}`}
            style={artStyleForArticle(article.category)}
            alt={article.title}
            animate
            priority
            className="aspect-[21/9] w-full"
          />
        </Reveal>
      </div>

      <section className="bg-page py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="space-y-5 lg:sticky lg:top-28">
              <nav aria-label="Table of contents" className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                <p className="mono-label">On this page</p>
                <ul className="mt-3 space-y-2">
                  {article.sections.map((section: { id: string; heading: string }, index: number) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-start gap-2 text-[0.74rem] leading-snug text-muted transition-colors hover:text-gold-ink"
                      >
                        <span className="font-mono text-[9px] text-gold">{String(index + 1).padStart(2, '0')}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                <p className="mono-label">About the author</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-[10px] text-gold-ink">
                    {author.initials}
                  </span>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-ink">{author.name}</p>
                    <p className="text-[0.66rem] text-muted">{author.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-[0.74rem] leading-relaxed text-muted">{author.bio}</p>
                <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-gold-ink">
                  Ask a question <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] p-5">
                <p className="font-display text-lg text-ink">Need this applied to your case?</p>
                <p className="mt-1.5 text-[0.74rem] leading-relaxed text-muted">
                  General guidance is not advice. A 30-minute call will tell you what applies to you.
                </p>
                <Link to="/contact#book" className="btn btn-gold btn-sm mt-3 w-full">
                  Book a consultation
                </Link>
              </div>

              <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm w-full justify-start">
                <Printer size={13} /> Print this article
              </button>
            </div>
          </aside>

          <article className="order-1 lg:order-2 lg:col-span-9">
            <Reveal className="mb-8 rounded-2xl border border-gold/20 bg-gold/[0.04] p-5 md:p-6">
              <p className="mono-label">Key takeaways</p>
              <ul className="mt-3 space-y-2">
                {article.takeaways.map((takeaway: string) => (
                  <li key={takeaway} className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="prose-rns max-w-3xl">
              {article.sections.map((section: { id: string; heading: string; paragraphs: string[]; bullets?: string[] }) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[color:var(--hair)] pt-6">
              <span className="mono-label">Tags</span>
              {article.tags.map((tag: string) => (
                <span key={tag} className="rounded-full border border-[color:var(--hair)] px-2.5 py-1 text-[0.68rem] text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5 md:p-6">
              <div className="flex flex-wrap items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-xs text-gold-ink">
                  {author.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg text-ink">{author.name}</p>
                  <p className="text-[0.7rem] text-gold-ink">{author.role}</p>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{author.bio}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <Link to="/insights" className="link-underline text-xs">
                <ArrowLeft size={13} /> All insights
              </Link>
              <div className="flex items-center gap-2">
                <span className="mono-label">Share</span>
                <button type="button" onClick={copyLink} className="chip !py-1.5"><Copy size={11} /> Copy link</button>
                <a href={`https://wa.me/?text=${shareTitle}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="chip !py-1.5">
                  <MessageCircle size={11} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-gold/25 bg-navy p-6 text-ivory">
              <p className="eyebrow !text-softgold">Stay current</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">Get the monthly briefing</h3>
              <p className="mt-1.5 text-sm text-ivory/55">Plain-English updates. No noise, no resale.</p>
              <div className="mt-4 max-w-md">
                <NewsletterForm tone="dark" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-[color:var(--hair)] bg-[color:var(--surface)] py-14">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Related</span>
              <h2 className="mt-2 font-display text-2xl text-ink">Keep reading</h2>
            </div>
            <Link to="/insights" className="link-underline hidden text-xs sm:inline-flex">
              All insights <ArrowLeft size={12} className="rotate-180" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/insights/${item.slug}`} className="group card card-hover overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <ArtFrame
                    seed={`article-${item.slug}`}
                    imageKey={`article-${item.slug}`}
                    style={artStyleForArticle(item.category)}
                    alt={item.title}
                    animate={false}
                    rounded="rounded-none"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-navy/70 px-2 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.14em] text-softgold backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-[1rem] leading-snug text-ink group-hover:text-gold-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[0.68rem] text-faint">{item.readingTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
