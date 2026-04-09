
import { Calendar as CalendarIcon } from "lucide-react";
import { PageTitle } from "@/components/ui/navigation/PageTitle";
import { CalendarView } from "@/app/(student)/_components/calendar/calendar_view";
import { UpcomingEvents } from "@/app/(student)/_components/calendar/upcoming_events";

export default function CalendarPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <PageTitle
        title="Academic Calendar"
        subtitle="View your schedule, exams, and important dates"
        icon={CalendarIcon}
        className="mb-2"
      />

      {/* Calendar View - Simplified for MVP */}
      <CalendarView />

      {/* Upcoming Events */}
      <UpcomingEvents />
    </div>
  );
}
