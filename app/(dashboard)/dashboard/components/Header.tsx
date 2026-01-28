"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Menu,
  X,
  Search,
  LogOut,
  Settings,
  User,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/(auth)/client";

interface HeaderProps {
  userName: string;
  userEmail: string;
}

export default function Header({ userName, userEmail }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [notificationCount] = useState(3);
  const router = useRouter();
  // Get current time period
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: CheckCircle },
    { label: "Minhas Tarefas", href: "/dashboard/tarefas", icon: CheckCircle },
    { label: "Estatísticas", href: "/dashboard/stats", icon: CheckCircle },
    { label: "Configurações", href: "/dashboard/settings", icon: Settings },
  ];

  const dropdownItems = [
    { label: "Meu Perfil", icon: User, action: () => {} },
    { label: "Configurações", icon: Settings, action: () => {} },
    { label: "Ajuda", icon: HelpCircle, action: () => {} },
    {
      label: "Sair",
      icon: LogOut,
      action: async () => {
        await authClient.signOut().then(() => {
          router.push("/auth/login");
        });
      },
      isDanger: true,
    },
  ];

  return (
    <motion.header className="sticky top-0 z-40 w-full bg-linear-to-b from-card to-card/95 border-b border-border backdrop-blur-md">
      <div className="w-full px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>

            {/* Search Bar - Hidden on small screens */}
            <div className="hidden md:flex items-center flex-1 max-w-md ml-4">
              <motion.div
                animate={{ width: searchFocus ? "100%" : "auto" }}
                className="relative w-full"
              >
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                    searchFocus
                      ? "border-primary bg-muted"
                      : "border-border bg-popover hover:bg-muted"
                  }`}
                >
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar tarefas..."
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    className="bg-transparent outline-none text-sm flex-1 placeholder-muted-foreground"
                  />
                  {searchFocus && (
                    <kbd className="hidden sm:inline text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                      ESC
                    </kbd>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Center: Greeting with time - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="hidden xl:flex items-center gap-2 text-center"
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {greeting}, {userName.split(" ")[0]}!
            </span>
          </motion.div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-muted rounded-lg transition-colors md:hidden"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors group"
            >
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                {notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-danger text-white text-xs rounded-full flex items-center justify-center font-bold bg-red-500"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </div>

              {/* Notification Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                whileHover={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -right-2 top-12 w-80 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
              >
                <div className="bg-popover border border-border rounded-lg shadow-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Bell className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Notificações</span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-xs">
                      <p className="font-medium text-foreground">
                        Você completou 5 tarefas hoje!
                      </p>
                      <p className="text-muted-foreground">há {i}h</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>

                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {userName.split(" ")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userEmail.split("@")[0]}
                  </p>
                </div>

                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden sm:block"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Overlay to close dropdown */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsDropdownOpen(false)}
                      className="fixed inset-0 z-40"
                    />

                    {/* Dropdown Content */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                      className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-border bg-muted/50">
                        <p className="text-sm font-semibold text-foreground">
                          {userName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {userEmail}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {dropdownItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.button
                              key={index}
                              whileHover={{ x: 4 }}
                              onClick={() => {
                                item.action();
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-md ${
                                item.isDanger
                                  ? "text-danger hover:bg-red-300"
                                  : "text-foreground hover:bg-muted"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {item.label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 pt-4 border-t border-border space-y-2"
            >
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top Status Bar - AI Helper Prompt */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block px-6 py-3 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5 border-t border-primary/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              Pronto para planejar seu dia? Digite seus objetivos e deixe a IA
              organizar!
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Começar
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  );
}
