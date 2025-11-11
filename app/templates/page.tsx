import { Layers } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Templates – Sticker Design Templates',
  description: 'Browse our collection of sticker templates and design examples to inspire your next creation.',
}

export default function TemplatesPage() {
  return (
    <div className="container max-w-screen-xl px-4 py-12">
      <div className="text-center mb-12">
        <Layers className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="font-display text-4xl font-bold mb-4">Design Templates</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get inspired by our collection of design templates and examples
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.name} className="p-6 rounded-2xl border bg-card">
            <div className="aspect-square bg-muted rounded-xl mb-4 flex items-center justify-center">
              <Layers className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-muted-foreground mb-4">{template.description}</p>
            <Link
              href={`/generator?prompt=${encodeURIComponent(template.prompt)}`}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Try This Template
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const templates = [
  {
    name: 'Cute Animals',
    description: 'Adorable animal designs perfect for kids and pet lovers',
    prompt: 'Cute smiling cat wearing a party hat, kawaii style, pastel colors, sticker design',
  },
  {
    name: 'Retro Vibes',
    description: 'Vintage-inspired designs with a nostalgic feel',
    prompt: 'Retro sunset with palm trees, 80s aesthetic, vibrant colors, sticker design',
  },
  {
    name: 'Nature & Plants',
    description: 'Beautiful botanical and nature-themed designs',
    prompt: 'Watercolor wildflowers bouquet, delicate and colorful, sticker design',
  },
  {
    name: 'Food & Drinks',
    description: 'Delicious food illustrations for foodies',
    prompt: 'Cute kawaii coffee cup with a happy face, steam rising, sticker design',
  },
  {
    name: 'Motivational Quotes',
    description: 'Inspiring text designs to motivate and uplift',
    prompt: 'Motivational quote "Dream Big" with stars and clouds, modern typography, sticker design',
  },
  {
    name: 'Abstract Art',
    description: 'Modern abstract patterns and shapes',
    prompt: 'Abstract geometric shapes, bold colors, modern art style, sticker design',
  },
]
