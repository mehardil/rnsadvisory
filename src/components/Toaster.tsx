import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/utils/cn'

export default function Toaster() {
  const toasts = useUIStore((s) => s.toasts)
  const dismiss = useUIStore((s) => s.dismissToast)

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 right-4 z-[120] flex flex-col gap-2 md:bottom-6 md:left-6 md:right-auto md:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="glass pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-lift"
          >
            <span
              className={cn(
                'mt-0.5 shrink-0',
                toast.type === 'error' ? 'text-[#D64545]' : toast.type === 'info' ? 'text-royal' : 'text-success',
              )}
            >
              {toast.type === 'error' ? (
                <XCircle size={18} />
              ) : toast.type === 'info' ? (
                <Info size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{toast.title}</p>
              {toast.description && <p className="mt-1 text-xs leading-relaxed text-muted">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-muted hover:text-ink"
            >
              <X size={15} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
