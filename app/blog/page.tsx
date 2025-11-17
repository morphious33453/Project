import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Marketing Tips & Guides | Niagara Stands Out',
  description: 'Expert marketing tips, print advertising strategies, and business growth guides for the Golden Horseshoe region.',
}

export default function BlogPage() {
  const posts = [
    {
      slug: 'flyer-distribution-golden-horseshoe',
      title: 'Complete Guide to Flyer Distribution in the Golden Horseshoe',
      excerpt: 'Discover how to maximize your business reach with strategic flyer distribution across Toronto, Hamilton, Niagara, and all major Golden Horseshoe cities. Expert tips for print marketing success.',
      date: 'November 17, 2024',
      category: 'Print Marketing',
      readTime: '12 min read'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Marketing Blog</h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Expert tips and strategies for growing your business in the Golden Horseshoe region
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-card border-b py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <span className="text-muted-foreground">›</span>
            <span className="text-muted-foreground">Blog</span>
          </nav>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-card rounded-lg shadow-sm p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-foreground hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex gap-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Read Article →
                </Link>
                <Link
                  href="/flyer-distribution-golden-horseshoe.html"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
                >
                  View Full HTML Guide →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center p-12 bg-muted rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">More Articles Coming Soon</h3>
          <p className="text-muted-foreground">
            Stay tuned for more expert marketing tips and business growth strategies
          </p>
        </div>
      </div>
    </div>
  )
}
