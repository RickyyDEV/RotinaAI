"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, ShieldCheck, Sparkles } from "lucide-react";

import Logo from "@/app/components/Logo";
import { authClient } from "@/app/(auth)/client";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Za-z]/, "Inclua pelo menos 1 letra")
      .regex(/[0-9]/, "Inclua pelo menos 1 número"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

type State = {
  step: "form" | "success";
  isSubmitting: boolean;
  error: { show: boolean; message: string; details?: string };
};

type Action =
  | { type: "START" }
  | { type: "END" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; payload: { message: string; details?: string } }
  | { type: "CLEAR_ERROR" };

const initialState: State = {
  step: "form",
  isSubmitting: false,
  error: { show: false, message: "", details: "" },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isSubmitting: true,
        error: { show: false, message: "" },
      };
    case "END":
      return { ...state, isSubmitting: false };
    case "SUCCESS":
      return { ...state, step: "success", isSubmitting: false };
    case "ERROR":
      return {
        ...state,
        isSubmitting: false,
        error: {
          show: true,
          message: action.payload.message,
          details: action.payload.details,
        },
      };
    case "CLEAR_ERROR":
      return { ...state, error: { show: false, message: "", details: "" } };
    default:
      return state;
  }
}

export default function ChangePasswordPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!token.trim()) {
      router.replace("/auth/forgot-password");
    }
  }, [token, router]);

  if (!token.trim()) return null;

  const onSubmit = async (data: FormData) => {
    dispatch({ type: "START" });

    if (!token.trim()) {
      dispatch({
        type: "ERROR",
        payload: {
          message: "Link inválido ou incompleto",
          details:
            "Não foi possível confirmar seu link de redefinição. Solicite um novo link e tente novamente.",
        },
      });
      return;
    }

    const result = await authClient.resetPassword({
      token,
      newPassword: data.password,
    });

    if (result.error) {
      dispatch({
        type: "ERROR",
        payload: {
          message: "Não foi possível redefinir sua senha",
          details: result.error.message,
        },
      });
      return;
    }

    dispatch({ type: "SUCCESS" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
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
                  Segurança
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Redefina sua senha com confiança
                </h1>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Este processo confirma seu link por segurança, para garantir
                  que só você consiga alterar sua senha.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Link confirmado</p>
                    <p className="text-xs text-muted-foreground">
                      Se este link expirou, é só solicitar outro.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
                  <KeyRound className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Senha forte</p>
                    <p className="text-xs text-muted-foreground">
                      Recomendamos 8+ caracteres com letras e números.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <span>
                  Se você chegou até aqui pelo email, seu link já está pronto
                  para uso.
                </span>
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
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Nova senha</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Digite e confirme sua nova senha.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                RotinaAI
              </div>
            </div>

            <AnimatePresence mode="wait">
              {state.step === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {state.error.show && (
                    <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                      <p className="text-sm font-semibold text-destructive">
                        {state.error.message}
                      </p>
                      {state.error.details && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {state.error.details}
                        </p>
                      )}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nova senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          {...register("password")}
                          className="w-full h-11 rounded-lg border border-border bg-background px-3 pr-10 outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="Crie uma senha forte"
                          onFocus={() => dispatch({ type: "CLEAR_ERROR" })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                          aria-label={
                            showPassword ? "Ocultar senha" : "Mostrar senha"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Repetir senha
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          {...register("confirmPassword")}
                          className="w-full h-11 rounded-lg border border-border bg-background px-3 pr-10 outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="Repita a senha"
                          onFocus={() => dispatch({ type: "CLEAR_ERROR" })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                          aria-label={
                            showConfirm ? "Ocultar senha" : "Mostrar senha"
                          }
                        >
                          {showConfirm ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <button
                      disabled={state.isSubmitting}
                      type="submit"
                      className="w-full h-11 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/15 hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {state.isSubmitting ? "Salvando..." : "Redefinir senha"}
                    </button>

                    <div className="flex items-center justify-between text-sm">
                      <Link
                        href="/auth/forgot-password"
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        Voltar
                      </Link>
                      <button
                        type="button"
                        onClick={() => router.push("/auth/login")}
                        className="text-primary hover:underline"
                      >
                        Ir para login
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Senha atualizada</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tudo certo. Agora você já pode entrar com sua nova senha.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/auth/login")}
                      className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                    >
                      Ir para login
                    </button>
                    <Link
                      href="/"
                      className="w-full h-11 rounded-lg border border-border flex items-center justify-center text-sm font-semibold hover:bg-muted transition"
                    >
                      Voltar para home
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
