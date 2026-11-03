/**
 * Industries — used on the home page, the industries index and detail pages.
 * Each industry references service slugs so recommendations stay consistent.
 */

export const industries = [
  {
    slug: 'education',
    title: 'Education',
    icon: 'GraduationCap',
    tagline: 'Students, schools and universities',
    description:
      'Recruitment, admissions support, student visas and institutional partnerships across eight study destinations.',
    longDescription:
      'Education is where most of our client relationships begin. We support students and families through admissions, funding and visas, and we work with schools and universities on recruitment, market entry and student services. Our counsellors are measured on outcomes, not enrolment commissions.',
    services: ['study-abroad-counselling', 'university-admissions', 'student-visa', 'scholarship-guidance', 'k12-school-admissions'],
    stats: [
      { label: 'Students placed', value: '2,400+' },
      { label: 'Partner institutions', value: '180+' },
      { label: 'Visa success', value: '96%' },
    ],
    trends: ['Demand shifting toward Europe and Estonia', 'Families prioritising post-study work rights', 'Rising scrutiny of financial evidence'],
  },
  {
    slug: 'travel-tourism',
    title: 'Travel & Tourism',
    icon: 'Plane',
    tagline: 'Leisure, pilgrimage and corporate travel',
    description:
      'Curated itineraries, visa support, pilgrimage travel and MICE coordination with 24/7 in-trip assistance.',
    longDescription:
      'Travel is a trust business. We plan itineraries with realistic pacing, verify every supplier and stay reachable while you are away. Corporate clients get consolidated reporting and a single coordinator for groups, conferences and incentives.',
    services: ['tour-packages', 'tourist-visa', 'corporate-mice-travel', 'umrah-hajj', 'medical-tourism'],
    stats: [
      { label: 'Travellers served', value: '6,100+' },
      { label: 'Destinations', value: '42' },
      { label: 'Repeat clients', value: '68%' },
    ],
    trends: ['Experiential and multi-generational travel', 'Gulf as a hub for MICE', 'Visa appointment scarcity in peak season'],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    icon: 'Home',
    tagline: 'Investment, management and delivery',
    description:
      'Net-yield modelling, off-plan due diligence, property management and owner-side project management.',
    longDescription:
      'We treat property as an asset class, not a sales target. Buyers see net yield after fees, service charges and vacancy. Owners get transparent management. Developers get owner-side project management that protects cost and quality.',
    services: ['property-investment', 'property-management', 'construction-project-management', 'interior-design-consultancy'],
    stats: [
      { label: 'Property value advised', value: '$310M' },
      { label: 'Units managed', value: '540+' },
      { label: 'Projects delivered', value: '75' },
    ],
    trends: ['Off-plan payment plans under scrutiny', 'Rising service-charge sensitivity', 'London and Dubai cross-border ownership'],
  },
  {
    slug: 'trading-logistics',
    title: 'Trading & Logistics',
    icon: 'Container',
    tagline: 'Move goods with fewer surprises',
    description:
      'Import-export advisory, customs coordination, Jebel Ali warehousing and fulfilment for regional distribution.',
    longDescription:
      'Trade margins disappear in demurrage, misclassification and stockouts. We model landed cost, prepare documentation and run warehousing and fulfilment from Jebel Ali so goods move predictably through the GCC.',
    services: ['import-export-advisory', 'customs-clearance', 'jebel-ali-warehousing', 'supply-chain-optimization', 'ecommerce-fulfilment'],
    stats: [
      { label: 'Shipments coordinated', value: '9,800+' },
      { label: 'Warehouse sqm', value: '12,000' },
      { label: 'On-time dispatch', value: '99.2%' },
    ],
    trends: ['Bonded e-commerce fulfilment growth', 'Supplier diversification away from single markets', 'Customs digitisation in the UAE'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'HeartPulse',
    tagline: 'Licensing, access and medical travel',
    description:
      'Facility licensing, practitioner credentialing, medical tourism coordination and healthcare market entry.',
    longDescription:
      'Healthcare clients need regulatory certainty and operational realism. We manage licensing with DHA, DOH and MOHAP, coordinate credentialing and support medical-travel logistics for international patients.',
    services: ['healthcare-licensing', 'medical-tourism', 'market-entry', 'hr-payroll-wps'],
    stats: [
      { label: 'Licences secured', value: '120+' },
      { label: 'Practitioners credentialed', value: '460+' },
      { label: 'Avg. approval time', value: '11 weeks' },
    ],
    trends: ['Telehealth licensing maturing', 'Rising demand for specialised clinics', 'Medical tourism competition from Asia'],
  },
  {
    slug: 'technology-startups',
    title: 'Technology & Startups',
    icon: 'Cpu',
    tagline: 'Build, raise and scale',
    description:
      'Company formation, fundraising, product builds, AI adoption and cybersecurity for founders and tech teams.',
    longDescription:
      'Founders need advice that understands burn rate and board dynamics. We combine entity setup, fundraising preparation, product engineering and security reviews, with introductions to funds and family offices that match your stage.',
    services: ['uae-free-zone-company', 'fundraising-venture-capital', 'web-app-development', 'ai-data-analytics', 'cybersecurity-advisory'],
    stats: [
      { label: 'Startups supported', value: '310+' },
      { label: 'Capital introduced', value: '$85M' },
      { label: 'Products shipped', value: '140' },
    ],
    trends: ['AI-native products becoming table stakes', 'Investors demanding clearer unit economics', 'Estonia and UAE as complementary bases'],
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    icon: 'ShoppingBag',
    tagline: 'Sell across borders, profitably',
    description:
      'Market entry, fulfilment, brand and performance marketing for retail and e-commerce brands in the GCC and Europe.',
    longDescription:
      'Cross-border retail fails on returns, duties and last-mile cost. We model the full cost-to-serve, set up fulfilment from Jebel Ali and build brand and performance programmes with honest attribution.',
    services: ['ecommerce-fulfilment', 'import-export-advisory', 'branding-digital-marketing', 'market-entry', 'us-llc-formation'],
    stats: [
      { label: 'Brands scaled', value: '95+' },
      { label: 'Avg. fulfilment accuracy', value: '99.6%' },
      { label: 'Markets served', value: '14' },
    ],
    trends: ['Social commerce in the Gulf', 'Faster delivery expectations', 'Rising returns-management focus'],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    icon: 'Factory',
    tagline: 'Cost, compliance and expansion',
    description:
      'Feasibility, industrial licensing, supply-chain optimisation and workforce mobilisation for manufacturers.',
    longDescription:
      'Manufacturers operate on thin margins and long lead times. We support feasibility and site selection, licensing, supplier diversification, workforce mobilisation and operational improvement.',
    services: ['feasibility-study', 'supply-chain-optimization', 'overseas-manpower', 'operational-excellence', 'energy-renewable-advisory'],
    stats: [
      { label: 'Plants advised', value: '48' },
      { label: 'Cost savings identified', value: '$22M' },
      { label: 'Countries served', value: '9' },
    ],
    trends: ['Nearshoring and supplier diversification', 'Energy cost pressure', 'Automation and skills gaps'],
  },
  {
    slug: 'energy',
    title: 'Energy',
    icon: 'Zap',
    tagline: 'Transition with a business case',
    description:
      'Renewable feasibility, procurement, offtake modelling and regulatory navigation for energy projects.',
    longDescription:
      'Energy decisions are capital-intensive and politically sensitive. We build the commercial case, structure procurement and coordinate technical partners, so investment decisions are grounded in real offtake and cost assumptions.',
    services: ['energy-renewable-advisory', 'feasibility-study', 'market-entry', 'esg-sustainability'],
    stats: [
      { label: 'Projects assessed', value: '35' },
      { label: 'MW evaluated', value: '740' },
      { label: 'Capital unlocked', value: '$140M' },
    ],
    trends: ['Solar economics improving', 'Corporate PPA demand', 'ESG disclosure pressure from lenders'],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality & F&B',
    icon: 'UtensilsCrossed',
    tagline: 'Open, staff and grow venues',
    description:
      'Licensing, staffing, fit-out and market entry for hotels, restaurants and leisure operators.',
    longDescription:
      'Hospitality is operationally unforgiving. We support licence and fit-out delivery, staffing and payroll compliance, brand positioning and expansion into new cities across the Gulf and Europe.',
    services: ['market-entry', 'mass-recruitment', 'interior-design-consultancy', 'hr-payroll-wps', 'branding-digital-marketing'],
    stats: [
      { label: 'Venues supported', value: '190+' },
      { label: 'Staff placed', value: '3,200+' },
      { label: 'Cities covered', value: '12' },
    ],
    trends: ['Experiential dining demand', 'Staff retention and housing costs', 'Franchise expansion into the Gulf'],
  },
  {
    slug: 'financial-services',
    title: 'Financial Services',
    icon: 'Landmark',
    tagline: 'Structure, comply and raise',
    description:
      'Regulatory compliance, AML frameworks, fundraising support and corporate structuring for financial firms.',
    longDescription:
      'Financial services clients face the highest compliance bar. We support licensing pathways, AML and KYC frameworks, data privacy, fundraising and holding structures, working with licensed counsel and auditors.',
    services: ['aml-kyc-compliance', 'fundraising-venture-capital', 'tax-vat-compliance', 'data-privacy-gdpr', 'ma-due-diligence'],
    stats: [
      { label: 'Firms advised', value: '70+' },
      { label: 'Assessments delivered', value: '210' },
      { label: 'Regulatory findings closed', value: '100%' },
    ],
    trends: ['Stricter beneficial-ownership scrutiny', 'AI governance in financial products', 'Cross-border licensing complexity'],
  },
  {
    slug: 'construction',
    title: 'Construction',
    icon: 'HardHat',
    tagline: 'Deliver on cost and programme',
    description:
      'Owner-side project management, procurement, workforce supply and feasibility for built assets.',
    longDescription:
      'Construction risk sits in interfaces: design, procurement, permits and trades. We represent owners across these interfaces, keeping cost and programme visible and decisions documented.',
    services: ['construction-project-management', 'feasibility-study', 'overseas-manpower', 'interior-design-consultancy', 'contract-drafting'],
    stats: [
      { label: 'Projects managed', value: '75' },
      { label: 'Portfolio value', value: '$260M' },
      { label: 'On-programme delivery', value: '88%' },
    ],
    trends: ['Fit-out demand in the Gulf', 'Material cost volatility', 'Labour compliance scrutiny'],
  },
  {
    slug: 'government-ngos',
    title: 'Government & NGOs',
    icon: 'Building',
    tagline: 'Public impact, measured',
    description:
      'Policy support, service design, governance, grant strategy and impact measurement for public bodies.',
    longDescription:
      'Public and non-profit clients need credible evidence and transparent process. We support strategy, service design, governance and funding, with reporting that satisfies boards, donors and regulators.',
    services: ['government-advisory', 'ngo-advisory', 'esg-sustainability', 'corporate-training', 'data-privacy-gdpr'],
    stats: [
      { label: 'Public programmes', value: '32' },
      { label: 'NGOs supported', value: '60+' },
      { label: 'Funding secured', value: '$18M' },
    ],
    trends: ['Outcome-based funding', 'Digital service delivery', 'ESG and donor transparency'],
  },
  {
    slug: 'agriculture-food',
    title: 'Agriculture & Food',
    icon: 'Wheat',
    tagline: 'From farm to shelf',
    description:
      'Sourcing, food-trade compliance, cold-chain guidance and market entry for agriculture and food businesses.',
    longDescription:
      'Food trade is a documentation and cold-chain business. We support sourcing from India, Pakistan and Europe, labelling and compliance, cold-chain and bonded storage guidance, and entry into Gulf retail.',
    services: ['import-export-advisory', 'jebel-ali-warehousing', 'supply-chain-optimization', 'market-entry', 'customs-clearance'],
    stats: [
      { label: 'Food clients', value: '85+' },
      { label: 'Containers coordinated', value: '1,900+' },
      { label: 'Markets entered', value: '6' },
    ],
    trends: ['Food-security investment in the GCC', 'Stricter labelling enforcement', 'Cold-chain capacity growth'],
  },
]

export const getIndustry = (slug) => industries.find((i) => i.slug === slug) || null
