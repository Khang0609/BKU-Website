"use client";

import { Shield, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";
import { itemAnimation } from "@/configs/animation.config";
import { ProfileSummary } from "./ProfileSummary";
import { QuickStats } from "./QuickStats";
import { Action } from "./Action";

export const PersonalLegal = () => {
  const { isLoading } = useProfileMainContext();

  return (
    <motion.div variants={itemAnimation}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="bg-[#003087] px-8 py-6 text-white">
          <div className="flex items-center gap-4">
            <Shield className="h-6 w-6 text-white/80" />
            <h2 className="text-lg font-semibold tracking-wide text-white/90">
              Personal & Legal
            </h2>
          </div>
        </div>
        <div className="p-8">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <ProfileSummary />

              <div className="h-px bg-slate-100 dark:bg-slate-50"></div>

              <QuickStats />

              <Action />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
