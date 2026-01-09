"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import logo from "@/components/assets/logo.png";
import backgroundImage from "@/components/assets/truong.png";
import { getApiUrl } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const baseUrl = getApiUrl();
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      const { access_token, role } = response.data;

      // Update global auth state and redirect
      login(role, access_token);
    } catch (err: any) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.detail || "Login failed");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-[#0a1628]/80" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage.src})` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-md p-6"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <div className="relative mb-8 flex flex-col items-center">
            <ImageWithFallback
              src={logo}
              alt="HCMUT Logo"
              width={100}
              height={100}
              className="mb-4 drop-shadow-lg"
            />
            <h1 className="title-xl font-bold text-white">Welcome Back</h1>
            <p className="subtitle-xl text-blue-200">Sign in to BKU Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="name@hcmut.edu.vn"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg bg-red-500/20 p-3 text-sm text-red-200"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-500 disabled:opacity-70"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span>Sign In</span>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-white/30">
            &copy; 2026 Ho Chi Minh University of Technology
          </div>
        </div>
      </motion.div>
    </div>
  );
}
