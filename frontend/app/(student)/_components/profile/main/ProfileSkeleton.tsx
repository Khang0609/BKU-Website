"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";
import { containerAnimation, itemAnimation } from "@/configs/animation.config";

export const ProfileSkeleton = () => {
  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        {/* Personal & Legal Skeleton */}
        <motion.div variants={itemAnimation}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-50 px-8 py-6">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="space-y-6 p-8">
              <div className="flex items-center gap-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Clusters Skeleton */}
        {[1].map((i) => (
          <motion.div key={i} variants={itemAnimation}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-4 p-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-4 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <motion.div key={i} variants={itemAnimation}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-4 p-4">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-4 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
