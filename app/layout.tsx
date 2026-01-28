import type { Metadata } from "next";
// @ts-expect-error Next.js allows global CSS import in App Router.
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "RotinaAI - Organize sua Rotina com IA",
  description:
    "Transforme texto livre em agendas inteligentes, tarefas priorizadas e planos diários automatizados com RotinaAI.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "RotinaAI - Organize sua Rotina com IA",
    description:
      "Um assistente diário que organiza sua rotina com IA inteligente.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
