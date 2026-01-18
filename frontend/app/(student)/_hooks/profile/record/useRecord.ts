import React from "react";
import { useProfileEdit } from "@/app/(student)/_hooks/profile/record/useProfileEdit";
import { useProfileData } from "@/app/(student)/_hooks/profile/record/useProfileData";

export const useRecord = () => {
  const {
    profile,
    catalogs,
    isLoading,
    familyTab,
    setFamilyTab,
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
  } = useProfileEdit(profile, fetchWards, fetchInitialData);

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
