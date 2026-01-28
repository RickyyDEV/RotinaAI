import type { StoredSettingsState } from "./types";

export const SETTINGS_STORAGE_KEY = "rotinaai_settings_v1";

export function safeParseSettings(
  value: string | null,
): StoredSettingsState | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as StoredSettingsState;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}
