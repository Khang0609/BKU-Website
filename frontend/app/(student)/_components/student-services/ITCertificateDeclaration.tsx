import { useState, Fragment, useRef } from "react";
import {
  Info,
  Upload,
  X,
  Check,
  ChevronDown,
  Eye,
  FileText,
  HelpCircle,
  BookOpen,
  Download,
} from "lucide-react";
import { Listbox, Transition, Combobox, Dialog } from "@headlessui/react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  preview?: string;
  type: string;
}

interface CertificateRecord {
  id: number;
  certificateType: string;
  idNumber: string;
  submissionDate: string;
  status: "Pending" | "Processing" | "Verified" | "Rejected";
}

interface Skill {
  id: number;
  name: string;
}

export function ITCertificateDeclaration() {
  const [formData] = useState({
    fullName: "TRAN NGUYEN KHANG",
    studentId: "2550299",
    dateOfBirth: "06/09/2007",
    placeOfBirth: "Ho Chi Minh City",
    identityDocument: "049207013849",
    email: "khang.tranngao9@hcmut.edu.vn",
    phoneNumber: "0938313117",
  });

  const [certificateData, setCertificateData] = useState({
    candidateId: "",
    referenceNumber: "",
    issueDate: "",
  });

  const certificateTypes = [
    { id: 0, name: "-- Choose/select --" },
    { id: 1, name: "MOS - Microsoft Office Specialist" },
    { id: 2, name: "IC3 - Internet and Computing Core Certification" },
    { id: 3, name: "IT Fundamental Certificate" },
    { id: 4, name: "CompTIA A+ Certification" },
    { id: 5, name: "CISCO CCNA" },
    { id: 6, name: "Oracle Java SE Certification" },
    { id: 7, name: "Google IT Support Professional Certificate" },
  ];

  const levelOptions = [
    { id: 0, name: "-- Choose/select --" },
    { id: 1, name: "Specialist" },
    { id: 2, name: "Expert" },
    { id: 3, name: "Master" },
  ];

  const availableSkills: Skill[] = [
    { id: 1, name: "Microsoft Word" },
    { id: 2, name: "Microsoft Excel" },
    { id: 3, name: "Microsoft PowerPoint" },
    { id: 4, name: "Microsoft Access" },
    { id: 5, name: "Microsoft Outlook" },
    { id: 6, name: "Networking Fundamentals" },
    { id: 7, name: "Hardware Troubleshooting" },
    { id: 8, name: "Software Installation" },
    { id: 9, name: "Database Management" },
    { id: 10, name: "Web Development" },
    { id: 11, name: "Programming" },
    { id: 12, name: "Cloud Computing" },
  ];

  const [selectedCertificateType, setSelectedCertificateType] = useState(
    certificateTypes[0],
  );
  const [selectedLevel, setSelectedLevel] = useState(levelOptions[0]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [skillQuery, setSkillQuery] = useState("");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [records] = useState<CertificateRecord[]>([
    {
      id: 1,
      certificateType: "MOS - Microsoft Office Specialist",
      idNumber: "MOS-2024-001234",
      submissionDate: "15/12/2025",
      status: "Verified",
    },
    {
      id: 2,
      certificateType: "IC3 - Internet and Computing Core Certification",
      idNumber: "IC3-2024-005678",
      submissionDate: "20/11/2025",
      status: "Processing",
    },
    {
      id: 3,
      certificateType: "IT Fundamental Certificate",
      idNumber: "ITF-2024-009876",
      submissionDate: "05/10/2025",
      status: "Pending",
    },
  ]);

  const filteredSkills =
    skillQuery === ""
      ? availableSkills
      : availableSkills.filter((skill) =>
          skill.name.toLowerCase().includes(skillQuery.toLowerCase()),
        );

  const handleCertificateDataChange = (field: string, value: string) => {
    setCertificateData({ ...certificateData, [field]: value });
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} exceeds 5MB limit`);
      return;
    }

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

  const removeSkill = (skillId: number) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skillId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCertificateType.id === 0 || selectedLevel.id === 0) {
      alert("Please select certificate type and level");
      return;
    }

    if (
      !certificateData.candidateId ||
      !certificateData.referenceNumber ||
      !certificateData.issueDate
    ) {
      alert("Please fill in all certificate details");
      return;
    }

    if (selectedSkills.length === 0) {
      alert("Please select at least one skill achieved");
      return;
    }

    if (!uploadedFile) {
      alert("Please upload your certificate document");
      return;
    }

    alert("IT Certificate declaration submitted successfully!");
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Verified: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-gray-800">IT Certificate Declaration</h1>
        <p className="text-sm text-gray-600">
          Submit official IT certification information for academic credit
          recognition
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

        {/* Section 2: Certificate Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              2
            </div>
            <h2 className="text-gray-800">2. IT Certificate Details</h2>
          </div>

          <div className="space-y-4">
            {/* Certificate Type - Searchable Dropdown */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">
                Certificate Type <span className="text-red-500">*</span>
              </label>
              <Listbox
                value={selectedCertificateType}
                onChange={setSelectedCertificateType}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                    <span
                      className={`block truncate ${selectedCertificateType.id === 0 ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {selectedCertificateType.name}
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
                      {certificateTypes.map((type) => (
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

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Candidate ID / ID Used for Test{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={certificateData.candidateId}
                  onChange={(e) =>
                    handleCertificateDataChange("candidateId", e.target.value)
                  }
                  placeholder="Enter candidate ID"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-gray-700">
                  Reference Number (Số hiệu){" "}
                  <span className="text-red-500">*</span>
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="text-[#1488db] transition-colors hover:text-[#032b91]"
                    title="Help"
                  >
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="text"
                  value={certificateData.referenceNumber}
                  onChange={(e) =>
                    handleCertificateDataChange(
                      "referenceNumber",
                      e.target.value,
                    )
                  }
                  placeholder="Enter reference number"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={certificateData.issueDate}
                  onChange={(e) =>
                    handleCertificateDataChange("issueDate", e.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-all focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Level / Badge <span className="text-red-500">*</span>
                </label>
                <Listbox value={selectedLevel} onChange={setSelectedLevel}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]">
                      <span
                        className={`block truncate ${selectedLevel.id === 0 ? "text-gray-400" : "text-gray-800"}`}
                      >
                        {selectedLevel.name}
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
                        {levelOptions.map((level) => (
                          <Listbox.Option
                            key={level.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                                active
                                  ? "bg-[#1488db] text-white"
                                  : level.id === 0
                                    ? "text-gray-400"
                                    : "text-gray-800"
                              }`
                            }
                            value={level}
                            disabled={level.id === 0}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                >
                                  {level.name}
                                </span>
                                {selected && level.id !== 0 ? (
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

            {/* Skills Achieved - Multi-select with Combobox */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">
                Skills Achieved <span className="text-red-500">*</span>
              </label>
              <Combobox
                value={selectedSkills}
                onChange={setSelectedSkills}
                multiple
              >
                <div className="relative">
                  <div className="w-full rounded-lg border border-gray-300 bg-white transition-all focus-within:border-[#1488db] focus-within:ring-1 focus-within:ring-[#1488db]">
                    {/* Selected Skills Tags */}
                    <div className="flex min-h-[42px] flex-wrap gap-2 px-3 py-2">
                      {selectedSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center gap-1.5 rounded bg-[#1488db] px-3 py-1 text-sm text-white"
                        >
                          {skill.name}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSkill(skill.id);
                            }}
                            className="rounded-full p-0.5 hover:bg-white/20"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      <Combobox.Input
                        className="min-w-[120px] flex-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        placeholder={
                          selectedSkills.length === 0
                            ? "Search and select skills..."
                            : ""
                        }
                        onChange={(event) => setSkillQuery(event.target.value)}
                        displayValue={() => ""}
                      />
                    </div>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setSkillQuery("")}
                  >
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {filteredSkills.length === 0 && skillQuery !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                          No skills found.
                        </div>
                      ) : (
                        filteredSkills.map((skill) => (
                          <Combobox.Option
                            key={skill.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                                active
                                  ? "bg-[#1488db] text-white"
                                  : "text-gray-800"
                              }`
                            }
                            value={skill}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                >
                                  {skill.name}
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
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              <p className="mt-1.5 text-xs text-gray-500">
                Click or search to add multiple skills. {selectedSkills.length}{" "}
                skill{selectedSkills.length !== 1 ? "s" : ""} selected.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Evidence Management */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              3
            </div>
            <h2 className="text-gray-800">3. Upload Certificate Document</h2>
          </div>

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
                <Upload className="text-[#1488db]" size={32} />
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-800">
                  Drag and drop your certificate file here, or{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-medium text-[#1488db] hover:text-[#032b91]"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, PDF (Maximum size: 5MB)
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
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-100">
                    <FileText className="text-[#1488db]" size={24} />
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
            <Info className="mt-0.5 flex-shrink-0 text-[#1488db]" size={16} />
            <p className="text-xs text-gray-700">
              <strong>Important:</strong> Please upload a clear, high-quality
              scan or digital copy of your IT certificate. The document must
              show the certificate holder&apos;s name, issue date, reference
              number, and official seal/signature.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => window.open("#", "_blank")}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-2.5 text-gray-700 transition-all duration-200 hover:bg-gray-200"
          >
            <BookOpen size={18} />
            View Guide
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

      {/* Section 4: IT Certificate Status Dashboard */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
            4
          </div>
          <h2 className="text-gray-800">4. IT Certificate Status Dashboard</h2>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">
              No certificate declarations found
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
                    Certificate Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-700">
                    ID Number
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
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {record.certificateType}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {record.idNumber}
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
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-[#1488db] transition-colors hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        {record.status === "Verified" && (
                          <button
                            type="button"
                            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-green-600 transition-colors hover:bg-green-50"
                            title="Download Certificate"
                          >
                            <Download size={14} />
                            PDF
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

      {/* Help Modal */}
      <Transition appear show={showHelpModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowHelpModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="mb-4 flex items-center gap-2 text-gray-800">
                    <HelpCircle className="text-[#1488db]" size={24} />
                    How to Find Your Reference Number?
                  </Dialog.Title>
                  <div className="mt-2 space-y-3 text-sm text-gray-700">
                    <p>
                      The <strong>Reference Number (Số hiệu)</strong> is a
                      unique identifier printed on your IT certificate.
                      Here&apos;s how to locate it:
                    </p>
                    <ul className="ml-2 list-inside list-disc space-y-2">
                      <li>
                        <strong>MOS Certificates:</strong> Look for a code
                        starting with &quot;MOS-&quot; followed by numbers,
                        usually located in the top-right corner or bottom of the
                        certificate.
                      </li>
                      <li>
                        <strong>IC3 Certificates:</strong> The reference number
                        appears as &quot;IC3-&quot; followed by your test year
                        and unique digits, typically near the seal.
                      </li>
                      <li>
                        <strong>Other Certificates:</strong> Check the bottom
                        section or back side of your certificate for a serial
                        number or document ID.
                      </li>
                    </ul>
                    <p className="rounded bg-blue-50 p-3 text-xs text-gray-600">
                      💡 <strong>Tip:</strong> If you cannot locate the
                      reference number, contact the issuing organization or
                      check your digital certificate email confirmation.
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full rounded-lg bg-[#1488db] px-4 py-2 text-white transition-colors hover:bg-[#032b91]"
                      onClick={() => setShowHelpModal(false)}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
