import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { name: 'Immigration', value: 92 },
  { name: 'Business', value: 78 },
  { name: 'Education', value: 71 },
  { name: 'Finance', value: 54 },
  { name: 'Trade', value: 43 },
  { name: 'Technology', value: 37 },
  { name: 'Legal', value: 29 },
]

const colors = ['#C9A24B', '#D8B263', '#1F4FD8', '#3C67DE', '#5B6B86', '#8493A9', '#A9B6CC']

export default function StatsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 4, left: -22, bottom: 0 }} barCategoryGap="26%">
        <defs>
          <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8D6A0" />
            <stop offset="100%" stopColor="#C9A24B" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 5" stroke="rgba(91,107,134,0.18)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 9, fill: '#8493a9', fontFamily: 'JetBrains Mono, monospace' }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-18}
          textAnchor="end"
          height={45}
        />
        <YAxis hide domain={[0, 100]} />
        <Tooltip
          cursor={{ fill: 'rgba(201,162,75,0.08)' }}
          contentStyle={{
            background: '#0A1A3A',
            border: '1px solid rgba(232,214,160,0.25)',
            borderRadius: 8,
            fontSize: 11,
            color: '#F7F5EF',
          }}
          formatter={(value: number) => [`${value} engagements`, 'Demand index']}
        />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} isAnimationActive animationDuration={1200}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={index < 2 ? 'url(#barGold)' : colors[index]} fillOpacity={index < 2 ? 1 : 0.72} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
