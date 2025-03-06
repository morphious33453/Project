import fs from 'fs/promises';
import path from 'path';
import { env } from '../lib/utils/env';

const SITEMAP_SIZE = 2500;
const BASE_URL = env.SITE_URL;

interface Company {
  name: string;
  slug: string;
  region: string;
  city: string;
}

interface Service {
  name: string;
  slug: string;
}

async function readJsonFiles(directory: string): Promise<any[]> {
  try {
    const files = await fs.readdir(directory);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(directory, file), 'utf-8');
        return JSON.parse(content);
      })
    );
    
    return data;
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

function generateSitemapXML(urls: string[]): string {
  const urlElements = urls.map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlElements}
    </urlset>`;
}

function generateSitemapIndex(sitemapFiles: string[]): string {
  const sitemapElements = sitemapFiles.map(file => `
    <sitemap>
      <loc>${BASE_URL}/${file}</loc>
    </sitemap>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapElements}
    </sitemapindex>`;
}

async function generateCompanySitemaps(): Promise<string[]> {
  const companies = await readJsonFiles(path.join(process.cwd(), 'data/companies'));
  const urls = companies.map(company => `${BASE_URL}/companies/${company.slug}`);
  
  const sitemapFiles: string[] = [];
  for (let i = 0; i < urls.length; i += SITEMAP_SIZE) {
    const chunk = urls.slice(i, i + SITEMAP_SIZE);
    const sitemapName = `sitemap-companies-${Math.floor(i / SITEMAP_SIZE) + 1}.xml`;
    await fs.writeFile(
      path.join(process.cwd(), 'public', sitemapName),
      generateSitemapXML(chunk)
    );
    sitemapFiles.push(sitemapName);
  }
  
  return sitemapFiles;
}

async function generateServiceSitemaps(): Promise<string[]> {
  const services = await readJsonFiles(path.join(process.cwd(), 'data/indexes/services'));
  const urls = services.map(service => `${BASE_URL}/service/${service.slug}`);
  
  const sitemapFiles: string[] = [];
  for (let i = 0; i < urls.length; i += SITEMAP_SIZE) {
    const chunk = urls.slice(i, i + SITEMAP_SIZE);
    const sitemapName = `sitemap-services-${Math.floor(i / SITEMAP_SIZE) + 1}.xml`;
    await fs.writeFile(
      path.join(process.cwd(), 'public', sitemapName),
      generateSitemapXML(chunk)
    );
    sitemapFiles.push(sitemapName);
  }
  
  return sitemapFiles;
}

async function generateLocationSitemaps(): Promise<string[]> {
  const companies = await readJsonFiles(path.join(process.cwd(), 'data/companies'));
  
  // Get unique regions and cities
  const locations = new Set<string>();
  const regionCities = new Map<string, Set<string>>();
  
  companies.forEach(company => {
    if (company.region) {
      locations.add(`/location/${company.region}`);
      if (!regionCities.has(company.region)) {
        regionCities.set(company.region, new Set());
      }
      if (company.city) {
        regionCities.get(company.region)?.add(company.city);
      }
    }
  });
  
  // Add region/city combinations
  regionCities.forEach((cities, region) => {
    cities.forEach(city => {
      locations.add(`/location/${region}/${city}`);
    });
  });
  
  const urls = Array.from(locations).map(path => `${BASE_URL}${path}`);
  
  const sitemapFiles: string[] = [];
  for (let i = 0; i < urls.length; i += SITEMAP_SIZE) {
    const chunk = urls.slice(i, i + SITEMAP_SIZE);
    const sitemapName = `sitemap-locations-${Math.floor(i / SITEMAP_SIZE) + 1}.xml`;
    await fs.writeFile(
      path.join(process.cwd(), 'public', sitemapName),
      generateSitemapXML(chunk)
    );
    sitemapFiles.push(sitemapName);
  }
  
  return sitemapFiles;
}

async function generateStaticSitemap(): Promise<string[]> {
  const staticUrls = [
    `${BASE_URL}`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
  ];
  
  const sitemapName = 'sitemap-static.xml';
  await fs.writeFile(
    path.join(process.cwd(), 'public', sitemapName),
    generateSitemapXML(staticUrls)
  );
  
  return [sitemapName];
}

async function main() {
  console.log('Generating sitemaps...');
  
  try {
    const [companySitemaps, serviceSitemaps, locationSitemaps, staticSitemap] = await Promise.all([
      generateCompanySitemaps(),
      generateServiceSitemaps(),
      generateLocationSitemaps(),
      generateStaticSitemap(),
    ]);
    
    const allSitemaps = [
      ...companySitemaps,
      ...serviceSitemaps,
      ...locationSitemaps,
      ...staticSitemap,
    ];
    
    await fs.writeFile(
      path.join(process.cwd(), 'public/sitemap.xml'),
      generateSitemapIndex(allSitemaps)
    );
    
    console.log('Sitemap generation completed successfully!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

main();
