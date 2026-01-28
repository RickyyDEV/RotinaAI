import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    SMTP_SERVER: z.string().min(1),
    SMTP_PORT: z.string().min(1),
    SMTP_USERNAME: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    SMTP_TOKEN: z.string().min(1),
    GOOGLE_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_TOKEN: process.env.SMTP_TOKEN,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
});
