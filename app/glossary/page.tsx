import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma, safeDbOperation } from '@/lib/db'
import { BookOpen, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sticker Printing Glossary | DecalForge',
  description:
    'Complete glossary of sticker printing terms, materials, and processes. Learn about die-cut stickers, vinyl, SVG cutlines, DPI, and more.',
  keywords: [
    'sticker printing terms',
    'die cut sticker',
    'vinyl sticker',
    'SVG cutline',
    'printing glossary',
    'sticker terminology',
  ],
}

export default async function GlossaryPage() {
  const terms = await safeDbOperation(
    async () => {
      return await prisma.glossaryTerm.findMany({
        orderBy: { term: 'asc' },
      })
    },
    []
  )

  // Group by category
  const categories = terms.reduce((acc, term) => {
    const category = term.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(term)
    return acc
  }, {} as Record<string, typeof terms>)

  const categoryOrder = ['sticker-types', 'printing-terms', 'file-formats', 'materials', 'finishing']
  const categoryNames: Record<string, string> = {
    'sticker-types': 'Sticker Types',
    'printing-terms': 'Printing Terms',
    'file-formats': 'File Formats',
    materials: 'Materials',
    finishing: 'Finishing',
    Other: 'Other Terms',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-screen-xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sticker Printing Glossary
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to sticker printing terminology, materials, and processes
          </p>
        </div>

        {/* Search hint */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl border bg-card">
          <div className="flex items-start gap-4">
            <Search className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <h3 className="font-semibold mb-2">New to sticker printing?</h3>
              <p className="text-sm text-muted-foreground">
                Browse our comprehensive glossary to learn industry terms and get started with
                professional sticker production. Click any term for detailed explanations.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Terms */}
        {terms.some((t) => t.featured) && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Popular Terms</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {terms
                .filter((t) => t.featured)
                .map((term) => (
                  <Link
                    key={term.id}
                    href={`/glossary/${term.slug}`}
                    className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                  >
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {term.term}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {term.definition}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* All Terms by Category */}
        <div className="space-y-12">
          {categoryOrder.map((categoryKey) => {
            const categoryTerms = categories[categoryKey]
            if (!categoryTerms || categoryTerms.length === 0) return null

            return (
              <div key={categoryKey}>
                <h2 className="font-display text-2xl font-bold mb-6">
                  {categoryNames[categoryKey]}
                </h2>
                <div className="grid gap-4">
                  {categoryTerms.map((term) => (
                    <Link
                      key={term.id}
                      href={`/glossary/${term.slug}`}
                      className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {term.term}
                          </h3>
                          <p className="text-sm text-muted-foreground">{term.definition}</p>
                        </div>
                        <svg
                          className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Other category */}
          {categories.Other && categories.Other.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                {categoryNames.Other}
              </h2>
              <div className="grid gap-4">
                {categories.Other.map((term) => (
                  <Link
                    key={term.id}
                    href={`/glossary/${term.slug}`}
                    className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {term.term}
                        </h3>
                        <p className="text-sm text-muted-foreground">{term.definition}</p>
                      </div>
                      <svg
                        className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-2xl border bg-card">
          <h3 className="font-display text-2xl font-bold mb-4">Ready to create stickers?</h3>
          <p className="text-muted-foreground mb-6">
            Generate professional sticker designs with AI in seconds
          </p>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
          >
            Generate Your First Design
          </Link>
        </div>
      </div>
    </div>
  )
}
