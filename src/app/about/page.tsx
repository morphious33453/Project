import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the NSO Trust Index and our mission to help Niagara businesses build trust and improve their online reputation.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">About NSO Trust Index</h1>
        <p className="text-xl text-gray-600">
          Building trust and transparency for Niagara businesses
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            The NSO Trust Index was created to help businesses in the Niagara region understand and improve their online reputation. In today&apos;s digital-first world, your online presence is often the first impression potential customers have of your business.
          </p>
          <p className="text-gray-700">
            We believe that transparency and verified evidence are the foundations of trust. Our platform aggregates data from multiple sources to provide an objective, comprehensive view of how businesses are perceived online.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Track Trust Scores</h3>
              <p className="text-gray-700 text-sm">
                We automatically collect and analyze data from Google Business Profile, social media, review sites, and other online sources to calculate a comprehensive trust score.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Provide Transparency</h3>
              <p className="text-gray-700 text-sm">
                Every score is backed by verifiable evidence. We cite our sources and show the data behind each business&apos;s ranking.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Offer Insights</h3>
              <p className="text-gray-700 text-sm">
                Business owners get actionable recommendations on how to improve their scores and build stronger online reputations.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Build Community</h3>
              <p className="text-gray-700 text-sm">
                We help consumers discover trustworthy local businesses and support the Niagara business community.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Approach</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Objective Data Collection</h3>
                <p className="text-gray-700 text-sm">
                  We use automated systems to collect data from public sources, ensuring consistency and eliminating bias.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Transparent Scoring</h3>
                <p className="text-gray-700 text-sm">
                  Our methodology is fully documented and available for review. We believe you should understand exactly how scores are calculated.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Regular Updates</h3>
                <p className="text-gray-700 text-sm">
                  Scores are updated daily to reflect the latest changes in your online presence.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Actionable Insights</h3>
                <p className="text-gray-700 text-sm">
                  We don&apos;t just tell you your score—we show you exactly what to do to improve it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Part of Niagara Stands Out</h2>
          <p className="text-blue-100 mb-4">
            The NSO Trust Index is a proud initiative of Niagara Stands Out, a company dedicated to helping local businesses succeed through innovative marketing tools and services.
          </p>
          <p className="text-blue-100 mb-6">
            From custom labels and asset tags to complete marketing kits, we provide the physical and digital tools businesses need to stand out in their communities.
          </p>
          <a
            href="https://niagarastandsout.ca?utm_source=trust&utm_medium=about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Visit Niagara Stands Out →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Get Started</h2>
          <p className="text-gray-700 mb-6">
            Ready to take control of your online reputation? Start by finding your business in our directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Search for Your Business
            </Link>
            <Link
              href="/methodology"
              className="inline-block bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
