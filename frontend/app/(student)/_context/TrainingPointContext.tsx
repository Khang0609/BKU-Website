"use client";

import React, { createContext, useContext } from "react";
import { TrainingPointProps } from "@/types/training_point";
import { useTrainingPoint } from "@/app/(student)/_hooks/profile/training-point/useTrainingPoint";

type TrainingPointContextType = ReturnType<typeof useTrainingPoint>;

const TrainingPointContext = createContext<TrainingPointContextType | null>(null);

export const TrainingPointProvider = ({
  children,
  initialData = [],
}: {
  children: React.ReactNode;
  initialData?: TrainingPointProps[];
}) => {
  const trainingPointData = useTrainingPoint(initialData);

  return (
    <TrainingPointContext.Provider value={trainingPointData}>
      {children}
    </TrainingPointContext.Provider>
  );
};

export const useTrainingPointContext = () => {
  const context = useContext(TrainingPointContext);
  if (!context) {
    throw new Error("useTrainingPointContext must be used within a TrainingPointProvider");
  }
  return context;
};
