import { headers } from "next/headers";
import { authClient } from "../../client";

export type AuthErrorType =
  | "INVALID_CREDENTIALS"
  | "USER_NOT_FOUND"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

export type SignInResponse = {
  success: boolean;
  data?: any;
  error?: {
    type: AuthErrorType;
    message: string;
    details?: string;
  };
};

/**
 * Parse Better Auth error responses into structured error objects
 */
function parseAuthError(error: any): {
  type: AuthErrorType;
  message: string;
  details?: string;
} {
  // Se não há erro, retorna sucesso
  if (!error) {
    return { type: "UNKNOWN_ERROR", message: "" };
  }

  const errorString = error?.toString?.() || "";
  const errorMessage =
    error?.message?.toLowerCase?.() ||
    error?.toString?.().toLowerCase?.() ||
    "";

  // Erro de credenciais inválidas
  if (
    errorMessage.includes("invalid") ||
    errorMessage.includes("incorrect") ||
    errorMessage.includes("credentials") ||
    errorMessage.includes("not found") ||
    errorString.includes("INVALID_CREDENTIALS")
  ) {
    return {
      type: "INVALID_CREDENTIALS",
      message: "Email ou senha incorretos",
      details: "Verifique suas credenciais e tente novamente",
    };
  }

  // Usuário não encontrado
  if (
    errorMessage.includes("user not found") ||
    errorMessage.includes("no user")
  ) {
    return {
      type: "USER_NOT_FOUND",
      message: "Usuário não encontrado",
      details: "Nenhuma conta cadastrada com este email",
    };
  }

  // Erros de rede
  if (
    errorMessage.includes("network") ||
    errorMessage.includes("fetch") ||
    errorMessage.includes("econnrefused")
  ) {
    return {
      type: "NETWORK_ERROR",
      message: "Erro de conexão",
      details: "Verifique sua conexão com a internet e tente novamente",
    };
  }

  // Erro genérico de servidor
  if (
    error?.status >= 500 ||
    errorMessage.includes("server") ||
    errorMessage.includes("internal")
  ) {
    return {
      type: "SERVER_ERROR",
      message: "Erro no servidor",
      details:
        "Nossos servidores estão temporariamente indisponíveis. Tente novamente em alguns momentos",
    };
  }

  // Erro desconhecido
  return {
    type: "UNKNOWN_ERROR",
    message: "Erro ao fazer login",
    details: errorMessage || "Ocorreu um erro inesperado. Tente novamente",
  };
}

export async function SignIn(
  email: string,
  password: string,
): Promise<SignInResponse> {
  console.log(await authClient.getSession());
  try {
    const authenticate = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });
    console.log(authenticate);
    // Se a resposta tem um erro
    if (authenticate.error) {
      const parsedError = parseAuthError(authenticate.error);
      return {
        success: false,
        error: parsedError,
      };
    }

    // Sucesso
    return {
      success: true,
      data: authenticate,
    };
  } catch (error: any) {
    console.error("❌ Erro ao fazer login:", error);
    const parsedError = parseAuthError(error);
    return {
      success: false,
      error: parsedError,
    };
  }
}
