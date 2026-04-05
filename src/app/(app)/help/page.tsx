"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TOUR_MODULES, getTotalSteps, getTotalMinutes } from "@/modules/onboarding/tours";
import {
  getOnboardingState,
  startModule,
  getCompletionPercentage,
  resetOnboarding,
} from "@/modules/onboarding/state";

/**
 * Help & Training Hub — Central place for all training content.
 * Shows module list, progress, completion status, and allows starting/resuming tours.
 */
export default function HelpPage() {
  const [state, setState] = useState(getOnboardingState());
  const router = useRouter();

  useEffect(() => {
    setState(getOnboardingState());
  }, []);

  const completion = getCompletionPercentage(TOUR_MODULES.length);
  const completedCount = state.completedModules.length;
  const totalModules = TOUR_MODULES.length;

  function handleStartModule(moduleId: string) {
    startModule(moduleId);
    const module = TOUR_MODULES.find((m) => m.id === moduleId);
    if (module) {
      // Dispatch event to TourRunner
      window.dispatchEvent(
        new CustomEvent("start-tour", { detail: { moduleId } })
      );
      router.push(module.route);
    }
  }

  function handleReset() {
    if (confirm("Reset all training progress? You can redo the training from the beginning.")) {
      resetOnboarding();
      setState(getOnboardingState());
    }
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          Help &amp; Training Center
        </h2>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xs"
            style={{
              background: "var(--tab-bg)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Reset Progress
          </button>
        )}
      </div>

      {/* Overall Progress Card */}
      <div
        className="mb-4 p-4"
        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)" }}>
              Admin Training Progress
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
              {completedCount}/{totalModules} modules completed — ~{getTotalMinutes()} minutes total — {getTotalSteps()} steps
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: completion === 100 ? "var(--status-active)" : "var(--link)" }}>
            {completion}%
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${completion}%`,
              height: "100%",
              background: completion === 100 ? "var(--status-active)" : "var(--link)",
              borderRadius: "4px",
              transition: "width 0.5s ease",
            }}
          />
        </div>

        {completion === 100 && (
          <div
            className="mt-3 px-3 py-2 text-center"
            style={{
              background: "#d4edda",
              border: "1px solid #c3e6cb",
              color: "#155724",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            Training Complete — You&apos;re ready to manage the CRM confidently. Revisit any module anytime.
          </div>
        )}
      </div>

      {/* Module Grid */}
      <div className="am-section-green mb-0">Training Modules</div>
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderTop: "none",
        }}
      >
        {TOUR_MODULES.map((module, idx) => {
          const isComplete = state.completedModules.includes(module.id);
          return (
            <div
              key={module.id}
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: idx < TOUR_MODULES.length - 1 ? "1px solid var(--border-light)" : "none",
                background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)",
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "24px" }}>{module.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "13px", fontWeight: "bold", color: "var(--text)" }}>
                      {module.title}
                    </span>
                    {isComplete && (
                      <span
                        className="px-1.5 py-0.5"
                        style={{
                          background: "var(--status-active)",
                          color: "white",
                          fontSize: "9px",
                          fontWeight: "bold",
                          borderRadius: "2px",
                        }}
                      >
                        COMPLETE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>
                    {module.description}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {module.steps.length} steps — ~{module.estimatedMinutes} min
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartModule(module.id)}
                className="px-3 py-1.5 text-xs font-medium flex-shrink-0"
                style={{
                  background: isComplete ? "var(--tab-bg)" : "var(--action-btn-bg)",
                  color: isComplete ? "var(--text)" : "white",
                  border: `1px solid ${isComplete ? "var(--border)" : "var(--action-btn-hover)"}`,
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {isComplete ? "Review" : "Start"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Help Section */}
      <div className="mt-4">
        <div className="am-section-green">Quick Reference</div>
        <div
          className="grid grid-cols-2 gap-0"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}
        >
          {[
            { q: "How do I add a new customer?", a: "Click the green 'Add Customer' button in the top navigation bar, or go to Customers → New." },
            { q: "How do I find a customer?", a: "Go to Customers page and use the search bar. You can search by name, phone, email, or customer ID." },
            { q: "How do I run End of Day?", a: "Click E.O.D. in the navigation bar, select your office and date range, then click Run Report." },
            { q: "How do I send a text to customers?", a: "Go to Comms → SMS Campaigns. Select a customer tag, write your message, and send." },
            { q: "How do I view reports?", a: "Click Reports in the navigation bar. The mega-menu shows all available reports organized by category." },
            { q: "How do I manage users?", a: "Go to Admin → User Management. You can add, edit, and deactivate users, and assign roles and offices." },
            { q: "How do I add a note to a customer?", a: "Open the customer's detail page, go to the Notes tab, and click '+ Add Note'." },
            { q: "Where do I see the producer leaderboard?", a: "The dashboard shows a summary. For the full leaderboard, go to Reports → Producer Leaderboard." },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="px-3 py-2"
              style={{ borderBottom: "1px solid var(--border-light)", borderRight: idx % 2 === 0 ? "1px solid var(--border-light)" : "none" }}
            >
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--link)", marginBottom: "2px" }}>
                {faq.q}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text)" }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
