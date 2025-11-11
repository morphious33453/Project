import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma, safeDbOperation } from '@/lib/db'
import { ArrowLeft, FileText, Monitor, DollarSign } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const software = await safeDbOperation(
    async () => {
      return await prisma.software.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!software) {
    return {
      title: 'Software Not Found | DecalForge',
    }
  }

  return {
    title:
      software.metaTitle ||
      `${software.name} for Stickers | DecalForge Software Guide`,
    description:
      software.metaDescription ||
      software.description ||
      `Learn about ${software.name} for sticker design and cutting`,
    openGraph: {
      title: software.metaTitle || `${software.name} - Sticker Design Software`,
      description: software.description,
    },
  }
}

export async function generateStaticParams() {
  const software = await safeDbOperation(
    async () => {
      return await prisma.software.findMany({
        select: { slug: true },
      })
    },
    []
  )

  return software.map((soft) => ({
    slug: soft.slug,
  }))
}

export default async function SoftwarePage({ params }: Props) {
  const { slug } = await params
  const software = await safeDbOperation(
    async () => {
      return await prisma.software.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!software) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/software"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Software
        </Link>

        {/* Software header */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                {software.name}
              </h1>
              <p className="text-lg text-muted-foreground">by {software.vendor}</p>
            </div>
            <Monitor className="h-12 w-12 text-primary/50 flex-shrink-0" />
          </div>
          <p className="text-xl text-muted-foreground mt-6">{software.description}</p>
        </div>

        {/* Pricing */}
        {software.priceModel && (
          <div className="mb-8 p-6 rounded-2xl border bg-card">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                <div className="font-display text-xl font-bold">{software.priceModel}</div>
              </div>
            </div>
          </div>
        )}

        {/* Compatibility */}
        {software.compatibility && software.compatibility.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Monitor className="h-6 w-6 text-primary" />
              Compatible Devices
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {software.compatibility.map((device, i) => (
                <div key={i} className="p-4 rounded-xl border bg-card">
                  <span className="font-medium capitalize">
                    {device === 'universal'
                      ? 'Universal (All Devices)'
                      : device
                          .split('-')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supported File Formats */}
        {software.fileFormats && software.fileFormats.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Supported File Formats
            </h2>
            <div className="flex flex-wrap gap-3">
              {software.fileFormats.map((format, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full border bg-card font-mono font-semibold uppercase text-sm"
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="mb-8 p-6 rounded-2xl border bg-card">
          <h3 className="font-semibold text-lg mb-4">Best For</h3>
          <div className="space-y-3 text-muted-foreground">
            {software.slug === 'cricut-design-space' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Cricut machine owners looking for print-then-cut capabilities</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Beginners who want easy-to-use design templates</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Users who need seamless integration with Cricut machines</span>
                </div>
              </>
            )}
            {software.slug === 'silhouette-studio' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Silhouette machine owners</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Users who want more advanced design control</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Print and cut workflows</span>
                </div>
              </>
            )}
            {software.slug === 'adobe-illustrator' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Professional designers and design agencies</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Complex vector artwork and precise control</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Commercial printing workflows</span>
                </div>
              </>
            )}
            {software.slug === 'inkscape' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Budget-conscious designers who need vector tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Creating and editing SVG cutlines</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Open-source software enthusiasts</span>
                </div>
              </>
            )}
            {software.slug === 'canva' && (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Beginners with no design experience</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Quick social media graphics and simple sticker designs</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Teams collaborating on designs</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Software Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: software.name,
              applicationCategory: 'DesignApplication',
              description: software.description,
              operatingSystem: 'Cross-platform',
              ...(software.priceModel && {
                offers: {
                  '@type': 'Offer',
                  price: software.priceModel.includes('Free') ? '0' : undefined,
                  priceCurrency: 'USD',
                },
              }),
            }),
          }}
        />

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Or skip the software entirely
          </h3>
          <p className="text-muted-foreground mb-6">
            Generate print-ready sticker files with AI - no design software needed
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
