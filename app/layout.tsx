import './globals.css'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { WrappedDataProvider } from '@/contexts/WrappedDataContext'
import { AnimationProvider } from '@/contexts/AnimationContext'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'OPay Wrapped 2024 - Your Financial Year in Review',
    template: '%s | OPay Wrapped'
  },
  description: 'Discover your personalized financial insights, spending patterns, and achievements from 2024 with OPay Wrapped. See how you saved, spent, and grew your financial journey.',
  keywords: [
    'OPay',
    'financial wrapped',
    'spending insights',
    'savings summary',
    'financial review',
    'money management',
    'Nigeria fintech',
    'year in review'
  ],
  authors: [{ name: 'OPay', url: 'https://opay.com' }],
  creator: 'OPay',
  publisher: 'OPay',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wrapped.opay.com',
    title: 'OPay Wrapped 2024 - Your Financial Year in Review',
    description: 'Discover your personalized financial insights from 2024',
    siteName: 'OPay Wrapped',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OPay Wrapped 2024',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'OPay Wrapped 2024',
    description: 'My financial year in review with OPay',
    creator: '@opay',
    images: ['/twitter-image.jpg'],
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Other
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#064e3b' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gradient-to-b from-emerald-900 to-black min-h-screen">
        <ErrorBoundary>
          <AnimationProvider>
            <WrappedDataProvider>
              {/* Skip to main content link for accessibility */}
              <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-emerald-600 focus:text-white focus:rounded-full"
              >
                Skip to main content
              </a>
              
              <main id="main-content">
                {children}
              </main>
            </WrappedDataProvider>
          </AnimationProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
