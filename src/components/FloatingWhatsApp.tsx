import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/utils/links'

/** Desktop floating WhatsApp button, positioned above the assistant launcher. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Hello RNS Global, I would like to speak to an advisor.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RNS Global on WhatsApp"
      className="fixed bottom-24 right-6 z-[108] hidden h-12 w-12 items-center justify-center rounded-full bg-[#1E9E6A] text-white shadow-lift transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle size={21} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1E9E6A]/30" />
    </a>
  )
}
