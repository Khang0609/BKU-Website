import { Home } from "lucide-react";
import AddressSection from "@/app/(student)/_components/profile.record/common/AddressSection";
import Section from "@/app/(student)/_components/profile.record/common/Section";

const PermAddressSection = () => {
  const id = "permanent_address";
  return (
    <Section title="Permanent Address" icon={<Home size={18} />} id={id}>
      <AddressSection id={id} />
    </Section>
  );
}

export default PermAddressSection;
