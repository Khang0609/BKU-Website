import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Chỉ render khi đã ở phía Client để tránh lỗi SSR của Next.js
  return mounted 
    ? createPortal(children, document.body) 
    : null;
};

export default Portal;