"use client";

import { useState, useCallback } from "react";
import { ExtraCurricularProps } from "@/types/extra_curricular";
import client from "@/lib/client";

export const useExtraCurricular = (initialData: ExtraCurricularProps[] = []) => {
  const [extraCurriculars, setExtraCurriculars] = useState<ExtraCurricularProps[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExtraCurriculars = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.get("/profile/student/extra-curriculars");
      setExtraCurriculars(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load extra-curriculars. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    extraCurriculars,
    isLoading,
    error,
    refreshExtraCurriculars: fetchExtraCurriculars,
  };
};
