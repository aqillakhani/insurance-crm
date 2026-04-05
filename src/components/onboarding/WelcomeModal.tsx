"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOnboardingState, markWelcomeSeen, dismissOnboarding } from "@/modules/onboarding/state";
import { getTotalMinutes, TOUR_MODULES } from "@/modules/onboarding/tours";

/**
 * WelcomeModal — Shown once to new admin users.
 * Options: Start Training, Skip for Now, Don't Show Again
 * Professional, non-intrusive design.
 */
export default function WelcomeModal() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const state = getOnboardingState();
    if (!state.hasSeenWelcome && !state.dismissed) {
      // Small delay so the page loads first
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  function handleStart() {
    markWelcomeSeen();
    setShow(false);
    router.push("/help");
  }

  function handleSkip() {
    markWelcomeSeen();
    setShow(false);
  }

  function handleDismiss() {
    dismissOnboarding();
    setShow(false);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)", animation: "fadeIn 0.3s ease-out" }}
    >
      <div
        className="w-full max-w-lg"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          animation: "dropIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4"
          style={{
            background: "linear-gradient(to right, var(--header-bg), var(--header-bg-light))",
            color: "white",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            Welcome to the Insurance CRM
          </div>
          <div style={{ fontSize: "13px", opacity: 0.9, marginTop: "4px" }}>
            Your agency management system is ready to use
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p style={{ fontSize: "13px", color: "var(--text)", lineHeight: "1.6", marginBottom: "16px" }}>
            This CRM has a <strong>built-in guided training system</strong> designed specifically for administrators.
            It will walk you through every major module of the platform, step by step, so you can confidently manage
            your agency's operations.
          </p>

          <div
            className="grid grid-cols-3 gap-3 mb-4"
            style={{ fontSize: "12px" }}
          >
            <div className="text-center p-2" style={{ background: "#f8f9fa", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--link)" }}>
                {TOUR_MODULES.length}
              </div>
              <div style={{ color: "var(--text-secondary)" }}>Training Modules</div>
            </div>
            <div className="text-center p-2" style={{ background: "#f8f9fa", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--status-active)" }}>
                ~{getTotalMinutes()}
              </div>
              <div style={{ color: "var(--text-secondary)" }}>Minutes Total</div>
            </div>
            <div className="text-center p-2" style={{ background: "#f8f9fa", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--status-pending)" }}>
                ✓
              </div>
              <div style={{ color: "var(--text-secondary)" }}>Progress Saved</div>
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
            You can pause and resume training anytime. Access it later from the Help &amp; Training section.
          </p>
        </div>

        {/* Actions */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ borderTop: "1px solid var(--border)", background: "#f8f9fa" }}
        >
          <button
            onClick={handleDismiss}
            className="text-xs"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "11px",
              textDecoration: "underline",
            }}
          >
            Don&apos;t show again
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleSkip}
              className="px-4 py-1.5 text-xs font-medium"
              style={{
                background: "var(--tab-bg)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              Skip for Now
            </button>
            <button
              onClick={handleStart}
              className="px-4 py-1.5 text-xs font-bold"
              style={{
                background: "var(--btn-green-bg)",
                color: "white",
                border: "1px solid var(--btn-green-hover)",
                borderRadius: "2px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Start Training →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
