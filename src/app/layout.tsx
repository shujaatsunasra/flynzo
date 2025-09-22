import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { AuthProvider } from '@/components/providers/SessionProvider'

// Primary font for body text and UI - Helvetica Neue system
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

// Display font for headings - geometric sans-serif
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Flynzo Innovation Private Limited - Discover Amazing Indian Destinations',
  description: 'Experience incredible domestic destinations across India with Flynzo Innovation Private Limited. Premium travel packages, expert guides, and unforgettable memories await.',
  keywords: 'India tours, domestic travel, Kashmir, Goa, Kerala, Rajasthan, Himachal Pradesh, Tamil Nadu, vacation, holiday, adventure, Flynzo Innovation',
  authors: [{ name: 'Flynzo Innovation Private Limited' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Flynzo Innovation Private Limited - Discover Amazing Indian Destinations',
    description: 'Experience incredible domestic destinations across India with Flynzo Innovation Private Limited. Premium travel packages, expert guides, and unforgettable memories await.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Flynzo Innovation Private Limited',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flynzo Innovation Private Limited - Discover Amazing Indian Destinations',
    description: 'Experience incredible domestic destinations across India with Flynzo Innovation Private Limited.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} antialiased bg-black text-neutral-900 overflow-x-hidden`}>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#171717',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
