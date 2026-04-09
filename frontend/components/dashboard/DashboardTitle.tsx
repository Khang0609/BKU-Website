"use client";

import { motion } from "framer-motion";

interface PageTitleProps {
  title: string;
  description: string;
}

export const DashboardTitle = ({ title, description }: PageTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-xl"
    >
      <h1 className="title-xl mb-2 font-bold">{title}</h1>
      <p className="subtitle-xl text-white/80">{description}</p>
    </motion.div>
  );
};
