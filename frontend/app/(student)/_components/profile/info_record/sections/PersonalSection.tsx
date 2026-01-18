import React from "react";
import {
  Section,
  Field,
} from "@/app/(student)/_components/profile/info_record/common";
import { User } from "lucide-react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import { getPersonalSchema } from "../../../../_constants/profile/record";

export const PersonalSection = () => {
  const { catalogs, formData, updateForm } = useRecordContext();
  const PERSONAL_FIELDS = getPersonalSchema(updateForm);
  return (
    <Section
      title="Personal Information"
      icon={<User size={18} />}
      id="personal"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PERSONAL_FIELDS.map((field) => (
          <Field
            key={field.name}
            {...field}
            value={formData?.personal[field.name]}
            options={
              field.optionsKey ? catalogs[field.optionsKey] : field.options
            }
            onChange={(v: any) => updateForm(field.id, field.name, v)}
          />
        ))}
      </div>
    </Section>
  );
};
