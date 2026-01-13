import { motion } from "framer-motion";
import { Clock, MapPin, BookOpen } from "lucide-react";
import { CalendarEvent, EventType } from "@/app/(student)/_types/calendar";
import { useCalendar } from "@/app/(student)/_hooks/calendar/calendar";

interface EventItemProps {
  event: CalendarEvent;
  index: number;
}

export const EventItem = ({ event, index }: EventItemProps) => {
  const { getEventTypeColor } = useCalendar();

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      className={`rounded-xl border-l-4 bg-white p-6 shadow-md ${getEventTypeColor(
        event.type,
      )}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getEventTypeColor(
                event.type,
              )}`}
            >
              {event.type.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">{event.date}</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {event.title}
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400" />
              <span>{event.time}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                <span>{event.location}</span>
              </div>
            )}
            {event.description && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen size={16} className="text-gray-400" />
                <span>{event.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
