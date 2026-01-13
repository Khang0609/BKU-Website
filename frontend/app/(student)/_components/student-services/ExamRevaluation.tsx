import { useState } from 'react';
import { AlertCircle, Info, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  originalGrade: string;
  examDate: string;
  deadline: string;
  reason: string;
  selected: boolean;
}

interface RequestHistory {
  id: number;
  requestId: string;
  courseName: string;
  originalGrade: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  submissionDate: string;
  resultDate?: string;
  finalGrade?: string;
  notes?: string;
}

export function ExamRevaluation() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      courseCode: 'MT1003',
      courseName: 'Calculus 1',
      originalGrade: 'B+',
      examDate: '05/12/2025',
      deadline: '18/01/2026',
      reason: '',
      selected: false,
    },
    {
      id: 2,
      courseCode: 'PH1007',
      courseName: 'General Physics 1',
      originalGrade: 'C',
      examDate: '08/12/2025',
      deadline: '21/01/2026',
      reason: '',
      selected: false,
    },
    {
      id: 3,
      courseCode: 'CO1027',
      courseName: 'Data Structures & Algorithms',
      originalGrade: 'B',
      examDate: '12/12/2025',
      deadline: '25/01/2026',
      reason: '',
      selected: false,
    },
  ]);

  const [requestHistory] = useState<RequestHistory[]>([
    {
      id: 1,
      requestId: 'REV2025001',
      courseName: 'Calculus 2',
      originalGrade: 'B',
      status: 'processing',
      submissionDate: '15/12/2025',
    },
    {
      id: 2,
      requestId: 'REV2024089',
      courseName: 'Linear Algebra',
      originalGrade: 'C+',
      status: 'completed',
      submissionDate: '20/11/2025',
      resultDate: '05/12/2025',
      finalGrade: 'C+',
      notes: 'Grade unchanged after re-evaluation',
    },
    {
      id: 3,
      requestId: 'REV2024067',
      courseName: 'Programming Fundamentals',
      originalGrade: 'B',
      status: 'completed',
      submissionDate: '10/11/2025',
      resultDate: '25/11/2025',
      finalGrade: 'B+',
      notes: 'Grade increased after re-evaluation',
    },
  ]);

  const handleToggleCourse = (id: number) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, selected: !course.selected } : course
      )
    );
  };

  const handleReasonChange = (id: number, reason: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, reason } : course
      )
    );
  };

  const handleSubmit = () => {
    const selected = courses.filter((course) => course.selected);
    if (selected.length === 0) {
      alert('Please select at least one course for re-evaluation.');
      return;
    }

    const missingReason = selected.some((course) => !course.reason.trim());
    if (missingReason) {
      alert('Please provide a reason for re-evaluation for all selected courses.');
      return;
    }

    alert(`Re-evaluation request submitted for ${selected.length} course(s).`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <Clock size={14} />
            Pending
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            <AlertCircle size={14} />
            Processing
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <CheckCircle size={14} />
            Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const hasSelectedCourses = courses.some((course) => course.selected);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-gray-800 mb-2">Exam Re-evaluation Request</h1>
        <p className="text-sm text-gray-600">
          Submit a request to re-evaluate your exam grades
        </p>
      </div>

      {/* Section 1: Course Selection & Reason */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
            1
          </div>
          <h2 className="text-gray-800">Select Courses for Re-evaluation</h2>
        </div>

        {/* Info Alerts */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-gray-700">
              <p>
                <strong>Important:</strong> Re-evaluation is NOT available for: multiple-choice exams, lab experiments, practical courses, internships, projects, thesis outlines, graduation theses, or oral examinations.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
            <Info className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-gray-700">
              <p>
                Each course can only be re-evaluated once. The re-evaluation deadline is 7 days from the date grades are published. There is no limit on the number of courses you can request.
              </p>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm text-gray-700 w-12">#</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">Course Code</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">Course Name</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">Current Grade</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">Exam Date</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">Deadline</th>
                <th className="px-4 py-3 text-left text-sm text-gray-700 w-80">Reason for Re-evaluation</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={course.selected}
                      onChange={() => handleToggleCourse(course.id)}
                      className="w-4 h-4 text-[#1488db] border-gray-300 rounded focus:ring-[#1488db]"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{course.courseCode}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{course.courseName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {course.originalGrade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{course.examDate}</td>
                  <td className="px-4 py-3 text-sm text-orange-600">{course.deadline}</td>
                  <td className="px-4 py-3">
                    <textarea
                      value={course.reason}
                      onChange={(e) => handleReasonChange(course.id, e.target.value)}
                      disabled={!course.selected}
                      placeholder={course.selected ? "Explain your reason for re-evaluation..." : "Select course to add reason"}
                      rows={2}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none transition-all ${
                        course.selected
                          ? 'bg-white text-gray-800 focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db]'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!hasSelectedCourses}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 ${
              hasSelectedCourses
                ? 'bg-[#032b91] hover:bg-[#1488db] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Section 2: Request History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
            2
          </div>
          <h2 className="text-gray-800">Re-evaluation Request History</h2>
        </div>

        {requestHistory.length === 0 ? (
          <p className="text-sm text-gray-600 py-4">No re-evaluation requests found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Request ID</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Course Name</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Original Grade</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Submission Date</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Result Date</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Final Grade</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {requestHistory.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{request.requestId}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{request.courseName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                        {request.originalGrade}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{request.submissionDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{request.resultDate || '—'}</td>
                    <td className="px-4 py-3">
                      {request.finalGrade ? (
                        <span className={`inline-block px-3 py-1 rounded text-sm ${
                          request.finalGrade > request.originalGrade
                            ? 'bg-green-100 text-green-800'
                            : request.finalGrade < request.originalGrade
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {request.finalGrade}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{request.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Info Note */}
        <div className="mt-6 flex gap-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-gray-700">
            <p>
              The Academic Affairs Office will forward re-evaluation requests to the respective Faculties/Departments for instructor review. After re-evaluation, instructors will update grades (if changed) in the grading system and send results to the Academic Affairs Office for final update.
            </p>
            <p className="mt-2">
              Students can view their grades at{' '}
              <a href="https://mybk.hcmut.edu.vn" className="text-[#1488db] hover:underline">
                mybk.hcmut.edu.vn
              </a>
              {' '}→ Student Information → Transcript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
