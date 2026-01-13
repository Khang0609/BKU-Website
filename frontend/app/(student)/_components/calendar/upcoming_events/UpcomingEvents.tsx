import { EventItem } from "./EventItem";
import { useCalendar } from "@/app/(student)/_hooks/calendar/calendar";

export const UpcomingEvents = () => {
  // Get mock data from hook to ensure single source of truth, though mockData import is also fine directly.
  // However, the prompt asked to relocate hooks, so using the hook is consistent.
  const { mockCalendarEvents } = useCalendar();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Upcoming Events
      </h2>
      <div className="space-y-4">
        {mockCalendarEvents.map((event, index) => (
          <EventItem key={event.id} event={event as any} index={index} />
        ))}
      </div>
    </div>
  );
};
