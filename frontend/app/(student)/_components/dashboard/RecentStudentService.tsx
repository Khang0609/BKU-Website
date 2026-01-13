import { ArrowRight } from "lucide-react";
import { ServiceCarousel } from "@/components/common";
import { motion } from "framer-motion";
import Link from "next/link";
import { recentServices } from "@/app/(student)/_types/dashboard";

export const RecentStudentService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-md lg:col-span-2"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Student Services
        </h2>
        <span className="text-xs text-gray-500">Quick access to services</span>
      </div>

      <ServiceCarousel>
        {recentServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.id}
              href={service.href}
              className="block h-full w-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group flex h-full cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-secondary hover:bg-blue-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                  <Icon
                    className="text-primary transition-colors group-hover:text-white"
                    size={20}
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-medium text-gray-800">
                    {service.label}
                  </h3>
                  <p className="text-xs text-green-600">{service.status}</p>
                </div>
                <ArrowRight
                  className="text-gray-400 transition-colors group-hover:text-secondary"
                  size={16}
                />
              </motion.div>
            </Link>
          );
        })}
      </ServiceCarousel>
    </motion.div>
  );
};
