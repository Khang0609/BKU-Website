"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";
import { Badge } from "@/components/ui";

export const ProfileSummary = () => {
  const { profile, initials, fullName } = useProfileMainContext();

  return (
    <div className="flex items-center gap-5">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-50 bg-[#003087] text-2xl font-bold text-white shadow-lg">
        {initials}
      </div>
      <div>
        <Name />
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="info">{profile?.major}</Badge>
        </div>
        <Link
          href="/profile/info"
          className="mt-2 inline-flex items-center text-sm font-medium text-[#003087] hover:underline"
        >
          View Detailed Info <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const Name = () => {
  const { profile, fullName } = useProfileMainContext();

  return (
    <>
      <h3 className="text-xl font-bold text-[#003087] md:text-2xl">
        {fullName}
      </h3>
      <p className="font-medium text-slate-500">ID: {profile?.student_id}</p>
    </>
  );
};
