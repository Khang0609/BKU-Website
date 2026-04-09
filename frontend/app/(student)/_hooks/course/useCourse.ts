"use client";

import { useState } from "react";
import { mockCourses } from "@/lib/mockData";
import { FilterStatus } from "@/app/(student)/_types/course";

export const useCourse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const ongoingCourses = filteredCourses.filter((c) => c.status === "ongoing");
  const completedCourses = filteredCourses.filter(
    (c) => c.status === "completed",
  );

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredCourses,
    ongoingCourses,
    completedCourses,
    mockCourses,
  };
};
