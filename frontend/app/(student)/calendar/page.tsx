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
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary md:h-12 md:w-12">
            <CalendarIcon className="text-white" size={20} />
          </div>
          <div>
            <h1 className="title-xl font-bold text-gray-900">
              Academic Calendar
            </h1>
            <p className="subtitle-xl text-gray-600">
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
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-md"
      >
        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="title-xl font-semibold text-gray-900">January 2026</h2>
          <div className="flex w-full justify-between gap-2 sm:w-auto">
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
              Previous
            </button>
            <button className="grow rounded-lg bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary-dark sm:grow-0">
              Today
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* Simple Calendar Grid - Placeholder */}
        <div className="mb-4 grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-semibold text-gray-600"
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
                className={`aspect-square rounded-lg border p-2 text-center ${
                  isCurrentMonth
                    ? "cursor-pointer border-gray-200 hover:border-secondary"
                    : "border-gray-100 text-gray-400"
                } ${hasEvent ? "border-blue-300 bg-blue-50" : "bg-white"}`}
              >
                <div className="text-sm">{isCurrentMonth ? day : ""}</div>
                {hasEvent && (
                  <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-blue-600"></div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Upcoming Events
        </h2>
        <div className="space-y-4">
          {mockCalendarEvents.map((event, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
