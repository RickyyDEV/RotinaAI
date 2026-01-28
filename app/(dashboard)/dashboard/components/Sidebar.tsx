"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden lg:flex flex-col h-screen bg-card border-r border-border fixed left-0 top-0 z-30"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <Logo />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.button>
      </div>

      {/* User Card */}
      <motion.div
        animate={{
          padding: isCollapsed ? "8px" : "12px",
          margin: isCollapsed ? "8px" : "12px",
        }}
        className="mx-2 mt-4 p-3 rounded-lg bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="text-xs font-semibold text-foreground truncate">
                  {userName.split(" ")[0]}
                </p>
                <p className="text-xs text-muted-foreground">Ativo agora</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href} title={isCollapsed ? item.label : ""}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    active
                      ? "bg-linear-to-r from-primary/20 to-secondary/20 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-secondary rounded-r-full"
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                    />
                  )}

                  <Icon className="w-5 h-5 shrink-0" />

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-popover border border-border rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-40 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <motion.div
        animate={{
          padding: isCollapsed ? "8px" : "12px",
          margin: isCollapsed ? "8px" : "12px",
        }}
        className="mt-auto p-3 border-t border-border bg-linear-to-t from-primary/5 to-transparent rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                Sua produtividade está{" "}
                <span className="text-primary font-semibold">+15%</span> essa
                semana
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.aside>
  );
}
