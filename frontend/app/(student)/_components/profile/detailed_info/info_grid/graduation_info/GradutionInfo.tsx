import React from "react";
import { School } from "lucide-react";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import {
  GridItem,
  Accordion,
} from "@/app/(student)/_components/profile/detailed_info/common";

export const GradutionInfo = () => {
  const { profile } = useProfileContext();
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
