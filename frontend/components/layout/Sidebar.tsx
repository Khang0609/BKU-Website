"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { SIDEBAR_CONFIG } from "@/constants/navigation";

// Sub-components
import { NavItem } from "./sidebar/NavItem";
import { SidebarHeader } from "./sidebar/Header";
import { ServicesMenu } from "./sidebar/ServicesMenu";
import { SidebarFooter } from "./sidebar/Footer";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isLoading?: boolean;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isLoading = false,
}: SidebarProps) {
  const pathname = usePathname();
  const { role, logout } = useAuth();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Default to STUDENT if no role or config found (safe fallback)
  const currentConfig = role ? SIDEBAR_CONFIG[role] : SIDEBAR_CONFIG.STUDENT;

  if (!role && !isLoading) return null; // Don't render sidebar if not authenticated and not loading

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 68 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-secondary/20 bg-primary lg:flex"
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Navigation Items */}
        <nav className="scrollbar-hide flex-1 space-y-2 overflow-y-auto px-3 py-6">
          {isLoading ? (
            // Skeleton Loading State
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-full animate-pulse rounded-lg bg-white/10"
              />
            ))
          ) : (
            <>
              {currentConfig.main.map((item) => (
                <NavItem
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isCollapsed={isCollapsed}
                  isActive={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                />
              ))}

              <ServicesMenu
                isCollapsed={isCollapsed}
                isOpen={isServicesOpen}
                setIsOpen={setIsServicesOpen}
                pathname={pathname}
                role={role}
                config={currentConfig}
              />
            </>
          )}
        </nav>

        <SidebarFooter isCollapsed={isCollapsed} logout={logout} />
      </motion.div>
    </>
  );
}
