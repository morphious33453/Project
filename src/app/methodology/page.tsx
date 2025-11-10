import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/src/app/components/JsonLd";

export const metadata: Metadata = {
  title: 'Trust Score Methodology - NSO Trust Index',
  description: 'Learn how we calculate trust scores for businesses in the Niagara region. Transparent, data-driven rankings based on verified evidence.',
};

export default function MethodologyPage() {
  const lastUpdated = '2025-01-10';
  const version = '1.0';

  // JSON-LD: TechArticle for methodology
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "NSO Trust Index Methodology",
    "description": "How we calculate trust scores for businesses",
    "version": version,
    "datePublished": lastUpdated,
    "dateModified": lastUpdated,
    "author": {
      "@type": "Organization",
      "name": "Niagara Stands Out"
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span>Methodology</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Trust Score Methodology</h1>
          <p className="text-gray-600">
            Version {version} • Last Updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* Overview */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3">Overview</h2>
          <p className="text-gray-700 mb-3">
            The NSO Trust Index measures and ranks businesses based on their online presence,
            verified evidence, and community engagement. Scores range from 0-100 and are updated
            daily through automated data collection.
          </p>
          <p className="text-gray-700">
            Our goal is to provide transparent, objective rankings that help consumers find
            trustworthy businesses in the Niagara region.
          </p>
        </div>

        {/* Scoring Components */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Scoring Components</h2>

          <div className="space-y-6">
            {/* Online Presence */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Online Presence (30%)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verified Google Business Profile (15 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Active website with SSL certificate (8 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Social media presence (7 points)</span>
                </li>
              </ul>
            </div>

            {/* Customer Reviews */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Customer Reviews (25%)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Average rating across platforms (12 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Total number of reviews (8 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Response rate to reviews (5 points)</span>
                </li>
              </ul>
            </div>

            {/* Business Information */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Business Information (20%)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Complete and accurate NAP (Name, Address, Phone) (10 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Business hours and service details (6 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Photos and visual content (4 points)</span>
                </li>
              </ul>
            </div>

            {/* Local Citations */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Local Citations (15%)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Listings on local directories (8 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Industry-specific platforms (7 points)</span>
                </li>
              </ul>
            </div>

            {/* Engagement */}
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Engagement & Updates (10%)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Frequency of content updates (5 points)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Customer question responses (5 points)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Data Sources</h2>
          <p className="text-gray-700 mb-4">
            We collect data from multiple verified sources to ensure accuracy:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Google Business Profile and Maps</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Facebook Business Pages</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Yelp and industry-specific review platforms</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Better Business Bureau (BBB)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Local business directories</span>
            </li>
          </ul>
        </div>

        {/* Update Frequency */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Update Frequency</h2>
          <p className="text-gray-700 mb-4">
            Trust scores are updated daily at 3 AM UTC through automated snapshots. This ensures:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Fresh Data:</strong> Rankings reflect the most recent information</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Historical Tracking:</strong> We maintain a full history of score changes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Fair Comparison:</strong> All businesses are evaluated on the same schedule</span>
            </li>
          </ul>
        </div>

        {/* Verification */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Evidence Verification</h2>
          <p className="text-gray-700 mb-4">
            Each score is backed by verifiable evidence. On every business profile, you can:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>See the specific evidence that contributed to the score</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Click through to original sources</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>View the date of each piece of evidence</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Track score changes over time</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I improve my business's score?</h3>
              <p className="text-gray-700">
                Yes! Claim your profile to get insights and recommendations. Focus on responding to
                reviews, keeping information up-to-date, and building your online presence across
                multiple platforms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Is the scoring algorithm public?</h3>
              <p className="text-gray-700">
                Yes, this page documents our methodology. We believe in transparency. The weights
                and criteria are subject to refinement but will always be publicly documented here.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">How do you prevent manipulation?</h3>
              <p className="text-gray-700">
                We only count data from verified external sources (Google, Facebook, BBB, etc.).
                Businesses cannot directly edit their scores. We also monitor for suspicious
                patterns in review activity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What if my business information is wrong?</h3>
              <p className="text-gray-700">
                Claim your profile and contact us. We pull data from public sources, so the best
                way to fix it is to update your information on Google Business Profile and other
                platforms we monitor.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Want to Improve Your Score?</h2>
          <p className="mb-6 text-blue-100">
            Claim your business profile to access detailed insights and actionable recommendations.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Find Your Business
          </Link>
        </div>
      </div>
    </>
  );
}
