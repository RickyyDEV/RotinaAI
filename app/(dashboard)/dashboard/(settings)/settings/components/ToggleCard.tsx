import type { ReactNode } from "react";

export default function ToggleCard({
  checked,
  onChange,
  label,
  description,
  icon,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full text-left rounded-2xl border border-border bg-background/60 hover:bg-muted/60 transition-colors p-4"
      aria-pressed={checked}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/15 to-secondary/15 grid place-items-center shrink-0">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">{label}</p>
            <span
              className={`h-6 w-11 rounded-full border transition-colors relative shrink-0 ${
                checked
                  ? "bg-primary/20 border-primary/30"
                  : "bg-muted border-border"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full transition-transform ${
                  checked
                    ? "translate-x-5 bg-linear-to-br from-primary to-secondary"
                    : "translate-x-0.5 bg-foreground/20"
                }`}
              />
            </span>
          </div>
          {description ? (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
}
