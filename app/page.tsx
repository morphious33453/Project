import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import { Paintbrush, MapPin, Star, Users, Brush, Shield } from "lucide-react"
import { CompanyCard } from "@/components/company-card"
import { ServiceCard } from "@/components/service-card"
import { Company, ServiceType, ServiceData } from "@/lib/utils/types"
import { Button } from "@/components/ui/button"

async function getFeaturedCompanies(): Promise<Company[]> {
  const companiesDir = path.join(process.cwd(), 'data', 'companies')
  const files = await fs.readdir(companiesDir)
  const companies = await Promise.all(
    files.slice(0, 3).map(async (file) => {
      const content = await fs.readFile(path.join(companiesDir, file), 'utf-8')
      return JSON.parse(content) as Company
    })
  )
  return companies
}

async function getPopularServices(): Promise<ServiceType[]> {
  const servicesDir = path.join(process.cwd(), 'data', 'indexes', 'services')
  const files = await fs.readdir(servicesDir)
  const services = await Promise.all(
    files.slice(0, 3).map(async (file) => {
      const content = await fs.readFile(path.join(servicesDir, file), 'utf-8')
      const serviceData = JSON.parse(content) as ServiceData
      
      return {
        id: serviceData.slug,
        slug: serviceData.slug,
        name: serviceData.name,
        description: `Professional ${serviceData.name.toLowerCase()} services in the Niagara region`,
        commonApplications: [],
        benefits: [],
        considerations: [],
        estimatedDuration: "",
        priceRange: serviceData.averagePricing || {
          min: 0,
          max: 0,
          unit: ""
        },
        relatedServices: []
      } satisfies ServiceType
    })
  )
  return services
}

export default async function Home() {
  const featuredCompanies = await getFeaturedCompanies()
  const popularServices = await getPopularServices()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-primary text-primary-foreground rounded-lg">
        <h1 className="text-4xl font-bold mb-6">Find Trusted Paint Services in Niagara</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Connect with professional painters, suppliers, and paint stores across the Niagara region
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/location/niagara">Browse by Location</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/service/interior-painting">Explore Services</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Directory</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trusted Professionals</h3>
            <p className="text-muted-foreground">
              Connect with verified painting contractors and suppliers in your area
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <Brush className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality Services</h3>
            <p className="text-muted-foreground">
              From interior painting to specialty finishes, find the right service for your needs
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verified Reviews</h3>
            <p className="text-muted-foreground">
              Make informed decisions with authentic customer reviews and ratings
            </p>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Companies</h2>
          <Button asChild variant="ghost">
            <Link href="/companies">View All <Star className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* Popular Services Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Services</h2>
          <Button asChild variant="ghost">
            <Link href="/services">View All <Paintbrush className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="bg-muted rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Service Areas</h2>
          <Button asChild variant="ghost">
            <Link href="/locations">View All <MapPin className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "St. Catharines",
            "Niagara Falls",
            "Welland",
            "Thorold",
            "Fort Erie",
            "Port Colborne",
            "Grimsby",
            "Lincoln"
          ].map((city) => (
            <Link
              key={city}
              href={`/location/${city.toLowerCase().replace(/\s+/g, '-')}`}
              className="p-4 bg-background rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">{city}</h3>
              <p className="text-sm text-muted-foreground mt-1">Paint Services</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
