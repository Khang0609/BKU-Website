import React from "react";
import { GridItem, Accordion } from "@/app/(student)/_components/profile.info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { FileText } from "lucide-react";

const OtherInfo = () => {
  const { profile } = useProfileContext();
  const { expandedSections, toggleSection } = useProfileContext();
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

export default OtherInfo;
