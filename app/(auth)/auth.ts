import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../(database)/prisma";
import { emailOTP, twoFactor } from "better-auth/plugins";
import { EmailParams, Recipient, Sender } from "mailersend";
import mailerSend from "@/lib/smtp";
import SendOTP from "./auth/register/verification/otp";
import { env } from "@/env";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
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
  },
  advanced: {
    cookiePrefix: "rotinaai_auth",
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await SendOTP(user.email, user.name, url);
    },
    expiresIn: 1000 * 60 * 60 * 24,
    emailAndPassword: {
      requireEmailVerification: true,
      autoSignInAfterVerification: true,
    },
    autoSignInAfterVerification: true,
  },
});
