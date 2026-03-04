"use client";

import { motion } from "framer-motion";
import backgroundImage from "@/assets/truong.png";
import { LoginForm, LoginHeader, LoginFooter } from "@/components/auth";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a1628] pb-20 lg:pb-0">
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
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </div>
      </motion.div>
    </div>
  );
}
