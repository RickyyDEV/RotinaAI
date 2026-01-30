import type { DensityPreference, StoredSettingsState } from "./types";

const PREFIX = "rotinaai:settings:";

const KEYS = {
  profileTimezone: `${PREFIX}profile:timezone`,
  profileWeekStartsOn: `${PREFIX}profile:weekStartsOn`,

  appearanceDensity: `${PREFIX}appearance:density`,

  notificationsEmail: `${PREFIX}notifications:email`,
  notificationsReminders: `${PREFIX}notifications:reminders`,

  aiAutoPrioritize: `${PREFIX}ai:autoPrioritize`,
} as const;

const LEGACY_KEYS = [
  `${PREFIX}profile:displayName`,
  `${PREFIX}profile:workingHours:start`,
  `${PREFIX}profile:workingHours:end`,
  `${PREFIX}appearance:reduceMotion`,
  `${PREFIX}notifications:productUpdates`,
  `${PREFIX}notifications:weeklyDigest`,
  `${PREFIX}notifications:quietHoursEnabled`,
  `${PREFIX}notifications:quietHours:start`,
  `${PREFIX}notifications:quietHours:end`,
  `${PREFIX}ai:autoSchedule`,
  `${PREFIX}ai:explainSuggestions`,
  `${PREFIX}ai:dailyPlanTime`,
  `${PREFIX}ai:planningStyle`,
  `${PREFIX}privacy:analytics`,
  `${PREFIX}privacy:usageInsights`,
] as const;

function getString(key: string): string | undefined {
  const raw = localStorage.getItem(key);
  if (raw == null || raw === "") return undefined;
  return raw;
}

function setString(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getBoolean(key: string): boolean | undefined {
  const raw = localStorage.getItem(key);
  if (raw == null) return undefined;
  if (raw === "1" || raw === "true") return true;
  if (raw === "0" || raw === "false") return false;
  return undefined;
}

function setBoolean(key: string, value: boolean) {
  localStorage.setItem(key, value ? "1" : "0");
}

function getEnum<T extends string>(
  key: string,
  allowed: readonly T[],
): T | undefined {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;
  return (allowed as readonly string[]).includes(raw) ? (raw as T) : undefined;
}

export function loadStoredSettings(): StoredSettingsState | null {
  const stored: StoredSettingsState = {};
  let hasAny = false;

  const timezone = getString(KEYS.profileTimezone);
  if (timezone !== undefined) {
    stored.profile = { ...(stored.profile ?? {}), timezone };
    hasAny = true;
  }

  const weekStartsOn = getEnum(KEYS.profileWeekStartsOn, [
    "monday",
    "sunday",
  ] as const);
  if (weekStartsOn !== undefined) {
    stored.profile = { ...(stored.profile ?? {}), weekStartsOn };
    hasAny = true;
  }

  const density = getEnum(KEYS.appearanceDensity, [
    "comfortable",
    "compact",
  ] as const);
  if (density !== undefined) {
    stored.appearance = { ...(stored.appearance ?? {}), density };
    hasAny = true;
  }

  const email = getBoolean(KEYS.notificationsEmail);
  if (email !== undefined) {
    stored.notifications = { ...(stored.notifications ?? {}), email };
    hasAny = true;
  }

  const reminders = getBoolean(KEYS.notificationsReminders);
  if (reminders !== undefined) {
    stored.notifications = { ...(stored.notifications ?? {}), reminders };
    hasAny = true;
  }

  const autoPrioritize = getBoolean(KEYS.aiAutoPrioritize);
  if (autoPrioritize !== undefined) {
    stored.ai = { ...(stored.ai ?? {}), autoPrioritize };
    hasAny = true;
  }

  return hasAny ? stored : null;
}

export function clearSettingsStorage() {
  for (const key of Object.values(KEYS)) {
    localStorage.removeItem(key);
  }
  for (const legacyKey of LEGACY_KEYS) {
    localStorage.removeItem(legacyKey);
  }
}

export function setProfileTimezone(value: string) {
  setString(KEYS.profileTimezone, value);
}

export function setProfileWeekStartsOn(value: "monday" | "sunday") {
  setString(KEYS.profileWeekStartsOn, value);
}

export function setAppearanceDensity(value: DensityPreference) {
  setString(KEYS.appearanceDensity, value);
}

export function setNotificationsEmail(value: boolean) {
  setBoolean(KEYS.notificationsEmail, value);
}

export function setNotificationsReminders(value: boolean) {
  setBoolean(KEYS.notificationsReminders, value);
}

export function setAiAutoPrioritize(value: boolean) {
  setBoolean(KEYS.aiAutoPrioritize, value);
}
