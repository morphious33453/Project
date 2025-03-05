import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { ServiceType } from "@/lib/utils/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  service: ServiceType
  showFullDetails?: boolean
}

export function ServiceCard({ service, showFullDetails = false }: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>{service.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {service.description}
        </p>

        {showFullDetails ? (
          <>
            {service.commonApplications && service.commonApplications.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Common Applications</h4>
                <ul className="space-y-1">
                  {service.commonApplications.map((application, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Benefits</h4>
                <ul className="space-y-1">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.estimatedDuration && (
              <div className="flex items-center mt-4 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Duration: {service.estimatedDuration}</span>
              </div>
            )}

            {service.priceRange && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">Price Range</h4>
                <p className="text-sm text-muted-foreground">
                  ${service.priceRange.min} - ${service.priceRange.max} {service.priceRange.unit}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4">
            <Link
              href={`/service/${service.slug}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Learn more
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
