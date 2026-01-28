import { auth } from "@/app/(auth)/auth";
import { headers } from "next/headers";
import DashboardWelcome from "../components/DashboardWelcome";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const authenticate = await auth.api.getSession({
    headers: await headers(),
  });
  if (!authenticate?.user) return notFound();
  return <DashboardWelcome userName={authenticate.user.name} />;
}
