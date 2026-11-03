import siteConfig from '@/config/siteConfig'

/** Build a WhatsApp deep link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function phoneLink() {
  return siteConfig.contact.phoneHref
}

export function mailLink(subject?: string) {
  return subject
    ? `${siteConfig.contact.emailHref}?subject=${encodeURIComponent(subject)}`
    : siteConfig.contact.emailHref
}

/** Basic client-side sanitisation for free-text inputs before display or send. */
export function sanitizeText(value: string) {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 4000)
}
