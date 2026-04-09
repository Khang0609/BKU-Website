"use client";

import { motion } from "framer-motion";
import { comingSoonItems } from "@/app/(student)/_types/dashboard";

export const ComingSoonSection = () => {
  return (
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
                <p className="mb-1 text-xs text-gray-500">{item.description}</p>
                <span className="text-xs font-medium text-orange-600">
                  {item.eta}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
