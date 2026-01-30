"use client";

import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorLoginProps {
  message: string;
  details?: string;
  show: boolean;
  onClose: () => void;
}

export default function ErrorLogin({
  message,
  details,
  show,
  onClose,
}: ErrorLoginProps) {
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(onClose, 6000);
    return () => window.clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 max-w-sm z-50 animate-in fade-in slide-in-from-top-3 duration-300">
      <div className="relative bg-linear-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-lg p-4 shadow-lg backdrop-blur-sm">
        {/* Header com ícone e fechar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="shrink-0 mt-0.5 animate-rotinaai-toast-wiggle">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                {message}
              </h3>
              {details && (
                <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">
                  {details}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-red-600/50 hover:text-red-600 dark:text-red-400/50 dark:hover:text-red-400 transition-all hover:scale-110 active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auto-close progress bar */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-red-500 to-red-600 rounded-b-lg origin-left animate-rotinaai-toast-progress" />
      </div>
    </div>
  );
}
