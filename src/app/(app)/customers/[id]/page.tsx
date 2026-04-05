import { redirect } from "next/navigation";

/**
 * Customer detail default page — redirects to Policies tab
 * Agency Matrix shows Policies as the default/first tab
 */
export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In Next.js 15, params is a promise — but for redirect we can use a sync approach
  // This will redirect to the policies tab by default
  return redirect("policies");
}
