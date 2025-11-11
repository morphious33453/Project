import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Sparkles, Download, DollarSign } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import type { Metadata } from 'next'

// Fallback data when database is not available
const fallbackUseCases = [
  {
    id: '1',
    slug: 'youtube-creators',
    name: 'YouTube Creators',
    title: 'Custom Stickers for YouTube Creators',
    description: 'Create unique channel stickers for merchandise, giveaways, and branding.',
    targetAudience: 'YouTube content creators with 1K+ subscribers looking to monetize',
    painPoints: [
      'Expensive custom design services ($50-200 per design)',
      'Long turnaround times (1-2 weeks)',
      'Need multiple designs for testing',
      'Want to match channel branding',
    ],
    solutions: [
      'Generate unlimited designs for $9.99 each',
      'Instant AI generation in seconds',
      'Print-ready files with commercial license',
      'Perfect for merch, packaging, and giveaways',
    ],
    keywords: [],
    metaTitle: null,
    metaDescription: null,
    content: null,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    slug: 'twitch-streamers',
    name: 'Twitch Streamers',
    title: 'Custom Stickers for Twitch Streamers',
    description: 'Level up your stream branding with custom emote stickers and sub badges.',
    targetAudience: 'Twitch affiliates and partners wanting unique merch',
    painPoints: [
      'Generic emote packs look unprofessional',
      'Custom artists charge $25-100 per emote',
      'Need stickers for sub boxes and giveaways',
      'Want cohesive branding across platform',
    ],
    solutions: [
      'AI-generated emote-style stickers',
      'Commercial license for unlimited printing',
      'Match your stream aesthetic',
      'Perfect size for sub boxes and packages',
    ],
    keywords: [],
    metaTitle: null,
    metaDescription: null,
    content: null,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    slug: 'etsy-sellers',
    name: 'Etsy Sellers',
    title: 'Print-Ready Sticker Designs for Etsy Sellers',
    description: 'Build your sticker inventory without design costs. Commercial license included.',
    targetAudience: 'Etsy shop owners selling stickers and handmade goods',
    painPoints: [
      'High cost of commissioning original designs',
      'Copyright concerns with stock designs',
      'Need consistent inventory to compete',
      'Want unique designs that stand out',
    ],
    solutions: [
      'Commercial license for unlimited resale',
      'Print-ready with 300 DPI + SVG cutline',
      'Unique AI designs nobody else has',
      'Perfect for Etsy listings and print-on-demand',
    ],
    keywords: [],
    metaTitle: null,
    metaDescription: null,
    content: null,
    featured: true,
    createdAt: new Date(),
  },
]

export async function generateStaticParams() {
  const useCases = await safeDbOperation(
    async () => await prisma.useCase.findMany({ select: { slug: true } }),
    fallbackUseCases.map((u) => ({ slug: u.slug }))
  )

  return useCases.map((useCase) => ({
    slug: useCase.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const useCase = await safeDbOperation(
    async () => await prisma.useCase.findUnique({ where: { slug } }),
    fallbackUseCases.find((u) => u.slug === slug)
  )

  if (!useCase) {
    return { title: 'Page Not Found' }
  }

  const title = useCase.metaTitle || `${useCase.title} | DecalForge`
  const description =
    useCase.metaDescription ||
    `${useCase.description} Print-ready sticker designs with commercial license.`

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

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const useCase = await safeDbOperation(
    async () => await prisma.useCase.findUnique({ where: { slug } }),
    fallbackUseCases.find((u) => u.slug === slug)
  )

  if (!useCase) {
    notFound()
  }

  // Get designs for this use case
  const designs = await safeDbOperation(
    async () =>
      await prisma.design.findMany({
        where: {
          status: 'LISTED',
          useCases: { has: slug },
          flagged: false,
        },
        take: 12,
        orderBy: { createdAt: 'desc' },
      }),
    []
  )

  // Get related use cases
  const relatedUseCases = await safeDbOperation(
    async () =>
      await prisma.useCase.findMany({
        where: {
          slug: { not: slug },
          featured: true,
        },
        take: 3,
      }),
    fallbackUseCases.filter((u) => u.slug !== slug && u.featured).slice(0, 3)
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: useCase.title,
            description: useCase.description,
            provider: {
              '@type': 'Organization',
              name: 'DecalForge',
            },
            areaServed: useCase.targetAudience,
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-screen-xl px-4 py-12">
          {/* Breadcrumb */}
          <Link
            href="/for"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Use Cases
          </Link>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                {useCase.name}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{useCase.title}</h1>

              <p className="text-lg text-muted-foreground mb-8">{useCase.description}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/generator"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
                >
                  Start Creating
                </Link>
                {designs.length > 0 && (
                  <Link
                    href="#designs"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-base font-medium transition-all hover:bg-muted"
                  >
                    Browse Examples
                  </Link>
                )}
              </div>

              {/* Target Audience */}
              <div className="p-6 rounded-2xl border bg-card">
                <h3 className="font-semibold mb-2">Perfect For:</h3>
                <p className="text-muted-foreground">{useCase.targetAudience}</p>
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              {/* Pain Points */}
              {useCase.painPoints && useCase.painPoints.length > 0 && (
                <div className="p-6 rounded-2xl border bg-card">
                  <h3 className="font-semibold mb-4">Common Challenges</h3>
                  <ul className="space-y-2">
                    {useCase.painPoints.map((pain, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5">×</span>
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solutions */}
              {useCase.solutions && useCase.solutions.length > 0 && (
                <div className="p-6 rounded-2xl border bg-primary/5 border-primary/20">
                  <h3 className="font-semibold mb-4">How DecalForge Helps</h3>
                  <ul className="space-y-3">
                    {useCase.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing Highlight */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <DollarSign className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-xl mb-2">Simple, Transparent Pricing</h3>
                <p className="text-primary-foreground/90 mb-4">
                  $9.99 per design with commercial license. No subscriptions, no hidden fees.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center text-sm font-medium hover:underline"
                >
                  View Full Pricing →
                </Link>
              </div>
            </div>
          </div>

          {/* Designs */}
          {designs.length > 0 && (
            <div id="designs" className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-2">Example Designs</h2>
                  <p className="text-muted-foreground">Designs perfect for {useCase.name.toLowerCase()}</p>
                </div>
                <Link href={`/gallery?useCase=${slug}`} className="text-sm font-medium hover:underline">
                  View All →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {designs.map((design) => (
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
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Print-ready</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Use Cases */}
          {relatedUseCases.length > 0 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-8">Also Great For</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {relatedUseCases.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/for/${related.slug}`}
                    className="p-6 rounded-2xl border bg-card transition-all hover:shadow-lg"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium mb-3">
                      <Sparkles className="h-3 w-3" />
                      {related.name}
                    </div>
                    <h3 className="font-semibold mb-2">{related.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create your first design in seconds. No design skills required.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
            >
              Generate Your First Design
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
