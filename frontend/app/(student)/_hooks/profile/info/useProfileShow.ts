import { useState, useEffect } from "react";
import { StudentProfile } from "@/app/(student)/_types/profile";
import client from "@lib/client";

export const useProfileShow = (initialData: StudentProfile | null = null) => {
  const [profile, setProfile] = useState<StudentProfile | null>(initialData);
  const [isLoading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await client.get("/profile/student/me");
      const data = res.data;
      setProfile(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const val = (v: any) => v || "N/A";
  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("vi-VN") : "N/A";

  const fullName = profile
    ? `${val(profile.personal.last_name)} ${val(profile.personal.first_name)}`
    : "Student Name";

  return {
    profile,
    setProfile,
    isLoading,
    setLoading,
    error,
    setError,
    fetchProfile,
    val,
    formatDate,
    fullName,
  };
};
