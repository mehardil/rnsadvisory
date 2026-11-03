import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'
import {
  budgetRanges,
  contactSchema,
  countries,
  preferredMethods,
  type ContactFormValues,
} from '@/utils/validation'
import { serviceCategories } from '@/data/services'
import { useAutosave } from '@/hooks/useAutosave'
import { useUIStore } from '@/store/useUIStore'
import { submitForm } from '@/utils/api'
import { whatsappLink, phoneLink } from '@/utils/links'
import { cn } from '@/utils/cn'
import { Button, ButtonAnchor } from './Button'
import { useTranslation } from 'react-i18next'

const STEPS = ['About you', 'What you need', 'Message & consent']

export default function MultiStepContactForm() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('service') || ''
  const pushToast = useUIStore((s) => s.pushToast)
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [reference, setReference] = useState('')

  const defaults: ContactFormValues = useMemo(
    () => ({
      fullName: '',
      phone: '',
      email: '',
      country: 'United Arab Emirates',
      service: preselected,
      budget: '',
      preferred: 'whatsapp',
      message: '',
      consent: false as unknown as true,
      website: '',
    }),
    [preselected],
  )

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), defaultValues: defaults })

  const values = watch()
  const { clear } = useAutosave('contact-enquiry', values, (saved) => {
    reset({ ...defaults, ...saved })
  })

  const next = async () => {
    const fields =
      step === 0
        ? (['fullName', 'phone', 'email', 'country'] as const)
        : step === 1
          ? (['service', 'budget', 'preferred'] as const)
          : (['message', 'consent'] as const)
    const ok = await trigger(fields as unknown as (keyof ContactFormValues)[])
    if (ok) setStep((s) => Math.min(2, s + 1))
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  const onSubmit = async (form: ContactFormValues) => {
    try {
      await submitForm({
        formName: 'Consultation enquiry',
        honeypot: form.website || '',
        payload: { ...form },
      })
      setReference(`RNS-${Date.now().toString().slice(-6)}`)
      setSent(true)
      clear()
      pushToast({ title: 'Enquiry sent', description: 'A named advisor will respond within four business hours.', type: 'success' })
    } catch (error) {
      pushToast({ title: 'Could not send', description: (error as Error).message, type: 'error' })
    }
  }

  if (sent) {
    return (
      <div className="card rounded-2xl p-8 text-center md:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/12 text-success">
          <CheckCircle2 size={32} />
        </span>
        <h2 className="mt-6 font-display text-3xl text-ink">Thank you — we have your enquiry</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          {t('form.confirmed')}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--hair)] px-4 py-2 font-mono text-xs text-ink">
          Reference <strong className="text-gold-ink">{reference}</strong>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonAnchor href={whatsappLink(`Hello RNS Global, my reference is ${reference}.`)} target="_blank" rel="noopener noreferrer" variant="navy">
            <MessageCircle size={15} /> WhatsApp us
          </ButtonAnchor>
          <ButtonAnchor href={phoneLink()} variant="outline">
            <Phone size={15} /> Call now
          </ButtonAnchor>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false)
            setStep(0)
            reset(defaults)
          }}
          className="mt-6 text-xs font-semibold text-gold-ink underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden rounded-2xl">
      <div className="border-b border-[color:var(--hair)] p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Consultation request</p>
            <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">Tell us what you need</h2>
          </div>
          <span className="hidden shrink-0 items-center gap-2 rounded-full border border-[color:var(--hair)] px-3 py-1.5 text-[0.68rem] text-muted sm:inline-flex">
            <ShieldCheck size={13} className="text-success" /> Confidential
          </span>
        </div>

        <div className="mt-6" aria-hidden="true">
          <div className="flex items-center justify-between text-[0.68rem]">
            <span className="mono-label">
              {t('common.step')} {step + 1} {t('common.of')} 3
            </span>
            <span className="mono-label">{Math.round(((step + 1) / 3) * 100)}%</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-[color:var(--surface-2)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-softgold transition-all duration-500"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
          <ol className="mt-4 hidden grid-cols-3 gap-3 sm:grid">
            {STEPS.map((label, index) => (
              <li key={label} className={cn('flex items-center gap-2 text-[0.72rem]', index <= step ? 'text-ink' : 'text-faint')}>
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[9px]',
                    index < step
                      ? 'border-success bg-success text-white'
                      : index === step
                        ? 'border-gold bg-gold text-navy'
                        : 'border-[color:var(--hair-strong)]',
                  )}
                >
                  {index < step ? <CheckCircle2 size={11} /> : index + 1}
                </span>
                {label}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8" noValidate>
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website-hp">Website</label>
          <input id="website-hp" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  {t('form.name')}
                </label>
                <input id="contact-name" className="input" autoComplete="name" placeholder="Your full name" {...register('fullName')} />
                {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
              </div>
              <div>
                <label htmlFor="contact-phone" className="field-label">
                  {t('form.phone')}
                </label>
                <input id="contact-phone" type="tel" className="input" autoComplete="tel" placeholder="+92 331 905 1913" {...register('phone')} />
                {errors.phone && <p className="field-error">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="field-label">
                {t('form.email')}
              </label>
              <input id="contact-email" type="email" className="input" autoComplete="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="field-error">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="contact-country" className="field-label">
                {t('form.country')}
              </label>
              <select id="contact-country" className="input" {...register('country')}>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && <p className="field-error">{errors.country.message}</p>}
            </div>
            <p className="text-[0.72rem] leading-relaxed text-faint">
              Your details stay with our advisory team. We never sell client data. Autosaved on this device.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-service" className="field-label">
                {t('form.service')}
              </label>
              <select id="contact-service" className="input" {...register('service')}>
                <option value="">Select a service</option>
                <option value="Not sure yet — help me choose">Not sure yet — help me choose</option>
                {serviceCategories.map((category) => (
                  <optgroup key={category.id} label={category.title}>
                    {category.services.map((svc) => (
                      <option key={svc.slug} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.service && <p className="field-error">{errors.service.message}</p>}
            </div>
            <div>
              <label htmlFor="contact-budget" className="field-label">
                {t('form.budget')}
              </label>
              <select id="contact-budget" className="input" {...register('budget')}>
                <option value="">Select a range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.budget && <p className="field-error">{errors.budget.message}</p>}
            </div>
            <fieldset>
              <legend className="field-label">{t('form.preferred')}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {preferredMethods.map((method) => (
                  <label
                    key={method.value}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[color:var(--hair-strong)] px-3 py-2.5 text-xs text-muted transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/10 has-[:checked]:text-ink"
                  >
                    <input type="radio" value={method.value} className="sr-only" {...register('preferred')} />
                    {method.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-message" className="field-label">
                {t('form.message')}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                className="input resize-none"
                placeholder="A few sentences about your goal, timeline and anything we should know."
                {...register('message')}
              />
              {errors.message && <p className="field-error">{errors.message.message}</p>}
            </div>
            <label className="flex items-start gap-2.5 rounded-lg border border-[color:var(--hair)] bg-[color:var(--surface-2)] p-3.5">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#C9A24B]" {...register('consent')} />
              <span className="text-[0.76rem] leading-relaxed text-muted">
                {t('form.consent')}{' '}
                <a href="/legal/privacy" className="text-gold-ink underline underline-offset-2">
                  Privacy policy
                </a>
                .
              </span>
            </label>
            {errors.consent && <p className="field-error">{errors.consent.message}</p>}
            <p className="flex items-center gap-2 text-[0.7rem] text-faint">
              <ShieldCheck size={13} className="text-success" /> Honeypot, rate-limited and encrypted in transit.
            </p>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-[color:var(--hair)] pt-5">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="btn btn-outline btn-sm disabled:invisible"
          >
            <ArrowLeft size={14} /> {t('common.previous')}
          </button>
          <div className="flex items-center gap-2">
            {step < 2 ? (
              <Button type="button" variant="gold" onClick={next}>
                {t('common.next')} <ArrowRight size={15} />
              </Button>
            ) : (
              <Button type="submit" variant="gold" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {isSubmitting ? t('common.sending') : t('cta.send')}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
