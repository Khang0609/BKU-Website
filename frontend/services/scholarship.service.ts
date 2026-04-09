import { serverFetch } from "@/lib/server-api";
import { ScholarshipProps } from "@/types/scholarship";

export const getScholarshipsServer = async (): Promise<ScholarshipProps[]> => {
  const data = await serverFetch<ScholarshipProps[]>("/profile/student/scholarship");
  return data || [];
};
