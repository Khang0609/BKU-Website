import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TriggerButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  displayLabel: string | null;
  placeholder?: string;
}

export const TriggerButton = ({
  isOpen,
  setIsOpen,
  displayLabel,
  placeholder,
}: TriggerButtonProps) => {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm transition-colors hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
        isOpen ? "border-blue-500 ring-1 ring-blue-500" : "",
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        className={cn(
          "truncate",
          !displayLabel ? "text-slate-400" : "font-medium text-slate-700",
        )}
      >
        {displayLabel || placeholder}
      </span>
      <ChevronDown
        size={16}
        className={cn(
          "flex-shrink-0 text-slate-400 transition-transform duration-200",
          isOpen ? "rotate-180" : "",
        )}
      />
    </div>
  );
};
