import { sanitizeText } from './links'

const RATE_KEY = 'rns-last-submit'
const RATE_WINDOW_MS = 20_000

interface SubmitOptions {
  formName: string
  honeypot?: string
  payload: Record<string, unknown>
}

/**
 * Thin submission layer. Uses Formspree/EmailJS-compatible POST when configured,
 * otherwise resolves locally so the demo works without keys. Never trusts client
 * validation alone — the honeypot and rate limit are re-checked here.
 */
export async function submitForm({ formName, honeypot, payload }: SubmitOptions) {
  if (honeypot && honeypot.length > 0) {
    // Pretend success so bots do not learn the check failed.
    return { ok: true, demo: true }
  }

  const last = Number(window.localStorage.getItem(RATE_KEY) || 0)
  if (Date.now() - last < RATE_WINDOW_MS) {
    throw new Error('Please wait a few seconds before submitting again.')
  }
  window.localStorage.setItem(RATE_KEY, String(Date.now()))

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [
      key,
      typeof value === 'string' ? sanitizeText(value) : value,
    ]),
  )

  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
  const configured = endpoint && !endpoint.includes('your-form-id')

  if (configured) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...cleanPayload, _form: formName, _subject: `RNS Global — ${formName}` }),
    })
    if (!res.ok) throw new Error('We could not send your message. Please call or WhatsApp us instead.')
    return { ok: true, demo: false }
  }

  await new Promise((resolve) => setTimeout(resolve, 900))
  return { ok: true, demo: true }
}
