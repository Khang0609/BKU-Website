"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TOAST_PRESETS, ToastType } from "@/constants/ui-presets/toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toastAnimation } from "@/configs/animation.config";

interface ToastProps {
  isVisible: boolean;
  message?: string;
  type?: ToastType;
  onClose?: () => void;
}

export function Toast({
  isVisible,
  message,
  type = "info",
  onClose,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const preset = TOAST_PRESETS[type];
  const Icon = preset.icon;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            "fixed bottom-8 right-8 z-[9999] flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg",
            preset.bg,
            preset.text,
          )}
        >
          <Icon size={18} />
          <span className="text-sm font-medium">
            {message || preset.defaultMessage}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 rounded-full p-1 hover:bg-black/5"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
