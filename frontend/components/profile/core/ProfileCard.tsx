"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { itemAnimation } from "@/configs/animation.config";
import { cn } from "@/lib/utils"; // Giả định bạn có utility cn hoặc dùng chuỗi thông thường

interface ProfileCardProps {
  title: string;
  icon: LucideIcon;
  variant?: "default" | "primary";
  children: React.ReactNode;
  className?: string;
}

export const ProfileCard = ({
  title,
  icon: Icon,
  variant = "default",
  children,
  className,
}: ProfileCardProps) => {
  const isPrimary = variant === "primary";

  return (
    <motion.div variants={itemAnimation} className={className}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Header */}
        <div
          className={cn(
            "px-6 py-4 transition-colors",
            isPrimary
              ? "bg-[#003087] px-8 py-6 text-white"
              : "border-b border-slate-100 bg-white text-slate-800",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                isPrimary ? "text-white/80" : "bg-blue-50 text-[#003087]",
              )}
            >
              <Icon size={isPrimary ? 24 : 18} />
            </div>
            <h3
              className={cn(
                "font-semibold tracking-wide",
                isPrimary ? "text-lg text-white/90" : "text-slate-800",
              )}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className={cn("p-4", isPrimary && "p-8")}>{children}</div>
      </div>
    </motion.div>
  );
};
