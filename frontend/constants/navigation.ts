import {
  Home,
  BookOpen,
  Calendar,
  MessageSquare,
  User,
  GraduationCap,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Database,
  Award,
  Activity,
  Users,
  ToggleLeft,
  Grid3x3,
} from "lucide-react";
import { UserRole } from "@/context/AuthContext";

export interface MenuItem {
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
