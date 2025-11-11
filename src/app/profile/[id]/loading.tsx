export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded w-80 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
        </div>

        {/* Score Card Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-20 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>

        {/* Evidence Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-96"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-4">
          <div className="h-12 bg-gray-200 rounded w-40"></div>
          <div className="h-12 bg-gray-200 rounded w-40"></div>
        </div>
      </div>
    </div>
  );
}
