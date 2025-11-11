import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Gallery – Browse AI-Generated Stickers',
  description: 'Explore thousands of AI-generated custom stickers and decals. Get inspired for your next design project.',
}

export default async function GalleryPage() {
  // Fetch gallery designs
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/gallery?limit=12`, {
    next: { revalidate: 60 },
  }).catch(() => null)

  const data = response?.ok ? await response.json() : { designs: [], pagination: { total: 0 } }
  const designs = data.designs || []

  return (
    <div className="container max-w-screen-xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-4">
          Design Gallery
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore {data.pagination.total} AI-generated sticker designs
        </p>
      </div>

      {designs.length === 0 ? (
        <div className="text-center py-16">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No designs yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to create a design
          </p>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
          >
            Create Your First Design
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {designs.map((design: any) => (
            <Link
              key={design.id}
              href={`/design/${design.slug}`}
              className="group block rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-square bg-muted relative overflow-hidden">
                {design.previewUrl && (
                  <img
                    src={design.previewUrl}
                    alt={design.prompt}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-sm line-clamp-2">{design.prompt}</p>
                {design.tags && design.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {design.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
