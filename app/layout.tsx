import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { PageTransitionProvider } from '@/components/providers/PageTransitionProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'

const inter = Inter({ subsets: ['latin'] })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  metadataBase: new URL('https://researchchemicals.ca'),
  title: {
    default: 'RCCA | Research Grade Peptides & Compounds',
    template: '%s | RCCA',
  },
  description: 'High-purity, independently verified research chemicals and peptides. Batch-tested with COAs available. Shipped discreetly across Canada.',
  keywords: ['peptides', 'research chemicals', 'BPC-157', 'Tirzepatide', 'Retatrutide', 'TB-500', 'Canada', 'high-purity', 'lyophilized', 'HPLC verified'],
  openGraph: {
    title: 'RCCA | Research Grade Peptides & Compounds',
    description: 'High-purity, independently verified research chemicals and peptides. Batch-tested with COAs available. Shipped discreetly across Canada.',
    type: 'website',
    url: '/',
    siteName: 'RCCA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCCA | Research Grade Peptides & Compounds',
    description: 'High-purity, independently verified research chemicals and peptides. Shipped discreetly across Canada.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('rc_theme');document.documentElement.setAttribute('data-theme',t||'light');}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.className} ${orbitron.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <SmoothScrollProvider>
                <PageTransitionProvider>
                  {children}
                </PageTransitionProvider>
              </SmoothScrollProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
