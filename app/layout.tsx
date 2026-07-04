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
    'Galcare is a premium dermatology and skincare pharmaceutical company delivering science-backed, WHO-GMP certified solutions trusted by 30,000+ doctors across 42 countries.',
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
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#060b18' },
  ],
}

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('galcare-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
