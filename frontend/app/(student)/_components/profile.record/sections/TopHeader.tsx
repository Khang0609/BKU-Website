import React from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/WebHeaderTitle";
import { Clock } from "lucide-react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";

const TopHeader = () => {
  const { profile } = useRecordContext();
  return (
    <div className="flex items-center justify-between">
      <WebHeaderTitle title="Student Records" />
      <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-slate-400 shadow-sm md:flex">
        <Clock size={12} />{" "}
        <span>
          Last updated:{" "}
          {profile.last_updated_at
            ? new Date(profile.last_updated_at).toLocaleString()
            : "N/A"}
        </span>
      </div>
    </div>
  );
}

export default TopHeader;

