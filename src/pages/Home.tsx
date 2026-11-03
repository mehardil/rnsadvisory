import Seo from '@/components/Seo'
import ExitIntent from '@/components/ExitIntent'
import Hero from '@/sections/Hero'
import TrustStrip from '@/sections/TrustStrip'
import WhatWeDo from '@/sections/WhatWeDo'
import ServiceFinder from '@/sections/ServiceFinder'
import GlobalPresence from '@/sections/GlobalPresence'
import HowWeWork from '@/sections/HowWeWork'
import IndustriesSection from '@/sections/IndustriesSection'
import CaseStudiesSection from '@/sections/CaseStudiesSection'
import WhyUs from '@/sections/WhyUs'
import TestimonialsSection from '@/sections/TestimonialsSection'
import InsightsSection from '@/sections/InsightsSection'
import FaqSection from '@/sections/FaqSection'
import FinalCta from '@/sections/FinalCta'
import { homeFaqs } from '@/data/faqs'
import siteConfig from '@/config/siteConfig'
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/utils/seo'

export default function Home() {
  return (
    <>
      <Seo
        title={`${siteConfig.brand.name} — ${siteConfig.brand.tagline}`}
        description={siteConfig.brand.description}
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(homeFaqs)]}
      />
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <ServiceFinder />
      <GlobalPresence />
      <HowWeWork />
      <IndustriesSection />
      <CaseStudiesSection />
      <WhyUs />
      <TestimonialsSection />
      <InsightsSection />
      <FaqSection />
      <FinalCta />
      <ExitIntent />
    </>
  )
}
