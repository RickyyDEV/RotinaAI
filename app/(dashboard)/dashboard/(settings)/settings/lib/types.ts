export type ThemePreference = "system" | "light" | "dark";
export type DensityPreference = "comfortable" | "compact";
export type PlanningStyle = "relaxed" | "balanced" | "aggressive";

export type SettingsState = {
  profile: {
    displayName: string;
    timezone: string;
    weekStartsOn: "monday" | "sunday";
    workingHours: { start: string; end: string };
  };
  appearance: {
    theme: ThemePreference;
    density: DensityPreference;
    reduceMotion: boolean;
  };
  notifications: {
    email: boolean;
    productUpdates: boolean;
    weeklyDigest: boolean;
    reminders: boolean;
    quietHoursEnabled: boolean;
    quietHours: { start: string; end: string };
  };
  ai: {
    autoPrioritize: boolean;
    autoSchedule: boolean;
    explainSuggestions: boolean;
    dailyPlanTime: string;
    planningStyle: PlanningStyle;
  };
  privacy: {
    analytics: boolean;
    usageInsights: boolean;
  };
};

// Persistimos apenas preferências locais do dashboard.
// O tema é controlado e persistido exclusivamente pelo `next-themes`.
export type StoredSettingsState = Partial<
  Omit<SettingsState, "appearance"> & {
    appearance: Partial<Omit<SettingsState["appearance"], "theme">>;
  }
>;

export type StatusState = {
  saving: boolean;
  savedAt?: number;
  savePulse: boolean;
  error?: string;
};
