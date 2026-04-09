"use client";

import React, { useEffect } from "react";
import { DataTable } from "@components/data-display";
import { ScholarshipProps } from "@/types/scholarship";
import { ColumnDef } from "@/types/components_type/data_table";
import { useScholarshipContext } from "@/app/(student)/_context/ScholarshipContext";
import { useToast } from "@/hooks/useToast";

export const ScholarshipPageContent = () => {
  const { scholarships, isLoading, error } = useScholarshipContext();
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

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

  return (
    <DataTable
      columns={columns}
      data={scholarships}
      isLoading={isLoading}
      className="rounded-lg bg-white shadow-md"
    />
  );
};
