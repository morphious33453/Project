import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma, safeDbOperation } from '@/lib/db'
import { ArrowLeft, ExternalLink } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = await safeDbOperation(
    async () => {
      return await prisma.glossaryTerm.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!term) {
    return {
      title: 'Term Not Found | DecalForge',
    }
  }

  return {
    title: term.metaTitle || `${term.term} - Sticker Printing Glossary | DecalForge`,
    description:
      term.metaDescription || term.definition || `Learn about ${term.term} in sticker printing`,
    openGraph: {
      title: term.metaTitle || `${term.term} - Sticker Printing Glossary`,
      description: term.definition,
    },
  }
}

export async function generateStaticParams() {
  const terms = await safeDbOperation(
    async () => {
      return await prisma.glossaryTerm.findMany({
        select: { slug: true },
      })
    },
    []
  )

  return terms.map((term) => ({
    slug: term.slug,
  }))
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const term = await safeDbOperation(
    async () => {
      return await prisma.glossaryTerm.findUnique({
        where: { slug },
      })
    },
    null
  )

  if (!term) {
    notFound()
  }

  // Increment views (fire-and-forget)
  safeDbOperation(
    async () => {
      await prisma.glossaryTerm.update({
        where: { id: term.id },
        data: { views: { increment: 1 } },
      })
    },
    null
  ).catch(() => {})

  // Get related terms
  const relatedTerms = await safeDbOperation(
    async () => {
      if (!term.relatedTerms || term.relatedTerms.length === 0) return []
      return await prisma.glossaryTerm.findMany({
        where: {
          slug: { in: term.relatedTerms },
        },
        take: 6,
      })
    },
    []
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Glossary
        </Link>

        {/* Term header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{term.term}</h1>
          {term.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {term.category.replace(/-/g, ' ')}
            </span>
          )}
        </div>

        {/* Definition */}
        <div className="prose prose-slate max-w-none mb-12">
          <div className="p-6 rounded-2xl border bg-card mb-8">
            <h2 className="text-xl font-semibold mb-3">Definition</h2>
            <p className="text-lg leading-relaxed">{term.definition}</p>
          </div>

          {term.longDescription && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Detailed Explanation</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {term.longDescription}
              </p>
            </div>
          )}
        </div>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Related Terms</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedTerms.map((related) => (
                <Link
                  key={related.id}
                  href={`/glossary/${related.slug}`}
                  className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                    {related.term}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {related.definition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DefinedTerm',
              name: term.term,
              description: term.definition,
              inDefinedTermSet: 'https://decalforge.com/glossary',
            }),
          }}
        />

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">
            Ready to use {term.term.toLowerCase()} in your designs?
          </h3>
          <p className="text-muted-foreground mb-6">
            Create professional sticker files with AI in seconds
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
