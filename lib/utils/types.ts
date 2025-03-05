export interface Location {
  city: string;
  address: string;
  region: string;
  postalCode?: string;
}

export interface ServiceDetails {
  timeEstimates: string;
  priceRange?: {
    min: number;
    max: number;
    unit: string;
  };
  process?: string[];
  preparation?: string[];
  maintenance?: string[];
  aftercare?: string[];
  warranty?: string;
}

export interface Expertise {
  description: string;
  specialties: string[];
  certifications?: string[];
  specialProjects?: string[];
  awards?: string[];
}

export interface CompanyTips {
  maintenance?: string[];
  colorSelection?: string[];
  general?: string[];
  applicationTips?: string[];
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  type: string;
  services: string[];
  locations: Location[];
  phone: string;
  email: string;
  website: string;
  rating: string;
  reviewCount: string;
  yearsInBusiness: string;
  expertise?: Expertise;
  serviceDetails?: ServiceDetails;
  tips?: CompanyTips;
}

export interface ServiceType {
  id: string;
  name: string;
  slug: string;
  description: string;
  commonApplications?: string[];
  benefits?: string[];
  estimatedDuration?: string;
  considerations?: string[];
  relatedServices?: string[];
  priceRange?: {
    min: number;
    max: number;
    unit: string;
  };
}

export interface RegionData {
  name: string;
  slug: string;
  cities: string[];
  companies: Company[];
  totalCompanies: number;
  popularServices: string[];
}

export interface ServiceData {
  name: string;
  slug: string;
  companies: Company[];
  totalCompanies: number;
  regions: string[];
  averagePricing?: {
    min: number;
    max: number;
    unit: string;
  };
}

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  canonicalUrl?: string; // Some components use canonicalUrl instead of canonical
}

export interface PaintType {
  id: string;
  name: string;
  slug: string;
  description: string;
  applications: string[];
  benefits: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: string[];
  specialties: string[];
}

export interface Surface {
  id: string;
  name: string;
  slug: string;
  description: string;
  preparationSteps: string[];
  recommendedProducts: string[];
}

export interface Finish {
  id: string;
  name: string;
  slug: string;
  description: string;
  characteristics: string[];
  bestUsedFor: string[];
}

export interface Supply {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  useCases: string[];
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  description: string;
  techniques: string[];
  requiredSkills: string[];
}
