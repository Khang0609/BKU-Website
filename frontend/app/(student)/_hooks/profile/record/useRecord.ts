import React from "react";
import { useProfileData } from "@/app/(student)/_hooks/profile/record/useProfileData";
import { useProfileEdit } from "@/app/(student)/_hooks/profile/record/useProfileEdit";

export const useRecord = (initialData: any = { profile: null, catalogs: null }) => {
  const {
    // State
    profile,
    catalogs,
    isLoading,
    familyTab,
    // Setters
    setFamilyTab,
    setProfile,
    setCatalogs,
    setIsLoading, // Not typically used by UI directly for setting, but present
    // Functions
    fetchInitialData,
    fetchWards,
  } = useProfileData(initialData);

  const {
    formData,
    editMode,
    saving,
    setFormData,
    setEditMode,
    setSaving,
    toggleEdit,
    handleSave,
    updateForm,
    resetForm,
    handleProvinceChange,
  } = useProfileEdit(profile, fetchInitialData, fetchWards);

  // Fallback: If formData is empty/syncing but we have profile, use profile to prevent UI crashes/blanks
  const effectiveFormData =
    formData && Object.keys(formData).length > 0
      ? formData
      : profile || formData;

  const contextValue = React.useMemo(
    () => ({
      // #region State
      profile,
      catalogs,
      isLoading,
      familyTab,
      formData: effectiveFormData,
      editMode,
      saving,
      // #endregion

      // #region Setters
      setFamilyTab,
      setFormData,
      setEditMode,
      setSaving,
      // #endregion

      // #region Functions
      fetchInitialData,
      fetchWards,
      toggleEdit,
      handleSave,
      updateForm,
      resetForm,
      handleProvinceChange,
      // #endregion
    }),
    [
      profile,
      catalogs,
      isLoading,
      familyTab,
      effectiveFormData,
      editMode,
      saving,
      setFamilyTab,
      setFormData,
      setEditMode,
      setSaving,
      fetchInitialData,
      fetchWards,
      toggleEdit,
      handleSave,
      updateForm,
      resetForm,
      handleProvinceChange,
    ],
  );

  return contextValue;
};
