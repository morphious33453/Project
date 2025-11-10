import { NextRequest, NextResponse } from "next/server";
import { qOne } from "@/src/lib/db";

interface BusinessScore {
  name: string;
  score: number;
}

export async function GET(request: NextRequest) {
  try {
    // Get profile ID from query params or default
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('id');

    if (!profileId) {
      // Return default badge script
      return new NextResponse(
        generateBadgeScript(null),
        {
          headers: {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'public, max-age=3600',
          },
        }
      );
    }

    // Fetch business score
    const business = await qOne<BusinessScore>(`
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
      WHERE b.id = $1
    `, [profileId]);

    return new NextResponse(
      generateBadgeScript(business),
      {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=3600',
        },
      }
    );
  } catch (error) {
    console.error('Badge embed error:', error);
    return new NextResponse(
      generateBadgeScript(null),
      {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=300',
        },
      }
    );
  }
}

function generateBadgeScript(business: BusinessScore | null): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trust.niagarastandsout.com';

  // Check if profile ID is set via window variable
  const script = `
(function() {
  var profileId = window.__nso_badge_profile;
  var business = ${business ? JSON.stringify(business) : 'null'};

  if (!profileId && !business) {
    console.warn('NSO Trust Badge: No profile ID specified. Set window.__nso_badge_profile before loading this script.');
    return;
  }

  var score = business ? business.score : 0;
  var name = business ? business.name : 'Business';

  // If profile ID but no business data, reload with ID param
  if (profileId && !business) {
    var script = document.createElement('script');
    script.src = '${siteUrl}/embed/badge?id=' + profileId;
    document.head.appendChild(script);
    return;
  }

  // Generate badge SVG
  var svg = '<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">' +
    '<stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />' +
    '<stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />' +
    '</linearGradient>' +
    '</defs>' +
    '<rect width="200" height="80" rx="8" fill="url(#grad)"/>' +
    '<text x="100" y="25" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">NSO Trust Score</text>' +
    '<text x="100" y="55" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">' + score + '/100</text>' +
    '</svg>';

  // Create badge container
  var container = document.createElement('div');
  container.style.cssText = 'display:inline-block;margin:10px;';

  var link = document.createElement('a');
  link.href = '${siteUrl}/profile/' + (profileId || '');
  link.target = '_blank';
  link.rel = 'ugc nofollow';
  link.title = 'View ' + name + ' on NSO Trust Index';
  link.innerHTML = svg;

  container.appendChild(link);

  // Insert badge into page
  var script = document.currentScript || document.querySelector('script[src*="embed/badge"]');
  if (script && script.parentNode) {
    script.parentNode.insertBefore(container, script);
  } else {
    document.body.appendChild(container);
  }
})();
`;

  return script;
}
