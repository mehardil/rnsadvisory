import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '@/config/siteConfig'
import { whatsappLink, phoneLink, consultationLink } from '@/utils/links'
import GenerativeArt from './GenerativeArt'
import { ButtonAnchor } from './Button'
import Reveal from './Reveal'

export default function CTASection({
  title = 'Ready to start? Talk to an advisor today.',
  text = 'One conversation is usually enough to know whether we can help. No pressure, no obligation — just a clear view of your options.',
  seed = 'final-cta',
}: {
  title?: string
  text?: string
  seed?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-ivory">
      <GenerativeArt
        seed={seed}
        style="aurora"
        animate={false}
        className="absolute inset-0 h-full w-full opacity-60"
        label=""
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" aria-hidden="true" />
      <div className="container-x relative grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20">
        <Reveal className="md:col-span-7">
          <span className="eyebrow !text-softgold mb-4">Start a conversation</span>
          <h2 className="h2 max-w-xl text-ivory">{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/60 md:text-base">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:justify-self-end">
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
            <ButtonAnchor
              href={consultationLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
            >
              <CalendarCheck size={16} /> Book a Consultant Now
            </ButtonAnchor>
            <div className="flex gap-3">
              <ButtonAnchor href={phoneLink()} variant="light" className="flex-1">
                <Phone size={15} /> Call
              </ButtonAnchor>
              <ButtonAnchor
                href={whatsappLink('Hello RNS Global Partners, I would like to speak to an advisor.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                className="flex-1"
              >
                <MessageCircle size={15} /> WhatsApp
              </ButtonAnchor>
            </div>
            <p className="mt-1 text-[0.7rem] text-ivory/40">{siteConfig.contact.hours} · {siteConfig.contact.phoneDisplay}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
