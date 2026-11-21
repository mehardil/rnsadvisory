import { Suspense, lazy, useEffect, useState } from 'react'
import Header from '@/components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import MobileBottomBar from '@/components/MobileBottomBar'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import CookieConsent from '@/components/CookieConsent'
import Toaster from '@/components/Toaster'
import ScrollProgress from '@/components/ScrollProgress'
import ErrorBoundary from '@/components/ErrorBoundary'
import RouteFallback from '@/components/RouteFallback'
import { useLenis } from '@/hooks/useLenis'
import { useUIStore } from '@/store/useUIStore'
import { trackPageView } from '@/utils/analytics'

const Footer = lazy(() => import('@/components/Footer'))
const ChatWidget = lazy(() => import('@/components/ChatWidget'))
const CommandPalette = lazy(() => import('@/components/CommandPalette'))

/**
 * Overlay widgets are not needed for the first paint. Mount them once the main
 * thread is idle (or when the user interacts) so their JS never competes with
 * the LCP paint.
 */
function useDeferredMount() {
  const paletteOpen = useUIStore((s) => s.paletteOpen)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return
    let idle = 0
    const activate = () => setReady(true)
    const hasIdle = typeof window.requestIdleCallback === 'function'
    if (hasIdle) {
      idle = window.requestIdleCallback(activate, { timeout: 2200 })
    } else {
      idle = window.setTimeout(activate, 1800)
    }
    window.addEventListener('pointerdown', activate, { once: true, passive: true })
    window.addEventListener('keydown', activate, { once: true })
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      window.removeEventListener('pointerdown', activate)
      window.removeEventListener('keydown', activate)
    }
  }, [ready])

  return ready || paletteOpen
}

export default function Layout() {
  const location = useLocation()
  const consent = useUIStore((s) => s.cookieConsent)
  const overlaysReady = useDeferredMount()
  useLenis()

  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''))
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 180)
      return () => window.clearTimeout(timer)
    }
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    return undefined
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (consent.decided && consent.analytics) trackPageView(location.pathname)
  }, [location.pathname, consent.decided, consent.analytics])

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <div key={location.pathname} className="page-fade">
              <Outlet />
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <MobileBottomBar />
      <FloatingWhatsApp />
      {overlaysReady && (
        <Suspense fallback={null}>
          <CookieConsent />
          <Toaster />
          <ChatWidget />
          <CommandPalette />
        </Suspense>
      )}
    </div>
  )
}
