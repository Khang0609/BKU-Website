import {
  TrendingUp,
  Calendar,
  User,
  HelpCircle,
  DollarSign,
  CreditCard,
  ShoppingBag,
  Users,
  Award,
  Clock,
  FileText,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const quickAccessItems = [
  {
    id: "courses",
    label: "My Courses",
    icon: TrendingUp,
    description: "View academic performance",
    color: "from-blue-500 to-blue-600",
    href: "/course",
  },
  {
    id: "calendar",
    label: "Timetable",
    icon: Calendar,
    description: "Class schedule & events",
    color: "from-purple-500 to-purple-600",
    href: "/calendar",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Personal information",
    color: "from-green-500 to-green-600",
    href: "/profile",
  },
  {
    id: "messages",
    label: "Support",
    icon: HelpCircle,
    description: "Get help & assistance",
    color: "from-orange-500 to-orange-600",
    href: "/message",
  },
  {
    id: "tuition",
    label: "Tuition",
    icon: DollarSign,
    description: "Payment & financial info",
    color: "from-red-500 to-red-600",
    href: "#",
    disabled: true,
  },
];

export const comingSoonItems = [
  {
    label: "Online Payment",
    icon: CreditCard,
    description: "Pay tuition online",
    eta: "Q1 2026",
  },
  {
    label: "Bookstore",
    icon: ShoppingBag,
    description: "Order textbooks & supplies",
    eta: "Q2 2026",
  },
  {
    label: "Club Activities",
    icon: Users,
    description: "Join student organizations",
    eta: "Q2 2026",
  },
];

export const recentServices = [
  {
    id: "detailed-profile",
    label: "Detailed Profile",
    icon: User,
    status: "Active",
    href: "/profile/info",
  },
  {
    id: "exam-revaluation",
    label: "Exam Re-evaluation",
    icon: Award,
    status: "Available",
    href: "/student-service/exam-appeal",
  },
  {
    id: "card-printing",
    label: "Student Card",
    icon: CreditCard,
    status: "Available",
    href: "/student-service/card-printing",
  },
  {
    id: "exam-postponement",
    label: "Exam Deferral",
    icon: Clock,
    status: "Available",
    href: "/student-service/exam-deferral",
  },
  {
    id: "degree-declaration",
    label: "Degree Info",
    icon: FileText,
    status: "Available",
    href: "/student-service/degree-declaration",
  },
];
