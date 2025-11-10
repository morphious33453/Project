import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trust.niagarastandsout.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/dashboard', '/claim', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
