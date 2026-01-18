"use client";

import React from "react";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";

export const QuickStats = () => {
  const { profile } = useProfileMainContext();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-slate-50 p-3">
        <p className="text-xs text-slate-500">Academic Status</p>
        <p className="font-semibold text-green-600">{profile?.status}</p>
      </div>
      <div className="rounded-lg bg-slate-50 p-3">
        <p className="text-xs text-slate-500">Current Class</p>
        <p className="font-semibold text-[#003087]">{profile?.class_code}</p>
      </div>
    </div>
  );
};
