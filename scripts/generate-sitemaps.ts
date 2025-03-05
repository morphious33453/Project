import fs from 'fs/promises'
import path from 'path'
import { Company } from '../lib/utils/types'

const URLS_PER_SITEMAP = 2500
const BASE_URL = 'https://yourwebsite.com' // Replace with your actual domain

interface SitemapEntry {
  url: string
  lastmod: string
  changefreq: string
  priority: string
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

function generateSitemapIndex(sitemaps: string[]): string {
  const today = new Date().toISOString().split('T')[0]
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${BASE_URL}/${sitemap}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`
}

async function generateCompanySitemaps(): Promise<string[]> {
  const companiesDir = path.join(process.cwd(), 'data', 'companies')
  const files = await fs.readdir(companiesDir)
  
  const entries: SitemapEntry[] = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(companiesDir, file), 'utf-8')
      const company = JSON.parse(content) as Company
      return {
        url: `${BASE_URL}/companies/${company.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      }
    })
  )

  const sitemapFiles: string[] = []
  for (let i = 0; i < entries.length; i += URLS_PER_SITEMAP) {
    const chunk = entries.slice(i, i + URLS_PER_SITEMAP)
    const sitemapContent = generateSitemapXML(chunk)
    const filename = `sitemap-companies-${Math.floor(i / URLS_PER_SITEMAP) + 1}.xml`
    await fs.writeFile(path.join(process.cwd(), 'public', filename), sitemapContent)
    sitemapFiles.push(filename)
  }

  return sitemapFiles
}

async function generateServiceSitemaps(): Promise<string[]> {
  const servicesDir = path.join(process.cwd(), 'data', 'indexes', 'services')
  const files = await fs.readdir(servicesDir)
  
  const entries: SitemapEntry[] = files.map(file => ({
    url: `${BASE_URL}/service/${path.basename(file, '.json')}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  }))

  const sitemapFiles: string[] = []
  for (let i = 0; i < entries.length; i += URLS_PER_SITEMAP) {
    const chunk = entries.slice(i, i + URLS_PER_SITEMAP)
    const sitemapContent = generateSitemapXML(chunk)
    const filename = `sitemap-services-${Math.floor(i / URLS_PER_SITEMAP) + 1}.xml`
    await fs.writeFile(path.join(process.cwd(), 'public', filename), sitemapContent)
    sitemapFiles.push(filename)
  }

  return sitemapFiles
}

async function generateLocationSitemaps(): Promise<string[]> {
  const regionsDir = path.join(process.cwd(), 'data', 'indexes', 'regions')
  const files = await fs.readdir(regionsDir)
  
  const entries: SitemapEntry[] = []
  
  for (const file of files) {
    const region = path.basename(file, '.json')
    entries.push({
      url: `${BASE_URL}/location/${region}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.7'
    })

    const content = await fs.readFile(path.join(regionsDir, file), 'utf-8')
    const companies = JSON.parse(content) as Company[]
    const cities = new Set(companies.flatMap(c => 
      c.locations.map(l => l.city.toLowerCase().replace(/\s+/g, '-'))
    ))

    cities.forEach(city => {
      entries.push({
        url: `${BASE_URL}/location/${region}/${city}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
      })
    })
  }

  const sitemapFiles: string[] = []
  for (let i = 0; i < entries.length; i += URLS_PER_SITEMAP) {
    const chunk = entries.slice(i, i + URLS_PER_SITEMAP)
    const sitemapContent = generateSitemapXML(chunk)
    const filename = `sitemap-locations-${Math.floor(i / URLS_PER_SITEMAP) + 1}.xml`
    await fs.writeFile(path.join(process.cwd(), 'public', filename), sitemapContent)
    sitemapFiles.push(filename)
  }

  return sitemapFiles
}

async function generateStaticPagesSitemap(): Promise<string[]> {
  const entries: SitemapEntry[] = [
    {
      url: BASE_URL,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${BASE_URL}/companies`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${BASE_URL}/services`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${BASE_URL}/locations`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9'
    }
  ]

  const sitemapContent = generateSitemapXML(entries)
  const filename = 'sitemap-static.xml'
  await fs.writeFile(path.join(process.cwd(), 'public', filename), sitemapContent)
  return [filename]
}

async function generateRobotsTxt(sitemapIndex: string): Promise<void> {
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/${sitemapIndex}
`
  await fs.writeFile(path.join(process.cwd(), 'public', 'robots.txt'), content)
}

async function main() {
  try {
    console.log('Generating sitemaps...')

    // Create public directory if it doesn't exist
    await fs.mkdir(path.join(process.cwd(), 'public'), { recursive: true })

    // Generate all sitemaps
    const [companySitemaps, serviceSitemaps, locationSitemaps, staticSitemaps] = await Promise.all([
      generateCompanySitemaps(),
      generateServiceSitemaps(),
      generateLocationSitemaps(),
      generateStaticPagesSitemap()
    ])

    // Generate sitemap index
    const allSitemaps = [
      ...staticSitemaps,
      ...companySitemaps,
      ...serviceSitemaps,
      ...locationSitemaps
    ]
    const sitemapIndexContent = generateSitemapIndex(allSitemaps)
    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapIndexContent)

    // Generate robots.txt
    await generateRobotsTxt('sitemap.xml')

    console.log('Sitemap generation completed!')
    console.log(`Generated ${allSitemaps.length} sitemap files`)
    console.log('robots.txt file updated')
  } catch (error) {
    console.error('Error generating sitemaps:', error)
    process.exit(1)
  }
}

main()
