import { serverFetch } from "@/lib/server-api";
import { ProfileUpdateRequest } from "@/types/request";

// Server-side: Chỉ dùng cho Server Components (page.tsx)
export const getMyRequestsServer = async (): Promise<ProfileUpdateRequest[]> => {
  const data = await serverFetch<ProfileUpdateRequest[]>("/requests");
  return data || [];
};
