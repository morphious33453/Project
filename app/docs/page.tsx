import { BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Documentation – How to Use DecalForge',
  description: 'Learn how to create stunning custom stickers with DecalForge. Complete guide to features and best practices.',
}

export default function DocsPage() {
  return (
    <div className="container max-w-screen-lg px-4 py-12">
      <div className="mb-12">
        <BookOpen className="h-12 w-12 text-primary mb-4" />
        <h1 className="font-display text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about creating professional stickers with DecalForge
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Getting Started</h2>
        <p>
          DecalForge makes it easy to create professional custom stickers using AI. Simply describe your
          design idea, and our AI will generate a print-ready sticker design in seconds.
        </p>

        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Describe Your Design:</strong> Enter a detailed description of your sticker idea in the
            generator.
          </li>
          <li>
            <strong>AI Generation:</strong> Our AI creates a unique design based on your prompt.
          </li>
          <li>
            <strong>Review & Refine:</strong> View the generated design and regenerate if needed.
          </li>
          <li>
            <strong>Download Files:</strong> Purchase and download print-ready files (PNG + SVG cutline).
          </li>
        </ol>

        <h2>File Specifications</h2>
        <ul>
          <li><strong>Resolution:</strong> 300 DPI for crisp, professional prints</li>
          <li><strong>Formats:</strong> PNG (full color) + SVG (cutline path)</li>
          <li><strong>White Halo:</strong> 2-3mm white border for die-cut perfection</li>
          <li><strong>Max Width:</strong> 482.6mm (19 inches) optimized for Roland BN-20</li>
        </ul>

        <h2>Licensing</h2>
        <h3>Standard License ($9.99)</h3>
        <p>Personal use only. Print for yourself, friends, and family.</p>

        <h3>Commercial License ($29.99)</h3>
        <p>Commercial use allowed. Sell prints, use in products, unlimited prints.</p>

        <h3>Exclusive License ($99.99)</h3>
        <p>Exclusive ownership. Design removed from gallery. Full commercial rights.</p>

        <h2>Best Practices</h2>
        <ul>
          <li>Be specific in your prompts for better results</li>
          <li>Mention style preferences (vintage, modern, minimalist, etc.)</li>
          <li>Include color preferences for more control</li>
          <li>Avoid trademarked or copyrighted content</li>
        </ul>

        <h2>Need Help?</h2>
        <p>
          If you have questions or need assistance, please reach out through our support channels.
        </p>
      </div>
    </div>
  )
}
