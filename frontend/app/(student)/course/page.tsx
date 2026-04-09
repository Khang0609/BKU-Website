
import { BookOpen } from "lucide-react";
import { PageTitle } from "@/components/ui";
import { CourseProvider } from "@/app/(student)/_context/CourseContext";
import { CoursePageContent } from "./CoursePageContent";

export default function CoursesPage() {
  // Sau này bạn có thể fetch dữ liệu ở đây
  // const initialCourses = await getCoursesServer();

  return (
    <div className="space-y-4 p-4 md:space-y-6 md:p-6">
      {/* Header */}
      <PageTitle
        title="My Courses"
        subtitle="View and manage your enrolled courses"
        icon={BookOpen}
      />

      <CourseProvider>
        <CoursePageContent />
      </CourseProvider>
    </div>
  );
}
