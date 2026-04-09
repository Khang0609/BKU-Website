"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Mail } from "lucide-react";
import { mockStudentInfo } from "@/lib/mockData";

export function TopNav() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const student = mockStudentInfo;

  // Get initials from student name
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return name.substring(0, 2);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search courses, schedules, services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
          </div>

          {/* Right Section: Icons + Avatar */}
          <div className="flex items-center gap-4 ml-6">
            {/* Notification Icon */}
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Message Icon */}
            <Link
              href="/message"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Mail size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Student Avatar */}
            <Link
              href="/profile"
              className="flex items-center gap-3 pl-3 pr-1 py-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-gray-700 text-sm font-medium">
                {student.name}
              </span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(student.name)}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Notification Dropdown */}
      {notificationOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setNotificationOpen(false)}
          />
          <div className="fixed top-16 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      System Maintenance Notice
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Scheduled for Jan 1, 2026
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Course Registration Opens
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Jan 5, 2026</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Final Exam Schedule Released
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Check your calendar
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-sm text-secondary hover:text-secondary-dark font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
