/** Metadata for the free interactive tools. */
export const tools = [
  {
    slug: 'document-checklist',
    title: 'Visa & Document Checklist',
    short: 'Generate the exact document list for your route.',
    description:
      'Choose a visa or setup route and get a grouped, printable checklist. Tick items as you collect them — progress is saved in your browser.',
    icon: 'ListChecks',
    time: '2 minutes',
    tag: 'Most used',
  },
  {
    slug: 'company-cost',
    title: 'Company Setup Cost Estimator',
    short: 'Compare UAE free zone and mainland costs over time.',
    description:
      'Model licence, establishment, visa and office costs for the UAE, then see the three-year total so the cheapest year one is not mistaken for the cheapest company.',
    icon: 'Calculator',
    time: '3 minutes',
    tag: 'Founders',
  },
  {
    slug: 'study-budget',
    title: 'Study Abroad Budget Calculator',
    short: 'Estimate tuition, living and travel for eight destinations.',
    description:
      'Compare total study costs across the UK, Estonia, Germany, the Netherlands, the US, the UAE, India and Pakistan, including scholarships and annual flights.',
    icon: 'GraduationCap',
    time: '3 minutes',
    tag: 'Students',
  },
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    short: 'AED, USD, GBP, EUR, SAR, INR and PKR.',
    description:
      'Convert between the currencies our clients use most, with a clear rate line and swap control. Reference rates only — confirm with your bank before transacting.',
    icon: 'Banknote',
    time: '30 seconds',
    tag: 'Quick',
  },
  {
    slug: 'business-hours',
    title: 'Time Zone & Business Hours',
    short: 'See which offices are open right now.',
    description:
      'Live local times for all nine offices, with open or closed status, hours and the next practical window to call.',
    icon: 'Clock',
    time: 'Live',
    tag: 'Global',
  },
  {
    slug: 'eligibility-check',
    title: 'Eligibility Quick Check',
    short: 'A first, honest read on your likely route.',
    description:
      'Answer a few questions about your goal, funds, qualifications and English level to see an indicative eligibility band and the next step we would recommend.',
    icon: 'BadgeCheck',
    time: '2 minutes',
    tag: 'Guidance',
  },
]

export const getTool = (slug) => tools.find((t) => t.slug === slug) || null
