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
    {
      url: `${baseUrl}/printers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // SEO Playbook Pages
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/materials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/software`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/methods`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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

  // Dynamic printer pages
  const printers = await safeDbOperation(
    async () => await prisma.printerModel.findMany({ select: { slug: true, createdAt: true } }),
    []
  )
  const printerRoutes: MetadataRoute.Sitemap = printers.map((printer) => ({
    url: `${baseUrl}/printers/${printer.slug}`,
    lastModified: printer.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic use case pages
  const useCases = await safeDbOperation(
    async () => await prisma.useCase.findMany({ select: { slug: true, createdAt: true } }),
    []
  )
  const useCaseRoutes: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${baseUrl}/for/${useCase.slug}`,
    lastModified: useCase.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic category pages
  const categories = await safeDbOperation(
    async () => await prisma.category.findMany({ select: { slug: true, createdAt: true } }),
    []
  )
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // SEO Playbook: Glossary pages
  const glossaryTerms = await safeDbOperation(
    async () => await prisma.glossaryTerm.findMany({ select: { slug: true, updatedAt: true } }),
    []
  )
  const glossaryRoutes: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: term.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // SEO Playbook: Material pages
  const materials = await safeDbOperation(
    async () => await prisma.material.findMany({ select: { slug: true, createdAt: true } }),
    []
  )
  const materialRoutes: MetadataRoute.Sitemap = materials.map((material) => ({
    url: `${baseUrl}/materials/${material.slug}`,
    lastModified: material.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // SEO Playbook: Software pages
  const software = await safeDbOperation(
    async () => await prisma.software.findMany({ select: { slug: true, createdAt: true } }),
    []
  )
  const softwareRoutes: MetadataRoute.Sitemap = software.map((soft) => ({
    url: `${baseUrl}/software/${soft.slug}`,
    lastModified: soft.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // SEO Playbook: Print method pages
  const methods = await safeDbOperation(
    async () => await prisma.printMethod.findMany({ select: { slug: true, createdAt: true } }),
    []
  )
  const methodRoutes: MetadataRoute.Sitemap = methods.map((method) => ({
    url: `${baseUrl}/methods/${method.slug}`,
    lastModified: method.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...routes,
    ...printerRoutes,
    ...useCaseRoutes,
    ...categoryRoutes,
    ...glossaryRoutes,
    ...materialRoutes,
    ...softwareRoutes,
    ...methodRoutes,
    ...designRoutes,
  ]
}
