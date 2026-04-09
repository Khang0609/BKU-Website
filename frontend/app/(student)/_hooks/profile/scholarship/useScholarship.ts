"use client";

import { useState, useCallback } from "react";
import { ScholarshipProps } from "@/types/scholarship";
import client from "@/lib/client";

export const useScholarship = (initialData: ScholarshipProps[] = []) => {
  const [scholarships, setScholarships] = useState<ScholarshipProps[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return {
    scholarships,
    isLoading,
    error,
    refreshScholarships: fetchScholarships,
  };
};
