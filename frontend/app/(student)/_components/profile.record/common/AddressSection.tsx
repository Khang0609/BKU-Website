import React from "react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import { getAddressSchema } from "@/app/(student)/_constants/record";
import Field from "@/app/(student)/_components/profile.record/common/Field";
import { AddressSectionProps } from "@/app/(student)/_types/record";

export default function AddressSection({ id, sub }: AddressSectionProps) {
  const {
    catalogs,
    formData,
    updateForm,
    editMode,
    fetchWards,
    handleProvinceChange,
  } = useRecordContext();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {getAddressSchema(updateForm, handleProvinceChange, id).map((field) => {
        // Logic to display Name instead of ID in ReadOnly mode
        let value = formData?.[id]?.[field.name];
        if (!editMode[id]) {
          if (field.name === "province_id" && formData?.[id]?.province_name) {
            value = formData[id].province_name;
          }
          if (field.name === "ward_id" && formData?.[id]?.ward_name) {
            value = formData[id].ward_name;
          }
        }

        // Logic to make House Number full width
        const isFullWidth = field.name === "house_number";

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
      })}
    </div>
  );
}
