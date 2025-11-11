import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Download, ArrowLeft } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import { generateProductJsonLd, generateSeoTitle, generateSeoDescription } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const design = await safeDbOperation(
    async () => await prisma.design.findUnique({ where: { slug } }),
    null
  )

  if (!design) {
    return {
      title: 'Design Not Found',
    }
  }

  return {
    title: generateSeoTitle(design.prompt),
    description: generateSeoDescription(design.prompt),
    openGraph: {
      title: generateSeoTitle(design.prompt),
      description: generateSeoDescription(design.prompt),
      images: design.previewUrl ? [design.previewUrl] : [],
    },
  }
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const design = await safeDbOperation(
    async () => await prisma.design.findUnique({ where: { slug } }),
    null
  )

  if (!design) {
    notFound()
  }

  const jsonLd = generateProductJsonLd(design)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container max-w-screen-xl px-4 py-12">
        <Link
          href="/gallery"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-2xl border bg-card p-8">
            <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-4">
              {design.previewUrl && (
                <img
                  src={design.previewUrl}
                  alt={design.prompt}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            {design.tags && design.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {design.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display text-3xl font-bold mb-4">
              {design.prompt}
            </h1>

            <div className="space-y-4 mb-8">
              <div>
                <span className="text-sm text-muted-foreground">Created</span>
                <p className="font-medium">{formatDate(design.createdAt)}</p>
              </div>

              {design.widthMm && (
                <div>
                  <span className="text-sm text-muted-foreground">Dimensions</span>
                  <p className="font-medium">{design.widthMm.toFixed(1)}mm wide</p>
                </div>
              )}

              <div>
                <span className="text-sm text-muted-foreground">Status</span>
                <p className="font-medium capitalize">{design.status.toLowerCase()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-3">Available Options</h3>

              <div className="p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Preview</h4>
                    <p className="text-sm text-muted-foreground">Watermarked preview image</p>
                  </div>
                  <span className="text-sm font-semibold">Free</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Print Files</h4>
                    <p className="text-sm text-muted-foreground">300 DPI PNG + SVG cutline</p>
                  </div>
                  <span className="text-sm font-semibold">$9.99</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Commercial License</h4>
                    <p className="text-sm text-muted-foreground">Use for business purposes</p>
                  </div>
                  <span className="text-sm font-semibold">$29.99</span>
                </div>
              </div>

              <Link
                href="/pricing"
                className="w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 mt-4"
              >
                <Download className="mr-2 h-5 w-5" />
                Purchase Files
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
