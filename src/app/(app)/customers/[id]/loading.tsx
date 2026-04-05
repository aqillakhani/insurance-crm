/**
 * Loading state for customer detail — skeleton screen
 */
export default function CustomerDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="px-3 py-1" style={{ background: "#e8eef4", borderBottom: "1px solid var(--border)" }}>
        <div className="h-4 w-64 bg-gray-300 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 py-3">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-gray-300 rounded" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="h-3 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-40 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-36 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 px-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-7 w-24 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-full bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
