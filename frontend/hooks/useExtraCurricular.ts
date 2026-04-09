import { useState, useEffect, useCallback } from "react";
import { ExtraCurricularProps } from "@/types/extra_curricular";
import client from "@/lib/client";

export const useExtraCurricular = () => {
  const [extraCurriculars, setExtraCurriculars] = useState<
    ExtraCurricularProps[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    fetchExtraCurriculars();
  }, [fetchExtraCurriculars]);

  return {
    extraCurriculars,
    isLoading,
    error,
    refreshExtraCurriculars: fetchExtraCurriculars,
  };
};
