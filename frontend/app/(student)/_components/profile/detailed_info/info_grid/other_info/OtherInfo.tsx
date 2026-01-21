import React from "react";
import {
  GridItem,
  Accordion,
} from "@/app/(student)/_components/profile/detailed_info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { FileText } from "lucide-react";

export const OtherInfo = () => {
  const { profile } = useProfileContext();
  const { val } = useProfileContext();
  return (
    <Accordion
      title="Other Information"
      icon={<FileText size={20} />}
      id="other"
    >
      <GridItem
        label="Note"
        value={val(profile?.other?.note)}
        className="col-span-full"
      />
    </Accordion>
  );
};
