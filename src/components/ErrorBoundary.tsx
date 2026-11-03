import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import Logo from './Logo'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this would be forwarded to an error service.
    if (import.meta.env.DEV) console.error('RNS Global error boundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center bg-navy px-5 py-24 text-center text-ivory">
        <div className="max-w-lg">
          <div className="mb-8 flex justify-center">
            <Logo tone="light" linked={false} />
          </div>
          <p className="eyebrow !text-softgold mb-4">Something interrupted us</p>
          <h1 className="h2 text-ivory">This section failed to load.</h1>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60">
            The rest of the site is still here. Reload the page, or if it keeps happening, call us on +92 331 905 1913
            and we will help directly.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-gold mt-7"
          >
            <RefreshCw size={15} /> Reload page
          </button>
        </div>
      </section>
    )
  }
}
