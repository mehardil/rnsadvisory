import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { getStudyDestination, studyDestinations } from '@/data/studyDestinations'
import { estimateStudyBudget } from '@/utils/tools'
import { convertCurrency } from '@/utils/currency'
import { formatCurrency } from '@/utils/format'
import { useUIStore } from '@/store/useUIStore'

export default function StudyBudgetTool() {
  const currency = useUIStore((s) => s.currency)
  const [destinationKey, setDestinationKey] = useState('estonia')
  const destination = getStudyDestination(destinationKey)
  const [tuition, setTuition] = useState(destination.tuitionPerYear)
  const [living, setLiving] = useState(destination.livingPerMonth)
  const [years, setYears] = useState(3)
  const [scholarship, setScholarship] = useState(0)

  const result = useMemo(
    () =>
      estimateStudyBudget({
        tuitionPerYear: tuition,
        livingPerMonth: living,
        years,
        visaFee: destination.visaFee,
        flightsPerYear: destination.flightsPerYear,
        insurancePerYear: destination.insurancePerYear,
        scholarshipPct: scholarship,
      }),
    [tuition, living, years, destination, scholarship],
  )

  const money = (usd: number) => formatCurrency(convertCurrency(usd, 'USD', currency), currency)

  const selectDestination = (key: string) => {
    setDestinationKey(key)
    const next = getStudyDestination(key)
    setTuition(next.tuitionPerYear)
    setLiving(next.livingPerMonth)
  }

  const max = Math.max(...result.breakdown.map((item) => item.value), 1)

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-6">
        <div>
          <label htmlFor="destination" className="field-label">
            Destination
          </label>
          <select id="destination" value={destinationKey} onChange={(event) => selectDestination(event.target.value)} className="input">
            {studyDestinations.map((item) => (
              <option key={item.key} value={item.key}>
                {item.flag} {item.country}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[0.72rem] leading-relaxed text-muted">{destination.note}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="tuition" className="field-label">
              Tuition / year (USD)
            </label>
            <input
              id="tuition"
              type="number"
              min={0}
              value={tuition}
              onChange={(event) => setTuition(Number(event.target.value))}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="living" className="field-label">
              Living / month (USD)
            </label>
            <input
              id="living"
              type="number"
              min={0}
              value={living}
              onChange={(event) => setLiving(Number(event.target.value))}
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="study-years" className="field-label">
              Duration: {years} years
            </label>
            <input
              id="study-years"
              type="range"
              min={1}
              max={5}
              value={years}
              onChange={(event) => setYears(Number(event.target.value))}
              className="w-full accent-[#C9A24B]"
            />
          </div>
          <div>
            <label htmlFor="scholarship" className="field-label">
              Scholarship: {scholarship}%
            </label>
            <input
              id="scholarship"
              type="range"
              min={0}
              max={100}
              step={5}
              value={scholarship}
              onChange={(event) => setScholarship(Number(event.target.value))}
              className="w-full accent-[#C9A24B]"
            />
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface-2)] p-4 text-[0.72rem] leading-relaxed text-muted">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Info size={13} className="text-gold-ink" /> Local reference
          </p>
          <p className="mt-2">
            Intakes: {destination.intakes}. Work rights: {destination.workRights}. Flights and insurance are estimated at
            modest annual rates and vary by city.
          </p>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rounded-2xl border border-gold/25 bg-navy p-6 text-ivory">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">Total cost of study</p>
          <p className="mt-2 font-mono text-3xl text-ivory md:text-4xl">{money(result.total)}</p>
          <p className="mt-1 text-[0.72rem] text-ivory/40">
            {money(result.perYear)} per year · {money(result.perMonth)} per month
          </p>

          <div className="mt-5 space-y-3 border-t border-ivory/10 pt-5">
            {result.breakdown.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-3 text-[0.74rem]">
                  <span className="text-ivory/55">{item.label}</span>
                  <span className="font-mono text-ivory/85">{money(item.value)}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-ivory/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold to-softgold"
                    style={{ width: `${Math.round((item.value / max) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 rounded-lg border border-ivory/10 bg-ivory/[0.03] p-3 text-[0.68rem] leading-relaxed text-ivory/45">
            Planning figures only, shown in {currency}. Tuition and living costs vary by institution and city; we confirm
            actual costs during counselling.
          </p>
        </div>
      </div>
    </div>
  )
}
