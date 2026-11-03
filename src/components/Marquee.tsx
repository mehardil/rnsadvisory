import { cn } from '@/utils/cn'

/** Infinite CSS marquee. Duplicates content for a seamless loop, pauses on hover. */
export default function Marquee({
  items,
  className,
  itemClassName,
  speed = 38,
  reverse = false,
}: {
  items: string[]
  className?: string
  itemClassName?: string
  speed?: number
  reverse?: boolean
}) {
  const row = [...items, ...items]
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="marquee-track flex w-max items-center gap-12"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              'whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-muted',
              itemClassName,
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
