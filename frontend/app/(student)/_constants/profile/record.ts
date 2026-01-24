import { FieldSchema } from "@/app/(student)/_types/profile/record";
import { get } from "http";

export const PRIORITY_AREAS = [
  { value: "KV1", label: "Khu vực 1" },
  { value: "KV2", label: "Khu vực 2" },
  { value: "KV2_NT", label: "Khu vực 2 - NT" },
  { value: "KV3", label: "Khu vực 3" },
];

export const PRIORITY_GROUPS = [
  { value: "UT1", label: "UT1" },
  { value: "UT2", label: "UT2" },
  { value: "NONE", label: "Không" },
];

// -------- SCHEMA --------
type UpdateFunction = (section: string, field: string, value: any) => void;
type FetchWardsFunction = (value: any) => Promise<any>;

export const getPersonalSchema = (
  updateForm: UpdateFunction,
): FieldSchema[] => [
  {
    label: "Nationality",
    name: "nationality_id",
    id: "personal",
    type: "select",
    optionsKey: "countries",
  },
  {
    label: "Place of Birth",
    name: "place_of_birth",
    id: "personal",
    type: "text",
    optionsKey: "provinces",
  },
  {
    label: "Other Birthplace",
    name: "other_place_of_birth",
    id: "personal",
    type: "text",
  },
  {
    label: "Religion",
    name: "religion_id",
    id: "personal",
    type: "select",
    optionsKey: "religions",
  },
  {
    label: "Ethnicity",
    name: "ethnic_id",
    id: "personal",
    type: "select",
    optionsKey: "ethnics",
  },
  {
    label: "Identity Card Number",
    name: "id_card_number",
    id: "personal",
    type: "text",
  },
  {
    label: "Issue Date",
    name: "id_card_date",
    id: "personal",
    type: "date",
  },
  {
    label: "Issue Place",
    name: "id_card_place",
    id: "personal",
    type: "text",
  },
  {
    label: "Priority Area",
    name: "priority_area",
    id: "personal",
    type: "select",
    options: PRIORITY_AREAS,
  },
  {
    label: "Priority Group",
    name: "priority_group",
    id: "personal",
    type: "select",
    options: PRIORITY_GROUPS,
  },
  {
    label: "Union Date",
    name: "union_date",
    id: "personal",
    type: "date",
  },
  {
    label: "Party Date",
    name: "party_date",
    id: "personal",
    type: "date",
  },
  {
    label: "Youth Union Date",
    name: "youth_union_date",
    id: "personal",
    type: "date",
  },
];

export const getAddressSchema = (
  updateForm: UpdateFunction,
  handleProvinceChange: any,
  sectionId: string = "permanent_address",
  sub?: string,
): FieldSchema[] => {
  const baseSchema: FieldSchema[] = [
    {
      label: "Province/City",
      name: "province_id",
      id: sectionId,
      type: "select",
      optionsKey: "provinces",
      customOnChange: (v, { handleProvinceChange }) => {
        handleProvinceChange(sectionId, v, sub);
      },
    },
    {
      label: "Ward/Commune",
      name: "ward_id",
      id: sectionId,
      type: "select",
      optionsKey: "wards",
      customOptions: (catalogs, formData) => {
        const provinceKey = sub ? `${sub}_province_id` : "province_id";

        // 1. Try to get from direct section (e.g. permanent_address.permanent_province_id)
        let provinceId = formData?.[sectionId]?.[provinceKey];

        // 2. If valid provinceId not found, try nested structure (e.g. family.guardian.guardian_province_id)
        if (!provinceId && sectionId === "family" && sub === "guardian") {
          provinceId = formData?.[sectionId]?.[sub]?.[provinceKey];

          // Nested fallback to unprefixed
          if (!provinceId) {
            provinceId = formData?.[sectionId]?.[sub]?.["province_id"];
          }
        }

        // 3. Fallback to unprefixed in direct section (e.g. contact.province_id)
        if (!provinceId && sub) {
          provinceId = formData?.[sectionId]?.["province_id"];
        }

        return catalogs.wards[provinceId] || [];
      },
    },
    {
      label: "House Number / Street",
      name: "house_number",
      id: sectionId,
      type: "text",
    },
  ];

  return baseSchema.map((field) => ({
    ...field,
    name: sub ? `${sub}_${field.name}` : field.name,
  }));
};

export const getContactSchema = (updateForm: UpdateFunction): FieldSchema[] => [
  {
    label: "Personal Phone",
    name: "phone",
    id: "contact",
    type: "text",
  },
  {
    label: "Family Phone",
    name: "family_phone",
    id: "contact",
    type: "text",
  },
  {
    label: "Personal Email",
    name: "personal_email",
    id: "contact",
    type: "text",
  },
  {
    label: "Dorm Room",
    name: "dorm_room",
    id: "contact",
    type: "text",
  },
];

export const getParentsSchema = (
  updateForm: UpdateFunction,
  prefix: "father" | "mother",
): FieldSchema[] => {
  const baseSchema: FieldSchema[] = [
    {
      label: "Name",
      name: "name",
      id: "family",
      type: "text",
    },
    {
      label: "Phone",
      name: "phone",
      id: "family",
      type: "text",
    },
    {
      label: "Job",
      name: "job",
      id: "family",
      type: "text",
    },
    {
      label: "Workplace",
      name: "workplace",
      id: "family",
      type: "text",
    },
  ];
  return baseSchema.map((field) => ({
    ...field,
    name: `${prefix}_${field.name}`,
  }));
};

export const getGuardianSchema = (
  updateForm: UpdateFunction,
): FieldSchema[] => [
  {
    label: "Full Name",
    name: "full_name",
    id: "family",
    type: "text",
  },
  {
    label: "Relationship",
    name: "relationship",
    id: "family",
    type: "text",
  },
  {
    label: "Phone",
    name: "phone_number",
    id: "family",
    type: "text",
  },
  {
    label: "Job",
    name: "job",
    id: "family",
    type: "text",
  },
];

export const getOtherSchema = (updateForm: UpdateFunction): FieldSchema[] => [
  {
    label: "Facebook",
    name: "facebook",
    id: "others",
    type: "text",
  },
  {
    label: "LinkedIn",
    name: "linkedin",
    id: "others",
    type: "text",
  },
];
