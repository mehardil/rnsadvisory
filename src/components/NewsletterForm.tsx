import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { newsletterSchema } from '@/utils/validation'
import { submitForm } from '@/utils/api'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/utils/cn'
import { useTranslation } from 'react-i18next'

export default function NewsletterForm({ tone = 'dark', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { t } = useTranslation()
  const pushToast = useUIStore((s) => s.pushToast)
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({ resolver: zodResolver(newsletterSchema) })

  const onSubmit = async (values: { email: string }) => {
    try {
      await submitForm({ formName: 'Newsletter', payload: values })
      setDone(true)
      pushToast({ title: 'You are subscribed', description: 'The next briefing will arrive at the start of the month.', type: 'success' })
    } catch (error) {
      pushToast({ title: 'Subscription failed', description: (error as Error).message, type: 'error' })
    }
  }

  if (done) {
    return (
      <p className={cn('flex items-center gap-2 text-sm', tone === 'dark' ? 'text-softgold' : 'text-success', className)}>
        <Check size={16} /> {t('common.success')} — you are on the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('w-full', className)} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        {t('form.newsletter')}
      </label>
      <div
        className={cn(
          'flex items-center gap-2 rounded-full border p-1.5',
          tone === 'dark' ? 'border-ivory/20 bg-ivory/5' : 'border-[color:var(--hair-strong)] bg-surface',
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={t('form.newsletter')}
          aria-invalid={Boolean(errors.email)}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none',
            tone === 'dark' ? 'text-ivory placeholder:text-ivory/35' : 'text-ink placeholder:text-faint',
          )}
          {...register('email')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-transform hover:scale-105 disabled:opacity-60"
          aria-label={t('form.subscribe')}
        >
          {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        </button>
      </div>
      {errors.email && (
        <p className={cn('mt-2 text-xs', tone === 'dark' ? 'text-[#ffb4b4]' : 'text-[#D64545]')}>{errors.email.message}</p>
      )}
    </form>
  )
}
