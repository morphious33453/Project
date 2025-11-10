import { Metadata } from "next";
import Link from "next/link";
import { q } from "@/src/lib/db";

export const metadata: Metadata = {
  title: 'Dashboard - NSO Trust Index',
  description: 'Manage your business trust profile and track your performance.',
};

export default async function DashboardPage() {
  // Get a sample business to show real data (first claimed business or any business)
  const sampleBusiness = await q<{
    id: string;
    name: string;
    city: string;
    vertical: string;
    website: string | null;
  }>(`
    SELECT id, name, city, vertical, website
    FROM businesses
    ORDER BY name ASC
    LIMIT 1
  `).then(rows => rows[0]).catch(() => null);

  if (!sampleBusiness) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h2 className="font-semibold text-yellow-900 mb-2">No Data Available</h2>
          <p className="text-yellow-800 text-sm">
            No businesses found in the database. Please seed the database first.
          </p>
        </div>
      </div>
    );
  }

  // Get latest and previous scores
  const scores = await q<{
    score: number;
    taken_at: string;
  }>(`
    SELECT score, taken_at
    FROM snapshots
    WHERE business_id = $1
    ORDER BY taken_at DESC
    LIMIT 2
  `, [sampleBusiness.id]);

  const currentScore = scores[0]?.score || 0;
  const previousScore = scores[1]?.score || currentScore;
  const scoreDelta = currentScore - previousScore;

  // Get rank in city/vertical
  const rankData = await q<{
    rank: number;
    total: number;
  }>(`
    WITH ranked AS (
      SELECT
        b.id,
        ROW_NUMBER() OVER (ORDER BY COALESCE(s.score, 0) DESC, b.name ASC) as rank
      FROM businesses b
      LEFT JOIN LATERAL (
        SELECT score
        FROM snapshots
        WHERE business_id = b.id
        ORDER BY taken_at DESC
        LIMIT 1
      ) s ON true
      WHERE b.city = $1 AND b.vertical = $2
    )
    SELECT
      r.rank::int,
      (SELECT COUNT(*)::int FROM businesses WHERE city = $1 AND vertical = $2) as total
    FROM ranked r
    WHERE r.id = $3
  `, [sampleBusiness.city, sampleBusiness.vertical, sampleBusiness.id]);

  const rank = rankData[0]?.rank || 1;
  const totalBusinesses = rankData[0]?.total || 1;

  // Get top 3 competitors
  const competitors = await q<{
    name: string;
    score: number | null;
  }>(`
    SELECT
      b.name,
      s.score
    FROM businesses b
    LEFT JOIN LATERAL (
      SELECT score
      FROM snapshots
      WHERE business_id = b.id
      ORDER BY taken_at DESC
      LIMIT 1
    ) s ON true
    WHERE b.city = $1 AND b.vertical = $2 AND b.id != $3
    ORDER BY COALESCE(s.score, 0) DESC
    LIMIT 3
  `, [sampleBusiness.city, sampleBusiness.vertical, sampleBusiness.id]);

  // Get recent evidence for recommendations
  const recentEvidence = await q<{
    evidence: any;
    taken_at: string;
  }>(`
    SELECT evidence, taken_at
    FROM snapshots
    WHERE business_id = $1
    ORDER BY taken_at DESC
    LIMIT 1
  `, [sampleBusiness.id]).then(rows => rows[0]).catch(() => null);

  const evidenceItems = recentEvidence?.evidence || [];

  // Calculate recommended actions based on data
  const recommendations = [];

  if (evidenceItems.length < 5) {
    recommendations.push({
      title: 'Build more online presence',
      description: `You have ${evidenceItems.length} evidence items. Top performers have 10+. Add your business to more platforms.`,
      impact: '+8 points',
    });
  }

  if (currentScore < 80) {
    recommendations.push({
      title: 'Respond to customer reviews',
      description: 'Engaging with reviews shows you care and can boost your score significantly.',
      impact: '+5 points',
    });
  }

  if (!sampleBusiness.website) {
    recommendations.push({
      title: 'Add a website to your profile',
      description: 'Businesses with websites rank 20% higher. Create or link your website.',
      impact: '+10 points',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain your excellent score',
      description: 'Keep updating your listings and engaging with customers to stay on top.',
      impact: '+2 points',
    });
  }

  // Get recent activity (snapshots)
  const recentActivity = await q<{
    score: number;
    taken_at: string;
  }>(`
    SELECT score, taken_at
    FROM snapshots
    WHERE business_id = $1
    ORDER BY taken_at DESC
    LIMIT 5
  `, [sampleBusiness.id]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Track your trust score, monitor competitors, and access tools to improve your ranking.
        </p>
      </div>

      {/* Auth Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h2 className="font-semibold text-blue-900 mb-2">Preview Dashboard</h2>
        <p className="text-blue-800 text-sm mb-2">
          You're viewing a preview dashboard with real data from <strong>{sampleBusiness.name}</strong>.
          Full authentication and personalized data will be available after claiming your business profile.
        </p>
        <Link
          href={`/profile/${sampleBusiness.id}`}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View {sampleBusiness.name}'s profile →
        </Link>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-500 mb-2">Current Trust Score</div>
          <div className="flex items-baseline">
            <div className="text-4xl font-bold text-blue-600">{currentScore}</div>
            <div className="text-lg text-gray-400 ml-2">/100</div>
          </div>
          {scoreDelta !== 0 && (
            <div className={`mt-2 text-sm flex items-center ${scoreDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                {scoreDelta > 0 ? (
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                )}
              </svg>
              {scoreDelta > 0 ? '+' : ''}{scoreDelta} from last snapshot
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-500 mb-2">Current Ranking</div>
          <div className="flex items-baseline">
            <div className="text-4xl font-bold text-gray-900">#{rank}</div>
            <div className="text-lg text-gray-400 ml-2">of {totalBusinesses}</div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {sampleBusiness.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} {sampleBusiness.vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-500 mb-2">Evidence Items</div>
          <div className="text-4xl font-bold text-gray-900">{evidenceItems.length}</div>
          <div className="mt-2 text-sm text-gray-600">
            Citations tracked
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Recommended Actions</h2>
        <p className="text-gray-600 mb-6">
          Complete these actions to improve your trust score:
        </p>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
                {idx + 1}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold mb-1">{rec.title}</h3>
                <p className="text-sm text-gray-600">{rec.description}</p>
                <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Potential impact: {rec.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitors */}
      {competitors.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Top Competitors</h2>
          <p className="text-gray-600 mb-6">
            Monitor how you compare to other top performers in your area:
          </p>
          <div className="space-y-3">
            {competitors.map((competitor, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{competitor.name}</div>
                  <div className="text-sm text-gray-500">
                    {sampleBusiness.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{competitor.score || 0}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marketing Tools */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Marketing Tools to Stand Out</h2>
        <p className="text-blue-100 mb-6">
          Amplify your online presence with professional marketing materials:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://niagarastandsout.ca/collections/custom-labels-canada?utm_source=trust&utm_medium=dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold mb-2">Custom Labels & Stickers</h3>
            <p className="text-sm text-blue-100 mb-3">
              Professional labels for products, packaging, and branding
            </p>
            <div className="text-sm font-medium">Shop Now →</div>
          </a>

          <a
            href="https://niagarastandsout.ca/collections/asset-tags?utm_source=trust&utm_medium=dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold mb-2">Asset Tags</h3>
            <p className="text-sm text-blue-100 mb-3">
              Durable tags for equipment, inventory, and asset tracking
            </p>
            <div className="text-sm font-medium">Shop Now →</div>
          </a>

          <a
            href="https://niagarastandsout.ca/products/complete-bathroom-marketing-kit?utm_source=trust&utm_medium=dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold mb-2">Bathroom Marketing Kit</h3>
            <p className="text-sm text-blue-100 mb-3">
              Complete DIY kit with QR codes and review prompts
            </p>
            <div className="text-sm font-medium">Shop Now →</div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => {
              const timeAgo = Math.floor((Date.now() - new Date(activity.taken_at).getTime()) / (1000 * 60 * 60 * 24));
              const timeLabel = timeAgo === 0 ? 'Today' : timeAgo === 1 ? '1 day ago' : `${timeAgo} days ago`;

              return (
                <div key={idx} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">{timeLabel}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-900">Score snapshot: {activity.score}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
