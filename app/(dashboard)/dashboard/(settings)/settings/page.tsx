"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Brain,
  Check,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  LayoutGrid,
  Moon,
  Palette,
  RotateCcw,
  Save,
  Shield,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useReducer, useState } from "react";

import SegmentedControl from "./components/SegmentedControl";
import SectionCard from "./components/SectionCard";
import ToggleCard from "./components/ToggleCard";
import { defaultSettings, mergeSettings } from "./lib/defaults";
import { SETTINGS_STORAGE_KEY, safeParseSettings } from "./lib/storage";
import type {
  DensityPreference,
  PlanningStyle,
  SettingsState,
  StatusState,
  ThemePreference,
} from "./lib/types";

type Action =
  | { type: "LOAD"; payload: SettingsState }
  | { type: "RESET"; payload: SettingsState }
  | { type: "PATCH"; payload: Partial<SettingsState> }
  | { type: "SET_STATUS"; payload: Partial<StatusState> };

function reducer(
  state: { settings: SettingsState; status: StatusState },
  action: Action,
) {
  switch (action.type) {
    case "LOAD":
      return { ...state, settings: action.payload };
    case "RESET":
      return {
        settings: action.payload,
        status: {
          saving: false,
          savedAt: Date.now(),
          savePulse: true,
        },
      };
    case "PATCH":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case "SET_STATUS":
      return {
        ...state,
        status: {
          ...state.status,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export default function SettingsPage() {
  const { setTheme, theme: currentTheme } = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    settings: defaultSettings,
    status: { saving: false, savePulse: false },
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const stored = safeParseSettings(
      localStorage.getItem(SETTINGS_STORAGE_KEY),
    );
    const nextSettings = mergeSettings(stored);
    dispatch({ type: "LOAD", payload: nextSettings });
  }, [setTheme]);

  useEffect(() => {
    if (
      currentTheme !== "dark" &&
      currentTheme !== "light" &&
      currentTheme !== "system"
    ) {
      return;
    }

    if (currentTheme !== state.settings.appearance.theme) {
      dispatch({
        type: "PATCH",
        payload: {
          appearance: {
            ...state.settings.appearance,
            theme: currentTheme,
          },
        },
      });
    }
  }, [currentTheme, state.settings.appearance]);

  const hasQuietHours = state.settings.notifications.quietHoursEnabled;

  const save = async () => {
    dispatch({
      type: "SET_STATUS",
      payload: { saving: true, error: undefined },
    });
    try {
      const { theme: _theme, ...appearanceForStorage } =
        state.settings.appearance;
      const settingsForStorage = {
        ...state.settings,
        appearance: appearanceForStorage,
      };
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settingsForStorage),
      );
      dispatch({
        type: "SET_STATUS",
        payload: { saving: false, savedAt: Date.now(), savePulse: true },
      });
      window.setTimeout(() => {
        dispatch({ type: "SET_STATUS", payload: { savePulse: false } });
      }, 1200);
    } catch {
      dispatch({
        type: "SET_STATUS",
        payload: {
          saving: false,
          error:
            "Não foi possível salvar agora. Verifique o armazenamento do navegador.",
        },
      });
    }
  };

  const reset = () => {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    } catch {
      // ignore
    }
    setTheme(defaultSettings.appearance.theme);
    dispatch({ type: "RESET", payload: defaultSettings });
  };

  const lastSaved = useMemo(() => {
    if (!state.status.savedAt) return null;
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(state.status.savedAt));
  }, [state.status.savedAt]);

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
                Ajuste o RotinaAI do seu jeito: aparência, notificações,
                preferências de planejamento e privacidade — tudo pensado para
                reduzir fricção e aumentar foco.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="text-xs text-muted-foreground">
                {lastSaved ? (
                  <span>
                    Última atualização:{" "}
                    <span className="font-semibold">{lastSaved}</span>
                  </span>
                ) : (
                  <span>As alterações ficam salvas neste navegador.</span>
                )}
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

                <button
                  type="button"
                  onClick={save}
                  disabled={state.status.saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary text-white px-5 py-3 text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity disabled:opacity-60"
                >
                  {state.status.savePulse ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {state.status.saving
                    ? "Salvando…"
                    : state.status.savePulse
                      ? "Salvo"
                      : "Salvar"}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {state.status.error ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-4 rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm"
              >
                <p className="font-semibold text-destructive">
                  {state.status.error}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
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
                { id: "ai", label: "IA e Planejamento" },
                { id: "privacy", label: "Privacidade" },
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

            <div className="mt-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setShowPreview((v) => !v)}
                className="w-full inline-flex items-center justify-between rounded-xl border border-border bg-background/70 hover:bg-muted transition-colors px-3 py-2 text-sm font-semibold"
              >
                Pré-visualizar dia
                <motion.span
                  animate={{ rotate: showPreview ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {showPreview ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 rounded-2xl border border-border bg-linear-to-br from-primary/10 to-secondary/10 p-3">
                      <p className="text-xs font-semibold">Resumo rápido</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Plano do dia às <b>{state.settings.ai.dailyPlanTime}</b>
                        , horário foco{" "}
                        <b>{state.settings.profile.workingHours.start}</b>–
                        <b>{state.settings.profile.workingHours.end}</b>.
                        {hasQuietHours
                          ? ` Silêncio ${state.settings.notifications.quietHours.start}–${state.settings.notifications.quietHours.end}.`
                          : ""}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          <SectionCard
            id="appearance"
            title="Aparência"
            subtitle="Tema, densidade e detalhes visuais para deixar o app com a sua cara."
            icon={<Palette className="h-5 w-5 text-primary" />}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Tema</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {state.settings.appearance.theme === "light" ? (
                      <Sun className="h-4 w-4" />
                    ) : state.settings.appearance.theme === "dark" ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <LayoutGrid className="h-4 w-4" />
                    )}
                    {state.settings.appearance.theme === "system"
                      ? "Sistema"
                      : state.settings.appearance.theme === "dark"
                        ? "Escuro"
                        : "Claro"}
                  </div>
                </div>

                <div className="mt-3">
                  <SegmentedControl<ThemePreference>
                    value={state.settings.appearance.theme}
                    onChange={(nextTheme) => {
                      setTheme(nextTheme);
                      dispatch({
                        type: "PATCH",
                        payload: {
                          appearance: {
                            ...state.settings.appearance,
                            theme: nextTheme,
                          },
                        },
                      });
                    }}
                    options={[
                      { value: "system", label: "Sistema" },
                      { value: "light", label: "Claro" },
                      { value: "dark", label: "Escuro" },
                    ]}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  O tema é aplicado instantaneamente e fica salvo no navegador.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Densidade</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ajusta espaçamento para caber mais ou dar mais respiro.
                </p>
                <div className="mt-3">
                  <SegmentedControl<DensityPreference>
                    value={state.settings.appearance.density}
                    onChange={(density) =>
                      dispatch({
                        type: "PATCH",
                        payload: {
                          appearance: {
                            ...state.settings.appearance,
                            density,
                          },
                        },
                      })
                    }
                    options={[
                      { value: "comfortable", label: "Conforto" },
                      { value: "compact", label: "Compacto" },
                    ]}
                  />
                </div>
              </div>

              <ToggleCard
                checked={state.settings.appearance.reduceMotion}
                onChange={(reduceMotion) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      appearance: {
                        ...state.settings.appearance,
                        reduceMotion,
                      },
                    },
                  })
                }
                label="Reduzir animações"
                description="Deixe as transições mais discretas (recomendado se você prefere uma experiência mais estática)."
                icon={
                  state.settings.appearance.reduceMotion ? (
                    <EyeOff className="h-5 w-5 text-secondary" />
                  ) : (
                    <Eye className="h-5 w-5 text-secondary" />
                  )
                }
              />

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
                      onChange={(e) =>
                        dispatch({
                          type: "PATCH",
                          payload: {
                            profile: {
                              ...state.settings.profile,
                              timezone: e.target.value,
                            },
                          },
                        })
                      }
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
                      onChange={(e) =>
                        dispatch({
                          type: "PATCH",
                          payload: {
                            profile: {
                              ...state.settings.profile,
                              weekStartsOn: e.target.value as
                                | "monday"
                                | "sunday",
                            },
                          },
                        })
                      }
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
                onChange={(email) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      notifications: { ...state.settings.notifications, email },
                    },
                  })
                }
                label="Receber emails"
                description="Alertas importantes, confirmação e lembretes por email."
                icon={<Bell className="h-5 w-5 text-primary" />}
              />

              <ToggleCard
                checked={state.settings.notifications.reminders}
                onChange={(reminders) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      notifications: {
                        ...state.settings.notifications,
                        reminders,
                      },
                    },
                  })
                }
                label="Lembretes inteligentes"
                description="Sugestões de lembrete para tarefas que estão ficando para trás."
                icon={<Zap className="h-5 w-5 text-secondary" />}
              />

              <ToggleCard
                checked={state.settings.notifications.weeklyDigest}
                onChange={(weeklyDigest) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      notifications: {
                        ...state.settings.notifications,
                        weeklyDigest,
                      },
                    },
                  })
                }
                label="Resumo semanal"
                description="Um resumo leve do seu progresso, sempre no mesmo dia/horário."
                icon={<Sparkles className="h-5 w-5 text-primary" />}
              />

              <ToggleCard
                checked={state.settings.notifications.productUpdates}
                onChange={(productUpdates) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      notifications: {
                        ...state.settings.notifications,
                        productUpdates,
                      },
                    },
                  })
                }
                label="Novidades do produto"
                description="Fique por dentro de melhorias e novos recursos."
                icon={<LayoutGrid className="h-5 w-5 text-secondary" />}
              />
            </div>

            <div className="mt-4 rounded-3xl border border-border bg-background/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Horário de silêncio</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Durante este período, o RotinaAI reduz interrupções.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "PATCH",
                      payload: {
                        notifications: {
                          ...state.settings.notifications,
                          quietHoursEnabled:
                            !state.settings.notifications.quietHoursEnabled,
                        },
                      },
                    })
                  }
                  className={`h-9 w-16 rounded-full border transition-colors relative ${
                    hasQuietHours
                      ? "bg-primary/20 border-primary/30"
                      : "bg-muted border-border"
                  }`}
                  aria-pressed={hasQuietHours}
                >
                  <span
                    className={`absolute top-1 h-7 w-7 rounded-full transition-transform ${
                      hasQuietHours
                        ? "translate-x-8 bg-linear-to-br from-primary to-secondary"
                        : "translate-x-1 bg-foreground/20"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Início
                  </span>
                  <input
                    type="time"
                    disabled={!hasQuietHours}
                    value={state.settings.notifications.quietHours.start}
                    onChange={(e) =>
                      dispatch({
                        type: "PATCH",
                        payload: {
                          notifications: {
                            ...state.settings.notifications,
                            quietHours: {
                              ...state.settings.notifications.quietHours,
                              start: e.target.value,
                            },
                          },
                        },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm disabled:opacity-60"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Fim
                  </span>
                  <input
                    type="time"
                    disabled={!hasQuietHours}
                    value={state.settings.notifications.quietHours.end}
                    onChange={(e) =>
                      dispatch({
                        type: "PATCH",
                        payload: {
                          notifications: {
                            ...state.settings.notifications,
                            quietHours: {
                              ...state.settings.notifications.quietHours,
                              end: e.target.value,
                            },
                          },
                        },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm disabled:opacity-60"
                  />
                </label>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="ai"
            title="IA e Planejamento"
            subtitle="Como a IA sugere, prioriza e monta seu plano diário."
            icon={<Brain className="h-5 w-5 text-primary" />}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <ToggleCard
                checked={state.settings.ai.autoPrioritize}
                onChange={(autoPrioritize) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      ai: { ...state.settings.ai, autoPrioritize },
                    },
                  })
                }
                label="Priorizar automaticamente"
                description="A IA ordena suas tarefas por impacto e urgência."
                icon={<Sparkles className="h-5 w-5 text-primary" />}
              />

              <ToggleCard
                checked={state.settings.ai.autoSchedule}
                onChange={(autoSchedule) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      ai: { ...state.settings.ai, autoSchedule },
                    },
                  })
                }
                label="Montar agenda automaticamente"
                description="Sugere blocos de foco e organiza o dia com base no seu horário."
                icon={<Zap className="h-5 w-5 text-secondary" />}
              />

              <ToggleCard
                checked={state.settings.ai.explainSuggestions}
                onChange={(explainSuggestions) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      ai: { ...state.settings.ai, explainSuggestions },
                    },
                  })
                }
                label="Explicar sugestões"
                description="Mostra o porquê das recomendações (mais transparência)."
                icon={<Shield className="h-5 w-5 text-secondary" />}
              />

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Estilo de planejamento</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ajusta a agressividade do seu plano diário.
                </p>
                <div className="mt-3">
                  <SegmentedControl<PlanningStyle>
                    value={state.settings.ai.planningStyle}
                    onChange={(planningStyle) =>
                      dispatch({
                        type: "PATCH",
                        payload: {
                          ai: { ...state.settings.ai, planningStyle },
                        },
                      })
                    }
                    options={[
                      { value: "relaxed", label: "Leve" },
                      { value: "balanced", label: "Equilíbrio" },
                      { value: "aggressive", label: "Intenso" },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-border bg-background/60 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    Horário do plano diário
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Quando você quer receber/gerar o plano do seu dia.
                  </p>
                </div>
                <input
                  type="time"
                  value={state.settings.ai.dailyPlanTime}
                  onChange={(e) =>
                    dispatch({
                      type: "PATCH",
                      payload: {
                        ai: {
                          ...state.settings.ai,
                          dailyPlanTime: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full sm:w-40 rounded-xl border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="privacy"
            title="Privacidade"
            subtitle="Controle o que é coletado para melhorar sua experiência."
            icon={<Shield className="h-5 w-5 text-primary" />}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <ToggleCard
                checked={state.settings.privacy.analytics}
                onChange={(analytics) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      privacy: { ...state.settings.privacy, analytics },
                    },
                  })
                }
                label="Métricas anônimas"
                description="Ajuda a entender performance e estabilidade (sem dados sensíveis)."
                icon={<Shield className="h-5 w-5 text-primary" />}
              />
              <ToggleCard
                checked={state.settings.privacy.usageInsights}
                onChange={(usageInsights) =>
                  dispatch({
                    type: "PATCH",
                    payload: {
                      privacy: { ...state.settings.privacy, usageInsights },
                    },
                  })
                }
                label="Insights de uso"
                description="Personaliza sugestões com base no seu padrão de produtividade."
                icon={<Sparkles className="h-5 w-5 text-secondary" />}
              />
            </div>

            <div className="mt-4 rounded-3xl border border-border bg-linear-to-br from-background via-background to-primary/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Exportar preferências</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Baixe suas configurações deste navegador (útil para backup).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const payload = JSON.stringify(state.settings, null, 2);
                    const blob = new Blob([payload], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "rotinaai-settings.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 hover:bg-muted transition-colors px-4 py-2 text-sm font-semibold"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
