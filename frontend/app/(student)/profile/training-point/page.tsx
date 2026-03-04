"use client";

import React, { useEffect, useState, useMemo } from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { useTrainingPoint } from "@/hooks/useTrainingPoint";
import { DataTable } from "@/components/common";
import { HorizontalCarousel } from "@/components/common/horizontal_carousel/HorizontalCarousel";
import { SearchBar } from "@/components/ui/SearchBar";
import { TrainingPointProps } from "@/types/training_point";
import { ColumnDef } from "@/types/components_type/data_table";
import { useToast } from "@/hooks/useToast";
import { Calendar, Award, Star } from "lucide-react";

const TrainingPointCard = ({ data }: { data: TrainingPointProps }) => (
  <div className="flex flex-col space-y-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
          <Calendar size={18} />
        </div>
        <span className="font-bold text-gray-900">{data.semester}</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
        <Award size={14} />
        {data.rating}
      </div>
    </div>

    <div className="flex items-end justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Total Points
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-blue-600">
            {data.points}
          </span>
          <span className="text-sm font-medium text-gray-500">/ 100</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400">Last updated</p>
        <p className="text-xs font-medium text-gray-600">{data.updated_at}</p>
      </div>
    </div>
  </div>
);

const TrainingPointInner = () => {
  const { trainingPoints, isLoading, error } = useTrainingPoint();
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  const filteredData = useMemo(() => {
    return trainingPoints.filter(
      (tp) =>
        tp.semester.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tp.rating.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [trainingPoints, searchQuery]);

  const columns: ColumnDef<TrainingPointProps>[] = [
    { key: "semester", label: "Semester", sortable: true },
    {
      key: "points",
      label: "Points",
      sortable: true,
      cellClassName: "font-bold text-blue-600",
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (value) => (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          {value}
        </span>
      ),
    },
    { key: "updated_at", label: "Last Updated", sortable: true },
  ];

  return (
    <div className="min-h-full space-y-6 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Training Points"
        description="Monitor your training performance results by semester"
      />

      <div className="space-y-4">
        {/* Search Bar - Visible on both but styled differently */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <SearchBar
            placeholder="Search semester or rating..."
            value={searchQuery}
            onChange={setSearchQuery}
            title="Search Filter"
          />
        </div>

        {/* Desktop View: DataTable */}
        <div className="hidden md:block">
          <DataTable
            columns={columns}
            data={filteredData}
            isLoading={isLoading}
            className="rounded-xl border-none bg-white shadow-md"
          />
        </div>

        {/* Mobile View: HorizontalCarousel */}
        <div className="block md:hidden">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center text-gray-500">
              <span className="animate-pulse">Loading training points...</span>
            </div>
          ) : filteredData.length > 0 ? (
            <HorizontalCarousel>
              {filteredData.map((tp) => (
                <TrainingPointCard key={tp.id} data={tp} />
              ))}
            </HorizontalCarousel>
          ) : (
            <div className="rounded-xl bg-white p-8 text-center italic text-gray-500 shadow-sm">
              No results found for &quot;searchQuery&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TrainingPointPage() {
  return <TrainingPointInner />;
}
