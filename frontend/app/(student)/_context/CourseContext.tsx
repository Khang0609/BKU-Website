"use client";

import React, { createContext, useContext } from "react";
import { useCourse } from "@/app/(student)/_hooks/course/useCourse";

type CourseContextType = ReturnType<typeof useCourse>;

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider = ({
  children,
  initialCourses = [],
}: {
  children: React.ReactNode;
  initialCourses?: any[]; // Replace 'any' with your Course type when ready
}) => {
  // Pass initialCourses to the hook if needed, for now useCourse uses mockData
  const courseData = useCourse(); 

  return (
    <CourseContext.Provider value={courseData}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
