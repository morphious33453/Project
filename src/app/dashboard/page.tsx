import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Dashboard - NSO Trust Index',
  description: 'Manage your business trust profile and track your performance.',
};

export default function DashboardPage() {
  // MVP: Static placeholder dashboard
  // Future: Add authentication and dynamic data

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Track your trust score, monitor competitors, and access tools to improve your ranking.
        </p>
      </div>

      {/* Auth Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h2 className="font-semibold text-blue-900 mb-2">Authentication Coming Soon</h2>
        <p className="text-blue-800 text-sm">
          This is a preview of the dashboard interface. Full authentication and personalized
          data will be available after claiming your business profile.
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-500 mb-2">Current Trust Score</div>
          <div className="flex items-baseline">
            <div className="text-4xl font-bold text-blue-600">87</div>
            <div className="text-lg text-gray-400 ml-2">/100</div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            +5 from last week
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-500 mb-2">Current Ranking</div>
          <div className="flex items-baseline">
            <div className="text-4xl font-bold text-gray-900">#3</div>
            <div className="text-lg text-gray-400 ml-2">of 24</div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Up 2 positions
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-500 mb-2">Actions This Week</div>
          <div className="text-4xl font-bold text-gray-900">7</div>
          <div className="mt-2 text-sm text-gray-600">
            Recommendations completed
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Recommended Actions</h2>
        <p className="text-gray-600 mb-6">
          Complete these actions to improve your trust score:
        </p>
        <div className="space-y-4">
          <div className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
              1
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold mb-1">Respond to recent reviews</h3>
              <p className="text-sm text-gray-600">
                You have 3 reviews from the past week without responses. Engaging with reviews
                can boost your score by up to 5 points.
              </p>
            </div>
            <button className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded">
              View Reviews
            </button>
          </div>

          <div className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
              2
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold mb-1">Update business hours</h3>
              <p className="text-sm text-gray-600">
                Your hours haven't been updated in 6 months. Accurate information builds trust.
              </p>
            </div>
            <button className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded">
              Update Now
            </button>
          </div>

          <div className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
              3
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold mb-1">Add professional photos</h3>
              <p className="text-sm text-gray-600">
                Businesses with 10+ photos get 30% more engagement. You currently have 4.
              </p>
            </div>
            <button className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded">
              Upload Photos
            </button>
          </div>
        </div>
      </div>

      {/* Marketing Tools */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Marketing Tools to Stand Out</h2>
        <p className="text-blue-100 mb-6">
          Amplify your online presence with professional marketing materials:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://niagarastandsout.ca/collections/custom-labels-canada?utm_source=trust&utm_medium=dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold mb-2">Custom Labels & Stickers</h3>
            <p className="text-sm text-blue-100 mb-3">
              Professional labels for products, packaging, and branding
            </p>
            <div className="text-sm font-medium">Shop Now →</div>
          </a>

          <a
            href="https://niagarastandsout.ca/collections/asset-tags?utm_source=trust&utm_medium=dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold mb-2">Asset Tags</h3>
            <p className="text-sm text-blue-100 mb-3">
              Durable tags for equipment, inventory, and asset tracking
            </p>
            <div className="text-sm font-medium">Shop Now →</div>
          </a>

          <a
            href="https://niagarastandsout.ca/products/complete-bathroom-marketing-kit?utm_source=trust&utm_medium=dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold mb-2">Bathroom Marketing Kit</h3>
            <p className="text-sm text-blue-100 mb-3">
              Complete DIY kit with QR codes and review prompts
            </p>
            <div className="text-sm font-medium">Shop Now →</div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-600">2 hours ago</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-900">Score increased from 82 to 87</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-gray-600">1 day ago</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-900">New review received (5 stars)</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-gray-600">3 days ago</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-900">Competitor moved up in ranking</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-600">5 days ago</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-900">Profile claimed successfully</span>
          </div>
        </div>
      </div>
    </div>
  );
}
