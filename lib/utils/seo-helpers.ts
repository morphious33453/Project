import { MetaData, Location } from './types';

// Function to generate slugs from strings
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Function to generate meta titles based on page type and content
export function generateMetaTitle(
  pageType: string,
  data: Record<string, any>
): string {
  const templates: Record<string, string> = {
    company: `${data.name} - ${data.type} in ${data.locations?.[0]?.city || 'Niagara'} | ${data.yearsInBusiness}+ Years Experience`,
    location: `${data.city} Paint Services & Supplies | Top Rated Painters in ${data.region}`,
    service: `${data.name} Services in ${data.region} | Professional ${data.name} Contractors`,
    paintType: `${data.name} Paint Guide | Best ${data.name} Paints for ${data.bestUsedFor?.[0] || 'Your Project'}`,
    brand: `${data.name} Paint Products in ${data.region} | Where to Buy ${data.name}`,
    surface: `${data.name} Painting Guide | Expert Tips for ${data.name} Surfaces`,
    finish: `${data.name} Paint Finish Guide | When to Use ${data.name} Finish`,
    supply: `${data.name} Paint Supplies | Professional ${data.category} Guide`,
    specialty: `${data.name} Painting Techniques | Expert ${data.name} Services`
  };

  return templates[pageType] || `${data.name} | Paint Services Directory`;
}

// Function to generate meta descriptions based on page type and content
export function generateMetaDescription(
  pageType: string,
  data: Record<string, any>
): string {
  const templates: Record<string, string> = {
    company: `Expert ${(data.services || []).join(', ')} by ${data.name}. Serving ${(data.locations || []).map((l: Location) => l.city).join(', ')}. Specialized in ${(data.specialties || []).join(', ')}. Get a free quote for your painting project.`,
    location: `Find trusted ${data.city} painters, paint stores & supplies. Compare local painting services, read reviews & get quotes. Expert ${data.city} painting contractors for residential & commercial projects.`,
    service: `Professional ${data.name} services in the Niagara region. Compare top-rated contractors, view project galleries & get free quotes. Expert ${data.name} services for your property.`,
    paintType: `Complete guide to ${data.name} paints. Compare brands, prices & applications. Expert tips for choosing the right ${data.name} paint for your ${data.bestUsedFor?.[0] || 'next'} project.`,
    brand: `Find ${data.name} paint products in Niagara. Compare prices, explore color collections & locate authorized ${data.name} dealers. Expert advice on ${data.name} paint selection.`,
    surface: `Expert guide for painting ${data.name}. Learn proper preparation, techniques, and recommended products. Professional tips for achieving the perfect finish on ${data.name}.`,
    finish: `Everything you need to know about ${data.name} paint finish. Compare durability, appearance, and best uses. Expert advice on choosing the right finish for your project.`,
    supply: `Professional guide to ${data.name}. Compare top products, prices, and features. Expert recommendations for ${data.category} supplies and tools.`,
    specialty: `Expert guide to ${data.name} painting techniques. Learn about materials, methods, and professional tips. Find specialized contractors for your ${data.name} project.`
  };

  return templates[pageType] || `Learn about ${data.name} and find professional painting services in the Niagara region.`;
}

// Function to generate keywords based on page type and content
export function generateKeywords(
  pageType: string,
  data: Record<string, any>
): string[] {
  const baseKeywords = ['paint', 'painting', 'Niagara', 'professional'];
  const typeSpecificKeywords: Record<string, string[]> = {
    company: [
      data.name,
      data.type,
      ...(data.services || []),
      ...(data.specialties || []),
      ...(data.locations || []).map((l: Location) => l.city),
      'contractor',
      'painting company'
    ],
    location: [
      data.city,
      data.region,
      'local painters',
      'painting services',
      'paint stores',
      'paint supplies'
    ],
    service: [
      data.name,
      'painting service',
      'professional painters',
      'painting contractors',
      ...(data.commonApplications || [])
    ]
  };

  // Convert to array to avoid Set iteration issues
  return Array.from(new Set([...baseKeywords, ...(typeSpecificKeywords[pageType] || [])]));
}

// Function to generate canonical URL
export function generateCanonicalUrl(
  pageType: string,
  slug: string,
  baseUrl: string = 'https://yourwebsite.com'
): string {
  const paths: Record<string, string> = {
    company: 'companies',
    location: 'location',
    service: 'service',
    paintType: 'paint-type',
    brand: 'brand',
    surface: 'surface',
    finish: 'finish',
    supply: 'supplies',
    specialty: 'specialty'
  };

  return `${baseUrl}/${paths[pageType]}/${slug}`;
}

// Function to generate complete meta data
export function generateMetaData(
  pageType: string,
  data: Record<string, any>
): MetaData {
  return {
    title: generateMetaTitle(pageType, data),
    description: generateMetaDescription(pageType, data),
    keywords: generateKeywords(pageType, data),
    canonicalUrl: generateCanonicalUrl(pageType, data.slug)
  };
}

// Function to generate breadcrumbs schema
export function generateBreadcrumbsSchema(
  pageType: string,
  data: Record<string, any>
): object {
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://yourwebsite.com'
    }
  ];

  if (pageType === 'location' && data.region) {
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': 2,
      'name': data.region,
      'item': `https://yourwebsite.com/location/${generateSlug(data.region)}`
    });
  }

  breadcrumbs.push({
    '@type': 'ListItem',
    'position': breadcrumbs.length + 1,
    'name': data.name,
    'item': generateCanonicalUrl(pageType, data.slug)
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs
  };
}

// Function to generate local business schema for companies
export function generateLocalBusinessSchema(data: Record<string, any>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    'name': data.name,
    'description': data.description,
    'url': data.website,
    'telephone': data.phone,
    'email': data.email,
    'address': (data.locations || []).map((location: Location) => ({
      '@type': 'PostalAddress',
      'streetAddress': location.address,
      'addressLocality': location.city,
      'addressRegion': 'ON',
      'postalCode': location.postalCode,
      'addressCountry': 'CA'
    })),
    'geo': (data.locations || []).map((location: Location & { latitude?: number; longitude?: number }) => ({
      '@type': 'GeoCoordinates',
      'latitude': location.latitude,
      'longitude': location.longitude
    })),
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': data.rating,
      'reviewCount': data.reviewCount
    },
    'priceRange': data.priceRange,
    'openingHoursSpecification': data.hours
  };
}
