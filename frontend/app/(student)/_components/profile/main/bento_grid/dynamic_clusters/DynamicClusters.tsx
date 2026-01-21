"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";
import { itemAnimation } from "@/configs/animation.config";

export const DynamicClusters = () => {
  const { leftColClusters, handleLinkClick } = useProfileMainContext();

  return (
    <>
      {leftColClusters.map((cluster) => (
        <motion.div key={cluster.id} variants={itemAnimation}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
                  <cluster.icon size={18} />
                </div>
                <h3 className="font-semibold text-slate-800">
                  {cluster.title}
                </h3>
              </div>
            </div>
            <div className="p-4">
              {cluster.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="group mb-2 flex items-center gap-4 rounded-xl p-3 last:mb-0 hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#003087] group-hover:text-white">
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-[#003087]">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};
