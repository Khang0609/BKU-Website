import React from "react";

export const CalendarGrid = () => {
  return (
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
  );
};
