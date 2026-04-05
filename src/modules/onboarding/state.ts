/**
 * Onboarding State Management
 * Uses localStorage for persistence — no database dependency.
 * Tracks: which modules are complete, current step, dismissed state.
 */

export interface OnboardingState {
  hasSeenWelcome: boolean;
  dismissed: boolean; // "Don't show again"
  completedModules: string[]; // module IDs that are complete
  currentModuleId: string | null;
  currentStepIndex: number;
  startedAt: string | null;
  completedAt: string | null;
}

const STORAGE_KEY = "crm-onboarding-state";

const DEFAULT_STATE: OnboardingState = {
  hasSeenWelcome: false,
  dismissed: false,
  completedModules: [],
  currentModuleId: null,
  currentStepIndex: 0,
  startedAt: null,
  completedAt: null,
};

export function getOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return DEFAULT_STATE;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_STATE;

  try {
    return { ...DEFAULT_STATE, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveOnboardingState(state: OnboardingState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markWelcomeSeen(): void {
  const state = getOnboardingState();
  saveOnboardingState({ ...state, hasSeenWelcome: true });
}

export function dismissOnboarding(): void {
  const state = getOnboardingState();
  saveOnboardingState({ ...state, dismissed: true, hasSeenWelcome: true });
}

export function startModule(moduleId: string): void {
  const state = getOnboardingState();
  saveOnboardingState({
    ...state,
    currentModuleId: moduleId,
    currentStepIndex: 0,
    startedAt: state.startedAt || new Date().toISOString(),
    hasSeenWelcome: true,
  });
}

export function advanceStep(): void {
  const state = getOnboardingState();
  saveOnboardingState({
    ...state,
    currentStepIndex: state.currentStepIndex + 1,
  });
}

export function completeModule(moduleId: string): void {
  const state = getOnboardingState();
  const completed = state.completedModules.includes(moduleId)
    ? state.completedModules
    : [...state.completedModules, moduleId];
  saveOnboardingState({
    ...state,
    completedModules: completed,
    currentModuleId: null,
    currentStepIndex: 0,
  });
}

export function completeAllTraining(): void {
  const state = getOnboardingState();
  saveOnboardingState({
    ...state,
    completedAt: new Date().toISOString(),
    currentModuleId: null,
    currentStepIndex: 0,
  });
}

export function resetOnboarding(): void {
  saveOnboardingState(DEFAULT_STATE);
}

export function getCompletionPercentage(totalModules: number): number {
  const state = getOnboardingState();
  if (totalModules === 0) return 0;
  return Math.round((state.completedModules.length / totalModules) * 100);
}
