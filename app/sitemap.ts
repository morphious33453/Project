import { MetadataRoute } from 'next'
import { prisma, safeDbOperation } from '@/lib/db'
import { getBaseUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/generator`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic design pages
  const designs = await safeDbOperation(
    async () => {
      return await prisma.design.findMany({
        where: {
          status: 'LISTED',
          flagged: false,
        },
        select: {
          slug: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1000, // Limit for performance
      })
    },
    []
  )

  const designRoutes: MetadataRoute.Sitemap = designs.map((design) => ({
    url: `${baseUrl}/design/${design.slug}`,
    lastModified: design.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...designRoutes]
}
