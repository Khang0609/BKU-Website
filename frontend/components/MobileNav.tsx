"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SIDEBAR_CONFIG } from "@/components/Sidebar";

export function MobileNav() {
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

  if (!role) return null;

  return (
    <>
      {/* Hamburger Button - Visible only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300/40 border border-gray-300/80 text-primary shadow-lg backdrop-blur-lg lg:hidden"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[80%] min-w-[280px] max-w-sm flex-col bg-primary text-white shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
                  <h2 className="text-lg font-bold tracking-wider">
                    BKU PORTAL
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 hover:bg-white/10"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="scrollbar-hide flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-2">
                    {currentConfig.main.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/");

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
                            isActive
                              ? "bg-white/20 font-medium text-white"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon size={20} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}

                    {/* Check for Student Services */}
                    {role === "STUDENT" && currentConfig.services && (
                      <div className="pt-2">
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white ${
                            isServicesOpen ||
                            pathname.startsWith("/student-service")
                              ? "bg-white/10 text-white"
                              : ""
                          }`}
                        >
                          <span className="font-medium">Student Services</span>
                          {isServicesOpen ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>

                        <AnimatePresence>
                          {(isServicesOpen ||
                            pathname.startsWith("/student-service")) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                                {currentConfig.services.map((service) => {
                                  const Icon = service.icon;
                                  const isServiceActive =
                                    pathname === service.href;

                                  return (
                                    <Link
                                      key={service.id}
                                      href={service.href}
                                      className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                        isServiceActive
                                          ? "bg-white/20 text-white"
                                          : "text-white/70 hover:bg-white/10 hover:text-white"
                                      }`}
                                    >
                                      <Icon size={18} />
                                      <span>{service.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </nav>

                {/* Footer */}
                <div className="space-y-2 border-t border-white/10 px-4 py-4">
                  <button className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
