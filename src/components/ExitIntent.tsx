import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, CheckCircle2, Loader2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { submitForm } from '@/utils/api'
import { readSession, writeSession } from '@/utils/storage'
import { whatsappLink } from '@/utils/links'
import { Button, ButtonAnchor } from './Button'
import ArtFrame from './ArtFrame'

/** Exit-intent plus a gentle 30-second prompt. Shown at most once per session. */
export default function ExitIntent() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const pushToast = useUIStore((s) => s.pushToast)

  useEffect(() => {
    if (readSession('rns-lead-prompt-seen', false)) return
    const markSeen = () => writeSession('rns-lead-prompt-seen', true)

    const onLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setOpen(true)
        markSeen()
      }
    }

    const timer = window.setTimeout(() => {
      setOpen(true)
      markSeen()
    }, 30_000)

    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mouseleave', onLeave)
      window.clearTimeout(timer)
    }
  }, [])

  const close = () => setOpen(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email || !email.includes('@')) return
    setSending(true)
    try {
      await submitForm({ formName: 'Soft lead capture', payload: { email } })
      setSent(true)
      pushToast({ title: 'We will be in touch', description: 'An advisor will email you within four business hours.', type: 'success' })
    } catch (error) {
      pushToast({ title: 'Could not send', description: (error as Error).message, type: 'error' })
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[125] flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Free consultation"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-ivory/15 bg-[color:var(--surface)] shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-navy/40 text-ivory/70 backdrop-blur hover:text-ivory"
            >
              <X size={16} />
            </button>
            <div className="grid md:grid-cols-2">
              <ArtFrame
                seed="exit-intent-consultation"
                imageKey="contact-hero"
                alt="Consultation at RNS Global"
                animate
                rounded="rounded-none"
                className="hidden min-h-[320px] md:block"
              />
              <div className="p-7 md:p-9">
                {sent ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 size={36} className="mx-auto text-success" />
                    <h3 className="mt-4 font-display text-2xl text-ink">Thank you</h3>
                    <p className="mt-2 text-sm text-muted">We will email you within four business hours.</p>
                    <Button variant="gold" className="mt-6" onClick={close}>
                      Continue exploring
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="eyebrow mb-3">Before you go</p>
                    <h3 className="font-display text-3xl leading-tight text-ink">
                      A free first consultation, <em className="italic text-gold-ink">no obligation.</em>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      Students and entrepreneurs get a genuine 30-minute scoping session with a specialist. Leave your
                      email and we will find a time.
                    </p>
                    <form onSubmit={submit} className="mt-5 flex gap-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        aria-label="Email address"
                        className="input"
                      />
                      <Button type="submit" variant="gold" disabled={sending} aria-label="Request consultation">
                        {sending ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={16} />}
                      </Button>
                    </form>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <ButtonAnchor
                        href={whatsappLink('Hello RNS Global, I would like a free first consultation.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                      >
                        WhatsApp instead
                      </ButtonAnchor>
                      <Link
                        to="/contact"
                        onClick={close}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-ink"
                      >
                        <CalendarCheck size={13} /> Book a time
                      </Link>
                    </div>
                    <p className="mt-4 text-[0.65rem] leading-relaxed text-faint">
                      We use your email only to arrange this consultation. No lists, no resale.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
