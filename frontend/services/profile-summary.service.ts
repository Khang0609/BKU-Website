import { serverFetch } from "@/lib/server-api";

export const getProfileSummaryServer = async () => {
  const data = await serverFetch<any>("/profile/student/me");
  if (!data) return null;

  return {
    first_name: data.personal.first_name || "",
    last_name: data.personal.last_name || "",
    student_id: data.academic.student_id || "N/A",
    major: data.academic.major || "N/A",
    class_code: data.academic.class_code || "N/A",
    entry_semester: data.academic.entry_semester || "N/A",
    student_status: data.academic.student_status || "Unknown",
  };
};
