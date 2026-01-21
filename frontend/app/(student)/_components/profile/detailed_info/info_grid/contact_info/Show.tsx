import React from "react";
import { GridItem } from "@/app/(student)/_components/profile/detailed_info/common";
import { Mail, Phone, MapPin } from "lucide-react";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

const Show = () => {
  const { profile, val } = useProfileContext();
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
      <GridItem
        label="University Email"
        value={val(profile?.contact.email)}
        icon={<Mail size={14} />}
        bold
      />
      <GridItem
        label="Phone Number"
        value={val(profile?.contact.phone)}
        icon={<Phone size={14} />}
        bold
      />
      <GridItem
        label="Current Address"
        value={val(profile?.contact.address_current)}
        icon={<MapPin size={14} />}
        className="md:col-span-2"
      />
    </div>
  );
};

export default Show;
