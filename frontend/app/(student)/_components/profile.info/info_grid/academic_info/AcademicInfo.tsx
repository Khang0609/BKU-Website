import React from "react";
import { GraduationCap } from "lucide-react";
import { ProfileCard } from "@/app/(student)/_components/profile.info/common";
import { Show } from "@/app/(student)/_components/profile.info/info_grid/academic_info/Show";
import { Hide } from "@/app/(student)/_components/profile.info/info_grid/academic_info/Hide";

export const AcademicInfo = () => {
  return (
    <ProfileCard
      title="Academic Information"
      icon={<GraduationCap size={20} />}
      id="academic"
    >
      {/* Main Visible Fields */}
      <Show />

      {/* Hidden Fields (Show More) */}
      <Hide />
    </ProfileCard>
  );
};
