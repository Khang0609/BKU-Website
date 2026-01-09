"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Building,
  GraduationCap,
  ChevronDown,
  Edit2,
  Save,
  X,
  Users,
  Clock,
  Home,
  Globe,
  Camera,
  Share2,
  Check,
  Search,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authFetch } from "@/lib/authFetch";
import { toast } from "sonner";

// --- Interfaces ---

interface Option {
  value: string | number;
  label: string;
}

interface Personal {
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  national_id: string;
  id_issue_date: string;
  id_issue_place: string;
  nationality: string;
  place_of_birth: string;
  other_birthplace?: string;
  religion_id?: number;
  ethnic_id?: number;
  priority_area?: string;
  priority_group?: string;
  union_date?: string;
  party_date?: string;
}

interface Address {
  province_id?: number;
  ward_id?: number;
  house_number?: string;
  province_name?: string;
  ward_name?: string;
  full_address?: string;
}

interface Contact {
  province_id?: number;
  ward_id?: number;
  house_number?: string;
  province_name?: string;
  ward_name?: string;
  full_address?: string;
  phone?: string;
  family_phone?: string;
  dorm_room?: string;
  personal_email?: string;
  student_email?: string;
}

interface Family {
  parents: {
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
  guardian: {
    full_name?: string;
    relationship?: string;
    phone_number?: string;
    email?: string;
    job?: string;
    province_id?: number;
    ward_id?: number;
    house_number?: string;
    address?: string; // fallback
  };
}

interface Other {
  social_media: Record<string, string>;
  photo_record_note?: string;
}

interface ProfileData {
  personal: Personal;
  permanent_address: Address;
  contact: Contact;
  family: Family;
  others: Other;
  last_updated_at?: string;
}

// --- Catalogs ---
interface Catalog {
  provinces: Option[];
  countries: Option[];
  ethnics: Option[];
  religions: Option[];
  wards: Record<number, Option[]>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const PRIORITY_AREAS = [
  { value: "KV1", label: "Khu vực 1" },
  { value: "KV2", label: "Khu vực 2" },
  { value: "KV2_NT", label: "Khu vực 2 - NT" },
  { value: "KV3", label: "Khu vực 3" },
];

const PRIORITY_GROUPS = [
  { value: "UT1", label: "UT1" },
  { value: "UT2", label: "UT2" },
  { value: "NONE", label: "Không" },
];

export default function StudentRecordsPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [catalogs, setCatalogs] = useState<Catalog>({
    provinces: [],
    countries: [],
    ethnics: [],
    religions: [],
    wards: {},
  });
  const [loading, setLoading] = useState(true);
  const [familyTab, setFamilyTab] = useState<"parents" | "guardian">("parents");

  // Edit States
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  // Wards Cache

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [profRes, provRes, countRes, ethRes, relRes] = await Promise.all([
        authFetch(`${API_URL}/profile/student/me`),
        authFetch(`${API_URL}/location/provinces`),
        authFetch(`${API_URL}/location/countries`),
        authFetch(`${API_URL}/location/ethnics`),
        authFetch(`${API_URL}/location/religions`),
      ]);

      if (!profRes.ok) throw new Error("Failed to load profile");

      const pData = await profRes.json();
      const provData = await provRes.json();
      const countData = await countRes.json();
      const ethData = await ethRes.json();
      const relData = await relRes.json();

      setProfile(pData);
      setFormData(pData);

      setCatalogs({
        provinces: Array.isArray(provData)
          ? provData.map((p: any) => ({ value: p.id, label: p.name }))
          : [],
        countries: Array.isArray(countData)
          ? countData.map((c: any) => ({ value: c.id, label: c.name }))
          : [],
        ethnics: Array.isArray(ethData)
          ? ethData.map((e: any) => ({ value: e.id, label: e.name }))
          : [],
        religions: Array.isArray(relData)
          ? relData.map((r: any) => ({ value: r.id, label: r.name }))
          : [],
        wards: {},
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWards = async (provinceId: number) => {
    if (catalogs.wards[provinceId]) return;
    try {
      const res = await authFetch(
        `${API_URL}/location/provinces/${provinceId}/wards`,
      );
      if (res.ok) {
        const data = await res.json();
        setCatalogs((prev) => ({
          ...prev,
          wards: {
            ...prev.wards,
            [provinceId]: Array.isArray(data)
              ? data.map((w: any) => ({ value: w.id, label: w.name }))
              : [],
          },
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleEdit = (section: string) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
    if (!editMode[section]) {
      // Reset form data for this section on enter edit
      setFormData((prev) => ({
        ...prev!,
        [section]: profile![section as keyof ProfileData],
      }));
    }
  };

  const handleSave = async (section: string) => {
    setSaving((prev) => ({ ...prev, [section]: true }));
    // Construct Payload based on section
    let payload: any = {};
    const data = formData?.[section as keyof ProfileData];

    // Simple Mapping for demo - production should map carefully
    if (section === "personal") payload = data;
    const finalData = data && typeof data !== "string" ? { ...data } : {};
    if (section === "permanent_address") payload = finalData;
    if (section === "contact") payload = finalData;
    if (section === "family") {
      const fam = data as Family;
      payload = {
        ...fam.parents,
        // Map Guardian fields to match schema
        guardian_full_name: fam.guardian.full_name,
        guardian_relationship: fam.guardian.relationship,
        guardian_phone: fam.guardian.phone_number,
        guardian_email: fam.guardian.email,
        guardian_job: fam.guardian.job,
        guardian_province_id: fam.guardian.province_id,
        guardian_ward_id: fam.guardian.ward_id,
        guardian_house_number: fam.guardian.house_number,
      };
    }
    if (section === "others")
      payload = { social_media: (data as Other).social_media };

    try {
      // Endpoint mapping
      let endpoint = section;
      if (section === "permanent_address") endpoint = "contact"; // Both addresses in contact update or specific? API uses contact endpoint for addresses
      if (section === "others") endpoint = "extra";

      // Special handling for Address separation in payload if needed
      // Our API 'contact' endpoint handles both perm and curr addresses.
      // So if saving 'permanent_address', we send to contact endpoint with perm keys.
      if (section === "permanent_address") {
        endpoint = "contact";
        payload = {
          permanent_province_id: (data as Address).province_id,
          permanent_ward_id: (data as Address).ward_id,
          permanent_house_number: (data as Address).house_number,
        };
      }
      if (section === "contact") {
        // This is section 3 "Contact" which includes Current Address + Phones
        payload = {
          current_province_id: (data as Contact).province_id,
          current_ward_id: (data as Contact).ward_id,
          current_house_number: (data as Contact).house_number,
          phone: (data as Contact).phone,
          family_phone: (data as Contact).family_phone,
          dorm_room: (data as Contact).dorm_room,
          personal_email: (data as Contact).personal_email,
        };
      }

      await authFetch(`${API_URL}/profile/student/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // refetch to sync
      const res = await authFetch(`${API_URL}/profile/student/me`);
      const updated = await res.json();
      setProfile(updated);
      setEditMode((prev) => ({ ...prev, [section]: false }));
      toast.success("Info updated successfully");
    } catch (e) {
      toast.error("Failed to save changes");
    } finally {
      setSaving((prev) => ({ ...prev, [section]: false }));
    }
  };

  const updateForm = (
    section: keyof ProfileData,
    field: string,
    value: any,
    sub?: string,
  ) => {
    if (!formData) return;
    setFormData((prev) => {
      if (!prev) return null;
      const secData = prev[section] as any;
      if (sub && section === "family") {
        // Handle family nested
        return {
          ...prev,
          family: {
            ...prev.family,
            [sub]: {
              ...prev.family[sub as keyof Family],
              [field]: value,
            },
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...secData,
          [field]: value,
        },
      };
    });
  };

  if (loading || !profile)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm hover:text-blue-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#003087]">
              Student Records
            </h1>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-slate-400 shadow-sm md:flex">
          <Clock size={12} />{" "}
          <span>
            Last updated:{" "}
            {profile.last_updated_at
              ? new Date(profile.last_updated_at).toLocaleString()
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Personal */}
        <Section
          title="Personal Information"
          icon={<User size={18} />}
          isEditing={editMode["personal"]}
          onEdit={() => toggleEdit("personal")}
          onSave={() => handleSave("personal")}
          isSaving={saving["personal"]}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Nationality"
              value={formData?.personal.nationality}
              isEditing={editMode["personal"]}
              type="select"
              options={catalogs.countries}
              onChange={(v: any) => updateForm("personal", "nationality", v)}
            />
            <Field
              label="Place of Birth"
              value={formData?.personal.place_of_birth}
              isEditing={editMode["personal"]}
              type="select"
              options={catalogs.provinces}
              onChange={(v: any) => updateForm("personal", "place_of_birth", v)}
            />
            <Field
              label="Other Birthplace"
              value={formData?.personal.other_birthplace}
              isEditing={editMode["personal"]}
              onChange={(v: any) =>
                updateForm("personal", "other_birthplace", v)
              }
            />
            <Field
              label="Religion"
              value={formData?.personal.religion_id}
              isEditing={editMode["personal"]}
              type="select"
              options={catalogs.religions}
              onChange={(v: any) => updateForm("personal", "religion_id", v)}
            />
            <Field
              label="Ethnicity"
              value={formData?.personal.ethnic_id}
              isEditing={editMode["personal"]}
              type="select"
              options={catalogs.ethnics}
              onChange={(v: any) => updateForm("personal", "ethnic_id", v)}
            />
            <Field
              label="Priority Area"
              value={formData?.personal.priority_area}
              isEditing={editMode["personal"]}
              type="select"
              options={PRIORITY_AREAS}
              onChange={(v: any) => updateForm("personal", "priority_area", v)}
            />
            <Field
              label="Priority Group"
              value={formData?.personal.priority_group}
              isEditing={editMode["personal"]}
              type="select"
              options={PRIORITY_GROUPS}
              onChange={(v: any) => updateForm("personal", "priority_group", v)}
            />
            <Field
              label="Union Date"
              value={formData?.personal.union_date}
              isEditing={editMode["personal"]}
              type="date"
              onChange={(v: any) => updateForm("personal", "union_date", v)}
            />
            <Field
              label="Party Date"
              value={formData?.personal.party_date}
              isEditing={editMode["personal"]}
              type="date"
              onChange={(v: any) => updateForm("personal", "party_date", v)}
            />
          </div>
        </Section>

        {/* 2. Permanent Address */}
        <Section
          title="Permanent Address"
          icon={<Home size={18} />}
          isEditing={editMode["permanent_address"]}
          onEdit={() => toggleEdit("permanent_address")}
          onSave={() => handleSave("permanent_address")}
          isSaving={saving["permanent_address"]}
        >
          <div className="grid grid-cols-1 gap-4">
            <Field
              label="Province/City"
              value={formData?.permanent_address.province_id}
              isEditing={editMode["permanent_address"]}
              type="select"
              options={catalogs.provinces}
              onChange={(v: any) => {
                updateForm("permanent_address", "province_id", v);
                fetchWards(v);
              }}
            />
            <Field
              label="Ward/Commune"
              value={formData?.permanent_address.ward_id}
              isEditing={editMode["permanent_address"]}
              type="select"
              options={
                catalogs.wards[
                  formData?.permanent_address.province_id as number
                ] || []
              }
              onChange={(v: any) =>
                updateForm("permanent_address", "ward_id", v)
              }
            />
            <Field
              label="House Number / Street"
              value={formData?.permanent_address.house_number}
              isEditing={editMode["permanent_address"]}
              onChange={(v: any) =>
                updateForm("permanent_address", "house_number", v)
              }
            />
            {!editMode["permanent_address"] && (
              <div className="mt-2 text-sm italic text-slate-500">
                {profile.permanent_address.full_address}
              </div>
            )}
          </div>
        </Section>

        {/* 3. Contact Info */}
        <Section
          title="Contact Information"
          icon={<Phone size={18} />}
          isEditing={editMode["contact"]}
          onEdit={() => toggleEdit("contact")}
          onSave={() => handleSave("contact")}
          isSaving={saving["contact"]}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Personal Phone"
              value={formData?.contact.phone}
              isEditing={editMode["contact"]}
              onChange={(v: any) => updateForm("contact", "phone", v)}
            />
            <Field
              label="Family Phone"
              value={formData?.contact.family_phone}
              isEditing={editMode["contact"]}
              onChange={(v: any) => updateForm("contact", "family_phone", v)}
            />
            <Field
              label="Personal Email"
              value={formData?.contact.personal_email}
              isEditing={editMode["contact"]}
              onChange={(v: any) => updateForm("contact", "personal_email", v)}
            />
            <Field
              label="Dorm Room"
              value={formData?.contact.dorm_room}
              isEditing={editMode["contact"]}
              onChange={(v: any) => updateForm("contact", "dorm_room", v)}
            />

            <div className="mt-2 border-t pt-4 md:col-span-2">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">
                Current Address
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Province/City"
                  value={formData?.contact.province_id}
                  isEditing={editMode["contact"]}
                  type="select"
                  options={catalogs.provinces}
                  onChange={(v: any) => {
                    updateForm("contact", "province_id", v);
                    fetchWards(v);
                  }}
                />
                <Field
                  label="Ward/Commune"
                  value={formData?.contact.ward_id}
                  isEditing={editMode["contact"]}
                  type="select"
                  options={
                    catalogs.wards[formData?.contact.province_id as number] ||
                    []
                  }
                  onChange={(v: any) => updateForm("contact", "ward_id", v)}
                />
                <Field
                  label="House No"
                  value={formData?.contact.house_number}
                  isEditing={editMode["contact"]}
                  onChange={(v: any) =>
                    updateForm("contact", "house_number", v)
                  }
                  className="md:col-span-2"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Relatives */}
        <Section
          title="Family Information"
          icon={<Users size={18} />}
          isEditing={editMode["family"]}
          onEdit={() => toggleEdit("family")}
          onSave={() => handleSave("family")}
          isSaving={saving["family"]}
          className="lg:col-span-2"
        >
          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setFamilyTab("parents")}
                className={`whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium ${
                  familyTab === "parents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Father & Mother
              </button>
              <button
                onClick={() => setFamilyTab("guardian")}
                className={`whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium ${
                  familyTab === "guardian"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Guardian
              </button>
            </nav>
          </div>

          {familyTab === "parents" ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="border-b pb-2 text-xs font-bold uppercase text-slate-700">
                  Father
                </h4>
                <Field
                  label="Name"
                  value={formData?.family.parents.father_name}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "father_name", v, "parents")
                  }
                />
                <Field
                  label="Phone"
                  value={formData?.family.parents.father_phone}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "father_phone", v, "parents")
                  }
                />
                <Field
                  label="Job"
                  value={formData?.family.parents.father_job}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "father_job", v, "parents")
                  }
                />
                <Field
                  label="Workplace"
                  value={formData?.family.parents.father_workplace}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "father_workplace", v, "parents")
                  }
                />
              </div>
              <div className="space-y-4">
                <h4 className="border-b pb-2 text-xs font-bold uppercase text-slate-700">
                  Mother
                </h4>
                <Field
                  label="Name"
                  value={formData?.family.parents.mother_name}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "mother_name", v, "parents")
                  }
                />
                <Field
                  label="Phone"
                  value={formData?.family.parents.mother_phone}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "mother_phone", v, "parents")
                  }
                />
                <Field
                  label="Job"
                  value={formData?.family.parents.mother_job}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "mother_job", v, "parents")
                  }
                />
                <Field
                  label="Workplace"
                  value={formData?.family.parents.mother_workplace}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "mother_workplace", v, "parents")
                  }
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-4 border-b pb-2 text-xs font-bold uppercase text-slate-700">
                  Guardian Info
                </h4>
                <Field
                  label="Full Name"
                  value={formData?.family.guardian.full_name}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "full_name", v, "guardian")
                  }
                />
                <Field
                  label="Relationship"
                  value={formData?.family.guardian.relationship}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "relationship", v, "guardian")
                  }
                />
                <Field
                  label="Phone"
                  value={formData?.family.guardian.phone_number}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "phone_number", v, "guardian")
                  }
                />
                <Field
                  label="Job"
                  value={formData?.family.guardian.job}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "job", v, "guardian")
                  }
                />
              </div>
              <div>
                <h4 className="mb-4 border-b pb-2 text-xs font-bold uppercase text-slate-700">
                  Guardian Address
                </h4>
                <Field
                  label="Province/City"
                  value={formData?.family.guardian.province_id}
                  isEditing={editMode["family"]}
                  type="select"
                  options={catalogs.provinces}
                  onChange={(v: any) => {
                    updateForm("family", "province_id", v, "guardian");
                    fetchWards(v);
                  }}
                />
                <Field
                  label="Ward"
                  value={formData?.family.guardian.ward_id}
                  isEditing={editMode["family"]}
                  type="select"
                  options={
                    catalogs.wards[
                      formData?.family.guardian.province_id as number
                    ] || []
                  }
                  onChange={(v: any) =>
                    updateForm("family", "ward_id", v, "guardian")
                  }
                />
                <Field
                  label="House No"
                  value={formData?.family.guardian.house_number}
                  isEditing={editMode["family"]}
                  onChange={(v: any) =>
                    updateForm("family", "house_number", v, "guardian")
                  }
                />
              </div>
            </div>
          )}
        </Section>

        {/* 5. Photo Record */}
        <Section title="Photo Records" icon={<Camera size={18} />}>
          <div className="py-6 text-center text-sm text-slate-500">
            {profile.others.photo_record_note ||
              "No specific notes on VNeID photo records."}
          </div>
        </Section>

        {/* 6. Others */}
        <Section
          title="Social Media"
          icon={<Share2 size={18} />}
          isEditing={editMode["others"]}
          onEdit={() => toggleEdit("others")}
          onSave={() => handleSave("others")}
          isSaving={saving["others"]}
        >
          <div className="grid grid-cols-1 gap-4">
            <Field
              label="Facebook"
              value={formData?.others.social_media?.facebook}
              isEditing={editMode["others"]}
              onChange={(v: any) =>
                setFormData((prev) => ({
                  ...prev!,
                  others: {
                    ...prev!.others,
                    social_media: { ...prev!.others.social_media, facebook: v },
                  },
                }))
              }
            />
            <Field
              label="LinkedIn"
              value={formData?.others.social_media?.linkedin}
              isEditing={editMode["others"]}
              onChange={(v: any) =>
                setFormData((prev) => ({
                  ...prev!,
                  others: {
                    ...prev!.others,
                    social_media: { ...prev!.others.social_media, linkedin: v },
                  },
                }))
              }
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

// --- Components ---

function Section({
  title,
  icon,
  children,
  isEditing,
  onEdit,
  onSave,
  isSaving,
  className = "",
}: any) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-700">{icon}</div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>
        {onEdit && (
          <button
            onClick={isEditing ? onSave : onEdit}
            disabled={isSaving}
            className={`rounded-full p-2 transition-colors ${
              isEditing
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "text-slate-500 hover:bg-slate-100"
            } ${isSaving ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isEditing ? (
              <Check size={18} />
            ) : (
              <Edit2 size={16} />
            )}
          </button>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  isEditing,
  type = "text",
  options,
  className = "",
}: any) {
  // Searchable Select Implementation (Basic)
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = options
    ? options.find((o: any) => o.value == value)?.label || value
    : value;

  // Filter options
  const filteredOptions = options
    ? options.filter((o: any) =>
        o?.label?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  if (!isEditing) {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <span className="text-xs font-semibold uppercase text-slate-400">
          {label}
        </span>
        <span className="truncate font-medium text-slate-700">
          {displayValue || "-"}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase text-slate-500">
        {label}
      </span>
      {type === "select" && options ? (
        <div className="relative" ref={ref}>
          <div
            className="flex w-full cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={!displayValue ? "text-slate-400" : ""}>
              {displayValue || "Select..."}
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          {isOpen && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg">
              <div className="sticky top-0 border-b bg-white p-2">
                <div className="flex items-center gap-2 rounded border px-2 py-1">
                  <Search size={14} className="text-slate-400" />
                  <input
                    autoFocus
                    type="text"
                    className="w-full text-xs outline-none"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {filteredOptions.map((opt: any) => (
                <div
                  key={opt.value}
                  className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-blue-50"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {opt.label}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="p-2 text-center text-xs text-slate-400">
                  No results
                </div>
              )}
            </div>
          )}
        </div>
      ) : type === "date" ? (
        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500"
        />
      )}
    </div>
  );
}
