import { useState, useEffect } from "react";
import client from "@/lib/client";
import { StudentDashboardData } from "@/app/(student)/_types/profile/main";
import { clusters, personalLegalItems } from "@/app/(student)/_constants/profile/main";
import { useToast } from "@/hooks/useToast";

export const useProfileMain = () => {
  const [profile, setProfile] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await client.get("/profile/student/me");
        const data = res.data;

        setProfile({
          first_name: data.personal.first_name || "",
          last_name: data.personal.last_name || "",
          student_id: data.academic.student_id || "N/A",
          major: data.academic.major || "N/A",
          class_code: data.academic.class_code || "N/A",
          entry_semester: data.academic.entry_semester || "N/A",
          status: data.academic.status || "Unknown",
        });
      } catch (err) {
        console.error("Failed to load profile summary:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === "#") {
      e.preventDefault();
      showToast("Coming Soon in next update!", "coming_soon");
    }
  };

  const fullName = profile
    ? `${profile.last_name} ${profile.first_name}`
    : "Student Name";
  const initials = profile?.first_name ? profile.first_name[0] : "S";

  const leftColClusters = clusters.filter((c) => c.id === "training");
  const rightColClusters = clusters.filter((c) =>
    ["academic", "finance", "health"].includes(c.id),
  );

  return {
    profile,
    isLoading,
    handleLinkClick,
    fullName,
    initials,
    leftColClusters,
    rightColClusters,
    personalLegalItems,
  };
};
