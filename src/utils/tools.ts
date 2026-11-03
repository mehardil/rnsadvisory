/**
 * Deterministic estimators used by the free interactive tools.
 * All values are indicative and clearly labelled as such in the UI.
 */

export type Jurisdiction = 'freezone' | 'mainland'

export interface CompanyEstimateInput {
  jurisdiction: Jurisdiction
  zoneTier: 'economy' | 'standard' | 'premium'
  visas: number
  office: 'flexi' | 'shared' | 'private' | 'none'
  years: number
}

const TIER_MULTIPLIER = { economy: 0.85, standard: 1, premium: 1.35 }

const BASE = {
  freezone: { licence: 12500, establishment: 2500, visa: 6500, renewal: 12000, office: 0 },
  mainland: { licence: 20000, establishment: 3000, visa: 7500, renewal: 18000, office: 0 },
}

const OFFICE_COST = {
  none: 0,
  flexi: 8500,
  shared: 16000,
  private: 42000,
}

export function estimateCompanyCost(input: CompanyEstimateInput) {
  const base = BASE[input.jurisdiction]
  const multiplier = TIER_MULTIPLIER[input.zoneTier]
  const licence = Math.round(base.licence * multiplier)
  const establishment = base.establishment
  const visas = Math.max(0, Math.min(20, input.visas)) * base.visa
  const office = OFFICE_COST[input.office] || 0
  const firstYear = licence + establishment + visas + office
  const renewalPerYear = Math.round(base.renewal * multiplier) + office
  const years = Math.max(1, Math.min(5, input.years))
  const multiYear = firstYear + renewalPerYear * (years - 1)
  return {
    licence,
    establishment,
    visas,
    office,
    firstYear,
    renewalPerYear,
    multiYear,
    years,
    breakdown: [
      { label: 'Trade licence', value: licence },
      { label: 'Establishment card', value: establishment },
      { label: `Visa quota (${input.visas} × ${base.visa.toLocaleString()})`, value: visas },
      { label: 'Office / flexi-desk', value: office },
    ],
  }
}

export interface StudyBudgetInput {
  tuitionPerYear: number
  livingPerMonth: number
  years: number
  visaFee: number
  flightsPerYear: number
  insurancePerYear: number
  scholarshipPct: number
}

export function estimateStudyBudget(input: StudyBudgetInput) {
  const years = Math.max(1, Math.min(6, input.years))
  const tuition = input.tuitionPerYear * years * (1 - Math.max(0, Math.min(100, input.scholarshipPct)) / 100)
  const living = input.livingPerMonth * 12 * years
  const visa = input.visaFee
  const flights = input.flightsPerYear * years
  const insurance = input.insurancePerYear * years
  const total = tuition + living + visa + flights + insurance
  return {
    tuition: Math.round(tuition),
    living: Math.round(living),
    visa: Math.round(visa),
    flights: Math.round(flights),
    insurance: Math.round(insurance),
    total: Math.round(total),
    perYear: Math.round(total / years),
    perMonth: Math.round(total / (years * 12)),
    years,
    breakdown: [
      { label: 'Tuition (after scholarship)', value: Math.round(tuition) },
      { label: 'Living costs', value: Math.round(living) },
      { label: 'Flights', value: Math.round(flights) },
      { label: 'Insurance', value: Math.round(insurance) },
      { label: 'Visa & fees', value: Math.round(visa) },
    ],
  }
}

export interface EligibilityInput {
  goal: 'golden-visa' | 'student' | 'work' | 'startup'
  investment?: number
  salary?: number
  age?: number
  education?: 'high-school' | 'bachelor' | 'master' | 'phd'
  english?: 'low' | 'intermediate' | 'advanced'
  businessPlan?: boolean
  nomination?: boolean
}

export function checkEligibility(input: EligibilityInput) {
  let score = 0
  const notes: string[] = []

  if (input.goal === 'golden-visa') {
    if ((input.investment || 0) >= 2_000_000) {
      score += 70
      notes.push('Property investment meets the commonly cited AED 2M threshold — confirm valuation with the authority.')
    } else if ((input.salary || 0) >= 30_000) {
      score += 65
      notes.push('Salary may meet the professional category threshold; designation and attested contract matter.')
    }
    if (input.nomination) {
      score += 25
      notes.push('A nomination or accreditation letter materially strengthens exceptional-talent routes.')
    }
    if (score === 0) notes.push('Neither the investment nor salary signal is strong yet. We would test entrepreneur or talent routes.')
  }

  if (input.goal === 'student') {
    if (input.education === 'bachelor') score += 30
    if (input.education === 'master') score += 40
    if (input.education === 'phd') score += 45
    if (input.english === 'advanced') score += 35
    else if (input.english === 'intermediate') score += 22
    else score += 8
    if ((input.age || 30) < 30) score += 15
    notes.push('Admission is the first gate; financial evidence and a coherent statement are the usual second and third.')
  }

  if (input.goal === 'work') {
    if ((input.salary || 0) >= 15_000) score += 40
    else if ((input.salary || 0) >= 8_000) score += 25
    if (input.education === 'master' || input.education === 'phd') score += 25
    if (input.english === 'advanced') score += 20
    if ((input.age || 35) < 45) score += 10
    notes.push('Employer sponsorship drives the process; salary and attested qualifications are the main variables.')
  }

  if (input.goal === 'startup') {
    if (input.businessPlan) score += 45
    if ((input.investment || 0) >= 50_000) score += 25
    else if ((input.investment || 0) >= 15_000) score += 15
    if (input.education === 'bachelor' || input.education === 'master') score += 15
    if (input.english === 'advanced') score += 10
    notes.push('Substance matters: a licensed entity, a credible plan and evidence of funds carry the file.')
  }

  const normalized = Math.max(5, Math.min(95, score))
  return {
    score: normalized,
    band: normalized >= 70 ? 'Strong' : normalized >= 45 ? 'Possible' : 'Needs work',
    notes,
    nextStep:
      normalized >= 70
        ? 'Book a document review — you likely have a viable route.'
        : normalized >= 45
          ? 'Book a strategy call to close the gaps before applying.'
          : 'Start with eligibility mapping and document preparation.',
  }
}
