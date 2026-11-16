const data = [
  { name: 'Immigration', value: 92 },
  { name: 'Business', value: 78 },
  { name: 'Education', value: 71 },
  { name: 'Finance', value: 54 },
  { name: 'Trade', value: 43 },
  { name: 'Technology', value: 37 },
  { name: 'Legal', value: 29 },
]

const barClass = [
  'bg-gradient-to-r from-[#E8D6A0] to-[#C9A24B]',
  'bg-gradient-to-r from-[#E3C987] to-[#C9A24B]',
  'bg-[#1F4FD8]',
  'bg-[#3C67DE]',
  'bg-[#5B6B86]',
  'bg-[#8493A9]',
  'bg-[#A9B6CC]',
]

/** Lightweight bar chart — no charting library, readable at 320px. */
export default function StatsChart() {
  return (
    <div
      className="flex h-full flex-col justify-center gap-2"
      role="img"
      aria-label="Client demand index by practice: Immigration 92, Business 78, Education 71, Finance 54, Trade 43, Technology 37, Legal 29."
    >
      {data.map((item, index) => (
        <div
          key={item.name}
          className="grid grid-cols-[68px_minmax(0,1fr)_26px] items-center gap-2 sm:grid-cols-[92px_minmax(0,1fr)_30px]"
          title={`${item.name}: ${item.value} engagements (demand index)`}
        >
          <span className="truncate font-mono text-[8px] uppercase tracking-[0.1em] text-faint sm:text-[9px]">
            {item.name}
          </span>
          <span className="h-2 overflow-hidden rounded-full bg-[color:var(--hair)]">
            <span
              className={`block h-full rounded-full ${barClass[index]}`}
              style={{ width: `${item.value}%`, opacity: index < 4 ? 1 : 0.82 }}
            />
          </span>
          <span className="text-right font-mono text-[9px] text-muted sm:text-[10px]">{item.value}</span>
        </div>
      ))}
      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Demand index · out of 100</p>
    </div>
  )
}
