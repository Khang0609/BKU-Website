import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export const NotFoundResult = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-md"
    >
      <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        No courses found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search or filter criteria
      </p>
    </motion.div>
  );
};
