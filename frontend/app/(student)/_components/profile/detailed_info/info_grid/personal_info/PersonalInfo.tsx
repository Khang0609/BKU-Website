import React from "react";
import { User } from "lucide-react";
import { ProfileCard } from "@/app/(student)/_components/profile/detailed_info/common";
import Hide from "@/app/(student)/_components/profile/detailed_info/info_grid/personal_info/Hide";
import InfoCol from "@/app/(student)/_components/profile/detailed_info/info_grid/personal_info/InfoCol";
import AvatarCol from "@/app/(student)/_components/profile/detailed_info/info_grid/personal_info/AvatarCol";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

export const PersonalInfo = () => {
  return (
    <ProfileCard
      title="Personal Details"
      icon={<User size={20} />}
      id="personal"
    >
      <Show />

      <Hide />
    </ProfileCard>
  );
};

const Show = () => (
  <div className="flex flex-col-reverse gap-6 md:flex-row">
    {/* Info Column */}
    <InfoCol />

    {/* Avatar Column */}
    <AvatarCol />
  </div>
);
