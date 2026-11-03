import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { whatsappLink } from '@/utils/links'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  links?: { label: string; to?: string; href?: string }[]
}

const quickReplies = [
  { key: 'study', label: 'Study abroad' },
  { key: 'business', label: 'Business setup' },
  { key: 'visa', label: 'Visa help' },
  { key: 'advisor', label: 'Talk to an advisor' },
]

const scripted: Record<string, { text: string; links?: Message['links'] }> = {
  study: {
    text: 'For study abroad, we cover the UK, Europe, Estonia, the USA, UAE, India, Saudi Arabia and Pakistan — admissions, scholarships, visas and arrival. A good starting point is a free 30-minute counselling session.',
    links: [
      { label: 'Study abroad counselling', to: '/services/education/study-abroad-counselling' },
      { label: 'Study budget calculator', to: '/tools/study-budget' },
    ],
  },
  business: {
    text: 'For business setup, the right structure depends on your activity, ownership and banking needs. We handle UAE free zone and mainland, Saudi Arabia, the UK, Estonia and US entities.',
    links: [
      { label: 'Company setup services', to: '/services/business-setup' },
      { label: 'Cost estimator', to: '/tools/company-cost' },
    ],
  },
  visa: {
    text: 'We handle Golden Visa, work and family residency, investor routes, document attestation and relocation. Tell me which country you are moving to and I will point you to the right checklist.',
    links: [
      { label: 'Golden Visa details', to: '/services/immigration/golden-visa' },
      { label: 'Document checklist tool', to: '/tools/document-checklist' },
    ],
  },
  advisor: {
    text: 'Happy to connect you. A named advisor replies within four business hours. You can also message us on WhatsApp for an immediate response.',
    links: [{ label: 'Book a consultation', to: '/contact' }],
  },
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Hello. I can point you to the right service or connect you with an advisor. What are you working on?',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const push = (message: Omit<Message, 'id'>) => {
    setMessages((current) => [...current, { ...message, id: Date.now() }])
  }

  const respond = (key: string) => {
    const reply = scripted[key] || {
      text: 'Thanks — I have noted that. For a specific answer about your case, the fastest route is a short conversation with an advisor. I can also share the relevant service page.',
      links: [{ label: 'Talk to an advisor', to: '/contact' }],
    }
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      push({ from: 'bot', text: reply.text, links: reply.links })
    }, 650)
  }

  const onQuick = (key: string, label: string) => {
    push({ from: 'user', text: label })
    respond(key)
  }

  const onSend = (event: React.FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return
    const text = input.trim()
    push({ from: 'user', text })
    setInput('')
    const lower = text.toLowerCase()
    const key = lower.includes('stud') ? 'study' : lower.includes('visa') ? 'visa' : lower.includes('business') || lower.includes('company') ? 'business' : 'advisor'
    respond(key)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 right-4 z-[110] flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] shadow-lift md:bottom-24 md:right-6"
            role="dialog"
            aria-label="RNS Assistant"
          >
            <div className="flex items-center gap-3 border-b border-[color:var(--hair)] bg-navy px-4 py-3.5 text-ivory">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-softgold">
                <Sparkles size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">RNS Assistant</p>
                <p className="text-[0.66rem] text-ivory/50">Scripted guidance · human handover</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="text-ivory/60 hover:text-ivory">
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={cn('flex', message.from === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.8rem] leading-relaxed',
                      message.from === 'user'
                        ? 'rounded-br-sm bg-royal text-white'
                        : 'rounded-bl-sm bg-[color:var(--surface-2)] text-ink',
                    )}
                  >
                    {message.text}
                    {message.links && (
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        {message.links.map((link) =>
                          link.to ? (
                            <Link
                              key={link.label}
                              to={link.to}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-gold-ink underline underline-offset-2"
                            >
                              {link.label} <ArrowUpRight size={11} />
                            </Link>
                          ) : (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[0.72rem] font-semibold text-gold-ink underline underline-offset-2">
                              {link.label}
                            </a>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-1.5 rounded-2xl bg-[color:var(--surface-2)] px-3 py-3 w-fit">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[color:var(--hair)] p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.key}
                    type="button"
                    onClick={() => onQuick(reply.key, reply.label)}
                    className="chip !py-1 !text-[0.68rem]"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
              <form onSubmit={onSend} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about visas, study, business…"
                  aria-label="Message the assistant"
                  className="input !py-2 !text-[0.8rem]"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[0.62rem] text-faint">
                <span>General guidance only.</span>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold-ink">
                  <MessageCircle size={11} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        aria-expanded={open}
        className="fixed bottom-20 right-4 z-[109] flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy text-softgold shadow-lift transition-transform hover:scale-105 md:bottom-6 md:right-6 md:h-14 md:w-14"
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[color:var(--bg)] bg-success" />}
      </button>
    </>
  )
}
