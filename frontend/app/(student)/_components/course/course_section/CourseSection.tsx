import { motion } from "framer-motion";
import { CourseCard } from "@/components/data-display";
import { CourseSectionProps } from "@/app/(student)/_types/course";

export const CourseSection = ({ title, courses }: CourseSectionProps) => {
  if (courses.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
