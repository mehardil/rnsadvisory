/**
 * Insights — nine original articles written for RNS Global.
 * Article bodies are structured blocks so the page can build a table of contents,
 * reading progress and related-post logic without a markdown dependency.
 */

export const authors = {
  amara: {
    name: 'Amara Siddiqui',
    role: 'Head of Immigration',
    initials: 'AS',
    bio: 'Leads UAE and Saudi immigration at RNS Global. Fifteen years advising founders, families and employers on residency strategy.',
  },
  daniel: {
    name: 'Daniel Okoye',
    role: 'Director, Education',
    initials: 'DO',
    bio: 'Former university admissions officer. Helps students choose credible pathways across the UK, Europe and North America.',
  },
  priya: {
    name: 'Priya Raman',
    role: 'Head of Corporate Services',
    initials: 'PR',
    bio: 'Company formation and compliance specialist covering the UAE, Saudi Arabia, the UK and Estonia.',
  },
  yusuf: {
    name: 'Yusuf Karim',
    role: 'Partner, Trade & Logistics',
    initials: 'YK',
    bio: 'Runs the Jebel Ali operations hub and advises importers on customs, warehousing and GCC distribution.',
  },
  helen: {
    name: 'Helen Marsh',
    role: 'Director, Tax & Finance',
    initials: 'HM',
    bio: 'Chartered accountant advising cross-border businesses on UAE corporate tax, VAT and transaction structuring.',
  },
  omar: {
    name: 'Omar Haddad',
    role: 'Partner, Strategy',
    initials: 'OH',
    bio: 'Advises boards on market entry and operating models across the Gulf and Europe.',
  },
}

export const articles = [
  {
    slug: 'uae-golden-visa-2026',
    title: 'The UAE Golden Visa in 2026: who qualifies, and how to apply without wasting a year',
    excerpt:
      'Long-term UAE residency is more accessible than most people think, but the categories are specific. Here is how to find the route that actually fits your profile.',
    category: 'Immigration',
    tags: ['Golden Visa', 'UAE', 'Residency', 'Investors'],
    date: '2026-09-18',
    readingTime: '8 min read',
    author: 'amara',
    heroPrompt: 'Dubai skyline at blue hour, glass towers, gold accents, editorial',
    takeaways: [
      'There are several Golden Visa categories — property, salary, entrepreneurship, talent — and each has different evidence requirements.',
      'Most delays come from inconsistent documents, not from ineligibility.',
      'A Golden Visa is a residency permit, not a tax residency certificate; those are separate questions.',
    ],
    sections: [
      {
        id: 'why-it-matters',
        heading: 'Why the Golden Visa still matters',
        paragraphs: [
          'The UAE Golden Visa offers long-term residency — typically ten years, renewable — without the continuous-residence requirement that applies to standard employment visas. For founders, investors and senior professionals who move between markets, that flexibility is the product. It removes the annual renewal treadmill and gives families a stable base.',
          'It is also widely misunderstood. The visa does not automatically make you a UAE tax resident, does not grant citizenship, and does not replace the need for a valid passport or compliance with renewal conditions. Treat it as a residence and mobility tool, not a passport substitute.',
        ],
      },
      {
        id: 'categories',
        heading: 'The categories that matter in practice',
        paragraphs: [
          'In practice, most successful applications fall into four groups. Property investors qualify through ownership of qualifying real estate, with the threshold and valuation method confirmed by the relevant authority. Professionals qualify through salary and occupational classification, usually evidenced by an attested employment contract, salary certificate and bank statements.',
          'Entrepreneurs and founders qualify through a licensed business, a credible business plan and, in some routes, an incubation or accreditation letter. Exceptional talent — culture, sport, science, academia — follows a nomination route with a different evidence set. The mistake is assuming one category and forcing the file; the right approach is to test all plausible categories against your documents.',
        ],
        bullets: [
          'Property: title deed, valuation and developer documentation',
          'Professional: salary certificate, contract, bank statements, degree attestation',
          'Entrepreneur: licence, business plan, financials, incubation where required',
          'Talent: nominations, portfolio, publications, awards or governing-body letters',
        ],
      },
      {
        id: 'evidence',
        heading: 'Where applications actually fail',
        paragraphs: [
          'In our files, refusals and delays rarely stem from a missing qualification. They come from inconsistency: a salary certificate that does not match bank credits, a title deed valuation that conflicts with the developer letter, or a degree that was never attested. Officers are trained to look for coherence, and incoherence reads as risk.',
          'Build the file backwards from the evidence. Start with the strongest category, list every document the authority expects, and check that names, dates, amounts and job titles match across all of them. If they do not, fix the underlying record before submitting. A two-week delay to correct documents is cheaper than a six-month appeal.',
        ],
      },
      {
        id: 'process',
        heading: 'A realistic timeline',
        paragraphs: [
          'A clean application typically takes three to eight weeks from document readiness to residency stamping, including medical testing and Emirates ID. Complex cases — multiple dependants, foreign property valuations or prior immigration issues — take longer. Anyone promising a fixed seven-day outcome before reviewing your documents is guessing.',
          'Renewals are simpler but not automatic. Keep the qualifying asset or employment status intact, monitor expiry dates, and start the renewal three months early. If your circumstances change — you sell the property, change jobs or close the company — confirm whether the category still holds before the renewal window opens.',
        ],
      },
      {
        id: 'next-step',
        heading: 'What to do next',
        paragraphs: [
          'Gather your passport, current visa, Emirates ID, salary or business documents, bank statements and any property or nomination evidence. Then ask a specialist to map each document against each category before you pay any government fee. A short eligibility review is far cheaper than a failed file.',
        ],
      },
    ],
  },
  {
    slug: 'study-in-estonia',
    title: 'Study in Estonia: Europe’s quietest route to a digital-first degree',
    excerpt:
      'Affordable tuition, English-taught programmes and a genuinely digital society have made Estonia a serious option for international students. Here is what to know before applying.',
    category: 'Education',
    tags: ['Estonia', 'Europe', 'Study Abroad', 'Student Visa'],
    date: '2026-08-27',
    readingTime: '7 min read',
    author: 'daniel',
    heroPrompt: 'Tallinn old town with modern glass architecture, Baltic light, editorial',
    takeaways: [
      'Estonia offers English-taught bachelor’s and master’s programmes at a fraction of UK or US costs.',
      'Application windows are narrow and programme-specific — start a year ahead.',
      'Estonia is a study destination and an EU business gateway; many students build companies while studying.',
    ],
    sections: [
      {
        id: 'why-estonia',
        heading: 'Why Estonia',
        paragraphs: [
          'Estonia is small, northern and unusually digital. Public services, banking and company registration are built around a digital identity, and universities reflect that culture. For students in technology, business, cybersecurity and data, the environment is less about prestige and more about proximity to how modern digital states actually work.',
          'The cost case is compelling. Tuition for English-taught programmes commonly sits in a range well below UK and US equivalents, and living costs in Tallinn — while rising — remain lower than London, Amsterdam or Copenhagen. Scholarships exist but are competitive; budget as if you will pay full tuition and treat any award as upside.',
        ],
      },
      {
        id: 'programmes',
        heading: 'Programmes and institutions',
        paragraphs: [
          'The main options include the University of Tartu, Tallinn University of Technology (TalTech) and Tallinn University, alongside private institutions and applied-sciences colleges. Each has different strengths: Tartu is research-led, TalTech is strong in engineering and technology, and Tallinn University covers education, humanities and digital culture.',
          'Check accreditation and the language of instruction carefully. Some programmes are taught in Estonian with English tracks, and a few are delivered jointly with partner universities abroad. Look at module lists and graduate destinations rather than rankings alone, especially for specialised master’s degrees.',
        ],
        bullets: [
          'Application windows usually open in autumn and close between January and March for autumn entry',
          'Most programmes require a motivation letter and, for some, an entrance exam or interview',
          'English proficiency requirements vary by institution — IELTS, TOEFL or institutional tests',
        ],
      },
      {
        id: 'visa',
        heading: 'The student visa and residence permit',
        paragraphs: [
          'Non-EU students need a temporary residence permit for study, not a short-stay visa. The process begins after admission and requires proof of sufficient funds, health insurance, accommodation and tuition payment. Applications are typically lodged through the Estonian embassy or a visa centre in your country.',
          'Timing is the biggest risk. Appointment availability can be limited in peak months, and the permit decision takes time. Start the visa file as soon as you have an admission letter, and do not book non-refundable travel until the permit is issued. Bring original documents to the appointment; scanned copies are not a substitute.',
        ],
      },
      {
        id: 'life',
        heading: 'Living and working',
        paragraphs: [
          'Tallinn is compact, walkable in the centre and well connected by public transport. Winters are dark and cold, which surprises students from South Asia and the Gulf; budget for proper clothing and plan social connections early. The student community is international, and many programmes run orientation and buddy schemes.',
          'Students can work part-time under permit conditions, but do not build your financial plan around it. Estonia’s real advantage is the ability to register a company and operate digitally. Many graduates stay in the EU startup ecosystem, and the e-Residency programme makes it straightforward to keep an Estonian company after graduation.',
        ],
      },
      {
        id: 'fit',
        heading: 'Is it the right fit?',
        paragraphs: [
          'Estonia suits independent students who are comfortable with a small, quiet city and a digital-first culture. It is less suitable if you want a large campus experience or a dense job market in every sector. Be honest about that fit before you apply, not after you arrive.',
        ],
      },
    ],
  },
  {
    slug: 'dubai-free-zone-company-setup',
    title: 'Starting a company in a Dubai free zone: a practical, cost-aware guide',
    excerpt:
      'Free zones promise speed and full ownership. The real work is choosing the right zone, understanding renewals and building a banking file that survives compliance.',
    category: 'Business',
    tags: ['Dubai', 'Free Zone', 'Company Formation', 'Banking'],
    date: '2026-07-30',
    readingTime: '9 min read',
    author: 'priya',
    heroPrompt: 'Dubai free zone business district, glass towers and desert light, editorial',
    takeaways: [
      'The cheapest licence is rarely the cheapest company — renewal, visa and office costs change the maths.',
      'Bank account opening is the real bottleneck; prepare the compliance story before you incorporate.',
      'Free-zone companies can trade internationally, but mainland activity needs a different structure.',
    ],
    sections: [
      {
        id: 'why-free-zone',
        heading: 'What a free zone actually gives you',
        paragraphs: [
          'A free-zone company is registered in a designated economic zone rather than under the mainland licensing system. It generally allows full foreign ownership, a defined activity list and a straightforward visa quota. For consultants, e-commerce operators, holding companies and international traders, that is often enough.',
          'It does not give unrestricted access to the UAE mainland market. If you sell services directly to local customers or bid for government work, you may need a mainland licence, a branch or a distributor. Many founders start in a free zone for cost and speed, then add a mainland presence when revenue justifies it.',
        ],
      },
      {
        id: 'choosing-zone',
        heading: 'Choosing a zone without overpaying',
        paragraphs: [
          'Zones differ on activity fit, office requirements, visa quota, banking reputation and renewal cost. A licence that costs less in year one can cost more in year three once mandatory office or visa packages are included. Compare total cost over three years, not the headline package.',
          'Ask four questions of every quote: which activities are included, how many visas are permitted, what office or flexi-desk is mandatory, and what the renewal fee will be. If a proposal does not answer all four in writing, it is not a real quote. Also check whether your bank will recognise the zone — some compliance teams are more comfortable with established free zones than with newer ones.',
        ],
        bullets: [
          'DMCC and JAFZA: established, stronger banking recognition, higher cost',
          'IFZA, Meydan and SHAMS: cost-effective for consultants and digital businesses',
          'DIFC: financial services and professional services, separate legal framework',
          'Dubai South and specialised zones: logistics, aviation and industrial activity',
        ],
      },
      {
        id: 'costs',
        heading: 'The full cost picture',
        paragraphs: [
          'Budget for licence and registration, establishment card, visa quota, medical and Emirates ID, office or flexi-desk, bank fees and renewal. Add professional costs for attestation, translation and compliance. A simple package may start around a few thousand dollars, but a realistic first-year total with two visas and an office is usually higher.',
          'Corporate tax adds another layer. Free-zone companies may qualify for a zero rate on qualifying income, but the conditions are specific and require proper records. Do not assume the free-zone label alone delivers the benefit; model it with an accountant before you choose a structure.',
        ],
      },
      {
        id: 'banking',
        heading: 'Banking: prepare the story before you apply',
        paragraphs: [
          'Banks are assessing risk, not paperwork volume. They want to understand who owns the company, where the money comes from, what the business does and why it needs a UAE account. A clear business description, contracts, invoices and a coherent source-of-funds narrative matter more than a thick folder.',
          'Expect at least one visit for most banks, and be ready for follow-up questions. If your business is high-risk by category — crypto, precious metals, gaming, certain consulting models — target banks and fintechs with a known appetite rather than applying everywhere and collecting refusals. Two thoughtful applications beat ten speculative ones.',
        ],
      },
      {
        id: 'checklist',
        heading: 'A simple launch sequence',
        paragraphs: [
          'Decide the activity and jurisdiction, reserve the name, prepare shareholder documents and KYC, sign the incorporation documents, obtain the licence and establishment card, apply for visas, then open the bank account. Run banking preparation in parallel with incorporation, not after it.',
        ],
        bullets: [
          'Week 1: activity, zone comparison, name reservation',
          'Week 2: documents, KYC, incorporation filing',
          'Week 3: licence, establishment card, visa quota',
          'Weeks 3–6: bank application, compliance interview, account activation',
        ],
      },
    ],
  },
  {
    slug: 'uk-student-visa-tips',
    title: 'UK student visa: eight practical ways to avoid a refusal',
    excerpt:
      'Most UK student visa refusals are avoidable. These are the issues we see repeatedly — and how to fix them before you submit.',
    category: 'Education',
    tags: ['UK', 'Student Visa', 'Admissions', 'Compliance'],
    date: '2026-07-12',
    readingTime: '6 min read',
    author: 'daniel',
    heroPrompt: 'London university campus, autumn light, editorial architecture',
    takeaways: [
      'Financial evidence is the most common failure point — the 28-day rule is strict.',
      'Your CAS, application and supporting documents must tell one consistent story.',
      'Credibility interviews are not formal tests, but unprepared answers create doubt.',
    ],
    sections: [
      {
        id: 'cas',
        heading: 'Start with a clean CAS',
        paragraphs: [
          'Your Confirmation of Acceptance for Studies is the spine of the application. Check that your name, passport number, course, fees and sponsor details match your documents exactly. A small mismatch can trigger requests for evidence and delay a decision.',
          'If you have a conditional offer, clear the conditions before applying. Do not rely on the university to fix errors after submission; communicate with admissions early and keep written confirmation of any change.',
        ],
      },
      {
        id: 'money',
        heading: 'Get the financial evidence right',
        paragraphs: [
          'The UK requires evidence that tuition and living costs are available and have been held for a specified period, typically 28 consecutive days ending no more than 31 days before the application date. The rule is mechanical. A balance that dips on day 27, even briefly, can fail.',
          'Use the correct currency conversion date, provide the exact bank statements requested and include a letter from the sponsor where funds are held by a parent. Avoid last-minute transfers that create unexplained deposits. If the money has been in the account for years, the paper trail is simple; if it arrived last month, be ready to explain the source.',
        ],
        bullets: [
          'Check the exact maintenance amount for your course and city',
          'Statements must show the account holder, bank, dates and balance clearly',
          'Keep a buffer above the minimum — exchange-rate movement is real',
          'Sponsor letters and relationship evidence must match the birth certificate',
        ],
      },
      {
        id: 'story',
        heading: 'Make the story coherent',
        paragraphs: [
          'Officers assess credibility: why this course, why this university, why the UK, and what it does for your future. Your personal statement, application form and interview answers should align. If your academic background is in engineering but your statement says you have always dreamed of fashion, explain the pivot convincingly.',
          'Avoid generic statements about the UK being a global education hub. Be specific about modules, faculty, facilities and the career path you are pursuing. Specificity reads as preparation; vagueness reads as risk.',
        ],
      },
      {
        id: 'interview',
        heading: 'Prepare for the credibility interview',
        paragraphs: [
          'Not every applicant is interviewed, but when it happens, the questions are predictable: course content, reasons for choosing the institution, funding, accommodation and post-study plans. Practice concise, honest answers. Do not memorise a script — interviewers notice.',
          'If you are relying on family funds, know the sponsor’s occupation and income. If you have a gap year, explain it. If you have studied in another country, be ready to discuss it. The goal is consistency, not perfection.',
        ],
      },
      {
        id: 'after',
        heading: 'After approval',
        paragraphs: [
          'Check your visa vignette dates, register with the university on arrival and keep your BRP or digital status details safe. Do not travel before your visa starts. If your plans change, update the university and check whether your visa conditions still apply.',
        ],
      },
    ],
  },
  {
    slug: 'exporting-from-jebel-ali',
    title: 'Exporting from Jebel Ali: a practical guide for first-time traders',
    excerpt:
      'Jebel Ali is one of the world’s busiest ports, but speed depends on documentation and classification. Here is how to move goods without paying for avoidable delays.',
    category: 'Trade',
    tags: ['Jebel Ali', 'Export', 'Customs', 'Logistics'],
    date: '2026-06-21',
    readingTime: '7 min read',
    author: 'yusuf',
    heroPrompt: 'Jebel Ali port cranes at dusk, containers, gold light, editorial',
    takeaways: [
      'Correct HS classification drives duty, compliance and speed.',
      'Bonded storage can defer duty, but the rules are specific to the goods and zone.',
      'A landed-cost model prevents margin surprises before the first shipment.',
    ],
    sections: [
      {
        id: 'why-jebel-ali',
        heading: 'Why traders use Jebel Ali',
        paragraphs: [
          'Jebel Ali sits beside one of the largest ports in the region, with direct access to JAFZA, a major airport and road links across the GCC. For re-export and regional distribution, the combination of port, free zone and warehousing is hard to match.',
          'The advantage is not automatic. Goods can move quickly when documentation is right and slowly when it is not. Storage charges, demurrage and inspection delays can erase a thin trading margin within days. Planning the documentation is part of the commercial model.',
        ],
      },
      {
        id: 'classification',
        heading: 'Classification is the foundation',
        paragraphs: [
          'The Harmonised System code determines duty, restricted-goods status and documentary requirements. A wrong code can mean overpaying duty, or worse, shipping a product that requires a permit you do not have. Classify before you quote the customer, not after the container arrives.',
          'For ambiguous products — blended foods, cosmetics, electronics accessories, machinery parts — get a written classification view or a customs ruling where available. Keep the rationale on file. If the code is challenged later, a documented reason is far stronger than an assertion.',
        ],
      },
      {
        id: 'documents',
        heading: 'The document set that clears',
        paragraphs: [
          'A typical export or re-export file includes a commercial invoice, packing list, bill of lading or airway bill, certificate of origin and any product-specific certificates. The invoice must describe the goods accurately, state the Incoterms and match the packing list. Inconsistency is the most common cause of queries.',
          'If you are re-exporting, keep evidence of the original import and the re-export destination. If goods are stored in bond, understand the customs controls and the conditions under which duty is suspended. Work with a licensed broker who knows your product category, not just the port.',
        ],
        bullets: [
          'Commercial invoice with accurate description and Incoterms',
          'Packing list matching weights, cartons and marks',
          'Certificate of origin where preferential duty applies',
          'Product certificates: food, cosmetics, electronics, health',
        ],
      },
      {
        id: 'warehousing',
        heading: 'Bonded and non-bonded storage',
        paragraphs: [
          'Bonded storage lets goods be held before duty is paid, which can improve cash flow for re-exporters. Non-bonded storage is simpler but duty is paid on entry. The right choice depends on your customer base, holding period and whether goods will be sold inside the UAE.',
          'Beyond duty, consider handling: pick-and-pack, labelling, kitting and returns. A warehouse that stores pallets but cannot label retail units will slow your e-commerce operation. Visit the facility, check cut-off times and ask how inventory is reconciled.',
        ],
      },
      {
        id: 'landed-cost',
        heading: 'Build a landed-cost model',
        paragraphs: [
          'Before your first shipment, model product cost, freight, insurance, duty, port charges, broker fees, storage and last-mile delivery. Add a contingency for inspection and currency movement. The result tells you whether the price you quoted actually makes money.',
          'Review the model after every shipment. Freight rates and duty treatment change, and a route that worked last quarter may not work now. A simple spreadsheet, updated honestly, is more valuable than a polished forecast nobody maintains.',
        ],
      },
    ],
  },
  {
    slug: 'uae-corporate-tax-vat-guide',
    title: 'UAE corporate tax and VAT: what founders get wrong in year one',
    excerpt:
      'The UAE tax system is simpler than many, but the details matter. These are the registration, record-keeping and free-zone issues that catch new companies.',
    category: 'Tax',
    tags: ['Corporate Tax', 'VAT', 'UAE', 'Finance'],
    date: '2026-05-29',
    readingTime: '8 min read',
    author: 'helen',
    heroPrompt: 'Dubai financial district, abstract ledger and gold lines, editorial',
    takeaways: [
      'Corporate tax registration is separate from licence renewal — missing it creates penalties.',
      'Free-zone qualifying income needs evidence, not just a licence.',
      'VAT records must support the return; reconstructing them later is expensive.',
    ],
    sections: [
      {
        id: 'regime',
        heading: 'The regime in plain terms',
        paragraphs: [
          'The UAE levies corporate tax on taxable income above a threshold, with a different treatment for qualifying free-zone income. VAT applies to most goods and services at the standard rate, with specific exemptions and zero-rated categories. The rules are documented, but the application depends on your activity and structure.',
          'The first mistake is assuming that a free-zone licence automatically means zero tax. Qualifying income requires qualifying activities, substance and documentation. If you earn income from mainland customers or non-qualifying activities, that portion may be taxable. Model the split rather than relying on the label.',
        ],
      },
      {
        id: 'registration',
        heading: 'Registration and deadlines',
        paragraphs: [
          'Corporate tax registration is a separate obligation from trade licence renewal. Companies must register, file returns and keep records within the timelines set by the Federal Tax Authority. Missing a deadline can trigger penalties that are difficult to reverse.',
          'VAT registration depends on turnover thresholds. Once registered, you must issue compliant invoices, keep records and file periodic returns. If you are unsure whether you have crossed a threshold, calculate turnover on a rolling basis and document the method. Voluntary disclosure is generally cheaper than an assessment.',
        ],
        bullets: [
          'Confirm corporate tax registration status before your first year-end',
          'Maintain a compliance calendar for VAT returns and annual filings',
          'Keep invoices, contracts and bank records for the required retention period',
          'Review related-party transactions for transfer-pricing exposure',
        ],
      },
      {
        id: 'records',
        heading: 'Records are the real work',
        paragraphs: [
          'Good tax outcomes come from good bookkeeping. If your bank account, invoices and accounting system do not reconcile, every filing becomes a reconstruction exercise. Use accounting software from day one, reconcile monthly and keep supporting documents attached to transactions.',
          'For free-zone companies, evidence of substance matters: where decisions are made, where staff sit, what the company actually does. Board minutes, employment records, office leases and contracts all support the position. Create them as you go; backfilling is obvious.',
        ],
      },
      {
        id: 'planning',
        heading: 'Planning without over-engineering',
        paragraphs: [
          'Tax planning should follow commercial reality. Structure ownership and operations to match where value is created, then document the position. Aggressive structures that lack substance create risk far larger than the tax saved.',
          'If you operate across the UAE, Saudi Arabia, the UK and Estonia, coordinate advice. Each jurisdiction has its own residency and permanent-establishment rules, and a structure that works in one can create exposure in another. A short annual review is usually enough.',
        ],
      },
      {
        id: 'checklist',
        heading: 'A year-one checklist',
        paragraphs: [
          'Register for corporate tax, confirm VAT status, open a separate business bank account, implement accounting software, set a filing calendar and book a year-end review with an accountant before the first return is due.',
        ],
      },
    ],
  },
  {
    slug: 'moving-family-to-saudi-arabia',
    title: 'Moving your family to Saudi Arabia: visas, schools and settling in',
    excerpt:
      'The Kingdom has changed quickly. Here is a practical sequence for families relocating to Riyadh or Jeddah, from dependent visas to school waiting lists.',
    category: 'Relocation',
    tags: ['Saudi Arabia', 'Relocation', 'Family', 'Schools'],
    date: '2026-05-06',
    readingTime: '6 min read',
    author: 'amara',
    heroPrompt: 'Riyadh skyline at sunset, modern architecture, warm light, editorial',
    takeaways: [
      'Dependent visas depend on your iqama status and salary; sequence matters.',
      'School places, not housing, are usually the binding constraint.',
      'Attested documents should be prepared before you leave your home country.',
    ],
    sections: [
      {
        id: 'sequence',
        heading: 'Get the sequence right',
        paragraphs: [
          'Your own work visa and iqama must be in place before dependants can be sponsored. The employer typically manages your block visa and arrival, but family sponsorship is a separate process requiring attested marriage and birth certificates, salary evidence and medical checks.',
          'Start attestation in your home country early. The chain usually involves local notarisation, foreign ministry attestation and Saudi embassy legalisation, followed by translation. This can take weeks and is much harder to complete once you have moved.',
        ],
      },
      {
        id: 'schools',
        heading: 'Schools are the binding constraint',
        paragraphs: [
          'International schools in Riyadh and Jeddah are competitive, particularly for British, American and IB curricula. Waiting lists can run for months, and mid-year places are scarce. Apply as soon as your move is likely, even before the visa is issued.',
          'Compare curricula against your children’s longer-term plans. A British curriculum supports UK university applications; IB is broader and internationally portable; American curricula align with US pathways. Visit campuses where possible and ask about class sizes, teacher turnover and learning support.',
        ],
        bullets: [
          'Apply to two or three schools, not one',
          'Confirm seat deposits, refund policies and transport',
          'Ask about assessment requirements and language support',
          'Check the commute at peak hours, not on a quiet afternoon',
        ],
      },
      {
        id: 'housing',
        heading: 'Housing and daily life',
        paragraphs: [
          'Compound living is popular with expatriate families for amenities and community, while standalone villas offer more space and privacy. Budget for utilities, maintenance and transport. Distances are large, so commute time should drive neighbourhood choice more than headline rent.',
          'Practical setup includes a local bank account, mobile contract, medical insurance registration and, for children, school transport. Culture is changing fast, with more entertainment and social options than a few years ago, but expectations vary by city and community.',
        ],
      },
      {
        id: 'settling',
        heading: 'The first ninety days',
        paragraphs: [
          'Plan the first three months around stability: school registration, housing, healthcare and a routine. Keep digital and attested copies of every document. Join community groups early; practical advice about schools, doctors and traffic is usually more useful than official guides.',
        ],
      },
    ],
  },
  {
    slug: 'estonia-e-residency-vs-uae-company',
    title: 'Estonia e-Residency or a UAE company? A founder’s decision framework',
    excerpt:
      'Both are popular with location-independent founders, and they solve different problems. Here is how to choose without building two companies you do not need.',
    category: 'Business',
    tags: ['Estonia', 'UAE', 'e-Residency', 'Startups'],
    date: '2026-04-14',
    readingTime: '7 min read',
    author: 'priya',
    heroPrompt: 'Split composition of Tallinn and Dubai skylines, glass and gold, editorial',
    takeaways: [
      'Estonia gives EU access and a digital identity; the UAE gives regional access and residency.',
      'Tax treatment differs fundamentally — deferred Estonian tax versus UAE corporate tax.',
      'Banking and substance often decide the answer more than tax rates.',
    ],
    sections: [
      {
        id: 'different-jobs',
        heading: 'They solve different jobs',
        paragraphs: [
          'An Estonian OÜ is an EU company with a digital-first administration and access to the European single market. It is popular with SaaS founders, consultants and digital nomads who want a credible EU entity without relocating. e-Residency provides the digital identity that lets you manage it remotely.',
          'A UAE company provides regional market access, a residence visa and a base in one of the world’s busiest trade and travel hubs. If you need to live in the Gulf, serve GCC customers or hold a regional presence, an Estonian company alone will not solve that.',
        ],
      },
      {
        id: 'tax',
        heading: 'Tax is not the whole story',
        paragraphs: [
          'Estonia taxes distributed profits rather than retained earnings, which can be attractive for companies reinvesting growth. The UAE taxes corporate income above a threshold, with specific free-zone treatment for qualifying income. Effective outcomes depend on your residency, where you work and where customers are.',
          'Do not choose a jurisdiction on headline rates. Permanent-establishment rules, withholding taxes, VAT obligations and personal residency all interact. Model your actual scenario with an adviser who understands both systems before you incorporate.',
        ],
      },
      {
        id: 'banking',
        heading: 'Banking and payment rails',
        paragraphs: [
          'Estonian companies can access European banking and payment providers, but onboarding has become stricter for non-resident founders. A clear business model and European customer base help. UAE banking is relationship-driven and often requires a visit, with compliance focused on source of funds and activity.',
          'Consider how customers pay you, which currencies you hold and where your team is. A company is only useful if it can receive and move money reliably. Test the banking route before committing to the structure.',
        ],
      },
      {
        id: 'decision',
        heading: 'A short decision framework',
        paragraphs: [
          'Choose Estonia if your customers are primarily in the EU, you want a low-admin digital company and you do not need Gulf residency. Choose the UAE if you want to live in the region, serve GCC clients or hold a physical base. Choose both only if you have a clear commercial reason and the revenue to justify two compliance calendars.',
        ],
        bullets: [
          'Where do you live, and where will you spend most of the year?',
          'Where are your customers and how do they pay?',
          'Do you need a residence visa or physical office?',
          'Can you sustain the accounting, filing and banking obligations in both?',
        ],
      },
    ],
  },
  {
    slug: 'career-in-the-gulf-executive-search',
    title: 'Building a career in the Gulf: what executive search actually looks for',
    excerpt:
      'Regional experience helps, but it is not the deciding factor. Two search partners explain what makes a candidate credible in Gulf boardrooms.',
    category: 'Careers',
    tags: ['Careers', 'Executive Search', 'Gulf', 'Leadership'],
    date: '2026-03-19',
    readingTime: '6 min read',
    author: 'omar',
    heroPrompt: 'Gulf boardroom with skyline view, navy and gold, editorial',
    takeaways: [
      'Hiring committees weight delivery evidence over titles.',
      'Regional exposure is an advantage, not a prerequisite.',
      'Compensation conversations go better when you understand the full package.',
    ],
    sections: [
      {
        id: 'market',
        heading: 'A more selective market',
        paragraphs: [
          'The Gulf leadership market has matured. Ten years ago, a strong international brand and a willingness to relocate could open doors. Today, boards expect evidence of delivery in comparable conditions: growth in a regulated market, turnaround under capital constraints, or scaling a team across cultures.',
          'Sectors differ. Financial services and government-related entities weight regulatory experience heavily. Technology and retail weight commercial velocity. Family groups often look for leaders who can professionalise without dismantling what made the business successful.',
        ],
      },
      {
        id: 'evidence',
        heading: 'Show delivery, not adjacency',
        paragraphs: [
          'Candidates often describe scope: budget size, headcount, number of markets. Search committees want outcomes: what changed, by how much, over what period, and what your specific contribution was. A concise story with numbers beats a long list of responsibilities.',
          'Prepare three or four stories covering growth, cost, people and risk. For each, be clear about the starting position, the constraint, the decision you made and the result. Interviewers will probe for your role versus the team’s, so distinguish honestly.',
        ],
      },
      {
        id: 'region',
        heading: 'Regional experience: helpful, not mandatory',
        paragraphs: [
          'Local experience reduces risk in the eyes of a hiring committee, especially for roles involving government relations or labour-intensive operations. But we have placed leaders without Gulf experience when their delivery record was directly relevant and their cultural curiosity was evident.',
          'If you lack regional experience, show that you have operated across cultures and complex stakeholder environments. Learn the basics of the local regulatory and labour context before interviews. Nothing disqualifies a candidate faster than treating the region as a generic emerging market.',
        ],
      },
      {
        id: 'package',
        heading: 'Negotiating the package',
        paragraphs: [
          'Gulf packages often include housing, transport, schooling, insurance and annual flights alongside base salary. Compare total value, not base alone. Ask about gratuity, notice periods, probation, relocation support and the treatment of bonuses in the first year.',
          'Tax is a factor but not the only one. Family stability, schooling availability and long-term residency options increasingly influence decisions. Discuss expectations openly with your recruiter; a package that looks generous on paper can disappoint once housing and school fees are real.',
        ],
      },
      {
        id: 'long-term',
        heading: 'The long game',
        paragraphs: [
          'The leaders who thrive in the Gulf combine commercial discipline with relationship-building and a genuine interest in the region. Treat the move as a career chapter, not a tax arbitrage. The strongest candidates are those who can explain why this market, why this role, and what they intend to build.',
        ],
      },
    ],
  },
]

export const articleCategories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))]

export const getArticle = (slug) => articles.find((a) => a.slug === slug) || null

export const getAuthor = (key) => authors[key] || authors.amara

export const relatedArticles = (slug) => {
  const current = getArticle(slug)
  if (!current) return articles.slice(0, 3)
  return articles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 2 : a.tags.some((t) => current.tags.includes(t)) ? 1 : 0
      const bScore = b.category === current.category ? 2 : b.tags.some((t) => current.tags.includes(t)) ? 1 : 0
      return bScore - aScore
    })
    .slice(0, 3)
}
