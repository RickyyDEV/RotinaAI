import { auth } from "@/app/(auth)/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authenticate = await auth.api.getSession({
    headers: await headers(),
  });
  if (!authenticate?.user) redirect("/auth/login");
  return <>{children}</>;
}
