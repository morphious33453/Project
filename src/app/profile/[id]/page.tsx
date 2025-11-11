import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { q, qOne } from "@/src/lib/db";
import { JsonLd } from "@/src/app/components/JsonLd";
import { EvidenceList } from "@/src/app/components/EvidenceList";
import { ScoreChart } from "@/src/app/components/ScoreChart";
import { ShareButtons } from "@/src/app/components/ShareButtons";

interface PageProps {
  params: {
    id: string;
  };
}

interface Business {
  id: string;
  name: string;
  city: string;
  vertical: string;
  website: string | null;
  gbp_cid: string | null;
}

interface Snapshot {
  score: number;
  taken_at: string;
  evidence: Array<{ url: string; title: string; date?: string }>;
  metrics: {
    reviews?: number;
    rating?: string;
    map_pack?: boolean;
    claimed?: boolean;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const business = await qOne<Business>(`
    SELECT id, name, city, vertical, website
    FROM businesses
    WHERE id = $1
  `, [params.id]).catch(() => null);

  if (!business) {
    return {
      title: 'Business Not Found',
    };
  }

  const cityName = business.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const verticalName = business.vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = `${business.name} - Trust Profile`;
  const description = `View trust score, verified evidence, and rankings for ${business.name} in ${cityName}. ${verticalName} business with transparent reputation data.`;

  return {
    title,
    description,
    keywords: [business.name, cityName, verticalName.toLowerCase(), 'trust score', 'business profile', 'reputation'],
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `/profile/${params.id}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${business.name} Trust Profile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const business = await qOne<Business>(`
    SELECT id, name, city, vertical, website, gbp_cid
    FROM businesses
    WHERE id = $1
  `, [params.id]).catch(() => null);

  if (!business) {
    notFound();
  }

  // Get latest snapshot
  const snapshot = await qOne<Snapshot>(`
    SELECT score, taken_at, evidence, metrics
    FROM snapshots
    WHERE business_id = $1
    ORDER BY taken_at DESC
    LIMIT 1
  `, [params.id]).catch(() => null);

  // Get historical snapshots for chart (last 30 days)
  const historicalSnapshots = await q<{ score: number; taken_at: string }>(`
    SELECT score, taken_at
    FROM snapshots
    WHERE business_id = $1
      AND taken_at > NOW() - INTERVAL '30 days'
    ORDER BY taken_at ASC
  `, [params.id]).catch(() => []);

  const chartData = historicalSnapshots.map(s => ({
    date: new Date(s.taken_at),
    score: s.score
  }));

  // Get ranking in city/vertical
  const rankResult = await qOne<{ rank: number; total: number }>(`
    WITH ranked AS (
      SELECT
        b.id,
        ROW_NUMBER() OVER (ORDER BY COALESCE(s.score, 0) DESC, b.name ASC) as rank,
        COUNT(*) OVER () as total
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
    SELECT rank::int, total::int
    FROM ranked
    WHERE id = $3
  `, [business.city, business.vertical, business.id]).catch(() => null);

  const cityName = business.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const verticalName = business.vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // JSON-LD: LocalBusiness
  const businessJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": "ON",
      "addressCountry": "CA"
    }
  };

  if (business.website) {
    businessJsonLd.url = business.website;
    businessJsonLd.sameAs = [business.website];
  }

  if (snapshot?.metrics.rating) {
    businessJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": snapshot.metrics.rating,
      "reviewCount": snapshot.metrics.reviews || 0
    };
  }

  return (
    <>
      <JsonLd data={businessJsonLd} />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${business.city}/${business.vertical}`} className="hover:text-blue-600">
            {cityName} {verticalName}
          </Link>
          <span className="mx-2">/</span>
          <span>{business.name}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">{business.name}</h1>
              <div className="flex items-center gap-3 text-gray-600">
                <span>{cityName}</span>
                <span>•</span>
                <span>{verticalName}</span>
                {rankResult && (
                  <>
                    <span>•</span>
                    <span className="font-semibold">
                      Ranked #{rankResult.rank} of {rankResult.total}
                    </span>
                  </>
                )}
              </div>
            </div>
            <Link
              href={`/claim/${business.id}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Claim This Profile
            </Link>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                {business.website}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://trust.niagarastandsout.com'}/profile/${business.id}`}
              title={`${business.name} - Trust Profile | NSO Trust Index`}
              description={`View trust score and verified evidence for ${business.name} in ${cityName}. Ranked #${rankResult?.rank || 'N/A'} in ${verticalName}.`}
            />
          </div>
        </div>

        {/* Trust Score Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trust Score</h2>
            {snapshot && (
              <span className="text-sm text-gray-500">
                Updated {new Date(snapshot.taken_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
          </div>

          {snapshot ? (
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="text-6xl font-bold text-blue-600">{snapshot.score}</div>
                <div className="text-lg text-gray-500 absolute -bottom-1 -right-8">/100</div>
              </div>

              {snapshot.metrics && (
                <div className="flex gap-6">
                  {snapshot.metrics.reviews !== undefined && (
                    <div>
                      <div className="text-sm text-gray-500">Reviews</div>
                      <div className="text-xl font-semibold">{snapshot.metrics.reviews}</div>
                    </div>
                  )}
                  {snapshot.metrics.rating && (
                    <div>
                      <div className="text-sm text-gray-500">Rating</div>
                      <div className="text-xl font-semibold">{snapshot.metrics.rating} ⭐</div>
                    </div>
                  )}
                  {snapshot.metrics.map_pack !== undefined && (
                    <div>
                      <div className="text-sm text-gray-500">Map Pack</div>
                      <div className="text-xl font-semibold">
                        {snapshot.metrics.map_pack ? '✓' : '✗'}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 italic">No score data available yet</div>
          )}
        </div>

        {/* Score History Chart */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Score History (Last 30 Days)</h2>
            <ScoreChart data={chartData} width={700} height={250} />
            <div className="mt-4 text-sm text-gray-600 flex items-center gap-4">
              <span>📈 {chartData.length} data points collected</span>
              {chartData.length >= 2 && (
                <span>
                  {chartData[chartData.length - 1].score - chartData[0].score > 0 ? '↗' : '↘'}
                  {' '}
                  {Math.abs(chartData[chartData.length - 1].score - chartData[0].score)} point change
                </span>
              )}
            </div>
          </div>
        )}

        {/* Evidence Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Verified Evidence</h2>
          <p className="text-gray-600 mb-6">
            This score is based on verified evidence from multiple online sources:
          </p>
          {snapshot?.evidence ? (
            <EvidenceList evidence={snapshot.evidence} />
          ) : (
            <div className="text-gray-500 italic">No evidence collected yet</div>
          )}
        </div>

        {/* Badge Embed */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">Embed Your Badge</h2>
          <p className="text-gray-700 text-sm mb-4">
            Show your trust score on your website with our embeddable badge:
          </p>
          <pre className="bg-white p-4 rounded border text-xs overflow-x-auto">
{`<script>
  window.__nso_badge_profile = '${business.id}';
</script>
<script src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://trust.niagarastandsout.com'}/embed/badge"></script>`}
          </pre>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Want to Improve This Score?</h2>
          <p className="mb-6 text-blue-100">
            Claim your profile and get access to insights, alerts, and tools to boost your ranking.
          </p>
          <Link
            href={`/claim/${business.id}`}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Claim Profile Now
          </Link>
        </div>
      </div>
    </>
  );
}
