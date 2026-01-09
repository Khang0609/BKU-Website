import { useState, Fragment, useRef } from "react";
import {
  Info,
  Search,
  FileText,
  Upload,
  X,
  Check,
  ChevronDown,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import { ImageWithFallback } from "../ImageWithFallback";

interface Course {
  id: string;
  courseId: string;
  courseName: string;
  examDate: string;
  status: string;
  group: string;
  selected: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  preview?: string;
  type: string;
}

export function ExamDeferral() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const semesters = [
    { id: 0, name: "-- Select Academic Year/Semester --" },
    {
      id: 1,
      name: "20251 - Semester 1 Academic Year 2025-2026",
      semester: "20251",
      status: "Active",
      deadline: "09/01/2026 17:00",
    },
    {
      id: 2,
      name: "20252 - Semester 2 Academic Year 2024-2025",
      semester: "20252",
      status: "Closed",
      deadline: "15/06/2025 17:00",
    },
  ];

  const [selectedSemester, setSelectedSemester] = useState(semesters[1]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      courseId: "CO1005",
      courseName: "Introduction to Computer Programming",
      examDate: "24/12/2025",
      status: "Scheduled",
      group: "CC02",
      selected: false,
    },
    {
      id: "2",
      courseId: "CO1023",
      courseName: "Computer Networks",
      examDate: "25/12/2025",
      status: "Scheduled",
      group: "CC01",
      selected: false,
    },
    {
      id: "3",
      courseId: "PH1003",
      courseName: "Physics 1",
      examDate: "22/12/2025",
      status: "Scheduled",
      group: "CC17",
      selected: false,
    },
    {
      id: "4",
      courseId: "MT1003",
      courseName: "Calculus 1",
      examDate: "23/12/2025",
      status: "Scheduled",
      group: "CC21",
      selected: false,
    },
  ]);

  const toggleCourseSelection = (courseId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, selected: !course.selected }
          : course,
      ),
    );
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 5MB limit`);
        return;
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        alert(
          `File ${file.name} is not a supported format (JPG, PNG, PDF only)`,
        );
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedFiles((prev) =>
            prev.map((f) =>
              f.id === newFile.id
                ? { ...f, preview: e.target?.result as string }
                : f,
            ),
          );
        };
        reader.readAsDataURL(file);
      }

      setSelectedFiles((prev) => [...prev, newFile]);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = () => {
    const selectedCourses = courses.filter((c) => c.selected);
    if (selectedCourses.length === 0) {
      alert("Please select at least one course for deferral");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("Please upload supporting evidence documents");
      return;
    }
    alert("Exam deferral request submitted successfully!");
  };

  const handleCancel = () => {
    if (
      confirm("Are you sure you want to cancel? All entered data will be lost.")
    ) {
      // Reset form
      setCourses(courses.map((c) => ({ ...c, selected: false })));
      setSelectedFiles([]);
      setSearchQuery("");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-gray-800">Exam Deferral Registration</h1>
        <p className="text-sm text-gray-600">
          Request to postpone scheduled examinations with supporting evidence
        </p>
      </div>

      {/* Section 1: Registration Session */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            1
          </div>
          <h2 className="text-gray-800">1. Registration Session Selection</h2>
        </div>

        {/* Semester Dropdown */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-700">
            Academic Year - Semester <span className="text-red-500">*</span>
          </label>
          <Listbox value={selectedSemester} onChange={setSelectedSemester}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                <span
                  className={`block truncate ${selectedSemester.id === 0 ? "text-gray-400" : "text-gray-800"}`}
                >
                  {selectedSemester.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {semesters.map((semester) => (
                    <Listbox.Option
                      key={semester.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                          active
                            ? "bg-[#1488db] text-white"
                            : semester.id === 0
                              ? "text-gray-400"
                              : "text-gray-800"
                        }`
                      }
                      value={semester}
                      disabled={semester.id === 0}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                          >
                            {semester.name}
                          </span>
                          {selected && semester.id !== 0 ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-[#1488db]"
                              }`}
                            >
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Session Info Card */}
        {selectedSemester.id !== 0 && (
          <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="mb-1 text-sm text-gray-600">
                  Registration Session
                </h3>
                <p className="text-gray-800">
                  Exam Deferral - Semester {selectedSemester.semester}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedSemester.status === "Active" ? (
                  <>
                    <div className="relative">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      Active
                    </span>
                  </>
                ) : (
                  <>
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    <span className="text-sm font-medium text-gray-500">
                      Closed
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs text-gray-600">Session Code</p>
                <p className="text-sm font-medium text-gray-800">
                  HOANTHI_CX.{selectedSemester.semester}.1
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-600">
                  Registration Deadline
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {selectedSemester.deadline}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 text-sm text-[#1488db] transition-colors hover:text-[#032b91]"
            >
              <ExternalLink size={16} />
              View Exam Deferral Regulations
            </button>
          </div>
        )}
      </div>

      {/* Section 2: Course Selection List */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            2
          </div>
          <h2 className="text-gray-800">2. Select Courses for Deferral</h2>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by course ID or course name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
            />
          </div>
        </div>

        {/* Selectable Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-12 px-4 py-3 text-left text-sm text-gray-700">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCourses(
                        courses.map((c) => ({ ...c, selected: isChecked })),
                      );
                    }}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#1488db] focus:ring-[#1488db]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">#</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">
                  Course ID
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">
                  Course Name
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">
                  Group
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">
                  Exam Date
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    No courses found matching your search
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`border-b border-gray-100 transition-colors hover:bg-blue-50 ${
                      course.selected ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={course.selected}
                        onChange={() => toggleCourseSelection(course.id)}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#1488db] focus:ring-[#1488db]"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {course.courseId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {course.courseName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {course.group}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {course.examDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm text-blue-800">
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Count */}
        <div className="mt-4 text-sm text-gray-600">
          Selected:{" "}
          <span className="font-medium text-gray-800">
            {courses.filter((c) => c.selected).length}
          </span>{" "}
          course(s)
        </div>
      </div>

      {/* Section 3: Evidence Upload */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            3
          </div>
          <h2 className="text-gray-800">3. Upload Supporting Evidence</h2>
        </div>

        {/* Premium File Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-lg border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? "border-[#1488db] bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Upload className="text-[#1488db]" size={28} />
            </div>
            <div>
              <p className="mb-1 text-gray-800">
                Drag and drop files here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-medium text-[#1488db] hover:text-[#032b91]"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF (Max 5MB per file)
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Uploaded Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-medium text-gray-700">
              Uploaded Documents ({selectedFiles.length})
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
                >
                  {file.preview ? (
                    <div className="relative mb-2 h-32 w-full">
                      <ImageWithFallback
                        src={file.preview}
                        alt={file.name}
                        className="rounded"
                      />
                    </div>
                  ) : (
                    <div className="mb-2 flex h-32 items-center justify-center rounded bg-gray-100">
                      <FileText className="text-gray-400" size={32} />
                    </div>
                  )}
                  <p className="mb-1 truncate text-xs text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Guidelines Card */}
        <div className="mt-6 rounded-r-lg border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 p-5">
          <div className="flex gap-3">
            <AlertTriangle
              className="mt-0.5 flex-shrink-0 text-orange-500"
              size={20}
            />
            <div>
              <h3 className="mb-3 text-gray-800">Important Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold text-orange-500">•</span>
                  <span>
                    <strong>Eligibility:</strong> Exam deferral is only
                    applicable for students who are absent on the exam day due
                    to valid reasons (medical emergency, family emergency, force
                    majeure).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-orange-500">•</span>
                  <span>
                    <strong>Valid Subjects:</strong> Deferral requests apply
                    only to subjects with fixed exam dates as per the official
                    academic calendar. Laboratory assessments and continuous
                    assessment courses are not eligible.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-orange-500">•</span>
                  <span>
                    <strong>Required Documentation:</strong> Students must
                    provide valid supporting evidence (medical certificate,
                    official notice, etc.). Documents must be clear, legible,
                    and properly authenticated.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-orange-500">•</span>
                  <span>
                    <strong>Further Inquiries:</strong> For questions or
                    assistance, please contact the Academic Affairs Office at{" "}
                    <strong>daotao@hcmut.edu.vn</strong> or visit the office
                    during working hours (Mon-Fri, 7:30-11:30 & 13:00-16:30).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg bg-gray-100 px-6 py-2.5 text-gray-700 transition-all duration-200 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-lg bg-[#032b91] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#1488db]"
        >
          <Check size={18} />
          Review & Submit Deferral Request
        </button>
      </div>
    </div>
  );
}
