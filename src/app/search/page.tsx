import { Metadata } from 'next';
import Link from 'next/link';
import { q } from '@/src/lib/db';

export const metadata: Metadata = {
  title: 'Search Businesses - NSO Trust Index',
  description: 'Search for businesses in the Niagara region and view their trust scores.',
};

interface PageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';

  let results: Array<{
    id: string;
    name: string;
    city: string;
    vertical: string;
    website: string | null;
    score: number | null;
  }> = [];

  if (query.length >= 2) {
    results = await q(`
      SELECT
        b.id,
        b.name,
        b.city,
        b.vertical,
        b.website,
        s.score
      FROM businesses b
      LEFT JOIN LATERAL (
        SELECT score
        FROM snapshots
        WHERE business_id = b.id
        ORDER BY taken_at DESC
        LIMIT 1
      ) s ON true
      WHERE LOWER(b.name) LIKE LOWER($1)
      ORDER BY COALESCE(s.score, 0) DESC, b.name ASC
      LIMIT 50
    `, [`%${query}%`]);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Search Businesses</h1>
        <p className="text-gray-600">
          Find businesses in the Niagara region and check their trust scores.
        </p>
      </div>

      {/* Search Form */}
      <form method="GET" action="/search" className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by business name..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {query.length >= 2 ? (
        <div className="bg-white rounded-lg shadow-md">
          {results.length > 0 ? (
            <>
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </h2>
              </div>
              <div className="divide-y">
                {results.map((business) => {
                  const cityName = business.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  const verticalName = business.vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                  return (
                    <div key={business.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link
                            href={`/profile/${business.id}`}
                            className="text-xl font-semibold text-blue-600 hover:underline"
                          >
                            {business.name}
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{cityName}</span>
                            <span>•</span>
                            <span>{verticalName}</span>
                            {business.website && (
                              <>
                                <span>•</span>
                                <a
                                  href={business.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600"
                                >
                                  Website
                                </a>
                              </>
                            )}
                          </div>
                          <div className="mt-3">
                            <Link
                              href={`/${business.city}/${business.vertical}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              View {cityName} {verticalName} Leaderboard →
                            </Link>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          {business.score !== null ? (
                            <>
                              <div className="text-3xl font-bold text-gray-900">{business.score}</div>
                              <div className="text-sm text-gray-500">Trust Score</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-400">No score yet</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try searching with a different business name or check the leaderboards.
              </p>
              <Link
                href="/"
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                Browse leaderboards →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Start searching</h3>
          <p className="text-gray-600 text-sm">
            Enter at least 2 characters to search for businesses by name.
          </p>
        </div>
      )}

      {/* Popular Searches */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/st-catharines/restaurants" className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
            St. Catharines Restaurants
          </Link>
          <Link href="/niagara-falls/restaurants" className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
            Niagara Falls Restaurants
          </Link>
          <Link href="/welland/restaurants" className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
            Welland Restaurants
          </Link>
          <Link href="/st-catharines/auto-repair" className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
            St. Catharines Auto Repair
          </Link>
          <Link href="/st-catharines/plumbers" className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
            St. Catharines Plumbers
          </Link>
          <Link href="/st-catharines/dentists" className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
            St. Catharines Dentists
          </Link>
        </div>
      </div>
    </div>
  );
}
