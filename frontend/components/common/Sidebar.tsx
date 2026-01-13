"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import {
  Home,
  BookOpen,
  Calendar,
  MessageSquare,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  GraduationCap,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Database,
  Award,
  Activity,
  Users,
  ToggleLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isLoading?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

export const SIDEBAR_CONFIG: Record<
  UserRole,
  { main: MenuItem[]; services?: MenuItem[] }
> = {
  STUDENT: {
    main: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
      { id: "courses", label: "Courses", icon: BookOpen, href: "/course" },
      { id: "calendar", label: "Calendar", icon: Calendar, href: "/calendar" },
      {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        href: "/message",
      },
      { id: "profile", label: "Profile", icon: User, href: "/profile" },
    ],
    services: [
      {
        id: "graduation-check",
        label: "Graduation Verification",
        icon: GraduationCap,
        href: "/student-service/graduation-verification",
      },
      {
        id: "card-printing",
        label: "Student Card Registration",
        icon: CreditCard,
        href: "/student-service/card-printing",
      },
      {
        id: "english-test",
        label: "English Test Registration",
        icon: BookOpen,
        href: "/student-service/english-test",
      },
      {
        id: "student-verification",
        label: "Student Confirmation",
        icon: CheckCircle,
        href: "/student-service/student-verification",
      },
      {
        id: "exam-postponement",
        label: "Exam Deferral",
        icon: Clock,
        href: "/student-service/exam-deferral",
      },
      {
        id: "course-withdrawal",
        label: "Course Withdrawal",
        icon: AlertCircle,
        href: "/student-service/course-withdrawal",
      },
      {
        id: "degree-declaration",
        label: "Degree Information",
        icon: FileText,
        href: "/student-service/degree-declaration",
      },
      {
        id: "it-credit",
        label: "IT Certificate Declaration",
        icon: Database,
        href: "/student-service/it-certificate",
      },
      {
        id: "exam-appeal",
        label: "Exam Re-evaluation",
        icon: Award,
        href: "/student-service/exam-appeal",
      },
    ],
  },
  LECTURER: {
    main: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
      {
        id: "classes",
        label: "My Classes",
        icon: BookOpen,
        href: "/classes",
      },
      {
        id: "calendar",
        label: "Schedule",
        icon: Calendar,
        href: "/schedule",
      },
      {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        href: "/message",
      },
      { id: "profile", label: "Profile", icon: User, href: "/profile" },
    ],
  },
  ADMIN: {
    main: [
      {
        id: "monitoring",
        label: "Monitoring",
        icon: Activity,
        href: "/monitoring",
      },
      {
        id: "users",
        label: "User Management",
        icon: Users,
        href: "/users",
      },
      {
        id: "features",
        label: "Feature Control",
        icon: ToggleLeft,
        href: "/features",
      },
      { id: "profile", label: "Profile", icon: User, href: "/profile" },
    ],
  },
  OFFICE: {
    main: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
      {
        id: "requests",
        label: "Service Requests",
        icon: FileText,
        href: "/requests",
      },
      { id: "calendar", label: "Calendar", icon: Calendar, href: "/calendar" },
      {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        href: "/message",
      },
    ],
  },
};

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isLoading = false,
}: SidebarProps) {
  const pathname = usePathname();
  const { role, logout } = useAuth();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent, item: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + rect.height / 2, // Lấy giữa chiều cao của nút
      left: rect.right + 10, // Cách lề phải nút 10px
    });
    setHoveredItem(item.id || item);
  };

  // Default to STUDENT if no role or config found (safe fallback)
  const currentConfig = role ? SIDEBAR_CONFIG[role] : SIDEBAR_CONFIG.STUDENT;

  if (!role && !isLoading) return null; // Don't render sidebar if not authenticated and not loading

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 68 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-secondary/20 bg-primary lg:flex"
      >
        {/* Header */}
        <div className="flex h-16 items-center gap-2 border-b border-secondary/20 px-4">
          <motion.div
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 overflow-hidden"
          >
            {!isCollapsed && (
              <h1 className="whitespace-nowrap text-sm font-semibold tracking-wider text-white">
                BKU PORTAL
              </h1>
            )}
          </motion.div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <ChevronRight size={16} strokeWidth={2.5} />
            ) : (
              <ChevronLeft size={16} strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="scrollbar-hide flex-1 space-y-2 overflow-y-auto px-3 py-6">
          {isLoading ? (
            // Skeleton Loading State
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-full animate-pulse rounded-lg bg-white/10"
              />
            ))
          ) : (
            <>
              {currentConfig.main.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <div
                    key={item.id}
                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                      popoverTarget="#tooltips"
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <motion.span
                        animate={{
                          opacity: isCollapsed ? 0 : 1,
                          width: isCollapsed ? 0 : "auto",
                        }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap text-sm"
                      >
                        {item.label}
                      </motion.span>
                    </Link>

                    {isCollapsed && hoveredItem === item.id && (
                      <Portal>
                        <div
                          className="pointer-events-none fixed z-50 flex items-center"
                          style={{
                            top: `${tooltipPos.top}px`,
                            left: `${tooltipPos.left}px`,
                            transform: "translateY(-50%)", // Căn giữa chính xác theo chiều dọc
                          }}
                        >
                          <div className="h-0 w-0 border-b-[5px] border-r-[8px] border-t-[5px] border-b-transparent border-r-gray-900 border-t-transparent"></div>
                          <div className="whitespace-nowrap rounded-md bg-gray-900 px-2 py-1.5 text-xs font-medium text-white shadow-xl">
                            {item.label}
                          </div>
                        </div>
                      </Portal>
                    )}
                  </div>
                );
              })}

              {/* Student Services Button (Only for STUDENT role) */}
              {role === "STUDENT" && currentConfig.services && (
                <div className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onMouseEnter={(e) => handleMouseEnter(e, "services")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                      isServicesOpen || pathname.startsWith("/student-service")
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Grid3x3 size={20} className="flex-shrink-0" />
                    <motion.span
                      animate={{
                        opacity: isCollapsed ? 0 : 1,
                        width: isCollapsed ? 0 : "auto",
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap text-sm"
                    >
                      Student Services
                    </motion.span>
                  </button>

                  {isCollapsed && hoveredItem === "services" && (
                    <Portal>
                      <div
                        className="pointer-events-none fixed z-50 flex items-center"
                        style={{
                          top: `${tooltipPos.top}px`,
                          left: `${tooltipPos.left}px`,
                          transform: "translateY(-50%)", // Căn giữa chính xác theo chiều dọc
                        }}
                      >
                        <div className="h-0 w-0 border-b-[5px] border-r-[8px] border-t-[5px] border-b-transparent border-r-gray-900 border-t-transparent"></div>
                        <div className="whitespace-nowrap rounded-md bg-gray-900 px-2 py-1.5 text-xs font-medium text-white shadow-xl">
                          Student Services
                        </div>
                      </div>
                    </Portal>
                  )}
                </div>
              )}
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="space-y-2 border-t border-secondary/20 px-3 py-4">
          <div
            onMouseEnter={() => setHoveredItem("settings")}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
          >
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-white/70 transition-all hover:bg-white/10 hover:text-white">
              <Settings size={20} className="flex-shrink-0" />
              <motion.span
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-sm"
              >
                Settings
              </motion.span>
            </button>
            {isCollapsed && hoveredItem === "settings" && (
              <div className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white">
                Settings
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
          >
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <LogOut size={20} className="flex-shrink-0" />
              <motion.span
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-sm"
              >
                Logout
              </motion.span>
            </button>
            {isCollapsed && hoveredItem === "logout" && (
              <div className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white">
                Logout
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Fly-out Mega Menu for Student Services (Only for STUDENT) */}
      <AnimatePresence>
        {isServicesOpen && role === "STUDENT" && currentConfig.services && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsServicesOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 top-0 z-50"
              style={{ left: isCollapsed ? 64 : 256 }}
            >
              <div
                className="h-full w-80 overflow-hidden rounded-r-2xl shadow-2xl"
                style={{
                  backdropFilter: "blur(40px)",
                  background: "rgba(3, 43, 145, 0.95)",
                  border: "1px solid rgba(20, 136, 219, 0.3)",
                }}
              >
                <div className="border-b border-white/10 px-6 py-5">
                  <h2 className="text-lg font-semibold text-white">
                    Student Services
                  </h2>
                  <p className="mt-1 text-xs text-white/60">
                    Access administrative services
                  </p>
                </div>
                <div className="scrollbar-hide h-[calc(100vh-88px)] overflow-y-auto py-4">
                  <div className="space-y-1 px-3">
                    {currentConfig.services.map((service) => {
                      const Icon = service.icon;
                      const isActive = pathname === service.href;
                      return (
                        <Link
                          key={service.id}
                          href={service.href}
                          onClick={() => setIsServicesOpen(false)}
                          className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200 ${
                            isActive
                              ? "bg-white/20 text-white shadow-lg"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                              isActive ? "bg-white/20" : "bg-white/5"
                            }`}
                          >
                            <Icon size={20} />
                          </div>
                          <span className="text-left text-sm">
                            {service.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
