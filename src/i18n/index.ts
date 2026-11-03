import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ar from './locales/ar.json'

export const directionFor = (lang: string) => (lang.startsWith('ar') ? 'rtl' : 'ltr')

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  })

const applyDirection = (lang: string) => {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang.startsWith('ar') ? 'ar' : 'en'
  document.documentElement.dir = directionFor(lang)
}

applyDirection(i18n.language || 'en')
i18n.on('languageChanged', applyDirection)

export default i18n
