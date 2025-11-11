import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the NSO Trust Index platform.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
        <p className="text-gray-700">
          At NSO Trust Index, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">1.1 Information You Provide</h3>
        <p className="text-gray-700">
          When you create an account or claim a business, we collect:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Name and email address</li>
          <li>Business information (name, address, contact details)</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Communications with us</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">1.2 Publicly Available Information</h3>
        <p className="text-gray-700">
          We collect publicly available information about businesses from sources such as:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Google Business Profile</li>
          <li>Social media platforms (Facebook, Instagram, etc.)</li>
          <li>Review sites (Yelp, TripAdvisor, etc.)</li>
          <li>Business directories and listing sites</li>
          <li>Official business registries</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">1.3 Automatically Collected Information</h3>
        <p className="text-gray-700">
          When you visit our website, we automatically collect:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
          <li>Usage patterns and preferences</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-700">
          We use the collected information to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Provide and maintain the NSO Trust Index service</li>
          <li>Calculate and display trust scores for businesses</li>
          <li>Process subscription payments and manage accounts</li>
          <li>Send you updates, newsletters, and marketing materials (with your consent)</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Improve our services and develop new features</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Share Your Information</h2>
        <p className="text-gray-700">
          We may share your information with:
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Service Providers</h3>
        <p className="text-gray-700">
          We work with third-party service providers who help us operate our platform:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Payment processors (Stripe)</li>
          <li>Hosting and infrastructure providers (Vercel, Neon)</li>
          <li>Analytics providers</li>
          <li>Email service providers</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Public Information</h3>
        <p className="text-gray-700">
          Trust scores and business information derived from public sources are displayed publicly on our platform. This information is intended to be publicly accessible.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3.3 Legal Requirements</h3>
        <p className="text-gray-700">
          We may disclose your information if required by law or in response to valid requests from public authorities.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookies and Tracking</h2>
        <p className="text-gray-700">
          We use cookies and similar tracking technologies to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Maintain your session when you log in</li>
          <li>Remember your preferences</li>
          <li>Analyze how you use our website</li>
          <li>Provide personalized content and advertising</li>
        </ul>
        <p className="text-gray-700">
          You can control cookies through your browser settings, but disabling cookies may affect functionality.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
        <p className="text-gray-700">
          We implement appropriate technical and organizational measures to protect your information, including:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Encryption of data in transit and at rest</li>
          <li>Secure payment processing through PCI-compliant providers</li>
          <li>Regular security assessments</li>
          <li>Access controls and authentication</li>
        </ul>
        <p className="text-gray-700">
          However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights and Choices</h2>
        <p className="text-gray-700">
          Depending on your location, you may have certain rights regarding your personal information:
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">6.1 Access and Correction</h3>
        <p className="text-gray-700">
          You can access and update your account information through your dashboard or by contacting us.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">6.2 Deletion</h3>
        <p className="text-gray-700">
          You can request deletion of your account and personal information. Note that publicly sourced business information may remain on the platform.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">6.3 Marketing Communications</h3>
        <p className="text-gray-700">
          You can opt out of marketing emails by clicking the unsubscribe link in any email or updating your preferences.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">6.4 Do Not Track</h3>
        <p className="text-gray-700">
          We currently do not respond to Do Not Track signals, but you can control tracking through your browser settings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Retention</h2>
        <p className="text-gray-700">
          We retain your personal information for as long as necessary to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Provide our services</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes</li>
          <li>Enforce our agreements</li>
        </ul>
        <p className="text-gray-700">
          When information is no longer needed, we securely delete or anonymize it.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Children&apos;s Privacy</h2>
        <p className="text-gray-700">
          Our Service is not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. International Data Transfers</h2>
        <p className="text-gray-700">
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place for such transfers.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. We will notify you of material changes by posting a notice on our website or sending you an email. Your continued use of the Service after changes constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:privacy@niagarastandsout.com" className="text-blue-600 hover:underline">privacy@niagarastandsout.com</a><br />
          Website: <a href="https://niagarastandsout.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">niagarastandsout.ca</a>
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">12. GDPR Compliance (For EU Residents)</h2>
        <p className="text-gray-700">
          If you are a resident of the European Union, you have additional rights under GDPR:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Right to access your personal data</li>
          <li>Right to rectification of inaccurate data</li>
          <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
          <li>Right to restrict processing</li>
          <li>Right to data portability</li>
          <li>Right to object to processing</li>
          <li>Right to withdraw consent</li>
        </ul>
        <p className="text-gray-700">
          To exercise these rights, please contact us using the information above.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">13. CCPA Compliance (For California Residents)</h2>
        <p className="text-gray-700">
          If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Right to know what personal information we collect</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
          <li>Right to non-discrimination for exercising your rights</li>
        </ul>
        <p className="text-gray-700">
          To submit a request, contact us at privacy@niagarastandsout.com.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/terms"
          className="inline-block bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Terms of Service
        </Link>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
