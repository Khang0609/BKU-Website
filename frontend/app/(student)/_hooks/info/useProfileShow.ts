import { useState, useEffect } from "react";
import { StudentProfile } from "@/app/(student)/_types/profile";
import { authFetch } from "@/lib/authFetch";
import { BASE_URL } from "@/lib/api";

export const useProfileShow = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authFetch(`${BASE_URL}/profile/student/me`);
      if (!res.ok) throw new Error("Failed to load profile data");
      const data = await res.json();
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
