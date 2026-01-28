"use server";

import { headers } from "next/headers";
import { auth } from "../../auth";

export async function SignUp(
  full_name: string,
  email: string,
  password: string,
) {
  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email,
        password,
        name: full_name,
      },
    });
    return true;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return false;
  }
}
