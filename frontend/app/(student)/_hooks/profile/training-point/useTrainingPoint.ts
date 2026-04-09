"use client";

import { useState, useCallback } from "react";
import { TrainingPointProps } from "@/types/training_point";
import client from "@/lib/client";

export const useTrainingPoint = (initialData: TrainingPointProps[] = []) => {
  const [trainingPoints, setTrainingPoints] = useState<TrainingPointProps[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainingPoints = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.get("/profile/student/training-points");
      setTrainingPoints(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load training points. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trainingPoints,
    isLoading,
    error,
    refreshTrainingPoints: fetchTrainingPoints,
  };
};
