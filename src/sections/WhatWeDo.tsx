import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { serviceCategories, featuredServices } from '@/data/services'
import SectionHeading from '@/components/SectionHeading'
import ServiceOrbit from '@/components/ServiceOrbit'
import ServiceCard from '@/components/ServiceCard'
import Reveal from '@/components/Reveal'
import { cn } from '@/utils/cn'

export default function WhatWeDo() {
  const [active, setActive] = useState('all')

  const services = useMemo(() => {
    if (active === 'all') return featuredServices.slice(0, 6)
    const category = serviceCategories.find((c) => c.slug === active)
    return category ? category.services.slice(0, 6) : []
  }, [active])

  return (
    <section id="what-we-do" className="relative bg-page py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              One firm. Every advisory <em>you need.</em>
            </>
          }
          description="Twelve practices connected by one client charter. Start with a single need and we will coordinate the rest — visas, entities, finance, legal, people and technology."
          action={{ label: 'All 71 services', to: '/services' }}
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-ivory/10 bg-navy">
          <div className="relative grid items-center gap-4 px-5 py-8 md:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow !text-softgold">Service orbit</span>
              <h3 className="mt-3 font-display text-3xl leading-tight text-ivory md:text-4xl">
                Twelve practices.
                <br />
                <em className="italic text-softgold">One core team.</em>
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/55">
                Hover to pause the orbit, then open any practice. Behind every node is a specialist team and a named
                engagement lead who owns the handoffs.
              </p>
              <Link
                to="/services"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 text-xs font-semibold text-ivory/75 transition-colors hover:border-gold hover:text-softgold"
              >
                <LayoutGrid size={14} /> Browse the full catalogue
              </Link>
              <div className="mt-7 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-5">
                <div>
                  <p className="font-mono text-xl text-softgold">68</p>
                  <p className="text-[0.66rem] text-ivory/40">Services</p>
                </div>
                <div>
                  <p className="font-mono text-xl text-softgold">12</p>
                  <p className="text-[0.66rem] text-ivory/40">Practices</p>
                </div>
                <div>
                  <p className="font-mono text-xl text-softgold">8</p>
                  <p className="text-[0.66rem] text-ivory/40">Regions</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ServiceOrbit />
            </div>
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActive('all')}
              className={cn('chip', active === 'all' && 'chip-active')}
            >
              Featured
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(category.slug)}
                className={cn('chip', active === category.slug && 'chip-active')}
              >
                {category.title}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <ServiceCard
                key={`${service.categorySlug}-${service.slug}`}
                service={service}
                categorySlug={service.categorySlug}
                animate={false}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <Link to="/services" className="link-underline text-sm">
            Explore all services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
