import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Youtube,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import siteConfig from '@/config/siteConfig'
import { locations } from '@/data/locations'
import { useUIStore } from '@/store/useUIStore'
import { mailLink, phoneLink, whatsappLink } from '@/utils/links'
import GenerativeArt from './GenerativeArt'
import Logo from './Logo'
import NewsletterForm from './NewsletterForm'
import CTASection from './CTASection'

const socialIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  whatsapp: MessageCircle,
  tiktok: Music2,
}

export default function Footer() {
  const { t, i18n } = useTranslation()
  const currency = useUIStore((s) => s.currency)
  const setCurrency = useUIStore((s) => s.setCurrency)
  const location = useLocation()
  const [year] = useState(new Date().getFullYear())

  const scrollTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative isolate overflow-hidden bg-navy text-ivory">
      {location.pathname !== '/' && <CTASection />}

      <div className="relative border-t border-gold/35">
        <GenerativeArt
          seed="footer-network"
          style="particles"
          animate={false}
          className="absolute inset-0 h-full w-full opacity-25"
          label=""
        />
        <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
        <div className="container-x relative py-14 md:py-16">
          <button
            type="button"
            onClick={scrollTop}
            className="absolute right-5 top-6 inline-flex items-center gap-1.5 rounded-full border border-ivory/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/55 transition-colors hover:border-gold hover:text-softgold md:right-8"
          >
            <ArrowUp size={12} /> {t('cta.backToTop')}
          </button>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Logo tone="light" linked />
              <p className="mt-5 max-w-xs text-[0.8rem] leading-relaxed text-ivory/55">{siteConfig.footer.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {siteConfig.socials.map((social) => {
                  const Icon = socialIcons[social.id]
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/12 text-ivory/55 transition-all hover:border-gold/50 hover:text-softgold"
                    >
                      {Icon ? <Icon size={14} /> : <span className="text-[11px] font-semibold">𝕏</span>}
                    </a>
                  )
                })}
              </div>
              <div className="mt-7">
                <p className="mono-label !text-softgold">{t('footer.newsletter')}</p>
                <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ivory/45">{siteConfig.footer.newsletterNote}</p>
                <div className="mt-3 max-w-xs">
                  <NewsletterForm tone="dark" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-softgold">{t('footer.services')}</h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.footer.columns.services.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-[0.76rem] text-ivory/55 transition-colors hover:text-softgold">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/services" className="inline-flex items-center gap-1 text-[0.76rem] font-semibold text-softgold">
                    {t('nav.allServices')} →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-softgold">{t('footer.company')}</h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.footer.columns.company.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-[0.76rem] text-ivory/55 transition-colors hover:text-softgold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-softgold">{t('footer.offices')}</h3>
              <ul className="mt-4 space-y-2.5">
                {locations.map((office) => (
                  <li key={office.id}>
                    <Link
                      to={`/locations#${office.id}`}
                      className="group flex items-start gap-1.5 text-[0.76rem] text-ivory/55 transition-colors hover:text-softgold"
                    >
                      <span aria-hidden="true" className="mt-px text-[0.7rem]">{office.flag}</span>
                      <span>
                        {office.city}
                        {office.isHQ && <span className="ms-1 text-[8px] font-semibold uppercase tracking-wider text-gold">HQ</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-softgold">{t('footer.contact')}</h3>
              <ul className="mt-4 space-y-3 text-[0.78rem]">
                <li>
                  <a href={phoneLink()} className="group flex items-start gap-2.5 text-ivory/60 hover:text-softgold">
                    <Phone size={14} className="mt-0.5 shrink-0 text-gold/70" />
                    <span>
                      {siteConfig.contact.phoneDisplay}
                      <span className="block text-[0.66rem] text-ivory/35">Phone & WhatsApp</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={mailLink()} className="group flex items-start gap-2.5 text-ivory/60 hover:text-softgold">
                    <Mail size={14} className="mt-0.5 shrink-0 text-gold/70" />
                    <span className="break-all">{siteConfig.contact.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-ivory/60">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gold/70" />
                  <span>
                    {siteConfig.brand.streetAddress}, {siteConfig.brand.city}
                    <span className="block text-[0.66rem] text-ivory/35">{siteConfig.brand.country}</span>
                  </span>
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3 py-1.5 text-[0.72rem] text-ivory/65 hover:border-gold/50 hover:text-softgold"
                  >
                    <MessageCircle size={13} /> Chat on WhatsApp
                  </a>
                </li>
              </ul>
              <p className="mt-4 border-t border-ivory/10 pt-3 text-[0.68rem] leading-relaxed text-ivory/35">
                {siteConfig.contact.hours}
                <br />
                {siteConfig.contact.responsePromise}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-ivory/10 pt-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/30">Trust &amp; licences</span>
            {siteConfig.trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="rounded-full border border-ivory/10 px-2.5 py-1 text-[0.64rem] text-ivory/45"
                title={badge.note}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-ivory/10 bg-[#071227]">
        <div className="container-x flex flex-col gap-4 py-5 text-[0.7rem] text-ivory/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.brand.legalName}. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {siteConfig.footer.columns.legal.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors hover:text-softgold">
                {link.label}
              </Link>
            ))}
            <span className="hidden h-3 w-px bg-ivory/15 md:inline-block" />
            <label className="sr-only" htmlFor="footer-language">
              {t('common.language')}
            </label>
            <select
              id="footer-language"
              value={i18n.language?.startsWith('ar') ? 'ar' : 'en'}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              className="rounded border border-ivory/15 bg-transparent px-2 py-1 text-[0.68rem] text-ivory/60 outline-none"
            >
              {siteConfig.languages.map((language) => (
                <option key={language.code} value={language.code} className="bg-navy">
                  {language.label}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="footer-currency">
              {t('common.currency')}
            </label>
            <select
              id="footer-currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="rounded border border-ivory/15 bg-transparent px-2 py-1 text-[0.68rem] text-ivory/60 outline-none"
            >
              {siteConfig.currencies.map((item) => (
                <option key={item.code} value={item.code} className="bg-navy">
                  {item.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
