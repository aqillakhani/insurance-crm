/**
 * Loading state for customer list
 */
export default function CustomersLoading() {
  return (
    <div className="p-3 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-5 w-40 bg-gray-300 rounded" />
        <div className="h-7 w-28 bg-gray-300 rounded" />
      </div>
      <div className="h-10 w-full bg-gray-200 rounded mb-2" />
      <div className="space-y-1">
        <div className="h-8 w-full bg-gray-200 rounded" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-7 w-full bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}
