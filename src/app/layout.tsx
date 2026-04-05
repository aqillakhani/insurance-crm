import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimplyCRM — Insurance Agency Management",
  description: "The modern CRM built for multi-location insurance agencies. Manage customers, policies, payments, renewals, and team performance in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
