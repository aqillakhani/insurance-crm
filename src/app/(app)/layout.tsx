import AppHeader from "@/components/layout/AppHeader";
import TopNavBar from "@/components/layout/TopNavBar";
import FooterBar from "@/components/layout/FooterBar";
import WelcomeModal from "@/components/onboarding/WelcomeModal";
import TourRunner from "@/components/onboarding/TourRunner";
import HelpButton from "@/components/onboarding/HelpButton";

/**
 * Authenticated App Layout — matches Agency Matrix shell + onboarding layer
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div data-tour="app-header">
        <AppHeader />
      </div>
      <div data-tour="top-nav">
        <TopNavBar />
      </div>
      <main className="flex-1" style={{ background: "var(--bg)" }}>
        {children}
      </main>
      <div data-tour="footer">
        <FooterBar />
      </div>

      {/* Onboarding layer — non-intrusive, on top of everything */}
      <WelcomeModal />
      <TourRunner />
      <HelpButton />
    </div>
  );
}
