export enum ScholarshipType {
  KKHT = "kkht",
  SPONSOR = "sponsor",
  OTHER = "other",
}

export interface ScholarshipProps {
  id: number;
  semester: string;
  gpa_4: number;
  gpa_10: number;
  cpa_4: number;
  cpa_10: number;
  credits_earned: number;
  cumulative_credits: number;
  training_point: number;
  eligible: string;
  scholarship_level: string;
  amount: number;
  result: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
