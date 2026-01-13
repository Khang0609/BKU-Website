import React from "react";
import Accordion from "@/app/(student)/_components/profile.info/common/Accordion";
import { School } from "lucide-react";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { GridItem } from "@/app/(student)/_components/profile.info/common";

const GradutionInfo = () => {
  const { profile, isLoading } = useProfileContext();
  const { expandedSections, toggleSection } = useProfileContext();
  const { val, formatDate } = useProfileContext();
  return (
    <Accordion
      title="Graduation Information"
      icon={<School size={20} />}
      id="graduation"
    >
      <GridItem
        label="Graduated Major"
        
        value={val(profile?.graduation?.grad_major)}
      />
      <GridItem
        label="Year / Semester"
        
        value={val(profile?.graduation?.grad_year_semester)}
      />
      <GridItem
        label="Decision Number"
        
        value={val(profile?.graduation?.grad_decision_number)}
      />
      <GridItem
        label="Decision Date"
        
        value={formatDate(val(profile?.graduation?.grad_decision_date))}
      />
    </Accordion>
  );
};

export default GradutionInfo;
