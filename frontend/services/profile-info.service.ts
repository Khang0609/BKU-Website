import { serverFetch } from "@/lib/server-api";
import { StudentProfile } from "@/app/(student)/_types/profile";

export const getProfileInfoServer = async (): Promise<StudentProfile | null> => {
  return await serverFetch<StudentProfile>("/profile/student/me");
};
