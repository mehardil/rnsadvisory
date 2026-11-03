/** Static reference rates, expressed as units per 1 USD. Replace with a live feed if needed. */
export const RATES_PER_USD: Record<string, number> = {
  USD: 1,
  AED: 3.6725,
  GBP: 0.79,
  EUR: 0.92,
  SAR: 3.75,
  INR: 83.6,
  PKR: 278.5,
}

export const RATE_UPDATED = 'Reference rates · update before launch'

export function convertCurrency(amount: number, from: string, to: string) {
  if (from === to) return amount
  const fromRate = RATES_PER_USD[from]
  const toRate = RATES_PER_USD[to]
  if (!fromRate || !toRate) return 0
  return (amount / fromRate) * toRate
}

export function rateBetween(from: string, to: string) {
  return convertCurrency(1, from, to)
}

/** Format a converted amount with a sensible number of decimals. */
export function formatConverted(amount: number, currency: string) {
  const digits = amount >= 100 ? 2 : amount >= 1 ? 2 : 4
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: digits,
      minimumFractionDigits: currency === 'INR' || currency === 'PKR' ? 0 : 2,
    }).format(amount)
  } catch {
    return amount.toFixed(2)
  }
}
