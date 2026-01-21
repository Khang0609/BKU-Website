import { LucideIcon } from "lucide-react";

// Define the shape of the data needed for the dashboard card
export interface StudentDashboardData {
  first_name: string;
  last_name: string;
  student_id: string;
  major: string;
  class_code: string;
  entry_semester: string;
  status: string;
}

export interface ClusterItem {
  label: string;
  icon: LucideIcon;
  href: string;
  desc: string;
}

export interface Cluster {
  id: string;
  title: string;
  icon: LucideIcon;
  items: ClusterItem[];
}
