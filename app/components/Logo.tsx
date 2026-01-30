export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden>
      {/* Icon - Creative Neural Flux Design */}
      <div className="relative h-10 w-10 flex-none transition-transform duration-200 hover:scale-[1.03]">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            {/* Main gradient */}
            <linearGradient id="flux-main" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>

            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="url(#flux-main)"
            strokeWidth="1.5"
            opacity="0.2"
          />

          {/* Central animated nodes */}
          <circle
            cx="24"
            cy="24"
            r="4"
            fill="url(#flux-main)"
            filter="url(#glow)"
            className="animate-rotinaai-flux-pulse"
          />

          {/* Orbital paths - Flux streams */}
          <g className="animate-rotinaai-flux-spin">
            {/* Top-right path */}
            <path
              d="M24 24 Q32 16 35 12"
              stroke="url(#flux-main)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle
              cx="35"
              cy="12"
              r="2.5"
              fill="url(#flux-main)"
              filter="url(#glow)"
            />

            {/* Right path */}
            <path
              d="M24 24 Q36 24 40 24"
              stroke="url(#flux-main)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle
              cx="40"
              cy="24"
              r="2.5"
              fill="url(#flux-main)"
              filter="url(#glow)"
            />

            {/* Bottom-right path */}
            <path
              d="M24 24 Q32 32 35 36"
              stroke="url(#flux-main)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <circle
              cx="35"
              cy="36"
              r="2.5"
              fill="url(#flux-main)"
              filter="url(#glow)"
            />
          </g>

          {/* Counter-rotating accent paths */}
          <g className="animate-rotinaai-flux-spin-reverse">
            {/* Bottom-left path */}
            <path
              d="M24 24 Q16 32 13 36"
              stroke="var(--secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
            <circle
              cx="13"
              cy="36"
              r="2"
              fill="var(--secondary)"
              opacity="0.7"
            />

            {/* Left path */}
            <path
              d="M24 24 Q12 24 8 24"
              stroke="var(--secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            <circle
              cx="8"
              cy="24"
              r="2"
              fill="var(--secondary)"
              opacity="0.6"
            />

            {/* Top-left path */}
            <path
              d="M24 24 Q16 16 13 12"
              stroke="var(--secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.3"
            />
            <circle
              cx="13"
              cy="12"
              r="2"
              fill="var(--secondary)"
              opacity="0.5"
            />
          </g>

          {/* Pulse effect for the core */}
          <circle
            cx="24"
            cy="24"
            r="4"
            fill="none"
            stroke="url(#flux-main)"
            strokeWidth="2"
            className="animate-rotinaai-flux-glow"
          />
        </svg>

        {/* Ambient glow */}
        <div
          className="absolute inset-0 bg-linear-to-r from-primary via-secondary to-primary blur-md rounded-full animate-rotinaai-flux-glow"
          style={{ filter: "blur(8px)" }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold tracking-tight">
          <span className="inline-block transition-transform duration-200 hover:scale-[1.06]">
            Rotina
          </span>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary inline-block transition-transform duration-200 hover:scale-[1.06]">
            AI
          </span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground/80">
          Produtividade inteligente
        </span>
      </div>
    </div>
  );
}
