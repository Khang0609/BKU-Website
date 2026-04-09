"use client";

import { ImageWithFallback } from "@/components/ui";
import logo from "@/assets/logo.png";

export function LoginHeader() {
  return (
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
  );
}
