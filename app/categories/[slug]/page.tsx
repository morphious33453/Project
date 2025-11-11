import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Tag } from 'lucide-react'
import { prisma, safeDbOperation } from '@/lib/db'
import type { Metadata } from 'next'

// Fallback data
const fallbackCategories = [
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
]

export async function generateStaticParams() {
  const categories = await safeDbOperation(
    async () => await prisma.category.findMany({ select: { slug: true } }),
    fallbackCategories.map((c) => ({ slug: c.slug }))
  )

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await safeDbOperation(
    async () => await prisma.category.findUnique({ where: { slug } }),
    fallbackCategories.find((c) => c.slug === slug)
  )

  if (!category) {
    return { title: 'Category Not Found' }
  }

  const title = `${category.name} | Print-Ready Designs | DecalForge`
  const description = `${category.description} 300 DPI PNG + SVG cutline. Commercial license available.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = await safeDbOperation(
    async () => await prisma.category.findUnique({ where: { slug } }),
    fallbackCategories.find((c) => c.slug === slug)
  )

  if (!category) {
    notFound()
  }

  // Get designs in this category
  const designs = await safeDbOperation(
    async () =>
      await prisma.design.findMany({
        where: {
          status: 'LISTED',
          categories: { has: slug },
          flagged: false,
        },
        take: 24,
        orderBy: { createdAt: 'desc' },
      }),
    []
  )

  // Get related categories
  const relatedCategories = await safeDbOperation(
    async () =>
      await prisma.category.findMany({
        where: {
          slug: { not: slug },
          featured: true,
        },
        take: 6,
        orderBy: { sortOrder: 'asc' },
      }),
    fallbackCategories.filter((c) => c.slug !== slug).slice(0, 6)
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: category.name,
            description: category.description,
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-screen-xl px-4 py-12">
          {/* Breadcrumb */}
          <Link
            href="/categories"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Categories
          </Link>

          {/* Hero */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Tag className="h-4 w-4" />
              Category
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>

            <p className="text-lg text-muted-foreground mb-8">{category.description}</p>

            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
            >
              Generate Design
            </Link>
          </div>

          {/* Designs */}
          {designs.length > 0 ? (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-bold">Designs</h2>
                <p className="text-muted-foreground">{designs.length} designs available</p>
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
          ) : (
            <div className="text-center p-12 rounded-2xl border bg-card mb-16">
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">No designs yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to create a {category.name.toLowerCase()} design
              </p>
              <Link
                href="/generator"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
              >
                Generate Design
              </Link>
            </div>
          )}

          {/* Related Categories */}
          {relatedCategories.length > 0 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-8">More Categories</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCategories.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/categories/${related.slug}`}
                    className="group p-6 rounded-2xl border bg-card transition-all hover:shadow-lg"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium mb-3">
                      <Tag className="h-3 w-3" />
                      Category
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{related.name}</h3>
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
