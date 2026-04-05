"use client";

import { useEffect, useState, useCallback } from "react";
import type { TourStep, TourModule } from "@/modules/onboarding/tours";

/**
 * TourStepOverlay — Highlights a UI element and shows an explanation tooltip.
 * If no target element, shows as centered modal.
 * Professional, non-intrusive, easy to dismiss.
 */

interface TourStepOverlayProps {
  step: TourStep;
  module: TourModule;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function TourStepOverlay({
  step,
  module,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  isFirst,
  isLast,
}: TourStepOverlayProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const findTarget = useCallback(() => {
    if (!step.targetSelector) {
      setTargetRect(null);
      return;
    }
    const el = document.querySelector(step.targetSelector);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
    } else {
      setTargetRect(null);
    }
  }, [step.targetSelector]);

  useEffect(() => {
    findTarget();
    window.addEventListener("resize", findTarget);
    window.addEventListener("scroll", findTarget);
    return () => {
      window.removeEventListener("resize", findTarget);
      window.removeEventListener("scroll", findTarget);
    };
  }, [findTarget]);

  // If target exists, position tooltip near it. Otherwise, center modal.
  const isCentered = !step.targetSelector || !targetRect;

  // Calculate tooltip position
  let tooltipStyle: React.CSSProperties = {};
  if (!isCentered && targetRect) {
    const pos = step.position || "bottom";
    const gap = 12;
    switch (pos) {
      case "bottom":
        tooltipStyle = {
          position: "fixed",
          top: targetRect.bottom + gap,
          left: Math.max(16, targetRect.left + targetRect.width / 2 - 200),
        };
        break;
      case "top":
        tooltipStyle = {
          position: "fixed",
          bottom: window.innerHeight - targetRect.top + gap,
          left: Math.max(16, targetRect.left + targetRect.width / 2 - 200),
        };
        break;
      case "right":
        tooltipStyle = {
          position: "fixed",
          top: Math.max(16, targetRect.top),
          left: targetRect.right + gap,
        };
        break;
      case "left":
        tooltipStyle = {
          position: "fixed",
          top: Math.max(16, targetRect.top),
          right: window.innerWidth - targetRect.left + gap,
        };
        break;
    }
  }

  return (
    <div className="fixed inset-0 z-[9998]" style={{ pointerEvents: "auto" }}>
      {/* Backdrop with cutout for target element */}
      {!isCentered && targetRect ? (
        <svg className="fixed inset-0 w-full h-full" style={{ zIndex: 9998 }}>
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - 4}
                y={targetRect.top - 4}
                width={targetRect.width + 8}
                height={targetRect.height + 8}
                rx="4"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0" y="0"
            width="100%" height="100%"
            fill="rgba(0,0,0,0.4)"
            mask="url(#tour-mask)"
          />
          {/* Highlight border around target */}
          <rect
            x={targetRect.left - 4}
            y={targetRect.top - 4}
            width={targetRect.width + 8}
            height={targetRect.height + 8}
            rx="4"
            fill="none"
            stroke="var(--btn-green-bg)"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
        </svg>
      ) : (
        <div
          className="fixed inset-0"
          style={{ background: "rgba(0,0,0,0.4)", zIndex: 9998 }}
          onClick={onSkip}
        />
      )}

      {/* Tooltip / Modal */}
      <div
        className={isCentered ? "fixed inset-0 flex items-center justify-center" : ""}
        style={{ zIndex: 9999 }}
      >
        <div
          style={{
            ...tooltipStyle,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            width: "400px",
            maxWidth: "calc(100vw - 32px)",
            animation: "dropIn 0.2s ease-out",
            ...(isCentered ? { position: "relative" } : {}),
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              background: "var(--header-bg)",
              color: "white",
              fontSize: "11px",
            }}
          >
            <span>
              {module.icon} {module.title} — Step {stepIndex + 1}/{totalSteps}
            </span>
            <button
              onClick={onSkip}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: "14px",
                padding: "0 2px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-3">
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "8px" }}>
              {step.title}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text)", lineHeight: "1.6" }}>
              {step.content}
            </div>

            {/* Tips list */}
            {step.tips && step.tips.length > 0 && (
              <div
                className="mt-3 px-3 py-2"
                style={{
                  background: "#f0f7ff",
                  border: "1px solid #d0e3f7",
                  fontSize: "11px",
                  lineHeight: "1.5",
                }}
              >
                {step.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <span style={{ color: "var(--link)", flexShrink: 0 }}>•</span>
                    <span style={{ color: "var(--text)" }}>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ borderTop: "1px solid var(--border-light)", background: "#f8f9fa" }}
          >
            <button
              onClick={onSkip}
              className="text-xs"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              Exit Tour
            </button>

            {/* Progress dots */}
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: i === stepIndex ? "var(--link)" : i < stepIndex ? "var(--status-active)" : "#ddd",
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {!isFirst && (
                <button
                  onClick={onPrev}
                  className="px-3 py-1 text-xs"
                  style={{
                    background: "var(--tab-bg)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={onNext}
                className="px-3 py-1 text-xs font-bold"
                style={{
                  background: isLast ? "var(--btn-green-bg)" : "var(--action-btn-bg)",
                  color: "white",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {isLast ? "Complete ✓" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
