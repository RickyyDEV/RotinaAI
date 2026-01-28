"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { UserType } from "@/app/(auth)/auth";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";

interface DashboardAppProps {
  user: UserType;
  children: ReactNode;
}

export default function DashboardApp({ user, children }: DashboardAppProps) {
  function DashboardShell() {
    const { isCollapsed } = useSidebar();
    const sidebarWidth = isCollapsed ? 80 : 260;
    const desktopOffsetClass = isCollapsed ? "lg:ml-[80px]" : "lg:ml-[260px]";

    return (
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-[margin] duration-300 ease-in-out ${desktopOffsetClass}`}
        style={{ marginLeft: undefined }}
      >
        <Header user={user} />
        <main className="flex-1 flex overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar userName={user.name} />
        <DashboardShell />
      </div>
    </SidebarProvider>
  );
}
