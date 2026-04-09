"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/overlays/Portal";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
  // For special cases like services
  isButton?: boolean;
  isOpen?: boolean;
}

export function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
  isCollapsed,
  onClick,
  isButton = false,
  isOpen = false,
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
    setIsHovered(true);
  };

  const content = (
    <>
      <Icon size={20} className="flex-shrink-0" />
      <motion.span
        animate={{
          opacity: isCollapsed ? 0 : 1,
          width: isCollapsed ? 0 : "auto",
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden whitespace-nowrap text-sm"
      >
        {label}
      </motion.span>
    </>
  );

  const className = `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
    isActive || isOpen
      ? "bg-white/20 text-white"
      : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {isButton ? (
        <button onClick={onClick} className={className}>
          {content}
        </button>
      ) : (
        <Link href={href} className={className} onClick={onClick}>
          {content}
        </Link>
      )}

      {isCollapsed && isHovered && (
        <Portal>
          <div
            className="pointer-events-none fixed z-50 flex items-center"
            style={{
              top: `${tooltipPos.top}px`,
              left: `${tooltipPos.left}px`,
              transform: "translateY(-50%)",
            }}
          >
            <div className="h-0 w-0 border-b-[5px] border-r-[8px] border-t-[5px] border-b-transparent border-r-gray-900 border-t-transparent"></div>
            <div className="whitespace-nowrap rounded-md bg-gray-900 px-2 py-1.5 text-xs font-medium text-white shadow-xl">
              {label}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
