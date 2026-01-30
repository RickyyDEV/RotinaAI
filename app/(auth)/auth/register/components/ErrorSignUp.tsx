"use client";

import { X, AlertCircle } from "lucide-react";

interface ErrorSignUpProps {
  message?: string;
  onClose?: () => void;
  show?: boolean;
}

export default function ErrorSignUp({
  message = "Erro ao criar sua conta. Tente novamente.",
  onClose,
  show = true,
}: ErrorSignUpProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-linear-to-r from-red-100 to-red-50 px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 animate-rotinaai-toast-wiggle">
              <div className="w-9 h-9 rounded-full bg-red-200 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-red-800 truncate">
              Erro ao registrar
            </h3>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-red-600 hover:text-red-800 transition-all p-1 hover:scale-110 active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Conteúdo compacto */}
        <div className="px-5 py-3">
          <p className="text-red-700 text-xs leading-relaxed animate-in fade-in duration-300 delay-100">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
