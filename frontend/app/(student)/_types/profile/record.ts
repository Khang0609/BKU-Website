import { ReactNode } from "react";

export interface Option {
  value: string | number;
  label: string;
}

export interface Personal {
  first_name: string;
  last_name: string;
  day_of_birth: string;
  gender: string;
  id_card_number: string;
  id_card_date: string;
  id_card_place: string;
  nationality_id?: number;
  place_of_birth: string;
  other_place_of_birth?: string;
  religion_id?: number;
  ethnic_id?: number;
  priority_area?: string;
  priority_group?: string;
  union_date?: string;
  party_date?: string;
  youth_union_date?: string;
}

export interface BaseAddress {
  province_id?: number;
  ward_id?: number;
  house_number?: string;
  province_name?: string;
  ward_name?: string;
  full_address?: string;
}

export type AddressWithPrefix<P extends string> = {
  [K in keyof BaseAddress as `${P}_${string & K}`]: BaseAddress[K];
};

export type PermanentAddress = AddressWithPrefix<"permanent">;
export type CurrentAddress = AddressWithPrefix<"current">;
export type GuardianAddress = AddressWithPrefix<"guardian">;

export interface Contact extends CurrentAddress {
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
  guardian: GuardianAddress & {
    full_name?: string;
    relationship?: string;
    phone_number?: string;
    email?: string;
    job?: string;
    // Fallback fields for backward compatibility if needed, though we aim to remove them
    province_id?: number;
    ward_id?: number;
    house_number?: string;
    address?: string;
  };
}

export interface Other {
  social_media: Record<string, string>;
  photo_record_note?: string;
}

export interface ProfileData {
  personal: Personal;
  permanent_address: PermanentAddress;
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
