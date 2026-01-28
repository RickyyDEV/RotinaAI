import { auth } from "@/app/(auth)/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardApp from "./components/DashboardApp";

export const metadata = {
  title: "Dashboard - RotinaAI",
  description: "Organize sua rotina com IA",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticate = await auth.api.getSession({
    headers: await headers(),
  });
  if (!authenticate?.user) redirect("/auth/login");

  return <DashboardApp user={authenticate.user}>{children}</DashboardApp>;
}
