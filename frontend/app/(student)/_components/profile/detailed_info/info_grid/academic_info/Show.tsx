import React from "react";
import { Building, BookOpen } from "lucide-react";
import {
  GridItem,
  StatusBadge,
} from "@/app/(student)/_components/profile/detailed_info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

export const Show = () => {
  const { profile, val } = useProfileContext();
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
      <GridItem
        label="Student ID"
        value={val(profile?.academic?.student_id)}
        large
      />
      <StatusBadge status={val(profile?.academic.student_status)} />

      <GridItem
        label="Faculty"
        value={val(profile?.academic.faculty)}
        icon={<Building size={14} />}
        className="md:col-span-2"
      />
      <GridItem
        label="Major"
        value={val(profile?.academic.major)}
        icon={<BookOpen size={14} />}
        className="md:col-span-2"
      />

      <GridItem label="Class Code" value={val(profile?.academic.class_code)} />
      <GridItem
        label="Enrollment Year"
        value={val(profile?.academic.enrollment_year)}
      />
    </div>
  );
};
