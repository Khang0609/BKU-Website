"use client";

import { motion } from "framer-motion";
import { Calendar, BookOpen, TrendingUp, Clock } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatisticsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <StatCard
        title="Current Semester"
        value="Fall 2025"
        description="Week 14 of 16"
        icon={Calendar}
        color="secondary"
      />
      <StatCard
        title="Enrolled Courses"
        value="6 Courses"
        description="18 Credits total"
        icon={BookOpen}
        color="secondary"
      />
      <StatCard
        title="Average GPA"
        value="3.45"
        description="+0.12 from last sem"
        icon={TrendingUp}
        color="green"
      />
      <StatCard
        title="Pending Tasks"
        value="3 Items"
        description="Due this week"
        icon={Clock}
        color="orange"
      />
    </motion.div>
  );
};
