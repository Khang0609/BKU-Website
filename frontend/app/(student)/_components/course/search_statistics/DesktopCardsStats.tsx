import React from "react";
import { DesktopCardsStatsProps } from "@/app/(student)/_types/course";

export const DesktopCardsStats = ({
  totalCourses,
  ongoingCourses,
  completedCourses,
}: DesktopCardsStatsProps) => {
  return (
    <div className="hidden md:grid md:grid-cols-3 md:gap-4">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="label-sm mb-1 text-gray-600">Total Courses</div>
        <div className="content-xl font-bold text-gray-900">{totalCourses}</div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="label-sm mb-1 text-gray-600">Ongoing</div>
        <div className="content-xl font-bold text-blue-600">
          {ongoingCourses}
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="label-sm mb-1 text-gray-600">Completed</div>
        <div className="content-xl font-bold text-green-600">
          {completedCourses}
        </div>
      </div>
    </div>
  );
};
