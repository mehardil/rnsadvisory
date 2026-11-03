import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Briefcase, CheckCircle2, ChevronDown, Clock, Loader2, MapPin, Upload } from 'lucide-react'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import IsoBadge, { toneFor } from '@/components/IsoBadge'
import ArtFrame from '@/components/ArtFrame'
import { Button } from '@/components/Button'
import { applicationSchema } from '@/utils/validation'
import { departments, getJob, jobBenefits, jobs } from '@/data/jobs'
import { submitForm } from '@/utils/api'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/utils/cn'
import { breadcrumbJsonLd, organizationJsonLd } from '@/utils/seo'

type ApplicationValues = {
  fullName: string
  email: string
  phone: string
  role: string
  linkedin?: string
  message: string
  consent: true
}

export default function Careers() {
  const [department, setDepartment] = useState('All')
  const [openJob, setOpenJob] = useState<string | null>(null)
  const [cvName, setCvName] = useState('')
  const [sent, setSent] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const pushToast = useUIStore((s) => s.pushToast)

  const filtered = useMemo(
    () => (department === 'All' ? jobs : jobs.filter((job) => job.department === department)),
    [department],
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema) as never,
    defaultValues: { role: '', linkedin: '', consent: false as unknown as true },
  })

  const selectedRole = watch('role')

  const applyFor = (jobId: string) => {
    const job = getJob(jobId)
    if (!job) return
    setValue('role', job.title, { shouldValidate: true })
    setOpenJob(jobId)
    window.setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const onSubmit = async (values: ApplicationValues) => {
    try {
      await submitForm({
        formName: `Career application — ${values.role}`,
        payload: { ...values, cv: cvName || 'No file attached' },
      })
      setSent(true)
      pushToast({ title: 'Application received', description: 'Our people team will review it and reply if there is a fit.', type: 'success' })
      reset()
      setCvName('')
    } catch (error) {
      pushToast({ title: 'Could not send', description: (error as Error).message, type: 'error' })
    }
  }

  return (
    <>
      <Seo
        title="Careers at RNS Global"
        description="Join a cross-border advisory firm with real progression, learning budget, health cover and offices in Dubai, Riyadh, Lahore, Mumbai, London, Tallinn and New York."
        path="/careers"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Do the best work of your career, <em className="italic text-softgold">across borders.</em>
          </>
        }
        description="We hire experienced operators and train them properly. Small teams, senior exposure, real client responsibility from the first month."
        crumbs={[{ name: 'Careers' }]}
        seed="careers-hero"
        style="orbits"
      >
        <a href="#roles" className="btn btn-gold">
          View open roles <ArrowRight size={15} />
        </a>
        <a href="#apply" className="btn btn-light-outline">
          Send a speculative CV
        </a>
      </PageHero>

      <section className="bg-page py-14 md:py-20">
        <div className="container-x">
          <Reveal className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="eyebrow">Why here</span>
              <h2 className="mt-3 font-display text-3xl text-ink">
                Senior exposure, <em>no theatre.</em>
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
                You will work directly with clients and partners, not just prepare slides for someone else. We keep teams
                small so responsibility is real, and we invest in the training that makes it safe.
              </p>
              <ArtFrame
                seed="careers-culture"
                imageKey="careers-culture"
                alt=""
                animate={false}
                className="mt-5 aspect-[4/3] w-full"
              />
            </div>
            <div className="md:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {jobBenefits.map((benefit) => {
                  return (
                    <div key={benefit.title} className="card p-4">
                      <IsoBadge icon={benefit.icon} tone={toneFor(benefit.title)} size="sm" />
                      <p className="mt-3 text-[0.84rem] font-semibold text-ink">{benefit.title}</p>
                      <p className="mt-1 text-[0.74rem] leading-relaxed text-muted">{benefit.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-y border-[color:var(--hair)] bg-[color:var(--surface)] py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Open roles</span>
              <h2 className="mt-2 font-display text-3xl text-ink">{filtered.length} positions across the group</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((item) => (
                <button key={item} type="button" onClick={() => setDepartment(item)} className={cn('chip', department === item && 'chip-active')}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 divide-y divide-[color:var(--hair)] overflow-hidden rounded-2xl border border-[color:var(--hair)]">
            {filtered.map((job) => {
              const open = openJob === job.id
              return (
                <div key={job.id} className="bg-[color:var(--surface)]">
                  <button
                    type="button"
                    onClick={() => setOpenJob(open ? null : job.id)}
                    aria-expanded={open}
                    className="flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[color:var(--surface-2)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:var(--hair)] text-gold-ink">
                      <Briefcase size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9rem] font-semibold text-ink">{job.title}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] text-muted">
                        <span>{job.department}</span>
                        <span className="inline-flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                        <span className="inline-flex items-center gap-1"><Clock size={10} /> {job.type}</span>
                      </span>
                    </span>
                    <span className="rounded-full border border-[color:var(--hair)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-faint">
                      {job.level}
                    </span>
                    <ChevronDown size={16} className={cn('shrink-0 text-muted transition-transform', open && 'rotate-180')} />
                  </button>

                  {open && (
                    <div className="grid gap-6 border-t border-[color:var(--hair)] px-5 py-5 md:grid-cols-12">
                      <div className="md:col-span-7">
                        <p className="text-[0.84rem] leading-relaxed text-muted">{job.summary}</p>
                        <p className="mono-label mt-4">Responsibilities</p>
                        <ul className="mt-2 space-y-1.5">
                          {job.responsibilities.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-5">
                        <p className="mono-label">Requirements</p>
                        <ul className="mt-2 space-y-1.5">
                          {job.requirements.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" /> {item}
                            </li>
                          ))}
                        </ul>
                        <Button variant="gold" size="sm" className="mt-4 w-full" onClick={() => applyFor(job.id)}>
                          Apply for this role <ArrowRight size={13} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-page py-14 md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Application</span>
            <h2 className="mt-2 font-display text-3xl text-ink">Introduce yourself</h2>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">
              One form, no account. We read every application ourselves and reply when there is a genuine fit — usually
              within ten working days.
            </p>
            <div className="mt-5 space-y-2 rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-4 text-[0.74rem] leading-relaxed text-muted">
              <p className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-success" /> CV and portfolio accepted as PDF or DOCX.</p>
              <p className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-success" /> Your file is used only for this application.</p>
              <p className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-success" /> We do not use AI to auto-reject applicants.</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {sent ? (
              <div className="card rounded-2xl p-8 text-center">
                <CheckCircle2 size={36} className="mx-auto text-success" />
                <h3 className="mt-4 font-display text-2xl text-ink">Application received</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  Thank you. Our people team will review your application and reply if there is a fit. If you do not hear
                  within ten working days, please assume we have gone with another profile this time.
                </p>
                <Button variant="outline" className="mt-5" onClick={() => setSent(false)}>
                  Submit another application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="card rounded-2xl p-5 md:p-7" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="app-name" className="field-label">Full name</label>
                    <input id="app-name" className="input" {...register('fullName')} />
                    {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="app-email" className="field-label">Email</label>
                    <input id="app-email" type="email" className="input" {...register('email')} />
                    {errors.email && <p className="field-error">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="app-phone" className="field-label">Phone</label>
                    <input id="app-phone" type="tel" className="input" {...register('phone')} />
                    {errors.phone && <p className="field-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="app-role" className="field-label">Role</label>
                    <select id="app-role" className="input" {...register('role')}>
                      <option value="">Select a role</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                      <option value="Speculative application">Speculative application</option>
                    </select>
                    {errors.role && <p className="field-error">{errors.role.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="app-linkedin" className="field-label">LinkedIn or portfolio <span className="font-normal text-faint">(optional)</span></label>
                  <input id="app-linkedin" className="input" placeholder="https://" {...register('linkedin')} />
                  {errors.linkedin && <p className="field-error">{errors.linkedin.message}</p>}
                </div>

                <div className="mt-4">
                  <label htmlFor="app-message" className="field-label">Why this role?</label>
                  <textarea id="app-message" rows={4} className="input resize-none" {...register('message')} />
                  {errors.message && <p className="field-error">{errors.message.message}</p>}
                </div>

                <div className="mt-4">
                  <label htmlFor="app-cv" className="field-label">CV</label>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-[color:var(--hair-strong)] px-4 py-3 text-left transition-colors hover:border-gold"
                  >
                    <span className="flex items-center gap-2 text-[0.78rem] text-muted">
                      <Upload size={15} className="text-gold-ink" />
                      {cvName || 'Attach a PDF or DOCX file'}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-faint">Browse</span>
                  </button>
                  <input
                    ref={fileRef}
                    id="app-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(event) => setCvName(event.target.files?.[0]?.name || '')}
                  />
                  <p className="mt-1.5 text-[0.64rem] text-faint">Demo note: the filename is recorded; file transfer is enabled when the form endpoint is configured.</p>
                </div>

                <label className="mt-4 flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#C9A24B]" {...register('consent')} />
                  <span className="text-[0.72rem] leading-relaxed text-muted">
                    I agree to the privacy policy and to RNS Global storing this application for recruitment purposes.
                  </span>
                </label>
                {errors.consent && <p className="field-error">{errors.consent.message}</p>}

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[color:var(--hair)] pt-5">
                  <p className="hidden text-[0.66rem] text-faint sm:block">
                    {selectedRole ? `Applying for: ${selectedRole}` : 'You can apply speculatively.'}
                  </p>
                  <Button type="submit" variant="gold" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
                    {isSubmitting ? 'Sending…' : 'Send application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
