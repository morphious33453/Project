import { MetadataRoute } from 'next';
import { q } from '@/src/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trust.niagarastandsout.com';

  const cities = ['st-catharines', 'niagara-falls', 'welland'];
  const verticals = ['restaurants', 'auto-repair', 'plumbers', 'dentists'];

  const items: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Add all city/vertical leaderboards
  cities.forEach(city => {
    verticals.forEach(vertical => {
      items.push({
        url: `${baseUrl}/${city}/${vertical}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // Add all business profiles (limit to 500 for sitemap size)
  try {
    const profiles = await q<{ id: string; created_at: string }>(`
      SELECT id, created_at
      FROM businesses
      ORDER BY created_at DESC
      LIMIT 500
    `);

    profiles.forEach(profile => {
      items.push({
        url: `${baseUrl}/profile/${profile.id}`,
        lastModified: new Date(profile.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error('Error generating sitemap profiles:', error);
    // Continue without profiles if DB fails
  }

  return items;
}
