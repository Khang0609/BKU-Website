"use client";

import { BookOpen } from "lucide-react";
import { PageTitle } from "@/components/ui";
import {
  SearchStatistics,
  CourseSection,
  NotFoundResult,
} from "@/app/(student)/_components/course";
import { useCourse } from "@/app/(student)/_hooks/course/useCourse";

export default function CoursesPage() {
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredCourses,
    ongoingCourses,
    completedCourses,
    mockCourses,
  } = useCourse();

  return (
    <div className="space-y-4 p-4 md:space-y-6 md:p-6">
      {/* Header */}
      <PageTitle
        title="My Courses"
        subtitle="View and manage your enrolled courses"
        icon={BookOpen}
      />

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
    </div>
  );
}
