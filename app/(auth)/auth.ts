import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../(database)/prisma";
import SendOTP from "./auth/register/verification/email-url";
import { env } from "@/env";
import SendResetPasswordEmailUrl from "./auth/forgot-password/verification/email-url";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins: [
    "https://rotinaai.com",
    "http://localhost:3000",
    "https://rotinaai.vercel.app",
  ],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  experimental: { joins: true },
  appName: "RotinaAI",

  emailAndPassword: {
    enabled: true,
    password: {
      hash: (password) => Bun.password.hash(password),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
    sendResetPassword: async ({ user, token }) => {
      await SendResetPasswordEmailUrl(user.email, token, user.name);
    },
  },
  advanced: {
    cookiePrefix: "rotinaai_auth",
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // Preferimos enviar o usuário para uma página do app (UX premium)
      // que valida o link e só então mostra a confirmação.
      let origin: string | undefined;
      if (url) {
        try {
          origin = new URL(url).origin;
        } catch {
          // `url` pode ser relativo dependendo do baseURL; usamos o request como fallback.
        }
      }
      if (!origin && request?.url) {
        try {
          origin = new URL(request.url).origin;
        } catch {
          // ignore
        }
      }

      const verificationPageUrl =
        origin && token
          ? (() => {
              const u = new URL("/auth/register/verification", origin);
              u.searchParams.set("token", token);
              return u.toString();
            })()
          : url;

      await SendOTP(user.email, user.name, verificationPageUrl);
    },
    expiresIn: 60 * 60 * 24 * 1,
    emailAndPassword: {
      requireEmailVerification: true,
      autoSignInAfterVerification: true,
    },
    autoSignInAfterVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 1, // 7 days
  },
});

export type UserType = typeof auth.$Infer.Session.user;
