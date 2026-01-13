import { useState, Fragment } from 'react';
import { Info, AlertCircle, Download, Eye, ChevronDown, Check, Calendar, DollarSign } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';

interface Registration {
  id: number;
  registrationId: string;
  content: string;
  status: string;
  registrationDate: string;
  resultDate?: string;
}

export function EnglishTestRegistration() {
  const [formData, setFormData] = useState({
    fullName: 'TRAN NGUYEN KHANG',
    studentId: '2550299',
    dateOfBirth: '06/09/2007',
    placeOfBirth: 'Ho Chi Minh City',
    identityDocument: '',
    email: '',
    phoneNumber: '',
  });

  const registrationSessions = [
    { id: 0, name: '-- Select Registration Session --' },
    { id: 1, name: 'English Proficiency Test - May 2026 Session', date: '15/05/2026', period: '01/04/2026 - 30/04/2026' },
    { id: 2, name: 'English Proficiency Test - August 2026 Session', date: '20/08/2026', period: '01/07/2026 - 31/07/2026' },
  ];

  const [selectedSession, setSelectedSession] = useState(registrationSessions[0]);
  const [activeTab, setActiveTab] = useState<'pending' | 'processing' | 'published'>('pending');

  const [pendingPayment] = useState<Registration[]>([]);
  const [processing] = useState<Registration[]>([]);
  const [published] = useState<Registration[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSession.id === 0) {
      alert('Please select a registration session');
      return;
    }
    
    if (!formData.identityDocument || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields: Identity Document, Email, and Phone Number');
      return;
    }
    
    alert('English test registration submitted successfully!');
  };

  const tabs = [
    { id: 'pending', label: 'Pending Payment', count: pendingPayment.length },
    { id: 'processing', label: 'Processing', count: processing.length },
    { id: 'published', label: 'Result Published', count: published.length },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'pending':
        return pendingPayment;
      case 'processing':
        return processing;
      case 'published':
        return published;
      default:
        return [];
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-gray-800 mb-2">English Proficiency Test Registration</h1>
        <p className="text-sm text-gray-600">
          Register for official English proficiency testing
        </p>
      </div>

      {/* Info Card - Test Provider */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#1488db] rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-gray-800 mb-1">Official Testing Provider</h3>
            <p className="text-sm text-gray-700">
              Testing is officially organized by <strong>IIG Vietnam</strong> (International Institute of Governance).
              All test results are internationally recognized and valid for graduation requirements.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Registration Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
              1
            </div>
            <h2 className="text-gray-800">Registration Details</h2>
          </div>

          {/* Session Selection Dropdown */}
          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-2 block">
              Select Test Session <span className="text-red-500">*</span>
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

          {/* Data Card - Session Info */}
          {selectedSession.id !== 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-[#1488db]" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Registration Period</p>
                  <p className="text-sm text-gray-800">{selectedSession.period}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Exam Date</p>
                  <p className="text-sm text-gray-800">{selectedSession.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Test Fee</p>
                  <p className="text-sm text-gray-800">500,000 VND</p>
                </div>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mt-4 flex gap-3 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
            <AlertCircle className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-gray-700">
              <p>
                <strong>Important:</strong> Registration will not be found if the session is closed. Please ensure you register within the specified registration period.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Information Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
              2
            </div>
            <h2 className="text-gray-800">Personal Information Verification</h2>
          </div>

          {/* Basic Info Grid - Read Only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
          </div>

          {/* Identity Document & Contact Info - Required Fields */}
          <div className="space-y-4 p-5 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm text-gray-800 mb-3">Contact & Identity Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm text-gray-700 mb-2 block">
                  Identity Document Number (ID Card/Passport) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.identityDocument}
                  onChange={(e) => handleChange('identityDocument', e.target.value)}
                  placeholder="Enter your ID card or passport number"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db] transition-all bg-white"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db] transition-all bg-white"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-2 block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1488db] focus:ring-1 focus:ring-[#1488db] transition-all bg-white"
                />
              </div>
            </div>
          </div>

          {/* Soft Red Alert Banner */}
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Important Notice:</strong> All information will be sent directly to <strong>IIG Vietnam</strong> for test registration. Please ensure all details are accurate.
                </p>
                <p>
                  Discrepancies between registered information and identity documents may result in <strong>exam disqualification</strong>. Students must update accurate information before submitting their registration.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#032b91] hover:bg-[#1488db] text-white rounded-lg transition-all duration-200"
            >
              Confirm Registration
            </button>
          </div>
        </div>

        {/* Section 3: Status Tracking with Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1488db] text-white flex items-center justify-center">
              3
            </div>
            <h2 className="text-gray-800">Registration Status Tracking</h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 text-sm transition-all relative ${
                  activeTab === tab.id
                    ? 'text-[#1488db] font-medium'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1488db]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="overflow-x-auto">
            {getCurrentData().length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No registration records found in this category</p>
              </div>
            ) : (
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">#</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Registration ID</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Content</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Registration Date</th>
                    {activeTab === 'published' && (
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Result Date</th>
                    )}
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentData().map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.registrationId}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.content}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.registrationDate}</td>
                      {activeTab === 'published' && (
                        <td className="px-4 py-3 text-sm text-gray-600">{item.resultDate || '—'}</td>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="p-2 text-[#1488db] hover:bg-blue-50 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Download Receipt"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
