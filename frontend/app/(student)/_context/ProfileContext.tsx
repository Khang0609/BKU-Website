import React, { createContext, useContext } from 'react';
import { useInfo } from '@/app/(student)/_hooks/info/useInfo'; // Hook lấy dữ liệu cũ của sếp

// 1. Tạo cái khung chứa dữ liệu
const ProfileContext = createContext<any>(null);

// 2. Tạo "Router" bọc ngoài trang Info
export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const pageCore = useInfo(); // Gọi API đúng 1 lần duy nhất tại đây

  return (
    <ProfileContext.Provider value={pageCore}>
      {children}
    </ProfileContext.Provider>
  );
};

// 3. Tạo "Anten" để các con bắt sóng
export const useProfileContext = () => useContext(ProfileContext);