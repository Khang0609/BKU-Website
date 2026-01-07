import { BookOpen, User, Calendar, MapPin, Award } from "lucide-react";
import { Course } from "@/lib/mockData";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getGradeColor = (grade?: string) => {
    if (!grade) return "";
    if (grade.startsWith("A")) return "text-green-600";
    if (grade.startsWith("B")) return "text-blue-600";
    if (grade.startsWith("C")) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-secondary">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono text-gray-500">
              {course.code}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                course.status
              )}`}
            >
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
        </div>
        {course.grade && (
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Grade</div>
            <div
              className={`text-2xl font-bold ${getGradeColor(course.grade)}`}
            >
              {course.grade}
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={16} className="text-gray-400" />
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} className="text-gray-400" />
          <span>{course.schedule}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-gray-400" />
          <span>{course.room}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Award size={16} className="text-gray-400" />
          <span>{course.credits} Credits</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{course.semester}</span>
          <button className="text-sm text-secondary hover:text-secondary-dark font-medium transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
