"use client";

import React, { createContext, useContext } from "react";
import { ScholarshipProps } from "@/types/scholarship";
import { useScholarship } from "@/app/(student)/_hooks/profile/scholarship/useScholarship";

type ScholarshipContextType = ReturnType<typeof useScholarship>;

const ScholarshipContext = createContext<ScholarshipContextType | null>(null);

export const ScholarshipProvider = ({
  children,
  initialData = [],
}: {
  children: React.ReactNode;
  initialData?: ScholarshipProps[];
}) => {
  const scholarshipData = useScholarship(initialData);

  return (
    <ScholarshipContext.Provider value={scholarshipData}>
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarshipContext = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error("useScholarshipContext must be used within a ScholarshipProvider");
  }
  return context;
};
