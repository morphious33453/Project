import Link from "next/link"
import { MapPin, Star, Clock, Phone, Mail, Globe, Award } from "lucide-react"
import { Company } from "@/lib/utils/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CompanyCardProps {
  company: Company
  showFullDetails?: boolean
}

export function CompanyCard({ company, showFullDetails = false }: CompanyCardProps) {
  // Function to render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}</span>
        {company.reviewCount && (
          <span className="ml-1 text-sm text-muted-foreground">
            ({company.reviewCount} reviews)
          </span>
        )}
      </div>
    )
  }

  // Check if this is Niagara Region Painters
  const isNiagaraRegionPainters = company.name === "Niagara Region Painters"

  return (
    <Card className={`${isNiagaraRegionPainters ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Link 
                href={`/companies/${company.slug}`}
                className="hover:underline"
              >
                {company.name}
              </Link>
              {isNiagaraRegionPainters && (
                <Award className="ml-2 h-5 w-5 text-primary" />
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {company.type.charAt(0).toUpperCase() + company.type.slice(1)}
            </p>
          </div>
          {company.rating && (
            <div>{renderStars(parseFloat(company.rating))}</div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {company.locations.map((location, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{location.address}, {location.city}</span>
            </div>
          ))}
          {company.phone && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{company.phone}</span>
            </div>
          )}
          {company.email && showFullDetails && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{company.email}</span>
            </div>
          )}
          {company.website && showFullDetails && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
              <Link href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {company.website.replace(/^https?:\/\//, '')}
              </Link>
            </div>
          )}
        </div>

        {showFullDetails && (
          <>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {company.services.map((service, index) => (
                  <Link
                    key={index}
                    href={`/service/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            {company.expertise?.description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {company.expertise.description}
              </p>
            )}

            {company.serviceDetails?.timeEstimates && (
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{company.serviceDetails.timeEstimates}</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
