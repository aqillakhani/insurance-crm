import { redirect } from "next/navigation";

/**
 * Training page — redirects to the Help & Training Hub
 */
export default function TrainingPage() {
  redirect("/help");
}
