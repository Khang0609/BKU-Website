import React from "react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import {
  Section,
  AddressSection,
  Field,
} from "@/app/(student)/_components/profile/info_record/common";
import { Users } from "lucide-react";
import {
  getParentsSchema,
  getGuardianSchema,
} from "@/app/(student)/_constants/profile/record";

export const RelativeSection = () => {
  const { familyTab } = useRecordContext();
  const id = "family";
  return (
    <Section
      title="Family Information"
      icon={<Users size={18} />}
      id={id}
      className="lg:col-span-2"
    >
      {/* Tabs */}
      <FamilyTab />

      {familyTab === "parents" ? <ParentsTab /> : <GuardianTab id={id} />}
    </Section>
  );
};

const FamilyTab = () => {
  const { setFamilyTab, familyTab } = useRecordContext();
  return (
    <div className="mb-4 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setFamilyTab("parents")}
          className={`whites pace-nowrap border-b-2 px-1 pb-4 text-sm font-medium ${
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
  );
};

const ParentsTab = () => {
  const { formData, editMode, updateForm } = useRecordContext();
  const parentsRole: { key: "father" | "mother"; label: string }[] = [
    { key: "father", label: "Father" },
    { key: "mother", label: "Mother" },
  ];
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {parentsRole.map((role) => (
        <div key={role.key} className="space-y-4">
          <h4 className="border-b pb-2 text-xs font-bold uppercase text-slate-700">
            {role.label}
          </h4>
          {getParentsSchema(updateForm, role.key).map((field) => (
            <Field
              key={field.name}
              {...field}
              value={formData?.family.parents[field.name]}
              onChange={(v: any) =>
                updateForm(field.id, field.name, v, "parents")
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const GuardianTab = ({ id }: { id: string }) => {
  const { formData, editMode, updateForm, fetchWards } = useRecordContext();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h4 className="mb-4 border-b pb-2 text-xs font-bold uppercase text-slate-700">
          Guardian Info
        </h4>
        {getGuardianSchema(updateForm).map((field) => (
          <Field
            key={field.name}
            {...field}
            value={formData?.family.guardian[field.name]}
            onChange={(v: any) =>
              updateForm(field.id, field.name, v, "guardian")
            }
          />
        ))}
      </div>
      <div className="space-y-4">
        <h4 className="mb-4 border-b pb-2 text-xs font-bold uppercase text-slate-700">
          Guardian Address
        </h4>
        <AddressSection id={id} sub="guardian" />
      </div>
    </div>
  );
};
