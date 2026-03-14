"use client";

import React, { useEffect } from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { useScholarship } from "@/app/(student)/_hooks/profile/useScholarship";
import { DataTable } from "@components/data-display";
import { ScholarshipProps, ScholarshipType } from "@/types/scholarship";
import { ColumnDef } from "@/types/components_type/data_table";
import { useToast } from "@/hooks/useToast";

const ScholarshipsInner = () => {
  const { scholarships, isLoading, error } = useScholarship();

  const columns: ColumnDef<ScholarshipProps>[] = [
    { key: "semester", label: "Học kỳ", sortable: true },
    { key: "gpa_4", label: "ĐTB hệ 4", sortable: true },
    { key: "gpa_10", label: "ĐTB hệ 10", sortable: true },
    { key: "cpa_4", label: "ĐTBTL hệ 4", sortable: true },
    { key: "cpa_10", label: "ĐTBTL hệ 10", sortable: true },
    { key: "credits_earned", label: "Số TC đạt được", sortable: true },
    { key: "cumulative_credits", label: "Số TC tích lũy", sortable: true },
    { key: "training_point", label: "Điểm rèn luyện", sortable: true },
    { key: "eligible", label: "Đủ điều kiện xét" },
    { key: "scholarship_level", label: "Mức học bổng", sortable: true },
    {
      key: "amount",
      label: "Số tiền",
      sortable: true,
      render: (value) => {
        if (!value) return "-";
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(Number(value));
      },
    },
    { key: "result", label: "Kết quả" },
    { key: "created_at", label: "Tạo vào lúc", sortable: true },
    { key: "created_by", label: "Tạo bởi" },
    { key: "updated_at", label: "Cập nhật lần cuối vào lúc", sortable: true },
    { key: "updated_by", label: "Cập nhật lần cuối bởi" },
  ];

  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Scholarships"
        description="View your scholarships and grants"
      />

      <DataTable
        columns={columns}
        data={scholarships}
        isLoading={isLoading}
        className="rounded-lg bg-white shadow-md"
      />
    </div>
  );
};

export default function Scholarships() {
  return (
    <div>
      <ScholarshipsInner />
    </div>
  );
}
