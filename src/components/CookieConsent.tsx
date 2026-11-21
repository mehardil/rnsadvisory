import { useState } from 'react'
import { Cookie, Settings2, X } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { initAnalytics } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { Button } from './Button'

export default function CookieConsent() {
  const consent = useUIStore((s) => s.cookieConsent)
  const setConsent = useUIStore((s) => s.setCookieConsent)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [hidden, setHidden] = useState(false)

  const decide = (choices: { analytics: boolean; marketing: boolean }) => {
    setConsent(choices)
    initAnalytics(choices)
    setHidden(true)
  }

  const visible = !consent.decided && !hidden

  return (
    <>
      {visible && (
        <div
          className="anim-fade-up fixed bottom-[4.75rem] left-3 right-3 z-[115] md:bottom-6 md:left-6 md:right-auto md:max-w-[390px]"
          role="region"
          aria-label="Cookie preferences"
        >
          <div className="card overflow-hidden rounded-2xl border-gold/25 shadow-lift">
            <div className="flex items-start gap-2.5 p-3 md:gap-3 md:p-5">
              <span className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold-ink sm:flex">
                <Cookie size={17} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[0.95rem] leading-tight text-ink md:text-[1rem]">We keep cookies simple</p>
                <p className="mt-0.5 text-[0.66rem] leading-relaxed text-muted md:mt-1 md:text-[0.7rem]">
                  Essential only. Analytics loads with your permission.
                </p>
              </div>
              <button
                type="button"
                onClick={() => decide({ analytics: false, marketing: false })}
                className="text-faint hover:text-ink"
                aria-label="Dismiss and use essential cookies only"
              >
                <X size={15} />
              </button>
            </div>

              {showPrefs && (
                <div className="overflow-hidden">
                  <div className="space-y-3 border-t border-[color:var(--hair)] px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-ink">Essential</p>
                        <p className="text-[0.68rem] text-muted">Required for the site to function. Always on.</p>
                      </div>
                      <span className="rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-success">On</span>
                    </div>
                    <label className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-xs font-semibold text-ink">Analytics</span>
                        <span className="block text-[0.68rem] text-muted">Understand which pages are useful. No data sold.</span>
                      </span>
                      <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-4 w-4 accent-[#C9A24B]" />
                    </label>
                    <label className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-xs font-semibold text-ink">Marketing</span>
                        <span className="block text-[0.68rem] text-muted">Measures campaigns. Loaded only if you opt in.</span>
                      </span>
                      <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 h-4 w-4 accent-[#C9A24B]" />
                    </label>
                  </div>
                </div>
              )}

            <div className="flex flex-wrap items-center gap-1.5 border-t border-[color:var(--hair)] bg-[color:var(--surface-2)] px-3 py-2.5 md:px-4 md:py-3">
              <Button size="sm" variant="gold" onClick={() => decide({ analytics: true, marketing: true })}>
                Accept all
              </Button>
              <Button size="sm" variant="outline" onClick={() => decide({ analytics: false, marketing: false })}>
                Essential only
              </Button>
              {showPrefs ? (
                <Button size="sm" variant="ghost" onClick={() => decide({ analytics, marketing })}>
                  Save preferences
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPrefs(true)}
                  className={cn('inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-muted hover:text-ink md:text-[0.72rem]')}
                >
                  <Settings2 size={13} /> Preferences
                </button>
              )}
              <a href="/legal/cookies" className="ms-auto hidden text-[0.68rem] text-muted underline underline-offset-2 hover:text-ink sm:inline">
                Policy
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
