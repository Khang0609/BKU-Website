"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { Grid3x3 } from "lucide-react";
import { Portal } from "@/components/ui/overlays/Portal";

interface ServicesMenuProps {
  isCollapsed: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pathname: string;
  role: string | null;
  config: any;
}

export function ServicesMenu({
  isCollapsed,
  isOpen,
  setIsOpen,
  pathname,
  role,
  config,
}: ServicesMenuProps) {
  if (role !== "STUDENT" || !config.services) return null;

  return (
    <>
      <NavItem
        isButton
        label="Student Services"
        icon={Grid3x3}
        isActive={pathname.startsWith("/student-service")}
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        onClick={() => setIsOpen(!isOpen)}
        href="/student-service"
      />

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 top-0 z-50 transition-all duration-300"
              style={{ left: isCollapsed ? 68 : 256 }}
            >
              <div
                className="h-full w-80 overflow-hidden rounded-r-2xl shadow-2xl"
                style={{
                  backdropFilter: "blur(40px)",
                  background: "rgba(3, 43, 145, 0.95)",
                  border: "1px solid rgba(20, 136, 219, 0.3)",
                }}
              >
                <div className="border-b border-white/10 px-6 py-5">
                  <h2 className="text-lg font-semibold text-white">
                    Student Services
                  </h2>
                  <p className="mt-1 text-xs text-white/60">
                    Access administrative services
                  </p>
                </div>
                <div className="scrollbar-hide h-[calc(100vh-88px)] overflow-y-auto py-4">
                  <div className="space-y-1 px-3">
                    {config.services.map((service: any) => {
                      const Icon = service.icon;
                      const isActive = pathname === service.href;
                      return (
                        <Link
                          key={service.id}
                          href={service.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200 ${
                            isActive
                              ? "bg-white/20 text-white shadow-lg"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                              isActive ? "bg-white/20" : "bg-white/5"
                            }`}
                          >
                            <Icon size={20} />
                          </div>
                          <span className="text-left text-sm">
                            {service.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
