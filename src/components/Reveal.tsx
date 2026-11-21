import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  amount?: number
  id?: string
}

function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  amount: number,
  once: boolean,
  enabled: boolean,
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setInView(true)
      return
    }
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [amount, enabled, once, ref])

  return inView
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  amount = 0.2,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const inView = useInView(ref, amount, once, !reduced)

  return (
    <div
      id={id}
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-y': `${y}px`, '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, 0.15, true, true)
  return (
    <div
      ref={ref}
      className={cn('reveal-group', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('reveal', className)}>{children}</div>
}
