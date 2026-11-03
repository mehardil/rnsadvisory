import { describe, expect, it } from 'vitest'
import { convertCurrency, rateBetween } from './currency'
import { checkEligibility, estimateCompanyCost, estimateStudyBudget } from './tools'
import { getOfficeStatus, nextBookableDays, parseOfficeHours } from './time'
import { createRandom, hashSeed } from './random'

describe('currency', () => {
  it('round-trips between currencies', () => {
    const usd = convertCurrency(1000, 'AED', 'USD')
    const back = convertCurrency(usd, 'USD', 'AED')
    expect(back).toBeCloseTo(1000, 6)
  })

  it('returns a rate for every configured pair', () => {
    expect(rateBetween('GBP', 'EUR')).toBeGreaterThan(0)
    expect(rateBetween('PKR', 'INR')).toBeGreaterThan(0)
  })

  it('does not lose money on same-currency conversion', () => {
    expect(convertCurrency(250, 'SAR', 'SAR')).toBe(250)
  })
})

describe('company cost estimator', () => {
  it('is deterministic and returns a positive total', () => {
    const input = { jurisdiction: 'freezone' as const, zoneTier: 'standard' as const, visas: 2, office: 'flexi' as const, years: 3 }
    const a = estimateCompanyCost(input)
    const b = estimateCompanyCost(input)
    expect(a.multiYear).toBe(b.multiYear)
    expect(a.multiYear).toBeGreaterThan(a.firstYear)
  })

  it('charges more for a premium tier than an economy tier', () => {
    const base = { jurisdiction: 'mainland' as const, visas: 1, office: 'none' as const, years: 1 }
    const economy = estimateCompanyCost({ ...base, zoneTier: 'economy' })
    const premium = estimateCompanyCost({ ...base, zoneTier: 'premium' })
    expect(premium.firstYear).toBeGreaterThan(economy.firstYear)
  })

  it('adds visa costs per applicant', () => {
    const none = estimateCompanyCost({ jurisdiction: 'freezone', zoneTier: 'standard', visas: 0, office: 'none', years: 1 })
    const two = estimateCompanyCost({ jurisdiction: 'freezone', zoneTier: 'standard', visas: 2, office: 'none', years: 1 })
    expect(two.firstYear - none.firstYear).toBe(13000)
  })
})

describe('study budget', () => {
  it('reduces tuition by the scholarship percentage', () => {
    const noScholarship = estimateStudyBudget({
      tuitionPerYear: 10000,
      livingPerMonth: 800,
      years: 1,
      visaFee: 0,
      flightsPerYear: 0,
      insurancePerYear: 0,
      scholarshipPct: 0,
    })
    const half = estimateStudyBudget({
      tuitionPerYear: 10000,
      livingPerMonth: 800,
      years: 1,
      visaFee: 0,
      flightsPerYear: 0,
      insurancePerYear: 0,
      scholarshipPct: 50,
    })
    expect(noScholarship.total - half.total).toBe(5000)
  })
})

describe('eligibility', () => {
  it('flags a strong Golden Visa profile', () => {
    const result = checkEligibility({ goal: 'golden-visa', investment: 2_500_000, nomination: true })
    expect(result.band).toBe('Strong')
    expect(result.score).toBeGreaterThanOrEqual(70)
  })

  it('flags a weak profile honestly', () => {
    const result = checkEligibility({ goal: 'student', education: 'high-school', english: 'low', age: 40 })
    expect(result.band).not.toBe('Strong')
  })
})

describe('office hours', () => {
  it('parses a Monday–Saturday schedule', () => {
    const parsed = parseOfficeHours('Mon–Sat · 09:00–19:00 GST')
    expect(parsed.days).toContain(1)
    expect(parsed.days).not.toContain(0)
    expect(parsed.open).toBe(540)
    expect(parsed.close).toBe(1140)
  })

  it('reports open during Dubai business hours', () => {
    // Monday 26 Oct 2026, 06:00 UTC = 10:00 GST
    const status = getOfficeStatus('Mon–Sat · 09:00–19:00 GST', 'Asia/Dubai', new Date('2026-10-26T06:00:00Z'))
    expect(status.isOpen).toBe(true)
  })

  it('reports closed after hours', () => {
    const status = getOfficeStatus('Mon–Sat · 09:00–19:00 GST', 'Asia/Dubai', new Date('2026-10-26T17:00:00Z'))
    expect(status.isOpen).toBe(false)
  })
})

describe('bookable days', () => {
  it('skips weekends', () => {
    const days = nextBookableDays(6, new Date('2026-10-30T12:00:00Z'))
    expect(days).toHaveLength(6)
    days.forEach((day) => {
      const weekday = new Date(day.iso).getUTCDay()
      expect(weekday).not.toBe(0)
      expect(weekday).not.toBe(6)
    })
  })
})

describe('seeded random', () => {
  it('is stable for a given seed', () => {
    const a = createRandom('rns-global').next()
    const b = createRandom('rns-global').next()
    expect(a).toBe(b)
  })

  it('differs between seeds', () => {
    expect(hashSeed('education')).not.toBe(hashSeed('immigration'))
  })
})
