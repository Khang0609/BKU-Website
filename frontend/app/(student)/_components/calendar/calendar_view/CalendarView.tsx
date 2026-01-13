import { motion } from "framer-motion";
import { CalendarGrid } from "./CalendarGrid";

export const CalendarView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-md"
    >
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="title-xl font-semibold text-gray-900">January 2026</h2>
        <div className="flex w-full justify-between gap-2 sm:w-auto">
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
            Previous
          </button>
          <button className="grow rounded-lg bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary-dark sm:grow-0">
            Today
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Simple Calendar Grid - Placeholder */}
      <CalendarGrid />
    </motion.div>
  );
};
