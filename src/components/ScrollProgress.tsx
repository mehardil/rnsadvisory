import { useScrollProgress } from '@/hooks/useCountUp'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed left-0 right-0 top-0 z-[105] h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-gold via-softgold to-gold transition-[width] duration-150"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  )
}
