import React from "react";
import { Section } from "@/app/(student)/_components/profile/info_record/common";
import { Camera } from "lucide-react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";

export const PhotoSection = () => {
  const { profile } = useRecordContext();
  return (
    <Section title="Photo Records" icon={<Camera size={18} />} id="others">
      <div className="py-6 text-center text-sm text-slate-500">
        {profile?.others?.photo_record_note ||
          "No specific notes on VNeID photo records."}
      </div>
    </Section>
  );
};