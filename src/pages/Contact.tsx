import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import MultiStepContactForm from '@/components/MultiStepContactForm'
import BookingCalendar from '@/components/BookingCalendar'
import Accordion from '@/components/Accordion'
import Reveal from '@/components/Reveal'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import ArtFrame from '@/components/ArtFrame'
import { Button } from '@/components/Button'
import siteConfig from '@/config/siteConfig'
import { locations } from '@/data/locations'
import { contactFaqs } from '@/data/faqs'
import { useOfficeStatus } from '@/hooks/useOfficeStatus'
import { submitForm } from '@/utils/api'
import { useUIStore } from '@/store/useUIStore'
import { mailLink, phoneLink, whatsappLink } from '@/utils/links'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

function BookingSection() {
  const pushToast = useUIStore((s) => s.pushToast)
  const [booking, setBooking] = useState<{ date?: string; slot?: string }>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('General consultation')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!booking.slot) {
      pushToast({ title: 'Choose a time', description: 'Select a date and time slot before confirming.', type: 'info' })
      return
    }
    if (!name.trim() || !email.includes('@')) {
      pushToast({ title: 'Missing details', description: 'Add your name and a valid email so we can confirm.', type: 'error' })
      return
    }
    setSending(true)
    try {
      await submitForm({
        formName: 'Booking request',
        payload: { name, email, phone, service, ...booking },
      })
      setSent(true)
      pushToast({ title: 'Booking requested', description: 'We will confirm by email or WhatsApp within four business hours.', type: 'success' })
    } catch (error) {
      pushToast({ title: 'Could not send', description: (error as Error).message, type: 'error' })
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="card rounded-2xl p-8 text-center md:p-12">
        <CheckCircle2 size={40} className="mx-auto text-success" />
        <h3 className="mt-4 font-display text-3xl text-ink">Consultation requested</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          You have requested <strong className="text-ink">{booking.date}</strong> at{' '}
          <strong className="text-ink">{booking.slot} GST</strong>. A named advisor will confirm by email or WhatsApp
          within four business hours.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink('Hello RNS Global, I have just requested a consultation.')} target="_blank" rel="noopener noreferrer" className="btn btn-navy">
            <MessageCircle size={15} /> WhatsApp
          </a>
          <button type="button" onClick={() => setSent(false)} className="btn btn-outline">
            Book another slot
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <BookingCalendar value={booking} onChange={setBooking} />
      </div>
      <form onSubmit={submit} className="card rounded-2xl p-6 lg:col-span-5" noValidate>
        <p className="eyebrow">Confirm your slot</p>
        <h3 className="mt-2 font-display text-2xl text-ink">A 30-minute conversation</h3>
        <p className="mt-1.5 text-[0.76rem] leading-relaxed text-muted">
          Free for students and entrepreneurs. For corporate matters, a small scoping fee is credited against the engagement.
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="book-name" className="field-label">Full name</label>
            <input id="book-name" value={name} onChange={(event) => setName(event.target.value)} className="input" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="book-email" className="field-label">Email</label>
            <input id="book-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="book-phone" className="field-label">Phone / WhatsApp</label>
            <input id="book-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="input" autoComplete="tel" placeholder="+92 331 905 1913" />
          </div>
          <div>
            <label htmlFor="book-service" className="field-label">Topic</label>
            <select id="book-service" value={service} onChange={(event) => setService(event.target.value)} className="input">
              {['General consultation', 'Study abroad', 'Visa & immigration', 'Business setup', 'Finance & tax', 'Legal', 'Trade & logistics', 'Technology', 'Careers'].map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>
        <Button type="submit" variant="gold" className="mt-4 w-full" disabled={sending}>
          {sending ? <Loader2 size={15} className="animate-spin" /> : <CalendarCheck size={15} />}
          {sending ? 'Sending…' : 'Request this slot'}
        </Button>
        <p className="mt-2 text-center text-[0.64rem] text-faint">
          {booking.slot ? `${booking.date} · ${booking.slot} GST` : 'Choose a date and time on the left'}
        </p>
      </form>
    </div>
  )
}

function OfficeStatusRow({ office }: { office: (typeof locations)[number] }) {
  const status = useOfficeStatus(office.hours, office.timezone)
  return (
    <Link
      to={`/locations#${office.id}`}
      className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--hair)] px-3 py-2.5 transition-colors hover:border-gold/50"
    >
      <span className="flex items-center gap-2 text-[0.76rem] text-ink">
        <span aria-hidden="true">{office.flag}</span> {office.city}
        {office.isHQ && <span className="font-mono text-[7px] uppercase tracking-wider text-gold-ink">HQ</span>}
      </span>
      <span className="text-right">
        <span className="block font-mono text-[0.7rem] text-ink">{status.localTime}</span>
        <span className={`block font-mono text-[7px] uppercase tracking-wider ${status.isOpen ? 'text-success' : 'text-faint'}`}>
          {status.isOpen ? 'Open' : 'Closed'}
        </span>
      </span>
    </Link>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact RNS Global"
        description="Call, WhatsApp or email RNS Global. Book a free consultation with an advisor and get a response within four business hours."
        path="/contact"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start with a <em className="italic text-softgold">conversation.</em>
          </>
        }
        description="Tell us what you are trying to achieve. A named advisor will respond within four business hours — including when the honest answer is that we are not the right fit."
        crumbs={[{ name: 'Contact' }]}
        seed="contact-hero"
        style="aurora"
        media={
          <div className="glass-dark hidden rounded-2xl p-6 lg:block">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-softgold">Response promise</p>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-mono text-4xl text-ivory">&lt;4</span>
              <span className="mb-1.5 text-[0.72rem] text-ivory/45">business hours</span>
            </div>
            <div className="mt-4 space-y-2 border-t border-ivory/10 pt-4 text-[0.72rem] text-ivory/55">
              <p className="flex items-center gap-2"><ShieldCheck size={12} className="text-success" /> Confidential by default</p>
              <p className="flex items-center gap-2"><Clock size={12} className="text-gold" /> Mon–Sat · 09:00–19:00 GST</p>
              <p className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> Dubai HQ · 9 offices</p>
            </div>
          </div>
        }
      />

      <section className="bg-page py-12 md:py-16">
        <div className="container-x">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, label: 'Call us', value: siteConfig.contact.phoneDisplay, href: phoneLink(), note: 'Mon–Sat, 09:00–19:00 GST' },
              { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.contact.phoneDisplay, href: whatsappLink(), note: 'Fastest for urgent matters' },
              { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: mailLink('Enquiry'), note: 'Reply within 4 business hours' },
              { icon: Clock, label: 'Working hours', value: 'Mon–Sat · 09:00–19:00', href: '/locations', note: 'Nine offices, eight regions' },
            ].map((item) => {
              const inner = (
                <>
                  <IsoBadge icon={item.icon} tone={toneFor(item.label)} size="sm" />
                  <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-faint">{item.label}</p>
                  <p className="mt-1 break-all text-[0.8rem] font-semibold text-ink">{item.value}</p>
                  <p className="mt-1 text-[0.64rem] text-muted">{item.note}</p>
                </>
              )
              return item.href.startsWith('http') || item.href.startsWith('tel') || item.href.startsWith('mailto') ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card card-hover p-5">
                  {inner}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className="card card-hover p-5">
                  {inner}
                </Link>
              )
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <MultiStepContactForm />
            </div>
            <div className="lg:col-span-5">
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="card rounded-2xl p-5">
                  <p className="mono-label">What happens next</p>
                  <ol className="mt-3 space-y-3">
                    {[
                      ['We read your note', 'A named advisor reviews it — not a shared inbox.'],
                      ['We reply within 4 hours', 'By your preferred channel, with a suggested time if useful.'],
                      ['A 30-minute scoping call', 'We ask questions and tell you honestly what is possible.'],
                      ['A written plan and quote', 'Scope, timeline and fixed price before any work begins.'],
                    ].map(([title, text], index) => (
                      <li key={title} className="flex gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 font-mono text-[8px] text-gold-ink">
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-[0.78rem] font-semibold text-ink">{title}</span>
                          <span className="block text-[0.7rem] leading-relaxed text-muted">{text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="card rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="mono-label">Office status</p>
                    <Link to="/locations" className="text-[0.68rem] font-semibold text-gold-ink">All offices</Link>
                  </div>
                  <div className="mt-3 grid gap-1.5">
                    {locations.slice(0, 6).map((office) => (
                      <OfficeStatusRow key={office.id} office={office} />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gold/25 bg-navy p-5 text-ivory">
                  <p className="font-display text-lg text-ivory">Urgent matter?</p>
                  <p className="mt-1 text-[0.74rem] leading-relaxed text-ivory/55">
                    Expiring visa, customs hold or a banking deadline. Call or WhatsApp and say it is urgent — we triage
                    same-day where capacity allows.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a href={phoneLink()} className="btn btn-gold btn-sm"><Phone size={12} /> Call</a>
                    <a href={whatsappLink('Urgent: I need help with a time-sensitive matter.')} target="_blank" rel="noopener noreferrer" className="btn btn-light-outline btn-sm"><MessageCircle size={12} /> WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-28 border-y border-[color:var(--hair)] bg-[color:var(--surface)] py-14 md:py-20">
        <div className="container-x">
          <Reveal className="relative mb-8 overflow-hidden rounded-2xl">
            <ArtFrame
              seed="contact-booking"
              imageKey="contact-booking"
              alt=""
              animate={false}
              rounded="rounded-2xl"
              className="aspect-[21/9] w-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent px-5 pb-4 pt-14">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-softgold">A 30-minute conversation</p>
              <p className="mt-1 font-display text-xl text-ivory">Bring the decision. We will bring the route.</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Booking</span>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">Pick a time that suits you</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Times shown in Gulf Standard Time (UTC+4). We will confirm the slot and send a calendar invite.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hair)] px-3 py-1.5 text-[0.68rem] text-muted">
              <ShieldCheck size={13} className="text-success" /> No obligation
            </span>
          </div>
          <div className="mt-7">
            <BookingSection />
          </div>
        </div>
      </section>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Head office</span>
            <h2 className="mt-2 font-display text-3xl text-ink">DIFC, Dubai</h2>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">
              Meetings are by appointment so the right specialist can join. If you are visiting from abroad, tell us your
              dates and we will coordinate around them.
            </p>
            <div className="mt-4 space-y-2 text-[0.8rem] text-muted">
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-gold-ink" /> Level 21, Emirates Financial Towers, DIFC, Dubai</p>
              <p className="flex items-center gap-2"><Phone size={14} className="shrink-0 text-gold-ink" /> <a href={phoneLink()} className="hover:text-gold-ink">{siteConfig.contact.phoneDisplay}</a></p>
              <p className="flex items-center gap-2"><Mail size={14} className="shrink-0 text-gold-ink" /> <a href={mailLink()} className="break-all hover:text-gold-ink">{siteConfig.contact.email}</a></p>
            </div>
            <a href="https://www.google.com/maps?q=DIFC+Dubai" target="_blank" rel="noopener noreferrer" className="link-underline mt-5 inline-flex text-xs">
              Get directions <ArrowRight size={12} />
            </a>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[color:var(--hair)]">
              <iframe
                title="Map of RNS Global head office in DIFC, Dubai"
                src="https://www.google.com/maps?q=DIFC%2C%20Dubai%2C%20UAE&output=embed"
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[color:var(--hair)] bg-[color:var(--surface)] py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Before you write</span>
            <h2 className="mt-2 font-display text-3xl text-ink">Common questions</h2>
            <p className="mt-3 text-[0.84rem] leading-relaxed text-muted">
              If your question is not answered here, ask it directly. We reply to every enquiry.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={contactFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
