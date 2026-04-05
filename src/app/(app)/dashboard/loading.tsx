/**
 * Loading state for dashboard
 */
export default function DashboardLoading() {
  return (
    <div className="p-3 animate-pulse">
      <div className="grid grid-cols-6 gap-2 mb-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded" style={{ borderTop: "3px solid #ddd" }} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <div className="h-8 w-full bg-green-200 rounded" />
          <div className="h-48 w-full bg-gray-100 rounded" />
          <div className="h-8 w-full bg-green-200 rounded" />
          <div className="h-36 w-full bg-gray-100 rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-8 w-full bg-green-200 rounded" />
          <div className="h-48 w-full bg-gray-100 rounded" />
          <div className="h-8 w-full bg-green-200 rounded" />
          <div className="h-24 w-full bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
