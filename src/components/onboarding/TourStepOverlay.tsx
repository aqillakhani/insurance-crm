"use client";

import { useEffect, useState, useCallback } from "react";
import type { TourStep, TourModule } from "@/modules/onboarding/tours";

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

  // Escape key to exit tour
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onSkip();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft" && !isFirst) onPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onSkip, onNext, onPrev, isFirst]);

  const isCentered = !step.targetSelector || !targetRect;

  // Tooltip card content (reused in both modes)
  const tooltipCard = (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        width: "420px",
        maxWidth: "calc(100vw - 32px)",
        animation: "dropIn 0.2s ease-out",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "var(--header-bg)", color: "white", fontSize: "11px" }}
      >
        <span>{module.icon} {module.title} — Step {stepIndex + 1}/{totalSteps}</span>
        <button
          onClick={onSkip}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "16px", padding: "2px 6px", lineHeight: 1 }}
          title="Close tour (Esc)"
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

        {step.tips && step.tips.length > 0 && (
          <div className="mt-3 px-3 py-2" style={{ background: "#f0f7ff", border: "1px solid #d0e3f7", fontSize: "11px", lineHeight: "1.5" }}>
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
          style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "11px" }}
        >
          Exit Tour
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "6px", height: "6px", borderRadius: "50%",
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
              style={{ background: "var(--tab-bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer" }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={onNext}
            className="px-3 py-1 text-xs font-bold"
            style={{ background: isLast ? "var(--btn-green-bg)" : "var(--action-btn-bg)", color: "white", border: "none", borderRadius: "2px", cursor: "pointer" }}
          >
            {isLast ? "Complete ✓" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );

  // Centered modal mode (no target element)
  if (isCentered) {
    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
        {tooltipCard}
      </div>
    );
  }

  // Positioned mode (highlight target element)
  const pos = step.position || "bottom";
  const gap = 12;
  let tooltipStyle: React.CSSProperties = { position: "fixed", zIndex: 9999 };

  if (targetRect) {
    switch (pos) {
      case "bottom":
        tooltipStyle.top = targetRect.bottom + gap;
        tooltipStyle.left = Math.max(16, Math.min(targetRect.left + targetRect.width / 2 - 210, window.innerWidth - 440));
        break;
      case "top":
        tooltipStyle.bottom = window.innerHeight - targetRect.top + gap;
        tooltipStyle.left = Math.max(16, Math.min(targetRect.left + targetRect.width / 2 - 210, window.innerWidth - 440));
        break;
      case "right":
        tooltipStyle.top = Math.max(16, targetRect.top);
        tooltipStyle.left = Math.min(targetRect.right + gap, window.innerWidth - 440);
        break;
      case "left":
        tooltipStyle.top = Math.max(16, targetRect.top);
        tooltipStyle.right = window.innerWidth - targetRect.left + gap;
        break;
    }
  }

  return (
    <>
      {/* Dim backdrop — clicking it exits the tour */}
      <div
        className="fixed inset-0 z-[9997]"
        style={{ background: "rgba(0,0,0,0.35)" }}
        onClick={onSkip}
      />

      {/* Highlight ring around target */}
      {targetRect && (
        <div
          className="fixed z-[9998]"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
            border: "2px dashed var(--btn-green-bg)",
            borderRadius: "4px",
            background: "rgba(255,255,255,0.1)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Tooltip card */}
      <div style={tooltipStyle}>
        {tooltipCard}
      </div>
    </>
  );
}
