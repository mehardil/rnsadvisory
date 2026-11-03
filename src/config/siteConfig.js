/**
 * RNS Global — single source of truth for brand, contact details and navigation.
 * Edit this file to re-brand the entire website. Components never hard-code
 * the company name, phone number, email or social links.
 */

export const siteConfig = {
  brand: {
    name: 'RNS Global',
    shortName: 'RNS',
    legalName: 'RNS Global Advisory FZE',
    tagline: 'Expertise Without Borders.',
    subline:
      'Education. Travel. Business. Finance. Legal. Technology. One trusted partner across 8 regions.',
    description:
      'RNS Global is a one-stop advisory and consultancy firm for individuals, families, students, founders, investors and corporations. We connect education, travel, immigration, business setup, finance, legal, trade, technology and real estate into one accountable partnership.',
    founded: 2011,
    years: 15,
    regions: 8,
    offices: 9,
    services: 71,
    website: 'https://rnsglobal.example',
    streetAddress: 'Level 21, Emirates Financial Towers, DIFC',
    city: 'Dubai',
    country: 'United Arab Emirates',
    postalCode: 'PO Box 507251',
  },

  contact: {
    phone: '+923319051913',
    phoneDisplay: '+92 331 905 1913',
    phoneHref: 'tel:+923319051913',
    whatsapp: '923319051913',
    whatsappDisplay: '+92 331 905 1913',
    email: 'mehardil13302@gmail.com',
    emailHref: 'mailto:mehardil13302@gmail.com',
    hours: 'Monday–Saturday, 09:00–19:00 GST',
    hoursNote: 'We reply to every enquiry within four business hours.',
    responsePromise: 'A named advisor responds within 4 business hours.',
    emergencyLine: '+92 331 905 1913',
    calendlyNote: 'Consultations are held on Zoom, Google Meet or in person at our Dubai office.',
  },

  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/rns-global' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/rnsglobal' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/rnsglobal' },
    { id: 'x', label: 'X', href: 'https://x.com/rnsglobal' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@rnsglobal' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/923319051913' },
    { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@rnsglobal' },
  ],

  links: {
    book: '/contact#book',
    contact: '/contact',
    services: '/services',
    portal: '/portal',
    careers: '/careers',
    insights: '/insights',
    tools: '/tools',
    locations: '/locations',
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services', mega: true },
    { label: 'Industries', to: '/industries' },
    { label: 'About', to: '/about' },
    { label: 'Locations', to: '/locations' },
    { label: 'Insights', to: '/insights' },
    { label: 'Tools', to: '/tools' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],

  announcements: [
    {
      id: 'free-consult-q4',
      text: 'Free first consultation for students and entrepreneurs.',
      cta: 'Claim your session',
      to: '/contact',
    },
  ],

  stats: [
    { value: 8, suffix: '', label: 'Regions', note: 'One coordinated team' },
    { value: 71, suffix: '+', label: 'Services', note: 'Under one roof' },
    { value: 4800, suffix: '+', label: 'Clients served', note: 'Since 2011' },
    { value: 96, suffix: '%', label: 'Success rate', note: 'Across visa & setup' },
    { value: 15, suffix: '', label: 'Years', note: 'Of cross-border work' },
  ],

  trustLogos: [
    'DIFC',
    'Jebel Ali Free Zone',
    'Invest Saudi',
    'Enterprise Estonia',
    'British Council',
    'HSBC',
    'Emirates NBD',
    'Middlesex University',
    'University of Tallinn',
    'DP World',
  ],

  currencies: [
    { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'SAR', symbol: '﷼', label: 'Saudi Riyal' },
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'PKR', symbol: '₨', label: 'Pakistani Rupee' },
  ],

  languages: [
    { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
    { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  ],

  trustBadges: [
    { label: 'Licensed by Dubai DED', note: 'Trade licence no. 883421' },
    { label: 'ISO 9001:2015 aligned', note: 'Quality management' },
    { label: 'ICE Member', note: 'Immigration consultants' },
    { label: 'GDPR-ready', note: 'Data protection by design' },
    { label: 'JAFZA Partner', note: 'Jebel Ali operations hub' },
  ],

  footer: {
    description:
      'A single advisory partner for life, study, business and growth — combining local knowledge in eight regions with one accountable team.',
    newsletterNote: 'Monthly briefings on visas, study destinations and market entry. No noise.',
    columns: {
      services: [
        { label: 'Study Abroad Counselling', to: '/services/education/study-abroad-counselling' },
        { label: 'UAE Golden Visa', to: '/services/immigration/golden-visa' },
        { label: 'Dubai Free Zone Company', to: '/services/business-setup/uae-free-zone-company' },
        { label: 'UAE Corporate Tax & VAT', to: '/services/finance/tax-vat-compliance' },
        { label: 'Business Valuation', to: '/services/strategy/business-valuation' },
        { label: 'Jebel Ali Warehousing', to: '/services/trade/jebel-ali-warehousing' },
        { label: 'Executive Search', to: '/services/hr/executive-search' },
        { label: 'Web & App Development', to: '/services/technology/web-app-development' },
        { label: 'Property Investment Advisory', to: '/services/real-estate/property-investment' },
        { label: 'Family Office Services', to: '/services/specialised/family-office' },
      ],
      company: [
        { label: 'About RNS Global', to: '/about' },
        { label: 'Leadership', to: '/about#leadership' },
        { label: 'Careers', to: '/careers' },
        { label: 'Insights', to: '/insights' },
        { label: 'Case Studies', to: '/case-studies' },
        { label: 'FAQs', to: '/contact#faq' },
        { label: 'Partners', to: '/about#partners' },
        { label: 'Client Portal', to: '/portal' },
      ],
      legal: [
        { label: 'Privacy Policy', to: '/legal/privacy' },
        { label: 'Terms of Service', to: '/legal/terms' },
        { label: 'Cookie Policy', to: '/legal/cookies' },
        { label: 'Disclaimer', to: '/legal/disclaimer' },
        { label: 'Sitemap', to: '/sitemap' },
      ],
    },
  },
}

export const fullAddress = `${siteConfig.brand.streetAddress}, ${siteConfig.brand.city}, ${siteConfig.brand.country}`

export default siteConfig
