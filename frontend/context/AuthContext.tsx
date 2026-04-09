"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export type UserRole = "STUDENT" | "LECTURER" | "ADMIN" | "OFFICE";

interface AuthContextType {
  role: UserRole | null;
  login: (role: UserRole, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Sync state with Cookie on mount
    const storedRole = Cookies.get("role") as UserRole;
    const storedToken = Cookies.get("token");
    const localToken = localStorage.getItem("token");

    if (storedRole) {
      setRole(storedRole);
    }
    
    // If token is in localStorage but not in Cookie, sync it (for Server Components)
    if (localToken && !storedToken) {
        Cookies.set("token", localToken, { secure: true, sameSite: "strict" });
    }

    setIsLoading(false);
  }, []);

  const login = (newRole: UserRole, token: string) => {
    setRole(newRole);
    // Secure cookie is already set by page or backend, but we ensure consistency here
    Cookies.set("role", newRole, { secure: true, sameSite: "strict" });
    Cookies.set("token", token, { secure: true, sameSite: "strict" });

    // Store token in localStorage as expected by other components
    localStorage.setItem("token", token);

    if (newRole === "ADMIN") {
      router.push("/monitoring");
    } else if (newRole === "STUDENT") {
      router.push("/dashboard");
    } else {
      router.push("/coming-soon");
    }
  };

  const logout = () => {
    setRole(null);
    Cookies.remove("role");
    Cookies.remove("token");
    localStorage.removeItem("token");
    // Also call backend logout if needed to clear HttpOnly cookie
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ role, login, logout, isAuthenticated: !!role, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
