"use client";

import { useState } from "react";
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
  Clock,
  CheckCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/(auth)/client";
import type { UserType } from "@/app/(auth)/auth";
import Image from "next/image";
import ThemeToggleIcon from "@/app/components/ThemeToggleIcon";

interface HeaderProps {
  user: UserType;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const notificationCount = 3;
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
    <header className="sticky top-0 z-40 w-full bg-linear-to-b from-card to-card/95 border-b border-border backdrop-blur-md">
      <div className="w-full px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden hover:scale-105 active:scale-95"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Search Bar - Hidden on small screens */}
            <div className="hidden md:flex items-center flex-1 max-w-md ml-4">
              <div className="relative w-full">
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
              </div>
            </div>
          </div>

          {/* Center: Greeting with time - Hidden on mobile */}
          <div className="hidden xl:flex items-center gap-2 text-center animate-in fade-in duration-300 delay-100">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {greeting}, {user.name.split(" ")[0]}!
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <button className="p-2 hover:bg-muted rounded-lg transition-colors md:hidden hover:scale-105 active:scale-95">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggleIcon />

            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors group hover:scale-105 active:scale-95">
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger text-white text-xs rounded-full flex items-center justify-center font-bold bg-red-500 animate-in zoom-in duration-200">
                    {notificationCount}
                  </span>
                )}
              </div>

              {/* Notification Tooltip */}
              <div className="absolute -right-2 top-12 w-80 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
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
              </div>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-all group hover:scale-[1.02] active:scale-[0.98]"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user.name.split(" ")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email.split("@")[0]}
                  </p>
                </div>

                <div
                  className={`hidden sm:block transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Overlay to close dropdown */}
                  <div
                    onClick={() => setIsDropdownOpen(false)}
                    className="fixed inset-0 z-40"
                  />

                  {/* Dropdown Content */}
                  <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                      <p className="text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {dropdownItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              item.action();
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-md hover:translate-x-1 ${
                              item.isDanger
                                ? "text-danger hover:bg-red-300"
                                : "text-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border space-y-2 animate-in fade-in duration-200">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:translate-x-1 ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
