import React from "react";
import { BackButton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface WebHeaderTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export const WebHeaderTitle = ({
  title,
  description,
  className,
}: WebHeaderTitleProps) => {
  return (
    <div className={cn(`flex items-center gap-4`, className)}>
      <BackButton />
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">{title}</h1>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
};
