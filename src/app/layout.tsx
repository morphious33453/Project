import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "NSO Trust Index | Niagara Stands Out",
    template: "%s | NSO Trust Index",
  },
  description: "Track and improve your business trust score in the Niagara region. Leaderboards for local businesses across cities and verticals.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trust.niagarastandsout.com'),
  keywords: ['trust score', 'business ranking', 'Niagara businesses', 'local leaderboard', 'business reputation', 'online reviews', 'business trust'],
  authors: [{ name: 'Niagara Stands Out' }],
  creator: 'Niagara Stands Out',
  publisher: 'Niagara Stands Out',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: '/',
    siteName: 'NSO Trust Index',
    title: 'NSO Trust Index | Niagara Stands Out',
    description: 'Track and improve your business trust score in the Niagara region. Leaderboards for local businesses across cities and verticals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NSO Trust Index - Track Your Business Trust Score',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NSO Trust Index | Niagara Stands Out',
    description: 'Track and improve your business trust score in the Niagara region.',
    images: ['/og-image.png'],
    creator: '@NiagaraStandsOut',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between max-w-7xl">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded">NSO</div>
                <span className="font-bold text-lg hidden sm:inline">Trust Index</span>
              </Link>
            </div>

            <nav className="flex items-center space-x-6">
              <Link
                href="/search"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Search
              </Link>
              <Link
                href="/methodology"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Methodology
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="https://niagarastandsout.ca/collections?utm_source=trust"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Shop
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </main>

        <footer className="border-t py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4 text-lg">Tools to Fix This</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://niagarastandsout.ca/collections/custom-labels-canada?utm_source=trust"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Custom Labels & Stickers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://niagarastandsout.ca/collections/eyes-strip-truck-window-decals?utm_source=trust"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Eyes Strip Truck Decals
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://niagarastandsout.ca/products/complete-bathroom-marketing-kit?utm_source=trust"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DIY Bathroom Marketing Kit
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">About Trust Index</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about" className="text-blue-600 hover:underline text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/methodology" className="text-blue-600 hover:underline text-sm">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-blue-600 hover:underline text-sm">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-blue-600 hover:underline text-sm">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Asset Tags & More</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://niagarastandsout.ca/collections/asset-tags?utm_source=trust"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Asset Tags
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://niagarastandsout.ca/collections?utm_source=trust"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      All Products
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Niagara Stands Out Trust Index. All rights reserved.
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
