import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/60", className)}
      {...props}
    />
  );
}

export const SkeletonCircle = ({ className }: { className?: string }) => {
  return <Skeleton className={cn("h-full w-full rounded-full", className)} />;
};

export const SkeletonRec = ({
  width,
  height,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) => {
  return (
    <Skeleton
      className={cn("rounded-lg", className)}
      style={{ width, height }}
    />
  );
};
