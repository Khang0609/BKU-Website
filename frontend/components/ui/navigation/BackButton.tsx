"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  onBack?: () => void;
  className?: string;
  variant?: "ghost" | "outline" | "filled";
}

export const BackButton = ({ 
  onBack, 
  className, 
  variant = "outline" 
}: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const variants = {
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    outline: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
    filled: "bg-primary text-white hover:bg-primary/90 shadow-md",
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        "group flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 active:scale-95",
        variants[variant],
        className
      )}
      aria-label="Quay lại"
    >
      <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
    </button>
  );
};
