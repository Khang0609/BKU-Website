"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  BookText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  ShieldCheck,
  Calendar,
  Hash,
  Edit3
} from "lucide-react";
import { HealthInsuranceProps } from "@/types/health-insurance";
import { cn } from "@/lib/utils";
import { HealthInsuranceUpdateModal } from "./HealthInsuranceUpdateModal";
import { RequestHistoryList } from "./RequestHistoryList";

interface HealthInsuranceContentProps {
  data: HealthInsuranceProps | null;
}

export const HealthInsuranceContent = ({ data }: HealthInsuranceContentProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
        <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
        <p className="text-slate-500 font-medium">Không tìm thấy dữ liệu bảo hiểm của bạn.</p>
        <p className="text-slate-400 text-sm">Vui lòng liên hệ phòng công tác sinh viên để cập nhật.</p>
      </div>
    );
  }

  const handleUpdateSuccess = () => {
    setRefreshKey(prev => prev + 1); // Trigger re-render of history list
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Thẻ Bảo hiểm Y tế (Primary Card) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003087] to-[#0056b3] p-8 text-white shadow-xl shadow-blue-900/20">
            {/* Background Decorative Elements */}
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
            
            <div className="relative flex flex-col h-full justify-between gap-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">
                    Social Security Administration
                  </p>
                  <h2 className="text-xl font-bold">Thẻ Bảo hiểm Y tế</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-white/10 backdrop-blur-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Cập nhật
                  </button>
                  <ShieldCheck className="w-10 h-10 text-blue-200/50" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-blue-100/70 text-[10px] uppercase font-bold tracking-widest mb-1">Số thẻ bảo hiểm</p>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-200" />
                    <p className="text-2xl md:text-3xl font-mono tracking-wider font-bold">
                      {data.health_insurance_number || "CHƯA CẬP NHẬT"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/10">
                      <CheckCircle2 className="w-4 h-4 text-green-300" />
                    </div>
                    <div>
                      <p className="text-blue-100/60 text-[10px] uppercase font-bold">Trạng thái</p>
                      <p className="text-sm font-semibold">Đang hiệu lực</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Calendar className="w-4 h-4 text-blue-200" />
                    </div>
                    <div>
                      <p className="text-blue-100/60 text-[10px] uppercase font-bold">Hạn dùng</p>
                      <p className="text-sm font-semibold">31/12/2026</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <div className="text-[10px] text-blue-100/40 uppercase font-bold">
                      Vietnam Student Health Care
                  </div>
                  <div className="flex gap-1 h-8 opacity-40">
                      <div className="w-[1px] bg-white h-full" />
                      <div className="w-[3px] bg-white h-full" />
                      <div className="w-[1px] bg-white h-full" />
                      <div className="w-[1px] bg-white h-full" />
                      <div className="w-[4px] bg-white h-full" />
                      <div className="w-[1px] bg-white h-full" />
                  </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Số sổ y tế */}
        <motion.div variants={itemVariants}>
          <div className="group h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-[#003087] group-hover:text-white transition-colors">
                <BookText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Số sổ y tế</h3>
                <p className="text-xs text-slate-400">Sổ khám bệnh trường BKU</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Hash className="w-4 h-4" />
                <span className="font-mono font-medium">{data.medical_book_number || "N/A"}</span>
              </div>
              <Stethoscope className="w-5 h-5 text-slate-200" />
            </div>
          </div>
        </motion.div>

        {/* Bảo hiểm tai nạn */}
        <motion.div variants={itemVariants}>
          <div className="group h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Bảo hiểm tai nạn</h3>
                <p className="text-xs text-slate-400">Bảo hiểm tự nguyện</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Hash className="w-4 h-4" />
                <span className="font-mono font-medium">{data.accident_insurance_number || "N/A"}</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-slate-200" />
            </div>
          </div>
        </motion.div>

        {/* Thêm phần hướng dẫn/quy tắc (Premium touch) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="space-y-2">
                <h4 className="font-bold">Hướng dẫn sử dụng</h4>
                <p className="text-slate-400 text-sm max-w-md">
                  Xuất trình mã số thẻ bảo hiểm y tế hoặc số sổ khi đi khám tại trạm y tế trường hoặc các bệnh viện liên kết để được hưởng chế độ bảo hiểm.
                </p>
              </div>
              <button 
                onClick={() => setIsUpdateModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-semibold transition-colors border border-white/10"
              >
                Gửi yêu cầu chỉnh sửa
              </button>
            </div>
            <div className="absolute right-0 top-0 w-32 h-full bg-white/5 skew-x-12 transform translate-x-12" />
          </div>
        </motion.div>
      </motion.div>

      <RequestHistoryList key={refreshKey} />

      <HealthInsuranceUpdateModal 
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        currentData={data}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
};
