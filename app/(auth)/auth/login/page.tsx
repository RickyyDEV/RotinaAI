"use client";

import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import ErrorLogin from "./components/ErrorLogin";
import { authClient } from "../../client";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// State management para o formulário de login
type LoginState = {
  isSubmitting: boolean;
  isGoogleLoading: boolean;
  error: {
    show: boolean;
    message: string;
    details?: string;
  };
};

type LoginAction =
  | { type: "START_SUBMIT" }
  | { type: "END_SUBMIT" }
  | { type: "START_GOOGLE_LOADING" }
  | { type: "END_GOOGLE_LOADING" }
  | { type: "SHOW_ERROR"; payload: { message: string; details?: string } }
  | { type: "HIDE_ERROR" }
  | { type: "RESET" };

const initialLoginState: LoginState = {
  isSubmitting: false,
  isGoogleLoading: false,
  error: {
    show: false,
    message: "",
    details: "",
  },
};

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case "START_SUBMIT":
      return {
        ...state,
        isSubmitting: true,
        error: { show: false, message: "" },
      };
    case "END_SUBMIT":
      return { ...state, isSubmitting: false };
    case "START_GOOGLE_LOADING":
      return { ...state, isGoogleLoading: true };
    case "END_GOOGLE_LOADING":
      return { ...state, isGoogleLoading: false };
    case "SHOW_ERROR":
      return {
        ...state,
        error: {
          show: true,
          message: action.payload.message,
          details: action.payload.details,
        },
      };
    case "HIDE_ERROR":
      return {
        ...state,
        error: { show: false, message: "", details: "" },
      };
    case "RESET":
      return initialLoginState;
    default:
      return state;
  }
}

export default function LoginPage() {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: LoginFormData) => {
    dispatch({ type: "START_SUBMIT" });
    const authenticate = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    });
    if (authenticate.error) {
      dispatch({
        type: "SHOW_ERROR",
        payload: {
          message: "Ocorreu um erro ao tentar logar.",
          details: authenticate.error.message,
        },
      });
    }
    dispatch({ type: "END_SUBMIT" });
  };

  const handleGoogleLogin = async () => {
    dispatch({ type: "START_GOOGLE_LOADING" });
    try {
      const authenticate = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (authenticate.error) {
        dispatch({
          type: "SHOW_ERROR",
          payload: {
            message: "Ocorreu um erro ao tentar logar com o Google.",
            details: authenticate.error.message,
          },
        });
      }
    } finally {
      dispatch({ type: "END_GOOGLE_LOADING" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      {/* Toast de erro */}
      <ErrorLogin
        message={state.error.message}
        details={state.error.details}
        show={state.error.show}
        onClose={() => dispatch({ type: "HIDE_ERROR" })}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <Logo className="gap-2!" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta</h2>
          <p className="text-muted-foreground">
            Acesse sua conta para continuar planejando
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-xl"
        >
          {/* Google Login Button */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            disabled={state.isGoogleLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full py-3 rounded-lg border border-border bg-popover hover:bg-muted transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {state.isGoogleLoading ? "Conectando..." : "Continuar com Gmail"}
          </motion.button>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Ou continue com email
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
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
            </motion.div>

            {/* Senha */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:text-primary/80 transition"
                >
                  Esqueceu a senha?
                </Link>
              </div>
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
            </motion.div>
            {/* Botão */}
            <motion.button
              type="submit"
              disabled={state.isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg text-primary-foreground font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              style={{
                background:
                  "linear-gradient(90deg,var(--primary),var(--secondary))",
              }}
            >
              {state.isSubmitting ? "Entrando..." : "Entrar"}
            </motion.button>
          </form>

          {/* Link para Registro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Não tem uma conta?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Registre-se
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Ao fazer login, você concorda com nossos{" "}
          <Link href="/terms" className="hover:text-foreground transition">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link href="/privacy" className="hover:text-foreground transition">
            Política de Privacidade
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
