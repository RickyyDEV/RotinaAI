"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Logo from "@/app/components/Logo";
import { authClient } from "@/app/(auth)/client";

type ViewState = "checking" | "success" | "error";

type VerifyState = {
  view: ViewState;
  title: string;
  description: string;
  details?: string;
};

type VerifyAction =
  | { type: "CHECKING" }
  | { type: "SUCCESS" }
  | {
      type: "ERROR";
      payload: { title: string; description: string; details?: string };
    };

const initialState: VerifyState = {
  view: "checking",
  title: "Confirmando seu email…",
  description: "Só um instante — estamos ativando sua conta com segurança.",
};

function reducer(state: VerifyState, action: VerifyAction): VerifyState {
  switch (action.type) {
    case "CHECKING":
      return initialState;
    case "SUCCESS":
      return {
        view: "success",
        title: "Email confirmado!",
        description:
          "Sua conta está pronta. Você já está conectado — é só entrar no painel.",
      };
    case "ERROR":
      return {
        view: "error",
        title: action.payload.title,
        description: action.payload.description,
        details: action.payload.details,
      };
    default:
      return state;
  }
}

const resendSchema = z.object({
  email: z.email("Digite um email válido"),
});

type ResendData = z.infer<typeof resendSchema>;

function mapVerifyError(codeOrMessage?: string) {
  const code = (codeOrMessage ?? "").toLowerCase().trim();

  if (code === "token_expired") {
    return {
      title: "Seu link expirou",
      description:
        "Parece que este link de confirmação não está mais válido. Você pode gerar um novo em segundos.",
    };
  }

  if (code === "invalid_token") {
    return {
      title: "Não foi possível confirmar",
      description:
        "Este link de confirmação parece inválido. Tente gerar um novo link para continuar.",
    };
  }

  if (code === "user_not_found") {
    return {
      title: "Conta não encontrada",
      description:
        "Não encontramos uma conta vinculada a este link. Você pode criar uma conta novamente ou solicitar um novo email.",
    };
  }

  if (code === "unauthorized") {
    return {
      title: "Não foi possível confirmar",
      description:
        "Por segurança, não foi possível concluir a confirmação com este link. Gere um novo e tente novamente.",
    };
  }

  if (code.length > 0) {
    return {
      title: "Não foi possível confirmar",
      description:
        "Tivemos um problema ao confirmar seu email. Você pode tentar novamente ou gerar um novo email.",
      details: codeOrMessage,
    };
  }

  return {
    title: "Link incompleto",
    description:
      "Não conseguimos encontrar as informações necessárias para confirmar seu email. Abra o link mais recente enviado para você.",
  };
}

export default function EmailVerificationPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [resendStatus, setResendStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendData>({
    resolver: zodResolver(resendSchema),
    mode: "onChange",
  });

  useEffect(() => {
    let active = true;

    const run = async () => {
      dispatch({ type: "CHECKING" });

      if (!token.trim()) {
        if (!active) return;
        const mapped = mapVerifyError();
        dispatch({
          type: "ERROR",
          payload: {
            title: mapped.title,
            description: mapped.description,
            details: mapped.details,
          },
        });
        return;
      }

      const result = await authClient.verifyEmail({
        query: {
          token,
        },
      });

      if (!active) return;

      if (result.error) {
        const mapped = mapVerifyError(result.error.message);
        dispatch({
          type: "ERROR",
          payload: {
            title: mapped.title,
            description: mapped.description,
            details: mapped.details,
          },
        });
        return;
      }

      dispatch({ type: "SUCCESS" });
    };

    void run();
    return () => {
      active = false;
    };
  }, [token]);

  const onResend = async (data: ResendData) => {
    setResendStatus("submitting");

    const result = await authClient.sendVerificationEmail({
      email: data.email,
    });

    if (result.error) {
      setResendStatus("error");
      return;
    }

    setResendStatus("sent");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left panel (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="hidden lg:flex rounded-2xl border border-border bg-card/60 backdrop-blur p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Logo className="gap-2!" />
                <span className="text-xs font-semibold text-muted-foreground border border-border rounded-full px-2 py-1">
                  Ativação
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">Quase lá</h1>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  A confirmação protege sua conta e libera o acesso ao painel.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Validação segura</p>
                    <p className="text-xs text-muted-foreground">
                      Confirmamos seu link e ativamos sua conta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
                  <Sparkles className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Acesso imediato</p>
                    <p className="text-xs text-muted-foreground">
                      Ao confirmar, você já fica conectado automaticamente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Dica: use sempre o link mais recente do email.
              </div>
            </div>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {state.view === "checking" ? (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{state.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {state.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-primary" />
                      RotinaAI
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/60 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 animate-pulse" />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="h-11 w-11 rounded-xl bg-linear-to-br from-primary to-secondary grid place-items-center shadow-sm">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">
                          Verificando confirmação
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Isso geralmente leva menos de 2 segundos.
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.2s]" />
                        <span className="h-2 w-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.1s]" />
                        <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/auth/login")}
                    className="w-full rounded-xl border border-border bg-background hover:bg-muted transition-colors px-4 py-3 text-sm font-semibold"
                  >
                    Ir para o login
                  </button>
                </motion.div>
              ) : state.view === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{state.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {state.description}
                      </p>
                    </div>
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  </div>

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/15 grid place-items-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">
                          Conta ativada com sucesso
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Você já pode começar a planejar seu dia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary text-white px-4 py-3 text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
                  >
                    Acessar painel
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="text-center text-xs text-muted-foreground">
                    Se preferir, você pode voltar para a{" "}
                    <Link href="/" className="text-primary hover:underline">
                      página inicial
                    </Link>
                    .
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{state.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {state.description}
                      </p>
                    </div>
                    <AlertTriangle className="h-7 w-7 text-amber-500" />
                  </div>

                  {state.details ? (
                    <p className="sr-only">{state.details}</p>
                  ) : null}

                  <div className="rounded-2xl border border-border bg-background/60 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/15 to-secondary/15 grid place-items-center">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Receber um novo email
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Informe seu email e enviamos um novo link.
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit(onResend)}
                      className="grid gap-3"
                    >
                      <div>
                        <input
                          {...register("email")}
                          placeholder="seuemail@exemplo.com"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-primary/30"
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={resendStatus === "submitting"}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary text-white px-4 py-3 text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity disabled:opacity-60"
                      >
                        {resendStatus === "submitting"
                          ? "Enviando…"
                          : resendStatus === "sent"
                            ? "Email enviado"
                            : "Enviar novo email"}
                        <Mail className="h-4 w-4" />
                      </button>

                      {resendStatus === "sent" && (
                        <p className="text-xs text-emerald-600">
                          Pronto! Verifique sua caixa de entrada (e spam).
                        </p>
                      )}
                      {resendStatus === "error" && (
                        <p className="text-xs text-destructive">
                          Não foi possível enviar agora. Tente novamente.
                        </p>
                      )}
                    </form>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => router.refresh()}
                      className="w-full rounded-xl border border-border bg-background hover:bg-muted transition-colors px-4 py-3 text-sm font-semibold"
                    >
                      Tentar novamente
                    </button>
                    <Link
                      href="/auth/login"
                      className="w-full inline-flex items-center justify-center rounded-xl border border-border bg-background hover:bg-muted transition-colors px-4 py-3 text-sm font-semibold"
                    >
                      Ir para login
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
