/** Document checklists used by the Visa & Document Checklist Generator. */
export const checklistPurposes = [
  {
    id: 'uae-golden-visa',
    label: 'UAE Golden Visa',
    flag: '🇦🇪',
    note: 'Requirements vary by category. Confirm yours before paying government fees.',
    groups: [
      {
        title: 'Identity',
        items: ['Passport valid for at least 6 months', 'Current UAE visa or entry permit (if applicable)', 'Emirates ID copy', 'Passport photographs on white background'],
      },
      {
        title: 'Category evidence',
        items: ['Property title deed and valuation (property route)', 'Attested employment contract and salary certificate (professional route)', 'Trade licence and business plan (entrepreneur route)', 'Nomination or accreditation letter (talent route)'],
      },
      {
        title: 'Financial',
        items: ['Six months of bank statements', 'Source-of-funds declaration', 'Audited financials for your company, if self-employed'],
      },
      {
        title: 'Family (if applicable)',
        items: ['Attested marriage certificate', 'Attested birth certificates for children', 'Spouse passport and photograph'],
      },
    ],
  },
  {
    id: 'uae-work-visa',
    label: 'UAE Work Visa',
    flag: '🇦🇪',
    note: 'Employer sponsorship required. Some steps are completed by your employer or PRO.',
    groups: [
      {
        title: 'Identity',
        items: ['Passport valid for at least 6 months', 'Passport photographs', 'Current visa cancellation (if inside the UAE)'],
      },
      {
        title: 'Employment',
        items: ['Signed offer letter or employment contract', 'Establishment card and quota approval from employer', 'Labour approval or work permit'],
      },
      {
        title: 'Qualifications',
        items: ['Attested degree or diploma', 'Experience letters from previous employers', 'Professional licence where the role requires one'],
      },
      {
        title: 'After arrival',
        items: ['Medical fitness test', 'Emirates ID biometrics', 'Residence visa stamping'],
      },
    ],
  },
  {
    id: 'uk-student-visa',
    label: 'UK Student Visa',
    flag: '🇬🇧',
    note: 'Financial evidence must be held for the required period before applying.',
    groups: [
      {
        title: 'Core documents',
        items: ['Passport valid for the duration of study', 'Confirmation of Acceptance for Studies (CAS)', 'Valid English language test result', 'Academic transcripts and certificates'],
      },
      {
        title: 'Financial evidence',
        items: ['Bank statements covering tuition and maintenance', 'Statements held for the required consecutive period', 'Sponsor letter and relationship evidence if funds are held by a parent'],
      },
      {
        title: 'Supporting',
        items: ['ATAS certificate if your course requires it', 'TB test certificate if applicable', 'Accommodation confirmation', 'Academic Technology Approval or interview preparation notes'],
      },
    ],
  },
  {
    id: 'schengen-tourist',
    label: 'Schengen Tourist Visa',
    flag: '🇪🇺',
    note: 'Apply to the consulate of your main destination, generally up to 6 months ahead.',
    groups: [
      {
        title: 'Application',
        items: ['Completed Schengen visa form', 'Passport valid 3+ months beyond return and issued within 10 years', 'Two recent biometric photographs', 'Travel insurance with €30,000 minimum cover'],
      },
      {
        title: 'Trip evidence',
        items: ['Flight reservations or itinerary', 'Hotel bookings for the full stay', 'Day-by-day travel plan', 'Invitation letter if staying with friends or family'],
      },
      {
        title: 'Financial and ties',
        items: ['Three to six months of bank statements', 'Employment letter or business licence', 'Proof of ties to your home country', 'Cover letter explaining the purpose of travel'],
      },
    ],
  },
  {
    id: 'uae-company',
    label: 'UAE Company Formation',
    flag: '🇦🇪',
    note: 'Additional documents may be required for regulated activities or corporate shareholders.',
    groups: [
      {
        title: 'Shareholders',
        items: ['Passport copies for all shareholders', 'Proof of address (utility bill or bank letter)', 'CV or professional profile', 'Passport photographs'],
      },
      {
        title: 'Corporate shareholder (if applicable)',
        items: ['Certificate of incorporation', 'Memorandum and articles', 'Board resolution authorising the investment', 'Attested legalised corporate documents'],
      },
      {
        title: 'Application',
        items: ['Three proposed company names', 'Activity list and business description', 'KYC questionnaire', 'Lease or flexi-desk agreement once zone is selected'],
      },
      {
        title: 'Post-licence',
        items: ['Establishment card application', 'Bank account application pack', 'Visa quota and medicals', 'Compliance calendar setup'],
      },
    ],
  },
  {
    id: 'estonia-student',
    label: 'Estonia Student Residence Permit',
    flag: '🇪🇪',
    note: 'Apply after admission; appointment availability is the main timing risk.',
    groups: [
      {
        title: 'Core',
        items: ['Passport', 'Admission letter from an Estonian institution', 'Completed residence permit application', 'Passport photograph'],
      },
      {
        title: 'Financial',
        items: ['Proof of sufficient funds for living costs', 'Tuition payment confirmation', 'Sponsor documents if applicable'],
      },
      {
        title: 'Supporting',
        items: ['Health insurance valid in Estonia', 'Accommodation confirmation', 'English or Estonian language evidence', 'Criminal record certificate if required'],
      },
    ],
  },
  {
    id: 'us-b1-b2',
    label: 'US B1/B2 Visitor Visa',
    flag: '🇺🇸',
    note: 'The interview is decisive. Prepare concise answers and consistent documents.',
    groups: [
      {
        title: 'Application',
        items: ['DS-160 confirmation page', 'MRV fee receipt', 'Passport valid beyond your intended stay', 'Photograph meeting the specification'],
      },
      {
        title: 'Supporting',
        items: ['Employment letter or business licence', 'Bank statements and tax records', 'Property or family ties evidence', 'Previous travel history'],
      },
      {
        title: 'Trip',
        items: ['Invitation letter if visiting family or business', 'Hotel and flight itinerary', 'Conference or event registration', 'A short cover letter explaining purpose and return plan'],
      },
    ],
  },
  {
    id: 'saudi-work-visa',
    label: 'Saudi Work Visa',
    flag: '🇸🇦',
    note: 'Employer-driven process; attestation is often the longest step.',
    groups: [
      {
        title: 'Employment',
        items: ['Signed employment contract', 'Block visa or work permit approval', 'Employer commercial registration'],
      },
      {
        title: 'Personal',
        items: ['Passport valid for at least 6 months', 'Attested degree or diploma', 'Attested experience certificates', 'Medical fitness certificate'],
      },
      {
        title: 'Attestation',
        items: ['Notarisation in the issuing country', 'Foreign ministry attestation', 'Saudi embassy legalisation', 'Certified Arabic translation if required'],
      },
      {
        title: 'After arrival',
        items: ['Iqama application', 'Medical insurance registration', 'GOSI enrolment', 'Family visa applications if sponsoring dependants'],
      },
    ],
  },
]

export const getChecklist = (id) => checklistPurposes.find((c) => c.id === id) || checklistPurposes[0]
