import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CartProvider } from '@/components/providers/CartProvider'

const inter = Inter({ subsets: ['latin'] })

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
            __html: `try{var t=localStorage.getItem('rc_theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
