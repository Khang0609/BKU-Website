import { useState, useEffect } from "react";
import { ProfileData, Family } from "@/app/(student)/_types/profile/record";
import { handleSave as handleSaveHelper } from "@/app/(student)/_hooks/helpers/handleSave";
import { useToast } from "@/hooks/useToast";

export const useProfileEdit = (
  profileData: ProfileData | null,
  fetchInitialData: () => Promise<void>,
  fetchWards: (id: number) => Promise<any[]>,
) => {
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
        if (profileData && formData) {
          setFormData((prevData) => ({
            ...prevData!,
            [section]: profileData[section as keyof ProfileData],
          }));

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

    // Prepare Payload
    let data: any = formData[section as keyof ProfileData];

    // Payload Transformation
    if (section === "permanent_address") {
      data = {
        permanent_province_id: data.province_id,
        permanent_ward_id: data.ward_id,
        permanent_detail: data.house_number,
      };
    } else if (section === "contact") {
      data = {
        ...data,
        current_province_id: data.province_id,
        current_ward_id: data.ward_id,
        current_detail: data.house_number,
      };
      // Remove raw address fields from contact to avoid confusion? Backend ignores extras anyway.
    } else if (section === "family") {
      const { parents, guardian } = data as Family;
      data = {
        ...parents,
        guardian_full_name: guardian.full_name,
        guardian_relationship_to_student: guardian.relationship,
        guardian_phone_number: guardian.phone_number,
        guardian_email: guardian.email,
        guardian_job: guardian.job,
        guardian_province_id: guardian.province_id,
        guardian_ward_id: guardian.ward_id,
        guardian_detail: guardian.house_number,
      };
    }

    // Endpoint mapping
    let endpoint = `/profile/student/${section}`;
    if (section === "permanent_address") endpoint = "/profile/student/contact";
    if (section === "others") endpoint = "/profile/student/extra";

    try {
      await handleSaveHelper(endpoint, data, showToast, async () => {
        // On success
        await fetchInitialData();
        setEditMode((prev) => ({ ...prev, [section]: false }));
      });
    } catch (e) {
      // Error handled in handleSaveHelper
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

    // Logic for pulling wards
    const newWards = await fetchWards(provinceId);
    if (newWards && newWards.length > 0) {
      updateForm(section, "ward_id", newWards[0].value);
    } else {
      updateForm(section, "ward_id", "");
    }
  };

  return {
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
  };
};
