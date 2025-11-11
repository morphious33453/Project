import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Download, Printer } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import type { Metadata } from 'next'

// Fallback data when database is not available
const fallbackPrinters = [
  {
    id: '1',
    slug: 'roland-bn-20',
    name: 'Roland BN-20',
    manufacturer: 'Roland DG',
    maxWidthMm: 482.6,
    maxHeightMm: 297,
    supportsContourCutting: true,
    description:
      'Desktop eco-solvent printer/cutter perfect for small format stickers. Industry standard for quality die-cut decals.',
    setupGuide: null,
    recommendedMaterials: ['Vinyl', 'Printable Vinyl', 'Adhesive Paper', 'Clear Vinyl'],
    specs: null,
    popular: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    slug: 'cricut-maker',
    name: 'Cricut Maker',
    manufacturer: 'Cricut',
    maxWidthMm: 292,
    maxHeightMm: 3600,
    supportsContourCutting: true,
    description:
      'Popular home crafting machine with Print Then Cut feature. Perfect for DIY stickers and small business.',
    setupGuide: null,
    recommendedMaterials: ['Printable Vinyl', 'Sticker Paper', 'Adhesive Cardstock', 'Printable Magnet'],
    specs: null,
    popular: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    slug: 'silhouette-cameo-4',
    name: 'Silhouette Cameo 4',
    manufacturer: 'Silhouette America',
    maxWidthMm: 305,
    maxHeightMm: 3048,
    supportsContourCutting: true,
    description:
      'Versatile cutting machine with registration marks for print and cut. Great for sticker businesses.',
    setupGuide: null,
    recommendedMaterials: ['Printable Vinyl', 'Printable Adhesive', 'Tattoo Paper', 'Printable HTV'],
    specs: null,
    popular: true,
    createdAt: new Date(),
  },
]

export async function generateStaticParams() {
  const printers = await safeDbOperation(
    async () => await prisma.printerModel.findMany({ select: { slug: true } }),
    fallbackPrinters.map((p) => ({ slug: p.slug }))
  )

  return printers.map((printer) => ({
    slug: printer.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const printer = await safeDbOperation(
    async () => await prisma.printerModel.findUnique({ where: { slug } }),
    fallbackPrinters.find((p) => p.slug === slug)
  )

  if (!printer) {
    return { title: 'Printer Not Found' }
  }

  const title = `${printer.name} Stickers | Print-Ready Designs | DecalForge`
  const description = `Print-ready sticker designs optimized for ${printer.name}. ${printer.description} 300 DPI PNG + SVG cutline included.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function PrinterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const printer = await safeDbOperation(
    async () => await prisma.printerModel.findUnique({ where: { slug } }),
    fallbackPrinters.find((p) => p.slug === slug)
  )

  if (!printer) {
    notFound()
  }

  // Get compatible designs (designs that fit this printer's specs)
  const compatibleDesigns = await safeDbOperation(
    async () =>
      await prisma.design.findMany({
        where: {
          status: 'LISTED',
          widthMm: { lte: printer.maxWidthMm },
          flagged: false,
        },
        take: 12,
        orderBy: { createdAt: 'desc' },
      }),
    []
  )

  // Get related printers (same manufacturer or similar size)
  const relatedPrinters = await safeDbOperation(
    async () =>
      await prisma.printerModel.findMany({
        where: {
          slug: { not: slug },
          OR: [{ manufacturer: printer.manufacturer }, { popular: true }],
        },
        take: 4,
      }),
    fallbackPrinters.filter((p) => p.slug !== slug && p.popular).slice(0, 4)
  )

  const maxWidthInches = (printer.maxWidthMm / 25.4).toFixed(1)
  const maxHeightInches = printer.maxHeightMm ? (printer.maxHeightMm / 25.4).toFixed(1) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${printer.name} Sticker Designs`,
            description: printer.description,
            brand: {
              '@type': 'Brand',
              name: printer.manufacturer,
            },
            offers: {
              '@type': 'Offer',
              price: '9.99',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-screen-xl px-4 py-12">
          {/* Breadcrumb */}
          <Link
            href="/printers"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Printers
          </Link>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Printer className="h-4 w-4" />
                {printer.manufacturer}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {printer.name}
                <br />
                <span className="text-muted-foreground">Sticker Designs</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8">{printer.description}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/generator"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
                >
                  Generate Design
                </Link>
                <Link
                  href="#compatible-designs"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-base font-medium transition-all hover:bg-muted"
                >
                  Browse Designs
                </Link>
              </div>

              {/* Printer Specs */}
              <div className="p-6 rounded-2xl border bg-card">
                <h3 className="font-semibold mb-4">Printer Specifications</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Maximum Width</dt>
                    <dd className="font-medium">
                      {maxWidthInches}" ({printer.maxWidthMm.toFixed(0)}mm)
                    </dd>
                  </div>
                  {maxHeightInches && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Maximum Height</dt>
                      <dd className="font-medium">
                        {maxHeightInches}" ({printer.maxHeightMm?.toFixed(0)}mm)
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Contour Cutting</dt>
                    <dd className="font-medium">
                      {printer.supportsContourCutting ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <Check className="h-4 w-4" /> Supported
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Not supported</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Features / Benefits */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border bg-card">
                <h3 className="font-semibold mb-4">Why Choose DecalForge?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>All designs fit your {printer.name} perfectly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>300 DPI print-ready PNG files</span>
                  </li>
                  {printer.supportsContourCutting && (
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>SVG cutline paths for contour cutting</span>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>White halo included for die-cut perfection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Commercial license for unlimited printing</span>
                  </li>
                </ul>
              </div>

              {printer.recommendedMaterials && printer.recommendedMaterials.length > 0 && (
                <div className="p-6 rounded-2xl border bg-card">
                  <h3 className="font-semibold mb-4">Recommended Materials</h3>
                  <div className="flex flex-wrap gap-2">
                    {printer.recommendedMaterials.map((material) => (
                      <span
                        key={material}
                        className="px-3 py-1 rounded-full bg-muted text-sm font-medium"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compatible Designs */}
          {compatibleDesigns.length > 0 && (
            <div id="compatible-designs" className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-2">Compatible Designs</h2>
                  <p className="text-muted-foreground">
                    All designs guaranteed to fit your {printer.name}
                  </p>
                </div>
                <Link
                  href={`/gallery?printer=${slug}`}
                  className="text-sm font-medium hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {compatibleDesigns.map((design) => (
                  <Link
                    key={design.id}
                    href={`/design/${design.slug}`}
                    className="group rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-square bg-muted relative">
                      {design.previewUrl && (
                        <img
                          src={design.previewUrl}
                          alt={design.prompt}
                          className="w-full h-full object-contain p-4"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-2 mb-2">{design.prompt}</h3>
                      {design.widthMm && (
                        <p className="text-sm text-muted-foreground">
                          {(design.widthMm / 25.4).toFixed(1)}" wide
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Printers */}
          {relatedPrinters.length > 0 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-8">Similar Printers</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPrinters.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/printers/${related.slug}`}
                    className="p-6 rounded-2xl border bg-card transition-all hover:shadow-lg"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium mb-3">
                      <Printer className="h-3 w-3" />
                      {related.manufacturer}
                    </div>
                    <h3 className="font-semibold mb-2">{related.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
