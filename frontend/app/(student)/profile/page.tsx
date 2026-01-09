"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  FileText,
  Award,
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
  ArrowUpRight,
  ChevronRight,
  Shield,
  Clock,
  Briefcase,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { getApiUrl } from "@/lib/api";
import { authFetch } from "@/lib/authFetch";

const API_URL = getApiUrl();

// Define the shape of the data needed for the dashboard card
interface StudentDashboardData {
  first_name: string;
  last_name: string;
  student_id: string;
  major: string;
  class_code: string;
  entry_semester: string;
  status: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // authFetch automatically handles token and refreshing
        const res = await authFetch(`${API_URL}/profile/student/me`);

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        console.log(data);
        setProfile({
          first_name: data.personal.first_name || "",
          last_name: data.personal.last_name || "",
          student_id: data.academic.student_id || "N/A",
          major: data.academic.major || "N/A",
          class_code: data.academic.class_code || "N/A",
          entry_semester: data.academic.entry_semester || "N/A",
          status: data.academic.status || "Unknown",
        });
      } catch (err) {
        console.error("Failed to load profile summary:", err);
        // Fallback or error handling could go here.
        // For dashboard, we might just leave profile null or show placeholders if critical.
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const clusters = [
    {
      id: "academic",
      title: "Academic Management",
      icon: BookOpen,
      items: [
        {
          label: "Course Registration",
          icon: BookOpen,
          href: "/course",
          desc: "Register for new semesters",
        },
        {
          label: "LMS & Learning",
          icon: Monitor,
          href: "#",
          desc: "Access course materials",
        },
        {
          label: "Class & Advisor",
          icon: Users,
          href: "#",
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
          href: "#",
          desc: "Pay pending tuition",
        },
        {
          label: "Payment History",
          icon: History,
          href: "#",
          desc: "View past transactions",
        },
        {
          label: "Q&A Support",
          icon: HelpCircle,
          href: "/message",
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
          href: "#",
          desc: "Score: 85/100",
        },
        {
          label: "Extra-curricular",
          icon: Activity,
          href: "#",
          desc: "View activity log",
        },
        {
          label: "Scholarships",
          icon: Gift,
          href: "#",
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
          href: "#",
          desc: "Health insurance & records",
        },
        {
          label: "Graduation",
          icon: GraduationCap,
          href: "/student-service/graduation-verification",
          desc: "Degree verification",
        },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === "#") {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const leftColClusters = clusters.filter((c) => c.id === "training");
  const rightColClusters = clusters.filter((c) =>
    ["academic", "finance", "health"].includes(c.id),
  );

  // Computed Values
  const fullName = profile
    ? `${profile.last_name} ${profile.first_name}`
    : "Student Name";
  const initials = profile?.first_name ? profile.first_name[0] : "S";

  return (
    <div className="relative min-h-full p-6 text-slate-800">
      {/* Toast Notification */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 50 }}
        className="fixed bottom-8 right-8 z-50 rounded-lg bg-slate-900 px-4 py-3 text-white shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm font-medium">
            Coming Soon in next update!
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemAnim} className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary md:h-12 md:w-12">
              <User className="text-white" size={20} />
            </div>
            <div>
              <h1 className="title-xl font-bold text-gray-900">
                Student Profile
              </h1>
              <p className="subtitle-xl text-gray-600">
                Manage your personal information, records, and academic status.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* 1. Personal & Legal (Large Card) */}
            <motion.div variants={itemAnim}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="bg-[#003087] px-8 py-6 text-white">
                  <div className="flex items-center gap-4">
                    <Shield className="h-6 w-6 text-white/80" />
                    <h2 className="text-lg font-semibold tracking-wide text-white/90">
                      Personal & Legal
                    </h2>
                  </div>
                </div>
                <div className="p-8">
                  {loading ? (
                    <div className="flex h-40 items-center justify-center">
                      <Loader2
                        className="animate-spin text-slate-400"
                        size={32}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {/* Profile Summary */}
                      <div className="flex items-center gap-5">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-50 bg-[#003087] text-2xl font-bold text-white shadow-lg">
                          {initials}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#003087] md:text-2xl">
                            {fullName}
                          </h3>
                          <p className="font-medium text-slate-500">
                            ID: {profile?.student_id}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {profile?.major}
                            </span>
                          </div>
                          <Link
                            href="/profile/info"
                            className="mt-2 inline-flex items-center text-sm font-medium text-[#003087] hover:underline"
                          >
                            View Detailed Info{" "}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100 dark:bg-slate-50"></div>

                      {/* Quick Stats / Status */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">
                            Academic Status
                          </p>
                          <p className="font-semibold text-green-600">
                            {profile?.status}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">
                            Current Class
                          </p>
                          <p className="font-semibold text-[#003087]">
                            {profile?.class_code}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link
                          href="/profile/records"
                          className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-[#003087]/20 hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
                              <FileText size={18} />
                            </div>
                            <span className="font-medium text-slate-700 group-hover:text-[#003087]">
                              Student Records
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href="/profile/records"
                          className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-[#003087]/20 hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
                              <Briefcase size={18} />
                            </div>
                            <span className="font-medium text-slate-700 group-hover:text-[#003087]">
                              Decisions
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Left Column Dynamic Clusters (e.g., Training) */}
            {leftColClusters.map((cluster) => (
              <motion.div key={cluster.id} variants={itemAnim}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
                        <cluster.icon size={18} />
                      </div>
                      <h3 className="font-semibold text-slate-800">
                        {cluster.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {cluster.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="group mb-2 flex items-center gap-4 rounded-xl p-3 last:mb-0 hover:bg-slate-50"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#003087] group-hover:text-white">
                          <item.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-[#003087]">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {rightColClusters.map((cluster) => (
              <motion.div key={cluster.id} variants={itemAnim}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
                        <cluster.icon size={18} />
                      </div>
                      <h3 className="font-semibold text-slate-800">
                        {cluster.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {cluster.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="group mb-2 flex items-center gap-4 rounded-xl p-3 last:mb-0 hover:bg-slate-50"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#003087] group-hover:text-white">
                          <item.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-[#003087]">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
