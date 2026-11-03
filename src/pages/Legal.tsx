import { Link, useParams } from 'react-router-dom'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import NotFound from './NotFound'
import { getLegalPage, legalPages } from '@/data/legal'
import { breadcrumbJsonLd } from '@/utils/seo'

export default function Legal() {
  const { slug = '' } = useParams()
  const page = getLegalPage(slug)

  if (!page) return <NotFound />

  return (
    <>
      <Seo
        title={page.title}
        description={page.summary}
        path={`/legal/${slug}`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: page.title, path: `/legal/${slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`Legal · updated ${page.updated}`}
        title={page.title}
        description={page.summary}
        crumbs={[{ name: page.title }]}
        seed={`legal-${slug}`}
        style="contours"
        compact
      />

      <section className="bg-page py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="mono-label mb-3">Legal documents</p>
              <nav className="space-y-1">
                {Object.entries(legalPages).map(([key, item]) => (
                  <Link
                    key={key}
                    to={`/legal/${key}`}
                    className={`block rounded-lg px-3 py-2 text-[0.78rem] transition-colors ${
                      key === slug ? 'bg-[color:var(--surface-2)] font-semibold text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-5 rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-4 text-[0.7rem] leading-relaxed text-muted">
                This page is a concise, plain-English template. Have it reviewed by qualified counsel in each operating
                jurisdiction before launch.
              </div>
            </div>
          </aside>

          <article className="lg:col-span-9">
            <div className="prose-rns max-w-3xl">
              <p className="mono-label">Last updated: {page.updated}</p>
              {page.sections.map((section) => (
                <section key={section.heading}>
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
          </article>
        </div>
      </section>
    </>
  )
}
