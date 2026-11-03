import { Link } from 'react-router-dom'
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '@/config/siteConfig'
import { whatsappLink, phoneLink } from '@/utils/links'

/** Sticky mobile action bar. Always one tap from a human. */
export default function MobileBottomBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-ivory/10 bg-navy/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3">
        <a
          href={phoneLink()}
          className="flex flex-col items-center gap-1 py-2.5 text-[0.62rem] font-medium text-ivory/70 transition-colors hover:text-softgold"
          aria-label={`Call ${siteConfig.brand.name}`}
        >
          <Phone size={17} />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-ivory/10 py-2.5 text-[0.62rem] font-medium text-ivory/70 transition-colors hover:text-softgold"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={17} />
          WhatsApp
        </a>
        <Link
          to="/contact#book"
          className="flex flex-col items-center gap-1 bg-gold py-2.5 text-[0.62rem] font-semibold text-navy"
        >
          <CalendarCheck size={17} />
          Book
        </Link>
      </div>
    </nav>
  )
}
