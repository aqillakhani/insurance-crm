"use client";

import { useState, useEffect, useRef } from "react";
import {
  TRAINING_MODULES,
  getTrainingTotalSections,
  getTrainingTotalMinutes,
} from "@/modules/onboarding/training-content";
import type { TrainingModule, TrainingSection } from "@/modules/onboarding/training-content";

const STORAGE_KEY = "crm-training-progress";

function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch { return {}; }
}

function saveProgress(p: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function TrainingGuidePage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [activeModule, setActiveModule] = useState(TRAINING_MODULES[0].id);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const totalSections = getTrainingTotalSections();
  const completedCount = Object.values(progress).filter(Boolean).length;
  const completionPct = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  function toggleComplete(sectionId: string) {
    const next = { ...progress, [sectionId]: !progress[sectionId] };
    setProgress(next);
    saveProgress(next);
  }

  function getModuleProgress(mod: TrainingModule): number {
    const completed = mod.sections.filter(s => progress[s.id]).length;
    return mod.sections.length > 0 ? Math.round((completed / mod.sections.length) * 100) : 0;
  }

  function scrollToSection(sectionId: string) {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  }

  function handleModuleClick(modId: string) {
    setActiveModule(modId);
    setActiveSection(null);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }

  // Find next incomplete section
  function goToNextIncomplete() {
    for (const mod of TRAINING_MODULES) {
      for (const sec of mod.sections) {
        if (!progress[sec.id]) {
          setActiveModule(mod.id);
          setTimeout(() => scrollToSection(sec.id), 100);
          return;
        }
      }
    }
  }

  const currentModule = TRAINING_MODULES.find(m => m.id === activeModule);

  // Filter modules by search
  const filteredModules = searchTerm
    ? TRAINING_MODULES.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.sections.some(s =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : TRAINING_MODULES;

  return (
    <div className="flex h-[calc(100vh-82px)]" style={{ background: "#f8f9fb" }}>

      {/* ===================== LEFT SIDEBAR ===================== */}
      <div
        className="flex-shrink-0 flex flex-col border-r overflow-hidden"
        style={{
          width: sidebarOpen ? "300px" : "0px",
          transition: "width 0.2s ease",
          background: "#ffffff",
          borderColor: "var(--border)",
        }}
      >
        {sidebarOpen && (
          <>
            {/* Sidebar Header */}
            <div className="p-3 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e" }}>
                  Training Guide
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#999" }}
                >
                  ✕
                </button>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between mb-1" style={{ fontSize: "11px", color: "#666" }}>
                  <span>{completedCount}/{totalSections} sections</span>
                  <span style={{ fontWeight: "bold", color: completionPct === 100 ? "#16a34a" : "#2563eb" }}>
                    {completionPct}%
                  </span>
                </div>
                <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{
                    width: `${completionPct}%`,
                    height: "100%",
                    background: completionPct === 100 ? "#16a34a" : "#2563eb",
                    borderRadius: "2px",
                    transition: "width 0.4s ease",
                  }} />
                </div>
              </div>

              {/* Search */}
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search topics..."
                className="w-full px-2 py-1.5"
                style={{ border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "12px", outline: "none" }}
              />
            </div>

            {/* Module list */}
            <div className="flex-1 overflow-y-auto py-1">
              {filteredModules.map(mod => {
                const modPct = getModuleProgress(mod);
                const isActive = mod.id === activeModule;
                return (
                  <div key={mod.id}>
                    {/* Module header */}
                    <button
                      onClick={() => handleModuleClick(mod.id)}
                      className="w-full text-left px-3 py-2 flex items-center gap-2"
                      style={{
                        background: isActive ? "#eff6ff" : "transparent",
                        borderLeft: isActive ? "3px solid #2563eb" : "3px solid transparent",
                        cursor: "pointer",
                        border: "none",
                        borderBottom: "none",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>{mod.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span style={{
                            fontSize: "12px",
                            fontWeight: isActive ? "700" : "500",
                            color: isActive ? "#1e40af" : "#374151",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                            {mod.title}
                          </span>
                          {modPct === 100 && <span style={{ fontSize: "11px", color: "#16a34a" }}>✓</span>}
                        </div>
                        <div style={{ fontSize: "10px", color: "#9ca3af", marginTop: "1px" }}>
                          {mod.sections.length} sections · ~{mod.estimatedMinutes} min
                          {modPct > 0 && modPct < 100 && <span style={{ color: "#2563eb" }}> · {modPct}%</span>}
                        </div>
                      </div>
                    </button>

                    {/* Section links when module is active */}
                    {isActive && (
                      <div className="pl-8 pr-2 pb-1">
                        {mod.sections.map(sec => (
                          <button
                            key={sec.id}
                            onClick={() => scrollToSection(sec.id)}
                            className="w-full text-left px-2 py-1 flex items-center gap-1.5 rounded"
                            style={{
                              background: activeSection === sec.id ? "#e0e7ff" : "transparent",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "11px",
                              color: progress[sec.id] ? "#16a34a" : activeSection === sec.id ? "#1e40af" : "#6b7280",
                              transition: "background 0.1s ease",
                            }}
                          >
                            <span style={{ fontSize: "10px", width: "14px", textAlign: "center" }}>
                              {progress[sec.id] ? "✓" : "○"}
                            </span>
                            <span style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              textDecoration: progress[sec.id] ? "line-through" : "none",
                              opacity: progress[sec.id] ? 0.6 : 1,
                            }}>
                              {sec.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Resume button */}
            {completionPct > 0 && completionPct < 100 && (
              <div className="p-3 border-t" style={{ borderColor: "#e5e7eb" }}>
                <button
                  onClick={goToNextIncomplete}
                  className="w-full py-2 text-xs font-semibold rounded"
                  style={{ background: "#2563eb", color: "white", border: "none", cursor: "pointer", borderRadius: "6px" }}
                >
                  Continue Where You Left Off →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Sticky top bar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
          style={{ background: "#ffffff", borderColor: "#e5e7eb" }}
        >
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#666" }}
              >
                ☰
              </button>
            )}
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e" }}>
              {currentModule?.icon} {currentModule?.title}
            </span>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
              · {currentModule?.sections.length} sections · ~{currentModule?.estimatedMinutes} min
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Module progress */}
            <div className="flex items-center gap-2" style={{ fontSize: "11px", color: "#6b7280" }}>
              <div style={{ width: "80px", height: "4px", background: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                  width: `${currentModule ? getModuleProgress(currentModule) : 0}%`,
                  height: "100%",
                  background: "#2563eb",
                  borderRadius: "2px",
                  transition: "width 0.3s ease",
                }} />
              </div>
              <span>{currentModule ? getModuleProgress(currentModule) : 0}%</span>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-6">

            {/* Module intro */}
            {currentModule && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontSize: "32px" }}>{currentModule.icon}</span>
                  <div>
                    <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", margin: 0, lineHeight: 1.2 }}>
                      {currentModule.title}
                    </h1>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0 0" }}>
                      {currentModule.estimatedMinutes} min read · {currentModule.sections.length} sections
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  {currentModule.description}
                </p>
              </div>
            )}

            {/* Sections */}
            {currentModule?.sections.map((section, secIdx) => (
              <SectionCard
                key={section.id}
                section={section}
                isCompleted={!!progress[section.id]}
                onToggleComplete={() => toggleComplete(section.id)}
                sectionNumber={secIdx + 1}
                totalSections={currentModule.sections.length}
                onNextSection={() => {
                  if (secIdx + 1 < currentModule.sections.length) {
                    scrollToSection(currentModule.sections[secIdx + 1].id);
                  } else {
                    // Find next module
                    const modIdx = TRAINING_MODULES.findIndex(m => m.id === currentModule.id);
                    if (modIdx + 1 < TRAINING_MODULES.length) {
                      handleModuleClick(TRAINING_MODULES[modIdx + 1].id);
                    }
                  }
                }}
              />
            ))}

            {/* Module completion */}
            {currentModule && getModuleProgress(currentModule) === 100 && (
              <div
                className="p-4 mb-6 text-center rounded-lg"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🎉</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#166534" }}>
                  Module Complete!
                </div>
                <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>
                  You&apos;ve finished all sections in &quot;{currentModule.title}&quot;
                </div>
                {(() => {
                  const idx = TRAINING_MODULES.findIndex(m => m.id === currentModule.id);
                  if (idx + 1 < TRAINING_MODULES.length) {
                    const next = TRAINING_MODULES[idx + 1];
                    return (
                      <button
                        onClick={() => handleModuleClick(next.id)}
                        className="mt-3 px-4 py-2 text-xs font-semibold rounded"
                        style={{ background: "#2563eb", color: "white", border: "none", cursor: "pointer", borderRadius: "6px" }}
                      >
                        Next: {next.icon} {next.title} →
                      </button>
                    );
                  }
                  return null;
                })()}
              </div>
            )}

            {/* Final completion */}
            {completionPct === 100 && (
              <div
                className="p-6 mb-6 text-center rounded-lg"
                style={{ background: "linear-gradient(135deg, #eff6ff, #f0fdf4)", border: "1px solid #bbf7d0" }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>🏆</div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#166534" }}>
                  Training Complete!
                </div>
                <div style={{ fontSize: "13px", color: "#15803d", marginTop: "8px", lineHeight: 1.6 }}>
                  You&apos;ve completed all {totalSections} sections across {TRAINING_MODULES.length} modules.
                  You&apos;re now equipped to manage the Insurance CRM with full confidence.
                  Revisit any section anytime using the sidebar.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== SECTION CARD COMPONENT =====================

function SectionCard({
  section,
  isCompleted,
  onToggleComplete,
  sectionNumber,
  totalSections,
  onNextSection,
}: {
  section: TrainingSection;
  isCompleted: boolean;
  onToggleComplete: () => void;
  sectionNumber: number;
  totalSections: number;
  onNextSection: () => void;
}) {
  return (
    <div
      id={`section-${section.id}`}
      className="mb-6 rounded-lg overflow-hidden"
      style={{
        background: "#ffffff",
        border: `1px solid ${isCompleted ? "#bbf7d0" : "#e5e7eb"}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid #f3f4f6" }}>
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: "24px",
              height: "24px",
              fontSize: "11px",
              fontWeight: "600",
              background: isCompleted ? "#16a34a" : "#e5e7eb",
              color: isCompleted ? "white" : "#6b7280",
            }}
          >
            {isCompleted ? "✓" : sectionNumber}
          </span>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a2e", margin: 0 }}>
            {section.title}
          </h3>
        </div>
        <span style={{ fontSize: "10px", color: "#9ca3af" }}>
          {sectionNumber}/{totalSections}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: "0 0 16px 0" }}>
          {section.content}
        </p>

        {/* Steps */}
        {section.steps && section.steps.length > 0 && (
          <div className="mb-4">
            {section.steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-3 py-2 px-3 mb-1 rounded"
                style={{
                  background: step.type === "warning" ? "#fef2f2" : step.type === "tip" ? "#f0fdf4" : step.type === "info" ? "#eff6ff" : "#f9fafb",
                  border: `1px solid ${step.type === "warning" ? "#fecaca" : step.type === "tip" ? "#bbf7d0" : step.type === "info" ? "#bfdbfe" : "#f3f4f6"}`,
                  fontSize: "12px",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ flexShrink: 0, fontSize: "11px", marginTop: "2px" }}>
                  {step.type === "warning" ? "⚠️" : step.type === "tip" ? "💡" : step.type === "info" ? "ℹ️" : "→"}
                </span>
                <span style={{ color: "#374151" }}>{step.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Real world example */}
        {section.realWorld && (
          <div
            className="mb-4 px-4 py-3 rounded"
            style={{ background: "#fefce8", border: "1px solid #fde68a", fontSize: "12px", lineHeight: 1.6 }}
          >
            <div style={{ fontWeight: "600", color: "#92400e", marginBottom: "4px", fontSize: "11px" }}>
              📌 REAL-WORLD EXAMPLE
            </div>
            <div style={{ color: "#78350f" }}>{section.realWorld}</div>
          </div>
        )}

        {/* Pro tips */}
        {section.proTips && section.proTips.length > 0 && (
          <div
            className="mb-4 px-4 py-3 rounded"
            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", fontSize: "12px", lineHeight: 1.6 }}
          >
            <div style={{ fontWeight: "600", color: "#166534", marginBottom: "6px", fontSize: "11px" }}>
              💡 PRO TIPS
            </div>
            {section.proTips.map((tip, i) => (
              <div key={i} className="flex gap-2 mb-1">
                <span style={{ color: "#16a34a", flexShrink: 0 }}>•</span>
                <span style={{ color: "#15803d" }}>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mistakes to avoid */}
        {section.mistakes && section.mistakes.length > 0 && (
          <div
            className="mb-4 px-4 py-3 rounded"
            style={{ background: "#fef2f2", border: "1px solid #fecaca", fontSize: "12px", lineHeight: 1.6 }}
          >
            <div style={{ fontWeight: "600", color: "#991b1b", marginBottom: "6px", fontSize: "11px" }}>
              ⚠️ MISTAKES TO AVOID
            </div>
            {section.mistakes.map((m, i) => (
              <div key={i} className="flex gap-2 mb-1">
                <span style={{ color: "#dc2626", flexShrink: 0 }}>✕</span>
                <span style={{ color: "#991b1b" }}>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid #f3f4f6", background: "#fafafa" }}
      >
        <button
          onClick={onToggleComplete}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium"
          style={{
            background: isCompleted ? "#f0fdf4" : "#ffffff",
            border: `1px solid ${isCompleted ? "#86efac" : "#d1d5db"}`,
            color: isCompleted ? "#166534" : "#374151",
            cursor: "pointer",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          }}
        >
          <span style={{ fontSize: "12px" }}>{isCompleted ? "✓" : "○"}</span>
          {isCompleted ? "Completed" : "Mark as Complete"}
        </button>

        <button
          onClick={onNextSection}
          className="px-3 py-1.5 rounded text-xs font-medium"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          {sectionNumber === totalSections ? "Next Module →" : "Next Section →"}
        </button>
      </div>
    </div>
  );
}
