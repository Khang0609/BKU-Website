import React from "react";
import { Phone } from "lucide-react";
import { ProfileCard } from "@/app/(student)/_components/profile.info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import Show from "@/app/(student)/_components/profile.info/info_grid/contact_info/Show";
import Hide from "@/app/(student)/_components/profile.info/info_grid/contact_info/Hide";

const ContactInfo = () => {
  return (
    <div className="lg:col-span-2">
      <ProfileCard
        title="Contact Information"
        icon={<Phone size={20} />}
        id="contact"
      >
        <Show />

        <Hide />
      </ProfileCard>
    </div>
  );
};

export default ContactInfo;
