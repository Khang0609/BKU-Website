import { useState } from "react";
import {
  Info,
  Calculator,
  Download,
  AlertTriangle,
  ExternalLink,
  Check,
} from "lucide-react";

interface Course {
  id: string;
  courseId: string;
  courseName: string;
  credits: number;
  group: string;
  selected: boolean;
}

interface WithdrawalRecord {
  id: number;
  requestId: string;
  courseDetails: string;
  credits: number;
  submissionDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

export function CourseWithdrawal() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      courseId: "CO1005",
      courseName: "Introduction to Computer Programming",
      credits: 4,
      group: "CC02",
      selected: false,
    },
    {
      id: "2",
      courseId: "CO1023",
      courseName: "Computer Networks",
      credits: 4,
      group: "CC01",
      selected: false,
    },
    {
      id: "3",
      courseId: "PH1003",
      courseName: "Physics 1",
      credits: 3,
      group: "CC17",
      selected: false,
    },
    {
      id: "4",
      courseId: "MT1003",
      courseName: "Calculus 1",
      credits: 4,
      group: "CC21",
      selected: false,
    },
    {
      id: "5",
      courseId: "CH1003",
      courseName: "General Chemistry",
      credits: 3,
      group: "CC05",
      selected: false,
    },
  ]);

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [records] = useState<WithdrawalRecord[]>([
    {
      id: 1,
      requestId: "CW2025120001",
      courseDetails: "CO1001 - Introduction to Computer Science (CC03)",
      credits: 4,
      submissionDate: "10/12/2025",
      status: "Approved",
    },
    {
      id: 2,
      requestId: "CW2025110045",
      courseDetails: "MT1005 - Linear Algebra (CC12)",
      credits: 3,
      submissionDate: "05/11/2025",
      status: "Pending",
    },
  ]);

  const minimumRequiredCredits = 12;
  const currentEnrolledCredits = courses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );
  const withdrawalCredits = courses
    .filter((c) => c.selected)
    .reduce((sum, course) => sum + course.credits, 0);
  const creditsAfterWithdrawal = currentEnrolledCredits - withdrawalCredits;
  const isUnderMinimum = creditsAfterWithdrawal < minimumRequiredCredits;

  const toggleCourseSelection = (courseId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, selected: !course.selected }
          : course,
      ),
    );
  };

  const handleConfirmWithdrawal = () => {
    const selectedCourses = courses.filter((c) => c.selected);

    if (selectedCourses.length === 0) {
      alert("Please select at least one course to withdraw");
      return;
    }

    if (!agreedToTerms) {
      alert("Please read and agree to the terms and conditions");
      return;
    }

    if (isUnderMinimum) {
      alert(
        `Warning: After withdrawal, you will have ${creditsAfterWithdrawal} credits, which is below the minimum requirement of ${minimumRequiredCredits} credits. This may affect your academic standing.`,
      );
      return;
    }

    // Double confirmation popup
    const courseList = selectedCourses
      .map((c) => `${c.courseId} - ${c.courseName}`)
      .join("\n");
    const confirmed = window.confirm(
      `⚠️ FINAL CONFIRMATION\n\nYou are about to withdraw from ${selectedCourses.length} course(s):\n\n${courseList}\n\nTotal Credits to Withdraw: ${withdrawalCredits}\nCredits After Withdrawal: ${creditsAfterWithdrawal}\n\nThis action cannot be undone. Do you wish to proceed?`,
    );

    if (confirmed) {
      alert("Course withdrawal request submitted successfully!");
      // Reset form
      setCourses(courses.map((c) => ({ ...c, selected: false })));
      setAgreedToTerms(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-gray-800">Course Withdrawal Request</h1>
        <p className="text-sm text-gray-600">
          Submit a formal request to withdraw from registered courses
        </p>
      </div>

      {/* Real-time Credit Calculator - Floating Summary */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1488db]">
            <Calculator className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="mb-3 text-gray-800">Credit Calculation Summary</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="mb-1 text-xs text-gray-600">
                  Current Enrolled Credits
                </p>
                <p className="text-2xl text-gray-800">
                  {currentEnrolledCredits}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="mb-1 text-xs text-gray-600">
                  Credits to Withdraw
                </p>
                <p className="text-2xl text-orange-600">-{withdrawalCredits}</p>
              </div>
              <div
                className={`rounded-lg border-2 p-4 ${
                  isUnderMinimum
                    ? "border-red-300 bg-red-50"
                    : "border-green-300 bg-green-50"
                }`}
              >
                <p className="mb-1 text-xs text-gray-600">
                  Credits After Withdrawal
                </p>
                <p
                  className={`text-2xl ${
                    isUnderMinimum ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {creditsAfterWithdrawal}
                </p>
                {isUnderMinimum && (
                  <p className="mt-1 text-xs text-red-600">
                    ⚠️ Below minimum ({minimumRequiredCredits})
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Course Selection Grid */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            1
          </div>
          <h2 className="text-gray-800">1. Select Courses for Withdrawal</h2>
        </div>

        {/* Course Selection Table */}
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
                    checked={courses.every((c) => c.selected)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-orange-600 focus:ring-orange-500"
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
                  Credits
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-700">
                  Group/Class
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={course.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-orange-50 ${
                    course.selected ? "bg-orange-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={course.selected}
                      onChange={() => toggleCourseSelection(course.id)}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-orange-600 focus:ring-orange-500"
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
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {course.credits}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {course.group}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Selected for withdrawal:{" "}
          <span className="font-medium text-gray-800">
            {courses.filter((c) => c.selected).length}
          </span>{" "}
          course(s)
          {courses.filter((c) => c.selected).length > 0 && (
            <span className="ml-2">
              ({withdrawalCredits} credit{withdrawalCredits !== 1 ? "s" : ""})
            </span>
          )}
        </div>
      </div>

      {/* Section 2: Student Commitment & Warning */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            2
          </div>
          <h2 className="text-gray-800">2. Student Commitment & Terms</h2>
        </div>

        {/* Commitment Panel - Warning Orange */}
        <div className="rounded-r-lg border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 p-6">
          <div className="flex gap-4">
            <AlertTriangle
              className="mt-1 flex-shrink-0 text-orange-500"
              size={24}
            />
            <div className="flex-1">
              <h3 className="mb-4 text-gray-800">Important Commitment</h3>

              <div className="mb-5 space-y-3">
                <div className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 font-bold text-orange-500">
                    •
                  </span>
                  <p>
                    I commit to maintaining the minimum required credits after
                    withdrawal. The university requires students to be enrolled
                    in at least{" "}
                    <strong>{minimumRequiredCredits} credits</strong> per
                    semester to maintain full-time student status.
                  </p>
                </div>
                <div className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 font-bold text-orange-500">
                    •
                  </span>
                  <p>
                    I agree to fulfill all tuition obligations, including fees
                    for withdrawn courses.
                    <strong>
                      {" "}
                      Withdrawal does not guarantee a tuition refund
                    </strong>
                    , and fees may still apply based on the withdrawal date.
                  </p>
                </div>
                <div className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 font-bold text-orange-500">
                    •
                  </span>
                  <p>
                    I understand that course withdrawal may affect my academic
                    progress, scholarship eligibility, and graduation timeline.
                    Students should consult with their academic advisor before
                    submitting this request.
                  </p>
                </div>
                <div className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 font-bold text-orange-500">
                    •
                  </span>
                  <p>
                    I acknowledge that withdrawn courses will appear on my
                    academic transcript with a &apos;W&apos; grade. Multiple
                    withdrawals may impact my academic standing.
                  </p>
                </div>
              </div>

              {/* Policy Link */}
              <div className="mb-5 border-b border-orange-200 pb-5">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1488db] hover:text-[#032b91]"
                >
                  <ExternalLink size={16} />
                  View Course Withdrawal Regulations & Policies
                </a>
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-start gap-3 rounded-lg border-2 border-orange-300 bg-white p-4">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor="terms-agreement"
                  className="cursor-pointer select-none text-sm text-gray-800"
                >
                  <strong>I have read and agree to all terms above.</strong> I
                  understand the consequences of course withdrawal and take full
                  responsibility for this decision.
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleConfirmWithdrawal}
            disabled={
              !agreedToTerms || courses.filter((c) => c.selected).length === 0
            }
            className={`flex items-center gap-2 rounded-lg px-6 py-3 transition-all duration-200 ${
              agreedToTerms && courses.filter((c) => c.selected).length > 0
                ? "cursor-pointer bg-[#032b91] text-white hover:bg-[#1488db]"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            <Check size={18} />
            Confirm Withdrawal Request
          </button>
          {!agreedToTerms && courses.filter((c) => c.selected).length > 0 && (
            <p className="mt-2 text-sm text-orange-600">
              ⚠️ Please read and agree to the terms before confirming
            </p>
          )}
        </div>
      </div>

      {/* Section 3: Withdrawal History */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            3
          </div>
          <h2 className="text-gray-800">3. Withdrawal History</h2>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">
              No withdrawal requests found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Request ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Course Details
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Credits
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Submission Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {record.requestId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {record.courseDetails}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {record.credits}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {record.submissionDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-3 py-1 text-sm ${getStatusBadge(record.status)}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {record.status === "Approved" && (
                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-green-600 transition-colors hover:bg-green-50"
                          title="Download Confirmation PDF"
                        >
                          <Download size={14} />
                          PDF
                        </button>
                      )}
                      {record.status === "Pending" && (
                        <span className="text-xs text-gray-500">
                          Processing...
                        </span>
                      )}
                      {record.status === "Rejected" && (
                        <span className="text-xs text-red-600">
                          Contact Office
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Safety Information Footer */}
      <div className="rounded-r-lg border-l-4 border-[#1488db] bg-blue-50 p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 flex-shrink-0 text-[#1488db]" size={20} />
          <div className="text-sm text-gray-700">
            <p>
              <strong>Need Help?</strong> If you have questions about course
              withdrawal, contact the Academic Affairs Office at{" "}
              <strong>daotao@hcmut.edu.vn</strong> or visit the office during
              working hours (Mon-Fri, 7:30-11:30 & 13:00-16:30).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
