import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '@/config/siteConfig'
import ArtFrame from '@/components/ArtFrame'
import Reveal from '@/components/Reveal'
import { whatsappLink, phoneLink } from '@/utils/links'

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-ivory md:py-28">
      <ArtFrame
        seed="home-final-cta"
        imageKey="home-final-cta"
        style="skyline"
        alt=""
        animate={false}
        rounded="rounded-none"
        className="absolute inset-0 h-full w-full opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/30" aria-hidden="true" />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <span className="eyebrow !text-softgold mb-4">Ready when you are</span>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ivory">
            Ready to start?
            <br />
            <em className="italic text-softgold">Talk to an advisor today.</em>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/60 md:text-base">
            One conversation is usually enough to know whether we can help. Tell us where you are, what you are trying
            to achieve and what is getting in the way. We will tell you honestly what we would do next.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={siteConfig.links.book} className="btn btn-gold">
              <CalendarCheck size={16} /> Book a free consultation
            </Link>
            <a href={phoneLink()} className="btn btn-light-outline">
              <Phone size={15} /> {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={whatsappLink('Hello RNS Global, I would like to speak to an advisor.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light-outline"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="rounded-2xl border border-ivory/15 bg-navy/85 p-6 backdrop-blur-md">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-softgold">What happens next</p>
            <ol className="mt-4 space-y-4">
              {[
                ['Reply within 4 hours', 'A named advisor reviews your note and suggests a time.'],
                ['A 30-minute scoping call', 'We ask questions, you ask yours. No obligation.'],
                ['A written plan and quote', 'Scope, timeline and fixed price before any work begins.'],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 font-mono text-[9px] text-softgold">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-[0.85rem] font-semibold text-ivory">{title}</span>
                    <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-ivory/60">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a
              href={siteConfig.contact.emailHref}
              className="mt-5 inline-flex items-center gap-1.5 border-t border-ivory/10 pt-4 text-[0.72rem] text-ivory/65 hover:text-softgold"
            >
              {siteConfig.contact.email} <ArrowRight size={12} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
