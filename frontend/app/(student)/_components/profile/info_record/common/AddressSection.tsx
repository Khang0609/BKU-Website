import React from "react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import { getAddressSchema } from "@/app/(student)/_constants/profile/record";
import { Field } from "@/app/(student)/_components/profile/info_record/common";
import { AddressSectionProps } from "@/app/(student)/_types/profile/record";

export const AddressSection = ({ id, sub }: AddressSectionProps) => {
  const {
    catalogs,
    formData,
    updateForm,
    editMode,
    fetchWards,
    handleProvinceChange,
  } = useRecordContext();

  // Determine the correct data object based on section structure
  const getDataObject = () => {
    if (id === "family" && sub === "guardian") {
      return formData?.[id];
    }
    else if (id === "contact" && sub === "current") {
      return formData?.[id];
    }
    return formData?.[id];
  };
  const sectionData = getDataObject();
  console.log("sectionData gotten: ", sectionData);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {getAddressSchema(updateForm, handleProvinceChange, id, sub).map(
        (field) => {
          // Handle value fallback (prefixed -> unprefixed)
          // field.name is e.g. "permanent_province_id"
          // baseName is e.g. "province_id"
          const baseName = sub ? field.name.replace(`${sub}_`, "") : field.name;

          let value = sectionData?.[field.name];
          if (value === undefined || value === null) {
            value = sectionData?.[baseName];
          }
          const provinceKey = sub ? `${sub}_province_id` : "province_id";
          const wardKey = sub ? `${sub}_ward_id` : "ward_id";
          const provinceNameKey = sub
            ? `${sub}_province_name`
            : "province_name";
          const wardNameKey = sub ? `${sub}_ward_name` : "ward_name";

          if (!editMode[id]) {
            const pName =
              sectionData?.[provinceNameKey] || sectionData?.province_name;
            const wName = sectionData?.[wardNameKey] || sectionData?.ward_name;

            // Province Display Logic
            if (field.name === provinceKey) {
              if (pName) {
                value = pName;
              } else if (value && catalogs?.provinces?.length > 0) {
                // Fallback: Lookup name in catalogs
                const p = catalogs.provinces.find(
                  (item: any) => item.value === value,
                );
                if (p) value = p.label;
              }
            }

            // Ward Display Logic
            if (field.name === wardKey) {
              if (wName) {
                value = wName;
              } else if (value) {
                // Fallback: Lookup name in catalogs using province ID
                const provId =
                  sectionData?.[provinceKey] || sectionData?.["province_id"];
                if (provId && catalogs.wards[provId]) {
                  const w = catalogs.wards[provId].find(
                    (item: any) => item.value === value,
                  );
                  if (w) value = w.label;
                }
              }
            }
          }

          // Logic to make House Number full width
          const isFullWidth = baseName === "house_number";

          return (
            <Field
              key={field.name}
              {...field}
              className={isFullWidth ? "md:col-span-2" : ""}
              id={id}
              value={value}
              options={
                field.customOptions
                  ? field.customOptions(catalogs, formData)
                  : catalogs[field.optionsKey || ""] || field.options || []
              }
              onChange={(v: any) => {
                if (field.customOnChange) {
                  // Pass handleProvinceChange or just call it if simplified?
                  // Now schema expects (v, { handleProvinceChange })
                  field.customOnChange(v, { updateForm, handleProvinceChange });
                } else {
                  updateForm(id, field.name, v, sub);
                }
              }}
            />
          );
        },
      )}
    </div>
  );
};
