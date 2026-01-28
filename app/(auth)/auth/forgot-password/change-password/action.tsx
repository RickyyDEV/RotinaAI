"use server";

import { headers } from "next/headers";
import { auth } from "@/app/(auth)/auth";

export async function resetPasswordWithToken(input: {
  token: string;
  newPassword: string;
}): Promise<
  | { ok: true }
  | {
      ok: false;
      message: string;
    }
> {
  const token = input.token.trim();
  const newPassword = input.newPassword;

  if (!token) {
    return { ok: false, message: "Token ausente. Solicite um novo link." };
  }

  try {
    const result = await auth.api.resetPassword({
      headers: await headers(),
      body: {
        newPassword,
        token,
      },
    });

    if (result?.status) return { ok: true };
    return { ok: false, message: "Não foi possível redefinir sua senha." };
  } catch {
    return {
      ok: false,
      message: "Link inválido ou expirado. Solicite um novo link.",
    };
  }
}
