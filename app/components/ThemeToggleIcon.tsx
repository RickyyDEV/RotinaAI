"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

type ThemeMode = "light" | "dark";

type OverlayState = {
  id: number;
  to: ThemeMode;
  x: number;
  y: number;
};

export default function ThemeToggleIcon({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const next: ThemeMode = isDark ? "light" : "dark";

  const [overlay, setOverlay] = useState<OverlayState | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

          if (!reduceMotion) {
            setOverlay({ id: Date.now(), to: next, x, y });
          }

          setTheme(next);
        }}
        className={
          className ??
          "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/70 hover:bg-muted transition-colors"
        }
      >
        <span className={iconClassName}>
          <span className="relative block h-5 w-5">
            <Sun
              className={
                "absolute inset-0 h-5 w-5 text-muted-foreground transition-all duration-200 opacity-100 rotate-0 scale-100 dark:opacity-0 dark:-rotate-90 dark:scale-75"
              }
            />
            <Moon
              className={
                "absolute inset-0 h-5 w-5 text-muted-foreground transition-all duration-200 opacity-0 rotate-90 scale-75 dark:opacity-100 dark:rotate-0 dark:scale-100"
              }
            />
          </span>
        </span>
      </button>

      {overlay ? (
        <div
          key={overlay.id}
          className={
            "fixed inset-0 pointer-events-none z-9999 animate-rotinaai-theme-ripple " +
            (overlay.to === "dark" ? "mix-blend-multiply" : "mix-blend-screen")
          }
          style={{
            background:
              overlay.to === "dark"
                ? `radial-gradient(circle at ${overlay.x}px ${overlay.y}px, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.35) 38%, rgba(2,6,23,0) 70%)`
                : `radial-gradient(circle at ${overlay.x}px ${overlay.y}px, rgba(248,250,252,0.85) 0%, rgba(248,250,252,0.35) 40%, rgba(248,250,252,0) 72%)`,
          }}
          onAnimationEnd={() => setOverlay(null)}
        />
      ) : null}
    </>
  );
}
