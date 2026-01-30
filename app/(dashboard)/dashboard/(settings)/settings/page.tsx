"use client";

import { Bell, Brain, Palette, RotateCcw, Sparkles, Zap } from "lucide-react";
import { useEffect, useReducer, useState } from "react";

import SegmentedControl from "./components/SegmentedControl";
import SectionCard from "./components/SectionCard";
import ToggleCard from "./components/ToggleCard";
import { defaultSettings, mergeSettings } from "./lib/defaults";
import type { DensityPreference, SettingsState } from "./lib/types";
import {
  clearSettingsStorage,
  loadStoredSettings,
  setAiAutoPrioritize,
  setAppearanceDensity,
  setNotificationsEmail,
  setNotificationsReminders,
  setProfileTimezone,
  setProfileWeekStartsOn,
} from "./lib/storage";

type Action =
  | { type: "LOAD"; payload: SettingsState }
  | { type: "RESET"; payload: SettingsState }
  | { type: "PATCH"; payload: Partial<SettingsState> };

function reducer(state: { settings: SettingsState }, action: Action) {
  switch (action.type) {
    case "LOAD":
      return { ...state, settings: action.payload };
    case "RESET":
      return {
        settings: action.payload,
      };
    case "PATCH":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export default function SettingsPage() {
  const [state, dispatch] = useReducer(reducer, {
    settings: defaultSettings,
  });

  const [savePulse, setSavePulse] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const persist = (write: () => void) => {
    try {
      write();
      setError(undefined);
      setSavePulse(true);
      window.setTimeout(() => setSavePulse(false), 900);
    } catch {
      setError(
        "Não foi possível salvar agora. Verifique o armazenamento do navegador.",
      );
    }
  };

  useEffect(() => {
    const stored = loadStoredSettings();
    const nextSettings = mergeSettings(stored);
    dispatch({ type: "LOAD", payload: nextSettings });
  }, []);

  const reset = () => {
    try {
      clearSettingsStorage();
    } catch {
      // ignore
    }
    dispatch({ type: "RESET", payload: defaultSettings });
  };

  const compactPadding =
    state.settings.appearance.density === "compact"
      ? "p-4 lg:p-6"
      : "p-6 lg:p-8";

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/10 via-background to-secondary/10 mb-6">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className={`relative ${compactPadding}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground border border-border bg-card/60 backdrop-blur rounded-full px-3 py-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Personalização
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-3">
                Configurações
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                O básico para o RotinaAI ficar confortável no dia a dia:
                aparência, horários e notificações.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="text-xs text-muted-foreground">
                <span>
                  Salva automaticamente{savePulse ? ": " : " neste navegador."}
                  {savePulse ? (
                    <span className="font-semibold text-foreground">Salvo</span>
                  ) : null}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 hover:bg-muted transition-colors px-4 py-3 text-sm font-semibold"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restaurar
                </button>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
              <p className="font-semibold text-destructive">{error}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-border bg-card/60 backdrop-blur p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3">
              Seções
            </p>
            <nav className="grid gap-1">
              {[
                { id: "appearance", label: "Aparência" },
                { id: "notifications", label: "Notificações" },
                { id: "ai", label: "IA" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="grid gap-6">
          <SectionCard
            id="appearance"
            title="Aparência"
            subtitle="Densidade e detalhes visuais para deixar o app com a sua cara."
            icon={<Palette className="h-5 w-5 text-primary" />}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Densidade</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ajusta espaçamento para caber mais ou dar mais respiro.
                </p>
                <div className="mt-3">
                  <SegmentedControl<DensityPreference>
                    value={state.settings.appearance.density}
                    onChange={(density) => {
                      dispatch({
                        type: "PATCH",
                        payload: {
                          appearance: {
                            ...state.settings.appearance,
                            density,
                          },
                        },
                      });
                      persist(() => setAppearanceDensity(density));
                    }}
                    options={[
                      { value: "comfortable", label: "Conforto" },
                      { value: "compact", label: "Compacto" },
                    ]}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Fuso e semana</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ajuda a IA a organizar seus horários corretamente.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Fuso horário
                    </span>
                    <select
                      value={state.settings.profile.timezone}
                      onChange={(e) => {
                        const value = e.target.value;
                        dispatch({
                          type: "PATCH",
                          payload: {
                            profile: {
                              ...state.settings.profile,
                              timezone: value,
                            },
                          },
                        });
                        persist(() => setProfileTimezone(value));
                      }}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    >
                      {[
                        "America/Sao_Paulo",
                        "America/Fortaleza",
                        "America/Manaus",
                        "America/Recife",
                        "Europe/Lisbon",
                        "Europe/London",
                      ].map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Início da semana
                    </span>
                    <select
                      value={state.settings.profile.weekStartsOn}
                      onChange={(e) => {
                        const value = e.target.value as "monday" | "sunday";
                        dispatch({
                          type: "PATCH",
                          payload: {
                            profile: {
                              ...state.settings.profile,
                              weekStartsOn: value,
                            },
                          },
                        });
                        persist(() => setProfileWeekStartsOn(value));
                      }}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    >
                      <option value="monday">Segunda-feira</option>
                      <option value="sunday">Domingo</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="notifications"
            title="Notificações"
            subtitle="Mantenha o RotinaAI presente sem atrapalhar seu foco."
            icon={<Bell className="h-5 w-5 text-primary" />}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <ToggleCard
                checked={state.settings.notifications.email}
                onChange={(email) => {
                  dispatch({
                    type: "PATCH",
                    payload: {
                      notifications: { ...state.settings.notifications, email },
                    },
                  });
                  persist(() => setNotificationsEmail(email));
                }}
                label="Receber emails"
                description="Alertas importantes, confirmação e lembretes por email."
                icon={<Bell className="h-5 w-5 text-primary" />}
              />

              <ToggleCard
                checked={state.settings.notifications.reminders}
                onChange={(reminders) => {
                  dispatch({
                    type: "PATCH",
                    payload: {
                      notifications: {
                        ...state.settings.notifications,
                        reminders,
                      },
                    },
                  });
                  persist(() => setNotificationsReminders(reminders));
                }}
                label="Lembretes inteligentes"
                description="Sugestões de lembrete para tarefas que estão ficando para trás."
                icon={<Zap className="h-5 w-5 text-secondary" />}
              />
            </div>
          </SectionCard>

          <SectionCard
            id="ai"
            title="IA"
            subtitle="Ajuste básico para a IA priorizar suas tarefas."
            icon={<Brain className="h-5 w-5 text-primary" />}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <ToggleCard
                checked={state.settings.ai.autoPrioritize}
                onChange={(autoPrioritize) => {
                  dispatch({
                    type: "PATCH",
                    payload: {
                      ai: { ...state.settings.ai, autoPrioritize },
                    },
                  });
                  persist(() => setAiAutoPrioritize(autoPrioritize));
                }}
                label="Priorizar automaticamente"
                description="A IA ordena suas tarefas por impacto e urgência."
                icon={<Sparkles className="h-5 w-5 text-primary" />}
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
