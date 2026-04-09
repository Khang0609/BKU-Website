"use client";

import React from "react";
import {
  SearchStatistics,
  CourseSection,
  NotFoundResult,
} from "@/app/(student)/_components/course";
import { useCourseContext } from "@/app/(student)/_context/CourseContext";

export const CoursePageContent = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredCourses,
    ongoingCourses,
    completedCourses,
    mockCourses,
  } = useCourseContext();

  return (
    <>
      {/* Search & Statistics Group */}
      <SearchStatistics
        totalCourses={mockCourses.length}
        ongoingCourses={ongoingCourses.length}
        completedCourses={completedCourses.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Ongoing Courses */}
      <CourseSection title="Ongoing Courses" courses={ongoingCourses} />

      {/* Completed Courses */}
      <CourseSection title="Completed Courses" courses={completedCourses} />

      {/* No Results */}
      {filteredCourses.length === 0 && <NotFoundResult />}
    </>
  );
};
