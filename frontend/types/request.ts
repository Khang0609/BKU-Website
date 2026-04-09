export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum RequestType {
  HEALTH_INSURANCE = "HEALTH_INSURANCE",
  GENERAL_INFORMATION = "GENERAL_INFORMATION",
}

export interface ProfileUpdateRequest {
  id: number;
  identity_id: number;
  type: RequestType;
  status: RequestStatus;
  requested_data: Record<string, any>;
  proof_url: string | null;
  admin_comment: string | null;
  handled_by_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileUpdateRequest {
  type: RequestType;
  requested_data: Record<string, any>;
  proof_url?: string;
}
