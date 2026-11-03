import { useEffect, useRef } from 'react'
import { readStorage, writeStorage } from '@/utils/storage'

/**
 * Autosave partially completed forms to localStorage. Returns a restore function
 * and a "saved at" timestamp for the subtle saved indicator.
 */
export function useAutosave<T extends Record<string, unknown>>(
  key: string,
  values: T,
  onRestore: (values: T) => void,
  enabled = true,
) {
  const restored = useRef(false)
  const timer = useRef<number>()

  useEffect(() => {
    if (!enabled || restored.current) return
    restored.current = true
    const saved = readStorage<{ values: T; at: number } | null>(`rns-draft-${key}`, null)
    if (saved && saved.values) onRestore(saved.values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key])

  useEffect(() => {
    if (!enabled) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      writeStorage(`rns-draft-${key}`, { values, at: Date.now() })
    }, 700)
    return () => window.clearTimeout(timer.current)
  }, [key, values, enabled])

  return {
    clear: () => writeStorage(`rns-draft-${key}`, null),
  }
}
