/**
 * Consent-gated analytics. Nothing loads until the visitor has opted in.
 * IDs come from Vite environment variables so no secrets live in the bundle.
 */

let gaLoaded = false
let pixelLoaded = false
let pageViews: string[] = []

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.id = id
  document.head.appendChild(script)
}

export function initAnalytics(consent: { analytics: boolean; marketing: boolean }) {
  const gaId = import.meta.env.VITE_GA_ID as string | undefined
  const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined

  if (consent.analytics && gaId && !gaLoaded) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, 'rns-ga')
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args)
    }
    w.gtag('js', new Date())
    w.gtag('config', gaId, { anonymize_ip: true })
    gaLoaded = true
  }

  if (consent.marketing && pixelId && !pixelLoaded) {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void }
    if (!w.fbq) {
      // Standard Meta Pixel bootstrap, loaded only with consent.
      const fbq = function (...args: unknown[]) {
        const target = fbq as unknown as { queue: unknown[] }
        target.queue.push(args)
      } as unknown as { (...args: unknown[]): void; queue: unknown[]; loaded: boolean; version: string; push: unknown }
      fbq.queue = []
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.push = fbq
      w.fbq = fbq
      injectScript('https://connect.facebook.net/en_US/fbevents.js', 'rns-pixel')
      w.fbq('init', pixelId)
    }
    w.fbq('track', 'PageView')
    pixelLoaded = true
  }

  if (consent.analytics) pageViews.forEach((path) => trackPageView(path))
}

export function trackPageView(path: string) {
  pageViews.push(path)
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void }
  if (gaLoaded && w.gtag) w.gtag('event', 'page_view', { page_path: path })
  if (pixelLoaded && w.fbq) w.fbq('track', 'PageView')
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void }
  if (gaLoaded && w.gtag) w.gtag('event', name, params)
  if (pixelLoaded && w.fbq) w.fbq('trackCustom', name, params)
}
