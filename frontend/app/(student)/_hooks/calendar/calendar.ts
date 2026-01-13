import { mockCalendarEvents } from "@/lib/mockData";
import { EventType } from "@/app/(student)/_types/calendar";

export const useCalendar = () => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-700 border-red-300";
      case "assignment":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "class":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "event":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return {
    mockCalendarEvents,
    getEventTypeColor,
  };
};
