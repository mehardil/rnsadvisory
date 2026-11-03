import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Home, MessageCircle, Search } from 'lucide-react'
import Seo from '@/components/Seo'
import ArtFrame from '@/components/ArtFrame'
import { serviceCategories } from '@/data/services'
import { whatsappLink } from '@/utils/links'

export default function NotFound() {
  const popular = serviceCategories.slice(0, 6)
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you are looking for does not exist. Explore services, insights or contact an advisor."
        path="/404"
        noIndex
      />
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-ivory">
        <ArtFrame
          seed="not-found"
          imageKey="not-found"
          style="skyline"
          alt=""
          animate={false}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-full opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" aria-hidden="true" />
        <div className="container-x relative py-28">
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.24em] text-softgold">Error 404</p>
          <h1 className="mt-4 font-display text-[clamp(4rem,12vw,9rem)] font-medium leading-none tracking-[-0.05em] text-ivory">
            4<span className="italic text-softgold">0</span>4
          </h1>
          <h2 className="mt-4 max-w-xl font-display text-2xl leading-tight text-ivory md:text-3xl">
            This page took a different route.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/55">
            The link may be old, mistyped or moved. Everything else is still here — start with the services catalogue or
            ask an advisor directly.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/" className="btn btn-gold">
              <Home size={15} /> Back home
            </Link>
            <Link to="/services" className="btn btn-light-outline">
              <Compass size={15} /> Explore services
            </Link>
            <a href={whatsappLink('Hello RNS Global, I hit a broken link on your site.')} target="_blank" rel="noopener noreferrer" className="btn btn-light-outline">
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>

          <div className="mt-12 border-t border-ivory/10 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/30">Popular destinations</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popular.map((category) => (
                <Link
                  key={category.id}
                  to={`/services/${category.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ivory/15 px-3 py-1.5 text-[0.72rem] text-ivory/60 transition-colors hover:border-gold hover:text-softgold"
                >
                  {category.title}
                  <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
              <Link to="/search" className="inline-flex items-center gap-1.5 rounded-full border border-ivory/15 px-3 py-1.5 text-[0.72rem] text-ivory/60 hover:border-gold hover:text-softgold">
                <Search size={11} /> Search the site
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
