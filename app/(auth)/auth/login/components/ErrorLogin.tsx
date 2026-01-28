"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 20, y: -20 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="fixed top-6 right-6 max-w-sm z-50"
        >
          <div className="relative bg-linear-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            {/* Header com ícone e fechar */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0 mt-0.5"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </motion.div>
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-shrink-0 text-red-600/50 hover:text-red-600 dark:text-red-400/50 dark:hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Auto-close progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 6, ease: "linear" }}
              onAnimationComplete={onClose}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-b-lg origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
