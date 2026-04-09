export enum ExtraCurricularState {
  END = "END",
  PREPARED = "PREPARED",
}

export interface ExtraCurricularProps {
  id: number;
  curricular_id: string;
  name: string;
  address: string;
  day_start: string;
  duration_days: number;
  has_proof: boolean;
  state: ExtraCurricularState;
  social_work_days_exchange: number;
  is_verified: boolean;
}
