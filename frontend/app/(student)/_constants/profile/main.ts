import {
  BookOpen,
  Monitor,
  Users,
  Wallet,
  History,
  HelpCircle,
  Star,
  Activity,
  Gift,
  Heart,
  GraduationCap,
  FileText,
  Briefcase,
} from "lucide-react";
import { Cluster } from "@/app/(student)/_types/profile/main";

export const FEATURE_FLAGS = {
  COURSE_REGISTRATION: false,
  LMS_LEARNING: true,
  CLASS_ADVISOR: false,
  TUITION_FEES: false,
  PAYMENT_HISTORY: false,
  QA_SUPPORT: true,
  TRAINING_POINTS: true,
  EXTRA_CURRICULAR: true,
  SCHOLARSHIPS: false,
  MEDICAL_INFO: false,
  GRADUATION: true,
  STUDENT_RECORDS: true,
  DECISION: true,
};

export const personalLegalItems = [
  {
    label: "Student Records",
    icon: FileText,
    href: FEATURE_FLAGS.STUDENT_RECORDS ? "/profile/records" : "#",
  },
  {
    label: "Decisions",
    icon: Briefcase,
    href: FEATURE_FLAGS.DECISION ? "/profile/decision" : "#",
  },
];

export const clusters: Cluster[] = [
  {
    id: "academic",
    title: "Academic Management",
    icon: BookOpen,
    items: [
      {
        label: "Course Registration",
        icon: BookOpen,
        href: FEATURE_FLAGS.COURSE_REGISTRATION ? "/class_enrollment" : "#",
        desc: "Register for new semesters",
      },
      {
        label: "LMS & Learning",
        icon: Monitor,
        href: FEATURE_FLAGS.LMS_LEARNING ? "/course" : "#",
        desc: "Access course materials",
      },
      {
        label: "Class & Advisor",
        icon: Users,
        href: FEATURE_FLAGS.CLASS_ADVISOR ? "/advisor" : "#",
        desc: "View class information",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance & Admin",
    icon: Wallet,
    items: [
      {
        label: "Tuition Fees (BKPay2)",
        icon: Wallet,
        href: FEATURE_FLAGS.TUITION_FEES ? "/finance" : "#",
        desc: "Pay pending tuition",
      },
      {
        label: "Payment History",
        icon: History,
        href: FEATURE_FLAGS.PAYMENT_HISTORY ? "/history" : "#",
        desc: "View past transactions",
      },
      {
        label: "Q&A Support",
        icon: HelpCircle,
        href: FEATURE_FLAGS.QA_SUPPORT ? "/message" : "#",
        desc: "Get university assistance",
      },
    ],
  },
  {
    id: "training",
    title: "Training & Awards",
    icon: Star,
    items: [
      {
        label: "Training Points",
        icon: Star,
        href: FEATURE_FLAGS.TRAINING_POINTS ? "/profile/training-point" : "#",
        desc: "Score: 85/100",
      },
      {
        label: "Extra-curricular",
        icon: Activity,
        href: FEATURE_FLAGS.EXTRA_CURRICULAR
          ? "/profile/extra-curricular"
          : "#",
        desc: "View activity log",
      },
      {
        label: "Scholarships",
        icon: Gift,
        href: FEATURE_FLAGS.SCHOLARSHIPS ? "/scholarships" : "#",
        desc: "Apply for grants",
      },
    ],
  },
  {
    id: "health",
    title: "Health & Graduation",
    icon: Heart,
    items: [
      {
        label: "Medical Info",
        icon: Heart,
        href: FEATURE_FLAGS.MEDICAL_INFO ? "/health" : "#",
        desc: "Health insurance & records",
      },
      {
        label: "Graduation",
        icon: GraduationCap,
        href: FEATURE_FLAGS.GRADUATION
          ? "/student-service/graduation-verification"
          : "#",
        desc: "Degree verification",
      },
    ],
  },
];
