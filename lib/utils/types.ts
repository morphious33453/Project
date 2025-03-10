export interface Company {
  id: string;
  name: string;
  slug: string;
  type: 'contractor' | 'retailer' | 'supplier';
  services: string[];
  locations: Location[];
  phone: string;
  email: string;
  website: string;
  rating: string;
  reviewCount: string;
  yearsInBusiness: string;
  expertise: {
    description: string;
    specialties: string[];
    certifications: string[];
    specialProjects: string[];
    awards: string[];
  };
  serviceDetails: {
    timeEstimates: string;
    process: string[];
    preparation: string[];
    maintenance: string[];
    aftercare: string[];
    warranty: string;
  };
  tips: {
    maintenance: string[];
    colorSelection: string[];
    general: string[];
    applicationTips: string[];
  };
}

export interface Location {
  city: string;
  address: string;
  region: string;
  postalCode?: string;
}

export interface CityInfo {
  name: string;
  region: string;
  population: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  cityHallAddress: string;
  cityHallWebsite: string;
  permitInfo: string;
  serviceAreas: string[];
  description: string;
}

export interface RegionData {
  name: string;
  slug: string;
  cities: string[];
  companies: Company[];
  totalCompanies: number;
  popularServices: string[];
  cityInfo?: { [key: string]: CityInfo };
}

export interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface PriceRange {
  min: number;
  max: number;
  unit: string;
}

export interface ServiceType {
  id: string;
  name: string;
  slug: string;
  description: string;
  commonApplications: string[];
  applications?: string[];
  benefits: string[];
  considerations?: string[];
  estimatedDuration: string;
  priceRange: PriceRange;
  relatedServices?: string[];
  companies?: Company[];
}

export interface PaintType {
  id: string;
  name: string;
  slug: string;
  description: string;
  applications: string[];
  benefits: string[];
  companies?: Company[];
}

export interface Surface {
  id: string;
  name: string;
  slug: string;
  description: string;
  preparationSteps: string[];
  recommendedProducts: string[];
  companies?: Company[];
}

export interface Finish {
  id: string;
  name: string;
  slug: string;
  description: string;
  characteristics: string[];
  bestUsedFor: string[];
  companies?: Company[];
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  description: string;
  techniques: string[];
  requiredSkills: string[];
  companies?: Company[];
}

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string;
  companies?: Company[];
  averagePricing?: PriceRange;
}
