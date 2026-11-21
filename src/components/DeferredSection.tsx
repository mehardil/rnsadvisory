import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Renders its children only when the placeholder gets near the viewport.
 * Long marketing pages can then paint the first screen without mounting every
 * below-the-fold section (and every canvas/observer they own) up front.
 */
export default function DeferredSection({
  children,
  rootMargin = '700px 0px',
}: {
  children: ReactNode
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, show])

  return <div ref={ref}>{show ? children : null}</div>
}
