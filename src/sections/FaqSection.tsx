import { Link } from 'react-router-dom'
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '@/config/siteConfig'
import { homeFaqs } from '@/data/faqs'
import Accordion from '@/components/Accordion'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import ArtFrame from '@/components/ArtFrame'
import { whatsappLink, phoneLink } from '@/utils/links'

export default function FaqSection() {
  return (
    <section id="faq" className="anchor-offset bg-page py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Questions, answered"
            title={
              <>
                Ask us the <em>awkward</em> questions.
              </>
            }
            description="If your question is not here, ask a person. We answer honestly, including when the answer is no."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
              <div className="relative h-32">
                <ArtFrame
                  seed="faq-help"
                  imageKey="faq-help"
                  alt=""
                  animate={false}
                  rounded="rounded-none"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="p-6">
              <p className="font-display text-lg text-ink">Still deciding?</p>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">
                A 30-minute scoping call costs nothing and usually saves weeks. Students and entrepreneurs get the first
                session free.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link to={siteConfig.links.book} className="btn btn-gold btn-sm w-full">
                  <CalendarCheck size={14} /> Book a free consultation
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href={phoneLink()} className="btn btn-outline btn-sm">
                    <Phone size={13} /> Call
                  </a>
                  <a
                    href={whatsappLink('Hello RNS Global, I have a question.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </div>
              <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                {siteConfig.contact.responsePromise}
              </p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <Accordion items={homeFaqs} />
          </Reveal>
          <p className="mt-6 text-[0.72rem] text-muted">
            More questions? See the <Link to="/contact#faq" className="font-semibold text-gold-ink underline underline-offset-2">contact page</Link> or{' '}
            <Link to="/insights" className="font-semibold text-gold-ink underline underline-offset-2">read our insights</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
