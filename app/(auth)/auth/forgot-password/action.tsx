"use server";

import { headers } from "next/headers";
import { auth } from "../../auth";

export default async function RequestPasswordReset(email: string) {
  const { message, status } = await auth.api.requestPasswordReset({
    headers: await headers(),
    body: {
      email,
    },
  });
  console.log(message, status);
  return { message, status };
}
