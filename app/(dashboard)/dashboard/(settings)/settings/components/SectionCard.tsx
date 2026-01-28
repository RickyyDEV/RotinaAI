import type { ReactNode } from "react";

import { ChevronRight } from "lucide-react";

export default function SectionCard({
  id,
  title,
  subtitle,
  icon,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 lg:p-8 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-linear-to-br from-primary/15 to-secondary/15 grid place-items-center">
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <a
          href={`#${id}`}
          className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Link
          <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}
