"use client";

import Link from "next/link";
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
import { motion } from "framer-motion";
import {
  HorizontalCarousel,
  ServiceCarousel,
} from "@/components/HorizontalCarousel";

export default function DashboardPage() {
  const quickAccessItems = [
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

  const comingSoonItems = [
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

  const recentServices = [
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

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-xl"
      >
        <h1 className="title-xl mb-2 font-bold">Welcome to Your Dashboard</h1>
        <p className="subtitle-xl text-white/80">
          Control center for all your academic and administrative needs
        </p>
      </motion.div>

      {/* Quick Access Grid */}
      {/* Quick Access Carousel (Mobile) / Grid (Desktop) */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Quick Access
        </h2>
        {/* We use a custom Carousel that handles responsiveness internally via CSS classes on children */}
        <HorizontalCarousel>
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={!item.disabled ? { scale: 1.05, y: -5 } : {}}
                whileTap={!item.disabled ? { scale: 0.95 } : {}}
                className={`group relative h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-left shadow-md transition-all duration-300 hover:shadow-xl ${
                  item.disabled
                    ? "cursor-not-allowed opacity-75"
                    : "cursor-pointer"
                }`}
              >
                <div
                  className={`absolute right-0 top-0 h-32 w-32 bg-gradient-to-br ${item.color} -translate-y-16 translate-x-16 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150`}
                ></div>

                <div className="relative">
                  <div
                    className={`h-12 w-12 bg-gradient-to-br ${item.color} mb-4 flex items-center justify-center rounded-xl`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="mb-1 font-semibold text-gray-800">
                    {item.label}
                  </h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                  {item.disabled && (
                    <span className="mt-2 block text-xs font-medium text-orange-600">
                      Coming Soon
                    </span>
                  )}
                </div>
              </motion.div>
            );

            return item.disabled ? (
              <div key={item.id} className="h-full">
                {content}
              </div>
            ) : (
              <Link key={item.id} href={item.href} className="block h-full">
                {content}
              </Link>
            );
          })}
        </HorizontalCarousel>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Student Services */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-md lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Student Services
            </h2>
            <span className="text-xs text-gray-500">
              Quick access to services
            </span>
          </div>

          <ServiceCarousel>
            {recentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className="block h-full w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group flex h-full cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-secondary hover:bg-blue-50"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                      <Icon
                        className="text-primary transition-colors group-hover:text-white"
                        size={20}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-sm font-medium text-gray-800">
                        {service.label}
                      </h3>
                      <p className="text-xs text-green-600">{service.status}</p>
                    </div>
                    <ArrowRight
                      className="text-gray-400 transition-colors group-hover:text-secondary"
                      size={16}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </ServiceCarousel>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Coming Soon</h2>
            <span className="h-full rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
              New
            </span>
          </div>

          <div className="space-y-3">
            {comingSoonItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                    <Icon className="text-gray-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {item.label}
                    </h3>
                    <p className="mb-1 text-xs text-gray-500">
                      {item.description}
                    </p>
                    <span className="text-xs font-medium text-orange-600">
                      {item.eta}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Semester</span>
            <Calendar className="text-secondary" size={20} />
          </div>
          <p className="text-xl font-bold text-gray-800 md:text-2xl">
            Fall 2025
          </p>
          <p className="mt-1 text-xs text-gray-500">Week 14 of 16</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Enrolled Courses</span>
            <BookOpen className="text-secondary" size={20} />
          </div>
          <p className="text-xl font-bold text-gray-800 md:text-2xl">
            6 Courses
          </p>
          <p className="mt-1 text-xs text-gray-500">18 Credits total</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Average GPA</span>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-xl font-bold text-gray-800 md:text-2xl">3.45</p>
          <p className="mt-1 text-xs text-green-600">+0.12 from last sem</p>
        </div>

        <div className="mb-10 md:mb-0 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Pending Tasks</span>
            <Clock className="text-orange-500" size={20} />
          </div>
          <p className="text-xl font-bold text-gray-800 md:text-2xl">3 Items</p>
          <p className="mt-1 text-xs text-orange-600">Due this week</p>
        </div>
      </motion.div>
    </div>
  );
}
