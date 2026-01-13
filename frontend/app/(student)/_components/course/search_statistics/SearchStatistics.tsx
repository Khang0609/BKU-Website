import { motion } from "framer-motion";
import { DesktopCardsStats } from "./DesktopCardsStats";
import { SearchFilter } from "./SearchFilter";
import { SearchStatisticsProps } from "@/app/(student)/_types/course";

const MobileStatsBar = ({
  totalCourses,
  ongoingCourses,
  completedCourses,
}: {
  totalCourses: number;
  ongoingCourses: number;
  completedCourses: number;
}) => (
  <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm md:hidden">
    <div className="p-3 text-center">
      <div className="label-sm text-gray-500">Total</div>
      <div className="text-lg font-bold leading-tight text-gray-900">
        {totalCourses}
      </div>
    </div>
    <div className="p-3 text-center">
      <div className="label-sm text-gray-500">Ongoing</div>
      <div className="text-lg font-bold leading-tight text-blue-600">
        {ongoingCourses}
      </div>
    </div>
    <div className="p-3 text-center">
      <div className="label-sm text-gray-500">Completed</div>
      <div className="text-lg font-bold leading-tight text-green-600">
        {completedCourses}
      </div>
    </div>
  </div>
);

export const SearchStatistics = ({
  totalCourses,
  ongoingCourses,
  completedCourses,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: SearchStatisticsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-4"
    >
      <MobileStatsBar
        totalCourses={totalCourses}
        ongoingCourses={ongoingCourses}
        completedCourses={completedCourses}
      />

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <DesktopCardsStats
        totalCourses={totalCourses}
        ongoingCourses={ongoingCourses}
        completedCourses={completedCourses}
      />
    </motion.div>
  );
};
