import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { PageTransitionProvider } from '@/components/providers/PageTransitionProvider'

const inter = Inter({ subsets: ['latin'] })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'RCCA | Research Grade Peptides & Compounds',
  description: 'Next.js e-commerce platform for high-purity research chemicals and peptides. Rigorously verified, ISO-compliant research supplies.',
  keywords: ['peptides', 'research chemicals', 'high-purity', 'lyophilized', 'HPLC verified'],
  openGraph: {
    title: 'RCCA | Research Grade Peptides & Compounds',
    description: 'Precision-synthesized, independently certified research chemicals and peptides delivered worldwide.',
    type: 'website',
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
          <CartProvider>
            <SmoothScrollProvider>
              <PageTransitionProvider>
                {children}
              </PageTransitionProvider>
            </SmoothScrollProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
