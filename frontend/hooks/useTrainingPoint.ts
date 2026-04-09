import { useState, useEffect, useCallback } from "react";
import { TrainingPointProps } from "@/types/training_point";
import client from "@/lib/client";

export const useTrainingPoint = () => {
  const [trainingPoints, setTrainingPoints] = useState<TrainingPointProps[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    fetchTrainingPoints();
  }, [fetchTrainingPoints]);

  return {
    trainingPoints,
    isLoading,
    error,
    refreshTrainingPoints: fetchTrainingPoints,
  };
};
