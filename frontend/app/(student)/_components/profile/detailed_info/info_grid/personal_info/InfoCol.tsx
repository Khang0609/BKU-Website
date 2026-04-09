import React from "react";
import { Shield } from "lucide-react";
import { GridItem } from "@/app/(student)/_components/profile/detailed_info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

const InfoCol = () => {
  const { profile, val, formatDate, fullName } = useProfileContext();
  return (
    <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
      <GridItem
        label="Full Name"
        value={fullName}
        large
        className="md:col-span-2"
      />
      <GridItem
        label="Date of Birth"
        value={formatDate(val(profile?.personal.dob))}
      />
      <GridItem label="Gender" value={val(profile?.personal.gender)} />
      <GridItem
        label="National ID (CCCD)"
        value={val(profile?.personal.id_card_number)}
        icon={<Shield size={14} />}
        className="md:col-span-2"
      />
    </div>
  );
};

export default InfoCol;
