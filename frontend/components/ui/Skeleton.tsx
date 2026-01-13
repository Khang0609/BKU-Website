import React from "react";
import { cn } from "@/lib/utils";

export const SkeletonCircle = () => {
    return (
        <div className="animate-pulse rounded-full bg-gray-200"></div>
    );
}

export const SkeletonRec = ({width, height}: {width: number, height: number}) => {
  return (
    <div className="animate-pulse rounded-lg bg-gray-200" style={{width, height}}></div>
  )
}
