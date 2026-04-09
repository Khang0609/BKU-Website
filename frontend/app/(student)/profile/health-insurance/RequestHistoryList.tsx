"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Calendar,
  ExternalLink,
  History
} from "lucide-react";
import { ProfileUpdateRequest, RequestStatus } from "@/types/request";
import { getMyRequestsClient } from "@/services/request.service";
import { cn } from "@/lib/utils";

export const RequestHistoryList = () => {
  const [requests, setRequests] = useState<ProfileUpdateRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getMyRequestsClient();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div className="py-10 text-center text-slate-400">Đang tải lịch sử yêu cầu...</div>;
  if (requests.length === 0) return null;

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-[#003087]" />
        <h3 className="text-lg font-bold text-slate-800">Lịch sử yêu cầu cập nhật</h3>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={request.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  request.status === RequestStatus.PENDING && "bg-amber-50 text-amber-600",
                  request.status === RequestStatus.APPROVED && "bg-green-50 text-green-600",
                  request.status === RequestStatus.REJECTED && "bg-red-50 text-red-600",
                )}>
                  {request.status === RequestStatus.PENDING && <Clock className="w-6 h-6" />}
                  {request.status === RequestStatus.APPROVED && <CheckCircle className="w-6 h-6" />}
                  {request.status === RequestStatus.REJECTED && <XCircle className="w-6 h-6" />}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Yêu cầu cập nhật BHYT
                    </span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                      request.status === RequestStatus.PENDING && "bg-amber-100 text-amber-700",
                      request.status === RequestStatus.APPROVED && "bg-green-100 text-green-700",
                      request.status === RequestStatus.REJECTED && "bg-red-100 text-red-700",
                    )}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(request.created_at).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="flex items-center gap-1">
                      ID: #{request.id}
                    </span>
                  </div>
                </div>
              </div>

              {request.admin_comment && (
                <div className="flex-1 md:mx-6 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600 italic">"{request.admin_comment}"</p>
                </div>
              )}

              <div className="flex items-center gap-3">
                {request.proof_url && (
                  <a 
                    href={request.proof_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Minh chứng
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
