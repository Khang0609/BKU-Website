"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

interface ProfileCardItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  desc?: string;
  onClick?: (e: React.MouseEvent, href: string) => void;
  className?: string;
}

export const ProfileCardItem = ({
  label,
  href,
  icon: Icon,
  desc,
  onClick,
  className,
}: ProfileCardItemProps) => {
  const { showToast } = useToast();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e, href);
    } else if (href === "#") {
      e.preventDefault();
      showToast("Coming Soon in next update!", "coming_soon");
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "group mb-2 flex items-center gap-4 rounded-xl p-3 transition-all last:mb-0 hover:bg-slate-50",
        className,
      )}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#003087] group-hover:text-white">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-700 group-hover:text-[#003087]">
          {label}
        </p>
        {desc && <p className="text-xs text-slate-500">{desc}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
    </Link>
  );
};
