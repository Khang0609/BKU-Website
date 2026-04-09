import { serverFetch } from "@/lib/server-api";
import { HealthInsuranceProps } from "@/types/health-insurance";

export const getHealthInsuranceServer = async (): Promise<HealthInsuranceProps | null> => {
  const data = await serverFetch<HealthInsuranceProps>("/profile/student/health_insurance");
  return data || null;
};
