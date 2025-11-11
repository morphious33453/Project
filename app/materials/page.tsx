import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma, safeDbOperation } from '@/lib/db'
import { Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sticker Materials Guide | DecalForge',
  description:
    'Complete guide to sticker materials: vinyl, printable vinyl, paper, holographic, and more. Learn which material is best for your project.',
  keywords: [
    'sticker materials',
    'vinyl stickers',
    'printable vinyl',
    'holographic stickers',
    'sticker paper',
    'waterproof stickers',
  ],
}

export default async function MaterialsPage() {
  const materials = await safeDbOperation(
    async () => {
      return await prisma.material.findMany({
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      })
    },
    []
  )

  const featured = materials.filter((m) => m.featured)
  const other = materials.filter((m) => !m.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-screen-xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sticker Materials Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect material for your sticker project
          </p>
        </div>

        {/* Featured Materials */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Popular Materials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((material) => (
                <Link
                  key={material.id}
                  href={`/materials/${material.slug}`}
                  className="group p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {material.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{material.description}</p>

                  {material.priceRange && (
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">Typical Price</span>
                      <span className="font-semibold">{material.priceRange}</span>
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

        {/* Other Materials */}
        {other.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">All Materials</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {other.map((material) => (
                <Link
                  key={material.id}
                  href={`/materials/${material.slug}`}
                  className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                >
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {material.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{material.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Material comparison table hint */}
        <div className="mt-16 p-8 rounded-2xl border bg-card">
          <h3 className="font-display text-xl font-bold mb-4">Need help choosing?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-2">For Outdoor Use</div>
              <p className="text-muted-foreground">
                Choose vinyl or holographic vinyl for waterproof, UV-resistant stickers
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">For Budget Projects</div>
              <p className="text-muted-foreground">
                Paper sticker stock is cost-effective for indoor or short-term use
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">For Premium Branding</div>
              <p className="text-muted-foreground">
                Holographic or specialty vinyl creates eye-catching effects
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Ready to create with these materials?
          </h3>
          <p className="text-muted-foreground mb-6">
            Generate print-ready sticker designs optimized for any material
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
