import { serverFetch } from "@/lib/server-api";
import { ExtraCurricularProps } from "@/types/extra_curricular";

export const getExtraCurricularsServer = async (): Promise<ExtraCurricularProps[]> => {
  const data = await serverFetch<ExtraCurricularProps[]>("/profile/student/extra-curriculars");
  return data || [];
};
