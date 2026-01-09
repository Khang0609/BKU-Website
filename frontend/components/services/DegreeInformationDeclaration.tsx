import { useState, Fragment, useRef } from "react";
import {
  Info,
  Upload,
  X,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Printer,
  AlertCircle,
} from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import degreeExampleImage from "@/components/assets/bang_thpt.png";
import { ImageWithFallback } from "../ImageWithFallback";

interface DegreeRecord {
  id: number;
  recordId: string;
  content: string;
  status:
    | "Pending Verification"
    | "Under Review"
    | "Verified"
    | "Rejected - Re-upload required";
  submissionDate: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  preview?: string;
  type: string;
}

export function DegreeInformationDeclaration() {
  const [formData, setFormData] = useState({
    fullName: "TRAN NGUYEN KHANG",
    studentId: "2550299",
    dateOfBirth: "06/09/2007",
    placeOfBirth: "Ho Chi Minh City",
    identityDocument: "049207013849",
    email: "khang.tranngao9@hcmut.edu.vn",
    phoneNumber: "0938313117",
  });

  const [degreeData, setDegreeData] = useState({
    referenceNumber: "",
    registrationNumber: "",
    graduationDate: "",
    graduationYear: "",
  });

  const degreeTypes = [
    { id: 0, name: "-- Choose/select --" },
    { id: 1, name: "High School Graduation Certificate (Original)" },
    { id: 2, name: "High School Graduation Certificate (Certified Copy)" },
    { id: 3, name: "Equivalent Certificate (International)" },
  ];

  const issuingAuthorities = [
    { id: 0, name: "-- Choose/select --" },
    { id: 1, name: "Department of Education and Training of Ho Chi Minh City" },
    { id: 2, name: "Department of Education and Training of Hanoi" },
    { id: 3, name: "Department of Education and Training of Da Nang" },
    { id: 4, name: "Department of Education and Training of Binh Duong" },
    { id: 5, name: "Department of Education and Training of Dong Nai" },
  ];

  const [selectedDegreeType, setSelectedDegreeType] = useState(degreeTypes[0]);
  const [selectedAuthority, setSelectedAuthority] = useState(
    issuingAuthorities[0],
  );
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [records] = useState<DegreeRecord[]>([
    {
      id: 1,
      recordId: "DID2025120001",
      content: "High School Graduation Certificate Declaration",
      status: "Verified",
      submissionDate: "15/12/2025",
    },
    {
      id: 2,
      recordId: "DID2025090023",
      content: "High School Graduation Certificate Declaration",
      status: "Under Review",
      submissionDate: "10/09/2025",
    },
  ]);

  const handleDegreeDataChange = (field: string, value: string) => {
    setDegreeData({ ...degreeData, [field]: value });
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} exceeds 5MB limit`);
      return;
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert(`File ${file.name} is not a supported format (JPG, PNG, PDF only)`);
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
        setUploadedFile({
          ...newFile,
          preview: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedFile(newFile);
    }
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

  const removeFile = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDegreeType.id === 0 || selectedAuthority.id === 0) {
      alert("Please select degree type and issuing authority");
      return;
    }

    if (
      !degreeData.referenceNumber ||
      !degreeData.registrationNumber ||
      !degreeData.graduationDate ||
      !degreeData.graduationYear
    ) {
      alert("Please fill in all degree details");
      return;
    }

    if (!uploadedFile) {
      alert("Please upload a scanned copy of your degree");
      return;
    }

    alert("Degree information declaration submitted successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      "Pending Verification": "bg-yellow-100 text-yellow-800",
      "Under Review": "bg-blue-100 text-blue-800",
      Verified: "bg-green-100 text-green-800",
      "Rejected - Re-upload required": "bg-red-100 text-red-800",
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-gray-800">Degree Information Declaration</h1>
        <p className="text-sm text-gray-600">
          Submit official high school graduation certificate information for
          verification
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Information (Read-only) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              <Check size={18} />
            </div>
            <h2 className="text-gray-800">
              1. Personal Information Verification
            </h2>
          </div>

          {/* Verified Profile Grid */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
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
                value={formData.placeOfBirth}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                ID Card/Passport Number
              </label>
              <input
                type="text"
                value={formData.identityDocument}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phoneNumber}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="text"
              value={formData.email}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Section 2: High School Degree Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              2
            </div>
            <h2 className="text-gray-800">2. High School Degree Details</h2>
          </div>

          <div className="space-y-4">
            {/* Degree Type Dropdown */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">
                Degree Type <span className="text-red-500">*</span>
              </label>
              <Listbox
                value={selectedDegreeType}
                onChange={setSelectedDegreeType}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                    <span
                      className={`block truncate ${selectedDegreeType.id === 0 ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {selectedDegreeType.name}
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
                      {degreeTypes.map((type) => (
                        <Listbox.Option
                          key={type.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active
                                ? "bg-[#1488db] text-white"
                                : type.id === 0
                                  ? "text-gray-400"
                                  : "text-gray-800"
                            }`
                          }
                          value={type}
                          disabled={type.id === 0}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                              >
                                {type.name}
                              </span>
                              {selected && type.id !== 0 ? (
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

            {/* Degree Details Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Reference Number (Số hiệu){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={degreeData.referenceNumber}
                  onChange={(e) =>
                    handleDegreeDataChange("referenceNumber", e.target.value)
                  }
                  placeholder="Enter reference number"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Registration Number (Số vào sổ cấp bằng){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={degreeData.registrationNumber}
                  onChange={(e) =>
                    handleDegreeDataChange("registrationNumber", e.target.value)
                  }
                  placeholder="Enter registration number"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Graduation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={degreeData.graduationDate}
                  onChange={(e) =>
                    handleDegreeDataChange("graduationDate", e.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Graduation Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={degreeData.graduationYear}
                  onChange={(e) =>
                    handleDegreeDataChange("graduationYear", e.target.value)
                  }
                  placeholder="e.g., 2025"
                  required
                  min="1950"
                  max="2050"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>
            </div>

            {/* Issuing Authority Dropdown */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">
                Issued By <span className="text-red-500">*</span>
              </label>
              <Listbox
                value={selectedAuthority}
                onChange={setSelectedAuthority}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                    <span
                      className={`block truncate ${selectedAuthority.id === 0 ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {selectedAuthority.name}
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
                      {issuingAuthorities.map((authority) => (
                        <Listbox.Option
                          key={authority.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                              active
                                ? "bg-[#1488db] text-white"
                                : authority.id === 0
                                  ? "text-gray-400"
                                  : "text-gray-800"
                            }`
                          }
                          value={authority}
                          disabled={authority.id === 0}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                              >
                                {authority.name}
                              </span>
                              {selected && authority.id !== 0 ? (
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
        </div>

        {/* Section 3: Evidence Upload & Preview */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              3
            </div>
            <h2 className="text-gray-800">3. Upload Degree Certificate</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Side - Upload Zone */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Upload Scanned Document
              </h3>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-all ${
                  isDragging
                    ? "border-[#1488db] bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Upload className="text-[#1488db]" size={24} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-800">
                      Drag and drop your file here, or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="font-medium text-[#1488db] hover:text-[#032b91]"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-gray-500">
                      Supported: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* Uploaded File */}
              {uploadedFile && (
                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
                        <FileText className="text-[#1488db]" size={20} />
                      </div>
                      <div>
                        <p className="truncate text-sm text-gray-800">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Important Notice */}
              <div className="mt-4 flex gap-2 rounded-r-lg border-l-4 border-[#1488db] bg-blue-50 p-3">
                <Info
                  className="mt-0.5 flex-shrink-0 text-[#1488db]"
                  size={16}
                />
                <p className="text-xs text-gray-700">
                  <strong>Important:</strong> Please ensure the scan is clear,
                  uncropped, and shows all official stamps/signatures. Blurry or
                  incomplete scans will be rejected.
                </p>
              </div>
            </div>

            {/* Right Side - Live Preview */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Example Reference
              </h3>
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <p className="mb-3 text-xs text-gray-600">
                  Your scanned certificate should look similar to this example:
                </p>
                <div className="relative h-64 w-full rounded border border-gray-200 bg-white p-2">
                  <ImageWithFallback
                    src={uploadedFile?.preview || degreeExampleImage.src}
                    alt="Degree Certificate Example"
                    className="rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-2.5 text-gray-700 transition-all duration-200 hover:bg-gray-200"
          >
            <Printer size={18} />
            Print Declaration Form
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-[#032b91] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#1488db]"
          >
            <Check size={18} />
            Submit Declaration
          </button>
        </div>
      </form>

      {/* Section 4: Status Tracking */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            4
          </div>
          <h2 className="text-gray-800">
            4. Declaration History & Verification Status
          </h2>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">
              No declaration records found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Record ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Content
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Submission Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    Verification Status
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
                      {record.recordId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {record.content}
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
                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-[#1488db] transition-colors hover:bg-blue-50"
                        title="View Submitted File"
                      >
                        <Eye size={14} />
                        View File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
