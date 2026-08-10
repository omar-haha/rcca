import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { PageTransitionProvider } from '@/components/providers/PageTransitionProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  metadataBase: new URL('https://loamgoods.example'),
  title: {
    default: 'LOAM | Considered Home Goods',
    template: '%s | LOAM',
  },
  description: 'Thoughtfully made home goods with maker-reported material data. Care guides available on request. Shipped Canada-wide in protective packaging.',
  keywords: ['home goods', 'kitchenware', 'lighting', 'bedding', 'decor', 'Canada', 'handmade', 'homeware'],
  openGraph: {
    title: 'LOAM | Considered Home Goods',
    description: 'Thoughtfully made home goods with maker-reported material data. Care guides available on request. Shipped Canada-wide in protective packaging.',
    type: 'website',
    url: '/',
    siteName: 'LOAM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOAM | Considered Home Goods',
    description: 'Thoughtfully made home goods with maker-reported material data. Shipped Canada-wide in protective packaging.',
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LOAM",
    url: "https://loamgoods.example",
    logo: "https://loamgoods.example/icon.svg",
    email: "support@loamgoods.example",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@loamgoods.example",
      contactType: "customer service",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('rc_theme');document.documentElement.setAttribute('data-theme',t||'light');}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${orbitron.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <LanguageProvider>
            {/* Inside LanguageProvider — the consent banner is localised. */}
            <Analytics />
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
