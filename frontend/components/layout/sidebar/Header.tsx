"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarHeader({ isCollapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center gap-2 border-b border-secondary/20 px-4">
      <motion.div
        animate={{
          opacity: isCollapsed ? 0 : 1,
          width: isCollapsed ? 0 : "auto",
        }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 overflow-hidden"
      >
        {!isCollapsed && (
          <h1 className="whitespace-nowrap text-sm font-semibold tracking-wider text-white">
            BKU PORTAL
          </h1>
        )}
      </motion.div>

      <button
        onClick={onToggle}
        className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 text-white transition-colors hover:bg-white/30"
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? (
          <ChevronRight size={16} strokeWidth={2.5} />
        ) : (
          <ChevronLeft size={16} strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}
