import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Niagara Region Guides & Insights',
  description: 'Explore in-depth guides about the Niagara region, hidden gems, local culture, and insider tips for residents and visitors.',
}

const blogPosts = [
  {
    slug: 'niagara-hidden-gems',
    title: 'Hidden Gems of the Niagara Region: The Ultimate Insider\'s Guide',
    excerpt: 'A comprehensive deep dive into the escarpment\'s secret beaches, Indigenous engineering marvels, underground tunnels, forgotten vineyards, and the cultural renaissance keeping these stories alive.',
    date: 'December 2025',
    readTime: '45 min read',
    category: 'Travel Guide',
    image: 'https://cdn.shopify.com/s/files/1/0748/9824/3835/files/Niagara_Falls_Sunset_with_Custom_Sticker.png?v=1762838673',
    featured: true,
  },
  // Add more blog posts here as you create them
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const otherPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Niagara Region Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          In-depth guides, local insights, and hidden stories from the Niagara region
        </p>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <div className="bg-card rounded-lg overflow-hidden border shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div
                className="h-64 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              />
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Read Full Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Posts Grid */}
      {otherPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">More Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-card rounded-lg overflow-hidden border shadow hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon */}
      <section className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">More Guides Coming Soon</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're constantly exploring the Niagara region and writing new guides about local businesses,
          seasonal activities, historical deep-dives, and insider tips. Check back regularly for new content!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-background rounded-full text-sm border">
            Wine Country Deep Dive
          </span>
          <span className="px-4 py-2 bg-background rounded-full text-sm border">
            Seasonal Activities Guide
          </span>
          <span className="px-4 py-2 bg-background rounded-full text-sm border">
            Historical Architecture Tour
          </span>
          <span className="px-4 py-2 bg-background rounded-full text-sm border">
            Local Food Scene
          </span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Exploring Niagara?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Whether you're a resident or visitor, find trusted paint services and suppliers throughout the region
        </p>
        <Link
          href="/location/niagara"
          className="inline-block px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
        >
          Browse Niagara Services
        </Link>
      </section>
    </div>
  )
}
