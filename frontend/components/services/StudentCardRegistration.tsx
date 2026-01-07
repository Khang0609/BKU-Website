import { useState, Fragment } from "react";
import { Info, ChevronDown, Check } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";

interface Request {
  id: number;
  requestId: string;
  content: string;
  status: string;
  registrationDate: string;
}

export function StudentCardRegistration() {
  const [formData, setFormData] = useState({
    studentName: "TRAN NGUYEN KHANG",
    studentId: "2550299",
    dateOfBirth: "06/09/2007",
    birthPlace: "Ho Chi Minh City",
    degree: "Bachelor",
    studyForm: "Regular",
    faculty: "Computer Science and Engineering",
  });

  const registrationPeriods = [
    { id: 1, name: "Student Card - Academic Year 1 Semester 2025-2026" },
    { id: 2, name: "Student Card - Academic Year 2 Semester 2024-2025" },
  ];

  const pickupLocations = [
    { id: 0, name: "-- Choose/select --" },
    { id: 1, name: "Academic Affairs Office - Main Campus" },
    { id: 2, name: "Academic Affairs Office - District 1 Campus" },
    { id: 3, name: "Postal Delivery Service" },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(registrationPeriods[0]);
  const [selectedLocation, setSelectedLocation] = useState(pickupLocations[0]);

  const [pendingPayment] = useState<Request[]>([]);
  const [pendingProcessing] = useState<Request[]>([]);
  const [receivedResults] = useState<Request[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedLocation.id === 0) {
      alert("Please select a pickup location");
      return;
    }

    alert("Student card registration submitted successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-gray-800">Student Card Registration</h1>
        <p className="text-sm text-gray-600">
          Register for your student ID card and select delivery method
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Information Verification */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              <Check size={18} />
            </div>
            <h2 className="text-gray-800">
              1. Personal Information Verification
            </h2>
          </div>

          {/* Personal Information Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={formData.studentName}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Student ID
              </label>
              <input
                type="text"
                value={formData.studentId}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Date of Birth
              </label>
              <input
                type="text"
                value={formData.dateOfBirth}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Place of Birth
              </label>
              <input
                type="text"
                value={formData.birthPlace}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Usual Residence
              </label>
              <input
                type="text"
                value="Binh Tan District, Ho Chi Minh City"
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Degree Program
              </label>
              <input
                type="text"
                value={formData.degree}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Study Form
              </label>
              <input
                type="text"
                value={formData.studyForm}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
          </div>

          <div className="mt-4">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Faculty / Major
              </label>
              <input
                type="text"
                value={formData.faculty}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
          </div>

          {/* Info Alert Banner - Cyan */}
          <div className="mt-6 flex gap-3 rounded-lg bg-cyan-500 p-4">
            <div className="space-y-1 text-sm text-white">
              <p>
                • This information will be used for your ID card. If any
                information is incorrect, please contact us at{" "}
                <strong>here</strong>.
              </p>
              <p>
                • Students following the request, please check the status in{" "}
                <strong>&quot;Self-Service Registration&quot;</strong> before
                registering for a new card.
              </p>
              <p>
                • If during the &quot;Trial Period&quot;, students should
                contact the Office (Main Office/Faculty/Department) or CSI.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Registration Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              2
            </div>
            <h2 className="text-gray-800">2. Enter Registration Information</h2>
          </div>

          <div className="space-y-4">
            {/* Registration Period Dropdown */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">
                Registration Period <span className="text-red-500">*</span>
              </label>
              <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm text-gray-800 transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                    <span className="block truncate">
                      {selectedPeriod.name}
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
                      {registrationPeriods.map((period) => (
                        <Listbox.Option
                          key={period.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active
                                ? "bg-[#1488db] text-white"
                                : "text-gray-800"
                            }`
                          }
                          value={period}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                              >
                                {period.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-[#1488db]"
                                  }`}
                                >
                                  <Check
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
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

            {/* Pickup Location Dropdown */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <Listbox value={selectedLocation} onChange={setSelectedLocation}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                    <span
                      className={`block truncate ${selectedLocation.id === 0 ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {selectedLocation.name}
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
                      {pickupLocations.map((location) => (
                        <Listbox.Option
                          key={location.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active
                                ? "bg-[#1488db] text-white"
                                : location.id === 0
                                  ? "text-gray-400"
                                  : "text-gray-800"
                            }`
                          }
                          value={location}
                          disabled={location.id === 0}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                              >
                                {location.name}
                              </span>
                              {selected && location.id !== 0 ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-[#1488db]"
                                  }`}
                                >
                                  <Check
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
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
          </div>

          {/* Service Alert Banner - Blue/Yellow Gradient */}
          <div className="mt-6 flex gap-3 rounded-r-lg border-l-4 border-[#1488db] bg-gradient-to-r from-blue-50 to-yellow-50 p-4">
            <Info className="mt-0.5 flex-shrink-0 text-[#1488db]" size={20} />
            <div className="text-sm text-gray-700">
              <p>
                <strong>Postal delivery service is available.</strong> View
                shipping rates{" "}
                <a
                  href="https://mybk.hcmut.edu.vn"
                  className="font-medium text-[#1488db] hover:underline"
                >
                  here
                </a>
                . Please ensure your shipping information is accurate,{" "}
                <strong>
                  students must enter accurate shipping information.
                </strong>
              </p>
            </div>
          </div>

          {/* Red Alert Banner */}
          <div className="mt-4 rounded-lg bg-red-500 p-4">
            <div className="space-y-1 text-sm text-white">
              <p>
                • After successful registration, students can make payment via
                &quot;e-payment&quot; at <strong>BKPay</strong> for printing.
              </p>
              <p>
                • After payment, the card will be available within 3-5 business
                days.
              </p>
              <p>
                • Students must receive the{" "}
                <strong>&quot;Student Card&quot;</strong> after the card is
                printed within 30 days, overdue cards will be discarded.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="rounded-lg bg-[#1488db] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#032b91]"
            >
              Confirm Registration
            </button>
          </div>
        </div>

        {/* Section 3: Pending Payment Requests */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
              3
            </div>
            <h2 className="text-gray-800">3. Pending Payment Requests</h2>
          </div>

          {pendingPayment.length === 0 ? (
            <p className="py-4 text-sm text-gray-600">
              No pending payment requests currently
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Request ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Content
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Registration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      No pending payment requests currently
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 4: Pending Processing Requests */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
              4
            </div>
            <h2 className="text-gray-800">4. Pending Processing Requests</h2>
          </div>

          {pendingProcessing.length === 0 ? (
            <p className="py-4 text-sm text-gray-600">
              No pending processing requests currently
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Request ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Content
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Registration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      No pending processing requests currently
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 5: Received Results */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
              5
            </div>
            <h2 className="text-gray-800">5. Received Registration Results</h2>
          </div>

          {receivedResults.length === 0 ? (
            <p className="py-4 text-sm text-gray-600">
              No received results currently
            </p>
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
                      Content
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">
                      Result Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      No received results currently
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
