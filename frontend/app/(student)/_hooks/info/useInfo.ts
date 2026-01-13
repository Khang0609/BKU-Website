import { useProfileShow } from "@/app/(student)/_hooks/info/useProfileShow";
import { useInfoLayout } from "@/app/(student)/_hooks/info/useInfoLayout";

export const useInfo = () => {
  const { profile, setProfile, isLoading, setLoading, error, setError, fetchProfile, val, formatDate, fullName } = useProfileShow();
  const { cardExpanded, setCardExpanded, expandedSections, setExpandedSections, toggleCard, toggleSection } = useInfoLayout();

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
