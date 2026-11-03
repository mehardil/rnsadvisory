import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import siteConfig from '@/config/siteConfig'
import { serviceCategories } from '@/data/services'
import { useUIStore } from '@/store/useUIStore'
import { useHeaderBehaviour } from '@/hooks/useHeaderBehaviour'
import { useScrollLock } from '@/hooks/useInteractions'
import { whatsappLink, mailLink, phoneLink } from '@/utils/links'
import { getIcon } from '@/utils/icons'
import { cn } from '@/utils/cn'
import Logo from './Logo'
import ArtFrame from './ArtFrame'
import { ButtonLink } from './Button'

const featuredService = serviceCategories.find((c) => c.slug === 'immigration')?.services.find((s) => s.slug === 'golden-visa')

export default function Header() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language?.startsWith('ar')
  const location = useLocation()
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const closeTimer = useRef<number>()
  const { hidden, scrolled } = useHeaderBehaviour()
  const theme = useUIStore((s) => s.theme)
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const setPaletteOpen = useUIStore((s) => s.setPaletteOpen)
  const dismissed = useUIStore((s) => s.announcementDismissed)
  const dismissAnnouncement = useUIStore((s) => s.dismissAnnouncement)
  const announcement = siteConfig.announcements[0]
  const showAnnouncement = !dismissed && announcement

  useScrollLock(mobileOpen)

  const solid = scrolled || megaOpen
  const lightText = !solid
  const primaryCategories = serviceCategories.slice(0, 6)

  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
    setOpenCategory(null)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The menu is rendered in a portal; make the underlying app inert for keyboard
  // and screen-reader users while it is open.
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return
    if (mobileOpen) {
      root.setAttribute('inert', '')
      root.setAttribute('aria-hidden', 'true')
    } else {
      root.removeAttribute('inert')
      root.removeAttribute('aria-hidden')
    }
    return () => {
      root.removeAttribute('inert')
      root.removeAttribute('aria-hidden')
    }
  }, [mobileOpen])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150)
  }

  const toggleLang = () => {
    const next = i18n.language?.startsWith('ar') ? 'en' : 'ar'
    i18n.changeLanguage(next)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[90] transition-transform duration-500',
        hidden && !megaOpen ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      {showAnnouncement && !scrolled && (
        <div className="relative bg-gold text-navy">
          <div className="container-x flex items-center justify-center gap-3 py-2 text-center">
            <p className="text-[0.68rem] font-medium tracking-wide md:text-[0.74rem]">
              <span className="mr-2 hidden rounded-full bg-navy px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-softgold sm:inline">
                {isArabic ? t('topbar.offer') : 'Offer'}
              </span>
              {isArabic ? t('topbar.announcement') : announcement?.text}{' '}
              <Link to={announcement?.to || '/contact'} className="whitespace-nowrap font-semibold underline underline-offset-2">
                {isArabic ? t('topbar.cta') : announcement?.cta}
              </Link>
            </p>
            <button
              type="button"
              onClick={dismissAnnouncement}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/60 transition-colors hover:text-navy md:right-5"
              aria-label="Dismiss announcement"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      <div
        className={cn(
          'border-b transition-all duration-300',
          solid ? 'header-solid border-[color:var(--hair)] shadow-[0_10px_30px_-24px_rgba(10,26,58,0.5)]' : 'border-transparent bg-transparent',
        )}
        onMouseLeave={closeMega}
      >
        <div className="container-x flex h-[70px] items-center gap-3 lg:gap-5">
          <div className="shrink-0">
            <Logo tone={lightText ? 'light' : 'dark'} />
          </div>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {siteConfig.nav.map((item) =>
              item.mega ? (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={openMega}
                  onClick={() => setMegaOpen((o) => !o)}
                  aria-expanded={megaOpen}
                  aria-controls="services-mega"
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.78rem] font-medium transition-colors',
                    lightText ? 'text-ivory/80 hover:text-ivory' : 'text-muted hover:text-ink',
                    (megaOpen || location.pathname.startsWith('/services')) && (lightText ? 'text-ivory' : 'text-ink'),
                  )}
                >
                  {t('nav.services')}
                  <ChevronDown size={13} className={cn('transition-transform', megaOpen && 'rotate-180')} />
                </button>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-3 py-2 text-[0.78rem] font-medium transition-colors',
                      lightText ? 'text-ivory/75 hover:text-ivory' : 'text-muted hover:text-ink',
                      isActive && (lightText ? '!text-ivory' : '!text-ink'),
                    )
                  }
                >
                  {t(`nav.${item.label.toLowerCase()}`)}
                </NavLink>
              ),
            )}
          </nav>

          <div className="ms-auto flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label={t('a11y.openSearch')}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                lightText ? 'text-ivory/75 hover:bg-ivory/10 hover:text-ivory' : 'text-muted hover:bg-[color:var(--surface-2)] hover:text-ink',
              )}
            >
              <Search size={17} />
            </button>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('a11y.toggleLang')}
              className={cn(
                'hidden h-9 items-center gap-1 rounded-full px-2.5 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors sm:flex',
                lightText ? 'text-ivory/75 hover:bg-ivory/10 hover:text-ivory' : 'text-muted hover:bg-[color:var(--surface-2)] hover:text-ink',
              )}
            >
              <Globe size={13} />
              {i18n.language?.startsWith('ar') ? 'AR' : 'EN'}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t('a11y.toggleTheme')}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                lightText ? 'text-ivory/75 hover:bg-ivory/10 hover:text-ivory' : 'text-muted hover:bg-[color:var(--surface-2)] hover:text-ink',
              )}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href={phoneLink()}
              className={cn(
                'hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[0.74rem] font-medium min-[1360px]:flex',
                lightText ? 'text-ivory/80 hover:text-ivory' : 'text-muted hover:text-ink',
              )}
            >
              <Phone size={14} />
              {siteConfig.contact.phoneDisplay}
            </a>
            <div className="hidden lg:block">
              <ButtonLink to={siteConfig.links.book} variant="gold" size="sm" className="!px-4">
                {t('cta.bookShort')}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t('a11y.openMenu')}
              aria-expanded={mobileOpen}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors xl:hidden',
                lightText ? 'text-ivory hover:bg-ivory/10' : 'text-ink hover:bg-[color:var(--surface-2)]',
              )}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="services-mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-0 top-full hidden border-t border-[color:var(--hair)] bg-[color:var(--surface)] shadow-lift xl:block"
              onMouseEnter={openMega}
            >
              <div className="container-x py-7">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-8 grid grid-cols-3 gap-x-5 gap-y-6">
                    {primaryCategories.map((category) => {
                      const Icon = getIcon(category.icon)
                      return (
                        <div key={category.id} className="group">
                          <Link
                            to={`/services/${category.slug}`}
                            className="flex items-center gap-2.5"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--hair)] text-gold-ink transition-colors group-hover:border-gold/50">
                              <Icon size={15} />
                            </span>
                            <span className="text-[0.82rem] font-semibold leading-tight text-ink group-hover:text-gold-ink">
                              {category.title}
                            </span>
                          </Link>
                          <p className="mt-2 line-clamp-2 text-[0.7rem] leading-relaxed text-muted">{category.short}</p>
                          <ul className="mt-2.5 space-y-1">
                            {category.services.slice(0, 3).map((svc) => (
                              <li key={svc.slug}>
                                <Link
                                  to={`/services/${category.slug}/${svc.slug}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="text-[0.71rem] text-muted transition-colors hover:text-gold-ink"
                                >
                                  {svc.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>

                  <div className="col-span-4">
                    {featuredService && (
                      <Link
                        to={`/services/immigration/${featuredService.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group card block overflow-hidden !rounded-xl"
                      >
                        <div className="relative h-36 overflow-hidden">
                          <ArtFrame
                            seed="mega-golden-visa"
                            imageKey="service-immigration-golden-visa"
                            style="crystals"
                            alt="UAE Golden Visa advisory"
                            animate
                            rounded="rounded-none"
                            className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-softgold backdrop-blur">
                            {t('nav.featured')}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="font-display text-lg text-ink group-hover:text-gold-ink">UAE Golden Visa</p>
                          <p className="mt-1 line-clamp-2 text-[0.72rem] leading-relaxed text-muted">
                            Ten-year residency for investors, professionals and exceptional talent.
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-gold-ink">
                            Explore the service <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[color:var(--hair)] pt-4">
                  <span className="mono-label !text-[9px]">{t('nav.morePractices')}</span>
                  {serviceCategories.slice(6).map((category) => (
                    <Link
                      key={category.id}
                      to={`/services/${category.slug}`}
                      onClick={() => setMegaOpen(false)}
                      className="text-[0.72rem] text-muted transition-colors hover:text-gold-ink"
                    >
                      {category.title}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    onClick={() => setMegaOpen(false)}
                    className="ms-auto inline-flex items-center gap-1.5 text-[0.74rem] font-semibold text-ink hover:text-gold-ink"
                  >
                    {t('nav.allServices')} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu — rendered in a portal so the header's transform cannot clip it */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] flex h-[100dvh] flex-col bg-navy text-ivory xl:hidden"
          >
            <div className="container-x flex h-[70px] shrink-0 items-center justify-between border-b border-ivory/10">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t('a11y.closeMenu')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <nav aria-label="Mobile" className="space-y-1">
                {siteConfig.nav.map((item) =>
                  item.mega ? (
                    <div key={item.label} className="border-b border-ivory/10">
                      <button
                        type="button"
                        onClick={() => setOpenCategory(openCategory ? null : 'services')}
                        aria-expanded={openCategory !== null}
                        className="flex w-full items-center justify-between py-3.5 text-left font-display text-xl"
                      >
                        {t('nav.services')}
                        <ChevronDown
                          size={18}
                          className={cn('transition-transform text-softgold', openCategory !== null && 'rotate-180')}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openCategory !== null && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 pb-4">
                              {serviceCategories.map((category) => {
                                const Icon = getIcon(category.icon)
                                const expanded = openCategory === category.slug
                                return (
                                  <div key={category.id} className="rounded-lg bg-ivory/[0.04]">
                                    <button
                                      type="button"
                                      onClick={() => setOpenCategory(expanded ? 'services' : category.slug)}
                                      aria-expanded={expanded}
                                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
                                    >
                                      <Icon size={15} className="text-softgold" />
                                      <span className="flex-1 text-[0.82rem] font-medium">{category.title}</span>
                                      <ChevronDown
                                        size={14}
                                        className={cn('text-ivory/40 transition-transform', expanded && 'rotate-180')}
                                      />
                                    </button>
                                    {expanded && (
                                      <div className="space-y-1 px-4 pb-3">
                                        {category.services.map((svc) => (
                                          <Link
                                            key={svc.slug}
                                            to={`/services/${category.slug}/${svc.slug}`}
                                            onClick={() => setMobileOpen(false)}
                                            className="block py-1.5 text-[0.76rem] text-ivory/65 hover:text-softgold"
                                          >
                                            {svc.title}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                              <Link
                                to="/services"
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 inline-flex items-center gap-2 px-3 py-2 text-[0.8rem] font-semibold text-softgold"
                              >
                                {t('nav.allServices')} <ArrowRight size={13} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-ivory/10 py-3.5 font-display text-xl"
                    >
                      {t(`nav.${item.label.toLowerCase()}`)}
                      <ArrowRight size={16} className="text-ivory/30" />
                    </NavLink>
                  ),
                )}
              </nav>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3.5 py-2 text-xs text-ivory/75"
                >
                  <Globe size={13} /> {i18n.language?.startsWith('ar') ? 'English' : 'العربية'}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3.5 py-2 text-xs text-ivory/75"
                >
                  {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
                  {theme === 'dark' ? t('common.light') : t('common.dark')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    setPaletteOpen(true)
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3.5 py-2 text-xs text-ivory/75"
                >
                  <Search size={13} /> {t('common.search')}
                </button>
              </div>
            </div>

            <div className="shrink-0 border-t border-ivory/10 bg-navy/95 p-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
              <ButtonLink to={siteConfig.links.book} variant="gold" className="w-full" onClick={() => setMobileOpen(false)}>
                {t('cta.book')} <ArrowRight size={15} />
              </ButtonLink>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <a href={phoneLink()} className="flex flex-col items-center gap-1 rounded-lg border border-ivory/10 py-2 text-[0.62rem] text-ivory/65">
                  <Phone size={15} /> Call
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-lg border border-ivory/10 py-2 text-[0.62rem] text-ivory/65">
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <a href={mailLink('Consultation enquiry')} className="flex flex-col items-center gap-1 rounded-lg border border-ivory/10 py-2 text-[0.62rem] text-ivory/65">
                  <Mail size={15} /> Email
                </a>
              </div>
            </div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  )
}
