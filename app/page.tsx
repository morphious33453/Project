import Link from 'next/link'
import { Sparkles, Zap, Download, Shield, ArrowRight } from 'lucide-react'
import { generateOrganizationJsonLd } from '@/lib/seo'

export const metadata = {
  title: 'AI-Powered Custom Sticker & Decal Maker – Print-Ready Designs',
  description:
    'Create professional custom stickers and decals with AI in seconds. Get print-ready files with white halo cutline, perfect for BN-20 die-cut printing. Commercial licenses available.',
  keywords: [
    'custom sticker maker',
    'ai sticker generator',
    'decal designer online',
    'print ready stickers',
    'die cut stickers',
    'vinyl sticker maker',
    'custom decals',
  ],
}

export default function HomePage() {
  const jsonLd = generateOrganizationJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="container max-w-screen-xl px-4 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-8 glass">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>AI-Powered Design Generation</span>
            </div>

            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Create Stunning
              <span className="block gradient-primary bg-clip-text text-transparent">
                Custom Stickers
              </span>
              in Seconds
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Professional-grade sticker designs powered by AI. Get print-ready
              files with white halo cutline, perfect for die-cut printing.
              Commercial licenses available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/generator"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 btn-magnetic focus-ring w-full sm:w-auto"
              >
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-4 text-base font-medium transition-all hover:bg-accent hover:shadow-lg hover:-translate-y-1 focus-ring w-full sm:w-auto"
              >
                View Gallery
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Commercial License Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <span>Print-Ready Files</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Instant Generation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-30 pointer-events-none">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-secondary" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container max-w-screen-xl px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Everything You Need for
              <span className="block mt-2">Professional Stickers</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From concept to print-ready files in minutes
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="container max-w-screen-xl px-4">
          <div className="mx-auto max-w-2xl text-center glass-strong rounded-3xl p-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">
              Ready to Create Amazing Stickers?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators making professional stickers with AI
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 btn-magnetic focus-ring"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description:
      'Describe your sticker idea and watch AI bring it to life with stunning, professional results.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description:
      'Generate high-quality sticker designs in seconds, not hours. Perfect for rapid prototyping.',
  },
  {
    icon: Download,
    title: 'Print-Ready Files',
    description:
      '300 DPI PNG + SVG cutline with white halo. Optimized for BN-20 die-cut printing.',
  },
  {
    icon: Shield,
    title: 'Commercial License',
    description:
      'Use your designs commercially with our flexible licensing options. Standard, Extended, and Exclusive.',
  },
  {
    icon: Sparkles,
    title: 'Multiple Formats',
    description:
      'Stickers with white halo, Eyes-Strip masks, and custom shapes. Perfect for any project.',
  },
  {
    icon: Zap,
    title: 'BN-20 Optimized',
    description:
      'Designs automatically sized to 19" max width with proper cutlines for Roland BN-20.',
  },
]
