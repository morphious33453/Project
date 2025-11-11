export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-96 mb-3"></div>
          <div className="h-5 bg-gray-200 rounded w-80"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div key={i} className="flex items-center gap-6">
                <div className="h-6 bg-gray-200 rounded w-12"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Boxes Skeleton */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
