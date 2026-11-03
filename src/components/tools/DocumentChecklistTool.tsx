import { useEffect, useState } from 'react'
import { Check, Printer, RotateCcw } from 'lucide-react'
import { checklistPurposes, getChecklist } from '@/data/checklists'
import { readStorage, writeStorage } from '@/utils/storage'
import { cn } from '@/utils/cn'

export default function DocumentChecklistTool() {
  const [purposeId, setPurposeId] = useState(checklistPurposes[0].id)
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const purpose = getChecklist(purposeId)

  useEffect(() => {
    setChecked(readStorage<Record<string, boolean>>(`rns-checklist-tool-${purposeId}`, {}))
  }, [purposeId])

  const toggle = (item: string) => {
    const next = { ...checked, [item]: !checked[item] }
    setChecked(next)
    writeStorage(`rns-checklist-tool-${purposeId}`, next)
  }

  const all = purpose.groups.flatMap((group) => group.items)
  const done = all.filter((item) => checked[item]).length
  const progress = Math.round((done / all.length) * 100)

  const reset = () => {
    setChecked({})
    writeStorage(`rns-checklist-tool-${purposeId}`, {})
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="checklist-purpose" className="field-label">
          Select your route
        </label>
        <select
          id="checklist-purpose"
          value={purposeId}
          onChange={(event) => setPurposeId(event.target.value)}
          className="input"
        >
          {checklistPurposes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.flag} {item.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-[0.72rem] leading-relaxed text-muted">{purpose.note}</p>
      </div>

      <div className="rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface-2)] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.78rem] font-semibold text-ink">
            {done} of {all.length} collected
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-[0.68rem] text-muted hover:text-ink">
              <RotateCcw size={11} /> Reset
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1 text-[0.68rem] text-muted hover:text-ink">
              <Printer size={11} /> Print
            </button>
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--hair)]">
          <div className="h-full rounded-full bg-gradient-to-r from-gold to-softgold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-5">
        {purpose.groups.map((group) => (
          <div key={group.title}>
            <p className="mono-label mb-2">{group.title}</p>
            <div className="divide-y divide-[color:var(--hair)] overflow-hidden rounded-xl border border-[color:var(--hair)] bg-[color:var(--surface)]">
              {group.items.map((item) => (
                <label key={item} className="flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-[color:var(--surface-2)]">
                  <span
                    className={cn(
                      'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                      checked[item] ? 'border-success bg-success text-white' : 'border-[color:var(--hair-strong)]',
                    )}
                    aria-hidden="true"
                  >
                    {checked[item] && <Check size={11} />}
                  </span>
                  <input type="checkbox" checked={Boolean(checked[item])} onChange={() => toggle(item)} className="sr-only" />
                  <span className={cn('text-[0.82rem] leading-relaxed', checked[item] ? 'text-faint line-through' : 'text-muted')}>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="rounded-lg border border-gold/25 bg-gold/[0.05] p-3 text-[0.72rem] leading-relaxed text-muted">
        This checklist is a starting point, not a guarantee. Requirements change and depend on your nationality and
        category. A specialist will confirm your exact list before submission.
      </p>
    </div>
  )
}
