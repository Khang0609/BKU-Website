"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  Building,
  BookOpen,
  GraduationCap,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Shield,
  Clock,
  ChevronDown,
  ArrowLeft,
  Layout,
  School,
  Hash,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authFetch } from "@/lib/authFetch";
import Image from "next/image";
import { getApiUrl } from "@/lib/api";
import { ImageWithFallback } from "@/components/ImageWithFallback";

// --- Types ---
interface StudentProfile {
  personal: {
    first_name: string;
    last_name: string; // Used as last_middle_name
    dob: string;
    gender: string;
    national_id: string;
    id_issue_date?: string;
    id_issue_place?: string;
    avatar_url?: string;
  };
  contact: {
    email: string;
    personal_email: string;
    phone: string;
    address_permanent: string;
    address_current: string;
  };
  academic: {
    student_id: string;
    faculty: string;
    major: string;
    class_code: string;
    enrollment_year: number;
    study_duration_standard?: string;
    status: string;
    entry_semester?: string;
    max_semesters?: number;

    // Additional fields from student.txt
    management_unit?: string;
    enrollment_date?: string;
    curriculum_year?: number;
    extended_semesters?: number;
    reduced_semesters?: number;
    standard_semesters?: number;
    expected_graduation_date?: string;
    max_graduation_date?: string;
    education_level?: string;
    training_system?: string;
    training_type?: string;
    program?: string;
    campus?: string;
    local_training?: string;
    training_session?: string;
  };
  graduation: {
    grad_major?: string;
    grad_year_semester?: string;
    grad_decision_number?: string;
    grad_decision_date?: string;
  };
  bank: {
    bank_account?: string;
    bank_name?: string;
    ocb_cif?: string;
    bknet_account?: string;
  };
  other: {
    note?: string;
  };
  last_updated_at?: string;
}

const API_URL = getApiUrl();

export default function StudentDetailedInfoPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Expanded states for Cards (Show More)
  const [cardExpanded, setCardExpanded] = useState({
    academic: false,
    personal: false,
    contact: false,
  });

  // Expanded states for Accordions
  const [expandedSections, setExpandedSections] = useState({
    graduation: false,
    bank: false,
    other: false,
  });

  const toggleCard = (card: keyof typeof cardExpanded) => {
    setCardExpanded((prev) => ({ ...prev, [card]: !prev[card] }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authFetch(`${API_URL}/profile/student/me`);
      if (!res.ok) throw new Error("Failed to load profile data");
      const data = await res.json();
      setProfile(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const val = (v: any) => v || "N/A";
  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("vi-VN") : "N/A";

  const fullName = profile
    ? `${val(profile.personal.last_name)} ${val(profile.personal.first_name)}`
    : "Student Name";

  if (loading) return <SkeletonLoader />;

  if (error)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center p-6 text-center text-red-600">
        <p className="font-bold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 underline"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-24">
      {/* Top Header with Back Button */}
      <div className="mx-auto mb-8 flex max-w-7xl items-center gap-4">
        <Link
          href="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-[#003087]"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">
            Profile Information
          </h1>
          <p className="text-sm text-slate-500">
            View your detailed student records
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Main Grid: Academic, Personal (Top) & Contact (Bottom) */}
        {/* Matches the layout style of the provided image roughly, 
            but using responsive grid.
            Row 1: Academic (Left), Personal (Right).
            Row 2: Contact (Full width). 
        */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1. ACADEMIC INFORMATION */}
          <Card
            title="Academic Information"
            icon={<GraduationCap size={20} />}
            isExpanded={cardExpanded.academic}
            onToggle={() => toggleCard("academic")}
          >
            {/* Main Visible Fields */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
              <GridItem
                label="Student ID"
                value={val(profile?.academic?.student_id)}
                bold
                large
              />
              <StatusBadge status={val(profile?.academic.status)} />

              <GridItem
                label="Faculty"
                value={val(profile?.academic.faculty)}
                icon={<Building size={14} />}
                className="md:col-span-2"
              />
              <GridItem
                label="Major"
                value={val(profile?.academic.major)}
                icon={<BookOpen size={14} />}
                className="md:col-span-2"
              />

              <GridItem
                label="Class Code"
                value={val(profile?.academic.class_code)}
                bold
              />
              <GridItem
                label="Enrollment Year"
                value={val(profile?.academic.enrollment_year)}
                bold
              />
            </div>

            {/* Hidden Fields (Show More) */}
            <AnimatePresence>
              {cardExpanded.academic && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 overflow-hidden border-t border-dashed border-slate-200 pt-6"
                >
                  <div className="grid grid-cols-1 gap-x-4 gap-y-6 text-sm md:grid-cols-2">
                    <GridItem
                      label="Entry Semester"
                      value={val(profile?.academic.entry_semester)}
                      subtle
                    />
                    <GridItem
                      label="Standard Duration"
                      value={val(profile?.academic.study_duration_standard)}
                      subtle
                    />
                    <GridItem
                      label="Education Level"
                      value={val(profile?.academic.education_level)}
                      subtle
                    />
                    <GridItem
                      label="Training System"
                      value={val(profile?.academic.training_system)}
                      subtle
                    />
                    <GridItem
                      label="Program"
                      value={val(profile?.academic.program)}
                      className="md:col-span-2"
                      subtle
                    />
                    <GridItem
                      label="Campus"
                      value={val(profile?.academic.campus)}
                      className="md:col-span-2"
                      subtle
                    />
                    <GridItem
                      label="Max Semesters"
                      value={val(profile?.academic.max_semesters)}
                      subtle
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* 2. PERSONAL DETAILS */}
          <Card
            title="Personal Details"
            icon={<User size={20} />}
            isExpanded={cardExpanded.personal}
            onToggle={() => toggleCard("personal")}
          >
            <div className="flex flex-col-reverse gap-6 md:flex-row">
              {/* Info Column */}
              <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                <GridItem
                  label="Full Name"
                  value={fullName}
                  bold
                  large
                  className="md:col-span-2"
                />
                <GridItem
                  label="Date of Birth"
                  value={formatDate(val(profile?.personal.dob))}
                />
                <GridItem
                  label="Gender"
                  value={val(profile?.personal.gender)}
                />
                <GridItem
                  label="National ID (CCCD)"
                  value={val(profile?.personal.national_id)}
                  icon={<Shield size={14} />}
                  className="md:col-span-2"
                />
              </div>

              {/* Avatar Column */}
              <div className="flex-shrink-0 self-start">
                <div className="group relative h-32 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
                  {profile?.personal.avatar_url ? (
                    <ImageWithFallback
                      src={profile.personal.avatar_url}
                      alt="Student Avatar"
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-300">
                      <User size={32} />
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        No Img
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {cardExpanded.personal && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 overflow-hidden border-t border-dashed border-slate-200 pt-6"
                >
                  <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                    <GridItem
                      label="ID Issue Date"
                      value={formatDate(val(profile?.personal.id_issue_date))}
                      subtle
                    />
                    <GridItem
                      label="ID Issue Place"
                      value={val(profile?.personal.id_issue_place)}
                      subtle
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* 3. CONTACT INFORMATION (Full Width) */}
          <div className="lg:col-span-2">
            <Card
              title="Contact Information"
              icon={<Phone size={20} />}
              isExpanded={cardExpanded.contact}
              onToggle={() => toggleCard("contact")}
            >
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                <GridItem
                  label="University Email"
                  value={val(profile?.contact.email)}
                  icon={<Mail size={14} />}
                  bold
                />
                <GridItem
                  label="Phone Number"
                  value={val(profile?.contact.phone)}
                  icon={<Phone size={14} />}
                  bold
                />
                <GridItem
                  label="Current Address"
                  value={val(profile?.contact.address_current)}
                  icon={<MapPin size={14} />}
                  className="md:col-span-2"
                />
              </div>

              <AnimatePresence>
                {cardExpanded.contact && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 overflow-hidden border-t border-dashed border-slate-200 pt-6"
                  >
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                      <GridItem
                        label="Personal Email"
                        value={val(profile?.contact.personal_email)}
                        subtle
                      />
                      <GridItem
                        label="Permanent Address"
                        value={val(profile?.contact.address_permanent)}
                        subtle
                        className="md:col-span-2"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>

        {/* Collapsible Accordions for Secondary Sections */}
        <div className="space-y-4 pt-6">
          <Accordion
            title="Graduation Information"
            icon={<School size={20} />}
            isOpen={expandedSections.graduation}
            onToggle={() => toggleSection("graduation")}
          >
            <GridItem
              label="Graduated Major"
              value={val(profile?.graduation?.grad_major)}
            />
            <GridItem
              label="Year / Semester"
              value={val(profile?.graduation?.grad_year_semester)}
            />
            <GridItem
              label="Decision Number"
              value={val(profile?.graduation?.grad_decision_number)}
            />
            <GridItem
              label="Decision Date"
              value={formatDate(val(profile?.graduation?.grad_decision_date))}
            />
          </Accordion>

          <Accordion
            title="Bank Account"
            icon={<Briefcase size={20} />}
            isOpen={expandedSections.bank}
            onToggle={() => toggleSection("bank")}
          >
            <GridItem label="Bank Name" value={val(profile?.bank?.bank_name)} />
            <GridItem
              label="Account Number"
              value={val(profile?.bank?.bank_account)}
              bold
            />
            <GridItem label="OCB CIF" value={val(profile?.bank?.ocb_cif)} />
            <GridItem
              label="BKNet Account"
              value={val(profile?.bank?.bknet_account)}
            />
          </Accordion>

          <Accordion
            title="Other Information"
            icon={<FileText size={20} />}
            isOpen={expandedSections.other}
            onToggle={() => toggleSection("other")}
          >
            <GridItem
              label="Note"
              value={val(profile?.other?.note)}
              className="col-span-full"
            />
          </Accordion>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function Card({ title, icon, children, isExpanded, onToggle }: any) {
  return (
    <div className="relative flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="text-blue-600/80">{icon}</div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>
        {children}
      </div>

      {/* Show More Toggle - Centered at bottom or integrated */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-blue-600"
        >
          {isExpanded ? "Show Less" : "Show More"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

function Accordion({ title, icon, isOpen, onToggle, children }: any) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="text-slate-400">{icon}</div>
          <h3 className="font-semibold text-slate-700">{title}</h3>
        </div>
        <div
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface GridItemProps {
  label: string;
  value: any;
  icon?: any;
  className?: string;
  bold?: boolean;
  subtle?: boolean;
  large?: boolean;
}

function GridItem({
  label,
  value,
  icon,
  className = "",
  bold,
  subtle,
  large,
}: GridItemProps) {
  return (
    <div className={`group flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400 opacity-70">{icon}</span>}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${subtle ? "text-slate-400" : "text-slate-400"}`}
        >
          {label}
        </span>
      </div>
      <div
        className={`break-words ${large ? "text-lg" : "text-sm"} ${
          bold ? "font-bold text-slate-900" : "font-medium text-slate-700"
        } ${subtle ? "text-slate-500" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        STATUS
      </span>
      <div className="mt-1">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
            status === "Đang học" || status === "Studying"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {status || "Unknown"}
        </span>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl space-y-8 p-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-200"></div>
        <div className="h-4 w-32 rounded bg-slate-200"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl bg-slate-200"></div>
        <div className="h-64 animate-pulse rounded-xl bg-slate-200"></div>
        <div className="h-48 animate-pulse rounded-xl bg-slate-200 lg:col-span-2"></div>
      </div>
    </div>
  );
}
