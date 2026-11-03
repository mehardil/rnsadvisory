import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { estimateCompanyCost, type CompanyEstimateInput } from '@/utils/tools'
import { formatCurrency } from '@/utils/format'
import { cn } from '@/utils/cn'

export default function CompanyCostTool() {
  const [jurisdiction, setJurisdiction] = useState<CompanyEstimateInput['jurisdiction']>('freezone')
  const [zoneTier, setZoneTier] = useState<CompanyEstimateInput['zoneTier']>('standard')
  const [visas, setVisas] = useState(2)
  const [office, setOffice] = useState<CompanyEstimateInput['office']>('flexi')
  const [years, setYears] = useState(3)

  const result = useMemo(
    () => estimateCompanyCost({ jurisdiction, zoneTier, visas, office, years }),
    [jurisdiction, zoneTier, visas, office, years],
  )

  const money = (value: number) => formatCurrency(value, 'AED')

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-6">
        <div>
          <p className="field-label">Structure</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'freezone', label: 'Free zone', note: '100% ownership · international trade' },
              { value: 'mainland', label: 'Mainland', note: 'Direct UAE market · government work' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setJurisdiction(option.value as CompanyEstimateInput['jurisdiction'])}
                className={cn(
                  'rounded-xl border p-3 text-left transition-all',
                  jurisdiction === option.value ? 'border-gold bg-gold/10' : 'border-[color:var(--hair)] hover:border-gold/50',
                )}
              >
                <span className="block text-[0.82rem] font-semibold text-ink">{option.label}</span>
                <span className="mt-0.5 block text-[0.66rem] leading-snug text-muted">{option.note}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="field-label">Zone tier</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'economy', label: 'Economy' },
              { value: 'standard', label: 'Standard' },
              { value: 'premium', label: 'Premium' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setZoneTier(option.value as CompanyEstimateInput['zoneTier'])}
                className={cn(
                  'rounded-lg border px-2 py-2 text-[0.74rem] transition-colors',
                  zoneTier === option.value ? 'border-gold bg-gold/10 text-ink' : 'border-[color:var(--hair)] text-muted',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="visas" className="field-label">
              Visa quota: {visas}
            </label>
            <input
              id="visas"
              type="range"
              min={0}
              max={10}
              value={visas}
              onChange={(event) => setVisas(Number(event.target.value))}
              className="w-full accent-[#C9A24B]"
            />
            <p className="mt-1 text-[0.64rem] text-faint">0–10 employment visas</p>
          </div>
          <div>
            <label htmlFor="years" className="field-label">
              Years to model: {years}
            </label>
            <input
              id="years"
              type="range"
              min={1}
              max={5}
              value={years}
              onChange={(event) => setYears(Number(event.target.value))}
              className="w-full accent-[#C9A24B]"
            />
            <p className="mt-1 text-[0.64rem] text-faint">Renewal costs included</p>
          </div>
        </div>

        <div>
          <label htmlFor="office" className="field-label">
            Office requirement
          </label>
          <select id="office" value={office} onChange={(event) => setOffice(event.target.value as CompanyEstimateInput['office'])} className="input">
            <option value="none">None / registered address</option>
            <option value="flexi">Flexi-desk</option>
            <option value="shared">Shared office</option>
            <option value="private">Private office</option>
          </select>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rounded-2xl border border-gold/25 bg-navy p-6 text-ivory">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">
            Estimated {years}-year cost
          </p>
          <p className="mt-2 font-mono text-3xl text-ivory md:text-4xl">{money(result.multiYear)}</p>
          <p className="mt-1 text-[0.72rem] text-ivory/40">
            First year {money(result.firstYear)} · renewal {money(result.renewalPerYear)}/year
          </p>

          <div className="mt-5 space-y-2.5 border-t border-ivory/10 pt-5">
            {result.breakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 text-[0.78rem]">
                <span className="text-ivory/55">{item.label}</span>
                <span className="font-mono text-ivory/85">{money(item.value)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 border-t border-ivory/10 pt-2.5 text-[0.8rem]">
              <span className="font-semibold text-ivory">First-year total</span>
              <span className="font-mono text-softgold">{money(result.firstYear)}</span>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-ivory/10 bg-ivory/[0.03] p-3 text-[0.68rem] leading-relaxed text-ivory/45">
            <Info size={13} className="mt-0.5 shrink-0 text-softgold" />
            Indicative only. Government fees, attestation, banking and professional fees are estimated at market ranges
            and confirmed in a written quote.
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-4">
            <p className="mono-label !text-[8px]">Cheapest year 1</p>
            <p className="mt-1 font-display text-lg text-ink">
              {jurisdiction === 'freezone' ? 'Free zone' : 'Mainland'}
            </p>
            <p className="mt-1 text-[0.66rem] leading-relaxed text-muted">
              Often lower upfront, but check renewal and visa costs.
            </p>
          </div>
          <div className="rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)] p-4">
            <p className="mono-label !text-[8px]">Cheapest 3 years</p>
            <p className="mt-1 font-display text-lg text-ink">
              {result.renewalPerYear < 20000 ? 'Free zone' : 'Compare closely'}
            </p>
            <p className="mt-1 text-[0.66rem] leading-relaxed text-muted">
              Renewals and office requirements change the maths.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
