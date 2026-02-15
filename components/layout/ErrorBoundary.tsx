'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
    
    // You can send to Sentry, LogRocket, etc.
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: errorInfo })
    // }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-900 to-black text-white p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl md:text-8xl mb-6" role="img" aria-label="Error">
              😕
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Something went wrong
            </h1>
            
            <p className="text-lg text-white/70 mb-8">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-8 text-left bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold mb-2">
                  Error Details
                </summary>
                <pre className="text-xs overflow-auto max-h-40 text-red-200">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400"
              >
                Reload Page
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 border-2 border-emerald-600 hover:bg-emerald-600 rounded-full font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
