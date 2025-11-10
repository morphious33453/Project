import Link from "next/link";
import { JsonLd } from "./components/JsonLd";
import { q } from "@/src/lib/db";

export default async function HomePage() {
  // Get real stats from database
  const stats = await q<{ count: number }>(`
    SELECT COUNT(*) as count FROM businesses
  `).catch(() => [{ count: 30 }]);

  const businessCount = stats[0]?.count || 30;
  const cities = [
    { slug: 'st-catharines', name: 'St. Catharines' },
    { slug: 'niagara-falls', name: 'Niagara Falls' },
    { slug: 'welland', name: 'Welland' },
  ];

  const verticals = [
    { slug: 'restaurants', name: 'Restaurants', icon: '🍽️' },
    { slug: 'auto-repair', name: 'Auto Repair', icon: '🔧' },
    { slug: 'plumbers', name: 'Plumbers', icon: '🚰' },
    { slug: 'dentists', name: 'Dentists', icon: '🦷' },
  ];

  // JSON-LD for homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NSO Trust Index",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://trust.niagarastandsout.com",
    "description": "Track and improve your business trust score in the Niagara region",
    "publisher": {
      "@type": "Organization",
      "name": "Niagara Stands Out"
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            NSO Trust Index
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and improve your business trust score across the Niagara region.
            Build credibility with verified evidence and transparent rankings.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{businessCount}+</div>
            <div className="text-gray-600">Businesses Tracked</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">Daily</div>
            <div className="text-gray-600">Score Updates</div>
          </div>
        </div>

        {/* Leaderboards Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Explore Leaderboards</h2>

          <div className="space-y-6">
            {cities.map(city => (
              <div key={city.slug} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{city.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {verticals.map(vertical => (
                    <Link
                      key={`${city.slug}-${vertical.slug}`}
                      href={`/${city.slug}/${vertical.slug}`}
                      className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
                    >
                      <span className="text-3xl mb-2">{vertical.icon}</span>
                      <span className="text-sm font-medium text-gray-700 text-center">
                        {vertical.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">1</div>
              <h3 className="font-semibold mb-2">Find Your Business</h3>
              <p className="text-gray-600 text-sm">
                Search for your business in our city and vertical leaderboards.
              </p>
            </div>
            <div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">2</div>
              <h3 className="font-semibold mb-2">Claim Your Profile</h3>
              <p className="text-gray-600 text-sm">
                Verify ownership and choose a plan that fits your needs.
              </p>
            </div>
            <div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">3</div>
              <h3 className="font-semibold mb-2">Improve Your Score</h3>
              <p className="text-gray-600 text-sm">
                Use our tools and resources to boost your trust score over time.
              </p>
            </div>
          </div>
        </div>

        {/* Learn More Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Trust Scores Matter</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              In today's digital world, your online reputation is everything. The NSO Trust Index
              helps you understand how customers see your business across multiple platforms.
            </p>
            <p>
              Our transparent scoring system tracks your presence on Google, Facebook, Yelp, and
              more. Get actionable insights to improve your ranking and stand out from competitors.
            </p>
            <Link
              href="/methodology"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn about our methodology →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-3">Ready to Stand Out?</h2>
          <p className="mb-6 text-blue-100">
            See where your business ranks and discover opportunities to improve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/st-catharines/restaurants"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Leaderboards
            </Link>
            <Link
              href="/methodology"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
