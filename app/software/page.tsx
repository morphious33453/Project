import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma, safeDbOperation } from '@/lib/db'
import { Code2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sticker Design Software Guide | DecalForge',
  description:
    'Complete guide to sticker design software: Cricut Design Space, Silhouette Studio, Adobe Illustrator, Inkscape, and more. Find the right tool for your workflow.',
  keywords: [
    'sticker design software',
    'Cricut Design Space',
    'Silhouette Studio',
    'Adobe Illustrator',
    'Inkscape',
    'Canva stickers',
    'SVG software',
  ],
}

export default async function SoftwarePage() {
  const software = await safeDbOperation(
    async () => {
      return await prisma.software.findMany({
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      })
    },
    []
  )

  const featured = software.filter((s) => s.featured)
  const other = software.filter((s) => !s.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-screen-xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sticker Design Software
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect design tool for creating and cutting stickers
          </p>
        </div>

        {/* Featured Software */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Popular Software</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((soft) => (
                <Link
                  key={soft.id}
                  href={`/software/${soft.slug}`}
                  className="group p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {soft.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{soft.vendor}</p>
                  </div>

                  <p className="text-muted-foreground mb-6 line-clamp-3">{soft.description}</p>

                  {soft.priceModel && (
                    <div className="pt-4 border-t">
                      <span className="text-sm font-semibold text-primary">
                        {soft.priceModel}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                    Learn more
                    <svg
                      className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other Software */}
        {other.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">More Software Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {other.map((soft) => (
                <Link
                  key={soft.id}
                  href={`/software/${soft.slug}`}
                  className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {soft.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{soft.vendor}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {soft.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Software comparison */}
        <div className="mt-16 p-8 rounded-2xl border bg-card">
          <h3 className="font-display text-xl font-bold mb-4">Choosing the Right Software</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-2">For Cricut/Silhouette Users</div>
              <p className="text-muted-foreground">
                Use the free software that comes with your machine for seamless cutting
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">For Professional Designers</div>
              <p className="text-muted-foreground">
                Adobe Illustrator offers the most powerful vector editing tools
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">For Beginners</div>
              <p className="text-muted-foreground">
                Canva and Inkscape provide easy-to-use interfaces at no cost
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Skip the design work with AI
          </h3>
          <p className="text-muted-foreground mb-6">
            Get print-ready sticker files instantly - no design software needed
          </p>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
          >
            Generate Sticker Design
          </Link>
        </div>
      </div>
    </div>
  )
}
