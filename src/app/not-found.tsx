import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NSO Trust Index',
  description: 'The page you are looking for could not be found.',
};

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Looking for something specific?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <Link
            href="/"
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-blue-600 mb-1">Home</div>
            <div className="text-sm text-gray-600">Browse cities and verticals</div>
          </Link>
          <Link
            href="/st-catharines/restaurants"
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-blue-600 mb-1">Leaderboards</div>
            <div className="text-sm text-gray-600">See top-ranked businesses</div>
          </Link>
          <Link
            href="/methodology"
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-blue-600 mb-1">Methodology</div>
            <div className="text-sm text-gray-600">How we calculate trust scores</div>
          </Link>
          <Link
            href="/dashboard"
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-blue-600 mb-1">Dashboard</div>
            <div className="text-sm text-gray-600">Preview the owner dashboard</div>
          </Link>
        </div>
      </div>

      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
