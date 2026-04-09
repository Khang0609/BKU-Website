import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import { SIDEBAR_CONFIG } from "@/constants/navigation";

export const useMobileNavLogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const { role, logout } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentConfig = role ? SIDEBAR_CONFIG[role] : SIDEBAR_CONFIG.STUDENT;

  return {
    isOpen,
    setIsOpen,
    isServicesOpen,
    setIsServicesOpen,
    pathname,
    role,
    logout,
    currentConfig,
  };
};
