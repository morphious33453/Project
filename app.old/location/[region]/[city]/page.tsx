import fs from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"
import { MapPin, Phone, Building, Brush, ArrowLeft } from "lucide-react"
import { Company, CityInfo } from "@/lib/utils/types"
import { CompanyCard } from "@/components/company-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: {
    region: string;
    city: string;
  }
}

interface RegionData {
  name: string;
  slug: string;
  cities: string[];
  companies: Company[];
  totalCompanies: number;
  popularServices: string[];
  cityInfo?: { [key: string]: CityInfo };
}

async function getCityData(region: string, city: string): Promise<{
  companies: Company[];
  services: string[];
  cityInfo?: CityInfo;
} | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), 'data', 'indexes', 'regions', `${region}.json`),
      'utf-8'
    )
    const regionData = JSON.parse(content) as RegionData
    
    // Filter companies that have a location in this city
    const companies = regionData.companies.filter(company =>
      company.locations.some(location => {
        const normalizedLocationCity = location.city.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
        const normalizedCity = city.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
        return normalizedLocationCity === normalizedCity
      })
    )

    if (companies.length === 0) return null

    // Extract unique services
    const services = Array.from(new Set(companies.flatMap(c => c.services)))

    // Get city info if available
    const cityInfo = regionData.cityInfo?.[city.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')]

    return { companies, services, cityInfo }
  } catch (error) {
    console.error('Error loading city data:', error)
    return null
  }
}

export async function generateStaticParams() {
  const regionsDir = path.join(process.cwd(), 'data', 'indexes', 'regions')
  const files = await fs.readdir(regionsDir)
  
  const params: { region: string; city: string; }[] = []
  
  for (const file of files) {
    const content = await fs.readFile(path.join(regionsDir, file), 'utf-8')
    const regionData = JSON.parse(content) as RegionData
    const region = path.basename(file, '.json')
    
    regionData.cities.forEach(city => {
      params.push({
        region,
        city: city.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
      })
    })
  }

  return params
}

export async function generateMetadata({ params }: Props) {
  const data = await getCityData(params.region, params.city)
  if (!data) return {}

  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1).replace(/-/g, ' ')
  const regionName = params.region.charAt(0).toUpperCase() + params.region.slice(1).replace(/-/g, ' ')
  
  const title = `Paint Services in ${cityName}, ${regionName} | Local Painters & Suppliers`
  const description = `Find professional painting services in ${cityName}, ${regionName}. Compare local contractors, paint stores, and get quotes for your painting project.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function CityPage({ params }: Props) {
  const data = await getCityData(params.region, params.city)
  if (!data) notFound()

  const { companies, services, cityInfo } = data
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1).replace(/-/g, ' ')
  const regionName = params.region.charAt(0).toUpperCase() + params.region.slice(1).replace(/-/g, ' ')

  // Group companies by type
  const contractors = companies.filter(c => c.type === 'contractor')
  const retailers = companies.filter(c => c.type === 'retailer')
  const suppliers = companies.filter(c => c.type === 'supplier')

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="bg-muted rounded-lg p-8">
        <div className="max-w-3xl">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4 -ml-2">
              <Link href={`/location/${params.region}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {regionName}
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-4">Paint Services in {cityName}</h1>
            <p className="text-xl text-muted-foreground">
              Find trusted painting contractors, suppliers, and paint stores in {cityName}, {regionName}
            </p>
          </div>
        </div>
      </section>

      {/* City Information Section */}
      {cityInfo && (
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">About {cityName}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">{cityInfo.description}</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {/* City Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Population: {cityInfo.population}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={cityInfo.cityHallWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    City Hall Website
                  </a>
                </div>
              </div>

              {/* Service Areas */}
              <div>
                <h3 className="font-medium mb-2">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {cityInfo.serviceAreas.map((area: string) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Permit Information */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Permit Information</h3>
              <p className="text-sm text-muted-foreground">{cityInfo.permitInfo}</p>
              <Button asChild variant="outline" className="mt-2">
                <a
                  href={`${cityInfo.cityHallWebsite}/permits`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Permit Requirements
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Contractors Section */}
          {contractors.length > 0 && (
            <section id="contractors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Local Painting Contractors</h2>
              </div>
              <div className="space-y-6">
                {contractors.map((company) => (
                  <CompanyCard key={company.id} company={company} showFullDetails />
                ))}
              </div>
            </section>
          )}

          {/* Paint Stores Section */}
          {retailers.length > 0 && (
            <section id="stores">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Paint Stores</h2>
              </div>
              <div className="space-y-6">
                {retailers.map((company) => (
                  <CompanyCard key={company.id} company={company} showFullDetails />
                ))}
              </div>
            </section>
          )}

          {/* Suppliers Section */}
          {suppliers.length > 0 && (
            <section id="suppliers">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Paint Suppliers</h2>
              </div>
              <div className="space-y-6">
                {suppliers.map((company) => (
                  <CompanyCard key={company.id} company={company} showFullDetails />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Available Services */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Available Services</h2>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Link
                  key={service}
                  href={`/service/${service.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contractors</span>
                <span className="font-medium">{contractors.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Paint Stores</span>
                <span className="font-medium">{retailers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Suppliers</span>
                <span className="font-medium">{suppliers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Services Available</span>
                <span className="font-medium">{services.length}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-lg bg-primary p-6 text-primary-foreground">
            <h2 className="text-lg font-semibold mb-2">Need a Quote?</h2>
            <p className="text-sm mb-4">
              Compare quotes from trusted professionals in {cityName}
            </p>
            <Button asChild className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="#contractors">View Contractors</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
