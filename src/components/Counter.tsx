import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/utils/cn'

export default function Counter({
  value,
  suffix = '',
  prefix = '',
  label,
  note,
  tone = 'light',
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  label: string
  note?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const { ref, value: current } = useCountUp(value)

  return (
    <div className={cn('group', className)}>
      <div
        className={cn(
          'font-mono text-[clamp(1.9rem,3.2vw,2.85rem)] font-medium leading-none tracking-tight transition-transform duration-300 group-hover:-translate-y-1',
          tone === 'dark' ? 'text-ivory' : 'text-ink',
        )}
        style={{ perspective: '400px' }}
      >
        <span ref={ref}>
          {prefix}
          {current.toLocaleString('en-US')}
          {suffix}
        </span>
      </div>
      <div className={cn('mt-3 text-[0.8rem] font-semibold', tone === 'dark' ? 'text-softgold' : 'text-ink')}>
        {label}
      </div>
      {note && <div className={cn('mt-1 text-[0.72rem]', tone === 'dark' ? 'text-ivory/45' : 'text-muted')}>{note}</div>}
    </div>
  )
}
