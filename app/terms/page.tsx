import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | DecalForge',
  description: 'Terms of Service for DecalForge - AI-powered sticker generator',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DecalForge ("Service"), you accept and agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our
              Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p>
              DecalForge provides AI-powered sticker design generation services. We generate custom
              designs and provide print-ready files (PNG and SVG) for personal and commercial use,
              subject to the license purchased.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. License Types</h2>

            <h3 className="text-xl font-medium mb-2">Standard License ($9.99)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Personal and commercial use</li>
              <li>Up to 500 physical items</li>
              <li>Print-ready files (300 DPI PNG + SVG cutline)</li>
              <li>Sell physical products featuring the design</li>
              <li>Cannot resell or redistribute the design files</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Extended License ($29.99)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>All Standard License benefits</li>
              <li>Unlimited physical items</li>
              <li>Use in merchandise for resale</li>
              <li>Use in products for sale</li>
              <li>Cannot resell or redistribute the design files</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Exclusive License ($99.99)</h3>
            <ul className="list-disc pl-6">
              <li>All Extended License benefits</li>
              <li>Exclusive ownership of the design</li>
              <li>Design removed from public marketplace</li>
              <li>Full commercial rights</li>
              <li>Can modify and create derivatives</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Prohibited Uses</h2>
            <p>You may not:</p>
            <ul className="list-disc pl-6">
              <li>Resell or redistribute the design files as digital downloads</li>
              <li>Claim authorship of the designs</li>
              <li>Use designs for illegal, defamatory, or harmful purposes</li>
              <li>Generate designs that infringe on trademarks or copyrights</li>
              <li>Create designs depicting illegal activities or hate speech</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. AI-Generated Content</h2>
            <p>
              Designs are generated using artificial intelligence. While we strive for originality,
              AI-generated content may occasionally resemble existing works. Users are responsible
              for ensuring their use complies with applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment and Refunds</h2>
            <p>
              All purchases are processed through Shopify. Payments are final upon successful
              generation and delivery of design files. Refunds are provided in case of:
            </p>
            <ul className="list-disc pl-6">
              <li>Technical errors preventing file download</li>
              <li>Files corrupted or unusable</li>
              <li>Duplicate charges</li>
            </ul>
            <p className="mt-4">
              Refund requests must be submitted within 7 days of purchase. See our{' '}
              <a href="/refund-policy" className="text-primary hover:underline">
                Refund Policy
              </a>{' '}
              for details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p>
              The DecalForge platform, including software, design, and trademarks, is owned by
              DecalForge. Purchased designs are licensed to you under the terms specified in your
              license type.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p>
              DecalForge is provided "as is" without warranties. We are not liable for any
              indirect, incidental, or consequential damages arising from use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the Service
              constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@decalforge.com" className="text-primary hover:underline">
                legal@decalforge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
