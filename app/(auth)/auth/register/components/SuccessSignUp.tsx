"use client";

import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";

interface SuccessSignUpProps {
  email?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function SuccessSignUp({
  email = "seu@email.com",
  open = true,
  onOpenChange,
}: SuccessSignUpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-2 border-green-200 bg-linear-to-br from-green-50 to-emerald-50 p-0 gap-0 shadow-2xl">
        <DialogTitle></DialogTitle>
        {/* Grid: Visual Left + Content Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Side - Visual */}
          <div className="bg-linear-to-br from-green-100 to-emerald-100 px-6 py-8 md:py-10 flex flex-col items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5 animate-rotinaai-soft-pulse"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #10B981 0%, transparent 70%)",
              }}
            />

            {/* Checkmark */}
            <div className="relative z-10 animate-in zoom-in-95 duration-500">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-rotinaai-float">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-green-900 mt-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
              Conta Criada!
            </h2>
          </div>

          {/* Right Side - Content */}
          <div className="px-6 py-8 md:py-10 space-y-4">
            {/* Email Section */}
            <div className="animate-in fade-in slide-in-from-right-2 duration-500 delay-300">
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-2">
                Email de verificação:
              </p>
              <div className="bg-white border border-green-200 rounded-lg px-3 py-2">
                <p className="text-green-900 font-mono text-sm font-medium break-all">
                  {email}
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-500 delay-400">
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">
                Próximos passos:
              </p>
              <div className="flex gap-3">
                <div>
                  <span className="flex w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold items-center justify-center">
                    1
                  </span>
                </div>
                <div className="text-xs text-green-900">
                  <p className="font-medium">Abra seu email</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <span className="flex w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold items-center justify-center">
                    2
                  </span>
                </div>
                <div className="text-xs text-green-900">
                  <p className="font-medium">Clique no botão</p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-xs animate-in fade-in slide-in-from-right-2 duration-500 delay-500">
              <p className="text-yellow-800">
                <strong>⚠️</strong> Conta ativa apenas após verificar.
              </p>
            </div>

            {/* Info Compact */}
            <div className="flex items-center gap-2 text-xs text-green-600 animate-in fade-in slide-in-from-right-2 duration-500 delay-600">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Link válido por 24 horas</span>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-700">
              <DialogFooter className="pt-2 sm:justify-between">
                <Button asChild type="button">
                  <Link href="/auth/login">Ir para login</Link>
                </Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
