"use client";

import React, { useEffect, useState, useMemo } from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { useExtraCurricular } from "@/hooks/useExtraCurricular";
import { DataTable } from "@/components/common";
import { HorizontalCarousel } from "@/components/common/horizontal_carousel/HorizontalCarousel";
import { SearchBar } from "@/components/ui/SearchBar";
import {
  ExtraCurricularProps,
  ExtraCurricularState,
} from "@/types/extra_curricular";
import { ColumnDef } from "@/types/components_type/data_table";
import { useToast } from "@/hooks/useToast";
import {
  Calendar,
  MapPin,
  Clock,
  FileCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ExtraCurricularCard = ({ data }: { data: ExtraCurricularProps }) => (
  <div className="flex flex-col space-y-4 rounded-xl border border-indigo-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-start justify-between border-b border-gray-50 pb-3">
      <div className="space-y-1">
        <h3 className="line-clamp-2 font-bold text-gray-900">{data.name}</h3>
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={12} />
          {data.address}
        </p>
      </div>
      <div
        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
          data.state === ExtraCurricularState.END
            ? "bg-gray-100 text-gray-600"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {data.state}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-[10px] font-medium uppercase text-gray-400">
          Date & Duration
        </p>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <Calendar size={14} className="text-indigo-500" />
          {data.day_start}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <Clock size={14} className="text-indigo-500" />
          {data.duration_days} days
        </div>
      </div>
      <div className="space-y-1 text-right">
        <p className="text-[10px] font-medium uppercase text-gray-400">
          Social Days
        </p>
        <div className="text-2xl font-black text-indigo-600">
          {data.social_work_days_exchange}
        </div>
        <div
          className={`flex items-center justify-end gap-1 text-[10px] font-bold ${data.is_verified ? "text-green-600" : "text-amber-600"}`}
        >
          {data.is_verified ? (
            <CheckCircle2 size={12} />
          ) : (
            <AlertCircle size={12} />
          )}
          {data.is_verified ? "Verified" : "Pending"}
        </div>
      </div>
    </div>

    {data.has_proof && (
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
        <FileCheck size={14} />
        Proof document attached
      </div>
    )}
  </div>
);

const ExtraCurricularInner = () => {
  const { extraCurriculars, isLoading, error } = useExtraCurricular();
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  const filteredData = useMemo(() => {
    return extraCurriculars.filter(
      (ec) =>
        ec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ec.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [extraCurriculars, searchQuery]);

  const columns: ColumnDef<ExtraCurricularProps>[] = [
    {
      key: "name",
      label: "Activity Name",
      sortable: true,
      cellClassName: "font-semibold text-gray-900",
    },
    { key: "address", label: "Location" },
    { key: "day_start", label: "Start Date", sortable: true },
    {
      key: "duration_days",
      label: "Duration",
      sortable: true,
      render: (val) => `${val} days`,
    },
    {
      key: "state",
      label: "State",
      render: (val) => (
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
            val === ExtraCurricularState.END
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {val}
        </span>
      ),
    },
    {
      key: "social_work_days_exchange",
      label: "Social Days",
      sortable: true,
      cellClassName: "font-bold text-indigo-600 text-center",
    },
    {
      key: "is_verified",
      label: "Status",
      render: (val) => (
        <div
          className={`flex items-center gap-1 text-xs font-bold ${val ? "text-green-600" : "text-amber-600"}`}
        >
          {val ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {val ? "Verified" : "Pending"}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-full space-y-6 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Extra-Curricular Activities"
        description="Track your social work days and participation in campus activities"
      />

      <div className="space-y-4">
        {/* Search Bar */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <SearchBar
            placeholder="Search activity name or location..."
            value={searchQuery}
            onChange={setSearchQuery}
            title="Activity Filter"
          />
        </div>

        {/* Desktop View: DataTable */}
        <div className="hidden lg:block">
          <DataTable
            columns={columns}
            data={filteredData}
            isLoading={isLoading}
            className="rounded-xl border-none bg-white shadow-md"
          />
        </div>

        {/* Mobile/Tablet View: HorizontalCarousel */}
        <div className="block lg:hidden">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center text-gray-500">
              <span className="animate-pulse">Loading activities...</span>
            </div>
          ) : filteredData.length > 0 ? (
            <HorizontalCarousel>
              {filteredData.map((ec) => (
                <ExtraCurricularCard key={ec.id} data={ec} />
              ))}
            </HorizontalCarousel>
          ) : (
            <div className="rounded-xl bg-white p-8 text-center italic text-gray-500 shadow-sm">
              No activities found for &quot;searchQuery&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ExtraCurricularPage() {
  return <ExtraCurricularInner />;
}
