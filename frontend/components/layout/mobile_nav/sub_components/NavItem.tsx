import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileNav } from "../../../../context/MobileNavContext";

export default function NavItem() {
  const { currentConfig, pathname, role, isServicesOpen, setIsServicesOpen } =
    useMobileNav();

  return (
    <nav className="scrollbar-hide flex-1 overflow-y-auto px-4 py-6">
      <div className="space-y-2">
        {currentConfig.main.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

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
                isServicesOpen || pathname.startsWith("/student-service")
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
              {(isServicesOpen || pathname.startsWith("/student-service")) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                    {currentConfig.services.map((service) => {
                      const Icon = service.icon;
                      const isServiceActive = pathname === service.href;

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
  );
}
