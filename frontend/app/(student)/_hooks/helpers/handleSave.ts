import client from "@/lib/client";

export const handleSave = async <T>(
  endpoint: string,
  data: T,
  showToast: (message: string, type: "success" | "error") => void,
  onSuccess?: () => void,
) => {
  try {
    const res = await client.patch(endpoint, data);

    showToast("Info updated successfully", "success");

    if (onSuccess) {
      onSuccess();
    }

    return res.data;
  } catch (error) {
    console.error(`Failed to save to ${endpoint}`, error);
    showToast("Failed to save changes", "error");
    throw error;
  }
};
