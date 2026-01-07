export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
  semester: string;
  grade?: string;
  status: "ongoing" | "completed" | "upcoming";
}

export const mockCourses: Course[] = [
  {
    id: "1",
    code: "CO3001",
    name: "Software Engineering",
    credits: 4,
    instructor: "Dr. Nguyen Van A",
    schedule: "Mon, Wed 13:30-15:30",
    room: "H1-101",
    semester: "Fall 2025",
    grade: "A",
    status: "ongoing",
  },
  {
    id: "2",
    code: "CO3005",
    name: "Computer Networks",
    credits: 4,
    instructor: "Dr. Tran Thi B",
    schedule: "Tue, Thu 07:30-09:30",
    room: "H2-205",
    semester: "Fall 2025",
    grade: "B+",
    status: "ongoing",
  },
  {
    id: "3",
    code: "CO3009",
    name: "Database Systems",
    credits: 4,
    instructor: "Dr. Le Van C",
    schedule: "Wed, Fri 09:30-11:30",
    room: "H3-301",
    semester: "Fall 2025",
    status: "ongoing",
  },
  {
    id: "4",
    code: "CO3011",
    name: "Artificial Intelligence",
    credits: 3,
    instructor: "Dr. Pham Thi D",
    schedule: "Mon 15:30-17:30",
    room: "H1-205",
    semester: "Fall 2025",
    status: "ongoing",
  },
  {
    id: "5",
    code: "CO3013",
    name: "Operating Systems",
    credits: 4,
    instructor: "Dr. Hoang Van E",
    schedule: "Tue, Thu 13:30-15:30",
    room: "H2-102",
    semester: "Fall 2025",
    status: "ongoing",
  },
  {
    id: "6",
    code: "CO2001",
    name: "Data Structures & Algorithms",
    credits: 4,
    instructor: "Dr. Nguyen Thi F",
    schedule: "Mon, Wed 07:30-09:30",
    room: "H1-303",
    semester: "Spring 2025",
    grade: "A",
    status: "completed",
  },
];

export interface StudentInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  year: number;
  gpa: number;
  enrolledCredits: number;
  completedCredits: number;
  avatar?: string;
}

export const mockStudentInfo: StudentInfo = {
  id: "2152001",
  name: "Tran Nguyen Khang",
  email: "khang.tran@hcmut.edu.vn",
  phone: "+84 123 456 789",
  major: "Computer Science",
  year: 3,
  gpa: 3.45,
  enrolledCredits: 18,
  completedCredits: 90,
};

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

export const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Nguyen Van A",
    content: "Your project submission has been received.",
    timestamp: "2025-12-30 14:30",
    read: false,
  },
  {
    id: "2",
    sender: "Academic Office",
    content: "Reminder: Course registration opens Jan 5, 2026",
    timestamp: "2025-12-30 10:15",
    read: true,
  },
  {
    id: "3",
    sender: "Dr. Tran Thi B",
    content: "Lab session moved to H2-301",
    timestamp: "2025-12-29 16:45",
    read: true,
  },
];

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "class" | "exam" | "assignment" | "event";
  location?: string;
  description?: string;
}

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Software Engineering - Midterm Exam",
    date: "2026-01-15",
    time: "13:30-15:30",
    type: "exam",
    location: "H1-101",
    description: "Chapters 1-5",
  },
  {
    id: "2",
    title: "Database Project Submission",
    date: "2026-01-10",
    time: "23:59",
    type: "assignment",
    description: "Final project deadline",
  },
  {
    id: "3",
    title: "AI Lab Session",
    date: "2026-01-08",
    time: "15:30-17:30",
    type: "class",
    location: "H1-205",
  },
];
