import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'
export type ConsentState = { decided: boolean; analytics: boolean; marketing: boolean }

export interface ToastItem {
  id: string
  title: string
  description?: string
  type?: 'success' | 'error' | 'info'
}

interface UIState {
  theme: Theme
  currency: string
  announcementDismissed: boolean
  cookieConsent: ConsentState
  paletteOpen: boolean
  mobileMenuOpen: boolean
  toasts: ToastItem[]
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setCurrency: (currency: string) => void
  dismissAnnouncement: () => void
  setCookieConsent: (consent: Omit<ConsentState, 'decided'>) => void
  setPaletteOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  pushToast: (toast: Omit<ToastItem, 'id'>) => void
  dismissToast: (id: string) => void
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#060f22' : '#0A1A3A')
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      currency: 'AED',
      announcementDismissed: false,
      cookieConsent: { decided: false, analytics: false, marketing: false },
      paletteOpen: false,
      mobileMenuOpen: false,
      toasts: [],
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light'
        applyTheme(next)
        set({ theme: next })
      },
      setCurrency: (currency) => set({ currency }),
      dismissAnnouncement: () => set({ announcementDismissed: true }),
      setCookieConsent: (consent) =>
        set({ cookieConsent: { decided: true, analytics: consent.analytics, marketing: consent.marketing } }),
      setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
      pushToast: (toast) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        set({ toasts: [...get().toasts, { ...toast, id }] })
        window.setTimeout(() => {
          set({ toasts: get().toasts.filter((t) => t.id !== id) })
        }, 5500)
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: 'rns-ui',
      partialize: (state) => ({
        theme: state.theme,
        currency: state.currency,
        announcementDismissed: state.announcementDismissed,
        cookieConsent: state.cookieConsent,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme)
      },
    },
  ),
)
