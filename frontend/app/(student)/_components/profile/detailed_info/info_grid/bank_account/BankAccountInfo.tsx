import React from "react";
import {
  Accordion,
  GridItem,
} from "@/app/(student)/_components/profile/detailed_info/common";
import { Briefcase } from "lucide-react";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

export const BankAccountInfo = () => {
  const { profile } = useProfileContext();
  const { val } = useProfileContext();
  return (
    <Accordion title="Bank Account" icon={<Briefcase size={20} />} id="bank">
      <GridItem label="Bank Name" value={val(profile?.finance?.bank_name)} />
      <GridItem
        label="Account Number"
        value={val(profile?.finance?.bank_account)}
      />
      <GridItem label="OCB CIF" value={val(profile?.finance?.ocb_cif)} />
      <GridItem
        label="BKNet Account"
        value={val(profile?.finance?.bknet_account)}
      />
    </Accordion>
  );
};
