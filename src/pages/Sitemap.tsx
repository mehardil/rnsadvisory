import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import { serviceCategories } from '@/data/services'
import { industries } from '@/data/industries'
import { articles } from '@/data/articles'
import { tools } from '@/data/tools'
import { legalPages } from '@/data/legal'
import siteConfig from '@/config/siteConfig'
import { breadcrumbJsonLd } from '@/utils/seo'

export default function Sitemap() {
  return (
    <>
      <Seo
        title="Sitemap"
        description="Every page, service, industry, insight, tool and legal document on the RNS Global website."
        path="/sitemap"
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Sitemap', path: '/sitemap' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Sitemap"
        title="Everything, in one place"
        description="A complete index of the site. Useful for navigation, accessibility and search engines."
        crumbs={[{ name: 'Sitemap' }]}
        seed="sitemap"
        style="orbits"
        compact
      />

      <section className="bg-page py-14 md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-xl text-ink">Main pages</h2>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.8rem] text-muted hover:text-gold-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              {[
                ['Case studies', '/case-studies'],
                ['Client portal', '/portal'],
                ['Search', '/search'],
                ['Sitemap', '/sitemap'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-[0.8rem] text-muted hover:text-gold-ink">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Industries</h2>
            <ul className="mt-3 space-y-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link to={`/industries/${industry.slug}`} className="text-[0.8rem] text-muted hover:text-gold-ink">
                    {industry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Tools & insights</h2>
            <ul className="mt-3 space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link to={`/tools/${tool.slug}`} className="text-[0.8rem] text-muted hover:text-gold-ink">
                    {tool.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/insights" className="text-[0.8rem] font-semibold text-gold-ink">All insights</Link>
              </li>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link to={`/insights/${article.slug}`} className="text-[0.8rem] text-muted hover:text-gold-ink">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="font-display text-xl text-ink">Services</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCategories.map((category) => (
                <div key={category.id}>
                  <Link to={`/services/${category.slug}`} className="text-[0.82rem] font-semibold text-ink hover:text-gold-ink">
                    {category.title}
                  </Link>
                  <ul className="mt-2 space-y-1.5">
                    {category.services.map((service) => (
                      <li key={service.slug}>
                        <Link to={`/services/${category.slug}/${service.slug}`} className="text-[0.74rem] leading-snug text-muted hover:text-gold-ink">
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Legal</h2>
            <ul className="mt-3 space-y-2">
              {Object.entries(legalPages).map(([key, page]) => (
                <li key={key}>
                  <Link to={`/legal/${key}`} className="text-[0.8rem] text-muted hover:text-gold-ink">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Contact</h2>
            <ul className="mt-3 space-y-2 text-[0.8rem] text-muted">
              <li><a href={siteConfig.contact.phoneHref} className="hover:text-gold-ink">{siteConfig.contact.phoneDisplay}</a></li>
              <li><a href={siteConfig.contact.emailHref} className="hover:text-gold-ink">{siteConfig.contact.email}</a></li>
              <li>{siteConfig.brand.streetAddress}, {siteConfig.brand.city}</li>
              <li>{siteConfig.contact.hours}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
