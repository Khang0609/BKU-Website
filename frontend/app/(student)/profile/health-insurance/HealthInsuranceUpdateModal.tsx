"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Upload, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  FileText
} from "lucide-react";
import { createUpdateRequest } from "@/services/request.service";
import { RequestType } from "@/types/request";
import { HealthInsuranceProps } from "@/types/health-insurance";
import { toast } from "sonner";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: HealthInsuranceProps;
  onSuccess: () => void;
}

export const HealthInsuranceUpdateModal = ({ 
  isOpen, 
  onClose, 
  currentData,
  onSuccess 
}: UpdateModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    health_insurance_number: currentData.health_insurance_number || "",
    medical_book_number: currentData.medical_book_number || "",
    accident_insurance_number: currentData.accident_insurance_number || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Giả lập upload ảnh lấy URL (Vì backend đang chờ proof_url)
      // Trong thực tế, bạn sẽ gọi API upload ở đây.
      const mockProofUrl = file ? "https://storage.bku.edu.vn/evidences/mock-insurance-card.jpg" : "";

      await createUpdateRequest({
        type: RequestType.HEALTH_INSURANCE,
        requested_data: formData,
        proof_url: mockProofUrl
      });

      toast.success("Yêu cầu cập nhật đã được gửi! Vui lòng chờ Admin duyệt.");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Có lỗi xảy ra khi gửi yêu cầu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003087] to-[#0056b3] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-2">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Cập nhật Bảo hiểm</h2>
                    <p className="text-sm text-blue-100/80">Gửi yêu cầu thay đổi thông tin</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Health Insurance Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Số thẻ Bảo hiểm Y tế</label>
                  <input
                    type="text"
                    value={formData.health_insurance_number}
                    onChange={(e) => setFormData({...formData, health_insurance_number: e.target.value})}
                    placeholder="Nhập số thẻ mới"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Medical Book Number */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Số sổ y tế</label>
                    <input
                      type="text"
                      value={formData.medical_book_number}
                      onChange={(e) => setFormData({...formData, medical_book_number: e.target.value})}
                      placeholder="Số sổ"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                  {/* Accident Insurance Number */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Số BH tai nạn</label>
                    <input
                      type="text"
                      value={formData.accident_insurance_number}
                      onChange={(e) => setFormData({...formData, accident_insurance_number: e.target.value})}
                      placeholder="Số thẻ"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Proof Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ảnh minh chứng (Thẻ BHYT/Sổ y tế)</label>
                  <div 
                    className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                      previewUrl ? "border-blue-400 bg-blue-50/30" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                    onClick={() => document.getElementById("proof-upload")?.click()}
                  >
                    {previewUrl ? (
                      <div className="flex flex-col items-center">
                        <img src={previewUrl} alt="Preview" className="h-32 w-auto rounded-lg shadow-sm mb-2" />
                        <p className="text-xs text-blue-600 font-medium">Click để thay đổi ảnh</p>
                      </div>
                    ) : (
                      <>
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600 mb-2">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">Bấm để tải ảnh lên hoặc kéo thả</p>
                        <p className="text-xs text-slate-400 text-center">Định dạng JPG, PNG (Tối đa 5MB)</p>
                      </>
                    )}
                    <input
                      id="proof-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Warning/Note */}
              <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800 border border-amber-100">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  <b>Lưu ý:</b> Thông tin thay đổi sẽ không được cập nhật ngay lập tức. Cán bộ Phòng CTSV sẽ kiểm tra minh chứng trước khi duyệt yêu cầu của bạn.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl py-3 font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] rounded-xl bg-[#003087] py-3 font-semibold text-white hover:bg-[#002566] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Gửi yêu cầu
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
