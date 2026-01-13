"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { Toast } from "@/components/common";
import { ToastType } from "@/constants/ui-presets/toast";

interface ToastContextType {
  showToast: (message?: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [type, setType] = useState<ToastType>("info");
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const showToast = useCallback((msg?: string, t: ToastType = "info") => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage(msg);
    setType(t);
    setIsVisible(true);

    console.log("Toast shown with message:", msg);

    // Auto-hide after 3 seconds
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        isVisible={isVisible}
        message={message}
        type={type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
