import React from "react";
import { useProfileData } from "@/app/(student)/_hooks/profile/record/useProfileData";
import { useProfileEdit } from "@/app/(student)/_hooks/profile/record/useProfileEdit";

export const useRecord = () => {
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
  } = useProfileData();

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

  return {
    // #region State
    profile,
    catalogs,
    isLoading,
    familyTab,
    formData,
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
  };
};
