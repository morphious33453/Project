import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma, safeDbOperation } from '@/lib/db'
import { ArrowLeft, Check, Printer, Package } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const material = await safeDbOperation(
    async () => {
      return await prisma.material.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!material) {
    return {
      title: 'Material Not Found | DecalForge',
    }
  }

  return {
    title: material.metaTitle || `${material.name} Stickers | DecalForge Materials Guide`,
    description:
      material.metaDescription ||
      material.description ||
      `Learn about ${material.name} for sticker printing`,
    openGraph: {
      title: material.metaTitle || `${material.name} Stickers - Materials Guide`,
      description: material.description,
    },
  }
}

export async function generateStaticParams() {
  const materials = await safeDbOperation(
    async () => {
      return await prisma.material.findMany({
        select: { slug: true },
      })
    },
    []
  )

  return materials.map((material) => ({
    slug: material.slug,
  }))
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params
  const material = await safeDbOperation(
    async () => {
      return await prisma.material.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!material) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Materials
        </Link>

        {/* Material header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {material.name}
          </h1>
          <p className="text-xl text-muted-foreground">{material.description}</p>
        </div>

        {/* Price Range */}
        {material.priceRange && (
          <div className="mb-8 p-6 rounded-2xl border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Typical Price Range</div>
                <div className="font-display text-2xl font-bold">{material.priceRange}</div>
              </div>
              <Package className="h-10 w-10 text-primary/50" />
            </div>
          </div>
        )}

        {/* Use Cases */}
        {material.useCases && material.useCases.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Check className="h-6 w-6 text-primary" />
              Best For
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {material.useCases.map((useCase, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="capitalize">{useCase.replace(/-/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compatible Printers */}
        {material.printers && material.printers.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Printer className="h-6 w-6 text-primary" />
              Compatible Printers
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {material.printers.map((printer, i) => (
                <div key={i} className="p-4 rounded-xl border bg-card">
                  <span className="font-medium">
                    {printer
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Finishes */}
        {material.finishes && material.finishes.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">Available Finishes</h2>
            <div className="flex flex-wrap gap-3">
              {material.finishes.map((finish, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full border bg-card font-medium capitalize"
                >
                  {finish.replace(/-/g, ' ')}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: material.name,
              description: material.description,
              category: 'Sticker Material',
              ...(material.priceRange && {
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              }),
            }),
          }}
        />

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Create designs for {material.name.toLowerCase()}
          </h3>
          <p className="text-muted-foreground mb-6">
            Generate print-ready files optimized for this material
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
