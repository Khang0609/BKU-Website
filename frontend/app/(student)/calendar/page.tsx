"use client";

import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  BookOpen,
} from "lucide-react";
import { mockCalendarEvents } from "@/lib/mockData";

export default function CalendarPage() {
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

  return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <CalendarIcon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Academic Calendar
              </h1>
              <p className="text-gray-600">
                View your schedule, exams, and important dates
              </p>
            </div>
          </div>
        </motion.div>

        {/* Calendar View - Simplified for MVP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              January 2026
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Today
              </button>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>

          {/* Simple Calendar Grid - Placeholder */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2; // Start from day -2 to show previous month days
              const isCurrentMonth = day >= 1 && day <= 31;
              const hasEvent = [8, 10, 15].includes(day);

              return (
                <div
                  key={i}
                  className={`aspect-square p-2 border rounded-lg text-center ${
                    isCurrentMonth
                      ? "border-gray-200 hover:border-secondary cursor-pointer"
                      : "border-gray-100 text-gray-400"
                  } ${hasEvent ? "bg-blue-50 border-blue-300" : "bg-white"}`}
                >
                  <div className="text-sm">{isCurrentMonth ? day : ""}</div>
                  {hasEvent && (
                    <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {mockCalendarEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-md border-l-4 ${getEventTypeColor(
                  event.type
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getEventTypeColor(
                          event.type
                        )}`}
                      >
                        {event.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
            ))}
          </div>
        </div>
      </div>
  );
}
