import { useEffect, useState } from 'react'

/**
 * Loads the generated-image manifest once for the whole app. Components only
 * render an <img> when the key exists, so a project without AI images makes
 * zero 404 requests and simply uses the procedural artwork.
 */
let manifestPromise: Promise<Set<string>> | null = null

function loadManifest(): Promise<Set<string>> {
  if (manifestPromise) return manifestPromise
  manifestPromise = fetch('/generated/manifest.json', { cache: 'no-cache' })
    .then((res) => (res.ok ? res.json() : { images: {} }))
    .then((json) => new Set(Object.keys(json?.images || {})))
    .catch(() => new Set<string>())
  return manifestPromise
}

export function useHasGeneratedImage(key?: string) {
  const [has, setHas] = useState(false)

  useEffect(() => {
    if (!key) {
      setHas(false)
      return
    }
    let alive = true
    loadManifest().then((keys) => {
      if (alive) setHas(keys.has(key))
    })
    return () => {
      alive = false
    }
  }, [key])

  return has
}
