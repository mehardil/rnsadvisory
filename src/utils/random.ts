/** Seeded pseudo-random helpers used by the generative art system. */

export function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return function rand() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createRandom(seed: string | number) {
  const numeric = typeof seed === 'number' ? seed : hashSeed(seed)
  const rand = mulberry32(numeric)
  return {
    next: rand,
    range: (min: number, max: number) => min + rand() * (max - min),
    int: (min: number, max: number) => Math.floor(min + rand() * (max - min + 1)),
    pick: <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)],
    chance: (p: number) => rand() < p,
    signed: (amount: number) => (rand() * 2 - 1) * amount,
  }
}

export type SeededRandom = ReturnType<typeof createRandom>

/** Deterministic session salt so art is stable within a visit but new on reload. */
export function getSessionSalt(): string {
  if (typeof window === 'undefined') return 'server'
  const key = 'rns-art-salt'
  const existing = window.sessionStorage.getItem(key)
  if (existing) return existing
  const salt = Math.random().toString(36).slice(2, 9)
  window.sessionStorage.setItem(key, salt)
  return salt
}
