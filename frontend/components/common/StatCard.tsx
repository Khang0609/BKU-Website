import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCardPreset } from "@/constants/ui-presets/stat-card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: keyof typeof StatCardPreset;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  color,
  className,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className={cn("mb-2 flex items-center justify-between", className)}>
        <span className="text-sm text-gray-600">{title}</span>
        <Icon className={cn(StatCardPreset[color])} size={20} />
      </div>
      <p className="text-xl font-bold text-gray-800 md:text-2xl">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
};
