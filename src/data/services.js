/**
 * Service catalogue — the heart of RNS Global.
 * Every category and service page is generated from this file. To add a service,
 * append an object to the relevant category and it appears automatically in the
 * mega menu, services grid, search, sitemap and related-service rails.
 */

const processTemplates = {
  advisory: [
    { title: 'Discover', text: 'A structured conversation to understand the goal, constraints, timeline and what success looks like.' },
    { title: 'Diagnose', text: 'We review documents, market data and stakeholders, then surface the real decision points.' },
    { title: 'Design', text: 'You receive a written plan with options, costs, risks and a recommended route — no surprises.' },
    { title: 'Deliver', text: 'A named lead runs the workstream, coordinates specialists and reports progress every week.' },
    { title: 'Sustain', text: 'We stay available after handover for reviews, renewals and the next stage of growth.' },
  ],
  application: [
    { title: 'Eligibility review', text: 'We check your profile against current rules and flag any gaps before you spend money.' },
    { title: 'Strategy & shortlist', text: 'Together we choose the destinations, programmes or visa routes that genuinely fit.' },
    { title: 'Prepare', text: 'Documents, statements, forms and translations are drafted, checked and version-controlled.' },
    { title: 'Submit & track', text: 'We file on time, monitor the application and respond to requests for evidence quickly.' },
    { title: 'Arrive & settle', text: 'Pre-departure briefing, accommodation, banking and settling-in support once approved.' },
  ],
  setup: [
    { title: 'Scoping', text: 'We map ownership, activity, tax exposure and banking needs before recommending a structure.' },
    { title: 'Structure', text: 'Jurisdiction, licence type, shareholding and compliance obligations are agreed in writing.' },
    { title: 'Documentation', text: 'Applications, resolutions, attestations and KYC packs are prepared and quality-checked.' },
    { title: 'Execution', text: 'We file with the authority, open the bank account and handle objections on your behalf.' },
    { title: 'Handover', text: 'You receive the licence, registrations, compliance calendar and a named account manager.' },
  ],
  technical: [
    { title: 'Discovery', text: 'We audit the current stack, processes and data, then agree measurable outcomes.' },
    { title: 'Architecture', text: 'A pragmatic blueprint covering build, buy, security, integrations and total cost.' },
    { title: 'Build', text: 'Two-week sprints with demos, staging environments and clear acceptance criteria.' },
    { title: 'Launch', text: 'Migration, testing, training and a go-live checklist owned by a single delivery lead.' },
    { title: 'Optimise', text: 'Post-launch analytics, performance tuning and a support plan that matches your team.' },
  ],
}

const categoryDocs = {
  education: ['Valid passport (6+ months)', 'Academic transcripts and certificates', 'English test result (IELTS, PTE, TOEFL or Duolingo)', 'Statement of purpose and two references'],
  travel: ['Passport with 6+ months validity', 'Recent passport photographs', 'Confirmed itinerary or invitation letter', 'Travel insurance certificate'],
  immigration: ['Passport and current visa copies', 'Recent bank statements', 'Employment or business proof', 'Attested marriage and birth certificates (where relevant)'],
  'business-setup': ['Passport copies of all shareholders', 'Proof of address (utility bill or bank letter)', 'Proposed company names and activity list', 'Board resolution and KYC questionnaire'],
  strategy: ['Last three years of financial statements', 'Current operating model and org chart', 'Market and competitor data you already hold', 'A short brief on the decision to be made'],
  finance: ['Audited or management financial statements', 'Bank statements and debt schedule', 'Tax registrations and filings', 'Cap table and shareholder agreements (where relevant)'],
  legal: ['Contracts or policies under review', 'Trade licence and corporate documents', 'Relevant correspondence and notices', 'Identification of authorised signatories'],
  trade: ['Commercial invoice and packing list', 'Bill of lading or airway bill', 'Certificate of origin', 'Product compliance and labelling evidence'],
  hr: ['Approved job descriptions and headcount plan', 'Current employment contracts and policy handbook', 'Wage Protection System registration', 'Company trade licence and establishment card'],
  technology: ['Access to current systems and analytics', 'Brand guidelines and content inventory', 'Integration and security requirements', 'A named product owner on your side'],
  'real-estate': ['Title deed or sales agreement', 'Passport and proof of funds', 'Current lease or management agreement', 'Mortgage or developer NOC documents (where relevant)'],
  specialised: ['Organisation profile and licences', 'Regulatory correspondence', 'Financial and operational data', 'Board or founder objectives'],
}

const categoryProcessKey = {
  education: 'application',
  travel: 'application',
  immigration: 'application',
  'business-setup': 'setup',
  strategy: 'advisory',
  finance: 'advisory',
  legal: 'advisory',
  trade: 'setup',
  hr: 'advisory',
  technology: 'technical',
  'real-estate': 'advisory',
  specialised: 'advisory',
}

function buildPackages(service) {
  const base = service.priceFrom
  const tiers = [
    { name: 'Basic', multiplier: 1 },
    { name: 'Standard', multiplier: 1.9 },
    { name: 'Premium', multiplier: 3.2 },
  ]
  const inclusions = {
    Basic: ['Document checklist and eligibility review', 'One advisory session with a specialist', 'Written next-step plan', 'Email support for 14 days'],
    Standard: [
      'Everything in Basic',
      'Full preparation and submission handling',
      'Three revision rounds',
      'WhatsApp support for 60 days',
      'Priority scheduling',
    ],
    Premium: [
      'Everything in Standard',
      'Dedicated senior advisor',
      'Expedited processing where permitted',
      'Post-approval settling-in support',
      'Family or additional applicant add-ons',
    ],
  }
  return tiers.map((tier) => ({
    name: tier.name,
    price: Math.round((base * tier.multiplier) / 10) * 10,
    note: tier.name === 'Basic' ? 'Advisory only' : tier.name === 'Standard' ? 'Most chosen' : 'White-glove',
    inclusions: inclusions[tier.name],
  }))
}

function makeService(categoryId, data) {
  const processKey = categoryProcessKey[categoryId]
  const price = data.priceFrom
  return {
    ...data,
    categoryId,
    id: `${categoryId}/${data.slug}`,
    path: `/services/${categoryId}/${data.slug}`,
    icon: data.icon || null,
    process: processTemplates[processKey],
    documents: data.documents || categoryDocs[categoryId],
    packages: buildPackages(data),
    faqs: [
      ...(data.faqs || []),
      {
        q: 'How long does this take?',
        a: `A typical timeline is ${data.timeline}. We confirm exact dates in writing after the discovery call, and you always know what stage your file is at.`,
      },
      {
        q: 'What will it cost?',
        a: `Engagements start from $${price.toLocaleString('en-US')}. You receive a fixed written quote before any work begins. Government fees, third-party charges and translations are itemised separately and never marked up silently.`,
      },
    ],
  }
}

/* -------------------------------------------------------------------------- */
/* A. Education & study abroad                                                 */
/* -------------------------------------------------------------------------- */
const education = {
  id: 'education',
  slug: 'education',
  letter: 'A',
  title: 'Education & Study Abroad',
  short: 'Study abroad, admissions, scholarships and student visas.',
  description:
    'From the first shortlist to the first day of class, we guide students and families through admissions, funding, visas and settling in across the UK, Europe, Estonia, USA, UAE, India, Saudi Arabia and Pakistan.',
  icon: 'GraduationCap',
  destinations: ['United Kingdom', 'Europe', 'Estonia', 'United States', 'UAE', 'India', 'Saudi Arabia', 'Pakistan'],
  services: [
    {
      slug: 'study-abroad-counselling',
      title: 'Study Abroad Counselling',
      summary: 'An honest, end-to-end plan for where to study, what it costs and how to get there.',
      overview:
        'Most students start with a list of countries and end up with a spreadsheet of confusion. We begin with your grades, budget, career direction and family priorities, then build a realistic shortlist of programmes you can actually be admitted to and afford. You leave the first session with a written plan, not a sales pitch.',
      whoFor: ['Students in grades 10–12 planning their first degree', 'Graduates considering a master’s abroad', 'Parents who want one accountable point of contact'],
      benefits: [
        'A shortlist matched to grades, budget and career outcomes — not commission targets',
        'Transparent total cost of study, including living, travel and insurance',
        'One advisor coordinating admissions, visa, accommodation and arrival',
        'A written timeline so families know exactly what happens next',
      ],
      timeline: '2–6 weeks to a shortlist; 3–6 months end-to-end',
      priceFrom: 350,
      featured: true,
      tags: ['UK', 'Europe', 'Estonia', 'USA', 'scholarships'],
      faqs: [
        { q: 'Which destinations do you cover?', a: 'The UK, Europe (including Estonia, Germany and the Netherlands), the USA, UAE, India, Saudi Arabia and Pakistan. We only recommend a destination when it fits your profile and budget.' },
        { q: 'Can you help if my grades are average?', a: 'Yes. A large part of our work is finding credible pathways — foundation years, pathway programmes, polytechnics and strong regional universities — rather than pushing unrealistic applications.' },
      ],
    },
    {
      slug: 'university-admissions',
      title: 'University & Course Selection',
      summary: 'Applications prepared to the standard that competitive universities expect.',
      overview:
        'We manage the paperwork, deadlines and nuance of university applications — UCAS, Common App, direct European applications and postgraduate portals. Course selection is based on module content, accreditation and graduate outcomes, not just rankings.',
      whoFor: ['Undergraduate applicants using UCAS or Common App', 'Postgraduate applicants targeting competitive programmes', 'Transfer and foundation-year students'],
      benefits: [
        'Course-by-course comparison of modules, accreditation and outcomes',
        'Application portals completed accurately and on time',
        'Portfolio, interview and audition preparation where required',
        'Offer-holder support through conditions and deposits',
      ],
      timeline: '4–10 weeks depending on intake',
      priceFrom: 450,
      tags: ['UCAS', 'Common App', 'postgraduate'],
      faqs: [
        { q: 'Do you write my personal statement for me?', a: 'No. We interview you, help you find the strongest material and edit your drafts rigorously. The voice remains yours, which is exactly what admissions teams want to see.' },
      ],
    },
    {
      slug: 'scholarship-guidance',
      title: 'Scholarship Guidance',
      summary: 'Find, qualify for and submit funding applications that are actually winnable.',
      overview:
        'Scholarships are competitive, but most applicants apply to the wrong ones. We map merit, need-based and country-specific funding against your profile, then help you build a submission calendar and essays that meet each funder’s criteria.',
      whoFor: ['High-achieving students seeking merit awards', 'Families needing need-based funding', 'Postgraduate researchers seeking grants'],
      benefits: [
        'A curated funding list with eligibility and deadlines',
        'Essay and motivation-letter coaching for each funder',
        'Interview preparation for scholarship panels',
        'A realistic funding gap calculation before you commit',
      ],
      timeline: '3–8 weeks per funding cycle',
      priceFrom: 300,
      tags: ['funding', 'merit', 'need-based'],
      faqs: [
        { q: 'Can you guarantee a scholarship?', a: 'No ethical advisor can. We improve the quality and fit of your applications and tell you honestly where your chances are strong, moderate or unlikely.' },
      ],
    },
    {
      slug: 'student-visa',
      title: 'Student Visa Processing',
      summary: 'Compliant student visa filings with document checks, mock interviews and tracking.',
      overview:
        'A university offer is only half the journey. We prepare the financial evidence, CAS or acceptance letters, attestations and interview responses that visa officers assess. Every file is checked twice before submission.',
      whoFor: ['Students with a confirmed or conditional offer', 'Parents funding a student’s studies', 'Applicants with previous visa refusals'],
      benefits: [
        'Country-specific document checklist and financial evidence review',
        'Mock interviews and refusal-risk assessment',
        'Application tracking with proactive follow-up',
        'Pre-departure briefing covering arrival, banking and registration',
      ],
      timeline: '2–8 weeks depending on destination',
      priceFrom: 400,
      featured: true,
      tags: ['student visa', 'UK', 'USA', 'Estonia'],
      faqs: [
        { q: 'What if my visa is refused?', a: 'We analyse the refusal letter, address the specific grounds and advise on reapplication or an alternative route. Our standard package includes one refusal review at no extra fee.' },
      ],
    },
    {
      slug: 'test-preparation',
      title: 'IELTS, PTE, TOEFL & Duolingo Guidance',
      summary: 'Diagnostic-led test preparation focused on the score you actually need.',
      overview:
        'We start with a diagnostic, identify the two or three sub-scores holding you back, and build a short, disciplined study plan. Sessions are practical and available online, with progress checks every fortnight.',
      whoFor: ['Students needing a specific band for admission', 'Professionals needing an English score for a visa', 'Repeat test-takers stuck on one component'],
      benefits: [
        'Diagnostic assessment and personalised study plan',
        'Targeted coaching on writing and speaking',
        'Full mock tests with examiner-style feedback',
        'Booking guidance and score-report planning',
      ],
      timeline: '4–10 weeks',
      priceFrom: 250,
      tags: ['IELTS', 'PTE', 'TOEFL', 'Duolingo'],
      faqs: [
        { q: 'How many sessions will I need?', a: 'Most students need eight to twelve sessions to move half a band. After the diagnostic we tell you honestly what is achievable in your timeframe.' },
      ],
    },
    {
      slug: 'k12-school-admissions',
      title: 'K-12 & Expat Family School Admissions',
      summary: 'School places, curricula and waiting lists for families relocating to the Gulf.',
      overview:
        'Moving children mid-year is stressful. We shortlist schools by curriculum (British, American, IB, Indian, Pakistani), commute, fees and availability, then manage assessments, seat deposits and transport.',
      whoFor: ['Families relocating to Dubai, Riyadh or Doha', 'Parents choosing between curricula', 'Children needing learning-support placements'],
      benefits: [
        'Curriculum comparison matched to university pathways',
        'Availability checks and waiting-list strategy',
        'Assessment preparation and parent interviews',
        'Fees, transport and uniform budgeting in one plan',
      ],
      timeline: '3–8 weeks',
      priceFrom: 300,
      tags: ['K-12', 'Dubai schools', 'Riyadh schools'],
      faqs: [
        { q: 'Can you get a seat at an oversubscribed school?', a: 'We can identify realistic options, alternate campuses and timing windows. No one can guarantee a seat, but preparation and early applications materially improve outcomes.' },
      ],
    },
    {
      slug: 'corporate-training',
      title: 'Corporate Training & Executive Education',
      summary: 'Custom programmes that close capability gaps in leadership, finance and technology.',
      overview:
        'We design cohort-based training for organisations — leadership, financial literacy, AI fluency, customer experience and cross-cultural management — delivered on-site or online with measurable pre/post assessments.',
      whoFor: ['HR and L&D leaders', 'Family businesses professionalising management', 'Government and NGO capacity-building teams'],
      benefits: [
        'Needs assessment and measurable learning outcomes',
        'Facilitators with operating, not just teaching, experience',
        'Blended delivery across time zones',
        'Post-programme coaching and evaluation report',
      ],
      timeline: '6–12 weeks design and delivery',
      priceFrom: 2500,
      tags: ['leadership', 'L&D', 'executive education'],
      faqs: [
        { q: 'Do you deliver in Arabic?', a: 'Yes. Core programmes are available in English and Arabic, with bilingual materials and facilitators.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* B. Travel, tourism & hospitality                                           */
/* -------------------------------------------------------------------------- */
const travel = {
  id: 'travel',
  slug: 'travel',
  letter: 'B',
  title: 'Travel, Tourism & Hospitality',
  short: 'Tour packages, flights, visas and corporate travel.',
  description:
    'Curated leisure travel, pilgrimage support, corporate MICE and medical-tourism coordination — planned with the same rigour we apply to business advisory.',
  icon: 'Plane',
  destinations: ['UAE', 'Saudi Arabia', 'Europe', 'United Kingdom', 'India', 'Pakistan', 'USA', 'Estonia'],
  services: [
    {
      slug: 'tour-packages',
      title: 'Holiday & Tour Packages',
      summary: 'Well-paced itineraries built around your budget, interests and travel style.',
      overview:
        'We design private and small-group itineraries with realistic pacing, verified hotels and local guides. Every package includes a day-by-day plan, cancellation terms and a 24/7 contact number while you travel.',
      whoFor: ['Families planning school-holiday trips', 'Couples and honeymooners', 'Small groups of friends or colleagues'],
      benefits: ['Tailored itineraries rather than fixed coach tours', 'Verified hotels and transparent inclusions', 'Visa and insurance coordination', '24/7 in-trip support'],
      timeline: '1–3 weeks planning',
      priceFrom: 250,
      tags: ['Europe', 'Dubai', 'family travel'],
      faqs: [
        { q: 'Do you book flights as well?', a: 'Yes. Flights, hotels, transfers, guides and insurance can all be bundled into one quote, or booked separately if you prefer.' },
      ],
    },
    {
      slug: 'flight-hotel-booking',
      title: 'Flight & Hotel Booking',
      summary: 'Competitive fares, flexible tickets and hotel rates with human support.',
      overview:
        'For complex routings, multi-city trips and group bookings, an experienced agent saves more than a comparison site. We compare fare rules, baggage and refund policies — not just the headline price.',
      whoFor: ['Travellers with multi-city or group itineraries', 'Businesses booking frequent staff travel', 'Families needing adjacent seats and baggage'],
      benefits: ['Fare-rule comparison, not just lowest price', 'Group and multi-city bookings', 'Free cancellation windows flagged clearly', 'One agent accountable for changes'],
      timeline: '24–72 hours',
      priceFrom: 150,
      tags: ['flights', 'hotels', 'groups'],
      faqs: [
        { q: 'Can you beat online prices?', a: 'Sometimes. Our value is in fare rules, flexibility and support when plans change. We will tell you honestly when booking direct is the better option.' },
      ],
    },
    {
      slug: 'tourist-visa',
      title: 'Visit & Tourist Visas',
      summary: 'Visitor visa applications prepared to avoid avoidable refusals.',
      overview:
        'Tourist visa refusals usually come down to weak financial evidence or unclear travel purpose. We build a coherent file — itinerary, funds, ties to home — and prepare you for any interview.',
      whoFor: ['First-time travellers to the UK, Schengen, USA or UAE', 'Families applying together', 'Applicants previously refused'],
      benefits: ['Destination-specific documentation', 'Financial evidence and sponsorship review', 'Cover letters that explain the trip clearly', 'Appointment and biometrics guidance'],
      timeline: '2–6 weeks',
      priceFrom: 200,
      tags: ['Schengen', 'UK visitor', 'US B1/B2', 'UAE tourist visa'],
      faqs: [
        { q: 'Can you guarantee approval?', a: 'No. Visa decisions belong to governments. We ensure your application is complete, consistent and honestly presented, which is the strongest position you can be in.' },
      ],
    },
    {
      slug: 'umrah-hajj',
      title: 'Umrah & Hajj Guidance',
      summary: 'Pilgrimage travel with vetted operators, visas and thoughtful logistics.',
      overview:
        'We coordinate Umrah and Hajj journeys with licensed operators, including visas, hotels within walking distance, transport and group leadership. Packages are transparent about what is and is not included.',
      whoFor: ['First-time pilgrims', 'Families travelling with elderly parents', 'Groups from the UK, Europe and Pakistan'],
      benefits: ['Licensed operator partnerships', 'Hotel distance and category verified', 'Visa and vaccination coordination', 'Group leader and 24/7 support'],
      timeline: '3–8 weeks before travel',
      priceFrom: 300,
      tags: ['Umrah', 'Hajj', 'Saudi Arabia'],
      faqs: [
        { q: 'Do you arrange visas directly?', a: 'We coordinate with licensed Saudi operators and guide you through the official visa process. Hajj visas are allocated through the national quota system.' },
      ],
    },
    {
      slug: 'corporate-mice-travel',
      title: 'Corporate & MICE Travel',
      summary: 'Conferences, incentives and offsites delivered end-to-end.',
      overview:
        'From a 12-person leadership offsite to a 400-delegate conference, we handle venue sourcing, contracts, travel, accommodation, AV and on-site coordination with a single accountable lead.',
      whoFor: ['HR and executive assistants planning offsites', 'Companies exhibiting in the Gulf or Europe', 'Associations running conferences'],
      benefits: ['Venue sourcing with negotiated contracts', 'Group travel and rooming lists managed', 'AV, catering and speaker logistics', 'On-site coordination and cost reporting'],
      timeline: '4–12 weeks',
      priceFrom: 1200,
      tags: ['MICE', 'conferences', 'incentives'],
      faqs: [
        { q: 'What size events do you manage?', a: 'We are comfortable from 10 to 500 delegates, and we bring in specialist production partners for larger stages.' },
      ],
    },
    {
      slug: 'medical-tourism',
      title: 'Medical Tourism Coordination',
      summary: 'Treatment abroad coordinated with accredited hospitals and clear costing.',
      overview:
        'We help patients access accredited hospitals in the UAE, India, Turkey and Europe — coordinating specialist opinions, treatment quotes, visas, accommodation and post-operative follow-up.',
      whoFor: ['Patients seeking shorter waiting times', 'Families comparing treatment costs', 'International patients needing local coordination'],
      benefits: ['Accredited hospital shortlist and doctor profiles', 'Transparent treatment cost comparisons', 'Medical visa and companion coordination', 'Accommodation and airport transfers'],
      timeline: '1–4 weeks',
      priceFrom: 250,
      tags: ['medical', 'healthcare', 'India', 'UAE'],
      faqs: [
        { q: 'Do you provide medical advice?', a: 'No. We coordinate logistics and access to licensed clinicians. All clinical decisions are made by your treating doctors.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* C. Visa, immigration & relocation                                          */
/* -------------------------------------------------------------------------- */
const immigration = {
  id: 'immigration',
  slug: 'immigration',
  letter: 'C',
  title: 'Visa, Immigration & Relocation',
  short: 'Work visas, Golden Visa, residency and settling in.',
  description:
    'UAE Golden Visa, work and family residency, investor routes, Estonia e-Residency, attestation and full relocation support — handled by specialists who track rule changes weekly.',
  icon: 'Stamp',
  destinations: ['UAE', 'Saudi Arabia', 'Estonia', 'United Kingdom', 'Europe', 'USA', 'India', 'Pakistan'],
  services: [
    {
      slug: 'golden-visa',
      title: 'UAE Golden Visa',
      summary: 'Ten-year UAE residency for investors, professionals, creators and outstanding students.',
      overview:
        'The UAE Golden Visa rewards talent and investment with long-term residency. We assess which category fits you — property investment, salary and designation, entrepreneurship, culture, science or academic excellence — and manage the nomination, medicals and Emirates ID.',
      whoFor: ['Property owners and investors', 'Senior executives with qualifying salaries', 'Founders, creators and exceptional students'],
      benefits: ['Eligibility assessment across all categories', 'Nomination and supporting-evidence preparation', 'Medical, Emirates ID and residency stamping', 'Family sponsorship and renewals'],
      timeline: '3–8 weeks',
      priceFrom: 1200,
      featured: true,
      tags: ['Golden Visa', 'UAE', 'residency', 'investor'],
      faqs: [
        { q: 'Do I need to live in the UAE to keep it?', a: 'The Golden Visa is designed for flexibility and does not require continuous residence, though you should maintain a valid passport and comply with renewal conditions.' },
        { q: 'Can my family be included?', a: 'Spouses, children and in some categories domestic staff can be sponsored. We map the family structure during the eligibility review.' },
      ],
    },
    {
      slug: 'work-visa',
      title: 'Work Visas & Employment Permits',
      summary: 'Employer-sponsored work authorisation, from quota to Emirates ID.',
      overview:
        'We handle the full employment cycle: establishment cards, quotas, offer letters, labour approvals, entry permits, medicals and residence stamping — in the UAE, Saudi Arabia and the UK.',
      whoFor: ['Companies hiring overseas talent', 'Professionals moving to the Gulf', 'HR teams without an in-house PRO'],
      benefits: ['End-to-end sponsorship workflow', 'Wage Protection System and labour compliance', 'Dependent visas coordinated in parallel', 'Renewals and cancellations managed'],
      timeline: '3–8 weeks',
      priceFrom: 900,
      tags: ['work permit', 'UAE', 'Saudi Arabia', 'UK'],
      faqs: [
        { q: 'Can you transfer an existing visa?', a: 'Yes. We manage transfers, status changes and cancellations, including cases where a previous employer has not yet released the file.' },
      ],
    },
    {
      slug: 'family-dependent-visa',
      title: 'Family & Dependent Visas',
      summary: 'Bring your spouse, children and parents with a properly structured file.',
      overview:
        'Family sponsorship requires attested documents, salary thresholds and accommodation evidence. We prepare the entire package, including attested marriage and birth certificates, and coordinate medicals for each dependent.',
      whoFor: ['Residents sponsoring a spouse or children', 'Parents seeking to sponsor elderly relatives', 'New arrivals planning a family move'],
      benefits: ['Attestation and translation coordinated', 'Salary and accommodation evidence reviewed', 'Medicals and Emirates ID booked together', 'School and housing advice on arrival'],
      timeline: '4–8 weeks',
      priceFrom: 800,
      tags: ['family visa', 'spouse', 'children', 'UAE'],
      faqs: [
        { q: 'Is there a minimum salary?', a: 'Thresholds vary by emirate and category and change periodically. We confirm the current requirement for your case before you commit.' },
      ],
    },
    {
      slug: 'investor-entrepreneur-visa',
      title: 'Investor & Entrepreneur Visas',
      summary: 'Residency routes tied to business ownership, investment or a funded startup.',
      overview:
        'We structure investor and founder residency around your actual business — not a nominal arrangement. That includes company formation, bank account, business plan and the relevant nomination or approval.',
      whoFor: ['Founders relocating their startup', 'Investors acquiring or launching a UAE business', 'Family businesses expanding to the Gulf'],
      benefits: ['Structure and residency handled together', 'Business plan and evidence preparation', 'Bank account and compliance support', 'Scalable to Golden Visa where eligible'],
      timeline: '4–10 weeks',
      priceFrom: 1500,
      tags: ['investor visa', 'entrepreneur', 'startup', 'UAE'],
      faqs: [
        { q: 'How much investment is required?', a: 'Requirements differ by route and emirate. We only recommend a structure after reviewing your business substance, timeline and tax position.' },
      ],
    },
    {
      slug: 'document-attestation',
      title: 'Document Attestation & Translation',
      summary: 'Certified translation, notarisation and embassy attestation without the runaround.',
      overview:
        'We manage the full chain: certified translation, notary, Ministry of Foreign Affairs, destination embassy and, where required, the destination Ministry. You get a tracked status and digital copies at every stage.',
      whoFor: ['Families submitting marriage and birth certificates', 'Students providing academic documents', 'Companies legalising corporate papers'],
      benefits: ['Certified translation in 12+ languages', 'Full attestation chain coordinated', 'Courier and tracking included', 'Digital archive of every document'],
      timeline: '5–20 working days',
      priceFrom: 120,
      tags: ['attestation', 'translation', 'MOFA'],
      faqs: [
        { q: 'Can you attest documents I already have abroad?', a: 'Yes, we coordinate with agents in the issuing country where the chain requires local steps, and keep you updated at each handover.' },
      ],
    },
    {
      slug: 'relocation-settling-in',
      title: 'Relocation & Settling In',
      summary: 'Housing, schools, banking, utilities and the small things that make a move work.',
      overview:
        'Relocation fails on details: a school place, a tenancy cheque, a mobile contract. We build a week-by-week settling-in plan and stay on call for the first 90 days.',
      whoFor: ['Families moving to the UAE or Saudi Arabia', 'Executives on international assignment', 'Companies relocating staff'],
      benefits: ['Housing search and tenancy review', 'School and healthcare registration', 'Banking, utilities and telecoms setup', 'Cultural and practical orientation'],
      timeline: '2–8 weeks',
      priceFrom: 1500,
      tags: ['relocation', 'Dubai', 'Riyadh', 'settling in'],
      faqs: [
        { q: 'Do you find housing for us?', a: 'Yes. We shortlist neighbourhoods against commute, schools and budget, accompany viewings where possible and review the tenancy contract before you sign.' },
      ],
    },
    {
      slug: 'estonia-e-residency',
      title: 'Estonia e-Residency',
      summary: 'EU digital identity for location-independent founders and freelancers.',
      overview:
        'e-Residency gives you a government-issued digital ID and access to Estonia’s EU business environment. We manage the application, pickup, company registration and banking introductions.',
      whoFor: ['Digital nomads and remote founders', 'Consultants billing international clients', 'Founders wanting an EU-registered company'],
      benefits: ['Application and pickup coordination', 'Estonian company registration', 'Banking and payment provider introductions', 'Tax residency guidance'],
      timeline: '4–8 weeks',
      priceFrom: 600,
      tags: ['e-Residency', 'Estonia', 'EU', 'startup'],
      faqs: [
        { q: 'Does e-Residency give me EU residency?', a: 'No. It grants a digital identity and company access, not physical residency or Schengen travel rights. We explain the distinction clearly before you apply.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* D. Business setup & corporate services                                     */
/* -------------------------------------------------------------------------- */
const businessSetup = {
  id: 'business-setup',
  slug: 'business-setup',
  letter: 'D',
  title: 'Business Setup & Corporate Services',
  short: 'Company formation in the UAE, Saudi, UK, US and Estonia.',
  description:
    'Jurisdiction advice, licensing, bank accounts and ongoing corporate compliance for founders and investors entering the UAE, Saudi Arabia, the UK, Estonia and the US.',
  icon: 'Building2',
  destinations: ['UAE', 'Saudi Arabia', 'United Kingdom', 'Estonia', 'USA', 'India', 'Pakistan', 'Europe'],
  services: [
    {
      slug: 'uae-free-zone-company',
      title: 'UAE Free Zone Company',
      summary: '100% foreign ownership, fast licensing and a clear cost model.',
      overview:
        'Free zones suit international founders, consultants, e-commerce and trading businesses. We compare licence packages across DMCC, IFZA, Meydan, SHAMS and JAFZA, then handle registration, establishment card and visas.',
      whoFor: ['Consultants and digital founders', 'E-commerce and trading companies', 'Businesses wanting 100% foreign ownership'],
      benefits: ['Zone comparison on cost, activity fit and banking', 'Licence, establishment card and visas handled', 'Bank account introductions that actually work', 'Transparent first-year and renewal costs'],
      timeline: '5–15 working days',
      priceFrom: 2900,
      featured: true,
      tags: ['free zone', 'Dubai', 'company formation', 'JAFZA'],
      faqs: [
        { q: 'Which free zone is best?', a: 'It depends on your activity, banking needs, office requirement and budget. We present a shortlist of two or three with total first-year costs rather than pushing a single zone.' },
        { q: 'Can I open a bank account remotely?', a: 'Some banks allow it, most require at least one visit. We introduce you only to banks whose compliance team is likely to accept your profile.' },
      ],
    },
    {
      slug: 'uae-mainland-company',
      title: 'UAE Mainland Company',
      summary: 'Trade directly with the local market under a mainland licence.',
      overview:
        'Mainland companies can compete for government work and trade freely across the UAE. We advise on activity, ownership structure and the right emirate, then manage licensing and the supporting approvals.',
      whoFor: ['Businesses selling directly to UAE customers', 'Companies bidding for government contracts', 'Retail, construction and services firms'],
      benefits: ['Ownership and activity structure advice', 'Emirate and licence comparison', 'Approvals from relevant authorities', 'Office, visas and compliance setup'],
      timeline: '2–5 weeks',
      priceFrom: 4500,
      tags: ['mainland', 'DED', 'Dubai', 'Abu Dhabi'],
      faqs: [
        { q: 'Do I still need a local sponsor?', a: 'Ownership rules have changed significantly for most commercial activities. We confirm the current position for your specific activity and nationality.' },
      ],
    },
    {
      slug: 'saudi-company-formation',
      title: 'Saudi Arabia Company Formation',
      summary: 'MISA licensing, commercial registration and Saudization planning.',
      overview:
        'Saudi Arabia rewards commitment but demands substance. We manage MISA investment licences, CR registration, Qiwa and GOSI setup, and help you plan a realistic Saudization and hiring roadmap.',
      whoFor: ['Companies entering the Saudi market', 'Consultants and contractors with Saudi clients', 'Regional HQ candidates'],
      benefits: ['MISA licence and CR end-to-end', 'Saudization and Nitaqat planning', 'Bank account and office setup', 'Ongoing PRO and compliance support'],
      timeline: '4–10 weeks',
      priceFrom: 6500,
      tags: ['Saudi Arabia', 'MISA', 'Riyadh', 'Vision 2030'],
      faqs: [
        { q: 'Do I need a physical office in Saudi Arabia?', a: 'Most activities require a registered office and increasingly a substantive presence. We advise on what is practical for your entry stage.' },
      ],
    },
    {
      slug: 'uk-company-formation',
      title: 'UK Company Formation',
      summary: 'Limited company incorporation, bank introductions and UK compliance.',
      overview:
        'A UK Ltd is fast to register but easy to get wrong on tax residency, VAT and director duties. We incorporate, set up accounting, introduce business banking and explain exactly what HMRC expects.',
      whoFor: ['Founders selling into the UK market', 'Consultants relocating to London', 'E-commerce businesses using UK fulfilment'],
      benefits: ['Companies House incorporation', 'Business bank account introductions', 'VAT and payroll registration', 'Registered office and director services'],
      timeline: '3–10 working days',
      priceFrom: 900,
      tags: ['UK', 'Ltd', 'London', 'HMRC'],
      faqs: [
        { q: 'Can a non-resident own a UK company?', a: 'Yes. Ownership is straightforward; tax residency and banking are where advice matters. We cover both before incorporation.' },
      ],
    },
    {
      slug: 'us-llc-formation',
      title: 'US LLC & C-Corp Formation',
      summary: 'Delaware and Wyoming entities with banking, EIN and compliance.',
      overview:
        'US entities are attractive for SaaS, fundraising and global payments. We form the entity, obtain the EIN, prepare the operating agreement and introduce banking and payroll providers.',
      whoFor: ['SaaS and global e-commerce founders', 'Startups planning a US fundraise', 'Consultants billing US clients'],
      benefits: ['State selection based on privacy and tax', 'EIN and registered agent setup', 'Operating agreement and cap table basics', 'Stripe, Mercury and payroll introductions'],
      timeline: '1–3 weeks',
      priceFrom: 1200,
      tags: ['US LLC', 'Delaware', 'C-Corp', 'EIN'],
      faqs: [
        { q: 'Do I owe US tax if I live abroad?', a: 'A US LLC is often tax-transparent for non-residents, but this depends on your facts. We coordinate with a US CPA to confirm your position in writing.' },
      ],
    },
    {
      slug: 'estonia-company-formation',
      title: 'Estonia Company Formation',
      summary: 'EU OÜ registration with e-Residency, banking and tax guidance.',
      overview:
        'Estonia’s OÜ is one of the most efficient structures for location-independent businesses. We register the company, appoint a contact person, set up accounting and explain the deferred corporate tax model.',
      whoFor: ['EU-focused digital businesses', 'e-Residency holders', 'Founders wanting a credible EU entity'],
      benefits: ['OÜ registration and contact person', 'Banking and payment provider setup', 'Accounting and tax registration', 'Ongoing annual compliance'],
      timeline: '1–3 weeks after e-Residency',
      priceFrom: 850,
      tags: ['Estonia', 'OÜ', 'EU', 'e-Residency'],
      faqs: [
        { q: 'Is Estonian corporate tax really zero?', a: 'Tax is deferred on retained and reinvested profits, but distributions are taxed. We model the real effective rate for your business.' },
      ],
    },
    {
      slug: 'bank-account-opening',
      title: 'Corporate Bank Account Opening',
      summary: 'Bank introductions matched to your activity, residency and turnover.',
      overview:
        'Banking is the bottleneck in company formation. We prepare a compliance-ready pack, introduce you to banks and fintechs likely to accept your profile, and support you through interviews.',
      whoFor: ['Newly formed UAE and offshore companies', 'Founders refused by a bank elsewhere', 'Businesses needing multi-currency accounts'],
      benefits: ['Bank shortlist matched to your risk profile', 'Compliance pack and source-of-funds narrative', 'Interview preparation', 'Fallback fintech options'],
      timeline: '2–6 weeks',
      priceFrom: 800,
      tags: ['banking', 'UAE', 'compliance', 'fintech'],
      faqs: [
        { q: 'Is account opening guaranteed?', a: 'No bank guarantees an account. We improve your preparation and introduce you to institutions with an appetite for your profile, but the decision rests with the bank.' },
      ],
    },
    {
      slug: 'corporate-secretarial',
      title: 'Corporate Secretarial & Renewals',
      summary: 'Keep licences, registers and filings current without chasing dates.',
      overview:
        'We act as your corporate secretarial partner: licence renewals, share transfers, director changes, resolutions, UBO registers and annual filings, with a shared compliance calendar.',
      whoFor: ['SMEs without in-house legal counsel', 'Holding companies with multiple entities', 'Founders who want renewals handled'],
      benefits: ['Compliance calendar with reminders', 'Licence and registration renewals', 'Resolutions, share transfers and UBO updates', 'Annual filing coordination'],
      timeline: 'Ongoing; renewals 2–4 weeks',
      priceFrom: 750,
      tags: ['renewals', 'compliance', 'secretarial'],
      faqs: [
        { q: 'Can you manage multiple jurisdictions?', a: 'Yes. We coordinate UAE, UK, Estonian and US entities under one calendar and one account manager.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* E. Strategy, management & operations                                       */
/* -------------------------------------------------------------------------- */
const strategy = {
  id: 'strategy',
  slug: 'strategy',
  letter: 'E',
  title: 'Strategy & Operations',
  short: 'Market entry, feasibility, valuation and family business.',
  description:
    'Board-level strategy, market entry, feasibility studies, valuation and succession planning, grounded in operating experience rather than slideware.',
  icon: 'Compass',
  destinations: ['UAE', 'Saudi Arabia', 'Europe', 'United Kingdom', 'India', 'Pakistan', 'USA', 'Estonia'],
  services: [
    {
      slug: 'corporate-strategy',
      title: 'Corporate Strategy',
      summary: 'A clear strategic agenda, translated into decisions, owners and numbers.',
      overview:
        'We work with boards and founders to answer three questions: where to play, how to win, and what to stop. The output is a pragmatic strategy with financial implications, risks and a 90-day execution plan.',
      whoFor: ['Boards facing growth or turnaround decisions', 'Founders moving from founder-led to institutional', 'Family groups professionalising governance'],
      benefits: ['Evidence-based market and competitor analysis', 'Financial model linked to strategic choices', 'Prioritised initiatives with owners', 'Board-ready communication materials'],
      timeline: '6–12 weeks',
      priceFrom: 8000,
      featured: true,
      tags: ['strategy', 'board', 'growth', 'turnaround'],
      faqs: [
        { q: 'How is this different from a big-firm engagement?', a: 'You get senior operators on the work, a smaller team, and deliverables you can implement. We are comfortable with ambiguity and smaller budgets.' },
      ],
    },
    {
      slug: 'market-entry',
      title: 'Market Entry & Expansion',
      summary: 'Enter a new market with the right structure, partners and sequence.',
      overview:
        'We assess demand, regulation, competition, pricing and route-to-market, then recommend an entry mode — distributor, joint venture, branch or subsidiary — with a costed launch plan.',
      whoFor: ['Companies entering the GCC or Europe', 'Brands testing a new city or country', 'Investors evaluating a market'],
      benefits: ['Demand and competitor validation', 'Entity and licensing implications', 'Partner and distributor shortlisting', 'Costed 12-month launch roadmap'],
      timeline: '8–14 weeks',
      priceFrom: 7000,
      tags: ['market entry', 'GCC', 'Europe', 'expansion'],
      faqs: [
        { q: 'Do you find local partners?', a: 'We map and screen candidates, facilitate introductions and support negotiations. We do not accept undisclosed commission from partners we recommend.' },
      ],
    },
    {
      slug: 'feasibility-study',
      title: 'Feasibility Studies & Business Plans',
      summary: 'Bankable documents for investors, banks and licence applications.',
      overview:
        'We build feasibility studies and business plans with real market evidence, a defensible financial model and clear assumptions. Suitable for bank facilities, investor decks and government applications.',
      whoFor: ['Founders raising debt or equity', 'Companies applying for licences or incentives', 'Family offices evaluating a new venture'],
      benefits: ['Primary and secondary market research', 'Three-statement financial model', 'Scenario and sensitivity analysis', 'Investor-ready documents'],
      timeline: '4–10 weeks',
      priceFrom: 4500,
      tags: ['feasibility', 'business plan', 'financial model'],
      faqs: [
        { q: 'Do you guarantee financing?', a: 'No. We produce credible documents and can introduce you to lenders and investors, but credit and investment decisions are theirs.' },
      ],
    },
    {
      slug: 'business-valuation',
      title: 'Business Valuation',
      summary: 'Independent valuations for transactions, disputes and shareholder events.',
      overview:
        'We value businesses using income, market and asset approaches, with a clear explanation of assumptions. Deliverables are suitable for M&A, shareholder buyouts, tax purposes and dispute support.',
      whoFor: ['Founders selling or raising capital', 'Shareholders in a buyout', 'Companies needing a defensible valuation report'],
      benefits: ['DCF, comparable and asset-based methods', 'Normalised earnings analysis', 'Sensitivity and scenario tables', 'Independently reasoned report'],
      timeline: '3–6 weeks',
      priceFrom: 5000,
      tags: ['valuation', 'M&A', 'shareholders'],
      faqs: [
        { q: 'Will you value a small business?', a: 'Yes. We have simplified scopes for SMEs and startups, including early-stage valuations for cap tables and ESOPs.' },
      ],
    },
    {
      slug: 'family-succession-planning',
      title: 'Family Business & Succession',
      summary: 'Governance, succession and wealth structures that survive the next generation.',
      overview:
        'Family businesses fail on governance, not markets. We facilitate difficult conversations, design family constitutions, separate ownership from management and coordinate legal and tax structures.',
      whoFor: ['First-generation founders planning succession', 'Families with cross-border assets', 'Next-generation leaders preparing to take over'],
      benefits: ['Family constitution and governance charter', 'Succession and leadership transition plan', 'Holding and trust structure coordination', 'Next-generation development programme'],
      timeline: '3–9 months',
      priceFrom: 9000,
      tags: ['family business', 'succession', 'governance', 'wealth'],
      faqs: [
        { q: 'Do you work with the whole family?', a: 'Yes. We facilitate structured family sessions and work with each generation privately where needed. Confidentiality is absolute.' },
      ],
    },
    {
      slug: 'operational-excellence',
      title: 'Operational Excellence',
      summary: 'Remove the friction that slows delivery and inflates cost.',
      overview:
        'We map processes end-to-end, identify the constraint and implement improvements with your team — not a report that sits on a shelf. Typical gains are in cycle time, cost-to-serve and quality.',
      whoFor: ['Companies scaling operations quickly', 'Businesses with margin pressure', 'Post-merger integration teams'],
      benefits: ['Value-stream and process mapping', 'KPI and operating-cadence design', 'Quick-win implementation sprint', 'Capability transfer to your team'],
      timeline: '8–16 weeks',
      priceFrom: 6500,
      tags: ['operations', 'process', 'productivity'],
      faqs: [
        { q: 'Will this disrupt our team?', a: 'We design around live operations, start with a small pilot and only scale changes that show measurable benefit.' },
      ],
    },
    {
      slug: 'organisational-design',
      title: 'Organisational Design & Change',
      summary: 'Structure, roles and incentives aligned to the strategy.',
      overview:
        'When strategy changes, structure must follow. We design operating models, role clarity, spans and layers, and change plans that bring people with you rather than around you.',
      whoFor: ['Companies restructuring after growth', 'Leadership teams merging entities', 'Businesses with unclear accountability'],
      benefits: ['Operating model and org design', 'Role profiles and RACI clarity', 'Change and communication plan', 'Leadership alignment workshops'],
      timeline: '6–12 weeks',
      priceFrom: 5500,
      tags: ['org design', 'change', 'operating model'],
      faqs: [
        { q: 'Can you help with redundancies?', a: 'We can design a fair, compliant process and support communication. Legal execution is coordinated with employment counsel.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* F. Finance, wealth & investment                                            */
/* -------------------------------------------------------------------------- */
const finance = {
  id: 'finance',
  slug: 'finance',
  letter: 'F',
  title: 'Finance, Wealth & Investment',
  short: 'Wealth, fundraising, tax, accounting and modelling.',
  description:
    'Independent finance advisory for individuals, families and companies — from portfolio planning and fundraising to UAE corporate tax, VAT and transaction support.',
  icon: 'LineChart',
  destinations: ['UAE', 'United Kingdom', 'Europe', 'Estonia', 'USA', 'Saudi Arabia', 'India', 'Pakistan'],
  services: [
    {
      slug: 'wealth-investment-advisory',
      title: 'Wealth & Investment Advisory',
      summary: 'An independent plan for growing, protecting and transferring wealth.',
      overview:
        'We begin with your goals, liabilities, time horizon and risk tolerance, then build a diversified plan across jurisdictions. We are not tied to a product provider, so recommendations serve your balance sheet — not a commission sheet.',
      whoFor: ['Entrepreneurs with concentrated business wealth', 'Families planning across generations', 'Professionals investing internationally'],
      benefits: ['Goal-based financial plan and risk profile', 'Portfolio construction and diversification', 'Cross-border tax and structure coordination', 'Annual review and rebalancing discipline'],
      timeline: '3–6 weeks for the initial plan',
      priceFrom: 2500,
      featured: true,
      tags: ['wealth', 'investments', 'portfolio', 'family'],
      faqs: [
        { q: 'Do you manage money directly?', a: 'We advise and coordinate with regulated custodians and managers. Any product recommendation is disclosed, and we never accept undisclosed commissions.' },
      ],
    },
    {
      slug: 'fundraising-venture-capital',
      title: 'Fundraising & VC Introductions',
      summary: 'Get investor-ready, then get in the right rooms.',
      overview:
        'We pressure-test your story, metrics and data room, then introduce you to funds and family offices whose thesis matches your stage and sector. You keep control of the process; we improve the odds.',
      whoFor: ['Pre-seed to Series A founders', 'SMEs raising growth capital', 'Family businesses considering external investment'],
      benefits: ['Narrative, deck and data-room review', 'Valuation and cap-table guidance', 'Curated investor introductions', 'Term-sheet and negotiation support'],
      timeline: '6–16 weeks',
      priceFrom: 4000,
      tags: ['fundraising', 'VC', 'startup', 'pitch'],
      faqs: [
        { q: 'Do you charge success fees?', a: 'Our standard engagement is a fixed advisory fee. Where a success component is agreed, it is disclosed in writing and structured to align interests.' },
      ],
    },
    {
      slug: 'tax-vat-compliance',
      title: 'UAE Corporate Tax & VAT',
      summary: 'Registration, filings and planning that stand up to scrutiny.',
      overview:
        'UAE corporate tax and VAT reward clean records and punish guesswork. We handle registration, quarterly VAT returns, annual corporate tax filings, free-zone qualifying income analysis and voluntary disclosures.',
      whoFor: ['Free-zone and mainland companies', 'Groups with related-party transactions', 'Businesses behind on filings'],
      benefits: ['Corporate tax and VAT registration', 'Quarterly and annual filings', 'Free-zone qualifying income assessment', 'Penalty and voluntary disclosure support'],
      timeline: 'Ongoing; registration 1–3 weeks',
      priceFrom: 1200,
      tags: ['corporate tax', 'VAT', 'UAE', 'compliance'],
      faqs: [
        { q: 'Do you handle FTA audits?', a: 'We prepare documentation and represent you in correspondence, working alongside legal counsel for contested assessments.' },
      ],
    },
    {
      slug: 'accounting-bookkeeping',
      title: 'Accounting & Bookkeeping',
      summary: 'Clean books, monthly reporting and audit-ready records.',
      overview:
        'We keep your books current in Xero, QuickBooks or Zoho, reconcile bank and payment accounts, and deliver a monthly management pack with cash, margin and receivables visibility.',
      whoFor: ['SMEs without a finance team', 'Startups preparing for audit or fundraising', 'Groups needing consolidated reporting'],
      benefits: ['Monthly bookkeeping and reconciliations', 'Management accounts and cash-flow view', 'VAT-ready ledgers', 'Audit coordination'],
      timeline: 'Monthly, from 2 weeks onboarding',
      priceFrom: 450,
      tags: ['bookkeeping', 'Xero', 'QuickBooks', 'reporting'],
      faqs: [
        { q: 'Can you clean up prior years?', a: 'Yes. We start with a diagnostic, agree the catch-up scope and work through historical periods at a fixed fee.' },
      ],
    },
    {
      slug: 'financial-modelling',
      title: 'Financial Modelling & Analysis',
      summary: 'Models investors and lenders can trust, with assumptions they can test.',
      overview:
        'We build three-statement models, scenario toggles, unit economics and dashboards. Every model is documented, audited for hard-codes and delivered with a short walkthrough for your team.',
      whoFor: ['Founders raising capital or debt', 'CFOs needing a planning model', 'Buyers evaluating an acquisition'],
      benefits: ['Three-statement and cash-flow modelling', 'Scenario and sensitivity analysis', 'Unit economics and cohort analysis', 'Model audit and handover session'],
      timeline: '3–6 weeks',
      priceFrom: 3000,
      tags: ['financial model', 'unit economics', 'forecast'],
      faqs: [
        { q: 'Which tools do you use?', a: 'Excel and Google Sheets for models, with Power BI or Looker Studio for dashboards where a live view is useful.' },
      ],
    },
    {
      slug: 'ma-due-diligence',
      title: 'M&A and Due Diligence',
      summary: 'Buy, sell or invest with the risks on the table before you sign.',
      overview:
        'We run financial and commercial due diligence, normalise earnings, stress-test forecasts and support negotiation. For sellers, we prepare the business and data room before buyers arrive.',
      whoFor: ['Buyers acquiring an SME', 'Founders preparing to sell', 'Investors evaluating a minority stake'],
      benefits: ['Financial and commercial due diligence', 'Quality-of-earnings analysis', 'Deal structuring and negotiation support', 'Integration planning'],
      timeline: '4–10 weeks',
      priceFrom: 6000,
      tags: ['M&A', 'due diligence', 'acquisition', 'exit'],
      faqs: [
        { q: 'Do you provide legal advice?', a: 'No. We coordinate closely with your transaction counsel and can introduce firms we have worked with, but legal advice stays with licensed lawyers.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* G. Legal, compliance & governance                                          */
/* -------------------------------------------------------------------------- */
const legal = {
  id: 'legal',
  slug: 'legal',
  letter: 'G',
  title: 'Legal, Compliance & Governance',
  short: 'Contracts, IP, AML, data privacy and governance.',
  description:
    'Practical legal and compliance support for businesses operating across borders, delivered with licensed counsel where regulation requires it.',
  icon: 'Scale',
  destinations: ['UAE', 'Saudi Arabia', 'United Kingdom', 'Europe', 'Estonia', 'USA', 'India', 'Pakistan'],
  services: [
    {
      slug: 'legal-consultancy',
      title: 'Legal Consultancy',
      summary: 'Clear commercial legal advice, coordinated with licensed counsel.',
      overview:
        'We translate legal risk into business decisions: entity structures, shareholder arrangements, employment questions and regulatory exposure. Where a matter requires a practising lawyer, we coordinate with licensed local counsel.',
      whoFor: ['Founders entering a new jurisdiction', 'Companies without in-house counsel', 'Investors reviewing exposure'],
      benefits: ['Commercial, plain-English advice', 'Coordinated local counsel where required', 'Risk register and mitigation plan', 'Fixed-fee scoping'],
      timeline: '1–4 weeks',
      priceFrom: 900,
      tags: ['legal', 'risk', 'counsel'],
      faqs: [
        { q: 'Are you a law firm?', a: 'RNS Global is an advisory firm. Regulated legal work is performed by licensed counsel in the relevant jurisdiction, coordinated by us under one engagement.' },
      ],
    },
    {
      slug: 'contract-drafting',
      title: 'Contract Drafting & Review',
      summary: 'Agreements that protect you without making the deal impossible.',
      overview:
        'We draft and review commercial agreements — MSAs, NDAs, distribution, employment, SaaS and shareholder agreements — with clear risk allocation and practical fallback positions.',
      whoFor: ['Businesses negotiating with larger counterparties', 'Founders formalising partnerships', 'Companies standardising templates'],
      benefits: ['Plain-English drafting and redlines', 'Risk matrix with fallback positions', 'Negotiation support', 'Template library for repeat use'],
      timeline: '3–10 working days',
      priceFrom: 600,
      tags: ['contracts', 'NDA', 'MSA', 'negotiation'],
      faqs: [
        { q: 'Can you review a contract urgently?', a: 'Yes, we reserve capacity for 48-hour reviews. Priority work is priced transparently before we begin.' },
      ],
    },
    {
      slug: 'trademark-ip',
      title: 'Trademark & IP Registration',
      summary: 'Protect your brand, content and inventions in the markets that matter.',
      overview:
        'We run availability searches, file trademarks, manage oppositions and advise on copyright, licensing and IP assignment. Portfolios are tracked in one register with renewal reminders.',
      whoFor: ['Brands expanding into the GCC or Europe', 'Founders protecting a product name', 'Creators licensing content'],
      benefits: ['Availability search and class strategy', 'Filing and prosecution management', 'Licensing and assignment agreements', 'Portfolio register and renewals'],
      timeline: '2–8 weeks to file; 6–12 months to register',
      priceFrom: 800,
      tags: ['trademark', 'IP', 'brand', 'copyright'],
      faqs: [
        { q: 'Should I register in every country?', a: 'Not automatically. We prioritise markets based on revenue, manufacturing and enforcement risk, then use regional systems where they are more efficient.' },
      ],
    },
    {
      slug: 'aml-kyc-compliance',
      title: 'AML, KYC & Regulatory Compliance',
      summary: 'Policies, controls and training that satisfy regulators and banks.',
      overview:
        'We build risk-based AML programmes: customer due diligence, transaction monitoring, sanctions screening, record-keeping and staff training — then help you evidence it during bank or regulator reviews.',
      whoFor: ['DNFBPs, real estate and trading firms', 'Fintechs and payment businesses', 'Companies responding to bank queries'],
      benefits: ['AML policy and risk assessment', 'CDD and screening workflows', 'Regulator and bank review support', 'Staff training and attestations'],
      timeline: '4–10 weeks',
      priceFrom: 3500,
      tags: ['AML', 'KYC', 'compliance', 'screening'],
      faqs: [
        { q: 'Do you provide a compliance officer?', a: 'We can act as an outsourced MLRO or compliance officer for smaller firms, subject to the regulator’s fit-and-proper requirements.' },
      ],
    },
    {
      slug: 'data-privacy-gdpr',
      title: 'Data Privacy & GDPR Compliance',
      summary: 'Lawful data handling, documented and ready for scrutiny.',
      overview:
        'We map data flows, draft privacy notices and policies, negotiate processor agreements and build subject-access and breach-response procedures. Practical, proportionate and auditable.',
      whoFor: ['Companies handling EU or UK personal data', 'SaaS and e-commerce businesses', 'Groups rolling out a privacy programme'],
      benefits: ['Data mapping and records of processing', 'Policies, notices and consent flows', 'DPAs and vendor due diligence', 'Breach response and training'],
      timeline: '4–8 weeks',
      priceFrom: 2800,
      tags: ['GDPR', 'privacy', 'data', 'compliance'],
      faqs: [
        { q: 'Do we need an EU representative?', a: 'If you offer goods or services to EU residents and have no EU establishment, often yes. We assess your position and can arrange representation.' },
      ],
    },
    {
      slug: 'esg-sustainability',
      title: 'ESG & Sustainability Advisory',
      summary: 'Credible ESG reporting and programmes, without greenwashing.',
      overview:
        'We help companies identify material issues, set measurable targets, build data collection and produce disclosures aligned to recognised frameworks. The focus is on evidence, not slogans.',
      whoFor: ['Companies facing investor or tender ESG requirements', 'Manufacturers and exporters', 'Family groups formalising impact'],
      benefits: ['Materiality assessment', 'ESG data and KPI framework', 'Disclosure aligned to recognised standards', 'Implementation roadmap'],
      timeline: '8–16 weeks',
      priceFrom: 6000,
      tags: ['ESG', 'sustainability', 'reporting'],
      faqs: [
        { q: 'Which framework should we use?', a: 'It depends on your investors, sector and size. We compare GRI, SASB and IFRS S1/S2 and recommend the lightest credible option.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* H. Trade, logistics & supply chain                                         */
/* -------------------------------------------------------------------------- */
const trade = {
  id: 'trade',
  slug: 'trade',
  letter: 'H',
  title: 'Trade, Logistics & Supply Chain',
  short: 'Customs, freight, Jebel Ali warehousing and sourcing.',
  description:
    'Import-export advisory, customs guidance, freight coordination and distribution from our Jebel Ali operations hub, plus sourcing across India, Pakistan, Europe and the Far East.',
  icon: 'Container',
  destinations: ['UAE', 'Saudi Arabia', 'India', 'Pakistan', 'Europe', 'United Kingdom', 'Estonia', 'USA'],
  services: [
    {
      slug: 'import-export-advisory',
      title: 'Import & Export Advisory',
      summary: 'Ship compliantly, price correctly and avoid demurrage surprises.',
      overview:
        'We advise on HS classification, duties, documentation, restricted goods and free-zone versus mainland flows. The goal is fewer delays, predictable landed cost and clean records.',
      whoFor: ['First-time importers and exporters', 'E-commerce brands shipping internationally', 'Traders moving into the GCC'],
      benefits: ['HS classification and duty modelling', 'Documentation templates and checks', 'Restricted-goods and licensing guidance', 'Landed-cost modelling'],
      timeline: '2–6 weeks',
      priceFrom: 1200,
      tags: ['import', 'export', 'customs', 'GCC'],
      faqs: [
        { q: 'Can you clear goods for us?', a: 'We coordinate licensed customs brokers and oversee the process. Clearance itself is performed by licensed brokers.' },
      ],
    },
    {
      slug: 'customs-clearance',
      title: 'Customs Clearance Guidance',
      summary: 'Broker coordination, documentation and dispute support.',
      overview:
        'We coordinate with licensed brokers across UAE ports, prepare documentation packs and resolve classification or valuation disputes before they become storage costs.',
      whoFor: ['Importers using Jebel Ali and JAFZA', 'Businesses facing customs queries', 'Projects with time-critical shipments'],
      benefits: ['Broker selection and coordination', 'Pre-clearance document review', 'Duty and valuation support', 'Detention and dispute assistance'],
      timeline: '1–5 working days per shipment',
      priceFrom: 450,
      tags: ['customs', 'JAFZA', 'Jebel Ali', 'broker'],
      faqs: [
        { q: 'Do you handle sea, air and land freight?', a: 'Yes, through vetted freight partners. We coordinate the move and keep one point of accountability.' },
      ],
    },
    {
      slug: 'jebel-ali-warehousing',
      title: 'Jebel Ali Warehousing & Fulfilment',
      summary: 'Bonded storage, pick-and-pack and regional distribution from Jebel Ali.',
      overview:
        'Our Jebel Ali operations hub supports bonded and non-bonded storage, pick-and-pack, labelling and last-mile distribution across the GCC. You get inventory visibility and a named operations contact.',
      whoFor: ['E-commerce brands serving the GCC', 'Traders needing bonded storage', 'Companies re-exporting through Dubai'],
      benefits: ['Bonded and non-bonded storage options', 'Pick, pack and labelling services', 'Inventory visibility and reporting', 'Last-mile and re-export coordination'],
      timeline: '1–3 weeks to onboard',
      priceFrom: 900,
      featured: true,
      tags: ['warehousing', 'Jebel Ali', 'fulfilment', 'bonded'],
      faqs: [
        { q: 'Can you store goods before duties are paid?', a: 'Bonded storage is available subject to free-zone rules and customs approval. We confirm eligibility for your product category.' },
      ],
    },
    {
      slug: 'supply-chain-optimization',
      title: 'Supply Chain Optimisation',
      summary: 'Lower landed cost and shorter lead times without adding risk.',
      overview:
        'We map your supply chain from supplier to customer, identify cost and lead-time drivers, then model alternative sourcing, routing and inventory policies before implementing changes.',
      whoFor: ['Manufacturers with complex inbound flows', 'Retailers carrying too much stock', 'Companies diversifying suppliers'],
      benefits: ['End-to-end network mapping', 'Landed cost and lead-time modelling', 'Inventory and safety-stock policy', 'Supplier diversification plan'],
      timeline: '6–12 weeks',
      priceFrom: 5000,
      tags: ['supply chain', 'inventory', 'sourcing', 'logistics'],
      faqs: [
        { q: 'Can you source products for us?', a: 'Yes. We run supplier discovery and vetting in India, Pakistan, Europe and the Far East, including sample coordination and factory checks through partners.' },
      ],
    },
    {
      slug: 'ecommerce-fulfilment',
      title: 'E-commerce Fulfilment',
      summary: 'Storage, pick-and-pack and returns for Gulf e-commerce brands.',
      overview:
        'We connect your storefront to a Jebel Ali fulfilment operation with accurate stock counts, same-day dispatch cut-offs and returns handling, plus courier rate negotiation.',
      whoFor: ['Shopify and Amazon sellers entering the GCC', 'Brands scaling beyond home fulfilment', 'Marketplaces needing regional stock'],
      benefits: ['Storefront and marketplace integrations', 'Same-day dispatch cut-offs', 'Returns and refurbishment workflow', 'Courier rate negotiation'],
      timeline: '1–3 weeks',
      priceFrom: 750,
      tags: ['e-commerce', 'fulfilment', 'Shopify', 'GCC'],
      faqs: [
        { q: 'Which platforms do you integrate with?', a: 'Shopify, WooCommerce, Amazon and Noon are standard. Others can be connected via API or CSV workflows.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* I. Human resources & recruitment                                           */
/* -------------------------------------------------------------------------- */
const hr = {
  id: 'hr',
  slug: 'hr',
  letter: 'I',
  title: 'Human Resources & Recruitment',
  short: 'Executive search, mass hiring and payroll compliance.',
  description:
    'Executive search, volume recruitment, overseas manpower and HR infrastructure — with UAE labour law, WPS and Saudization compliance built in.',
  icon: 'Users',
  destinations: ['UAE', 'Saudi Arabia', 'United Kingdom', 'Europe', 'India', 'Pakistan', 'USA', 'Estonia'],
  services: [
    {
      slug: 'executive-search',
      title: 'Executive Search',
      summary: 'Confidential search for leadership roles that shape the next chapter.',
      overview:
        'We run retained search for C-suite, board and functional leadership roles. The process is research-led, confidential and includes structured assessment and market-mapping.',
      whoFor: ['Boards hiring a CEO or CFO', 'Founders hiring their first leadership team', 'Groups entering a new market'],
      benefits: ['Market mapping and confidential outreach', 'Structured competency interviews', 'Compensation benchmarking', 'Offer negotiation and onboarding'],
      timeline: '6–12 weeks',
      priceFrom: 8000,
      tags: ['executive search', 'leadership', 'C-suite'],
      faqs: [
        { q: 'How are search fees structured?', a: 'Retained search is typically a percentage of first-year compensation, billed in milestones. We agree the scope and fee before any outreach.' },
      ],
    },
    {
      slug: 'mass-recruitment',
      title: 'Mass Recruitment & Staffing',
      summary: 'Hire 20 or 200 people with screening and compliance handled.',
      overview:
        'For volume hiring we build a pipeline, run structured screening and coordinate interviews and offers, with mobilisation support for visas and onboarding.',
      whoFor: ['Retail, hospitality and logistics operators', 'Companies opening a new site', 'Projects with tight mobilisation dates'],
      benefits: ['Pipeline building and screening', 'Interview coordination at scale', 'Visa and mobilisation support', 'Onboarding and retention reporting'],
      timeline: '3–8 weeks',
      priceFrom: 2500,
      tags: ['recruitment', 'staffing', 'volume hiring'],
      faqs: [
        { q: 'Do you supply temporary staff?', a: 'Yes, through licensed manpower partners. We confirm the permitted categories and duration for your jurisdiction.' },
      ],
    },
    {
      slug: 'hr-payroll-wps',
      title: 'HR Policy, Payroll & WPS',
      summary: 'Compliant contracts, payroll and Wage Protection System filings.',
      overview:
        'We draft compliant employment contracts and handbooks, run monthly payroll and manage WPS filings and end-of-service calculations, coordinated with your bank.',
      whoFor: ['SMEs without an HR team', 'Companies scaling headcount quickly', 'Groups standardising HR across entities'],
      benefits: ['Contracts and handbook drafting', 'Monthly payroll and WPS processing', 'End-of-service and leave calculations', 'HR compliance reviews'],
      timeline: 'Monthly; setup 2–4 weeks',
      priceFrom: 400,
      tags: ['payroll', 'WPS', 'HR policy', 'UAE labour law'],
      faqs: [
        { q: 'Can you fix historical WPS gaps?', a: 'We assess exposure, coordinate with your bank and advise on remediation. Penalties and legal positions are reviewed with employment counsel.' },
      ],
    },
    {
      slug: 'overseas-manpower',
      title: 'Overseas Employment & Manpower',
      summary: 'Source skilled and semi-skilled workers from India and Pakistan.',
      overview:
        'We source vetted candidates across construction, hospitality, logistics, healthcare and domestic work, managing documentation, medicals and mobilisation with licensed partners.',
      whoFor: ['Contractors mobilising projects', 'Hospitality groups opening properties', 'Households recruiting domestic staff'],
      benefits: ['Vetted candidate pipelines', 'Trade testing and reference checks', 'Visa and medical coordination', 'Ethical recruitment practices'],
      timeline: '6–14 weeks',
      priceFrom: 1800,
      tags: ['manpower', 'overseas', 'India', 'Pakistan'],
      faqs: [
        { q: 'How do you protect workers from exploitation?', a: 'We work only with licensed agencies, insist on transparent contracts and prohibit worker-paid recruitment fees. Candidates receive their terms in writing before travel.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* J. Technology, digital & marketing                                         */
/* -------------------------------------------------------------------------- */
const technology = {
  id: 'technology',
  slug: 'technology',
  letter: 'J',
  title: 'Technology, Digital & Marketing',
  short: 'Web, apps, ERP, AI, cybersecurity and growth.',
  description:
    'Digital transformation, product builds, ERP and CRM, AI analytics, cybersecurity and brand-led marketing — delivered by senior practitioners with commercial judgement.',
  icon: 'Cpu',
  destinations: ['UAE', 'Saudi Arabia', 'United Kingdom', 'Europe', 'Estonia', 'USA', 'India', 'Pakistan'],
  services: [
    {
      slug: 'digital-transformation',
      title: 'Digital Transformation',
      summary: 'A pragmatic roadmap from legacy processes to measurable digital capability.',
      overview:
        'We assess systems, data and processes, then sequence change around value rather than vendor hype. Deliverables include a target architecture, business case and phased roadmap.',
      whoFor: ['Mid-market companies with fragmented systems', 'Family groups modernising operations', 'Public-sector teams digitising services'],
      benefits: ['Current-state systems and process audit', 'Target architecture and vendor shortlist', 'Business case with total cost of ownership', 'Phased roadmap and governance'],
      timeline: '6–12 weeks',
      priceFrom: 6500,
      tags: ['digital transformation', 'roadmap', 'architecture'],
      faqs: [
        { q: 'Do you implement as well as advise?', a: 'Yes. We can run the programme or work alongside your team and vendors. We do not resell software licences, so recommendations stay independent.' },
      ],
    },
    {
      slug: 'web-app-development',
      title: 'Website & App Development',
      summary: 'Fast, accessible products built to convert and easy to maintain.',
      overview:
        'We design and build marketing sites, e-commerce and web applications in React and Next.js, with a focus on performance, accessibility and handover documentation.',
      whoFor: ['Brands replacing a slow legacy website', 'Founders launching an MVP', 'Companies needing an internal portal'],
      benefits: ['UX and interface design', 'React/Next.js engineering', 'Performance and accessibility budgets', 'Analytics, SEO and handover'],
      timeline: '4–16 weeks',
      priceFrom: 4500,
      tags: ['web development', 'React', 'app', 'MVP'],
      faqs: [
        { q: 'Do we own the code?', a: 'Yes. You receive the full repository, documentation and deployment access at handover. There is no proprietary lock-in.' },
      ],
    },
    {
      slug: 'erp-crm-implementation',
      title: 'ERP & CRM Implementation',
      summary: 'The right system, cleanly configured, actually adopted.',
      overview:
        'We select, configure and roll out ERP and CRM platforms, with data migration, integrations and training. The measure of success is adoption, not go-live.',
      whoFor: ['Businesses outgrowing spreadsheets', 'Sales teams with no pipeline visibility', 'Groups consolidating multiple systems'],
      benefits: ['Requirements and vendor selection', 'Configuration and data migration', 'Integrations and automation', 'Training and adoption tracking'],
      timeline: '8–24 weeks',
      priceFrom: 7000,
      tags: ['ERP', 'CRM', 'migration', 'automation'],
      faqs: [
        { q: 'Which platforms do you work with?', a: 'Odoo, Zoho, HubSpot, Salesforce, Microsoft Dynamics and custom builds. We recommend based on fit and total cost, not partner margins.' },
      ],
    },
    {
      slug: 'ai-data-analytics',
      title: 'AI & Data Analytics',
      summary: 'Use your data and AI responsibly, with a measurable return.',
      overview:
        'We identify high-value use cases, prepare data, build models and assistants, and put guardrails around them. Start small, prove value, then scale what works.',
      whoFor: ['Companies with data but no insight', 'Teams exploring AI assistants', 'Leaders needing an AI governance policy'],
      benefits: ['Use-case discovery and prioritisation', 'Data readiness and pipeline work', 'Model or assistant development', 'AI policy and governance'],
      timeline: '6–16 weeks',
      priceFrom: 6000,
      tags: ['AI', 'analytics', 'machine learning', 'governance'],
      faqs: [
        { q: 'Will our data be used to train public models?', a: 'No. We use enterprise endpoints with data-processing terms that exclude training on your data, and we document the data flow.' },
      ],
    },
    {
      slug: 'branding-digital-marketing',
      title: 'Branding, SEO & Digital Marketing',
      summary: 'A distinctive brand and a growth engine that compounds.',
      overview:
        'We build brand systems, websites and content programmes, then run SEO, paid media and social with clear attribution. Every engagement starts with a measurement plan.',
      whoFor: ['Brands entering the GCC or Europe', 'Companies with traffic but weak conversion', 'Founders launching a new category'],
      benefits: ['Brand strategy and identity system', 'Technical and content SEO', 'Paid media and social management', 'Analytics and attribution setup'],
      timeline: '4–12 weeks to launch; ongoing growth',
      priceFrom: 2800,
      tags: ['branding', 'SEO', 'marketing', 'social media'],
      faqs: [
        { q: 'Do you guarantee rankings?', a: 'No credible agency can. We set realistic targets, improve technical foundations and report transparently on leading indicators.' },
      ],
    },
    {
      slug: 'cybersecurity-advisory',
      title: 'Cybersecurity & IT Advisory',
      summary: 'Find the gaps before an attacker does, then close them.',
      overview:
        'We run security assessments, review cloud configuration and identity controls, and build incident-response playbooks. Recommendations are prioritised by business risk and cost.',
      whoFor: ['Companies handling sensitive customer data', 'Teams moving to the cloud', 'Boards needing cyber-risk reporting'],
      benefits: ['Security and cloud configuration review', 'Identity and access management', 'Incident response playbook', 'Board-level risk reporting'],
      timeline: '3–8 weeks',
      priceFrom: 4000,
      tags: ['cybersecurity', 'cloud', 'risk', 'incident response'],
      faqs: [
        { q: 'Do you perform penetration tests?', a: 'We coordinate certified penetration testers and translate the findings into a prioritised remediation plan.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* K. Real estate, construction & property                                    */
/* -------------------------------------------------------------------------- */
const realEstate = {
  id: 'real-estate',
  slug: 'real-estate',
  letter: 'K',
  title: 'Real Estate & Property',
  short: 'Investment, management, construction and design.',
  description:
    'Property investment advisory, management, construction project management and interiors for buyers, landlords and developers in Dubai, the UK and Europe.',
  icon: 'Home',
  destinations: ['UAE', 'United Kingdom', 'Europe', 'Saudi Arabia', 'India', 'Pakistan'],
  services: [
    {
      slug: 'property-investment',
      title: 'Property Investment Advisory',
      summary: 'Buy for yield, capital growth or lifestyle — with the numbers in front of you.',
      overview:
        'We compare off-plan and ready properties against your objectives, model net yield after service charges and fees, and review developer track record and payment plans before you commit.',
      whoFor: ['First-time international buyers', 'Investors comparing Dubai, London and Europe', 'Families buying a home abroad'],
      benefits: ['Area and developer comparison', 'Net yield and total-cost modelling', 'Payment-plan and mortgage guidance', 'Legal and title due diligence coordination'],
      timeline: '3–8 weeks',
      priceFrom: 1800,
      featured: true,
      tags: ['Dubai property', 'investment', 'off-plan', 'London'],
      faqs: [
        { q: 'Is Dubai property still a good investment?', a: 'It can be, but performance varies sharply by building, area and entry price. We model net yield and exit assumptions rather than quoting headline averages.' },
      ],
    },
    {
      slug: 'property-management',
      title: 'Property Management',
      summary: 'Tenants, maintenance and statements handled while you are abroad.',
      overview:
        'We manage leasing, rent collection, maintenance and owner statements for international landlords, with vetted contractors and transparent reporting.',
      whoFor: ['Overseas landlords', 'Investors with multiple units', 'Owners wanting hands-off management'],
      benefits: ['Tenant sourcing and screening', 'Rent collection and statements', 'Maintenance coordination', 'Renewals and compliance'],
      timeline: 'Ongoing; onboarding 1–2 weeks',
      priceFrom: 1200,
      tags: ['property management', 'landlord', 'Dubai', 'rental'],
      faqs: [
        { q: 'What are your management fees?', a: 'Typically a percentage of annual rent plus agreed charges for letting and maintenance coordination. The schedule is fixed in writing before onboarding.' },
      ],
    },
    {
      slug: 'construction-project-management',
      title: 'Construction Project Management',
      summary: 'Cost, programme and quality controlled from brief to handover.',
      overview:
        'We represent owners on fit-out and construction projects, managing consultants, contractors, budgets and approvals. Weekly reporting keeps surprises off the critical path.',
      whoFor: ['Landlords delivering a fit-out', 'Developers needing owner representation', 'Businesses building a new facility'],
      benefits: ['Brief, budget and programme development', 'Tender and contractor selection', 'Cost and quality control', 'Handover and snag management'],
      timeline: 'Project-dependent; 3–18 months',
      priceFrom: 7500,
      tags: ['construction', 'fit-out', 'project management'],
      faqs: [
        { q: 'Do you take design responsibility?', a: 'We coordinate licensed architects and engineers. Design liability remains with the appointed consultants, as is standard.' },
      ],
    },
    {
      slug: 'interior-design-consultancy',
      title: 'Interior & Design Consultancy',
      summary: 'Spaces that work commercially and feel considered.',
      overview:
        'We coordinate interior design for homes, offices and hospitality spaces — concept, procurement and delivery — with cost plans that hold from first sketch to installation.',
      whoFor: ['Homeowners renovating a villa or apartment', 'Companies fitting out an office', 'Hospitality operators refreshing a venue'],
      benefits: ['Concept and space planning', 'FF&E procurement', 'Contractor coordination', 'Budget and timeline control'],
      timeline: '6–20 weeks',
      priceFrom: 3500,
      tags: ['interior design', 'fit-out', 'FF&E'],
      faqs: [
        { q: 'Can you work with our existing furniture?', a: 'Yes. We often blend existing pieces with new acquisitions to control cost and preserve what already works.' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* L. Specialised advisory                                                    */
/* -------------------------------------------------------------------------- */
const specialised = {
  id: 'specialised',
  slug: 'specialised',
  letter: 'L',
  title: 'Specialised & Sector Advisory',
  short: 'Healthcare, energy, government, NGO and family office.',
  description:
    'Sector-specific advisory for healthcare, energy, government, non-profits and private families — delivered with specialist partners and strict confidentiality.',
  icon: 'Sparkles',
  destinations: ['UAE', 'Saudi Arabia', 'United Kingdom', 'Europe', 'Estonia', 'USA', 'India', 'Pakistan'],
  services: [
    {
      slug: 'healthcare-licensing',
      title: 'Healthcare & Medical Licensing',
      summary: 'Facility and professional licensing for clinics, labs and practitioners.',
      overview:
        'We manage healthcare licensing with DHA, DOH and MOHAP — facility registration, professional credentialing, equipment approvals and inspection readiness — for clinics, labs and telehealth providers.',
      whoFor: ['Clinic owners entering the UAE', 'Practitioners needing credentialing', 'Telehealth and medical-device companies'],
      benefits: ['Facility and professional licensing', 'Credentialing and exam guidance', 'Inspection readiness', 'Ongoing renewals'],
      timeline: '8–20 weeks',
      priceFrom: 6000,
      tags: ['healthcare', 'DHA', 'MOHAP', 'clinic'],
      faqs: [
        { q: 'Which regulator applies to my clinic?', a: 'It depends on the emirate and whether you are in a free zone. We confirm the correct authority and route before starting.' },
      ],
    },
    {
      slug: 'energy-renewable-advisory',
      title: 'Energy & Renewable Advisory',
      summary: 'Commercial and regulatory support for energy projects and transition.',
      overview:
        'We support solar, efficiency and transition projects with feasibility, procurement strategy, offtake modelling and regulatory navigation, partnering with technical engineers where required.',
      whoFor: ['Industrial energy users', 'Renewable project developers', 'Investors evaluating energy assets'],
      benefits: ['Feasibility and business-case modelling', 'Procurement and tender support', 'Regulatory and offtake guidance', 'Technical partner coordination'],
      timeline: '8–20 weeks',
      priceFrom: 7000,
      tags: ['energy', 'solar', 'renewables', 'sustainability'],
      faqs: [
        { q: 'Do you provide engineering services?', a: 'We coordinate licensed engineering partners for design and technical validation, while retaining the commercial and regulatory workstream.' },
      ],
    },
    {
      slug: 'government-advisory',
      title: 'Government & Public-Sector Advisory',
      summary: 'Policy, service design and delivery for public institutions.',
      overview:
        'We support public bodies with strategy, service design, performance frameworks and delivery units, often alongside delivery partners and with strict procurement compliance.',
      whoFor: ['Government entities and authorities', 'Regulators designing frameworks', 'Public-private partnership teams'],
      benefits: ['Strategy and policy analysis', 'Service design and journey mapping', 'Performance and delivery frameworks', 'Stakeholder engagement'],
      timeline: '8–24 weeks',
      priceFrom: 12000,
      tags: ['government', 'public sector', 'policy'],
      faqs: [
        { q: 'Can you work with procurement rules?', a: 'Yes. We are familiar with public procurement processes and can structure engagements to meet transparency and conflict-of-interest requirements.' },
      ],
    },
    {
      slug: 'ngo-advisory',
      title: 'Non-Profit & NGO Advisory',
      summary: 'Governance, fundraising and impact measurement that donors trust.',
      overview:
        'We help non-profits strengthen governance, build sustainable funding pipelines and measure outcomes credibly, with reporting that satisfies institutional donors.',
      whoFor: ['Newly established foundations', 'NGOs scaling programmes', 'Corporate foundations'],
      benefits: ['Governance and compliance review', 'Fundraising and grant strategy', 'Impact measurement framework', 'Donor reporting templates'],
      timeline: '6–12 weeks',
      priceFrom: 3000,
      tags: ['NGO', 'non-profit', 'fundraising', 'impact'],
      faqs: [
        { q: 'Do you offer reduced fees for small NGOs?', a: 'We reserve a portion of our capacity for pro-bono and reduced-fee engagements each year. Tell us about your work and we will be honest about fit.' },
      ],
    },
    {
      slug: 'family-office',
      title: 'Family Office & Concierge',
      summary: 'One discreet team for family wealth, residences and lifestyle needs.',
      overview:
        'We coordinate the moving parts of a multi-jurisdiction family: holding structures, reporting, property, travel, education and household staffing, with a single trusted point of contact.',
      whoFor: ['Entrepreneurial families with global assets', 'Families relocating between regions', 'Single-family offices needing support'],
      benefits: ['Consolidated reporting and coordination', 'Structure and adviser coordination', 'Travel, property and lifestyle management', 'Strict confidentiality protocols'],
      timeline: 'Ongoing; setup 4–8 weeks',
      priceFrom: 5000,
      tags: ['family office', 'wealth', 'concierge', 'confidential'],
      faqs: [
        { q: 'How do you handle confidentiality?', a: 'We use need-to-know access, encrypted document sharing and named-team-only involvement. Staff sign bespoke confidentiality undertakings.' },
      ],
    },
  ],
}

const rawCategories = [education, travel, immigration, businessSetup, strategy, finance, legal, trade, hr, technology, realEstate, specialised]

// Enrich every raw service with its process, documents, packages, path and default FAQs.
// This is what makes adding a single object in the catalogue enough to create a full page.
export const serviceCategories = rawCategories.map((category) => ({
  ...category,
  services: category.services.map((svc) => makeService(category.id, svc)),
}))

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((svc) => ({
    ...svc,
    categoryTitle: category.title,
    categorySlug: category.slug,
    categoryIcon: category.icon,
    categoryLetter: category.letter,
    icon: svc.icon || category.icon,
  })),
)

export const featuredServices = allServices.filter((s) => s.featured)

export const getCategory = (slug) => serviceCategories.find((c) => c.slug === slug)

export const getService = (categorySlug, serviceSlug) => {
  const category = getCategory(categorySlug)
  if (!category) return null
  const found = category.services.find((s) => s.slug === serviceSlug)
  if (!found) return null
  return allServices.find((s) => s.categorySlug === categorySlug && s.slug === serviceSlug) || found
}

export const findServiceByPath = (categorySlug, serviceSlug) => getService(categorySlug, serviceSlug)

export const totalServiceCount = allServices.length

export { processTemplates, categoryDocs }
export const servicesPartOne = [education, travel, immigration, businessSetup, strategy]

