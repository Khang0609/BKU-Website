import { Section } from "@/app/(student)/_components/profile/info_record/common";
import { Share2 } from "lucide-react";
import { Field } from "@/app/(student)/_components/profile/info_record/common";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import { getOtherSchema } from "@/app/(student)/_constants/profile/record";

export const OtherSection = () => {
  const id = "others";
  const { updateForm, formData } = useRecordContext();
  return (
    <Section title="Social Media" icon={<Share2 size={18} />} id={id}>
      <div className="grid grid-cols-1 gap-4">
        {getOtherSchema(updateForm).map((field) => (
          <Field
            key={field.name}
            {...field}
            value={formData?.others[field.name]}
            onChange={(v: any) => updateForm(id, field.name, v)}
          />
        ))}
      </div>
    </Section>
  );
};
