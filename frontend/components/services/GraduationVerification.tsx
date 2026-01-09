import { useState } from "react";
import { CheckCircle, Upload, Info, AlertCircle, FileText } from "lucide-react";
import { ImageWithFallback } from "../ImageWithFallback";

interface PhotoRequirement {
  id: number;
  text: string;
  checked: boolean;
}

export function GraduationVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Personal Info (Read-only from system)
    fullName: "TRAN NGUYEN KHANG",
    studentId: "2550299",
    dateOfBirth: "06/09/2007",
    placeOfBirth: "Ho Chi Minh City",
    yearOfAdmission: "08/2025",
    degree: "Bachelor",
    form: "Regular",
    faculty: "Computer Science and Engineering",

    // Step 2: Contact Info & Addresses
    contactEmail: "",
    mobilePhone: "",
    currentAddress: "",
    postGraduationAddress: "",
  });

  const [photoRequirements] = useState<PhotoRequirement[]>([
    { id: 1, text: "Recent photo (taken within 6 months)", checked: false },
    { id: 2, text: "Dimensions ratio: Width × Height = 4 × 6", checked: false },
    { id: 3, text: "Face occupies at least 75% of photo area", checked: false },
    {
      id: 4,
      text: "Chin-to-top height: at least 2/3 of total height",
      checked: false,
    },
    {
      id: 5,
      text: "Front-facing, straight posture, no glasses",
      checked: false,
    },
    { id: 6, text: "Plain white or light background", checked: false },
  ]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedPhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFinalSubmit = () => {
    alert("Graduation verification information submitted successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-gray-800">Graduation Verification</h1>
        <p className="text-sm text-gray-600">
          Verify and submit your graduation information for diploma processing
        </p>
      </div>

      {/* Step Progress Indicator */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-1 items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                    currentStep === step
                      ? "bg-[#1488db] text-white"
                      : currentStep > step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step ? <CheckCircle size={20} /> : step}
                </div>
                <div className="hidden md:block">
                  <p
                    className={`text-sm ${currentStep >= step ? "text-gray-800" : "text-gray-500"}`}
                  >
                    {step === 1 && "Personal Info"}
                    {step === 2 && "Contact & Photo"}
                    {step === 3 && "Review & Submit"}
                  </p>
                </div>
              </div>
              {step < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded ${
                    currentStep > step ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Personal Information Verification */}
      {currentStep === 1 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              1
            </div>
            <h2 className="text-gray-800">Personal Information Verification</h2>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              <CheckCircle size={14} />
              Verified
            </span>
          </div>

          {/* Info Alert */}
          <div className="mb-6 flex gap-3 rounded-r-lg border-l-4 border-red-500 bg-red-50 p-4">
            <AlertCircle
              className="mt-0.5 flex-shrink-0 text-red-500"
              size={20}
            />
            <div className="text-sm text-gray-700">
              <p>
                <strong>Important:</strong> This information will be used for
                your graduation diploma and transcript. Please verify for
                accuracy and contact the Academic Affairs Office (ĐTNT) if any
                corrections are needed at{" "}
                <a
                  href="https://mybk.hcmut.edu.vn"
                  className="text-[#1488db] hover:underline"
                >
                  https://mybk.hcmut.edu.vn
                </a>
              </p>
            </div>
          </div>

          {/* Personal Information Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                Year of Admission
              </label>
              <input
                type="text"
                value={formData.yearOfAdmission}
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
                value={formData.form}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
              />
            </div>
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

          {/* Navigation Buttons */}
          <div className="flex justify-end">
            <button
              onClick={handleNextStep}
              className="rounded-lg bg-[#032b91] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#1488db]"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact Information & Photo Upload */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
                2
              </div>
              <h2 className="text-gray-800">Contact Information</h2>
            </div>

            <div className="space-y-4">
              {/* Contact Email */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Contact Email <span className="text-red-500">*</span>
                  <span className="ml-1 text-gray-500">
                    (Student email required for official notifications)
                  </span>
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  placeholder="your.email@hcmut.edu.vn"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Mobile Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobilePhone}
                  onChange={(e) => handleChange("mobilePhone", e.target.value)}
                  placeholder="Enter mobile phone number"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              {/* Current Address */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Current Residence Address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.currentAddress}
                  onChange={(e) =>
                    handleChange("currentAddress", e.target.value)
                  }
                  placeholder="House number, street, ward/district, city/province"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>

              {/* Post-Graduation Address */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Post-Graduation Contact Address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.postGraduationAddress}
                  onChange={(e) =>
                    handleChange("postGraduationAddress", e.target.value)
                  }
                  placeholder="House number, street, ward/district, city/province"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#1488db] focus:outline-none focus:ring-1 focus:ring-[#1488db]"
                />
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-6 flex gap-3 rounded-r-lg border-l-4 border-[#1488db] bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
              <Info className="mt-0.5 flex-shrink-0 text-[#1488db]" size={20} />
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Note:</strong> The Academic Affairs Office will notify
                  you via email when your graduation certificate is ready for
                  collection. Students can view their graduation schedule at{" "}
                  <a
                    href="https://mybk.hcmut.edu.vn"
                    className="text-[#1488db] hover:underline"
                  >
                    https://mybk.hcmut.edu.vn
                  </a>{" "}
                  → BKSI → Graduation Schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Upload className="text-[#1488db]" size={24} />
              <h2 className="text-gray-800">Yearbook Photo Upload</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Upload Zone */}
              <div className="lg:col-span-2">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative rounded-xl border-2 border-dashed p-8 transition-all ${
                    isDragging
                      ? "border-[#1488db] bg-blue-50"
                      : "border-gray-300 bg-gray-50 hover:border-[#1488db] hover:bg-blue-50"
                  }`}
                >
                  {uploadedPhoto ? (
                    <div className="flex flex-col items-center">
                      <ImageWithFallback
                        src={uploadedPhoto}
                        alt="Uploaded"
                        className="mb-4 h-64 w-48 rounded-lg border-2 border-gray-300 object-cover"
                      />
                      <button
                        onClick={() => setUploadedPhoto(null)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Photo
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                        <Upload size={32} className="text-gray-400" />
                      </div>
                      <p className="mb-2 text-gray-700">
                        Drag & drop your photo here
                      </p>
                      <p className="mb-4 text-sm text-gray-500">or</p>
                      <label className="cursor-pointer rounded-lg bg-[#032b91] px-4 py-2 text-white transition-all hover:bg-[#1488db]">
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-4 text-xs text-gray-500">
                        Supported formats: JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Requirements Checklist */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm text-gray-800">
                  <FileText size={16} className="text-[#1488db]" />
                  Photo Requirements
                </h3>
                <ul className="space-y-3">
                  {photoRequirements.map((req) => (
                    <li
                      key={req.id}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-[#1488db]"
                      />
                      <span>{req.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-xs text-gray-700">
                    <strong>Note:</strong> This photo will be used for your
                    yearbook and graduation records.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Previous Step
            </button>
            <button
              onClick={handleNextStep}
              className="rounded-lg bg-[#032b91] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#1488db]"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Final Submission */}
      {currentStep === 3 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1488db] text-white">
              3
            </div>
            <h2 className="text-gray-800">Review & Final Submission</h2>
          </div>

          {/* Review Summary */}
          <div className="space-y-6">
            {/* Personal Information Summary */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 text-gray-800">Personal Information</h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span className="text-gray-600">Full Name:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Student ID:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.studentId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Date of Birth:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.dateOfBirth}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Faculty:</span>
                  <span className="ml-2 text-gray-800">{formData.faculty}</span>
                </div>
              </div>
            </div>

            {/* Contact Information Summary */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 text-gray-800">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.contactEmail || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Mobile:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.mobilePhone || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Current Address:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.currentAddress || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">
                    Post-Graduation Address:
                  </span>
                  <span className="ml-2 text-gray-800">
                    {formData.postGraduationAddress || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Status */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 text-gray-800">Yearbook Photo</h3>
              {uploadedPhoto ? (
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={uploadedPhoto}
                    alt="Preview"
                    className="h-20 w-16 rounded border border-gray-300 object-cover"
                  />
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle size={16} />
                    Photo uploaded successfully
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-1 text-sm text-orange-600">
                  <AlertCircle size={16} />
                  No photo uploaded
                </span>
              )}
            </div>

            {/* Graduation Period Info */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
              <h3 className="mb-3 text-gray-800">Graduation Period</h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div>
                  <p className="mb-1 text-gray-600">Graduation Period</p>
                  <p className="text-gray-800">
                    Academic Year 1 - 2025-2026 (20251)
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-gray-600">Period Code</p>
                  <p className="text-gray-800">TN.20242.2</p>
                </div>
                <div>
                  <p className="mb-1 text-gray-600">Registration Window</p>
                  <p className="text-orange-600">
                    23/04/2025 08:00 - 31/12/2025 16:00
                  </p>
                </div>
              </div>
            </div>

            {/* Final Confirmation */}
            <div className="flex items-start gap-3 rounded-r-lg border-l-4 border-green-500 bg-green-50 p-4">
              <CheckCircle
                className="mt-0.5 flex-shrink-0 text-green-500"
                size={20}
              />
              <div className="text-sm text-gray-700">
                <p>
                  Please review all information carefully before submitting.
                  Once submitted, changes can only be made by contacting the
                  Academic Affairs Office directly.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Previous Step
            </button>
            <button
              onClick={handleFinalSubmit}
              className="rounded-lg bg-[#032b91] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#1488db]"
            >
              Confirm & Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
