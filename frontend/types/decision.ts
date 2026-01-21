export enum DecisionType {
  IN = "in",
  OTHER = "other",
}

export interface DecisionProps {
  id: number;
  semester: string;
  decision_reason: string;
  decision_number: string;
  decision_content: string;
  signed_date: string;
  last_updated: string;
  decision_type: DecisionType;
  note?: string | null;
}
