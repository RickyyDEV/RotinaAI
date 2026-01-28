"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessSignUpProps {
  email?: string;
  onRetry?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function SuccessSignUp({
  email = "seu@email.com",
  onRetry,
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
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #10B981 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold text-green-900 mt-4 text-center relative z-10"
            >
              Conta Criada!
            </motion.h2>
          </div>

          {/* Right Side - Content */}
          <div className="px-6 py-8 md:py-10 space-y-4">
            {/* Email Section */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-2">
                Email de verificação:
              </p>
              <div className="bg-white border border-green-200 rounded-lg px-3 py-2">
                <p className="text-green-900 font-mono text-sm font-medium break-all">
                  {email}
                </p>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
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
            </motion.div>

            {/* Warning */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-xs"
            >
              <p className="text-yellow-800">
                <strong>⚠️</strong> Conta ativa apenas após verificar.
              </p>
            </motion.div>

            {/* Info Compact */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 text-xs text-green-600"
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Link válido por 24 horas</span>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
