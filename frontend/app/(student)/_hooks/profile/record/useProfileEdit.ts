import { useState, useEffect } from "react";
import {
  ProfileData,
  Family,
  Address,
  Contact,
  Other,
} from "@/app/(student)/_types/profile/record";
import { authFetch } from "@/lib/authFetch";
import { BASE_URL as API_URL } from "@/lib/api";
import { useToast } from "@/hooks/useToast";

export const useProfileEdit = (
  profileData: ProfileData | null,
  fetchWards: (id: number) => void,
  onSaveSuccess?: () => void,
) => {
  // Removed implicit context dependency to fix initialization cycle
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const { showToast } = useToast();

  // Sync formData when profileData changes (initial load or refetch)
  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const resetForm = () => {
    if (profileData) {
      setFormData(profileData);
    }
  };

  const toggleEdit = (section: string) => {
    setEditMode((prev) => {
      const newState = { ...prev, [section]: !prev[section] };

      if (newState[section]) {
        // Entering edit mode.
        // Optionally reset this section to match strict profile data
        if (profileData && formData) {
          setFormData((prevData) => ({
            ...prevData!,
            [section]: profileData[section as keyof ProfileData],
          }));

          // Trigger fetchWards if this section has an address with a province_id
          const sectionData = profileData[section as keyof ProfileData] as any;
          if (
            (section === "permanent_address" || section === "contact") &&
            sectionData?.province_id
          ) {
            fetchWards(sectionData.province_id);
          }
        }
      }

      return newState;
    });
  };

  const handleSave = async (section: string) => {
    if (!formData) return;

    setSaving((prev) => ({ ...prev, [section]: true }));
    // Construct Payload based on section
    let payload: any = {};
    const data = formData[section as keyof ProfileData];

    // Simple Mapping
    if (section === "personal") payload = data;

    const finalData = data && typeof data !== "string" ? { ...data } : {};
    if (section === "permanent_address") payload = finalData;
    if (section === "contact") payload = finalData;

    if (section === "family") {
      const fam = data as Family;
      payload = {
        ...fam.parents,
        // Map Guardian fields to match schema
        guardian_full_name: fam.guardian.full_name,
        guardian_relationship: fam.guardian.relationship,
        guardian_phone: fam.guardian.phone_number,
        guardian_email: fam.guardian.email,
        guardian_job: fam.guardian.job,
        guardian_province_id: fam.guardian.province_id,
        guardian_ward_id: fam.guardian.ward_id,
        guardian_house_number: fam.guardian.house_number,
      };
    }

    if (section === "others")
      payload = { social_media: (data as Other).social_media };

    try {
      // Endpoint mapping
      let endpoint = section;
      if (section === "permanent_address") endpoint = "contact";
      if (section === "others") endpoint = "extra";

      if (section === "permanent_address") {
        endpoint = "contact";
        payload = {
          permanent_province_id: (data as Address).province_id,
          permanent_ward_id: (data as Address).ward_id,
          permanent_house_number: (data as Address).house_number,
        };
      }
      if (section === "contact") {
        // This is section 3 "Contact" which includes Current Address + Phones
        payload = {
          current_province_id: (data as Contact).province_id,
          current_ward_id: (data as Contact).ward_id,
          current_house_number: (data as Contact).house_number,
          phone: (data as Contact).phone,
          family_phone: (data as Contact).family_phone,
          dorm_room: (data as Contact).dorm_room,
          personal_email: (data as Contact).personal_email,
        };
      }

      const res = await authFetch(`${API_URL}/profile/student/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update");

      showToast("Info updated successfully", "success");

      // Update UI state
      setEditMode((prev) => ({ ...prev, [section]: false }));

      // Notify parent to refresh data
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (e) {
      console.error(e);
      showToast("Failed to save changes", "error");
    } finally {
      setSaving((prev) => ({ ...prev, [section]: false }));
    }
  };

  const updateForm = (
    section: keyof ProfileData,
    field: string,
    value: any,
    sub?: string,
  ) => {
    if (!formData) return;
    setFormData((prev) => {
      if (!prev) return null;
      const secData = prev[section] as any;
      if (sub && section === "family") {
        // Handle family nested
        return {
          ...prev,
          family: {
            ...prev.family,
            [sub]: {
              ...prev.family[sub as keyof Family],
              [field]: value,
            },
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...secData,
          [field]: value,
        },
      };
    });
  };

  const handleProvinceChange = async (
    section: keyof ProfileData,
    provinceId: any,
  ) => {
    updateForm(section, "province_id", provinceId);

    // As fetchWards now returns the list of wards (promise)
    // We need to cast fit to any or update type definition of fetchWards prop if needed,
    // but assuming it returns Promise from previous steps.
    // Wait, in previous step we updated fetchWards in useProfileData to return Promise<any[]>.
    // But here the prop definition is `(id: number) => void`.
    // We should treat it as returning any/Promise.
    const newWards = await (fetchWards(provinceId) as any);

    if (newWards && Array.isArray(newWards) && newWards.length > 0) {
      updateForm(section, "ward_id", newWards[0].value);
    } else {
      updateForm(section, "ward_id", "");
    }
  };

  return {
    // #region State
    formData,
    editMode,
    saving,
    setFormData,
    setEditMode,
    setSaving,
    // #endregion
    // #region Function
    toggleEdit,
    handleSave,
    updateForm,
    resetForm,
    handleProvinceChange, // Export new handler
    // #endregion
  };
};
