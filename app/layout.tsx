import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SmoothScroll } from '@/components/smooth-scroll'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_URL = 'https://galcare.example.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Galcare — Innovation in Dermatology & Skincare',
    template: '%s | Galcare',
  },
  description:
    'Galcare is a premier dermatology and specialty pharmaceutical company founded in 2008 by Devkant Bhardwaj, delivering science-backed WHO-GMP certified solutions trusted by 30,000+ doctors across 26 states in India.',
  keywords: [
    'dermatology',
    'skincare',
    'pharmaceutical',
    'sunscreen',
    'acne treatment',
    'WHO-GMP',
    'Galcare',
  ],
  authors: [{ name: 'Galcare' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Galcare — Innovation in Dermatology & Skincare',
    description:
      'Premium skincare and pharmaceutical solutions backed by science and trusted by healthcare professionals worldwide.',
    siteName: 'Galcare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galcare — Innovation in Dermatology & Skincare',
    description:
      'Premium skincare and pharmaceutical solutions backed by science and trusted by healthcare professionals worldwide.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#060b18' },
  ],
}

import { AuthProvider } from '@/lib/auth-context'
import { AuthModal } from '@/components/auth-modal'
import { PWAInstaller } from '@/components/pwa-installer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <AuthProvider>
          <ThemeProvider>
            <SmoothScroll />
            {children}
            <AuthModal />
            <PWAInstaller />
          </ThemeProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
