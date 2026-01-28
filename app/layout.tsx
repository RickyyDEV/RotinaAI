import type { Metadata } from "next";
// @ts-expect-error Next.js suporta import global de CSS no layout, mas o TS pode não resolver tipos aqui.
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./components/ui/theme-provider";

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
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
