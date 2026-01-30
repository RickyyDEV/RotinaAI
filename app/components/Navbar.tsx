"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggleIcon from "./ThemeToggleIcon";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Como ajuda", href: "#how" },
  { name: "Benefícios", href: "#benefits" },
  { name: "Para quem", href: "#who" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 max-w-full">
      <div className="max-w-7xl mx-auto px-6 py-3 bg-card/60 backdrop-blur-md border border-border rounded-full flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-3 duration-500">
        <Link href="/" className="active:scale-[0.98] transition-transform">
          <Logo className="flex items-center gap-4" />
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggleIcon />
          <Link
            href="/auth/login"
            className="text-sm px-5 py-2.5 border border-border rounded-full text-foreground hover:bg-muted transition-colors duration-200"
            prefetch
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center px-6 py-2.5 rounded-full text-primary-foreground font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(90deg,var(--primary),var(--secondary))",
              boxShadow: "0 8px 16px rgba(37, 99, 235, 0.12)",
            }}
            prefetch
          >
            Começar grátis
          </Link>
        </div>

        <button
          className="md:hidden px-3 py-2 rounded-md bg-card border border-border text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="md:hidden overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="bg-card border border-border rounded-lg p-4 space-y-2 shadow-md">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-sm text-foreground hover:bg-muted rounded-md px-3"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <div className="px-3 pb-2">
                  <ThemeToggleIcon className="h-10 w-10" />
                </div>
                <Link
                  href="/auth/login"
                  className="block py-2 text-sm text-foreground hover:bg-muted rounded-md px-3"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block py-2 text-sm text-primary-foreground rounded-md px-3 mt-2"
                  style={{
                    background:
                      "linear-gradient(90deg,var(--primary),var(--secondary))",
                  }}
                >
                  Começar grátis
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
