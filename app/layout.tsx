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
  metadataBase: new URL('https://researchchemicals.ca'),
  title: {
    default: 'RCCA | Research Grade Peptides & Compounds',
    template: '%s | RCCA',
  },
  description: 'High-purity research chemicals and peptides with supplier-reported purity data. COAs available on request. Shipped discreetly across Canada.',
  keywords: ['peptides', 'research chemicals', 'BPC-157', 'Tirzepatide', 'Retatrutide', 'TB-500', 'Canada', 'high-purity', 'lyophilized', 'HPLC verified'],
  openGraph: {
    title: 'RCCA | Research Grade Peptides & Compounds',
    description: 'High-purity research chemicals and peptides with supplier-reported purity data. COAs available on request. Shipped discreetly across Canada.',
    type: 'website',
    url: '/',
    siteName: 'RCCA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCCA | Research Grade Peptides & Compounds',
    description: 'High-purity research chemicals and peptides with supplier-reported purity data. Shipped discreetly across Canada.',
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
    name: "RCCA",
    url: "https://researchchemicals.ca",
    logo: "https://researchchemicals.ca/icon.svg",
    email: "support@researchchemicals.ca",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@researchchemicals.ca",
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
        <Analytics />
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
