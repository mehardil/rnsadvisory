export default function RouteFallback({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy px-5">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--hair-strong)] border-t-gold" />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/45">{label}…</p>
        <div className="mt-8 space-y-3">
          <div className="mx-auto h-3 w-2/3 animate-pulse rounded bg-ivory/10" />
          <div className="mx-auto h-3 w-1/2 animate-pulse rounded bg-ivory/10" />
          <div className="mx-auto h-3 w-3/5 animate-pulse rounded bg-ivory/10" />
        </div>
      </div>
    </div>
  )
}
