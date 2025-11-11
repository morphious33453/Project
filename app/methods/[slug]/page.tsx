import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma, safeDbOperation } from '@/lib/db'
import { ArrowLeft, Layers, Printer, CheckCircle } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const method = await safeDbOperation(
    async () => {
      return await prisma.printMethod.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!method) {
    return {
      title: 'Method Not Found | DecalForge',
    }
  }

  return {
    title:
      method.metaTitle ||
      `${method.name} Guide | DecalForge Printing Methods`,
    description:
      method.metaDescription ||
      method.description ||
      `Learn about ${method.name} for sticker production`,
    openGraph: {
      title: method.metaTitle || `${method.name} - Sticker Printing Methods`,
      description: method.description,
    },
  }
}

export async function generateStaticParams() {
  const methods = await safeDbOperation(
    async () => {
      return await prisma.printMethod.findMany({
        select: { slug: true },
      })
    },
    []
  )

  return methods.map((method) => ({
    slug: method.slug,
  }))
}

export default async function PrintMethodPage({ params }: Props) {
  const { slug } = await params
  const method = await safeDbOperation(
    async () => {
      return await prisma.printMethod.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!method) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/methods"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Printing Methods
        </Link>

        {/* Method header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {method.name}
          </h1>
          <p className="text-xl text-muted-foreground">{method.description}</p>
        </div>

        {/* Best For */}
        {method.bestFor && method.bestFor.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              Best For
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {method.bestFor.map((use, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="capitalize">{use.replace(/-/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compatible Materials */}
        {method.materials && method.materials.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              Compatible Materials
            </h2>
            <div className="flex flex-wrap gap-3">
              {method.materials.map((material, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full border bg-card font-medium capitalize"
                >
                  {material.replace(/-/g, ' ')}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Equipment */}
        {method.equipment && method.equipment.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Printer className="h-6 w-6 text-primary" />
              Required Equipment
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {method.equipment.map((equip, i) => (
                <div key={i} className="p-4 rounded-xl border bg-card">
                  <span className="font-medium">
                    {equip
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process description based on method */}
        <div className="mb-8 p-6 rounded-2xl border bg-card">
          <h3 className="font-semibold text-lg mb-4">How It Works</h3>
          <div className="space-y-3 text-muted-foreground">
            {method.slug === 'die-cut' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    Design is printed on sticker material using a digital or offset printer
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    A digital cutting plotter reads an SVG cutline file to determine the cut path
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    The plotter cuts through both the sticker and backing, following your design
                    shape
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Excess material is removed (weeding) leaving individual stickers</span>
                </div>
              </>
            )}
            {method.slug === 'kiss-cut' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Designs are printed on sticker sheets</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    A cutting plotter cuts through only the sticker layer, not the backing paper
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Multiple stickers remain on a single sheet for easy peeling</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Ideal for sticker packs and planner stickers</span>
                </div>
              </>
            )}
            {method.slug === 'screen-print' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>A mesh screen is created for each color in the design</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Ink is pushed through the screen onto the material</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Each color requires a separate pass</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Most economical for large runs of simple designs</span>
                </div>
              </>
            )}
            {method.slug === 'digital-print' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Design is sent directly from computer to printer (no screens needed)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Full-color CMYK printing allows photo-quality results</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>No setup costs make it ideal for small batches and prototypes</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Perfect for complex, multi-color designs</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* HowTo Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: method.name,
              description: method.description,
            }),
          }}
        />

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Create designs for {method.name.toLowerCase()}
          </h3>
          <p className="text-muted-foreground mb-6">
            Generate print-ready files optimized for this printing method
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
