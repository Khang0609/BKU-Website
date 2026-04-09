"use client";

import { Shield } from "lucide-react";
import { ProfileSummary } from "./ProfileSummary";
import { QuickStats } from "./QuickStats";
import { Action } from "./Action";
import { ProfileCard } from "@components/profile/core";

export const PersonalLegal = () => {
  return (
    <ProfileCard title="Personal & Legal" icon={Shield} variant="primary">
      <div className="flex flex-col gap-6">
        <ProfileSummary />

        <div className="h-px bg-slate-100 dark:bg-slate-50"></div>

        <QuickStats />

        <Action />
      </div>
    </ProfileCard>
  );
};
