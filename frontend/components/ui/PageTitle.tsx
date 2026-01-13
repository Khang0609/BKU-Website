"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { pageTitleAnimation } from "@/configs/animation.config";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  className?: string;
}

export const PageTitle = ({
  title,
  subtitle,
  icon: Icon,
  className,
}: PageTitleProps) => {
  return (
    <motion.div {...pageTitleAnimation} className={cn(className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary md:h-12 md:w-12">
          <Icon className="text-white" size={20} />
        </div>
        <div>
          <h1 className="title-xl font-bold text-gray-900">{title}</h1>
          <p className="subtitle-xl line-clamp-1 text-gray-600">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};
