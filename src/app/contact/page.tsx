import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the NSO Trust Index team. We are here to help with questions, support, and feedback.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Contact Us</h1>
        <p className="text-gray-600">
          Get in touch with our team—we&apos;re here to help
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Email</h3>
          <a href="mailto:support@niagarastandsout.com" className="text-blue-600 hover:underline text-sm">
            support@niagarastandsout.com
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Website</h3>
          <a
            href="https://niagarastandsout.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            niagarastandsout.ca
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Support</h3>
          <Link href="/faq" className="text-blue-600 hover:underline text-sm">
            Visit our FAQ
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name (Optional)
            </label>
            <input
              type="text"
              id="business"
              name="business"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Business Name"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a subject...</option>
              <option value="claim">Claim My Business</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="data">Data Correction</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us how we can help..."
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              className="mt-1 mr-3"
            />
            <label htmlFor="subscribe" className="text-sm text-gray-600">
              I&apos;d like to receive updates about the NSO Trust Index and Niagara Stands Out products
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>

          <p className="text-sm text-gray-500 text-center">
            We typically respond within 1-2 business days
          </p>
        </form>
      </div>

      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Common Inquiries</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Business Owners</h3>
            <p className="text-gray-700 text-sm mb-2">
              Want to claim your business? Visit your business profile and click &quot;Claim&quot; to get started immediately.
            </p>
            <Link href="/search" className="text-blue-600 hover:underline text-sm">
              Search for your business →
            </Link>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Data Corrections</h3>
            <p className="text-gray-700 text-sm mb-2">
              If you notice incorrect information, please include the business name and specific details that need correction.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">General Questions</h3>
            <p className="text-gray-700 text-sm mb-2">
              Check our FAQ page first—you might find your answer there!
            </p>
            <Link href="/faq" className="text-blue-600 hover:underline text-sm">
              View FAQ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
