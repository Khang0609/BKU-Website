"use client";

import { HorizontalCarousel } from "@components/data-display/horizontal_carousel";
import Link from "next/link";
import { motion } from "framer-motion";
import { quickAccessItems } from "@/app/(student)/_types/dashboard";

export const QuickAccess = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Access</h2>
      {/* We use a custom Carousel that handles responsiveness internally via CSS classes on children */}
      <HorizontalCarousel>
        {quickAccessItems.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={!item.disabled ? { scale: 1.05, y: -5 } : {}}
              whileTap={!item.disabled ? { scale: 0.95 } : {}}
              className={`group relative h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-left shadow-md transition-all duration-300 hover:shadow-xl ${
                item.disabled
                  ? "cursor-not-allowed opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <div
                className={`absolute right-0 top-0 h-32 w-32 bg-gradient-to-br ${item.color} -translate-y-16 translate-x-16 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150`}
              ></div>

              <div className="relative">
                <div
                  className={`h-12 w-12 bg-gradient-to-br ${item.color} mb-4 flex items-center justify-center rounded-xl`}
                >
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-500">{item.description}</p>
                {item.disabled && (
                  <span className="mt-2 block text-xs font-medium text-orange-600">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          );

          return item.disabled ? (
            <div key={item.id} className="h-full">
              {content}
            </div>
          ) : (
            <Link key={item.id} href={item.href} className="block h-full">
              {content}
            </Link>
          );
        })}
      </HorizontalCarousel>
    </div>
  );
};
