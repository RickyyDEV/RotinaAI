"use client";

import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import { SignUp } from "./action";
import ErrorSignUp from "./components/ErrorSignUp";
import SuccessSignUp from "./components/SuccessSignUp";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

type State = {
  isSubmitting: boolean;
  error: { show: boolean; message: string };
  success: { show: boolean; email: string };
};

type Action =
  | { type: "START_SUBMIT" }
  | { type: "END_SUBMIT" }
  | { type: "SHOW_ERROR"; payload: string }
  | { type: "HIDE_ERROR" }
  | { type: "SHOW_SUCCESS"; payload: string }
  | { type: "HIDE_SUCCESS" }
  | { type: "RESET" };

const initialState: State = {
  isSubmitting: false,
  error: { show: false, message: "" },
  success: { show: false, email: "" },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_SUBMIT":
      return { ...state, isSubmitting: true };
    case "END_SUBMIT":
      return { ...state, isSubmitting: false };
    case "SHOW_ERROR":
      return {
        ...state,
        error: { show: true, message: action.payload },
        isSubmitting: false,
      };
    case "HIDE_ERROR":
      return { ...state, error: { show: false, message: "" } };
    case "SHOW_SUCCESS":
      return {
        ...state,
        success: { show: true, email: action.payload },
        isSubmitting: false,
      };
    case "HIDE_SUCCESS":
      return { ...state, success: { show: false, email: "" } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    dispatch({ type: "START_SUBMIT" });
    const authentication = await SignUp(data.name, data.email, data.password);

    if (authentication) {
      dispatch({ type: "SHOW_SUCCESS", payload: data.email });
      reset();
    } else {
      dispatch({
        type: "SHOW_ERROR",
        payload:
          "Ocorreu um erro ao criar sua conta. Talvez esse usuário já exista.",
      });
      reset();
    }
    dispatch({ type: "END_SUBMIT" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <ErrorSignUp
        message={state.error.message}
        show={state.error.show}
        onClose={() => dispatch({ type: "HIDE_ERROR" })}
      />

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        <SuccessSignUp
          email={state.success.email}
          open={state.success.show}
          onOpenChange={(open) => {
            if (!open) dispatch({ type: "HIDE_SUCCESS" });
          }}
        />

        {/* Logo */}
        <div className="text-center mb-8 animate-in fade-in duration-500 delay-200">
          <div className="flex justify-center mb-6">
            <Logo className="gap-2!" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Crie sua conta</h2>
          <p className="text-muted-foreground">
            Organize sua rotina com IA inteligente
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl animate-in fade-in zoom-in-95 duration-400 delay-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 delay-400">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="João Silva"
                {...register("name")}
                className={`w-full px-4 py-3 rounded-lg border transition-all outline-none placeholder-muted-foreground bg-popover ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 delay-450">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg border transition-all outline-none placeholder-muted-foreground bg-popover ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 delay-500">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg border transition-all outline-none placeholder-muted-foreground bg-popover ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 delay-550">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`w-full px-4 py-3 rounded-lg border transition-all outline-none placeholder-muted-foreground bg-popover ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={state.isSubmitting}
              className="w-full py-3 rounded-lg text-primary-foreground font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(90deg,var(--primary),var(--secondary))",
              }}
            >
              {state.isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground animate-in fade-in duration-400 delay-600">
            Já tem uma conta?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Faça login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8 animate-in fade-in duration-500 delay-700">
          Ao se registrar, você concorda com nossos{" "}
          <Link href="/terms" className="hover:text-foreground transition">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link href="/privacy" className="hover:text-foreground transition">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
}
