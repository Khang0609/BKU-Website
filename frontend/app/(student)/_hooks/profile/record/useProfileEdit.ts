import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProfileData, Family } from "@/app/(student)/_types/profile/record";
import { handleSave as handleSaveHelper } from "@/app/(student)/_hooks/helpers/handleSave";
import { useToast } from "@/hooks/useToast";

export const useProfileEdit = (
  profileData: ProfileData | null,
  fetchInitialData: () => Promise<void>,
  fetchWards: (id: number) => Promise<any[]>,
) => {
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const { showToast } = useToast();

  const methods = useForm<ProfileData>({
    values: profileData || undefined, // use 'values' to auto-update form when profileData changes
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    reset,
    formState: { dirtyFields },
  } = methods;

  const formData = watch();

  // Logging for debug - can be removed later
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
    }
  }, [formData]);

  const resetForm = () => {
    if (profileData) {
      reset(profileData);
    }
  };

  const toggleEdit = (section: string) => {
    const isEditing = !editMode[section];

    setEditMode((prev) => ({ ...prev, [section]: isEditing }));

    if (isEditing) {
      if (profileData) {
        const sectionData = profileData[section as keyof ProfileData] as any;
        let provinceId = sectionData?.province_id;

        if (section === "permanent_address") {
          provinceId = sectionData?.permanent_province_id;
        } else if (section === "contact") {
          provinceId = sectionData?.current_province_id;
        } else if (section === "family") {
          provinceId = sectionData?.guardian?.guardian_province_id;
        }

        if (provinceId) {
          fetchWards(provinceId);
        }
      }
    } else {
      // If canceling edit, reset to initial data
      if (profileData) {
        reset(profileData);
      }
    }
  };

  const getDirtyValues = (dirtyFields: any, allValues: any): any => {
    // If dirtyFields is NOT an object (e.g. true), it's a leaf node that is dirty.
    // Return the value from allValues.
    if (typeof dirtyFields !== "object" || dirtyFields === null) {
      return allValues;
    }

    // If it is an object, it might be a nested field structure OR a specialized object.
    // However, react-hook-form dirtyFields usually mirrors the value structure.

    // Check if it's an array field (if your data has arrays, RHF handles them as objects with index keys)
    if (Array.isArray(dirtyFields)) {
      // logic for arrays if needed, but 'allValues' should match.
      // For now treat as object iteration.
    }

    const dirtyValues: any = {};

    Object.keys(dirtyFields).forEach((key) => {
      // If the field is marked as dirty (true or object)
      const isDirty = dirtyFields[key];

      if (isDirty) {
        // Safe access
        const currentValue = allValues?.[key];

        // Recursively get dirty values
        dirtyValues[key] = getDirtyValues(isDirty, currentValue);
      }
    });

    return dirtyValues;
  };

  const handleSave = async (section: string) => {
    if (!formData) return;

    setSaving((prev) => ({ ...prev, [section]: true }));

    // Prepare Payload
    // We only want changes
    const sectionDirtyFields = dirtyFields[section as keyof ProfileData];
    const sectionValues = formData[section as keyof ProfileData];

    let data: any = {};

    if (sectionDirtyFields) {
      data = getDirtyValues(sectionDirtyFields, sectionValues);
    } else {
      console.log("Empty changes");
    }

    // Helper to flatten nested objects (like family.guardian) into the root
    // because backend expects flat Pydantic models (e.g. FamilyUpdate has guardian_province_id at root)
    const flattenPayload = (obj: any, res: any = {}) => {
      for (const key in obj) {
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          flattenPayload(obj[key], res);
        } else {
          res[key] = obj[key];
        }
      }
      return res;
    };

    const finalPayload = flattenPayload(data);

    console.log(
      "📦 Payload to Backend (Flat):",
      JSON.stringify(finalPayload, null, 2),
    );

    // Special logic to handle potential empty objects if only partial nested fields were changed
    // getDirtyValues should handle it but let's be sure.

    // Endpoint mapping
    let endpoint = `/profile/student/${section}`;
    if (section === "permanent_address" || section === "current_address") endpoint = "/profile/student/contact";
    if (section === "others") endpoint = "/profile/student/extra";

    try {
      // If data is not empty, proceed.
      // Note: backend might fail if we send empty object.
      // If user changed nothing, sectionDirtyFields is undefined/false.
      if (Object.keys(finalPayload).length > 0) {
        await handleSaveHelper(endpoint, finalPayload, showToast, async () => {
          // On success
          await fetchInitialData();
          setEditMode((prev) => ({ ...prev, [section]: false }));
          // Form reset happens in useEffect when fetchInitialData updates profileData
        });
      } else {
        // No changes, just close edit mode
        setEditMode((prev) => ({ ...prev, [section]: false }));
      }
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
    // Construct path
    let path = `${section}.${field}`;
    if (sub && section === "family") {
      path = `family.${sub}.${field}`;
    }
    // Removed incorrect else-if block that forced nesting for other sections with sub (e.g. permanent_address, contact)
    // The field names in those sections already include the prefix (e.g. permanent_province_id)
    // and reside directly under the section object.

    setValue(path as any, value, { shouldDirty: true, shouldValidate: true });
  };

  const handleProvinceChange = async (
    section: keyof ProfileData,
    provinceId: any,
    sub?: string,
  ) => {
    const provinceKey = sub ? `${sub}_province_id` : "province_id";
    const wardKey = sub ? `${sub}_ward_id` : "ward_id";

    updateForm(section, provinceKey, provinceId, sub);

    // Logic for pulling wards
    const newWards = await fetchWards(provinceId);
    if (newWards && newWards.length > 0) {
      updateForm(section, wardKey, newWards[0].value, sub);
    } else {
      updateForm(section, wardKey, "", sub);
    }
  };

  return {
    formData,
    editMode,
    saving,
    setFormData: (data: ProfileData | null) => {
      if (data) reset(data);
    },
    setEditMode,
    setSaving,
    toggleEdit,
    handleSave,
    updateForm,
    resetForm,
    handleProvinceChange,
    methods, // Keep this exposed if future components need context
  };
};
