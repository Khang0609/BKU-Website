import React from "react";
import Section from "@/app/(student)/_components/profile.record/common/Section";
import Field from "@/app/(student)/_components/profile.record/common/Field";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import { Phone } from "lucide-react";
import { getContactSchema } from "@/app/(student)/_constants/record";
import AddressSection from "@/app/(student)/_components/profile.record/common/AddressSection";

const ContactSection = () => {
  const id = "contact";
  const { editMode, saving, catalogs, formData, updateForm } =
    useRecordContext();
  const fetchWards = (provinceId: number) => {
    updateForm(id, "province_id", provinceId);
    fetchWards(provinceId);
  };
  return (
    <Section title="Contact Information" icon={<Phone size={18} />} id={id}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {getContactSchema(updateForm).map((field) => (
          <Field
            key={field.name}
            {...field}
            value={formData?.contact[field.name]}
            onChange={(v: any) => updateForm(id, field.name, v)}
          />
        ))}
      </div>
      <div className="mt-2 border-t pt-4 md:col-span-2">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">
          Current Address
        </h4>
        <AddressSection id="contact" />
      </div>
    </Section>
  );
};

export default ContactSection;

