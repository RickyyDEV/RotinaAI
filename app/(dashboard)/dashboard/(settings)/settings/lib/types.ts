export type DensityPreference = "comfortable" | "compact";

export type SettingsState = {
  profile: {
    timezone: string;
    weekStartsOn: "monday" | "sunday";
  };
  appearance: {
    density: DensityPreference;
  };
  notifications: {
    email: boolean;
    reminders: boolean;
  };
  ai: {
    autoPrioritize: boolean;
  };
};

// Persistimos apenas preferências locais do dashboard.
// Como o storage é por chave, o estado armazenado pode ser parcial em qualquer nível.
export type StoredSettingsState = {
  profile?: Partial<SettingsState["profile"]>;
  appearance?: Partial<SettingsState["appearance"]>;
  notifications?: Partial<SettingsState["notifications"]>;
  ai?: Partial<SettingsState["ai"]>;
};

export type StatusState = {
  saving: boolean;
  savedAt?: number;
  savePulse: boolean;
  error?: string;
};
