import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma, safeDbOperation } from '@/lib/db'
import { Cog } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sticker Printing Methods | DecalForge',
  description:
    'Learn about sticker printing methods: die-cut, kiss-cut, screen printing, and digital printing. Find the best method for your project.',
  keywords: [
    'sticker printing methods',
    'die cut printing',
    'kiss cut stickers',
    'screen printing',
    'digital printing',
    'print and cut',
  ],
}

export default async function PrintMethodsPage() {
  const methods = await safeDbOperation(
    async () => {
      return await prisma.printMethod.findMany({
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      })
    },
    []
  )

  const featured = methods.filter((m) => m.featured)
  const other = methods.filter((m) => !m.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-screen-xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Cog className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sticker Printing Methods
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding different printing techniques for professional sticker production
          </p>
        </div>

        {/* Featured Methods */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Popular Methods</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((method) => (
                <Link
                  key={method.id}
                  href={`/methods/${method.slug}`}
                  className="group p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{method.description}</p>

                  {method.bestFor && method.bestFor.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="text-xs text-muted-foreground mb-2">Best For:</div>
                      <div className="flex flex-wrap gap-2">
                        {method.bestFor.slice(0, 3).map((use, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize"
                          >
                            {use.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
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

        {/* Other Methods */}
        {other.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">All Printing Methods</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {other.map((method) => (
                <Link
                  key={method.id}
                  href={`/methods/${method.slug}`}
                  className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                >
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Method comparison */}
        <div className="mt-16 p-8 rounded-2xl border bg-card">
          <h3 className="font-display text-xl font-bold mb-4">Choosing a Printing Method</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-2">For Custom Shapes</div>
              <p className="text-muted-foreground">
                Die-cut and kiss-cut methods allow for any shape you can design
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">For Small Batches</div>
              <p className="text-muted-foreground">
                Digital printing is cost-effective for low quantities and full-color designs
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">For Bulk Orders</div>
              <p className="text-muted-foreground">
                Screen printing becomes more economical at 1,000+ units
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Get print-ready files for any method
          </h3>
          <p className="text-muted-foreground mb-6">
            Generate sticker designs optimized for professional printing
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
