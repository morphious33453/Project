import fs from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"
import { MapPin, Phone, Mail, Globe, Star, Clock, Award, Shield } from "lucide-react"
import { Company } from "@/lib/utils/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: {
    slug: string
  }
}

async function getCompany(slug: string): Promise<Company | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), 'data', 'companies', `${slug}.json`),
      'utf-8'
    )
    return JSON.parse(content) as Company
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  const companiesDir = path.join(process.cwd(), 'data', 'companies')
  const files = await fs.readdir(companiesDir)
  return files.map(file => ({
    slug: path.basename(file, '.json')
  }))
}

export async function generateMetadata({ params }: Props) {
  const company = await getCompany(params.slug)
  if (!company) return {}

  const title = `${company.name} - ${company.type} in ${company.locations[0]?.city || 'Niagara'}`
  const description = company.expertise?.description || 
    `${company.name} provides professional ${company.services.join(', ')} services in ${company.locations.map(l => l.city).join(', ')}.`

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

export default async function CompanyPage({ params }: Props) {
  const company = await getCompany(params.slug)
  if (!company) notFound()

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="bg-muted rounded-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {company.type.charAt(0).toUpperCase() + company.type.slice(1)}
            </p>
            {company.rating && (
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-2 font-medium">{company.rating}</span>
                {company.reviewCount && (
                  <span className="ml-1 text-muted-foreground">
                    ({company.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {company.phone && (
              <Button asChild variant="outline">
                <Link href={`tel:${company.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Link>
              </Button>
            )}
            {company.website && (
              <Button asChild variant="outline">
                <Link href={company.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          {company.expertise?.description && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">{company.expertise.description}</p>
            </section>
          )}

          {/* Services Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {company.services.map((service, index) => (
                <Link
                  key={index}
                  href={`/service/${service.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{service}</h3>
                </Link>
              ))}
            </div>
          </section>

          {/* Service Process */}
          {company.serviceDetails?.process && company.serviceDetails.process.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
              <div className="space-y-4">
                {company.serviceDetails.process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {index + 1}
                    </div>
                    <p className="ml-4 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tips & Advice */}
          {company.tips && (Object.values(company.tips).some(arr => arr && arr.length > 0)) && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Tips & Advice</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {company.tips.maintenance && company.tips.maintenance.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Maintenance Tips</h3>
                    <ul className="space-y-2">
                      {company.tips?.maintenance?.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {company.tips.colorSelection && company.tips.colorSelection.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Color Selection Tips</h3>
                    <ul className="space-y-2">
                      {company.tips?.colorSelection?.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              {company.locations.map((location, index) => (
                <div key={index} className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {location.address}, {location.city}
                  </span>
                </div>
              ))}
              {company.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="text-muted-foreground">{company.phone}</span>
                </div>
              )}
              {company.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="text-muted-foreground">{company.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Business Hours */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Business Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-muted-foreground">
                  {company.yearsInBusiness} Years in Business
                </span>
              </div>
              {company.expertise?.certifications && company.expertise.certifications.length > 0 && (
                <div className="flex items-start">
                  <Award className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Certifications</span>
                    <ul className="mt-2 space-y-1">
                      {company.expertise.certifications.map((cert, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
