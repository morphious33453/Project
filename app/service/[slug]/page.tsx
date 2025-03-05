import fs from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"
import { Clock, Check, AlertTriangle, ArrowRight } from "lucide-react"
import { Company, ServiceType } from "@/lib/utils/types"
import { CompanyCard } from "@/components/company-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: {
    slug: string
  }
}

async function getServiceData(slug: string): Promise<{
  service: ServiceType;
  companies: Company[];
} | null> {
  try {
    // Read companies that provide this service
    const content = await fs.readFile(
      path.join(process.cwd(), 'data', 'indexes', 'services', `${slug}.json`),
      'utf-8'
    )
    const companies = JSON.parse(content) as Company[]

    // Create service data from the first company's service info
    const serviceName = companies[0].services.find(s => 
      s.toLowerCase().replace(/\s+/g, '-') === slug
    ) || slug.replace(/-/g, ' ')

    const service: ServiceType = {
      id: slug,
      slug,
      name: serviceName,
      description: `Professional ${serviceName.toLowerCase()} services in the Niagara region`,
      commonApplications: [],
      benefits: [],
      considerations: [],
      estimatedDuration: "",
      priceRange: {
        min: 0,
        max: 0,
        unit: ""
      },
      relatedServices: []
    }

    return { service, companies }
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  const servicesDir = path.join(process.cwd(), 'data', 'indexes', 'services')
  const files = await fs.readdir(servicesDir)
  return files.map(file => ({
    slug: path.basename(file, '.json')
  }))
}

export async function generateMetadata({ params }: Props) {
  const data = await getServiceData(params.slug)
  if (!data) return {}

  const title = `${data.service.name} Services in Niagara | Professional Painters & Contractors`
  const description = `Find trusted ${data.service.name.toLowerCase()} services in the Niagara region. Compare local contractors, view project galleries & get free quotes.`

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

export default async function ServicePage({ params }: Props) {
  const data = await getServiceData(params.slug)
  if (!data) notFound()

  const { service, companies } = data

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="bg-muted rounded-lg p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">{service.name} Services</h1>
          <p className="text-xl text-muted-foreground">
            Find trusted professionals for {service.name.toLowerCase()} services in the Niagara region
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Service Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Service Overview</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p>
                Professional {service.name.toLowerCase()} services are essential for achieving high-quality, 
                long-lasting results. Our directory connects you with experienced contractors and companies 
                that specialize in {service.name.toLowerCase()} throughout the Niagara region.
              </p>
            </div>
          </section>

          {/* Why Choose Professional Service */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Why Choose Professional Service</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium mb-4">Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-500" />
                    <span className="text-muted-foreground">Expert knowledge and experience</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-500" />
                    <span className="text-muted-foreground">Professional-grade materials and equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-500" />
                    <span className="text-muted-foreground">Time and cost-efficient execution</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-500" />
                    <span className="text-muted-foreground">Guaranteed quality and durability</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium mb-4">What to Consider</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
                    <span className="text-muted-foreground">Project scope and timeline</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
                    <span className="text-muted-foreground">Budget and material costs</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
                    <span className="text-muted-foreground">Contractor experience and reviews</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
                    <span className="text-muted-foreground">Warranty and insurance coverage</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Providers */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Service Providers in Niagara</h2>
            <div className="space-y-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} showFullDetails />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Service Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-muted-foreground">
                  Average Project Duration: 2-3 days
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Common Applications</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    <span className="text-sm text-muted-foreground">Residential properties</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    <span className="text-sm text-muted-foreground">Commercial buildings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    <span className="text-sm text-muted-foreground">Industrial facilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Related Services</h2>
            <div className="space-y-3">
              {[
                'Interior Painting',
                'Exterior Painting',
                'Cabinet Refinishing',
                'Deck Staining'
              ].map((service) => (
                <Link
                  key={service}
                  href={`/service/${service.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                >
                  <span className="text-sm">{service}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-lg bg-primary p-6 text-primary-foreground">
            <h2 className="text-lg font-semibold mb-2">Need a Quote?</h2>
            <p className="text-sm mb-4">
              Compare quotes from trusted professionals in your area
            </p>
            <Button asChild className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="#service-providers">View Service Providers</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
