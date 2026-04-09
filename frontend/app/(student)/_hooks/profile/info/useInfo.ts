import { useProfileShow } from "@/app/(student)/_hooks/profile/info/useProfileShow";
import { useInfoLayout } from "@/app/(student)/_hooks/profile/info/useInfoLayout";
import { StudentProfile } from "@/app/(student)/_types/profile";

export const useInfo = (initialData: StudentProfile | null = null) => {
  const {
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
  } = useProfileShow(initialData);
  const {
    cardExpanded,
    setCardExpanded,
    expandedSections,
    setExpandedSections,
    toggleCard,
    toggleSection,
  } = useInfoLayout();

  return {
    // #region --------- LAYOUT ---------
    cardExpanded,
    setCardExpanded,
    expandedSections,
    setExpandedSections,
    toggleCard,
    toggleSection,
    // #endregion

    // #region --------- DATA ---------
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
    // #endregion
  };
};
