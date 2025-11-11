import Link from 'next/link'
import { Printer, Check } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Printer-Specific Sticker Designs | DecalForge',
  description:
    'Find print-ready sticker designs optimized for your specific printer. Roland, Cricut, Silhouette, and more. 300 DPI + SVG cutlines included.',
  openGraph: {
    title: 'Printer-Specific Sticker Designs | DecalForge',
    description: 'Print-ready designs optimized for Roland, Cricut, Silhouette, and more printers.',
    type: 'website',
  },
}

export default async function PrintersPage() {
  const printers = await safeDbOperation(
    async () =>
      await prisma.printerModel.findMany({
        orderBy: [{ popular: 'desc' }, { name: 'asc' }],
      }),
    [
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
        recommendedMaterials: ['Vinyl', 'Printable Vinyl'],
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
        recommendedMaterials: ['Printable Vinyl', 'Sticker Paper'],
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
        recommendedMaterials: ['Printable Vinyl', 'Printable Adhesive'],
        specs: null,
        popular: true,
        createdAt: new Date(),
      },
    ]
  )

  const popularPrinters = printers.filter((p) => p.popular)
  const allPrinters = printers

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Printer-Specific Sticker Designs',
            description: 'Print-ready sticker designs optimized for specific printers',
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-screen-xl px-4 py-16">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Printer className="h-4 w-4" />
              Printer-Specific Designs
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Stickers for Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Specific Printer
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Every design is optimized for your printer's specifications. No more guess work with file
              sizes and formats.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-card border">
                <Check className="h-5 w-5 text-primary mb-2 mx-auto" />
                <p className="text-sm font-medium">Correct Size</p>
              </div>
              <div className="p-4 rounded-xl bg-card border">
                <Check className="h-5 w-5 text-primary mb-2 mx-auto" />
                <p className="text-sm font-medium">300 DPI</p>
              </div>
              <div className="p-4 rounded-xl bg-card border">
                <Check className="h-5 w-5 text-primary mb-2 mx-auto" />
                <p className="text-sm font-medium">SVG Cutlines</p>
              </div>
            </div>
          </div>

          {/* Popular Printers */}
          {popularPrinters.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-3xl font-bold mb-8">Popular Printers</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularPrinters.map((printer) => (
                  <Link
                    key={printer.slug}
                    href={`/printers/${printer.slug}`}
                    className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium">
                        <Printer className="h-3 w-3" />
                        {printer.manufacturer}
                      </div>
                      {printer.popular && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          Popular
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-xl mb-2">{printer.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {printer.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Width</span>
                        <span className="font-medium">
                          {(printer.maxWidthMm / 25.4).toFixed(1)}"
                        </span>
                      </div>
                      {printer.supportsContourCutting && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contour Cut</span>
                          <span className="font-medium text-green-600">✓ Yes</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        View Designs →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Printers */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-8">All Supported Printers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allPrinters.map((printer) => (
                <Link
                  key={printer.slug}
                  href={`/printers/${printer.slug}`}
                  className="p-4 rounded-xl border bg-card transition-all hover:shadow-md"
                >
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-muted text-xs font-medium mb-2">
                    <Printer className="h-3 w-3" />
                    {printer.manufacturer}
                  </div>
                  <h3 className="font-semibold mb-1">{printer.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {(printer.maxWidthMm / 25.4).toFixed(1)}" max width
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <h2 className="font-display text-3xl font-bold mb-4">
              Don't see your printer?
            </h2>
            <p className="text-muted-foreground mb-6">
              Request support for your specific printer model
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
            >
              Generate Design Anyway
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
