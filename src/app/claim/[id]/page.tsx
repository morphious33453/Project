import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { qOne } from "@/src/lib/db";

interface PageProps {
  params: {
    id: string;
  };
}

interface Business {
  id: string;
  name: string;
  city: string;
  vertical: string;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const business = await qOne<Business>(`
    SELECT id, name, city, vertical
    FROM businesses
    WHERE id = $1
  `, [params.id]);

  if (!business) {
    return {
      title: 'Business Not Found',
    };
  }

  return {
    title: `Claim ${business.name} - NSO Trust Index`,
    description: `Claim your business profile and get access to insights, alerts, and tools to improve your trust score.`,
  };
}

export default async function ClaimPage({ params }: PageProps) {
  const business = await qOne<Business>(`
    SELECT id, name, city, vertical
    FROM businesses
    WHERE id = $1
  `, [params.id]);

  if (!business) {
    notFound();
  }

  const cityName = business.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const verticalName = business.vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const plans = [
    {
      name: 'Alerts',
      price: '$9/mo',
      features: [
        'Weekly score updates via email',
        'Competitor ranking alerts',
        'Basic evidence tracking',
        'Email support'
      ],
      link: process.env.CLAIM_LINK_ALERTS || '#',
      color: 'blue'
    },
    {
      name: 'Pro',
      price: '$29/mo',
      features: [
        'Everything in Alerts',
        'Daily score updates',
        'Advanced analytics dashboard',
        'Claim verification badge',
        'Priority support'
      ],
      link: process.env.CLAIM_LINK_PRO || '#',
      color: 'blue',
      popular: true
    },
    {
      name: 'Premium',
      price: '$79/mo',
      features: [
        'Everything in Pro',
        'Real-time score monitoring',
        'Custom evidence submission',
        'API access',
        'White-label reporting',
        'Dedicated account manager'
      ],
      link: process.env.CLAIM_LINK_PREMIUM || '#',
      color: 'blue'
    },
    {
      name: 'Benchmark',
      price: '$199/mo',
      features: [
        'Everything in Premium',
        'Multi-location management',
        'Competitive intelligence',
        'Custom integrations',
        'Quarterly strategy reviews',
        'On-demand consulting'
      ],
      link: process.env.CLAIM_LINK_BENCHMARK || '#',
      color: 'blue'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${business.city}/${business.vertical}`} className="hover:text-blue-600">
          {cityName} {verticalName}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/profile/${business.id}`} className="hover:text-blue-600">
          {business.name}
        </Link>
        <span className="mx-2">/</span>
        <span>Claim</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          Claim {business.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Verify ownership and unlock powerful tools to improve your trust score
          and stand out from competitors.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg shadow-md p-6 flex flex-col relative ${
              plan.popular ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Choose {plan.name}
            </a>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How does claiming work?</h3>
            <p className="text-gray-600 text-sm">
              After selecting a plan, you'll receive a verification email to confirm business ownership.
              Once verified, you'll get immediate access to your dashboard and premium features.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600 text-sm">
              Yes! All plans are month-to-month with no long-term commitments. Cancel anytime from your dashboard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What if I have multiple locations?</h3>
            <p className="text-gray-600 text-sm">
              The Benchmark plan includes multi-location management. Contact us for custom enterprise pricing
              if you need to manage 5+ locations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-gray-600 text-sm">
              We offer a 14-day money-back guarantee on all plans. Try any plan risk-free.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Reminder */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold mb-3">Boost Your Visibility</h2>
        <p className="text-gray-700 mb-4">
          Combine your claimed profile with professional marketing materials:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://niagarastandsout.ca/collections/custom-labels-canada?utm_source=trust"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Custom Labels
          </a>
          <a
            href="https://niagarastandsout.ca/collections/asset-tags?utm_source=trust"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Asset Tags
          </a>
          <a
            href="https://niagarastandsout.ca/products/complete-bathroom-marketing-kit?utm_source=trust"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Bathroom Marketing Kit
          </a>
        </div>
      </div>
    </div>
  );
}
