import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Sparkles, Menu } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { getBaseUrl } from '@/lib/utils'

const siteUrl = getBaseUrl()
const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'DecalForge'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – AI-Powered Custom Sticker Maker`,
    template: `%s | ${siteName}`,
  },
  description:
    'Create stunning custom stickers and decals with AI. Get print-ready files with white halo cutline, perfect for die-cut printing. Commercial licenses available.',
  keywords: [
    'custom stickers',
    'ai sticker maker',
    'decal designer',
    'print ready stickers',
    'die cut stickers',
    'vinyl stickers',
    'sticker generator',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${siteName} – AI-Powered Custom Sticker Maker`,
    description: 'Create stunning custom stickers and decals with AI',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} – AI-Powered Custom Sticker Maker`,
    description: 'Create stunning custom stickers and decals with AI',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 blur-lg bg-primary/20 group-hover:bg-primary/30 transition-all" />
                </div>
                <span className="font-display text-xl font-semibold tracking-tight">
                  {siteName}
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/generator"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Generator
                </Link>
                <Link
                  href="/gallery"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Gallery
                </Link>
                <Link
                  href="/shop"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Shop
                </Link>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Pricing
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/generator"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 btn-magnetic focus-ring"
              >
                Create Now
              </Link>

              <button
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-foreground focus-ring"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t bg-muted/50">
          <div className="container max-w-screen-2xl px-4 py-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-display font-semibold">{siteName}</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  AI-powered custom sticker and decal maker. Create print-ready
                  designs in seconds.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/generator"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gallery"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/templates"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/docs"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Licenses
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} {siteName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}
