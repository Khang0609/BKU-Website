"use client";

import React, { createContext, useContext } from "react";
import { ExtraCurricularProps } from "@/types/extra_curricular";
import { useExtraCurricular } from "@/app/(student)/_hooks/profile/extra-curricular/useExtraCurricular";

type ExtraCurricularContextType = ReturnType<typeof useExtraCurricular>;

const ExtraCurricularContext = createContext<ExtraCurricularContextType | null>(null);

export const ExtraCurricularProvider = ({
  children,
  initialData = [],
}: {
  children: React.ReactNode;
  initialData?: ExtraCurricularProps[];
}) => {
  const extraCurricularData = useExtraCurricular(initialData);

  return (
    <ExtraCurricularContext.Provider value={extraCurricularData}>
      {children}
    </ExtraCurricularContext.Provider>
  );
};

export const useExtraCurricularContext = () => {
  const context = useContext(ExtraCurricularContext);
  if (!context) {
    throw new Error("useExtraCurricularContext must be used within an ExtraCurricularProvider");
  }
  return context;
};
