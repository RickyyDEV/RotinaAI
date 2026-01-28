import type { SettingsState, StoredSettingsState } from "./types";

export const defaultSettings: SettingsState = {
  profile: {
    displayName: "",
    timezone: "America/Sao_Paulo",
    weekStartsOn: "monday",
    workingHours: { start: "09:00", end: "18:00" },
  },
  appearance: {
    theme: "system",
    density: "comfortable",
    reduceMotion: false,
  },
  notifications: {
    email: true,
    productUpdates: true,
    weeklyDigest: true,
    reminders: true,
    quietHoursEnabled: false,
    quietHours: { start: "22:00", end: "07:00" },
  },
  ai: {
    autoPrioritize: true,
    autoSchedule: true,
    explainSuggestions: true,
    dailyPlanTime: "07:30",
    planningStyle: "balanced",
  },
  privacy: {
    analytics: true,
    usageInsights: true,
  },
};

export function mergeSettings(
  stored: StoredSettingsState | null,
): SettingsState {
  if (!stored) return defaultSettings;

  return {
    ...defaultSettings,
    ...stored,
    profile: {
      ...defaultSettings.profile,
      ...stored.profile,
      workingHours: {
        ...defaultSettings.profile.workingHours,
        ...(stored.profile?.workingHours ?? {}),
      },
    },
    appearance: {
      // tema não vem do storage; next-themes controla
      theme: defaultSettings.appearance.theme,
      density: stored.appearance?.density ?? defaultSettings.appearance.density,
      reduceMotion:
        stored.appearance?.reduceMotion ??
        defaultSettings.appearance.reduceMotion,
    },
    notifications: {
      ...defaultSettings.notifications,
      ...stored.notifications,
      quietHours: {
        ...defaultSettings.notifications.quietHours,
        ...(stored.notifications?.quietHours ?? {}),
      },
    },
    ai: {
      ...defaultSettings.ai,
      ...stored.ai,
    },
    privacy: {
      ...defaultSettings.privacy,
      ...stored.privacy,
    },
  };
}
