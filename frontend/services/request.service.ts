import client from "@/lib/client";
import { CreateProfileUpdateRequest, ProfileUpdateRequest } from "@/types/request";

// Client-side: Dùng cho Modal và các Client Component
export const createUpdateRequest = async (
  payload: CreateProfileUpdateRequest
): Promise<ProfileUpdateRequest> => {
  const res = await client.post("/requests", payload);
  return res.data;
};

export const getMyRequestsClient = async (): Promise<ProfileUpdateRequest[]> => {
  const res = await client.get("/requests");
  return res.data;
};
