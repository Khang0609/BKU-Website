import { useState, Fragment } from 'react';
import { Info, Check, ChevronDown, FileCheck, Download } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';

interface ConfirmationRequest {
  id: number;
  requestId: string;
  purpose: string;
  submissionDate: string;
  pickupLocation: string;
  status: 'Pending' | 'Verified' | 'Ready for Pickup' | 'Rejected';
}

export function StudentConfirmation() {
  const [formData, setFormData] = useState({
    fullName: 'TRAN NGUYEN KHANG',
    studentId: '2550299',
    dateOfBirth: '06/09/2007',
    placeOfBirth: 'Ho Chi Minh City',
    major: 'Computer Science and Engineering',
    identityDocument: '049207013849',
    identityIssueDate: '24/12/2024',
    identityIssuePlace: 'Ministry of Public Security',
    permanentAddress: 'Binh Tan District, Ho Chi Minh City',
  });

  const registrationSessions = [
    { id: 0, name: '-- Select Registration Session --' },
    { id: 1, name: 'Student Confirmation - Fall Semester 2025-2026' },
    { id: 2, name: 'Student Confirmation - Spring Semester 2025-2026' },
    { id: 3, name: 'Student Confirmation - Summer Semester 2025' },
  ];

  const purposeOptions = [
    { id: 0, name: '-- Choose/Select --' },
    { id: 1, name: 'Bank Loan' },
    { id: 2, name: 'Military Service Deferment' },
    { id: 3, name: 'Social Insurance' },
    { id: 4, name: 'Visa Application' },
    { id: 5, name: 'Scholarship Application' },
    { id: 6, name: 'Other' },
  ];

  const pickupLocations = [
    { id: 0, name: '-- Choose/Select --' },
    { id: 1, name: 'Campus 1 (Ly Thuong Kiet, District 10)' },
    { id: 2, name: 'Campus 2 (Di An, Binh Duong Province)' },
  ];

  const [selectedSession, setSelectedSession] = useState(registrationSessions[0]);
  const [selectedPurpose, setSelectedPurpose] = useState(purposeOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState(pickupLocations[0]);

  const [requests] = useState<ConfirmationRequest[]>([
    {
      id: 1,
      requestId: 'SC2025120001',
      purpose: 'Bank Loan',
      submissionDate: '20/12/2025',
      pickupLocation: 'Campus 1 (Ly Thuong Kiet)',
      status: 'Ready for Pickup',
    },
    {
      id: 2,
      requestId: 'SC2025110045',
      purpose: 'Military Service Deferment',
      submissionDate: '15/11/2025',
      pickupLocation: 'Campus 2 (Di An)',
      status: 'Verified',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSession.id === 0 || selectedPurpose.id === 0 || selectedLocation.id === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    alert('Student confirmation registration submitted successfully!');
  };

  const handleReset = () => {
    setSelectedSession(registrationSessions[0]);
    setSelectedPurpose(purposeOptions[0]);
    setSelectedLocation(pickupLocations[0]);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Verified': 'bg-blue-100 text-blue-800',
      'Ready for Pickup': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-gray-800 mb-2">Student Confirmation Registration</h1>
        <p className="text-sm text-gray-600">
          Request official student status confirmation documents
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Information Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
              <Check size={18} />
            </div>
            <h2 className="text-gray-800">1. Personal Information Verification</h2>
          </div>

          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Student ID</label>
              <input
                type="text"
                value={formData.studentId}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Date of Birth</label>
              <input
                type="text"
                value={formData.dateOfBirth}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Place of Birth</label>
              <input
                type="text"
                value={formData.placeOfBirth}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="text-sm text-gray-600 mb-1 block">Major</label>
              <input
                type="text"
                value={formData.major}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
          </div>

          {/* Identity Document & Address Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">ID Card/Passport Number</label>
              <input
                type="text"
                value={formData.identityDocument}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Issue Date</label>
              <input
                type="text"
                value={formData.identityIssueDate}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Issued By</label>
              <input
                type="text"
                value={formData.identityIssuePlace}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-1 block">Permanent Address</label>
            <input
              type="text"
              value={formData.permanentAddress}
              disabled
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
            />
          </div>

          {/* Professional Info Banner - Blue */}
          <div className="flex gap-3 p-4 bg-blue-50 border-l-4 border-[#1488db] rounded-r-lg">
            <Info className="text-[#1488db] flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-gray-700">
              <p>
                <strong>Information Notice:</strong> This information is used for official certification purposes. 
                If you need to update any information, please submit a request{' '}
                <a href="#" className="text-[#1488db] hover:underline font-medium">
                  here
                </a>
                . Changes will be reviewed by the Academic Affairs Office within 2-3 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Registration Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
              2
            </div>
            <h2 className="text-gray-800">2. Enter Registration Information</h2>
          </div>

          <div className="space-y-5">
            {/* Registration Session Dropdown */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Registration Session <span className="text-red-500">*</span>
              </label>
              <Listbox value={selectedSession} onChange={setSelectedSession}>
                <div className="relative">
                  <Listbox.Button className="relative w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db] hover:border-gray-400 transition-all cursor-pointer">
                    <span className={`block truncate ${selectedSession.id === 0 ? 'text-gray-400' : 'text-gray-800'}`}>
                      {selectedSession.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                      {registrationSessions.map((session) => (
                        <Listbox.Option
                          key={session.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active ? 'bg-[#1488db] text-white' : session.id === 0 ? 'text-gray-400' : 'text-gray-800'
                            }`
                          }
                          value={session}
                          disabled={session.id === 0}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {session.name}
                              </span>
                              {selected && session.id !== 0 ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-[#1488db]'
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

            {/* Purpose of Confirmation Dropdown */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Purpose of Confirmation <span className="text-red-500">*</span>
              </label>
              <Listbox value={selectedPurpose} onChange={setSelectedPurpose}>
                <div className="relative">
                  <Listbox.Button className="relative w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db] hover:border-gray-400 transition-all cursor-pointer">
                    <span className={`block truncate ${selectedPurpose.id === 0 ? 'text-gray-400' : 'text-gray-800'}`}>
                      {selectedPurpose.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                      {purposeOptions.map((purpose) => (
                        <Listbox.Option
                          key={purpose.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active ? 'bg-[#1488db] text-white' : purpose.id === 0 ? 'text-gray-400' : 'text-gray-800'
                            }`
                          }
                          value={purpose}
                          disabled={purpose.id === 0}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {purpose.name}
                              </span>
                              {selected && purpose.id !== 0 ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-[#1488db]'
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

            {/* Pickup Location Dropdown */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <Listbox value={selectedLocation} onChange={setSelectedLocation}>
                <div className="relative">
                  <Listbox.Button className="relative w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db] hover:border-gray-400 transition-all cursor-pointer">
                    <span className={`block truncate ${selectedLocation.id === 0 ? 'text-gray-400' : 'text-gray-800'}`}>
                      {selectedLocation.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                      {pickupLocations.map((location) => (
                        <Listbox.Option
                          key={location.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active ? 'bg-[#1488db] text-white' : location.id === 0 ? 'text-gray-400' : 'text-gray-800'
                            }`
                          }
                          value={location}
                          disabled={location.id === 0}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {location.name}
                              </span>
                              {selected && location.id !== 0 ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-[#1488db]'
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
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#032b91] hover:bg-[#1488db] text-white rounded-lg transition-all duration-200"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Section 3: Tracking & History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
              3
            </div>
            <h2 className="text-gray-800">3. Request History & Status Tracking</h2>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No confirmation requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">#</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Request ID</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Type / Purpose</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Submission Date</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Pickup Location</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{request.requestId}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{request.purpose}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{request.submissionDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{request.pickupLocation}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded text-sm ${getStatusBadge(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1488db] hover:bg-blue-50 rounded transition-colors"
                            title="View Digital Version"
                          >
                            <FileCheck size={14} />
                            View
                          </button>
                          {request.status === 'Ready for Pickup' && (
                            <button
                              type="button"
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Download Instructions"
                            >
                              <Download size={14} />
                              Guide
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
