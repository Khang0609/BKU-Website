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
    name: "nationality",
    id: "personal",
    type: "select",
    optionsKey: "countries",
  },
  {
    label: "Place of Birth",
    name: "place_of_birth",
    id: "personal",
    type: "select",
    optionsKey: "provinces",
  },
  {
    label: "Other Birthplace",
    name: "other_birthplace",
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
];

export const getAddressSchema = (
  updateForm: UpdateFunction,
  handleProvinceChange: any,
  sectionId: string = "permanent_address",
): FieldSchema[] => [
  {
    label: "Province/City",
    name: "province_id",
    id: sectionId,
    type: "select",
    optionsKey: "provinces",
    customOnChange: (v, { handleProvinceChange }) => {
      handleProvinceChange(sectionId, v);
    },
  },
  {
    label: "Ward/Commune",
    name: "ward_id",
    id: sectionId,
    type: "select",
    optionsKey: "wards",
    customOptions: (catalogs, formData) => {
      const provinceId = formData?.[sectionId]?.province_id;
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
