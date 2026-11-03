import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, RotateCcw } from 'lucide-react'
import { checkEligibility, type EligibilityInput } from '@/utils/tools'
import { cn } from '@/utils/cn'

const goals: { value: EligibilityInput['goal']; label: string; note: string }[] = [
  { value: 'golden-visa', label: 'UAE Golden Visa', note: 'Investment, salary or talent' },
  { value: 'student', label: 'Study abroad', note: 'Admission and student visa' },
  { value: 'work', label: 'Work abroad', note: 'Employer-sponsored role' },
  { value: 'startup', label: 'Startup / business', note: 'Company and founder residency' },
]

export default function EligibilityTool() {
  const [goal, setGoal] = useState<EligibilityInput['goal']>('golden-visa')
  const [investment, setInvestment] = useState(0)
  const [salary, setSalary] = useState(0)
  const [age, setAge] = useState(28)
  const [education, setEducation] = useState<EligibilityInput['education']>('bachelor')
  const [english, setEnglish] = useState<EligibilityInput['english']>('intermediate')
  const [businessPlan, setBusinessPlan] = useState(false)
  const [nomination, setNomination] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const result = checkEligibility({ goal, investment, salary, age, education, english, businessPlan, nomination })

  const reset = () => {
    setGoal('golden-visa')
    setInvestment(0)
    setSalary(0)
    setAge(28)
    setEducation('bachelor')
    setEnglish('intermediate')
    setBusinessPlan(false)
    setNomination(false)
    setSubmitted(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-7">
        <div>
          <p className="field-label">Your goal</p>
          <div className="grid grid-cols-2 gap-2">
            {goals.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setGoal(item.value)
                  setSubmitted(false)
                }}
                className={cn(
                  'rounded-xl border p-3 text-left transition-all',
                  goal === item.value ? 'border-gold bg-gold/10' : 'border-[color:var(--hair)] hover:border-gold/50',
                )}
              >
                <span className="block text-[0.8rem] font-semibold text-ink">{item.label}</span>
                <span className="mt-0.5 block text-[0.64rem] leading-snug text-muted">{item.note}</span>
              </button>
            ))}
          </div>
        </div>

        {(goal === 'golden-visa' || goal === 'startup') && (
          <div>
            <label htmlFor="investment" className="field-label">
              Available investment (AED)
            </label>
            <input
              id="investment"
              type="number"
              min={0}
              step={50000}
              value={investment}
              onChange={(event) => {
                setInvestment(Number(event.target.value))
                setSubmitted(false)
              }}
              className="input"
            />
            <p className="mt-1 text-[0.64rem] text-faint">Property, business capital or funds available.</p>
          </div>
        )}

        {(goal === 'golden-visa' || goal === 'work') && (
          <div>
            <label htmlFor="salary" className="field-label">
              Monthly salary (AED)
            </label>
            <input
              id="salary"
              type="number"
              min={0}
              step={1000}
              value={salary}
              onChange={(event) => {
                setSalary(Number(event.target.value))
                setSubmitted(false)
              }}
              className="input"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="age" className="field-label">
              Age
            </label>
            <input
              id="age"
              type="number"
              min={16}
              max={80}
              value={age}
              onChange={(event) => {
                setAge(Number(event.target.value))
                setSubmitted(false)
              }}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="education-level" className="field-label">
              Highest qualification
            </label>
            <select
              id="education-level"
              value={education}
              onChange={(event) => {
                setEducation(event.target.value as EligibilityInput['education'])
                setSubmitted(false)
              }}
              className="input"
            >
              <option value="high-school">High school</option>
              <option value="bachelor">Bachelor’s</option>
              <option value="master">Master’s</option>
              <option value="phd">Doctorate</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="english-level" className="field-label">
            English proficiency
          </label>
          <select
            id="english-level"
            value={english}
            onChange={(event) => {
              setEnglish(event.target.value as EligibilityInput['english'])
              setSubmitted(false)
            }}
            className="input"
          >
            <option value="low">Basic</option>
            <option value="intermediate">Intermediate / IELTS 6.0</option>
            <option value="advanced">Advanced / IELTS 7.0+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-[0.78rem] text-muted">
            <input
              type="checkbox"
              checked={businessPlan}
              onChange={(event) => {
                setBusinessPlan(event.target.checked)
                setSubmitted(false)
              }}
              className="h-4 w-4 accent-[#C9A24B]"
            />
            I have a written business plan or licensed company
          </label>
          <label className="flex items-center gap-2.5 text-[0.78rem] text-muted">
            <input
              type="checkbox"
              checked={nomination}
              onChange={(event) => {
                setNomination(event.target.checked)
                setSubmitted(false)
              }}
              className="h-4 w-4 accent-[#C9A24B]"
            />
            I hold a nomination, award or accreditation
          </label>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button type="button" onClick={() => setSubmitted(true)} className="btn btn-gold">
            <BadgeCheck size={15} /> Check my eligibility
          </button>
          <button type="button" onClick={reset} className="btn btn-outline">
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-gold/25 bg-navy p-6 text-ivory">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">Indicative result</p>

          {!submitted ? (
            <div className="mt-4">
              <p className="font-display text-2xl text-ivory">Your estimate appears here.</p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ivory/50">
                Answer the questions and press check. This is a first read, not a decision — a specialist confirms the
                actual route and evidence.
              </p>
              <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-ivory/10">
                <div className="h-full w-1/3 bg-ivory/20" />
                <div className="h-full w-1/3 bg-ivory/10" />
              </div>
            </div>
          ) : (
            <>
              <div className="mt-3 flex items-end gap-3">
                <p className="font-mono text-5xl text-ivory">{result.score}</p>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ivory/40">/ 100</p>
                <span
                  className={cn(
                    'mb-1.5 ms-auto rounded-full px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider',
                    result.band === 'Strong'
                      ? 'bg-success/20 text-[#7BE0B4]'
                      : result.band === 'Possible'
                        ? 'bg-gold/20 text-softgold'
                        : 'bg-ivory/10 text-ivory/55',
                  )}
                >
                  {result.band}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ivory/10">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    result.band === 'Strong' ? 'bg-success' : result.band === 'Possible' ? 'bg-gold' : 'bg-ivory/30',
                  )}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-ivory/10 pt-4">
                {result.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-ivory/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" /> {note}
                  </li>
                ))}
              </ul>

              <p className="mt-4 rounded-lg border border-ivory/10 bg-ivory/[0.03] p-3 text-[0.72rem] leading-relaxed text-ivory/60">
                <strong className="text-softgold">Next step:</strong> {result.nextStep}
              </p>

              <Link to="/contact#book" className="btn btn-gold btn-sm mt-4 w-full">
                Book a document review <ArrowRight size={13} />
              </Link>
            </>
          )}

          <p className="mt-4 text-[0.62rem] leading-relaxed text-ivory/30">
            This tool uses simplified heuristics. Government criteria change and eligibility depends on evidence we have
            not seen.
          </p>
        </div>
      </div>
    </div>
  )
}
