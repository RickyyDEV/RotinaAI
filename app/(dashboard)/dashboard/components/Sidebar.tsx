"use client";

import {
  Home,
  CheckSquare,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/Logo";
import { useSidebar } from "./context/SidebarContext";

interface SidebarProps {
  userName: string;
}

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const menuItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      id: "dashboard",
    },
    {
      label: "Minhas Tarefas",
      icon: CheckSquare,
      href: "/dashboard/tarefas",
      id: "tarefas",
    },
    {
      label: "Estatísticas",
      icon: BarChart3,
      href: "/dashboard/stats",
      id: "stats",
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/dashboard/settings",
      id: "settings",
    },
    {
      label: "Ajuda",
      icon: HelpCircle,
      href: "/dashboard/help",
      id: "help",
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen bg-card border-r border-border fixed left-0 top-0 z-30 transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-65"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-200">
            <Logo />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-muted rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          <div
            className={`transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* User Card */}
      <div
        className={`mx-2 mt-4 rounded-lg bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20 transition-all ${
          isCollapsed ? "m-2 p-2" : "m-3 p-3"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1 animate-in fade-in duration-200">
              <p className="text-xs font-semibold text-foreground truncate">
                {userName.split(" ")[0]}
              </p>
              <p className="text-xs text-muted-foreground">Ativo agora</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <div key={item.id}>
              <Link href={item.href} title={isCollapsed ? item.label : ""}>
                <div
                  className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:translate-x-1 ${
                    active
                      ? "bg-linear-to-r from-primary/20 to-secondary/20 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-secondary rounded-r-full" />
                  )}

                  <Icon className="w-5 h-5 shrink-0" />

                  {!isCollapsed && (
                    <span className="text-sm animate-in fade-in slide-in-from-left-2 duration-200">
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-popover border border-border rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-40 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className={`mt-auto border-t border-border bg-linear-to-t from-primary/5 to-transparent rounded-lg transition-all ${
          isCollapsed ? "m-2 p-2" : "m-3 p-3"
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground animate-in fade-in duration-200">
              Sua produtividade está{" "}
              <span className="text-primary font-semibold">+15%</span> essa
              semana
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
