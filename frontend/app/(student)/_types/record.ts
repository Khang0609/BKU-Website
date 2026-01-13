import { ReactNode } from "react";

export interface Option {
  value: string | number;
  label: string;
}

export interface Personal {
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

export interface Address {
  province_id?: number;
  ward_id?: number;
  house_number?: string;
  province_name?: string;
  ward_name?: string;
  full_address?: string;
}

export interface Contact {
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

export interface Family {
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

export interface Other {
  social_media: Record<string, string>;
  photo_record_note?: string;
}

export interface ProfileData {
  personal: Personal;
  permanent_address: Address;
  contact: Contact;
  family: Family;
  others: Other;
  last_updated_at?: string;
}

// --- Catalogs ---
export interface Catalog {
  provinces: Option[];
  countries: Option[];
  ethnics: Option[];
  religions: Option[];
  wards: Record<number, Option[]>;
}

// --- Common ---
export interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  id: string;
  className?: string;
}

export interface FieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  id: string;
  type?: "text" | "select" | "date";
  options?: Option[];
  className?: string;
}

export interface FieldSchema {
  id: string;
  name: string; // Tên field trong database (nationality, religion_id)
  label: string; // Chữ hiển thị
  type: "text" | "select" | "date";
  optionsKey?: string; // Khóa để lấy data từ catalogs
  options?: Option[]; // Dữ liệu để render select
  className?: string; // Tùy chỉnh layout
  customOnChange?: (v: any, helpers: any) => void; 
  customOptions?: (catalogs: any, formData: any) => any[];
}

export interface AddressSectionProps {
  id: string;
  sub?: string;
}