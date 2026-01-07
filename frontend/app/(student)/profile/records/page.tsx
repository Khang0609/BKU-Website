"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Building,
  BookOpen,
  GraduationCap,
  ChevronDown,
  AlertCircle,
  Mail,
  MapPin,
  Shield,
  Briefcase,
  FileText,
  Save,
  Users,
  Clock,
  Home,
  Flag,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authFetch } from "@/lib/authFetch";

// --- Types ---
interface StudentProfile {
  personal: {
    first_name: string;
    last_name: string;
    dob: string;
    gender: string;
    national_id: string;
    id_issue_date?: string;
    id_issue_place?: string;
    nationality?: string;
    birthplace?: string;
    religion?: string;
    ethnic?: string;
    priority_area?: string;
    priority_group?: string;
    social_insurance?: string;
  };
  contact: {
    email: string;
    personal_email: string;
    phone: string;
    family_phone?: string;
    address_permanent: string;
    address_current: string;
    dormitory_room?: string;
    secondary_email?: string;
  };
  academic: {
    student_id: string;
    faculty: string;
    major: string;
    class_code: string;
    enrollment_year: number;
    status: string;
    education_level?: string;
    training_system?: string;
  };
  family?: {
    parents?: {
      father_name?: string;
      father_birthday?: string;
      father_phone?: string;
      father_job?: string;
      father_workplace?: string;
      mother_name?: string;
      mother_birthday?: string;
      mother_phone?: string;
      mother_job?: string;
      mother_workplace?: string;
    };
    guardian?: {
      full_name?: string;
      relationship?: string;
      phone_number?: string;
      email?: string;
      address?: string;
      job?: string;
    };
  };
  graduation?: {
    grad_major?: string;
    grad_year_semester?: string;
    grad_decision_number?: string;
    grad_decision_date?: string;
  };
  bank?: {
    bank_account?: string;
    bank_name?: string;
    ocb_cif?: string;
  };
  other?: {
    note?: string;
  };
  last_updated_at?: string;
}

interface BlockProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

interface InputGroupProps {
  label: string;
  value?: any;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  type?: string;
  icon?: ReactNode;
  className?: string;
  bold?: boolean;
  status?: boolean;
  subtle?: boolean;
}

interface SelectGroupProps {
  label: string;
  value?: any;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: ReactNode;
}

interface AccordionSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// --- Constants (Enums for Dropdowns) ---
const GENDER_OPTIONS = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

const RELIGION_OPTIONS = [
  { value: "NONE", label: "Không" },
  { value: "BUDDHISM", label: "Phật giáo" },
  { value: "CATHOLICISM", label: "Thiên Chúa giáo" },
  { value: "CHRISTIANITY", label: "Tin Lành" },
  { value: "OTHER", label: "Khác" },
];

const ETHNIC_OPTIONS = [
  { value: "KINH", label: "Kinh (Việt)" },
  { value: "HOA", label: "Hoa" },
  { value: "KHMER", label: "Khmer" },
  { value: "CHAM", label: "Chăm" },
  { value: "OTHER", label: "Khác" },
];

const PRIORITY_AREA_OPTIONS = [
  { value: "KV1", label: "Khu vực 1" },
  { value: "KV2", label: "Khu vực 2" },
  { value: "KV2_NT", label: "Khu vực 2 - NT" },
  { value: "KV3", label: "Khu vực 3" },
];

export default function StudentRecordsPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [formData, setFormData] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showGuardian, setShowGuardian] = useState(false);

  // Accordion States (Collapsed by default as per requirements)
  const [expandedSections, setExpandedSections] = useState({
    graduation: false,
    bank: false,
    photos: false,
    other: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile && formData) {
      setIsDirty(JSON.stringify(profile) !== JSON.stringify(formData));
    }
  }, [formData, profile]);

  const fetchProfile = async () => {
    try {
      const res = await authFetch(`${API_URL}/profile/student/me`);
      if (!res.ok) throw new Error("Failed to fetch profile data");
      const data = await res.json();
      setProfile(data);
      setFormData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    section: keyof StudentProfile,
    field: string,
    value: any,
    subkey?: string,
  ) => {
    if (!formData) return;

    setFormData((prev: any) => {
      if (subkey) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subkey]: {
              ...prev[section][subkey],
              [field]: value,
            },
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  const handleSave = async () => {
    alert("Changes saved locally! (Backend update implementation pending)");
    setProfile(formData);
    setIsDirty(false);
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay error={error} />;

  // Family Logic
  const hasParents =
    formData?.family?.parents?.father_name ||
    formData?.family?.parents?.mother_name;
  const hasGuardian = formData?.family?.guardian?.full_name;

  // Helpers
  const val = (v: any) => v || "";
  const formatDateTime = (d: string) =>
    d ? new Date(d).toLocaleString("vi-VN") : "N/A";

  return (
    <div className="relative min-h-full space-y-8 bg-slate-50/50 p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-[#003087]"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#003087]">
              Student Records
            </h1>
            <p className="text-sm text-slate-500">
              Official Profile Information
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs text-slate-400 shadow-sm md:flex">
          <Clock size={12} />
          <span>
            Last updated: {formatDateTime(val(formData?.last_updated_at))}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Block 1: Personal & Residency */}
        <Block title="Personal & Residency" icon={<User size={18} />}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="Last Name"
              value={val(formData?.personal.last_name)}
              onChange={(v) => handleChange("personal", "last_name", v)}
            />
            <InputGroup
              label="First Name"
              value={val(formData?.personal.first_name)}
              onChange={(v) => handleChange("personal", "first_name", v)}
            />
            <InputGroup
              type="date"
              label="Date of Birth"
              value={val(formData?.personal.dob)}
              onChange={(v) => handleChange("personal", "dob", v)}
            />

            {/* Gender Dropdown */}
            <SelectGroup
              label="Gender"
              value={val(formData?.personal.gender)}
              options={GENDER_OPTIONS}
              onChange={(v) => handleChange("personal", "gender", v)}
            />

            <InputGroup
              label="National ID"
              value={val(formData?.personal.national_id)}
              onChange={(v) => handleChange("personal", "national_id", v)}
              icon={<Shield size={14} />}
            />
            <InputGroup
              label="Nationality"
              value={val(formData?.personal.nationality) || "Vietnam"}
              onChange={(v) => handleChange("personal", "nationality", v)}
              icon={<Globe size={14} />}
            />

            <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
              <SelectGroup
                label="Ethnic Group"
                value={val(formData?.personal.ethnic) || "KINH"}
                options={ETHNIC_OPTIONS}
                onChange={(v) => handleChange("personal", "ethnic", v)}
              />
              <SelectGroup
                label="Religion"
                value={val(formData?.personal.religion) || "NONE"}
                options={RELIGION_OPTIONS}
                onChange={(v) => handleChange("personal", "religion", v)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
              <SelectGroup
                label="Priority Area"
                value={val(formData?.personal.priority_area) || "KV3"}
                options={PRIORITY_AREA_OPTIONS}
                onChange={(v) => handleChange("personal", "priority_area", v)}
              />
              <InputGroup
                label="Priority Group"
                value={val(formData?.personal.priority_group) || "None"}
                onChange={(v) => handleChange("personal", "priority_group", v)}
              />
            </div>

            <InputGroup
              label="Birthplace"
              value={val(formData?.personal.birthplace)}
              onChange={(v) => handleChange("personal", "birthplace", v)}
              className="md:col-span-2"
              icon={<MapPin size={14} />}
            />

            {/* Sub-text Hidden Fields */}
            <div className="mt-2 grid grid-cols-2 gap-4 border-t pt-2 text-xs text-slate-400 md:col-span-2">
              <p>ID Issue Date: {val(formData?.personal.id_issue_date)}</p>
              <p>ID Issue Place: {val(formData?.personal.id_issue_place)}</p>
            </div>

            <InputGroup
              label="Permanent Address"
              value={val(formData?.contact.address_permanent)}
              onChange={(v) => handleChange("contact", "address_permanent", v)}
              icon={<Home size={14} />}
              className="md:col-span-2"
            />
          </div>
        </Block>

        {/* Block 2: Contact Information */}
        <Block title="Contact Information" icon={<Phone size={18} />}>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputGroup
                label="Phone Number"
                value={val(formData?.contact.phone)}
                onChange={(v) => handleChange("contact", "phone", v)}
                icon={<Phone size={14} />}
              />
              <InputGroup
                label="Family Phone"
                value={val(formData?.contact.family_phone)}
                onChange={(v) => handleChange("contact", "family_phone", v)}
                icon={<Phone size={14} />}
              />
            </div>
            <InputGroup
              label="University Email"
              value={val(formData?.contact.email)}
              readOnly
              icon={<Mail size={14} />}
            />
            <InputGroup
              label="Personal Email"
              value={val(formData?.contact.personal_email)}
              onChange={(v) => handleChange("contact", "personal_email", v)}
              icon={<Mail size={14} />}
            />
            <InputGroup
              label="Current Address"
              value={val(formData?.contact.address_current)}
              onChange={(v) => handleChange("contact", "address_current", v)}
              icon={<MapPin size={14} />}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputGroup
                label="Dormitory Room"
                value={val(formData?.contact.dormitory_room)}
                onChange={(v) => handleChange("contact", "dormitory_room", v)}
                icon={<Building size={14} />}
              />
              {/* Hidden Secondary Email */}
              <div className="flex h-full items-center pt-6 text-xs text-slate-400">
                Backup Email: {val(formData?.contact.secondary_email) || "N/A"}
              </div>
            </div>
          </div>
        </Block>

        {/* Block 3: Family Information */}
        <Block
          title={
            showGuardian && hasGuardian
              ? "Guardian Information"
              : "Family Information"
          }
          icon={<Users size={18} />}
          className="lg:col-span-2"
          action={
            hasParents &&
            hasGuardian && (
              <button
                onClick={() => setShowGuardian(!showGuardian)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                {showGuardian ? "View Parents" : "View Guardian"}
              </button>
            )
          }
        >
          {showGuardian && hasGuardian ? (
            // Guardian View
            <div className="animate-in fade-in grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputGroup
                label="Full Name"
                value={val(formData?.family?.guardian?.full_name)}
                onChange={(v) =>
                  handleChange("family", "full_name", v, "guardian")
                }
              />
              <InputGroup
                label="Relationship"
                value={val(formData?.family?.guardian?.relationship)}
                onChange={(v) =>
                  handleChange("family", "relationship", v, "guardian")
                }
              />
              <InputGroup
                label="Phone"
                value={val(formData?.family?.guardian?.phone_number)}
                onChange={(v) =>
                  handleChange("family", "phone_number", v, "guardian")
                }
              />
              <InputGroup
                label="Email"
                value={val(formData?.family?.guardian?.email)}
                onChange={(v) => handleChange("family", "email", v, "guardian")}
              />
              <InputGroup
                label="Address"
                value={val(formData?.family?.guardian?.address)}
                onChange={(v) =>
                  handleChange("family", "address", v, "guardian")
                }
                className="md:col-span-2"
              />
            </div>
          ) : (
            // Parents View
            <div className="animate-in fade-in grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Father */}
              <div className="space-y-4">
                <h4 className="border-b pb-2 text-sm font-bold uppercase text-slate-700">
                  Father
                </h4>
                <InputGroup
                  label="Name"
                  value={val(formData?.family?.parents?.father_name)}
                  onChange={(v) =>
                    handleChange("family", "father_name", v, "parents")
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <InputGroup
                    label="Year of Birth"
                    type="date"
                    value={val(formData?.family?.parents?.father_birthday)}
                    onChange={(v) =>
                      handleChange("family", "father_birthday", v, "parents")
                    }
                  />
                  <InputGroup
                    label="Phone"
                    value={val(formData?.family?.parents?.father_phone)}
                    onChange={(v) =>
                      handleChange("family", "father_phone", v, "parents")
                    }
                  />
                </div>
                <InputGroup
                  label="Job"
                  value={val(formData?.family?.parents?.father_job)}
                  onChange={(v) =>
                    handleChange("family", "father_job", v, "parents")
                  }
                />
                <InputGroup
                  label="Workplace"
                  value={val(formData?.family?.parents?.father_workplace)}
                  onChange={(v) =>
                    handleChange("family", "father_workplace", v, "parents")
                  }
                />
              </div>
              {/* Mother */}
              <div className="space-y-4">
                <h4 className="border-b pb-2 text-sm font-bold uppercase text-slate-700">
                  Mother
                </h4>
                <InputGroup
                  label="Name"
                  value={val(formData?.family?.parents?.mother_name)}
                  onChange={(v) =>
                    handleChange("family", "mother_name", v, "parents")
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <InputGroup
                    label="Year of Birth"
                    type="date"
                    value={val(formData?.family?.parents?.mother_birthday)}
                    onChange={(v) =>
                      handleChange("family", "mother_birthday", v, "parents")
                    }
                  />
                  <InputGroup
                    label="Phone"
                    value={val(formData?.family?.parents?.mother_phone)}
                    onChange={(v) =>
                      handleChange("family", "mother_phone", v, "parents")
                    }
                  />
                </div>
                <InputGroup
                  label="Job"
                  value={val(formData?.family?.parents?.mother_job)}
                  onChange={(v) =>
                    handleChange("family", "mother_job", v, "parents")
                  }
                />
                <InputGroup
                  label="Workplace"
                  value={val(formData?.family?.parents?.mother_workplace)}
                  onChange={(v) =>
                    handleChange("family", "mother_workplace", v, "parents")
                  }
                />
              </div>
            </div>
          )}
        </Block>

        {/* Block 4: Academic Information (Read-only) */}
        <Block
          title="Academic Information"
          icon={<GraduationCap size={18} />}
          className="border-blue-100 bg-blue-50/50 lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <InputGroup
              label="Student ID"
              value={val(formData?.academic.student_id)}
              readOnly
              bold
            />
            <InputGroup
              label="Status"
              value={val(formData?.academic.status)}
              readOnly
              status
            />
            <InputGroup
              label="Class Code"
              value={val(formData?.academic.class_code)}
              readOnly
            />
            <InputGroup
              label="Faculty"
              value={val(formData?.academic.faculty)}
              readOnly
              icon={<Building size={14} />}
              className="md:col-span-2"
            />
            <InputGroup
              label="Major"
              value={val(formData?.academic.major)}
              readOnly
              icon={<BookOpen size={14} />}
            />
            <InputGroup
              label="Enrollment Year"
              value={val(formData?.academic.enrollment_year)}
              readOnly
            />
            <InputGroup
              label="Education Level"
              value={val(formData?.academic.education_level)}
              readOnly
            />
            <InputGroup
              label="Training System"
              value={val(formData?.academic.training_system)}
              readOnly
            />
          </div>
        </Block>
      </div>

      {/* Floating Save Button */}
      <AnimatePresence>
        {isDirty && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={handleSave}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-[#003087] px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-800"
          >
            <Save size={20} />
            <span className="font-bold">Save Changes</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Accordion Sections */}
      <div className="space-y-4 border-t border-slate-200 pt-6">
        <AccordionSection
          title="Graduation Information"
          icon={<GraduationCap size={18} />}
          isExpanded={expandedSections.graduation}
          onToggle={() => toggleSection("graduation")}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Major"
              value={val(formData?.graduation?.grad_major)}
              onChange={(v) => handleChange("graduation", "grad_major", v)}
            />
            <InputGroup
              label="Year/Semester"
              value={val(formData?.graduation?.grad_year_semester)}
              onChange={(v) =>
                handleChange("graduation", "grad_year_semester", v)
              }
            />
            <InputGroup
              label="Decision Number"
              value={val(formData?.graduation?.grad_decision_number)}
              onChange={(v) =>
                handleChange("graduation", "grad_decision_number", v)
              }
            />
            <InputGroup
              type="date"
              label="Decision Date"
              value={val(formData?.graduation?.grad_decision_date)}
              onChange={(v) =>
                handleChange("graduation", "grad_decision_date", v)
              }
            />
          </div>
        </AccordionSection>

        <AccordionSection
          title="Bank Account"
          icon={<Briefcase size={18} />}
          isExpanded={expandedSections.bank}
          onToggle={() => toggleSection("bank")}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Bank Name"
              value={val(formData?.bank?.bank_name)}
              onChange={(v) => handleChange("bank", "bank_name", v)}
            />
            <InputGroup
              label="Account Number"
              value={val(formData?.bank?.bank_account)}
              onChange={(v) => handleChange("bank", "bank_account", v)}
            />
            <InputGroup
              label="OCB CIF"
              value={val(formData?.bank?.ocb_cif)}
              onChange={(v) => handleChange("bank", "ocb_cif", v)}
            />
          </div>
        </AccordionSection>

        <AccordionSection
          title="Photo Records"
          icon={<FileText size={18} />}
          isExpanded={expandedSections.photos}
          onToggle={() => toggleSection("photos")}
        >
          <div className="py-4 text-center text-slate-500">
            No VNeID photo records currently available.
          </div>
        </AccordionSection>

        <AccordionSection
          title="Other Information"
          icon={<FileText size={18} />}
          isExpanded={expandedSections.other}
          onToggle={() => toggleSection("other")}
        >
          <InputGroup
            label="Note"
            value={val(formData?.other?.note)}
            onChange={(v) => handleChange("other", "note", v)}
          />
        </AccordionSection>
      </div>
    </div>
  );
}

// --- Components ---

function Block({ title, icon, children, className = "", action }: BlockProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
            {icon}
          </div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function InputGroup({
  label,
  value,
  onChange,
  readOnly,
  type = "text",
  icon,
  className = "",
  bold,
  status,
  subtle,
}: InputGroupProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        <label
          className={`text-xs font-semibold uppercase tracking-wide ${subtle ? "text-slate-400" : "text-slate-500"}`}
        >
          {label}
        </label>
      </div>
      {readOnly ? (
        status ? (
          <span className="inline-flex self-start rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {value}
          </span>
        ) : (
          <div
            className={`rounded-lg border border-transparent bg-slate-50 px-3 py-2 text-slate-700 ${bold ? "font-bold" : "font-medium"}`}
          >
            {value || "N/A"}
          </div>
        )
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
}

function SelectGroup({
  label,
  value,
  options,
  onChange,
  icon,
}: SelectGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </label>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function AccordionSection({
  title,
  icon,
  children,
  isExpanded,
  onToggle,
}: AccordionSectionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-white px-6 py-4 transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="text-slate-400">{icon}</div>
          <h3 className="font-semibold text-slate-700">{title}</h3>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SkeletonLoader() {
  return <div className="p-6">Loading...</div>; // Simplified for brevity
}

function ErrorDisplay({ error }: { error: string }) {
  return <div className="p-6 text-red-600">{error}</div>; // Simplified
}
