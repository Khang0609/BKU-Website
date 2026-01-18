import { Home } from "lucide-react";
import {Section,AddressSection} from "@/app/(student)/_components/profile/info_record/common";

export const PermAddressSection = () => {
  const id = "permanent_address";
  return (
    <Section title="Permanent Address" icon={<Home size={18} />} id={id}>
      <AddressSection id={id} />
    </Section>
  );
};
