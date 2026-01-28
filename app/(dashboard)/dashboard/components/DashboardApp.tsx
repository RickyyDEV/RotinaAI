"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSidebar } from "../context/SidebarContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "../context/SidebarContext";

interface DashboardAppProps {
  userName: string;
  userEmail: string;
  children: ReactNode;
}

export default function DashboardApp({
  userName,
  userEmail,
  children,
}: DashboardAppProps) {
  function DashboardShell() {
    const { isCollapsed } = useSidebar();
    const sidebarWidth = isCollapsed ? 80 : 260;

    return (
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <Header userName={userName} userEmail={userEmail} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </motion.div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar userName={userName} />
        <DashboardShell />
      </div>
    </SidebarProvider>
  );
}
