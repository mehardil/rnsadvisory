import { whatsappLink } from '@/utils/links'
import { WhatsAppIcon } from './SocialIcons'

/** Desktop floating WhatsApp button, docked below the header at the top-right. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Hello RNS Global Partners, I would like to speak to an advisor.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RNS Global Partners on WhatsApp"
      className="fixed right-5 top-[9.5rem] z-[108] hidden h-14 w-14 items-center justify-center rounded-full bg-[#1E9E6A] text-white shadow-lift transition-transform hover:scale-105 md:flex min-[1400px]:top-28"
    >
      <WhatsAppIcon size={28} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1E9E6A]/30" />
    </a>
  )
}
