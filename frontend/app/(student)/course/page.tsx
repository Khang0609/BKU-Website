"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Filter, Search } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { mockCourses } from "@/lib/mockData";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "ongoing" | "completed" | "upcoming"
  >("all");

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

  return (
    <div className="space-y-4 p-4 md:space-y-6 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary md:h-12 md:w-12">
          <BookOpen className="text-white" size={20} />
        </div>
        <div>
          <h1 className="title-xl font-bold text-gray-900">My Courses</h1>
          <p className="subtitle-xl line-clamp-1 text-gray-600">
            View and manage your enrolled courses
          </p>
        </div>
      </motion.div>

      {/* Search & Statistics Group */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {/* Mobile: Compact Stats Bar */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm md:hidden">
          <div className="p-3 text-center">
            <div className="label-sm text-gray-500">Total</div>
            <div className="text-lg font-bold leading-tight text-gray-900">
              {mockCourses.length}
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="label-sm text-gray-500">Ongoing</div>
            <div className="text-lg font-bold leading-tight text-blue-600">
              {ongoingCourses.length}
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="label-sm text-gray-500">Completed</div>
            <div className="text-lg font-bold leading-tight text-green-600">
              {completedCourses.length}
            </div>
          </div>
        </div>

        {/* Search & Filter Row */}
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
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className={`label-lg absolute inset-0 h-full w-full cursor-pointer appearance-none text-gray-700 opacity-0 md:static md:h-auto md:w-auto md:cursor-pointer md:appearance-auto md:rounded-lg md:border md:border-gray-300 md:px-4 md:py-2.5 md:opacity-100 md:transition-all md:focus:border-secondary md:focus:outline-none md:focus:ring-1 md:focus:ring-secondary`}
            >
              <option value="all">All Courses</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {/* Desktop: Cards Stats */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="label-sm mb-1 text-gray-600">Total Courses</div>
            <div className="content-xl font-bold text-gray-900">
              {mockCourses.length}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="label-sm mb-1 text-gray-600">Ongoing</div>
            <div className="content-xl font-bold text-blue-600">
              {ongoingCourses.length}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="label-sm mb-1 text-gray-600">Completed</div>
            <div className="content-xl font-bold text-green-600">
              {completedCourses.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ongoing Courses */}
      {ongoingCourses.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Ongoing Courses
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ongoingCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Completed Courses
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-md"
        >
          <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            No courses found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}
