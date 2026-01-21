import React from "react";
import { GridItemProps } from "@/app/(student)/_types/profile/info";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

export const GridItem = ({
  label,
  value,
  icon,
  className = "",
  bold,
  subtle,
  large,
}: GridItemProps) => {
  const { isLoading } = useProfileContext();
  return (
    <div className={`group flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400 opacity-70">{icon}</span>}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider text-slate-400`}
        >
          {label}
        </span>
      </div>
      <div
        className={`break-words ${large ? "text-lg" : "text-sm"} ${
          isLoading
            ? "mt-0.5 h-4 w-full max-w-[8rem] animate-pulse rounded bg-slate-200 text-transparent"
            : `${
                bold ? "font-bold text-slate-900" : "font-medium text-slate-700"
              } ${subtle ? "text-slate-500" : ""}`
        }`}
      >
        {value}
      </div>
    </div>
  );
}
