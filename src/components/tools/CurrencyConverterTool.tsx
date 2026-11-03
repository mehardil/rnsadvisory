import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import siteConfig from '@/config/siteConfig'
import { convertCurrency, formatConverted, rateBetween, RATE_UPDATED } from '@/utils/currency'

const quickPairs = [
  ['AED', 'USD'],
  ['GBP', 'AED'],
  ['USD', 'INR'],
  ['SAR', 'PKR'],
  ['EUR', 'GBP'],
]

export default function CurrencyConverterTool() {
  const [amount, setAmount] = useState(1000)
  const [from, setFrom] = useState('AED')
  const [to, setTo] = useState('USD')

  const converted = convertCurrency(amount, from, to)
  const rate = rateBetween(from, to)

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-6">
        <div>
          <label htmlFor="amount" className="field-label">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            min={0}
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="input !text-lg"
          />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div>
            <label htmlFor="from-currency" className="field-label">
              From
            </label>
            <select id="from-currency" value={from} onChange={(event) => setFrom(event.target.value)} className="input">
              {siteConfig.currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} — {currency.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={swap}
            aria-label="Swap currencies"
            className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--hair-strong)] text-muted transition-colors hover:border-gold hover:text-gold-ink"
          >
            <ArrowDownUp size={15} />
          </button>
          <div>
            <label htmlFor="to-currency" className="field-label">
              To
            </label>
            <select id="to-currency" value={to} onChange={(event) => setTo(event.target.value)} className="input">
              {siteConfig.currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} — {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {quickPairs.map(([a, b]) => (
            <button
              key={`${a}-${b}`}
              type="button"
              onClick={() => {
                setFrom(a)
                setTo(b)
              }}
              className="chip !text-[0.68rem]"
            >
              {a} → {b}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rounded-2xl border border-gold/25 bg-navy p-6 text-ivory">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">
            {amount.toLocaleString('en-US')} {from} equals
          </p>
          <p className="mt-2 font-mono text-3xl text-ivory md:text-4xl">{formatConverted(converted, to)}</p>
          <p className="mt-1 text-[0.72rem] text-ivory/40">
            1 {from} = {rate.toFixed(4)} {to}
          </p>

          <div className="mt-5 space-y-2 border-t border-ivory/10 pt-4">
            {[
              ['Reverse rate', `1 ${to} = ${(1 / rate).toFixed(4)} ${from}`],
              ['Last updated', RATE_UPDATED],
              ['Source', 'Static reference table in the app config'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-3 text-[0.72rem]">
                <span className="text-ivory/45">{label}</span>
                <span className="text-right font-mono text-ivory/75">{value}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 rounded-lg border border-ivory/10 bg-ivory/[0.03] p-3 text-[0.68rem] leading-relaxed text-ivory/45">
            Reference rates only. Banks and exchange houses apply spreads and fees; confirm the final rate before you
            transact.
          </p>
        </div>
      </div>
    </div>
  )
}
