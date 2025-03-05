import fs from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"
import { MapPin, Phone, Building, Brush } from "lucide-react"
import { Company } from "@/lib/utils/types"
import { CompanyCard } from "@/components/company-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: {
    region: string
  }
}

async function getLocationData(region: string): Promise<{
  companies: Company[];
  services: string[];
  cities: string[];
} | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), 'data', 'indexes', 'regions', `${region}.json`),
      'utf-8'
    )
    const companies = JSON.parse(content) as Company[]

    // Extract unique services and cities
    const services = [...new Set(companies.flatMap(c => c.services))]
    const cities = [...new Set(companies.flatMap(c => c.locations.map(l => l.city)))]

    return { companies, services, cities }
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  const regionsDir = path.join(process.cwd(), 'data', 'indexes', 'regions')
  const files = await fs.readdir(regionsDir)
  return files.map(file => ({
    region: path.basename(file, '.json')
  }))
}

export async function generateMetadata({ params }: Props) {
  const data = await getLocationData(params.region)
  if (!data) return {}

  const regionName = params.region.charAt(0).toUpperCase() + params.region.slice(1).replace(/-/g, ' ')
  const title = `Paint Services in ${regionName} | Contractors & Suppliers`
  const description = `Find professional painting services in ${regionName}. Compare local contractors, suppliers, and paint stores. Get quotes for your painting project.`

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

export default async function LocationPage({ params }: Props) {
  const data = await getLocationData(params.region)
  if (!data) notFound()

  const { companies, services, cities } = data
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
          <h1 className="text-3xl font-bold mb-4">Paint Services in {regionName}</h1>
          <p className="text-xl text-muted-foreground">
            Find trusted painting contractors, suppliers, and paint stores in the {regionName} area
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Contractors Section */}
          {contractors.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Painting Contractors</h2>
                <Button asChild variant="ghost">
                  <Link href="/companies?type=contractor">
                    View All <Brush className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-6">
                {contractors.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </section>
          )}

          {/* Paint Stores Section */}
          {retailers.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Paint Stores</h2>
                <Button asChild variant="ghost">
                  <Link href="/companies?type=retailer">
                    View All <Building className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-6">
                {retailers.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </section>
          )}

          {/* Suppliers Section */}
          {suppliers.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Paint Suppliers</h2>
                <Button asChild variant="ghost">
                  <Link href="/companies?type=supplier">
                    View All <Building className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-6">
                {suppliers.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cities */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Service Areas</h2>
            <div className="space-y-3">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/location/${params.region}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center p-2 rounded-lg hover:bg-muted"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{city}</span>
                </Link>
              ))}
            </div>
          </div>

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
                <span className="text-muted-foreground">Service Areas</span>
                <span className="font-medium">{cities.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
