import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Paintbrush } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { navLinks } from "@/lib/utils/navigation"
import { env } from "@/lib/utils/env"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: env.SITE_NAME,
    template: `%s | ${env.SITE_NAME}`,
  },
  description: env.SITE_DESCRIPTION,
  robots: {
    index: env.ENABLE_ROBOTS,
    follow: env.ENABLE_ROBOTS,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center space-x-2">
                <Paintbrush className="h-6 w-6" />
                <span className="font-bold">{env.SITE_NAME}</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <MobileNav />
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t py-8 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/location/niagara" className="text-muted-foreground hover:text-primary">Locations</Link></li>
                  <li><Link href="/service/interior-painting" className="text-muted-foreground hover:text-primary">Services</Link></li>
                  <li><Link href="/paint-type/latex" className="text-muted-foreground hover:text-primary">Paint Types</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Services</h3>
                <ul className="space-y-2">
                  <li><Link href="/service/residential-painting" className="text-muted-foreground hover:text-primary">Residential</Link></li>
                  <li><Link href="/service/commercial-painting" className="text-muted-foreground hover:text-primary">Commercial</Link></li>
                  <li><Link href="/service/industrial-coatings" className="text-muted-foreground hover:text-primary">Industrial</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/surface/wood" className="text-muted-foreground hover:text-primary">Surface Guide</Link></li>
                  <li><Link href="/finish/matte" className="text-muted-foreground hover:text-primary">Finish Types</Link></li>
                  <li><Link href="/color/neutral" className="text-muted-foreground hover:text-primary">Color Guide</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Contact</h3>
                <p className="text-sm text-muted-foreground">
                  {env.SITE_DESCRIPTION}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} {env.SITE_NAME}. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
