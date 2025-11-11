import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Stickers for Every Creator & Business | DecalForge',
  description:
    'Print-ready sticker designs for YouTube creators, Twitch streamers, Etsy sellers, small businesses, and more. Commercial license included.',
  openGraph: {
    title: 'Custom Stickers for Every Creator & Business',
    description: 'Sticker designs for creators, sellers, and businesses with commercial license.',
    type: 'website',
  },
}

export default async function UseCasesPage() {
  const useCases = await safeDbOperation(
    async () =>
      await prisma.useCase.findMany({
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      }),
    [
      {
        id: '1',
        slug: 'youtube-creators',
        name: 'YouTube Creators',
        title: 'Custom Stickers for YouTube Creators',
        description: 'Create unique channel stickers for merchandise, giveaways, and branding.',
        targetAudience: 'YouTube content creators with 1K+ subscribers',
        painPoints: [],
        solutions: [],
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
        targetAudience: 'Twitch affiliates and partners',
        painPoints: [],
        solutions: [],
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
        targetAudience: 'Etsy shop owners',
        painPoints: [],
        solutions: [],
        keywords: [],
        metaTitle: null,
        metaDescription: null,
        content: null,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: '4',
        slug: 'small-business',
        name: 'Small Business',
        title: 'Custom Logo Stickers for Small Businesses',
        description: 'Affordable custom stickers for branding, packaging, and promotions.',
        targetAudience: 'Small business owners',
        painPoints: [],
        solutions: [],
        keywords: [],
        metaTitle: null,
        metaDescription: null,
        content: null,
        featured: true,
        createdAt: new Date(),
      },
    ]
  )

  const featured = useCases.filter((u) => u.featured)
  const all = useCases

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Custom Stickers for Every Use Case',
            description: 'Sticker designs for creators, businesses, and sellers',
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-screen-xl px-4 py-16">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Solutions for Every Creator
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Stickers Designed
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                For Your Goals
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Whether you're building a brand, selling online, or creating merch - we've got designs that
              work for your specific needs.
            </p>
          </div>

          {/* Featured Use Cases */}
          {featured.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-3xl font-bold mb-8">Popular Use Cases</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {featured.map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/for/${useCase.slug}`}
                    className="group p-8 rounded-3xl border bg-card transition-all hover:shadow-xl"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      <Sparkles className="h-4 w-4" />
                      {useCase.name}
                    </div>

                    <h3 className="font-semibold text-2xl mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-6">{useCase.description}</p>

                    <div className="p-4 rounded-xl bg-muted/50 mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Perfect for:</p>
                      <p className="text-sm font-medium">{useCase.targetAudience}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Use Cases */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold mb-8">All Solutions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {all.map((useCase) => (
                <Link
                  key={useCase.slug}
                  href={`/for/${useCase.slug}`}
                  className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-lg"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium mb-3">
                    <Sparkles className="h-3 w-3" />
                    {useCase.name}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {useCase.description}
                  </p>

                  <span className="text-sm font-medium text-primary group-hover:underline">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border">
              <div className="text-3xl font-bold mb-2">$9.99</div>
              <div className="text-sm text-muted-foreground">Per design with commercial license</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border">
              <div className="text-3xl font-bold mb-2">Instant</div>
              <div className="text-sm text-muted-foreground">AI generation in seconds</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border">
              <div className="text-3xl font-bold mb-2">Print-Ready</div>
              <div className="text-sm text-muted-foreground">300 DPI PNG + SVG cutline</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to create your first design?
            </h2>
            <p className="text-muted-foreground mb-6">
              No design skills needed. Just describe what you want and let AI do the work.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
