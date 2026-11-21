import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
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
import { useUIStore } from '@/store/useUIStore'
import { useHeaderBehaviour } from '@/hooks/useHeaderBehaviour'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollLock } from '@/hooks/useInteractions'
import { whatsappLink, mailLink, phoneLink, consultationLink } from '@/utils/links'
import { getIcon } from '@/utils/icons'
import { cn } from '@/utils/cn'
import Logo from './Logo'
const ArtFrame = lazy(() => import('./ArtFrame'))
import { MetaIcon, WhatsAppIcon } from './SocialIcons'
import { ButtonAnchor } from './Button'

type NavService = { slug: string; title: string }
type NavCategory = {
  id: string
  slug: string
  title: string
  short: string
  icon: string
  services: NavService[]
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language?.startsWith('ar')
  const location = useLocation()
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  // The full services catalogue is only needed once a menu opens, so it stays
  // out of the initial bundle.
  const [serviceCategories, setServiceCategories] = useState<NavCategory[]>([])
  const closeTimer = useRef<number>()
  const { hidden, scrolled } = useHeaderBehaviour()
  // Render breakpoint-only chrome only when it can actually be seen; this keeps
  // the mobile DOM (and its mount cost) much smaller.
  const isSm = useMediaQuery('(min-width: 640px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
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
  const featuredService = serviceCategories
    .find((c) => c.slug === 'immigration')
    ?.services.find((s) => s.slug === 'golden-visa')
  const socialHref = (id: string) => siteConfig.socials.find((social) => social.id === id)?.href ?? '#'

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return
    if (serviceCategories.length) return
    let alive = true
    import('@/data/services')
      .then((mod) => {
        if (alive) setServiceCategories(mod.serviceCategories as NavCategory[])
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [megaOpen, mobileOpen, serviceCategories.length])

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
      {isMd && (
      <div className="relative z-10 border-b border-ivory/10 bg-navy">
        <div className="container-x flex h-9 items-center justify-between gap-4 text-[0.68rem] text-ivory/60">
          <div className="flex min-w-0 items-center gap-4">
            <a href={mailLink()} className="inline-flex items-center gap-1.5 truncate transition-colors hover:text-softgold">
              <Mail size={12} className="shrink-0" /> {siteConfig.contact.email}
            </a>
            <span className="hidden h-3 w-px shrink-0 bg-ivory/15 lg:block" />
            <span className="hidden items-center gap-1.5 lg:inline-flex">
              <Clock size={12} className="shrink-0 text-gold/70" /> {siteConfig.contact.hours}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-softgold"
            >
              <WhatsAppIcon size={13} className="text-[#25D366]" /> WhatsApp
            </a>
            <a
              href={phoneLink()}
              className="inline-flex items-center gap-1.5 font-semibold text-ivory/80 transition-colors hover:text-softgold"
            >
              <Phone size={12} /> {siteConfig.contact.phoneDisplay}
            </a>
            <span className="h-3 w-px bg-ivory/15" />
            <div className="flex items-center gap-0.5">
              <a
                href={socialHref('instagram')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-ivory/10 hover:text-softgold"
              >
                <Instagram size={13} />
              </a>
              <a
                href={socialHref('meta')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meta"
                className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-ivory/10 hover:text-softgold"
              >
                <MetaIcon size={14} />
              </a>
              <a
                href={socialHref('facebook')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-ivory/10 hover:text-softgold"
              >
                <Facebook size={13} />
              </a>
              <a
                href={socialHref('linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-ivory/10 hover:text-softgold"
              >
                <Linkedin size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
      )}

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
            'relative border-b transition-all duration-300',
            solid ? 'header-solid border-[color:var(--hair)] shadow-[0_10px_30px_-24px_rgba(10,26,58,0.5)]' : 'border-transparent bg-transparent',
          )}
          onMouseLeave={closeMega}
        >
          {!solid && (
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-navy/85 via-navy/40 to-transparent"
              aria-hidden="true"
            />
          )}
        <div className="container-x flex h-[78px] items-center gap-3 lg:gap-5">
          <div className="shrink-0">
            <Logo tone={lightText ? 'light' : 'dark'} />
          </div>

          {isXl && (
          <nav className="flex items-center gap-0.5" aria-label="Primary">
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
          )}

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
            {isSm && (
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('a11y.toggleLang')}
              className={cn(
                'flex h-9 items-center gap-1 rounded-full px-2.5 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors',
                lightText ? 'text-ivory/75 hover:bg-ivory/10 hover:text-ivory' : 'text-muted hover:bg-[color:var(--surface-2)] hover:text-ink',
              )}
            >
              <Globe size={13} />
              {i18n.language?.startsWith('ar') ? 'AR' : 'EN'}
            </button>
            )}
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
            {isLg && (
            <div className="block">
              <ButtonAnchor
                href={consultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                size="sm"
                className="!px-4"
              >
                {t('cta.bookShort')}
              </ButtonAnchor>
            </div>
            )}
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
        {megaOpen && (
            <div
              id="services-mega"
              className="anim-drop absolute inset-x-0 top-full hidden border-t border-[color:var(--hair)] bg-[color:var(--surface)] shadow-lift xl:block"
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
                          <Suspense fallback={<span className="block h-full w-full bg-navy" />}>
                            <ArtFrame
                              seed="mega-golden-visa"
                              imageKey="service-immigration-golden-visa"
                              style="crystals"
                              alt="UAE Golden Visa advisory"
                              animate
                              rounded="rounded-none"
                              className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                            />
                          </Suspense>
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
            </div>
          )}
      </div>

      {/* Mobile menu — rendered in a portal so the header's transform cannot clip it */}
      {typeof document !== 'undefined' &&
        createPortal(
          mobileOpen && (
          <div
            className="anim-fade fixed inset-0 z-[140] flex h-[100dvh] flex-col bg-navy text-ivory xl:hidden"
          >
            <div className="container-x flex h-[78px] shrink-0 items-center justify-between border-b border-ivory/10">
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
                      {openCategory !== null && (
                          <div className="overflow-hidden">

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
                          </div>
                        )}
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
              <ButtonAnchor
                href={consultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                {t('cta.book')} <ArrowRight size={15} />
              </ButtonAnchor>
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
          </div>
          ),
          document.body,
        )}
    </header>
  )
}
