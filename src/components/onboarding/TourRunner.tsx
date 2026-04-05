"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TOUR_MODULES } from "@/modules/onboarding/tours";
import {
  getOnboardingState,
  advanceStep,
  completeModule,
  saveOnboardingState,
  getOnboardingState as refreshState,
} from "@/modules/onboarding/state";
import TourStepOverlay from "./TourStepOverlay";

/**
 * TourRunner — Manages active tour execution.
 * Placed in the app layout — listens for active tour state and renders overlay.
 * Handles navigation between pages when a tour step requires it.
 */
export default function TourRunner() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Check for active tour on mount and when pathname changes
  useEffect(() => {
    const state = getOnboardingState();
    if (state.currentModuleId) {
      setActiveModule(state.currentModuleId);
      setStepIndex(state.currentStepIndex);
    }
  }, [pathname]);

  // Listen for custom events to start tours
  useEffect(() => {
    function handleStartTour(e: CustomEvent<{ moduleId: string }>) {
      setActiveModule(e.detail.moduleId);
      setStepIndex(0);
    }

    window.addEventListener("start-tour" as string, handleStartTour as EventListener);
    return () => window.removeEventListener("start-tour" as string, handleStartTour as EventListener);
  }, []);

  const module = activeModule
    ? TOUR_MODULES.find((m) => m.id === activeModule)
    : null;

  const currentStep = module?.steps[stepIndex];

  const handleNext = useCallback(() => {
    if (!module) return;

    if (stepIndex + 1 >= module.steps.length) {
      // Module complete
      completeModule(module.id);
      setActiveModule(null);
      setStepIndex(0);
      return;
    }

    const nextStep = module.steps[stepIndex + 1];
    const newIndex = stepIndex + 1;
    setStepIndex(newIndex);
    advanceStep();

    // Navigate if next step requires a different page
    if (nextStep.navigateTo && nextStep.navigateTo !== pathname) {
      router.push(nextStep.navigateTo);
    }
  }, [module, stepIndex, pathname, router]);

  const handlePrev = useCallback(() => {
    if (stepIndex > 0) {
      const newIndex = stepIndex - 1;
      setStepIndex(newIndex);
      const state = refreshState();
      saveOnboardingState({ ...state, currentStepIndex: newIndex });
    }
  }, [stepIndex]);

  const handleSkip = useCallback(() => {
    const state = refreshState();
    saveOnboardingState({ ...state, currentModuleId: null, currentStepIndex: 0 });
    setActiveModule(null);
    setStepIndex(0);
  }, []);

  if (!module || !currentStep) return null;

  return (
    <TourStepOverlay
      step={currentStep}
      module={module}
      stepIndex={stepIndex}
      totalSteps={module.steps.length}
      onNext={handleNext}
      onPrev={handlePrev}
      onSkip={handleSkip}
      isFirst={stepIndex === 0}
      isLast={stepIndex === module.steps.length - 1}
    />
  );
}
