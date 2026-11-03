import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Lock,
  LogOut,
  MessageCircle,
  Send,
  Upload,
  User,
} from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/Button'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/utils/cn'

const stages = [
  { label: 'Consultation', status: 'done' },
  { label: 'Documents', status: 'done' },
  { label: 'Submitted', status: 'current' },
  { label: 'Decision', status: 'upcoming' },
]

const initialDocuments = [
  { name: 'Passport copy.pdf', status: 'Approved', date: '12 Oct 2026', size: '1.2 MB' },
  { name: 'Emirates ID.pdf', status: 'Approved', date: '12 Oct 2026', size: '640 KB' },
  { name: 'Bank statements Q3.pdf', status: 'Under review', date: '24 Oct 2026', size: '2.8 MB' },
  { name: 'Employment letter.pdf', status: 'Action needed', date: '—', size: '—' },
]

const initialMessages = [
  { from: 'advisor', name: 'Amara Siddiqui', text: 'Your bank statements have been reviewed. We need one clarification on the source of the October deposit.', time: 'Yesterday, 16:42' },
  { from: 'client', name: 'You', text: 'Thank you — it was a transfer from my UK savings account. I can send the statement today.', time: 'Yesterday, 17:05' },
  { from: 'advisor', name: 'Amara Siddiqui', text: 'Perfect. Please upload the UK statement and we will submit the same week.', time: 'Today, 09:12' },
]

export default function Portal() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [documents, setDocuments] = useState(initialDocuments)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const pushToast = useUIStore((s) => s.pushToast)

  const login = (event: React.FormEvent) => {
    event.preventDefault()
    setLoggedIn(true)
    pushToast({ title: 'Signed in to the demo', description: 'This is a front-end mock with sample data.', type: 'info' })
  }

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setDocuments((current) => [
      { name: file.name, status: 'Uploaded', date: 'Just now', size: `${Math.max(1, Math.round(file.size / 1024))} KB` },
      ...current,
    ])
    pushToast({ title: 'File added', description: 'Demo only — files are not uploaded to a server here.', type: 'success' })
  }

  const send = (event: React.FormEvent) => {
    event.preventDefault()
    if (!draft.trim()) return
    setMessages((current) => [
      ...current,
      { from: 'client', name: 'You', text: draft.trim(), time: 'Just now' },
    ])
    setDraft('')
  }

  return (
    <>
      <Seo
        title="Client portal (demo)"
        description="Track your application, upload documents, message your advisor and view appointments."
        path="/portal"
        noIndex
      />
      <PageHero
        eyebrow="Client portal · demo"
        title={
          <>
            Your file, <em className="italic text-softgold">in one place.</em>
          </>
        }
        description="A preview of the client portal: application status, documents, messages and appointments. This is a front-end mock with sample data — no live account is created."
        crumbs={[{ name: 'Client portal' }]}
        seed="portal-hero"
        style="orbits"
        compact
      />

      <section className="bg-page py-12 md:py-16">
        <div className="container-x">
          {!loggedIn ? (
            <div className="mx-auto max-w-md">
              <div className="card rounded-2xl p-7 md:p-8">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-softgold">
                    <Lock size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Sign in</p>
                    <p className="text-[0.66rem] text-muted">Client portal · demo environment</p>
                  </div>
                </div>
                <form onSubmit={login} className="mt-5 space-y-3">
                  <div>
                    <label htmlFor="portal-email" className="field-label">Email</label>
                    <input id="portal-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input" placeholder="you@example.com" autoComplete="username" />
                  </div>
                  <div>
                    <label htmlFor="portal-password" className="field-label">Password</label>
                    <input id="portal-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input" placeholder="Any password works in the demo" autoComplete="current-password" />
                  </div>
                  <Button type="submit" variant="gold" className="w-full">
                    <User size={15} /> Sign in
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setLoggedIn(true)
                      pushToast({ title: 'Demo dashboard loaded', description: 'Sample application and documents are shown.', type: 'info' })
                    }}
                  >
                    Use the demo account
                  </Button>
                </form>
                <p className="mt-4 rounded-lg border border-gold/25 bg-gold/[0.05] p-3 text-[0.68rem] leading-relaxed text-muted">
                  Demo only. Do not enter a real password. Production would use SSO and multi-factor authentication.
                </p>
                <p className="mt-4 text-center text-[0.7rem] text-muted">
                  Need help? <Link to="/contact" className="font-semibold text-gold-ink underline underline-offset-2">Contact your advisor</Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <Reveal className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-5">
                <div>
                  <p className="mono-label">Client dashboard · demo</p>
                  <h1 className="mt-1 font-display text-2xl text-ink">Welcome back, Aisha</h1>
                  <p className="mt-0.5 text-[0.72rem] text-muted">Reference RNS-20418 · Application: UAE Golden Visa (family)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-[color:var(--hair)] px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider text-muted">Advisor: Amara S.</span>
                  <button type="button" onClick={() => setLoggedIn(false)} className="btn btn-outline btn-sm">
                    <LogOut size={13} /> Sign out
                  </button>
                </div>
              </Reveal>

              <div className="grid gap-5 lg:grid-cols-12">
                <Reveal className="lg:col-span-8">
                  <div className="card rounded-2xl p-5 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="mono-label">Application status</p>
                        <p className="mt-1 font-display text-xl text-ink">UAE Golden Visa</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/12 px-3 py-1 font-mono text-[8px] uppercase tracking-wider text-gold-ink">
                        <Clock size={11} /> In progress
                      </span>
                    </div>

                    <ol className="mt-6 grid grid-cols-4 gap-2">
                      {stages.map((stage, index) => (
                        <li key={stage.label} className="relative">
                          <div className="flex items-center">
                            <span
                              className={cn(
                                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[9px]',
                                stage.status === 'done'
                                  ? 'border-success bg-success text-white'
                                  : stage.status === 'current'
                                    ? 'border-gold bg-gold text-navy'
                                    : 'border-[color:var(--hair-strong)] text-faint',
                              )}
                            >
                              {stage.status === 'done' ? <CheckCircle2 size={13} /> : index + 1}
                            </span>
                            {index < stages.length - 1 && (
                              <span className={cn('h-px flex-1', stage.status === 'done' ? 'bg-success' : 'bg-[color:var(--hair)]')} />
                            )}
                          </div>
                          <p className={cn('mt-2 text-[0.66rem]', stage.status === 'upcoming' ? 'text-faint' : 'text-ink')}>{stage.label}</p>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-6 grid gap-3 border-t border-[color:var(--hair)] pt-4 sm:grid-cols-3">
                      <div>
                        <p className="mono-label !text-[8px]">Submitted</p>
                        <p className="mt-1 text-[0.78rem] text-ink">22 Oct 2026</p>
                      </div>
                      <div>
                        <p className="mono-label !text-[8px]">Estimated decision</p>
                        <p className="mt-1 text-[0.78rem] text-ink">12–19 Nov 2026</p>
                      </div>
                      <div>
                        <p className="mono-label !text-[8px]">Outstanding</p>
                        <p className="mt-1 text-[0.78rem] text-[#D64545]">1 document</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg border border-[color:var(--hair)] bg-[color:var(--surface-2)] p-3 text-[0.74rem] leading-relaxed text-muted">
                      <strong className="text-ink">Next action:</strong> upload the UK savings statement referenced in your
                      advisor's message. Once received, your file will be resubmitted and the pending clarification closed.
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08} className="lg:col-span-4">
                  <div className="grid h-full gap-3">
                    <div className="card rounded-2xl p-5">
                      <p className="mono-label">At a glance</p>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-[color:var(--surface-2)] p-3">
                          <p className="font-mono text-xl text-ink">2</p>
                          <p className="text-[0.62rem] text-muted">Documents pending</p>
                        </div>
                        <div className="rounded-lg bg-[color:var(--surface-2)] p-3">
                          <p className="font-mono text-xl text-ink">1</p>
                          <p className="text-[0.62rem] text-muted">Unread message</p>
                        </div>
                      </div>
                    </div>
                    <div className="card flex-1 rounded-2xl p-5">
                      <p className="mono-label">Next appointment</p>
                      <p className="mt-2 font-display text-lg text-ink">Document review</p>
                      <p className="mt-1 text-[0.74rem] text-muted">Thursday, 5 November · 11:00 GST</p>
                      <p className="mt-1 text-[0.68rem] text-faint">Zoom · Amara Siddiqui</p>
                      <div className="mt-3 flex gap-2">
                        <Link to="/contact#book" className="btn btn-gold btn-sm flex-1">
                          <CalendarCheck size={12} /> Reschedule
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="grid gap-5 lg:grid-cols-12">
                <Reveal className="lg:col-span-6">
                  <div className="card rounded-2xl p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="mono-label">Documents</p>
                        <p className="mt-1 font-display text-lg text-ink">Your file</p>
                      </div>
                      <label className="btn btn-outline btn-sm cursor-pointer">
                        <Upload size={13} /> Upload
                        <input type="file" className="sr-only" onChange={upload} />
                      </label>
                    </div>
                    <div className="mt-4 divide-y divide-[color:var(--hair)]">
                      {documents.map((doc) => (
                        <div key={`${doc.name}-${doc.date}`} className="flex items-center gap-3 py-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--surface-2)] text-gold-ink">
                            <FileText size={14} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[0.78rem] font-medium text-ink">{doc.name}</p>
                            <p className="text-[0.64rem] text-faint">{doc.date} · {doc.size}</p>
                          </div>
                          <span
                            className={cn(
                              'shrink-0 rounded-full px-2 py-0.5 font-mono text-[7.5px] uppercase tracking-wider',
                              doc.status === 'Approved'
                                ? 'bg-success/10 text-success'
                                : doc.status === 'Action needed'
                                  ? 'bg-[#D64545]/10 text-[#D64545]'
                                  : 'bg-gold/12 text-gold-ink',
                            )}
                          >
                            {doc.status}
                          </span>
                          <button type="button" className="text-faint hover:text-ink" aria-label={`Download ${doc.name}`}>
                            <Download size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08} className="lg:col-span-6">
                  <div className="card flex h-full flex-col rounded-2xl p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="mono-label">Messages</p>
                        <p className="mt-1 font-display text-lg text-ink">Your advisor</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-wider text-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" /> Secure
                      </span>
                    </div>
                    <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: '260px' }}>
                      {messages.map((message, index) => (
                        <div key={`${message.time}-${index}`} className={cn('flex', message.from === 'client' ? 'justify-end' : 'justify-start')}>
                          <div
                            className={cn(
                              'max-w-[85%] rounded-2xl px-3.5 py-2.5',
                              message.from === 'client' ? 'rounded-br-sm bg-royal text-white' : 'rounded-bl-sm bg-[color:var(--surface-2)] text-ink',
                            )}
                          >
                            <p className="text-[0.7rem] leading-relaxed">{message.text}</p>
                            <p className={cn('mt-1 text-right font-mono text-[7px]', message.from === 'client' ? 'text-white/50' : 'text-faint')}>{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={send} className="mt-3 flex items-center gap-2 border-t border-[color:var(--hair)] pt-3">
                      <input
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Write a message…"
                        aria-label="Message your advisor"
                        className="input !py-2 !text-[0.8rem]"
                      />
                      <button type="submit" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy" aria-label="Send message">
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                </Reveal>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/25 bg-gold/[0.05] p-4">
                <p className="text-[0.74rem] text-muted">
                  <strong className="text-ink">Demo notice:</strong> this dashboard uses sample data and does not store files or messages.
                </p>
                <a href="https://wa.me/923319051913" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <MessageCircle size={13} /> Message on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[color:var(--hair)] bg-[color:var(--surface)] py-10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.78rem] text-muted">
            Looking for something else? Explore services or speak to an advisor.
          </p>
          <div className="flex gap-2">
            <Link to="/services" className="btn btn-outline btn-sm">Services <ArrowRight size={12} /></Link>
            <Link to="/contact" className="btn btn-gold btn-sm">Contact <ArrowRight size={12} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
