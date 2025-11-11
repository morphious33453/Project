import { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/src/app/components/JsonLd';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Get answers to common questions about the NSO Trust Index, trust scores, claiming your business, and more.',
};

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is the NSO Trust Index?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The NSO Trust Index is a platform that tracks and ranks businesses in the Niagara region based on their online reputation and trustworthiness. We collect data from multiple sources to calculate comprehensive trust scores.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How is the trust score calculated?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Trust scores are calculated based on five main factors: Online Presence (30%), Customer Reviews (25%), Business Information (20%), Business Citations (15%), and Customer Engagement (10%). Each factor is backed by verified evidence from public sources.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How often are scores updated?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Trust scores are automatically updated daily. Our system collects fresh data from all sources every 24 hours to ensure rankings reflect the most current information.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I claim my business?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Find your business profile and click the "Claim" button. Choose a subscription plan, complete the verification process, and you will get immediate access to your dashboard with detailed insights and recommendations.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I improve my trust score?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! After claiming your profile, you will receive personalized recommendations on how to improve your score. Focus on responding to reviews, maintaining accurate business information, and building your online presence across multiple platforms.'
        }
      }
    ]
  };

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is the NSO Trust Index?',
          answer: 'The NSO Trust Index is a platform that tracks and ranks businesses in the Niagara region based on their online reputation and trustworthiness. We collect data from multiple sources including Google Business Profile, social media, and review sites to calculate comprehensive trust scores.'
        },
        {
          question: 'Which cities and industries do you cover?',
          answer: 'We currently cover St. Catharines, Niagara Falls, and Welland. We track businesses across multiple industries including restaurants, auto repair shops, plumbers, dentists, and more. We are constantly expanding to new cities and verticals.'
        },
        {
          question: 'Is the NSO Trust Index free to use?',
          answer: 'Yes! Viewing leaderboards, business profiles, and trust scores is completely free for everyone. Business owners can claim their profiles with a paid subscription to access advanced features, insights, and tools.'
        }
      ]
    },
    {
      category: 'Trust Scores',
      questions: [
        {
          question: 'How is the trust score calculated?',
          answer: 'Trust scores are calculated based on five main factors: Online Presence (30%), Customer Reviews (25%), Business Information (20%), Business Citations (15%), and Customer Engagement (10%). Each factor is backed by verified evidence from public sources. See our Methodology page for full details.'
        },
        {
          question: 'How often are scores updated?',
          answer: 'Trust scores are automatically updated daily. Our system collects fresh data from all sources every 24 hours at 3:00 AM EST to ensure rankings reflect the most current information.'
        },
        {
          question: 'What sources do you use for scoring?',
          answer: 'We collect data from public sources including Google Business Profile, Facebook, Yelp, industry-specific directories, business listing sites, and more. All evidence is cited and linked in business profiles.'
        },
        {
          question: 'Can my score go down?',
          answer: 'Yes. Trust scores reflect your current online reputation. If you receive negative reviews, remove online listings, or let your business information become outdated, your score may decrease. Regular monitoring and maintenance are important.'
        }
      ]
    },
    {
      category: 'For Business Owners',
      questions: [
        {
          question: 'How do I claim my business?',
          answer: 'Find your business profile and click the "Claim" button. Choose a subscription plan that fits your needs, complete the verification process to confirm you are the business owner, and you will get immediate access to your dashboard with detailed insights and recommendations.'
        },
        {
          question: 'What are the subscription plans?',
          answer: 'We offer four plans: Trust Alerts ($15/month) for basic monitoring, Trust Pro ($129/month) for advanced insights and tools, Premium Badge ($49/month) for displaying your verified badge, and Trust Benchmark ($149 one-time) for comprehensive competitor analysis.'
        },
        {
          question: 'Can I improve my trust score?',
          answer: 'Absolutely! After claiming your profile, you will receive personalized recommendations based on your current score. Common improvements include responding to customer reviews, updating business information, adding photos, building citations, and increasing engagement on social media.'
        },
        {
          question: 'What if my business information is wrong?',
          answer: 'If you have claimed your business, you can update most information through your dashboard. If you haven&apos;t claimed your profile yet, contact us through our Contact page and we will assist you in correcting any inaccuracies.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes. All monthly subscriptions can be canceled at any time. You will retain access to premium features until the end of your current billing period. The Trust Benchmark plan is a one-time payment with no recurring charges.'
        }
      ]
    },
    {
      category: 'For Consumers',
      questions: [
        {
          question: 'How do I use the Trust Index to find businesses?',
          answer: 'Browse leaderboards by city and industry, use our search feature to find specific businesses by name, or explore monthly reports to see top performers and trends. Each business profile shows their trust score and the evidence behind it.'
        },
        {
          question: 'Can I trust the scores?',
          answer: 'Our scores are calculated using objective data from public sources. We cite all evidence and provide full transparency in our methodology. However, we encourage you to review the evidence yourself and use trust scores as one factor in your decision-making.'
        },
        {
          question: 'How do I report incorrect information?',
          answer: 'If you notice incorrect information about a business, please contact us through our Contact page with details. We will investigate and make corrections if the data source allows it.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'Can I export leaderboard data?',
          answer: 'Yes! Every leaderboard page has a "Download CSV" button that lets you export the full rankings with scores, websites, and last updated dates. This is useful for analysis or record-keeping.'
        },
        {
          question: 'How do I embed my trust badge?',
          answer: 'Premium Badge subscribers get access to customizable trust badges that can be embedded on their websites. The badge displays your current trust score and links back to your profile for verification.'
        },
        {
          question: 'Do you have an API?',
          answer: 'Currently, our API is limited to internal use for daily snapshot generation. We are exploring opening a public API for developers in the future. Contact us if you&apos;re interested.'
        }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600">
            Get answers to common questions about the NSO Trust Index
          </p>
        </div>

        {faqs.map((category, catIdx) => (
          <div key={catIdx} className="mb-8">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
              <h2 className="text-xl font-bold">{category.category}</h2>
            </div>
            <div className="bg-white rounded-b-lg shadow-md">
              {category.questions.map((faq, qIdx) => (
                <details
                  key={qIdx}
                  className="border-b last:border-b-0 group"
                >
                  <summary className="px-6 py-4 font-semibold cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-50 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/methodology"
              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center border border-gray-300"
            >
              Read Methodology
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
