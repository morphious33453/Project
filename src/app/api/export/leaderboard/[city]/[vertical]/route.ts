import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/src/lib/db';

interface PageProps {
  params: {
    city: string;
    vertical: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: PageProps
) {
  const { city, vertical } = params;

  try {
    // Fetch leaderboard data
    const businesses = await q<{
      name: string;
      website: string | null;
      score: number | null;
      last_updated: string | null;
    }>(`
      SELECT
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
      WHERE b.city = $1 AND b.vertical = $2
      ORDER BY COALESCE(s.score, 0) DESC, b.name ASC
    `, [city, vertical]);

    if (businesses.length === 0) {
      return NextResponse.json(
        { error: 'No businesses found' },
        { status: 404 }
      );
    }

    // Generate CSV
    const headers = ['Rank', 'Business Name', 'Trust Score', 'Website', 'Last Updated'];
    const rows = businesses.map((business, idx) => {
      const rank = idx + 1;
      const score = business.score || 0;
      const website = business.website || 'N/A';
      const lastUpdated = business.last_updated
        ? new Date(business.last_updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'Never';

      return [rank, business.name, score, website, lastUpdated];
    });

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row =>
        row.map(cell => {
          // Escape commas and quotes in cell content
          const cellStr = String(cell);
          if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        }).join(',')
      )
    ].join('\n');

    // Format city and vertical for filename
    const cityName = city.replace(/-/g, '_');
    const verticalName = vertical.replace(/-/g, '_');
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `nso_trust_index_${cityName}_${verticalName}_${timestamp}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSV export' },
      { status: 500 }
    );
  }
}
