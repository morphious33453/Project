import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { q } from "@/src/lib/db";
import { JsonLd } from "@/src/app/components/JsonLd";

interface PageProps {
  params: {
    city: string;
    vertical: string;
  };
}

interface LeaderboardRow {
  id: string;
  name: string;
  city: string;
  vertical: string;
  website: string | null;
  score: number | null;
  last_updated: string | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityName = params.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const verticalName = params.vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    title: `${cityName} ${verticalName} Trust Leaderboard`,
    description: `Top-ranked ${verticalName.toLowerCase()} in ${cityName} by trust score. See verified evidence and claim your business.`,
  };
}

export default async function LeaderboardPage({ params }: PageProps) {
  const { city, vertical } = params;

  // Fetch businesses with latest scores
  const businesses = await q<LeaderboardRow>(`
    SELECT
      b.id,
      b.name,
      b.city,
      b.vertical,
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
    WHERE b.city = $1 AND b.vertical = $2
    ORDER BY COALESCE(s.score, 0) DESC, b.name ASC
  `, [city, vertical]);

  if (businesses.length === 0) {
    notFound();
  }

  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const verticalName = vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // JSON-LD: ItemList for leaderboard
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${cityName} ${verticalName} Trust Leaderboard`,
    "description": `Top-ranked ${verticalName.toLowerCase()} in ${cityName} by trust score`,
    "numberOfItems": businesses.length,
    "itemListElement": businesses.slice(0, 10).map((business, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": business.name,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || ''}/profile/${business.id}`
      }
    }))
  };

  // JSON-LD: FAQPage for scoring explanation
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is the trust score calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The trust score is calculated based on multiple factors including online reviews, verified business information, social media presence, customer engagement, and business listing completeness across various platforms."
        }
      },
      {
        "@type": "Question",
        "name": "How often are scores updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trust scores are updated daily through automated snapshots that collect the latest data from various online sources."
        }
      },
      {
        "@type": "Question",
        "name": "Can I improve my trust score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can improve your score by claiming your business profile, responding to reviews, maintaining accurate business information, and using our recommended tools and resources."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span>{cityName}</span>
            <span className="mx-2">/</span>
            <span>{verticalName}</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3 text-gray-900">
                {cityName} {verticalName}
              </h1>
              <p className="text-gray-600">
                Trust leaderboard showing {businesses.length} businesses ranked by verified evidence and online presence.
              </p>
            </div>
            <a
              href={`/api/export/leaderboard/${city}/${vertical}`}
              download
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              Download CSV
            </a>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {businesses.map((business, idx) => (
                  <tr key={business.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`font-bold text-lg ${
                          idx === 0 ? 'text-yellow-600' :
                          idx === 1 ? 'text-gray-400' :
                          idx === 2 ? 'text-orange-600' :
                          'text-gray-600'
                        }`}>
                          #{idx + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <Link
                          href={`/profile/${business.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {business.name}
                        </Link>
                        {business.website && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            {business.website}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {business.score !== null ? (
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-gray-900">{business.score}</div>
                          <div className="ml-2 text-sm text-gray-500">/100</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No data</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {business.last_updated
                        ? new Date(business.last_updated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/claim/${business.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Claim
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">How Trust Scores Work</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">What affects my score?</h3>
              <p className="text-sm text-gray-700">
                Your trust score is based on verified online presence, customer reviews, business listing
                completeness, social media activity, and response to customer feedback.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">How often is it updated?</h3>
              <p className="text-sm text-gray-700">
                Scores are automatically updated daily with fresh data from multiple sources.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">How can I improve my ranking?</h3>
              <p className="text-sm text-gray-700">
                Claim your profile, maintain accurate information, respond to reviews, and use our
                marketing tools to boost visibility.
              </p>
            </div>
          </div>
        </div>

        {/* Tools CTA */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Tools to Improve Your Score</h2>
          <p className="text-gray-600 mb-4">
            Boost your visibility and trust with professional marketing materials:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://niagarastandsout.ca/collections/custom-labels-canada?utm_source=trust"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="font-semibold mb-1">Custom Labels</div>
              <div className="text-sm text-gray-600">Professional stickers and labels</div>
            </a>
            <a
              href="https://niagarastandsout.ca/collections/eyes-strip-truck-window-decals?utm_source=trust"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="font-semibold mb-1">Eyes Strip Decals</div>
              <div className="text-sm text-gray-600">Eye-catching vehicle branding</div>
            </a>
            <a
              href="https://niagarastandsout.ca/products/complete-bathroom-marketing-kit?utm_source=trust"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="font-semibold mb-1">Bathroom Marketing Kit</div>
              <div className="text-sm text-gray-600">Complete DIY solution</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
