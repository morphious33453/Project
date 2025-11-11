import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the NSO Trust Index platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Terms of Service</h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
        <p className="text-gray-700">
          Welcome to the NSO Trust Index. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By accessing and using the NSO Trust Index platform (&quot;Service&quot;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
        <p className="text-gray-700">
          NSO Trust Index provides a platform for tracking and ranking businesses based on publicly available data about their online reputation. We collect, analyze, and present information from various public sources to calculate trust scores.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Account Creation</h3>
        <p className="text-gray-700">
          Business owners may claim their business profiles by creating an account. You must provide accurate, current, and complete information during registration.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Account Security</h3>
        <p className="text-gray-700">
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Use of Data</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Public Data</h3>
        <p className="text-gray-700">
          Our Service collects and displays information from publicly available sources. We do not guarantee the accuracy, completeness, or timeliness of this information.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Trust Scores</h3>
        <p className="text-gray-700">
          Trust scores are calculated using our proprietary methodology based on multiple factors. Scores are provided for informational purposes only and should not be the sole basis for business decisions.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Subscriptions and Payments</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">5.1 Subscription Plans</h3>
        <p className="text-gray-700">
          We offer various subscription plans with different features and pricing. By subscribing, you agree to pay the applicable fees for the plan you select.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">5.2 Billing</h3>
        <p className="text-gray-700">
          Monthly subscriptions are billed on a recurring basis. Payment will be charged to your chosen payment method at the start of each billing cycle.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">5.3 Cancellation</h3>
        <p className="text-gray-700">
          You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. No refunds will be provided for partial subscription periods.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Acceptable Use</h2>
        <p className="text-gray-700">
          You agree not to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Use the Service for any illegal purpose</li>
          <li>Attempt to manipulate or artificially inflate trust scores</li>
          <li>Scrape, copy, or download data from the Service using automated means</li>
          <li>Impersonate another person or business</li>
          <li>Interfere with the proper functioning of the Service</li>
          <li>Submit false or misleading information</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Content and Intellectual Property</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">7.1 Our Content</h3>
        <p className="text-gray-700">
          All content on the NSO Trust Index platform, including text, graphics, logos, and software, is the property of Niagara Stands Out or its licensors and is protected by copyright and trademark laws.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">7.2 User Content</h3>
        <p className="text-gray-700">
          By submitting content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, modify, and display that content in connection with operating the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimers</h2>
        <p className="text-gray-700">
          THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
        </p>
        <p className="text-gray-700">
          We make no representations about the accuracy or reliability of any information, content, or materials provided through the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
        <p className="text-gray-700">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NIAGARA STANDS OUT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Dispute Resolution</h2>
        <p className="text-gray-700">
          If you have a dispute with us, you agree to first contact us at support@niagarastandsout.com and attempt to resolve the dispute informally.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>
        <p className="text-gray-700">
          We reserve the right to modify these Terms at any time. We will notify users of material changes by posting a notice on our website. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">12. Termination</h2>
        <p className="text-gray-700">
          We may terminate or suspend your account and access to the Service at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">13. Governing Law</h2>
        <p className="text-gray-700">
          These Terms shall be governed by and construed in accordance with the laws of Ontario, Canada, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">14. Contact Information</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms, please contact us:
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:support@niagarastandsout.com" className="text-blue-600 hover:underline">support@niagarastandsout.com</a><br />
          Website: <a href="https://niagarastandsout.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">niagarastandsout.ca</a>
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/privacy"
          className="inline-block bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Privacy Policy
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
