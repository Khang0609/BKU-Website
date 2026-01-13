import React from "react";
import { Search, Filter } from "lucide-react";
import { FilterStatus } from "@/app/(student)/_types/course";
import { SearchFilterProps } from "@/app/(student)/_types/course";

export const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-row gap-2 md:rounded-xl md:border md:border-gray-200 md:bg-white md:p-6 md:shadow-md">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 transition-all placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary md:bg-transparent"
        />
      </div>

      {/* Filter */}
      <div className="relative shrink-0">
        {/* Mobile Visual */}
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm md:hidden">
          <Filter size={18} className="text-gray-600" />
        </div>

        {/* Input (Desktop Visual + Mobile Trigger) */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className={`label-lg absolute inset-0 h-full w-full cursor-pointer appearance-none text-gray-700 opacity-0 md:static md:h-auto md:w-auto md:cursor-pointer md:appearance-auto md:rounded-lg md:border md:border-gray-300 md:px-4 md:py-2.5 md:opacity-100 md:transition-all md:focus:border-secondary md:focus:outline-none md:focus:ring-1 md:focus:ring-secondary`}
        >
          <option value="all">All Courses</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
    </div>
  );
};
