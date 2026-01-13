import { Course } from "@/lib/mockData";

export type FilterStatus = "all" | "ongoing" | "completed" | "upcoming";

export interface SearchStatisticsProps {
  totalCourses: number;
  ongoingCourses: number;
  completedCourses: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}

export interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}

export interface DesktopCardsStatsProps {
  totalCourses: number;
  ongoingCourses: number;
  completedCourses: number;
}

export interface CourseSectionProps {
  title: string;
  courses: Course[];
}
