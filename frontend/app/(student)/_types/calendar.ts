export type EventType = "exam" | "assignment" | "class" | "event";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
  location?: string;
  description?: string;
}
