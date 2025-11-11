import { ShoppingBag } from 'lucide-react'

export const metadata = {
  title: 'Shop – DecalForge Products',
  description: 'Browse our selection of physical stickers, print files, and commercial licenses.',
}

export default function ShopPage() {
  return (
    <div className="container max-w-screen-xl px-4 py-12">
      <div className="text-center mb-12">
        <ShoppingBag className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="font-display text-4xl font-bold mb-4">Shop</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our selection of products, licenses, and print-ready files
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="font-display text-xl font-semibold mb-2">Print Files</h3>
          <p className="text-muted-foreground mb-4">
            High-resolution PNG + SVG cutline files ready for printing
          </p>
          <p className="text-2xl font-bold mb-4">$9.99</p>
          <button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Browse Gallery
          </button>
        </div>

        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="font-display text-xl font-semibold mb-2">Commercial License</h3>
          <p className="text-muted-foreground mb-4">
            Use designs for commercial purposes with full rights
          </p>
          <p className="text-2xl font-bold mb-4">$29.99</p>
          <button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Learn More
          </button>
        </div>

        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="font-display text-xl font-semibold mb-2">Exclusive Rights</h3>
          <p className="text-muted-foreground mb-4">
            Own the design exclusively with full commercial rights
          </p>
          <p className="text-2xl font-bold mb-4">$99.99</p>
          <button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}
