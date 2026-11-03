import { forwardRef, useRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

type Variant = 'gold' | 'navy' | 'outline' | 'light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  gold: 'btn-gold',
  navy: 'btn-navy',
  outline: 'btn-outline',
  light: 'btn-light-outline',
  ghost: 'text-ink hover:text-gold',
}

const sizeClass: Record<Size, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'px-7 py-4 text-[0.95rem]',
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn('btn', variantClass[variant], sizeClass[size], className)
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }
>(function Button({ variant = 'gold', size = 'md', className, children, ...rest }, ref) {
  return (
    <button ref={ref} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
})

export function ButtonLink({
  to,
  variant = 'gold',
  size = 'md',
  className,
  children,
  ...rest
}: LinkProps & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <Link to={to} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'gold',
  size = 'md',
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      {children}
    </a>
  )
}

/** Subtle magnetic pull on desktop pointers. */
export function Magnetic({ children, strength = 10 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (event: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex transition-transform duration-300 ease-out"
    >
      {children}
    </span>
  )
}
