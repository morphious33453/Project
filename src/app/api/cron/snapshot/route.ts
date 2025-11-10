import { NextRequest, NextResponse } from "next/server";
import { q } from "@/src/lib/db";

interface Business {
  id: string;
  name: string;
}

const evidenceTemplates = [
  { url: 'https://google.com/maps', title: 'Google Maps listing verified' },
  { url: 'https://facebook.com', title: 'Active Facebook business page' },
  { url: 'https://yelp.com', title: 'Claimed Yelp profile' },
  { url: 'https://bbb.org', title: 'BBB Accredited Business' },
  { url: 'https://example.com/reviews', title: 'Recent customer reviews' },
];

export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (!process.env.CRON_SECRET || authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get 10 random businesses
    const businesses = await q<Business>(`
      SELECT id, name
      FROM businesses
      ORDER BY RANDOM()
      LIMIT 10
    `);

    if (businesses.length === 0) {
      return NextResponse.json(
        { ok: true, message: 'No businesses to snapshot', count: 0 },
        { status: 200 }
      );
    }

    const snapshots = [];

    // Create snapshots for each business
    for (const business of businesses) {
      // Generate synthetic score (60-99)
      const score = Math.floor(Math.random() * 40) + 60;

      // Generate evidence (1-3 pieces)
      const numEvidence = Math.floor(Math.random() * 3) + 1;
      const evidence = [];

      for (let i = 0; i < numEvidence; i++) {
        const template = evidenceTemplates[i % evidenceTemplates.length];
        evidence.push({
          url: template.url,
          title: template.title,
          date: new Date().toISOString().split('T')[0]
        });
      }

      // Generate metrics
      const metrics = {
        reviews: Math.floor(Math.random() * 200) + 10,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        map_pack: Math.random() > 0.7,
        claimed: Math.random() > 0.3
      };

      // Insert snapshot
      await q(`
        INSERT INTO snapshots (business_id, score, evidence, metrics, taken_at)
        VALUES ($1, $2, $3, $4, NOW())
      `, [
        business.id,
        score,
        JSON.stringify(evidence),
        JSON.stringify(metrics)
      ]);

      snapshots.push({
        business_id: business.id,
        business_name: business.name,
        score
      });
    }

    console.log(`Created ${snapshots.length} snapshots`);

    return NextResponse.json(
      {
        ok: true,
        message: `Created snapshots for ${snapshots.length} businesses`,
        count: snapshots.length,
        snapshots
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Cron snapshot error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Support GET for testing (only in development)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Method not allowed in production' },
      { status: 405 }
    );
  }

  return NextResponse.json(
    {
      message: 'Cron endpoint ready. Use POST with Authorization: Bearer <CRON_SECRET>',
      endpoint: '/api/cron/snapshot'
    },
    { status: 200 }
  );
}
