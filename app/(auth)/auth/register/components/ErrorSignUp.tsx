"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-red-50 border-2 border-red-200 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-linear-to-r from-red-100 to-red-50 px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="shrink-0"
                >
                  <div className="w-9 h-9 rounded-full bg-red-200 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                </motion.div>
                <h3 className="text-sm font-bold text-red-800 truncate">
                  Erro ao registrar
                </h3>
              </div>

              {onClose && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="shrink-0 text-red-600 hover:text-red-800 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Conteúdo compacto */}
            <div className="px-5 py-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-red-700 text-xs leading-relaxed"
              >
                {message}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
