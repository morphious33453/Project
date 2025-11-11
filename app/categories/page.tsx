import Link from 'next/link'
import { Tag } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sticker Categories | All Types | DecalForge',
  description:
    'Browse sticker designs by category. Die-cut, kiss-cut, circle, square, waterproof, and more. Print-ready with commercial license.',
  openGraph: {
    title: 'Sticker Categories | All Types',
    description: 'Browse by sticker type: die-cut, kiss-cut, circle, square, and more.',
    type: 'website',
  },
}

export default async function CategoriesPage() {
  const categories = await safeDbOperation(
    async () =>
      await prisma.category.findMany({
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      }),
    [
      {
        id: '1',
        slug: 'die-cut',
        name: 'Die-Cut Stickers',
        description: 'Custom shape stickers cut precisely around your design with white border.',
        parentId: null,
        imageUrl: null,
        featured: true,
        sortOrder: 1,
        createdAt: new Date(),
      },
      {
        id: '2',
        slug: 'kiss-cut',
        name: 'Kiss-Cut Stickers',
        description: 'Stickers cut through the top layer only, perfect for sticker sheets.',
        parentId: null,
        imageUrl: null,
        featured: true,
        sortOrder: 2,
        createdAt: new Date(),
      },
      {
        id: '3',
        slug: 'circle',
        name: 'Circle Stickers',
        description: 'Classic round stickers in all sizes.',
        parentId: null,
        imageUrl: null,
        featured: true,
        sortOrder: 3,
        createdAt: new Date(),
      },
      {
        id: '4',
        slug: 'square',
        name: 'Square Stickers',
        description: 'Square-shaped stickers for clean, modern look.',
        parentId: null,
        imageUrl: null,
        featured: true,
        sortOrder: 4,
        createdAt: new Date(),
      },
      {
        id: '5',
        slug: 'waterproof',
        name: 'Waterproof Stickers',
        description: 'Durable vinyl stickers resistant to water and weather.',
        parentId: null,
        imageUrl: null,
        featured: true,
        sortOrder: 7,
        createdAt: new Date(),
      },
    ]
  )

  const featured = categories.filter((c) => c.featured)
  const all = categories

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Sticker Categories',
            description: 'Browse sticker designs by category',
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-screen-xl px-4 py-16">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Tag className="h-4 w-4" />
              Browse by Category
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Find the Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Sticker Style
              </span>
            </h1>

            <p className="text-xl text-muted-foreground">
              From die-cut custom shapes to classic circles - explore all sticker types with print-ready
              files.
            </p>
          </div>

          {/* Featured Categories */}
          {featured.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-3xl font-bold mb-8">Popular Categories</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="group p-8 rounded-3xl border bg-card transition-all hover:shadow-xl"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      <Tag className="h-4 w-4" />
                    </div>

                    <h3 className="font-semibold text-2xl mb-3">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>

                    <span className="text-sm font-medium text-primary group-hover:underline">
                      Browse Designs →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Categories */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-8">All Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {all.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-lg"
                >
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-muted text-xs font-medium mb-3">
                    <Tag className="h-3 w-3" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <h2 className="font-display text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-muted-foreground mb-6">
              Generate a custom design in any style with AI
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
            >
              Generate Custom Design
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
