"use client";

import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SendForgetUrl from "./action";

const forgotPasswordSchema = z.object({
  email: z.email("Email inválido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordState = {
  isSubmitting: boolean;
  step: "form" | "sent";
  lastEmail?: string;
  error: {
    show: boolean;
    message: string;
    details?: string;
  };
};

type ForgotPasswordAction =
  | { type: "START_SUBMIT" }
  | { type: "END_SUBMIT" }
  | { type: "SHOW_ERROR"; payload: { message: string; details?: string } }
  | { type: "HIDE_ERROR" }
  | { type: "SET_SENT"; payload: { email: string } }
  | { type: "RESET" };

const initialState: ForgotPasswordState = {
  isSubmitting: false,
  step: "form",
  lastEmail: undefined,
  error: { show: false, message: "", details: "" },
};

function reducer(
  state: ForgotPasswordState,
  action: ForgotPasswordAction,
): ForgotPasswordState {
  switch (action.type) {
    case "START_SUBMIT":
      return {
        ...state,
        isSubmitting: true,
        error: { show: false, message: "", details: "" },
      };
    case "END_SUBMIT":
      return { ...state, isSubmitting: false };
    case "SHOW_ERROR":
      return {
        ...state,
        isSubmitting: false,
        error: {
          show: true,
          message: action.payload.message,
          details: action.payload.details,
        },
      };
    case "HIDE_ERROR":
      return { ...state, error: { show: false, message: "", details: "" } };
    case "SET_SENT":
      return {
        ...state,
        isSubmitting: false,
        step: "sent",
        lastEmail: action.payload.email,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function ForgotPasswordPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    dispatch({ type: "START_SUBMIT" });

    try {
      await SendForgetUrl(data.email);
      dispatch({ type: "SET_SENT", payload: { email: data.email } });
      reset({ email: data.email });
    } catch (err) {
      dispatch({
        type: "SHOW_ERROR",
        payload: {
          message: "Não foi possível enviar o email agora.",
          details: err instanceof Error ? err.message : "Tente novamente.",
        },
      });
    } finally {
      dispatch({ type: "END_SUBMIT" });
    }
  };

  const emailToShow = state.lastEmail || getValues("email");

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-105 w-105 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-105 w-105 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Message panel */}
          <div className="hidden lg:block rounded-2xl border border-border bg-linear-to-br from-card/80 to-card p-8 shadow-xl overflow-hidden relative animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/10 blur-2xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Recuperação segura
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground">
                Volte para sua rotina em minutos
              </h1>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Informe seu email e você receberá instruções para redefinir a
                senha. Por segurança, a confirmação é sempre discreta.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    title: "Privacidade em primeiro lugar",
                    desc: "Nunca confirmamos se um email existe.",
                    Icon: ShieldCheck,
                  },
                  {
                    title: "Link expira automaticamente",
                    desc: "Mais segurança para sua conta.",
                    Icon: CheckCircle2,
                  },
                  {
                    title: "Dica rápida",
                    desc: "Verifique também spam e promoções.",
                    Icon: Mail,
                  },
                ].map(({ title, desc, Icon }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4"
                  >
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary/15 to-secondary/15 border border-primary/15">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {title}
                      </p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl relative animate-in fade-in slide-in-from-right-4 duration-500 delay-150">
            {/* Error toast (inline) */}
            {state.error.show && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {state.error.message}
                    </p>
                    {state.error.details && (
                      <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/80 wrap-break-word">
                        {state.error.details}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "HIDE_ERROR" })}
                      className="mt-3 text-xs font-semibold text-red-700/80 hover:text-red-700 dark:text-red-300/80 dark:hover:text-red-300 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <Logo className="gap-2!" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Esqueceu sua senha?</h2>
              <p className="text-muted-foreground">
                Sem stress — vamos te ajudar a recuperar.
              </p>
            </div>

            {state.step === "form" ? (
              <div
                key="form"
                className="animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        autoComplete="email"
                        {...register("email")}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all outline-none placeholder-muted-foreground bg-popover ${
                          errors.email
                            ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                            : "border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={state.isSubmitting}
                    className="w-full py-3 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {state.isSubmitting
                      ? "Enviando instruções..."
                      : "Enviar link de redefinição"}
                  </button>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Voltar para o login
                    </Link>

                    <Link
                      href="/auth/register"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Criar conta
                    </Link>
                  </div>
                </form>

                <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Se você criou a conta com Google, pode entrar pelo botão
                    “Continuar com Gmail” na tela de login.
                  </p>
                </div>
              </div>
            ) : (
              <div
                key="sent"
                className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-secondary/10 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/15">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Se existir uma conta para esse email, enviaremos um link
                        de redefinição.
                      </p>
                      {emailToShow && (
                        <p className="mt-1 text-xs text-muted-foreground break-all">
                          Enviado para:{" "}
                          <span className="font-medium">{emailToShow}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-popover p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Próximos passos
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>1) Abra seu email e procure a mensagem do RotinaAI</li>
                    <li>2) Clique no link de redefinição</li>
                    <li>3) Crie uma senha nova e segura</li>
                  </ul>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      const email = emailToShow;
                      if (!email) {
                        dispatch({
                          type: "SHOW_ERROR",
                          payload: {
                            message: "Informe um email para reenviar.",
                          },
                        });
                        dispatch({ type: "RESET" });
                        return;
                      }
                      await onSubmit({ email });
                    }}
                    className="flex-1 py-3 rounded-lg border border-border bg-popover hover:bg-muted transition-all font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Reenviar
                  </button>

                  <Link
                    href="/auth/login"
                    className="flex-1 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    <div className="w-full py-3 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all text-center">
                      Voltar ao login
                    </div>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "RESET" });
                    reset({ email: emailToShow || "" });
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tentar com outro email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
