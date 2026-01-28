import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticate = await auth.api.getSession({
    headers: await headers(),
  });
  if (authenticate?.user) redirect("/dashboard");
  return <>{children}</>;
}
