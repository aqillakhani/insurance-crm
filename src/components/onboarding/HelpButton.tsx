"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getOnboardingState, getCompletionPercentage } from "@/modules/onboarding/state";
import { TOUR_MODULES } from "@/modules/onboarding/tours";

/**
 * HelpButton — Floating help button in bottom-right corner.
 * Shows progress indicator if training is incomplete.
 * Opens a mini-menu with quick help options.
 */
export default function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [completion, setCompletion] = useState(100);

  useEffect(() => {
    setCompletion(getCompletionPercentage(TOUR_MODULES.length));
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9990]">
      {/* Menu */}
      {isOpen && (
        <div
          className="absolute bottom-12 right-0 mb-2"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            width: "220px",
            animation: "dropIn 0.15s ease-out",
          }}
        >
          <div
            className="px-3 py-2 font-bold"
            style={{ fontSize: "12px", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}
          >
            Help &amp; Training
          </div>

          <Link
            href="/help"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            style={{ fontSize: "12px", color: "var(--link)", textDecoration: "none" }}
            onClick={() => setIsOpen(false)}
          >
            <span>📚</span>
            <span>Training Center</span>
            {completion < 100 && (
              <span
                className="ml-auto px-1.5 py-0.5"
                style={{
                  background: "var(--status-pending)",
                  color: "white",
                  fontSize: "9px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                {completion}%
              </span>
            )}
          </Link>

          <button
            className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
            style={{ fontSize: "12px", color: "var(--text)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(
                new CustomEvent("start-tour", { detail: { moduleId: "welcome" } })
              );
            }}
          >
            <span>🚀</span>
            <span>Quick Start Tour</span>
          </button>

          <a
            href="/training"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            style={{ fontSize: "12px", color: "var(--text)", textDecoration: "none", borderTop: "1px solid var(--border-light)" }}
            onClick={() => setIsOpen(false)}
          >
            <span>📖</span>
            <span>Documentation</span>
          </a>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "var(--header-bg)",
          color: "white",
          border: "2px solid var(--header-bg-light)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          fontSize: "18px",
          position: "relative",
        }}
        title="Help & Training"
      >
        ?
        {/* Progress ring */}
        {completion < 100 && completion > 0 && (
          <svg
            className="absolute inset-0"
            width="44" height="44"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="22" cy="22" r="20"
              fill="none"
              stroke="var(--btn-green-bg)"
              strokeWidth="2"
              strokeDasharray={`${(completion / 100) * 125.6} 125.6`}
            />
          </svg>
        )}
        {/* Notification dot if incomplete */}
        {completion < 100 && (
          <div
            className="absolute -top-1 -right-1"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--status-pending)",
              border: "2px solid white",
            }}
          />
        )}
      </button>
    </div>
  );
}
