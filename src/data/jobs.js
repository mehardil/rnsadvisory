/**
 * Careers — open roles and benefits. Application form is front-end only and
 * posts to the configured form endpoint when one is provided.
 */
export const jobs = [
  {
    id: 'immigration-associate',
    title: 'Immigration Associate',
    department: 'Immigration',
    location: 'Dubai, UAE',
    type: 'Full-time',
    level: 'Associate',
    summary:
      'Manage UAE residency and Golden Visa files for founders, families and corporate clients, from eligibility review to Emirates ID.',
    responsibilities: [
      'Own a portfolio of 30–40 active immigration files',
      'Prepare and quality-check document sets before submission',
      'Liaise with authorities and keep clients updated weekly',
      'Maintain accurate records in the client portal',
    ],
    requirements: [
      '2+ years of UAE immigration or PRO experience',
      'Working knowledge of GDRFA, ICP and Emirates ID processes',
      'Excellent written English and Arabic is an advantage',
      'Calm, precise and comfortable with deadlines',
    ],
  },
  {
    id: 'education-counsellor',
    title: 'Education Counsellor — Europe',
    department: 'Education',
    location: 'Lahore, Pakistan',
    type: 'Full-time',
    level: 'Mid-level',
    summary:
      'Guide students and families through European admissions, funding and student visas, with a focus on Estonia, Germany and the Netherlands.',
    responsibilities: [
      'Run counselling sessions and build realistic shortlists',
      'Manage applications, deadlines and document quality',
      'Coordinate visa files with the immigration team',
      'Run school and university outreach events',
    ],
    requirements: [
      'Bachelor’s degree; European study experience preferred',
      '2+ years in admissions or student counselling',
      'Strong knowledge of European higher education',
      'Empathy and clear communication with parents',
    ],
  },
  {
    id: 'corporate-services-manager',
    title: 'Corporate Services Manager',
    department: 'Business Setup',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-time',
    level: 'Manager',
    summary:
      'Lead company formation and compliance engagements for clients entering Saudi Arabia, including MISA licensing and Saudization planning.',
    responsibilities: [
      'Own the Saudi formation pipeline end to end',
      'Advise clients on entity structure and licensing routes',
      'Coordinate government platforms and local partners',
      'Mentor two associates and improve delivery playbooks',
    ],
    requirements: [
      '5+ years in Saudi corporate services or consultancy',
      'Fluency in Arabic and English',
      'Hands-on MISA, CR and Qiwa experience',
      'Commercial judgement and strong client presence',
    ],
  },
  {
    id: 'logistics-coordinator',
    title: 'Logistics Coordinator',
    department: 'Trade & Logistics',
    location: 'Jebel Ali, UAE',
    type: 'Full-time',
    level: 'Associate',
    summary:
      'Coordinate customs documentation, warehouse intake and last-mile dispatch for e-commerce and trading clients.',
    responsibilities: [
      'Prepare and check shipment documentation',
      'Coordinate with brokers, carriers and warehouse teams',
      'Maintain inventory accuracy and dispatch SLAs',
      'Resolve holds and escalate risks early',
    ],
    requirements: [
      '2+ years in freight forwarding or warehousing',
      'Knowledge of JAFZA and UAE customs processes',
      'Comfortable with WMS and spreadsheets',
      'Available for occasional early shifts',
    ],
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer (React)',
    department: 'Technology',
    location: 'Remote / Tallinn, Estonia',
    type: 'Full-time',
    level: 'Mid-level',
    summary:
      'Build fast, accessible client portals and marketing experiences in React and TypeScript, with a strong performance culture.',
    responsibilities: [
      'Ship React and TypeScript features with tests',
      'Own performance and accessibility budgets',
      'Collaborate with design on interaction detail',
      'Document and hand over cleanly',
    ],
    requirements: [
      '3+ years building production React applications',
      'Strong TypeScript, CSS and browser fundamentals',
      'Experience with performance profiling and a11y',
      'Clear written communication in a remote team',
    ],
  },
  {
    id: 'tax-consultant',
    title: 'Tax Consultant',
    department: 'Finance',
    location: 'Dubai, UAE',
    type: 'Full-time',
    level: 'Senior',
    summary:
      'Advise free-zone and mainland clients on UAE corporate tax, VAT and cross-border structuring, working with the audit and legal teams.',
    responsibilities: [
      'Manage corporate tax and VAT engagements',
      'Review free-zone qualifying income positions',
      'Support voluntary disclosures and FTA correspondence',
      'Build technical notes and client briefings',
    ],
    requirements: [
      'Qualified accountant (ACA, ACCA, CPA or equivalent)',
      '3+ years of UAE tax experience',
      'Strong technical writing and client handling',
      'Experience with transfer pricing is a plus',
    ],
  },
]

export const jobBenefits = [
  { icon: 'HeartPulse', title: 'Health cover', text: 'Comprehensive medical insurance for you and dependants.' },
  { icon: 'GraduationCap', title: 'Learning budget', text: 'Annual allowance for courses, certifications and conferences.' },
  { icon: 'Plane', title: 'Travel allowance', text: 'Annual flights home and visa support for relocating staff.' },
  { icon: 'Clock', title: 'Flexible hours', text: 'Core hours with flexibility around early or late commitments.' },
  { icon: 'Users', title: 'Parental leave', text: 'Paid parental leave above statutory minimums.' },
  { icon: 'Target', title: 'Real progression', text: 'Twice-yearly reviews with a published progression framework.' },
]

export const departments = ['All', 'Immigration', 'Education', 'Business Setup', 'Trade & Logistics', 'Technology', 'Finance']

export const getJob = (id) => jobs.find((j) => j.id === id) || null
