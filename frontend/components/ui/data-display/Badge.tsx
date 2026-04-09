import React from "react";
import { cn } from "@/lib/utils";
import { BADGE_COLORS, BadgeColorKey } from "@/configs/theme.config";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeColorKey;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const Badge = ({
  variant = "info",
  className,
  children,
  isLoading,
  ...props
}: BadgeProps) => {
  if (isLoading) {
    return (
      <span
        className={cn(
          "inline-block h-5 w-16 animate-pulse rounded-full bg-slate-200",
          className,
        )}
      />
    );
  }

  const theme = BADGE_COLORS[variant] || BADGE_COLORS.info;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        theme.bg,
        theme.text,
        theme.ring,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
