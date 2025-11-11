import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { q } from "@/src/lib/db";
import { JsonLd } from "@/src/app/components/JsonLd";

interface PageProps {
  params: {
    city: string;
    month: string; // Format: YYYY-MM
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityName = params.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const [year, month] = params.month.split('-');
  const monthName = new Date(`${year}-${month}-01`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return {
    title: `${cityName} Restaurant Trust Index - ${monthName}`,
    description: `Monthly report for ${cityName} restaurants. Top performers, risers, and trust score insights for ${monthName}.`,
  };
}

export default async function MonthlyReportPage({ params }: PageProps) {
  const { city, month } = params;

  // Validate month format
  if (!/^\d{4}-\d{2}$/.test(month)) {
    notFound();
  }

  const [year, monthNum] = month.split('-');
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const monthName = new Date(`${year}-${monthNum}-01`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Get current leaderboard with latest scores
  const leaderboard = await q<{
    id: string;
    name: string;
    website: string | null;
    score: number | null;
    last_updated: string | null;
  }>(`
    SELECT
      b.id,
      b.name,
      b.website,
      s.score,
      s.taken_at as last_updated
    FROM businesses b
    LEFT JOIN LATERAL (
      SELECT score, taken_at
      FROM snapshots
      WHERE business_id = b.id
      ORDER BY taken_at DESC
      LIMIT 1
    ) s ON true
    WHERE b.city = $1 AND b.vertical = 'restaurants'
    ORDER BY COALESCE(s.score, 0) DESC, b.name ASC
    LIMIT 25
  `, [city]).catch(() => []);

  if (leaderboard.length === 0) {
    notFound();
  }

  // Get previous scores for delta calculation
  const previousScores = await q<{
    business_id: string;
    score: number;
  }>(`
    SELECT DISTINCT ON (business_id)
      business_id,
      score
    FROM snapshots
    WHERE business_id = ANY($1)
      AND taken_at < NOW() - INTERVAL '7 days'
    ORDER BY business_id, taken_at DESC
  `, [leaderboard.map(b => b.id)]).catch(() => []);

  const previousScoreMap = new Map(
    previousScores.map(s => [s.business_id, s.score])
  );

  // Calculate deltas
  const rankedBusinesses = leaderboard.map((business, idx) => {
    const currentScore = business.score || 0;
    const previousScore = previousScoreMap.get(business.id) || currentScore;
    const delta = currentScore - previousScore;

    return {
      rank: idx + 1,
      ...business,
      delta,
    };
  });

  // Find risers and fallers
  const risers = rankedBusinesses
    .filter(b => b.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 5);

  const fallers = rankedBusinesses
    .filter(b => b.delta < 0)
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 3);

  // Get sample evidence for insights
  const sampleEvidence = await q<{
    url: string;
    title: string;
    date: string;
  }>(`
    SELECT
      jsonb_array_elements(evidence)->>'url' as url,
      jsonb_array_elements(evidence)->>'title' as title,
      jsonb_array_elements(evidence)->>'date' as date
    FROM snapshots
    WHERE business_id = ANY($1)
    ORDER BY taken_at DESC
    LIMIT 3
  `, [leaderboard.slice(0, 5).map(b => b.id)]).catch(() => []);

  // JSON-LD for Dataset
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${cityName} Restaurant Trust Index - ${monthName}`,
    "description": `Monthly trust score rankings for restaurants in ${cityName}`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/reports/${city}/${month}`,
    "temporalCoverage": `${year}-${monthNum}`,
    "spatialCoverage": {
      "@type": "Place",
      "name": cityName
    },
    "creator": {
      "@type": "Organization",
      "name": "Niagara Stands Out"
    }
  };

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${cityName} Restaurant Trust Index - ${monthName}`,
    "datePublished": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "NSO Trust Index"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Niagara Stands Out"
    }
  };

  return (
    <>
      <JsonLd data={datasetJsonLd} />
      <JsonLd data={articleJsonLd} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${city}/restaurants`} className="hover:text-blue-600">{cityName} Restaurants</Link>
            <span className="mx-2">/</span>
            <span>Monthly Report</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            {cityName} Restaurant Trust Index
          </h1>
          <p className="text-xl text-gray-600">
            {monthName} • Top {rankedBusinesses.length} Restaurants
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-500 mb-2">Average Score</div>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(rankedBusinesses.reduce((sum, b) => sum + (b.score || 0), 0) / rankedBusinesses.length)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-500 mb-2">Biggest Riser</div>
            <div className="text-lg font-bold text-green-600">
              {risers[0] ? `+${risers[0].delta} pts` : 'N/A'}
            </div>
            {risers[0] && <div className="text-sm text-gray-600 mt-1">{risers[0].name}</div>}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-500 mb-2">Total Tracked</div>
            <div className="text-3xl font-bold text-gray-900">{rankedBusinesses.length}</div>
          </div>
        </div>

        {/* Top 10 Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Top 25 Rankings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rankedBusinesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-bold ${
                        business.rank === 1 ? 'text-yellow-600' :
                        business.rank === 2 ? 'text-gray-400' :
                        business.rank === 3 ? 'text-orange-600' :
                        'text-gray-600'
                      }`}>
                        #{business.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/profile/${business.id}`} className="font-medium text-blue-600 hover:underline">
                        {business.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-2xl font-bold text-gray-900">{business.score || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {business.delta !== 0 ? (
                        <span className={`font-semibold ${business.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {business.delta > 0 ? '+' : ''}{business.delta}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risers & Fallers */}
        {(risers.length > 0 || fallers.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {risers.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">📈 Top Risers</h3>
                <ul className="space-y-2">
                  {risers.map((business) => (
                    <li key={business.id} className="flex justify-between items-center">
                      <span className="font-medium">{business.name}</span>
                      <span className="text-green-600 font-bold">+{business.delta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {fallers.length > 0 && (
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4">📉 Declining</h3>
                <ul className="space-y-2">
                  {fallers.map((business) => (
                    <li key={business.id} className="flex justify-between items-center">
                      <span className="font-medium">{business.name}</span>
                      <span className="text-red-600 font-bold">{business.delta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Insights */}
        {sampleEvidence.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Insights</h2>
            <ul className="space-y-3">
              {sampleEvidence.map((evidence, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    <a href={evidence.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {evidence.title}
                    </a>
                    {evidence.date && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({new Date(evidence.date).toLocaleDateString()})
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Methodology Link */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold mb-2">How We Score</h3>
          <p className="text-gray-700 text-sm mb-3">
            Trust scores are calculated based on verified online presence, customer reviews,
            business information accuracy, and engagement across multiple platforms.
          </p>
          <Link href="/methodology" className="text-blue-600 hover:underline font-medium">
            Read full methodology →
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Is Your Business Listed?</h2>
          <p className="mb-6 text-blue-100">
            Claim your profile to track your score and get weekly improvement recommendations.
          </p>
          <Link
            href={`/${city}/restaurants`}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            View Full Leaderboard
          </Link>
        </div>
      </div>
    </>
  );
}
