'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to console in development
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Something Went Wrong</h2>
        <p className="text-xl text-gray-600 mb-4">
          We encountered an unexpected error while loading this page.
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 font-mono bg-gray-100 p-2 rounded inline-block">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 text-left">
        <h3 className="font-semibold text-red-900 mb-2">What happened?</h3>
        <p className="text-red-800 text-sm mb-4">
          {error.message || 'An unexpected error occurred. Our team has been notified.'}
        </p>
        <details className="text-sm">
          <summary className="cursor-pointer text-red-700 font-medium mb-2">
            Technical Details
          </summary>
          <pre className="text-xs bg-red-100 p-3 rounded overflow-auto text-red-900">
            {error.stack || error.toString()}
          </pre>
        </details>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
