import { Check } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing – Flexible Plans for Every Need',
  description: 'Choose the perfect plan for your sticker design needs. From free previews to exclusive commercial rights.',
}

export default function PricingPage() {
  return (
    <div className="container max-w-screen-xl px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. All plans include AI generation and watermarked previews.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-2xl border ${
              plan.featured ? 'border-primary bg-primary/5 shadow-lg' : 'bg-card'
            }`}
          >
            {plan.featured && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-4">
                Most Popular
              </span>
            )}
            <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-muted-foreground mb-6">{plan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">${plan.price}</span>
              {plan.price > 0 && <span className="text-muted-foreground">/design</span>}
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/generator"
              className={`block w-full text-center rounded-full px-6 py-3 font-medium transition-colors ${
                plan.featured
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-border hover:bg-accent'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const plans = [
  {
    name: 'Free',
    description: 'Perfect for trying out the platform',
    price: 0,
    featured: false,
    cta: 'Start Creating',
    features: [
      'AI-powered generation',
      'Watermarked previews',
      'Browse gallery',
      'Unlimited generations',
    ],
  },
  {
    name: 'Standard',
    description: 'For personal and small projects',
    price: 9.99,
    featured: true,
    cta: 'Get Started',
    features: [
      'Everything in Free',
      'Print-ready PNG files',
      'SVG cutline files',
      '300 DPI resolution',
      'White halo cutline',
      'Personal use license',
    ],
  },
  {
    name: 'Commercial',
    description: 'For businesses and professionals',
    price: 29.99,
    featured: false,
    cta: 'Go Commercial',
    features: [
      'Everything in Standard',
      'Commercial use license',
      'Unlimited prints',
      'Resale rights',
      'Priority support',
      'Lifetime access',
    ],
  },
]
