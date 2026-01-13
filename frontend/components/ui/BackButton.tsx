"use client";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  onBack?: () => void;
  className?: string;
}

export const BackButton = ({ onBack, className }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        "rounded-full p-2 text-blue-600 hover:bg-blue-50",
        className,
      )}
    >
      <ArrowLeft size={24} />
    </button>
  );
};
