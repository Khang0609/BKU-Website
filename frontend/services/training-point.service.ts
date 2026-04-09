import { serverFetch } from "@/lib/server-api";
import { TrainingPointProps } from "@/types/training_point";

export const getTrainingPointsServer = async (): Promise<TrainingPointProps[]> => {
  const data = await serverFetch<TrainingPointProps[]>("/profile/student/training-points");
  return data || [];
};
