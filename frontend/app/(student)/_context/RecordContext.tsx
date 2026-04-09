import React, { createContext, useContext } from "react";
import { useRecord } from "@/app/(student)/_hooks/profile/record/useRecord"; // Hook lấy dữ liệu cũ của sếp

// 1. Tạo cái khung chứa dữ liệu
const RecordContext = createContext<any>(null);

// 2. Tạo "Router" bọc ngoài trang Info
export const RecordProvider = ({
  children,
  initialData = { profile: null, catalogs: null },
}: {
  children: React.ReactNode;
  initialData?: any;
}) => {
  const pageCore = useRecord(initialData); // Gọi API đúng 1 lần duy nhất tại đây

  return (
    <RecordContext.Provider value={pageCore}>{children}</RecordContext.Provider>
  );
};

// 3. Tạo "Anten" để các con bắt sóng
export const useRecordContext = () => {
  const context = useContext(RecordContext);
  return context || {};
};
