import siteConfig from '@/config/siteConfig'

const locales = { en: 'en-US', ar: 'ar-AE' } as const

export function formatCurrency(amount: number, currency = 'AED', lang: keyof typeof locales = 'en') {
  const normalized = Number.isFinite(amount) ? amount : 0
  const currencyConfig = siteConfig.currencies.find((c) => c.code === currency)
  try {
    return new Intl.NumberFormat(locales[lang] || 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: currencyConfig ? (currency === 'INR' || currency === 'PKR' ? 0 : 0) : 0,
    }).format(normalized)
  } catch {
    return `${currencyConfig?.symbol || ''}${Math.round(normalized).toLocaleString('en-US')}`
  }
}

export function formatNumber(value: number, lang: keyof typeof locales = 'en') {
  return new Intl.NumberFormat(locales[lang] || 'en-US').format(value)
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

export function formatDate(date: string, lang: keyof typeof locales = 'en') {
  try {
    return new Intl.DateTimeFormat(locales[lang] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  } catch {
    return date
  }
}

export function formatTimeInZone(timeZone: string, lang = 'en', date = new Date()) {
  try {
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-AE' : 'en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  } catch {
    return '—'
  }
}

export function readingTimeFromText(text: string) {
  const words = text.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 220))} min read`
}

export function truncate(text: string, max = 140) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}
