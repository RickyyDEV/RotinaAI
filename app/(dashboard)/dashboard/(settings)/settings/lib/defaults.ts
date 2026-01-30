import type { SettingsState, StoredSettingsState } from "./types";

export const defaultSettings: SettingsState = {
  profile: {
    timezone: "America/Sao_Paulo",
    weekStartsOn: "monday",
  },
  appearance: {
    density: "comfortable",
  },
  notifications: {
    email: true,
    reminders: true,
  },
  ai: {
    autoPrioritize: true,
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
    },
    appearance: {
      ...defaultSettings.appearance,
      ...stored.appearance,
    },
    notifications: {
      ...defaultSettings.notifications,
      ...stored.notifications,
    },
    ai: {
      ...defaultSettings.ai,
      ...stored.ai,
    },
  };
}
