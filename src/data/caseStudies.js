/**
 * Case studies — before/after metrics for the home page and case studies page.
 */
export const caseStudies = [
  {
    slug: 'fintech-uae-licence',
    title: 'From three jurisdictions to one regulated UAE base',
    client: 'Payments startup',
    sector: 'Technology & Startups',
    location: 'London → Dubai',
    services: ['uae-mainland-company', 'aml-kyc-compliance', 'bank-account-opening'],
    challenge:
      'A payments startup had an operating company in the UK, a contractor entity in Estonia and a growing Gulf customer base with no local presence. Banking had stalled twice and the board needed a compliant regional entity before a Series A.',
    approach:
      'We mapped the regulatory perimeter, recommended a mainland entity for regional contracting, prepared the AML and KYC framework, and built the banking pack around a clear source-of-funds narrative.',
    duration: '11 weeks',
    metrics: [
      { label: 'Banking applications', before: '2 refused', after: 'Approved first attempt' },
      { label: 'Licensing timeline', before: 'Est. 5 months', after: '11 weeks' },
      { label: 'Compliance findings', before: '14 open', after: '0 open' },
    ],
    quote: 'They understood the bank’s risk team better than our own advisers did.',
    featured: true,
  },
  {
    slug: 'education-cohort-estonia',
    title: '42 students, three intakes, zero missed departures',
    client: 'Private college group',
    sector: 'Education',
    location: 'Pakistan & India → Estonia',
    services: ['university-admissions', 'student-visa', 'scholarship-guidance'],
    challenge:
      'A college group wanted to build a credible Estonia pathway but had no admissions infrastructure, no visa expertise and a tight September intake deadline.',
    approach:
      'We built a shortlist of accredited programmes, ran document clinics in Lahore and Mumbai, prepared visa files with financial-evidence reviews, and coordinated pre-departure briefings.',
    duration: '6 months',
    metrics: [
      { label: 'Students placed', before: '0', after: '42' },
      { label: 'Visa approval rate', before: '—', after: '95%' },
      { label: 'Missed intakes', before: '—', after: '0' },
    ],
    quote: 'The difference was preparation. Every file was complete before it reached the embassy.',
    featured: true,
  },
  {
    slug: 'jebel-ali-fulfilment',
    title: 'Cutting GCC delivery time from nine days to two',
    client: 'Beauty e-commerce brand',
    sector: 'Retail & E-commerce',
    location: 'London → Jebel Ali',
    services: ['ecommerce-fulfilment', 'customs-clearance', 'jebel-ali-warehousing'],
    challenge:
      'A UK beauty brand shipped every Gulf order from the UK. Delivery took up to nine days, returns were expensive and stock was frequently unavailable.',
    approach:
      'We onboarded inventory into Jebel Ali, integrated Shopify, negotiated courier rates and set up a returns workflow with refurbishment and restocking.',
    duration: '7 weeks',
    metrics: [
      { label: 'Average delivery', before: '9 days', after: '2 days' },
      { label: 'Cost per order', before: '$14.20', after: '$6.80' },
      { label: 'Stockouts', before: '18%', after: '3%' },
    ],
    quote: 'The regional warehouse paid for itself in the first quarter.',
    featured: true,
  },
  {
    slug: 'family-succession-gcc',
    title: 'A family constitution before the next generation arrived',
    client: 'Second-generation trading family',
    sector: 'Trading & Logistics',
    location: 'Dubai & Mumbai',
    services: ['family-succession-planning', 'business-valuation', 'corporate-strategy'],
    challenge:
      'Three siblings held equal shares but no governance. Decisions stalled, next-generation members wanted different roles, and there was no agreed process for dividends or exit.',
    approach:
      'We facilitated family sessions, produced a valuation, designed a holding structure with counsel and drafted a family constitution with clear decision rights and employment rules.',
    duration: '6 months',
    metrics: [
      { label: 'Governance', before: 'None', after: 'Constitution signed' },
      { label: 'Board decisions', before: 'Stalled', after: 'Monthly cadence' },
      { label: 'Next-gen roles', before: 'Undefined', after: '3 defined tracks' },
    ],
    quote: 'We stopped negotiating in WhatsApp groups and started running the business.',
  },
  {
    slug: 'golden-visa-family',
    title: 'A five-week Golden Visa for a family of four',
    client: 'Private investor family',
    sector: 'Real Estate',
    location: 'Riyadh → Dubai',
    services: ['golden-visa', 'property-investment', 'family-dependent-visa'],
    challenge:
      'The family had purchased an off-plan property but the valuation and developer documentation were inconsistent, and two dependants had mismatched name spellings across documents.',
    approach:
      'We corrected the document set, obtained a compliant valuation, prepared the nomination file and coordinated medicals and Emirates ID for all four applicants.',
    duration: '5 weeks',
    metrics: [
      { label: 'Processing time', before: 'Est. 12 weeks', after: '5 weeks' },
      { label: 'Resubmissions', before: '2', after: '0' },
      { label: 'Family approved', before: '1 of 4', after: '4 of 4' },
    ],
    quote: 'They found the name mismatch that two other agents missed.',
  },
  {
    slug: 'saudi-market-entry',
    title: 'A Saudi entry plan that survived contact with the market',
    client: 'European industrial manufacturer',
    sector: 'Manufacturing',
    location: 'Frankfurt → Riyadh',
    services: ['market-entry', 'saudi-company-formation', 'feasibility-study'],
    challenge:
      'The board had approved a distributor-led entry, but early conversations suggested the model would not meet Vision 2030 local-content expectations.',
    approach:
      'We tested demand with 23 interviews, remodelled the opportunity, and proposed a licensed entity with a local assembly partner. We then handled MISA licensing and Saudization planning.',
    duration: '5 months',
    metrics: [
      { label: 'Entry model', before: 'Distributor', after: 'Licensed entity + partner' },
      { label: 'Pipeline', before: '$1.2M', after: '$7.4M' },
      { label: 'Local content', before: '0%', after: '31%' },
    ],
    quote: 'The original plan would have failed quietly. This one gave us a real business.',
  },
]

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug) || null
