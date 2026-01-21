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
      <GridItem label="Bank Name" value={val(profile?.bank?.bank_name)} />
      <GridItem
        label="Account Number"
        value={val(profile?.bank?.bank_account)}
        bold
      />
      <GridItem label="OCB CIF" value={val(profile?.bank?.ocb_cif)} />
      <GridItem
        label="BKNet Account"
        value={val(profile?.bank?.bknet_account)}
      />
    </Accordion>
  );
};
