import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileBottomBar from '@/components/MobileBottomBar'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ChatWidget from '@/components/ChatWidget'
import CookieConsent from '@/components/CookieConsent'
import CommandPalette from '@/components/CommandPalette'
import Toaster from '@/components/Toaster'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ErrorBoundary from '@/components/ErrorBoundary'
import RouteFallback from '@/components/RouteFallback'
import { useLenis } from '@/hooks/useLenis'
import { useUIStore } from '@/store/useUIStore'
import { trackPageView } from '@/utils/analytics'

export default function Layout() {
  const location = useLocation()
  const consent = useUIStore((s) => s.cookieConsent)
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
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingWhatsApp />
      <ChatWidget />
      <CookieConsent />
      <CommandPalette />
      <Toaster />
      <CustomCursor />
    </div>
  )
}
