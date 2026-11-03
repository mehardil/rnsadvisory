import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react'
import { quoteSchema, type QuoteFormValues } from '@/utils/validation'
import { submitForm } from '@/utils/api'
import { useUIStore } from '@/store/useUIStore'
import { whatsappLink } from '@/utils/links'
import { Button, ButtonAnchor } from './Button'

export default function QuoteForm({ serviceName }: { serviceName: string }) {
  const [sent, setSent] = useState(false)
  const pushToast = useUIStore((s) => s.pushToast)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { consent: false as unknown as true },
  })

  const onSubmit = async (values: QuoteFormValues) => {
    try {
      await submitForm({ formName: `Quote — ${serviceName}`, payload: { ...values, service: serviceName } })
      setSent(true)
      pushToast({ title: 'Request received', description: 'A named advisor will reply within 4 business hours.', type: 'success' })
    } catch (error) {
      pushToast({ title: 'Could not send', description: (error as Error).message, type: 'error' })
    }
  }

  if (sent) {
    return (
      <div className="card glass rounded-2xl p-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 size={24} />
        </span>
        <h3 className="mt-4 font-display text-xl text-ink">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          A named advisor will reply within four business hours. For anything urgent, message us on WhatsApp.
        </p>
        <ButtonAnchor
          href={whatsappLink(`Hello RNS Global, I would like a quote for ${serviceName}.`)}
          target="_blank"
          rel="noopener noreferrer"
          variant="navy"
          className="mt-5 w-full"
        >
          <MessageCircle size={15} /> WhatsApp
        </ButtonAnchor>
      </div>
    )
  }

  return (
    <div className="card rounded-2xl p-6">
      <p className="eyebrow mb-3">Free quote</p>
      <h3 className="font-display text-[1.35rem] leading-tight text-ink">Get a free quote</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Tell us where you are starting from. We reply with a fixed scope and price — no obligation.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3" noValidate>
        <div>
          <label htmlFor="quote-name" className="field-label">
            Full name
          </label>
          <input id="quote-name" className="input" autoComplete="name" {...register('fullName')} />
          {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="quote-email" className="field-label">
            Email
          </label>
          <input id="quote-email" type="email" className="input" autoComplete="email" {...register('email')} />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="quote-phone" className="field-label">
            Phone / WhatsApp
          </label>
          <input id="quote-phone" type="tel" className="input" placeholder="+92 331 905 1913" autoComplete="tel" {...register('phone')} />
          {errors.phone && <p className="field-error">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="quote-message" className="field-label">
            Anything we should know? <span className="font-normal text-faint">(optional)</span>
          </label>
          <textarea id="quote-message" rows={3} className="input resize-none" {...register('message')} />
        </div>
        <div className="flex items-start gap-2.5">
          <input id="quote-consent" type="checkbox" className="mt-1 h-4 w-4 accent-[#C9A24B]" {...register('consent')} />
          <label htmlFor="quote-consent" className="text-[0.72rem] leading-relaxed text-muted">
            I agree to the privacy policy and to being contacted about this enquiry.
          </label>
        </div>
        {errors.consent && <p className="field-error">{errors.consent.message}</p>}
        <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {isSubmitting ? 'Sending…' : 'Request my quote'}
        </Button>
        <p className="text-center text-[0.68rem] text-faint">Response within 4 business hours · No spam</p>
      </form>
    </div>
  )
}
