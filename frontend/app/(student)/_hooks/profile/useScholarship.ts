import { useState, useEffect, useCallback } from "react";
import { ScholarshipProps } from "@/types/scholarship";
import client from "@/lib/client";

export const useScholarship = () => {
  const [scholarships, setScholarships] = useState<ScholarshipProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarships = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.get("/profile/student/scholarship");
      setScholarships(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load scholarships. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  return {
    scholarships,
    isLoading,
    error,
    refreshScholarships: fetchScholarships,
  };
};
