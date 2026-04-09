import { serverFetch } from "@/lib/server-api";
import { DecisionProps } from "@/types/decision";

export const getDecisionsServer = async (): Promise<DecisionProps[]> => {
  const data = await serverFetch<DecisionProps[]>("/profile/student/decision");
  return data || [];
};
